import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { createAuditLog } from '../utils/audit-log.util';
import { Prisma, BookingStatus, BookingSource, RoomStatus } from '@prisma/client';
import { sendCancellationEmail } from '../utils/email.util';
import { CreateBookingDto, CreateOfflineBookingDto, CheckInMultipleDto } from '../validations/booking.schema';
import { emitBookingUpdate } from '../utils/socket.util';

const PAYMENT_EXPIRY_MINUTES = 15;
const MS_PER_DAY = 86400000;

// Thêm ngay dưới HOTEL_TZ_OFFSET, dùng chung cho cả file
const toDateOnly = (value: string) => value.split('T')[0];

export const createBooking = async (data: CreateBookingDto, userId: number) => {
  // Sửa lỗi Timezone: Áp cứng múi giờ GMT+7
  const HOTEL_TZ_OFFSET = '+07:00'; 
  const checkInDate = new Date(`${toDateOnly(data.checkInDate)}T14:00:00${HOTEL_TZ_OFFSET}`);
  const checkOutDate = new Date(`${toDateOnly(data.checkOutDate)}T12:00:00${HOTEL_TZ_OFFSET}`);

  const excludedRoomStatuses = Object.values(RoomStatus).filter((s) =>
    ['maintenance', 'out_of_order', 'outoforder'].includes(s.toLowerCase())
  );

  const excludedBookingStatuses = Object.values(BookingStatus).filter((s) =>
    s.toLowerCase() === 'cancelled'
  );

  const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / MS_PER_DAY);

  return prisma.$transaction(async (tx) => {
    const sortedItems = [...data.items].sort((a, b) => a.roomTypeId - b.roomTypeId);

    let totalAmount = 0;
    const roomTypeLinesData: { roomTypeId: number; quantity: number; priceAtBooking: number }[] = [];

    for (const item of sortedItems) {
      const roomType = await tx.roomType.findUnique({ where: { id: item.roomTypeId } });
      if (!roomType) {
        throw new AppError(404, `Không tìm thấy loại phòng #${item.roomTypeId}`);
      }

      await tx.$executeRaw`SELECT room_type_id FROM ROOM_TYPE WHERE room_type_id = ${item.roomTypeId} FOR UPDATE`;

      const totalRooms = await tx.room.count({
        where: { roomTypeId: item.roomTypeId, status: { notIn: excludedRoomStatuses as any } },
      });

      const reserved = await tx.bookingRoomType.aggregate({
        _sum: { quantity: true },
        where: {
          roomTypeId: item.roomTypeId,
          booking: {
            status: { notIn: excludedBookingStatuses as any },
            checkInDate: { lt: checkOutDate },
            checkOutDate: { gt: checkInDate },
          },
        },
      });

      const available = totalRooms - (reserved._sum.quantity ?? 0);
      if (available < item.quantity) {
        throw new AppError(
          409,
          `Loại phòng "${roomType.typeName}" chỉ còn ${Math.max(0, available)} phòng trống cho khoảng ngày này`
        );
      }

      const basePrice = Number(roomType.basePrice);
      totalAmount += basePrice * nights * item.quantity;
      roomTypeLinesData.push({ roomTypeId: item.roomTypeId, quantity: item.quantity, priceAtBooking: basePrice });
    }

    let discountAmount = 0;
    let appliedPromotionId: number | null = null;

    if (data.promoCode) {
      const code = data.promoCode.toUpperCase().trim();
      const promo = await tx.promotion.findUnique({ where: { code } });

      if (!promo || !promo.isActive) throw new AppError(400, 'Mã ưu đãi không hợp lệ hoặc đã bị khóa.');
      const now = new Date();
      if (now < promo.startDate || now > promo.endDate) throw new AppError(400, 'Mã ưu đãi đã hết hạn.');
      if (promo.usageLimit !== null && promo.usedCount >= promo.usageLimit) throw new AppError(400, 'Mã ưu đãi đã hết lượt.');
      if (promo.minNights && nights < promo.minNights) throw new AppError(400, `Cần đặt tối thiểu ${promo.minNights} đêm.`);

      const hasUsed = await tx.booking.findFirst({
        where: { userId, promotionId: promo.id, status: { notIn: excludedBookingStatuses as any } },
      });
      if (hasUsed) throw new AppError(400, 'Bạn đã sử dụng mã ưu đãi này trước đó rồi.');

      if (promo.type === 'percentage') discountAmount = (totalAmount * promo.value) / 100;
      else if (promo.type === 'free_night') {
        const maxPrice = Math.max(...roomTypeLinesData.map((l) => l.priceAtBooking));
        discountAmount = maxPrice * promo.value;
      } else if (promo.type === 'fixed') discountAmount = promo.value;

      totalAmount = Math.max(0, totalAmount - discountAmount);
      appliedPromotionId = promo.id;

      await tx.promotion.update({
        where: { id: promo.id },
        data: { usedCount: { increment: 1 } },
      });
    }

    const booking = await tx.booking.create({
      data: {
        userId,
        checkInDate,
        checkOutDate,
        guestCount: data.guestCount,
        totalAmount,
        source: 'online',
        status: 'pending_payment',
        specialRequests: data.specialRequests,
        promoCode: data.promoCode ? data.promoCode.toUpperCase().trim() : null,
        discountAmount,
        promotionId: appliedPromotionId,
        roomTypeLines: { create: roomTypeLinesData },
      },
      include: { roomTypeLines: { include: { roomType: true } } },
    });

    await createAuditLog({
      tx, actorId: userId, targetTable: 'Booking', targetId: booking.id,
      action: 'CREATE', oldValue: null, newValue: booking,
    });

    const expiredAt = new Date(booking.createdAt.getTime() + PAYMENT_EXPIRY_MINUTES * 60 * 1000);
    emitBookingUpdate(booking.id, { status: booking.status });
    return { ...booking, expiredAt };
  });
};

interface GetMyBookingsFilter { status?: BookingStatus; }

export const getMyBookings = async (userId: number, filter?: GetMyBookingsFilter) => {
  return prisma.booking.findMany({
    where: { userId, ...(filter?.status && { status: filter.status }) },
    orderBy: { createdAt: 'desc' },
    include: {
      roomTypeLines: { include: { roomType: { include: { images: { take: 1, orderBy: { displayOrder: 'asc' } } } } } },
      assignedRooms: { include: { room: { include: { roomType: true } } } },
      payments: { select: { status: true, method: true, feeType: true, amount: true } },
      review: true,
    },
  });
};

export const getBookingById = async (bookingId: number, requesterId: number, requesterRole: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      roomTypeLines: { include: { roomType: { include: { images: { take: 1, orderBy: { displayOrder: 'asc' } } } } } },
      assignedRooms: { include: { room: { include: { roomType: true } } } },
      payments: true, review: true, customer: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
    },
  });

  if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  if (requesterRole === 'customer' && booking.userId !== requesterId) throw new AppError(403, 'Bạn không có quyền xem đơn này');

  const nights = Math.round((new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / 86400000);
  const lastPayment = booking.payments[0] || null;

  return {
    ...booking, totalPrice: Number(booking.totalAmount), totalNights: nights || 1,
    paymentStatus: lastPayment?.status || 'pending', paymentMethod: lastPayment?.method || 'cash',
  };
};

export const getAllBookings = async (filter?: any) => {
  const page = Number(filter?.page) || 1;
  const limit = Number(filter?.limit) || 20;
  const skip = (page - 1) * limit;
  const searchKey = filter?.search || filter?.keyword || filter?.q;

  const where: Prisma.BookingWhereInput = {
    ...(filter?.status && { status: filter.status }),
    ...(filter?.source && { source: filter.source }),
    ...(filter?.checkInDate && { checkInDate: { gte: new Date(filter.checkInDate) } }),
  };

  if (searchKey) {
    const isPureNumber = /^\d+$/.test(String(searchKey));
    if (isPureNumber) {
      where.OR = [{ id: parseInt(String(searchKey)) }, { customer: { phoneNumber: { contains: String(searchKey) } } }];
    } else {
      where.OR = [{ customer: { OR: [{ fullName: { contains: String(searchKey) } }, { email: { contains: String(searchKey) } }] } }];
    }
  }

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where, skip, take: limit, orderBy: { createdAt: 'desc' },
      include: {
        customer: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
        roomTypeLines: { include: { roomType: { include: { images: { take: 1, orderBy: { displayOrder: 'asc' } } } } } },
        assignedRooms: { include: { room: { include: { roomType: true } } } },
        payments: { select: { status: true, method: true, feeType: true } },
      },
    }),
    prisma.booking.count({ where }),
  ]);

  return { bookings, total, page, totalPages: Math.ceil(total / limit) };
};

export const cancelBooking = async (bookingId: number, actorId: number, actorRole: string, reason?: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { customer: true, payments: { where: { status: 'success' }, take: 1 } },
  });

  if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');

  if (actorRole === 'customer') {
    if (booking.userId !== actorId) throw new AppError(403, 'Bạn không có quyền hủy đơn này');
    if (booking.source !== 'online') throw new AppError(403, 'Không thể hủy đơn tại quầy qua ứng dụng');
  }

  if (['checked_in', 'checked_out', 'cancelled'].includes(booking.status)) {
    throw new AppError(400, `Không thể hủy đơn ở trạng thái ${booking.status}`);
  }

  const daysUntilCheckIn = Math.ceil((booking.checkInDate.getTime() - Date.now()) / 86400000);
  if (daysUntilCheckIn < 0) {
    throw new AppError(400, 'Không thể hủy sau ngày nhận phòng');
  }
  const successPayment = booking.payments[0] ?? null;

  const refundAmount = successPayment ? (daysUntilCheckIn >= 3 ? Number(booking.totalAmount) : Number(booking.totalAmount) * 0.5) : 0;

  await prisma.$transaction(async (tx) => {
    const updatedBooking = await tx.booking.update({
      where: { id: bookingId },
      data: { status: 'cancelled', cancelledAt: new Date(), cancelReason: reason ?? 'Khách hàng hủy' },
    });

    if (successPayment) {
      const penaltyAmount = Number(booking.totalAmount) - refundAmount;
      await tx.payment.update({
        where: { id: successPayment.id },
        data: { status: refundAmount > 0 ? 'pending_refund' : 'success' },
      });

      if (refundAmount > 0) {
        await tx.payment.create({
          data: { bookingId, amount: refundAmount, method: successPayment.method, status: 'pending_refund', feeType: 'refund', transactionRef: `REFUND-${booking.id}` },
        });
      }
      if (penaltyAmount > 0) {
        await tx.payment.create({
          data: { bookingId, amount: penaltyAmount, method: successPayment.method, status: 'success', feeType: 'penalty', paidAt: new Date(), transactionRef: `PENALTY-${booking.id}` },
        });
      }
    }

    await createAuditLog({ tx, actorId, targetTable: 'Booking', targetId: bookingId, action: 'UPDATE', oldValue: booking, newValue: updatedBooking });
  });
  
  emitBookingUpdate(bookingId, { status: 'cancelled' });
  return { refundAmount };
};

export const getRefundPreview = async (bookingId: number, userId: number) => {
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, userId },
    include: { payments: { where: { status: 'success', feeType: 'booking' }, take: 1 } },
  });

  if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  if (!['confirmed', 'pending_payment'].includes(booking.status)) throw new AppError(400, 'Đơn không thể hủy');

  const totalAmount = Number(booking.totalAmount);
  const isPaid = booking.payments.length > 0;
  const daysUntilCheckIn = Math.ceil((booking.checkInDate.getTime() - Date.now()) / 86400000);

  let refundAmount = 0, penaltyAmount = 0, refundPolicy = '';

  if (!isPaid) refundPolicy = 'Đơn chưa thanh toán. Hủy ngay mà không mất phí.';
  else if (daysUntilCheckIn >= 3) { refundAmount = totalAmount; refundPolicy = 'Hủy trước 3 ngày — hoàn 100% tiền phòng.'; }
  else if (daysUntilCheckIn >= 0) { refundAmount = totalAmount * 0.5; penaltyAmount = totalAmount * 0.5; refundPolicy = `Hủy trong vòng 3 ngày trước nhận phòng — hoàn 50%`; }
  else throw new AppError(400, 'Không thể hủy sau ngày nhận phòng');

  return { bookingId, totalAmount, isPaid, refundAmount, penaltyAmount, refundPolicy, checkInDate: booking.checkInDate, checkOutDate: booking.checkOutDate };
};

// ==========================================
// HÀM MỚI: Check-in Nhiều Phòng Cùng Lúc
// ==========================================
export const checkInMultiple = async (
  bookingId: number,
  staffId: number,
  data: CheckInMultipleDto
) => {
  return prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
      include: { roomTypeLines: true },
    });

    if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
    if (!['confirmed', 'checked_in'].includes(booking.status)) throw new AppError(400, `Đơn ở trạng thái "${booking.status}", không thể check-in`);

    const totalQuantityInBooking = booking.roomTypeLines.reduce((sum, line) => sum + line.quantity, 0);
    if (data.assignments.length !== totalQuantityInBooking) throw new AppError(400, 'Số lượng phòng gán không khớp với số lượng phòng trong đơn hàng.');
    
    const roomIds = data.assignments.map(a => a.roomId);
    if (new Set(roomIds).size !== roomIds.length) throw new AppError(400, 'Không thể gán một phòng cho nhiều khách trong cùng một đơn.');

    const sortedAssignments = [...data.assignments].sort((a, b) => a.roomId - b.roomId);

    for (const assignment of sortedAssignments) {
      const line = booking.roomTypeLines.find(l => l.id === assignment.bookingRoomTypeId);
      if (!line) throw new AppError(404, `Không tìm thấy dòng hạng phòng ID ${assignment.bookingRoomTypeId}`);

      await tx.$executeRaw`SELECT room_id FROM ROOM WHERE room_id = ${assignment.roomId} FOR UPDATE`;
      
      const room = await tx.room.findUnique({ where: { id: assignment.roomId } });

      if (!room) throw new AppError(404, `Phòng ID ${assignment.roomId} không tồn tại.`);
      if (room.roomTypeId !== line.roomTypeId) throw new AppError(400, `Phòng ${room.roomNumber} không thuộc hạng phòng đã đặt.`);
      if (room.status !== 'available') throw new AppError(409, `Phòng ${room.roomNumber} không ở trạng thái "sẵn sàng".`);

      await tx.bookingRoom.create({
        data: { bookingId, roomId: assignment.roomId, checkinAt: new Date(), idNumber: data.idNumber, checkinNote: data.checkinNote },
      });

      await tx.room.update({ where: { id: assignment.roomId }, data: { status: 'occupied' } });
    }

    if (booking.status !== 'checked_in') {
      await tx.booking.update({ where: { id: bookingId }, data: { status: 'checked_in' } });
    }

    await createAuditLog({ tx, actorId: staffId, targetTable: 'Booking', targetId: bookingId, action: 'UPDATE', oldValue: { status: booking.status }, newValue: { status: 'checked_in', assignments: data.assignments } });
    
    emitBookingUpdate(bookingId, { status: 'checked_in' });

    return { message: 'Check-in thành công cho tất cả các phòng.' };
  });
};

export const checkOut = async (
  bookingId: number, staffId: number, bookingRoomId: number,
  extraCharges: { label: string; amount: number }[] = [], paymentMethod: 'cash' | 'card' | 'qr_code' = 'cash'
) => {
  return prisma.$transaction(async (tx) => {
    const bookingRoom = await tx.bookingRoom.findUnique({
      where: { id: bookingRoomId },
      include: { room: { include: { roomType: true } }, booking: true },
    });

    if (!bookingRoom || bookingRoom.bookingId !== bookingId) throw new AppError(404, 'Không tìm thấy phòng này trong đơn');
    if (bookingRoom.checkoutAt) throw new AppError(400, 'Phòng này đã check-out rồi');

    const now = new Date();
    const finalExtraCharges = [...extraCharges];
    const extraTotal = finalExtraCharges.reduce((sum, c) => sum + c.amount, 0);

    await tx.bookingRoom.update({
      where: { id: bookingRoomId },
      data: { checkoutAt: now, extraCharges: finalExtraCharges.length > 0 ? finalExtraCharges : undefined },
    });

    await tx.room.update({ where: { id: bookingRoom.roomId }, data: { status: 'cleaning' } });

    if (extraTotal > 0) {
      await tx.payment.create({
        data: { bookingId, amount: extraTotal, method: paymentMethod, status: 'success', feeType: 'penalty', paidAt: now, transactionRef: `EXTRA-${bookingRoomId}-${Date.now()}` },
      });
    }

    const remaining = await tx.bookingRoom.count({ where: { bookingId, checkoutAt: null } });

    if (remaining === 0) await tx.booking.update({ where: { id: bookingId }, data: { status: 'checked_out' } });

    await createAuditLog({ tx, actorId: staffId, targetTable: 'Booking', targetId: bookingId, action: 'UPDATE', oldValue: null, newValue: { checkedOutRoomId: bookingRoom.roomId, extraTotal } });
    emitBookingUpdate(bookingId, { status: remaining === 0 ? 'checked_out' : bookingRoom.booking.status });

    return { message: 'Check-out thành công', extraTotal, allRoomsCheckedOut: remaining === 0 };
  });
};

export const createOfflineBooking = async (data: CreateOfflineBookingDto, staffId: number) => {
  const HOTEL_TZ_OFFSET = '+07:00'; 
  const checkInDate = new Date(`${toDateOnly(data.checkInDate)}T14:00:00${HOTEL_TZ_OFFSET}`);
  const checkOutDate = new Date(`${toDateOnly(data.checkOutDate)}T12:00:00${HOTEL_TZ_OFFSET}`);
  const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / 86400000);

  return prisma.$transaction(async (tx) => {
    let finalUserId = data.userId;

    if (data.newCustomer) {
      const existingUser = await tx.user.findFirst({ where: { phoneNumber: data.newCustomer.phoneNumber } });
      if (existingUser) finalUserId = existingUser.id;
      else {
        const newUser = await tx.user.create({
          data: { fullName: data.newCustomer.fullName, phoneNumber: data.newCustomer.phoneNumber, email: `khach_${Date.now()}@hotel.local`, passwordHash: 'OFFLINE_NO_LOGIN', role: 'customer' }
        });
        finalUserId = newUser.id;
      }
    }

    if (!finalUserId) throw new AppError(400, 'Không xác định được thông tin khách hàng');

    let totalAmount = 0;
    const roomTypeLinesData: { roomTypeId: number; quantity: number; priceAtBooking: number }[] = [];

    for (const item of data.items) {
      const roomType = await tx.roomType.findUnique({ where: { id: item.roomTypeId } });
      if (!roomType) throw new AppError(404, `Không tìm loại phòng #${item.roomTypeId}`);

      await tx.$executeRaw`SELECT room_type_id FROM ROOM_TYPE WHERE room_type_id = ${item.roomTypeId} FOR UPDATE`;

      const totalRooms = await tx.room.count({ where: { roomTypeId: item.roomTypeId, status: { notIn: ['maintenance', 'out_of_order', 'outoforder'] as any } } });
      const reserved = await tx.bookingRoomType.aggregate({
        _sum: { quantity: true },
        where: { roomTypeId: item.roomTypeId, booking: { status: { notIn: ['cancelled'] as any }, checkInDate: { lt: checkOutDate }, checkOutDate: { gt: checkInDate } } },
      });

      const available = totalRooms - (reserved._sum.quantity ?? 0);
      if (available < item.quantity) throw new AppError(409, `Hạng phòng "${roomType.typeName}" hiện chỉ còn ${Math.max(0, available)} phòng trống.`);

      const basePrice = Number(roomType.basePrice);
      totalAmount += basePrice * nights * item.quantity;
      roomTypeLinesData.push({ roomTypeId: item.roomTypeId, quantity: item.quantity, priceAtBooking: basePrice });
    }

    const booking = await tx.booking.create({
      data: {
        userId: finalUserId, createdBy: staffId, checkInDate, checkOutDate, guestCount: data.guestCount, totalAmount, source: 'offline', status: 'confirmed', paidAt: new Date(),
        roomTypeLines: { create: roomTypeLinesData },
      },
      include: { roomTypeLines: { include: { roomType: true } } },
    });

    const payment = await tx.payment.create({
      data: { bookingId: booking.id, amount: totalAmount, method: data.paymentMethod, status: 'success', feeType: 'booking', paidAt: new Date(), transactionRef: `OFFLINE-${booking.id}-${Date.now()}` }
    });

    const allocations = roomTypeLinesData.map(line => {
      const roomType = booking.roomTypeLines.find(l => l.roomTypeId === line.roomTypeId)?.roomType;
      return { paymentId: payment.id, roomTypeId: line.roomTypeId, roomTypeName: roomType?.typeName ?? 'Unknown', amount: line.priceAtBooking * line.quantity * nights };
    });
    await tx.paymentAllocation.createMany({ data: allocations });

    await createAuditLog({ tx, actorId: staffId, targetTable: 'Booking', targetId: booking.id, action: 'CREATE', oldValue: null, newValue: { ...booking, note: 'Tạo đơn tại quầy' } });
    return booking;
  });
};

export const updateOfflineBooking = async (bookingId: number, data: Partial<CreateOfflineBookingDto>, staffId: number): Promise<never> => {
  throw new AppError(501, 'Sửa đơn tại quầy đang được cập nhật lại.');
};

export const createReview = async (bookingId: number, userId: number, data: { rating: number; comment?: string }) => {
  const booking = await prisma.booking.findFirst({ where: { id: bookingId, userId } });
  if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  if (booking.status !== 'checked_out') throw new AppError(400, 'Chỉ có thể đánh giá sau khi đã trả phòng');
  const existingReview = await prisma.review.findUnique({ where: { bookingId } });
  if (existingReview) throw new AppError(409, 'Bạn đã đánh giá đơn đặt phòng này rồi');
  return prisma.review.create({ data: { bookingId, userId, rating: data.rating, comment: data.comment } });
};

export const getReviewsByRoomType = async (roomTypeId: number, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const where = { booking: { roomTypeLines: { some: { roomTypeId } } } };
  const [reviews, total] = await Promise.all([
    prisma.review.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { user: { select: { id: true, fullName: true } } } }),
    prisma.review.count({ where }),
  ]);
  return { reviews, total, page, totalPages: Math.ceil(total / limit) };
};

export const getBookingPreview = async (params: any) => { return {}; };