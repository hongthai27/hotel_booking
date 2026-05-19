import { Request, Response } from 'express';
import * as hotelService from '../services/hotel.service';
import { successResponse } from '../utils/response.util';
import { catchAsync } from '../utils/catch-async.util';
import { RoomStatus } from '@prisma/client';
import { SearchAvailableDto } from '../validations/hotel.schema';
import { AppError } from '../utils/app-error.util';

// ── RoomType ───────────────────────────────────────────────────────────────────

export const getAllRoomTypes = catchAsync(async (req: Request, res: Response) => {
  const roomTypes = await hotelService.getAllRoomTypes();
  successResponse(res, roomTypes, 'Lấy danh sách loại phòng thành công');
});

export const getRoomTypeById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.roomTypeId);

  if (isNaN(id) || id <= 0) {
    res.status(400).json({ message: 'ID loại phòng không hợp lệ' });
    return;
  }

  const roomType = await hotelService.getRoomTypeById(id);
  successResponse(res, roomType, 'Lấy thông tin loại phòng thành công');
});

export const createRoomType = catchAsync(async (req: Request, res: Response) => {
  const roomType = await hotelService.createRoomType(req.body, req.user!.userId);
  successResponse(res, roomType, 'Tạo loại phòng thành công', 201);
});

export const updateRoomType = catchAsync(async (req: Request, res: Response) => {
  const { version, ...data } = req.body;
  
  if (version === undefined) {
    throw new AppError(400, 'Thiếu thông tin version để kiểm tra xung đột');
  }
  
  const updated = await hotelService.updateRoomType(
    Number(req.params.id),
    { ...data, version: Number(version) }, // <-- Ép kiểu Number ở đây
    req.user!.userId
  );
  
  successResponse(res, updated, 'Cập nhật hạng phòng thành công');
});

export const deleteRoomType = catchAsync(async (req: Request, res: Response) => {
  await hotelService.deleteRoomType(Number(req.params.id), req.user!.userId);
  successResponse(res, null, 'Xóa loại phòng thành công');
});

// ── Room ───────────────────────────────────────────────────────────────────────

export const getRooms = catchAsync(async (req: Request, res: Response) => {
  const floor = Number(req.query.floor);
  const roomTypeId = Number(req.query.roomTypeId);

  const filter = {
    ...(req.query.status && { status: req.query.status as RoomStatus }),
    ...(req.query.floor != null && !isNaN(floor) && { floor }),
    ...(req.query.roomTypeId != null && !isNaN(roomTypeId) && { roomTypeId }),
  };
  
  const rooms = await hotelService.getRooms(filter);
  successResponse(res, rooms, 'Lấy danh sách phòng thành công');
});

export const createRoom = catchAsync(async (req: Request, res: Response) => {
  const room = await hotelService.createRoom(req.body, req.user!.userId);
  successResponse(res, room, 'Tạo phòng thành công', 201);
});

export const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const room = await hotelService.updateRoom(
    Number(req.params.id),
    req.body,
    req.user!.userId
  );
  successResponse(res, room, 'Cập nhật phòng thành công');
});

export const updateRoomStatus = catchAsync(async (req: Request, res: Response) => {
  const { status, version } = req.body;
  
  if (version === undefined) {
    throw new AppError(400, 'Thiếu version');
  }
  
  const updated = await hotelService.updateRoomStatus(
    Number(req.params.id),
    status,
    Number(version), // <-- Ép kiểu Number ở đây
    req.user!.userId
  );
  
  successResponse(res, updated, 'Cập nhật trạng thái phòng thành công');
});

// ── Search ─────────────────────────────────────────────────────────────────────

export const searchAvailable = catchAsync(async (req: Request, res: Response) => {
  // validateQuery đã chạy trước ở route, req.query đã được coerce đúng kiểu
  const results = await hotelService.searchAvailable(
    req.query as unknown as SearchAvailableDto
  );

  if (results.length === 0) {
    successResponse(res, [], 'Rất tiếc, không có phòng nào phù hợp với tìm kiếm của bạn');
    return;
  }

  successResponse(res, results, 'Tìm kiếm phòng thành công');
});

// ── Amenity ────────────────────────────────────────────────────────────────────

export const getAmenities = catchAsync(async (req: Request, res: Response) => {
  const amenities = await hotelService.getAmenities();
  successResponse(res, amenities, 'Lấy danh sách tiện ích thành công');
});

export const createAmenity = catchAsync(async (req: Request, res: Response) => {
  const amenity = await hotelService.createAmenity(req.body, req.user!.userId);
  successResponse(res, amenity, 'Tạo tiện ích thành công', 201);
});

export const deleteAmenity = catchAsync(async (req: Request, res: Response) => {
  await hotelService.deleteAmenity(Number(req.params.id), req.user!.userId);
  successResponse(res, null, 'Xóa tiện ích thành công');
});

// ── Dashboard / Sơ đồ phòng ────────────────────────────────────────────────────

/**
 * Lấy danh sách sơ đồ phòng tổng quan kèm khách đang lưu trú
 * Phục vụ cho giao diện Dashboard Realtime của Lễ tân/Admin
 */
export const getRoomOverview = catchAsync(async (req: Request, res: Response) => {
  const rooms = await hotelService.getRoomOverview();
  
  // Trả về response chuẩn hóa qua helper successResponse
  successResponse(res, rooms, 'Lấy sơ đồ phòng tổng quan thành công');
});