import { Request, Response } from 'express';
import * as bookingService from '../services/booking.service';
import { successResponse } from '../utils/response.util';
import { catchAsync } from '../utils/catch-async.util';
import { BookingStatus, BookingSource } from '@prisma/client';
import { emitBookingUpdate } from '../utils/socket.util';
import * as paymentService from '../services/payment.service';

export const createBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = await bookingService.createBooking(req.body, req.user!.userId);
  emitBookingUpdate(booking.id, { status: booking.status });
  successResponse(res, booking, 'Đặt phòng thành công', 201);
});

export const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const filter = {
    ...(req.query.status && { status: req.query.status as BookingStatus }),
  };

  const bookings = await bookingService.getMyBookings(req.user!.userId, filter);
  successResponse(res, bookings, 'Lấy danh sách đặt phòng thành công');
});

export const getBookingById = catchAsync(async (req: Request, res: Response) => {
  const booking = await bookingService.getBookingById(
    Number(req.params.id),
    req.user!.userId,
    req.user!.role
  );
  successResponse(res, booking, 'Lấy thông tin đặt phòng thành công');
});

export const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const filter = {
    ...(req.query.status && { status: req.query.status as BookingStatus }),
    ...(req.query.source && { source: req.query.source as BookingSource }),
    ...(req.query.checkInDate && { checkInDate: new Date(req.query.checkInDate as string) }),
    ...(req.query.page && { page: Number(req.query.page) }),
    ...(req.query.limit && { limit: Number(req.query.limit) }),
    ...(req.query.search && { search: req.query.search as string }),
    ...(req.query.keyword && { keyword: req.query.keyword as string }),
  };

  const result = await bookingService.getAllBookings(filter);

  successResponse(res, {
    bookings: result.bookings,
    pagination: {
      page: result.page,
      limit: filter.limit ?? 20,
      total: result.total,
      totalPages: result.totalPages,
    }
  }, 'Lấy danh sách đặt phòng thành công');
});

export const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingId = Number(req.params.id);
  
  const result = await bookingService.cancelBooking(
    bookingId,
    req.user!.userId,
    req.user!.role,
    req.body.reason
  );

  emitBookingUpdate(bookingId, { status: 'cancelled' });

  successResponse(res, result, 'Hủy đặt phòng thành công');
});

export const getRefundPreview = catchAsync(async (req: Request, res: Response) => {
  const data = await bookingService.getRefundPreview(
    Number(req.params.id),
    req.user!.userId
  );
  successResponse(res, data, 'Xem trước chính sách hoàn tiền');
});

export const checkInMultiple = catchAsync(async (req: Request, res: Response) => {
  // 1. Controller chỉ làm nhiệm vụ bóc tách Request
  const bookingId = Number(req.params.id);
  const staffId = req.user!.userId; // Lấy ID của lễ tân đang đăng nhập
  
  // 2. Chuyển toàn bộ Payload (req.body) xuống cho Service xử lý
  const result = await bookingService.checkInMultiple(
    bookingId,
    staffId,
    {
      assignments: req.body.assignments, // Mảng các phòng cần gán
      idNumber: req.body.idNumber,
      checkinNote: req.body.checkinNote,
    }
  );

  // 3. Định dạng Response trả về cho Frontend
  successResponse(res, result, 'Check-in thành công cho tất cả các phòng');
});

export const checkOut = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.checkOut(
    Number(req.params.id),
    req.user!.userId,
    Number(req.params.bookingRoomId),
    req.body.extraCharges ?? [],
    req.body.paymentMethod
  );
  successResponse(res, result, 'Check-out thành công');
});

export const createOfflineBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.createOfflineBooking(
    req.body,
    req.user!.userId
  );
  if ((result as any).id) {
    emitBookingUpdate((result as any).id, { status: (result as any).status });
  }
  successResponse(res, result, 'Tạo đơn tại quầy thành công', 201);
});

export const updateOfflineBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.updateOfflineBooking(
    Number(req.params.id),
    req.body,
    req.user!.userId
  );
  successResponse(res, result, 'Cập nhật đơn tại quầy thành công');
});

export const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = await bookingService.createReview(
    +req.params.id,
    req.user!.userId,
    req.body
  );

  successResponse(res, review, 'Gửi đánh giá thành công', 201);
});

export const getReviewsByRoomType = catchAsync(async (req: Request, res: Response) => {
  const reviews = await bookingService.getReviewsByRoomType(
    +req.params.roomTypeId,
    req.query.page ? +req.query.page : 1,
    req.query.limit ? +req.query.limit : 10
  );

  successResponse(res, reviews, 'Lấy danh sách đánh giá thành công');
});

export const confirmRefund = catchAsync(async (req: Request, res: Response) => {

  const result = await paymentService.confirmRefund(Number(req.params.id), req.user!.userId);
  
  if (result && result.bookingId) {
    emitBookingUpdate(result.bookingId, { 
      status: 'cancelled', 
      paymentStatus: 'refunded' 
    });
  }

  successResponse(res, result, 'Xác nhận hoàn tiền thành công');
});