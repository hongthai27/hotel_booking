import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { successResponse } from '../utils/response.util';
import { catchAsync } from '../utils/catch-async.util';
import { AppError } from '../utils/app-error.util';

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  successResponse(res, user, 'Đăng ký thành công', 201);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  successResponse(res, result, 'Đăng nhập thành công');
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.getMe(req.user!.userId);
  successResponse(res, user, 'Lấy thông tin người dùng thành công');
});

export const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const keyword = (req.query.keyword as string) || '';

    if (keyword.trim().length < 2) {
      return successResponse(res, [], 'Từ khóa phải có ít nhất 2 ký tự');
    }

    const users = await authService.searchUsers(keyword.trim());
    return successResponse(res, users, 'Tìm kiếm người dùng thành công');
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { role, status, search } = req.query as {
    role?: string;
    status?: string;
    search?: string;
  };

  const users = await authService.getAllUsers({ role, status, search });
  successResponse(res, users, 'Lấy danh sách người dùng thành công');
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const updated = await authService.updateUser(
    Number(req.params.id),
    req.body,
    req.user!.userId
  );
  successResponse(res, updated, 'Cập nhật tài khoản thành công');
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body.email);
  successResponse(
    res,
    null,
    'Nếu email tồn tại, chúng tôi đã gửi link đặt lại mật khẩu'
  );
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body.token, req.body.password);
  successResponse(
    res,
    null,
    'Đặt lại mật khẩu thành công. Vui lòng đăng nhập.'
  );
});

// ─── HANDLER MỚI ─────────────────────────────────────────────────────────────

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const updated = await authService.updateProfile(req.user!.userId, req.body);
  successResponse(res, updated, 'Cập nhật thông tin thành công');
});

export const uploadAvatar = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) throw new AppError(400, 'Vui lòng chọn file ảnh');
  const updated = await authService.uploadAvatar(req.user!.userId, req.file);
  successResponse(res, updated, 'Cập nhật ảnh đại diện thành công');
});

export const changePassword = catchAsync(async (req: Request, res: Response) => {
  await authService.changePassword(
    req.user!.userId,
    req.body.currentPassword,
    req.body.newPassword
  );
  successResponse(res, null, 'Đổi mật khẩu thành công');
});