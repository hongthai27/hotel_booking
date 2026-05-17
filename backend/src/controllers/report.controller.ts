import { Request, Response } from 'express';
import * as reportService from '../services/report.service';
import { successResponse } from '../utils/response.util';
import { AppError } from '../utils/app-error.util';
import { catchAsync } from '../utils/catch-async.util';

export const getRevenueReport = catchAsync(async (req: Request, res: Response) => {
  const { from, to } = req.query as { from?: string; to?: string };

  if (!from || !to) {
    throw new AppError(400, 'Vui lòng cung cấp from và to');
  }

  const data = await reportService.getRevenueReport(from, to);
  successResponse(res, data, 'Lấy báo cáo doanh thu thành công');
});

export const getRefundList = catchAsync(async (_req: Request, res: Response) => {
  const data = await reportService.getRefundList();
  successResponse(res, data, 'Lay danh sach hoan tien thanh cong');
});