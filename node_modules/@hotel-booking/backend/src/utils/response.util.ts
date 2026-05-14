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

// Tra ve response thanh cong voi format nhat quan
// meta chi duoc dinh kem khi co phan trang
export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Thanh cong',
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