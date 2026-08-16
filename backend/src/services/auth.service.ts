import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { UserRole, UserStatus } from '@prisma/client';
import { generateToken } from '../utils/jwt.util';
import { RegisterDto, LoginDto } from '../validations/auth.schema';
import { createAuditLog } from '../utils/audit-log.util';
import { sendResetPasswordEmail } from '../utils/email.util';
import { env } from '../config/env.config';
import { OAuth2Client } from 'google-auth-library';

const SALT_ROUNDS = 10;

// Google OAuth — MỚI
const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

// Sentinel cho tài khoản chỉ đăng nhập bằng Google (không có mật khẩu thật).
// Cùng cơ chế với 'OFFLINE_NO_LOGIN' đã dùng cho khách offline, để tránh
// phải đổi passwordHash sang nullable.
const GOOGLE_NO_PASSWORD = 'GOOGLE_OAUTH_NO_PASSWORD';

const excludePassword = (user: { passwordHash: string; [key: string]: unknown }) => {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

export const register = async (data: RegisterDto) => {
  const email = data.email.toLowerCase();

  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phoneNumber: data.phoneNumber }],
    },
  });

  if (existing) {
    throw new AppError(409, 'Email hoặc số điện thoại này đã được đăng ký');
  }

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email,
      phoneNumber: data.phoneNumber,
      passwordHash,
      role: 'customer',
    },
  });

  return excludePassword(user);
};

export const login = async (data: LoginDto) => {
  const { identifier, password } = data;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier.toLowerCase() },
        { phoneNumber: identifier },
      ],
    },
  });

  if (!user) {
    throw new AppError(404, 'Tài khoản không tồn tại trong hệ thống');
  }

  if (user.status === 'inactive') {
    throw new AppError(403, 'Tài khoản của bạn hiện đang bị khóa');
  }

  // MỚI: chặn sớm trước khi gọi bcrypt.compare với sentinel string
  if (user.passwordHash === GOOGLE_NO_PASSWORD) {
    throw new AppError(400, 'Tài khoản này được tạo bằng Google. Vui lòng đăng nhập bằng Google.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError(401, 'Mật khẩu không chính xác');
  }

  const token = generateToken({ userId: user.id, role: user.role });

  return {
    token,
    user: excludePassword(user),
  };
};

export const googleLogin = async (credential: string) => {
  let payload;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch {
    throw new AppError(401, 'Xác thực Google thất bại hoặc đã hết hạn');
  }

  if (!payload?.email) {
    throw new AppError(400, 'Không lấy được email từ tài khoản Google');
  }
  if (!payload.email_verified) {
    throw new AppError(400, 'Email Google chưa được xác thực');
  }

  const email = payload.email.toLowerCase();

  let user = await prisma.user.findUnique({ where: { googleId: payload.sub } });

  if (!user) {
    // Chưa từng đăng nhập Google -> thử gộp theo email (nếu đã có tài khoản thường)
    const existingByEmail = await prisma.user.findUnique({ where: { email } });

    if (existingByEmail) {
      user = await prisma.user.update({
        where: { id: existingByEmail.id },
        data: {
          googleId: payload.sub,
          avatarUrl: existingByEmail.avatarUrl ?? payload.picture,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          fullName: payload.name || email.split('@')[0],
          email,
          googleId: payload.sub,
          avatarUrl: payload.picture,
          passwordHash: GOOGLE_NO_PASSWORD,
          role: 'customer',
        },
      });
    }
  }

  if (user.status === 'inactive') {
    throw new AppError(403, 'Tài khoản của bạn hiện đang bị khóa');
  }

  const token = generateToken({ userId: user.id, role: user.role });

  return {
    token,
    user: excludePassword(user),
  };
};

export const getMe = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(404, 'Không tìm thấy người dùng');
  }

  return excludePassword(user);
};

export const searchUsers = async (keyword: string) => {
  return prisma.user.findMany({
    where: {
      role: 'customer',
      status: 'active',
      OR: [
        { fullName: { contains: keyword } },
        { email: { contains: keyword } },
        { phoneNumber: { contains: keyword } },
      ],
    },
    take: 10,
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
    },
  });
};

export const getAllUsers = async (filter?: {
  role?: string;
  status?: string;
  search?: string;
}) => {
  const validRole = filter?.role && Object.values(UserRole).includes(filter.role as UserRole) ? (filter.role as UserRole) : undefined;
  const validStatus = filter?.status && Object.values(UserStatus).includes(filter.status as UserStatus) ? (filter.status as UserStatus) : undefined;

  return prisma.user.findMany({
    where: {
      ...(validRole && { role: validRole }),
      ...(validStatus && { status: validStatus }),
      ...(filter?.search && {
        OR: [
          { fullName: { contains: filter.search } },
          { email: { contains: filter.search } },
          { phoneNumber: { contains: filter.search } },
        ],
      }),
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const updateUser = async (
  userId: number,
  data: { role?: string; status?: string },
  actorId: number
) => {
  if (data.role && !Object.values(UserRole).includes(data.role as UserRole)) {
    throw new AppError(400, 'Vai trò không hợp lệ');
  }
  if (data.status && !Object.values(UserStatus).includes(data.status as UserStatus)) {
    throw new AppError(400, 'Trạng thái không hợp lệ');
  }

  const existing = await prisma.user.findUnique({ where: { id: userId } });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy người dùng');
  }

  if (userId === actorId) {
    throw new AppError(400, 'Không thể chỉnh sửa tài khoản của chính mình');
  }

  return prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({
      where: { id: userId },
      data: {
        ...(data.role && { role: data.role as UserRole }),
        ...(data.status && { status: data.status as UserStatus }),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'User',
      targetId: userId,
      action: 'UPDATE',
      oldValue: { role: existing.role, status: existing.status },
      newValue: { role: updated.role, status: updated.status },
    });

    return updated;
  });
};

export const forgotPassword = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) return; // Bảo mật: Không báo lỗi nếu email không tồn tại để chống dò quét email

  // 1. Tạo Token gốc (Gửi cho user)
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // 2. Tạo Hashed Token (Lưu vào DB)
  // Giải thích dòng này: Dùng thuật toán sha256 -> đưa resetToken vào -> xuất ra chuỗi dạng hex
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
  const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 phút

  // 3. Lưu chuỗi ĐÃ BĂM vào database
  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: hashedToken, resetTokenExpiry: expiry },
  });

  // 4. Gửi URL chứa chuỗi GỐC (resetToken) cho User qua email
  const resetLink = `${env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
  await sendResetPasswordEmail(user.email, user.fullName, resetLink);
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await prisma.user.findFirst({
    where: {
      resetToken: hashedToken,
      resetTokenExpiry: { gt: new Date() },
    },
  });

  if (!user) throw new AppError(400, 'Token không hợp lệ hoặc đã hết hạn');

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });
};

//CÁC HÀM CẬP NHẬT PROFILE 

export const updateProfile = async (
  userId: number,
  data: { fullName?: string; phoneNumber?: string }
) => {
  if (data.phoneNumber) {
    const exists = await prisma.user.findFirst({
      where: { phoneNumber: data.phoneNumber, id: { not: userId } },
    });
    if (exists) {
      throw new AppError(409, 'Số điện thoại đã được dùng bởi tài khoản khác');
    }
  }

  return prisma.user.update({
    where: { id: userId },
    data: { ...data },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      role: true,
      status: true,
      avatarUrl: true,
    },
  });
};

export const uploadAvatar = async (
  userId: number,
  file: Express.Multer.File
) => {
  const b64 = Buffer.from(file.buffer).toString('base64');
  const dataURI = "data:" + file.mimetype + ";base64," + b64;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: 'hotel-booking/avatars',
    transformation: [
      { width: 200, height: 200, crop: 'fill', gravity: 'face' },
    ],
  });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.avatarUrl) {
    const publicId = user.avatarUrl.split('/').pop()?.split('.')[0];
    if (publicId) {
      await cloudinary.uploader
        .destroy(`hotel-booking/avatars/${publicId}`)
        .catch(() => {});
    }
  }

  return prisma.user.update({
    where: { id: userId },
    data: { avatarUrl: result.secure_url },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      role: true,
      status: true,
      avatarUrl: true,
    },
  });
};

export const changePassword = async (
  userId: number,
  currentPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(404, 'Không tìm thấy người dùng');

  const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isMatch) throw new AppError(400, 'Mật khẩu hiện tại không đúng');

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: await bcrypt.hash(newPassword, 10) },
  });
};