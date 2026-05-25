import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { catchAsync } from '../utils/catch-async.util';
import { successResponse } from '../utils/response.util';
import { env } from '../config/env.config';
import { BookingStatus } from '@prisma/client';

export const validatePromotion = catchAsync(async (req: Request, res: Response) => {
  const code = (req.query.code as string)?.toUpperCase().trim();
  
  // Lấy userId nếu có token truyền lên (hỗ trợ cả khách chưa đăng nhập)
  let userId: number | undefined;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as any;
      userId = decoded.userId;
    } catch (e) {
      // Bỏ qua nếu token không hợp lệ (người dùng chưa đăng nhập)
    }
  }

  if (!code) throw new AppError(400, 'Vui lòng nhập mã ưu đãi');

  const promo = await prisma.promotion.findUnique({ where: { code } });

  if (!promo || !promo.isActive) {
    throw new AppError(400, 'Mã ưu đãi không hợp lệ hoặc đã bị khóa.');
  }

  const now = new Date();
  if (now < promo.startDate || now > promo.endDate) {
    throw new AppError(400, 'Mã ưu đãi đã hết hạn hoặc chưa đến thời gian áp dụng.');
  }

  if (promo.usageLimit !== null && promo.usedCount >= promo.usageLimit) {
    throw new AppError(400, 'Mã ưu đãi đã hết lượt sử dụng.');
  }

  if (userId) {
    const hasUsed = await prisma.booking.findFirst({
      where: { userId, promotionId: promo.id, status: { notIn: ['cancelled'] as BookingStatus[] } },
    });
    if (hasUsed) throw new AppError(400, 'Bạn đã sử dụng mã ưu đãi này trước đó rồi.');
  }

  successResponse(res, promo, 'Mã ưu đãi hợp lệ');
});

export const getAllPromotions = catchAsync(async (req: Request, res: Response) => {
  const promotions = await prisma.promotion.findMany({
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, promotions, 'Lấy danh sách ưu đãi thành công');
});

export const createPromotion = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  
  const existing = await prisma.promotion.findUnique({ where: { code: data.code } });
  if (existing) throw new AppError(400, 'Mã ưu đãi này đã tồn tại');

  const promotion = await prisma.promotion.create({
    data: {
      code: data.code.toUpperCase().trim(),
      type: data.type,
      value: data.value,
      minNights: data.minNights,
      usageLimit: data.usageLimit,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      isActive: data.isActive ?? true,
    },
  });

  successResponse(res, promotion, 'Tạo mã ưu đãi thành công', 201);
});

export const updatePromotion = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;

  const existing = await prisma.promotion.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Không tìm thấy mã ưu đãi');

  if (data.code && data.code.toUpperCase().trim() !== existing.code) {
    const codeExists = await prisma.promotion.findUnique({ where: { code: data.code.toUpperCase().trim() } });
    if (codeExists) throw new AppError(400, 'Mã ưu đãi này đã tồn tại');
  }

  const promotion = await prisma.promotion.update({
    where: { id },
    data: {
      ...(data.code && { code: data.code.toUpperCase().trim() }),
      ...(data.type && { type: data.type }),
      ...(data.value !== undefined && { value: data.value }),
      ...(data.minNights !== undefined && { minNights: data.minNights }),
      ...(data.usageLimit !== undefined && { usageLimit: data.usageLimit }),
      ...(data.startDate && { startDate: new Date(data.startDate) }),
      ...(data.endDate && { endDate: new Date(data.endDate) }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
    },
  });

  successResponse(res, promotion, 'Cập nhật mã ưu đãi thành công');
});

export const togglePromotion = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const existing = await prisma.promotion.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Không tìm thấy mã ưu đãi');

  const promotion = await prisma.promotion.update({
    where: { id },
    data: { isActive: !existing.isActive },
  });

  successResponse(res, promotion, `${promotion.isActive ? 'Khóa' : 'Mở khóa'} mã ưu đãi thành công`);
});

export const deletePromotion = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const existing = await prisma.promotion.findUnique({ 
    where: { id },
    include: { _count: { select: { bookings: true } } }
  });

  if (!existing) throw new AppError(404, 'Không tìm thấy mã ưu đãi');

  if (existing._count.bookings > 0) {
    throw new AppError(400, 'Không thể xóa mã ưu đãi đã có lượt sử dụng. Vui lòng chọn Khóa mã thay vì xóa.');
  }

  await prisma.promotion.delete({ where: { id } });

  successResponse(res, null, 'Xóa mã ưu đãi thành công');
});