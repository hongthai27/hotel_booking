import { Request, Response } from 'express';
import * as paymentService from '../services/payment.service';
import { successResponse } from '../utils/response.util';
import { AppError } from '../utils/app-error.util';
import { catchAsync } from '../utils/catch-async.util';
import { env } from '../config/env.config';

export const initiatePayment = catchAsync(async (req: Request, res: Response) => {
  const data = await paymentService.initiatePayment(
    req.body.bookingId,
    req.user!.userId
  );
  successResponse(res, data, 'Khởi tạo thanh toán thành công');
});

export const getPaymentStatus = catchAsync(async (req: Request, res: Response) => {
  const data = await paymentService.getPaymentStatus(
    Number(req.params.bookingId),
    req.user!.userId
  );
  successResponse(res, data, 'Lấy trạng thái thanh toán thành công');
});

export const simulateSuccess = catchAsync(async (req: Request, res: Response) => {
  // Chỉ cho phép giả lập thanh toán ở môi trường development
  if (env.NODE_ENV === 'production') {
    throw new AppError(403, 'Không cho phép trong môi trường production');
  }

  const data = await paymentService.simulateSuccess(req.body.transactionRef);
  successResponse(res, data, 'Giả lập thanh toán thành công');
});