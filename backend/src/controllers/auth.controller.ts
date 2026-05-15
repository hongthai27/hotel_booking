import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { successResponse } from '../utils/response.util';
import { catchAsync } from '../utils/catch-async.util';

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
    'Neu email ton tai, chung toi da gui link dat lai mat khau'
  );
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body.token, req.body.password);
  successResponse(
    res,
    null,
    'Dat lai mat khau thanh cong. Vui long dang nhap.'
  );
});