import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { env } from '../config/env.config';
import { AppError } from '../utils/app-error.util';

interface JwtPayload {
  userId: number;
  role: string;
}

export const authenticateJWT = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(401, 'Không tìm thấy token xác thực');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch {
    throw new AppError(401, 'Token không hợp lệ hoặc đã hết hạn');
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError(403, 'Bạn không có quyền thực hiện thao tác này');
    }
    next();
  };
};
