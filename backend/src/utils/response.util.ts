import { Response } from 'express';

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface SuccessPayload<T> {
  success: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Thành công',
  statusCode: number = 200,
  meta?: PaginationMeta
): Response<SuccessPayload<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta && { meta }),
  });
};