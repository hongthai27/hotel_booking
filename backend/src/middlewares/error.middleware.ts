import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { AppError } from '../utils/app-error.util';
import { logger } from '../utils/logger.util';
import { env } from '../config/env.config';

const isDevelopment = env.NODE_ENV === 'development';

const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError): { statusCode: number; message: string } => {
  switch (err.code) {
    case 'P2002':
      return { statusCode: 409, message: 'Dữ liệu đã tồn tại' };
    case 'P2025':
      return { statusCode: 404, message: 'Không tìm thấy dữ liệu' };
    default:
      return { statusCode: 400, message: 'Lỗi truy vấn dữ liệu' };
  }
};

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    // Lỗi nghiệp vụ có kiểm soát, chỉ warn không error
    logger.warn(`[${err.statusCode}] ${err.message}`);
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(isDevelopment && { stack: err.stack }),
    });
    return;
  }

  if (err instanceof ZodError) {
    // Lỗi validation đầu vào, mức độ thấp nhất
    logger.warn(`[400] Zod validation failed`);
    res.status(400).json({
      success: false,
      message: 'Dữ liệu đầu vào không hợp lệ',
      errors: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const { statusCode, message } = handlePrismaError(err);
    logger.warn(`[${statusCode}] Prisma error code: ${err.code}`);
    res.status(statusCode).json({
      success: false,
      message,
      ...(isDevelopment && { prismaCode: err.code, stack: err.stack }),
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    logger.warn('[422] Prisma validation error');
    res.status(422).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      ...(isDevelopment && { stack: err.stack }),
    });
    return;
  }

  // Lỗi không xác định, log ở mọi môi trường để không bị mất dấu vết trên production
  logger.error('[500] Unexpected error:', err);
  res.status(500).json({
    success: false,
    message: 'Lỗi hệ thống',
    ...(isDevelopment && {
      stack: err instanceof Error ? err.stack : String(err),
    }),
  });
};