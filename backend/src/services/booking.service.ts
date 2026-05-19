import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { createAuditLog } from '../utils/audit-log.util';
import { BookingStatus, BookingSource } from '@prisma/client';
import { sendCancellationEmail } from '../utils/email.util';
import { CreateBookingDto, CreateOfflineBookingDto } from '../validations/booking.schema';
import { emitBookingUpdate } from '../utils/socket.util';

const PAYMENT_EXPIRY_MINUTES = 15;
const MS_PER_DAY = 86400000;

export const createBooking = async (data: CreateBookingDto, userId: number) => {
  const checkInDate = new Date(data.checkInDate);
  checkInDate.setHours(14, 0, 0, 0);
  const checkOutDate = new Date(data.checkOutDate);
  checkOutDate.setHours(12, 0, 0, 0);

  return prisma.$transaction(async (tx) => {
    const rooms = await tx.room.findMany({
      where: {
        roomTypeId: data.roomId,
        status: 'available',
      },
      include: { roomType: true },
    });

    if (rooms.length === 0) {
      throw new AppError(404, 'Không tìm thấy phòng trống nào thuộc loại này');
    }

    let availableRoom = null;

    for (const room of rooms) {
      await tx.$executeRaw`SELECT room_id FROM room WHERE room_id = ${room.id} FOR UPDATE`;

      const conflict = await tx.booking.findFirst({
        where: {
          roomId: room.id,
          status: { notIn: ['cancelled'] as BookingStatus[] },
          AND: [
            { checkInDate: { lt: checkOutDate } },
            { checkOutDate: { gt: checkInDate } },
          ],
        },
      });

      if (!conflict) {
        availableRoom = room;
        break;
      }
    }

    if (!availableRoom) {
      throw new AppError(
        409,
        'Tất cả các phòng loại này đã được đặt trong khoảng thời gian bạn chọn'
      );
    }

    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / MS_PER_DAY
    );

    const totalAmount = nights * Number(availableRoom.roomType.basePrice);

    const booking = await tx.booking.create({
      data: {
        userId,
        roomId: availableRoom.id,
        checkInDate,
        checkOutDate,
        guestCount: data.guestCount,
        totalAmount,
        source: 'online',
        status: 'pending_payment',
      },
    });

    await createAuditLog({
      tx,
      actorId: userId,
      targetTable: 'Booking',
      targetId: booking.id,
      action: 'CREATE',
      oldValue: null,
      newValue: booking,
    });

    const expiredAt = new Date(
      booking.createdAt.getTime() + PAYMENT_EXPIRY_MINUTES * 60 * 1000
    );
    emitBookingUpdate(booking.id, { status: booking.status });
    return { ...booking, expiredAt };
  });
};


interface GetMyBookingsFilter {
  status?: BookingStatus;
}

export const getMyBookings = async (
  userId: number,
  filter?: GetMyBookingsFilter
) => {
  return prisma.booking.findMany({
    where: {
      userId,
      ...(filter?.status && { status: filter.status }),
    },
    orderBy: { createdAt: 'desc' },
    include: {
      room: {
        include: {
          roomType: {
            include: {
              images: {
                take: 1,
                orderBy: { displayOrder: 'asc' },
              },
            },
          },
        },
      },
      payments: {
        select: {
          status: true,
          method: true,
          feeType: true,
          amount: true,
        },
      },
    },
  });
};

export const getBookingById = async (
  bookingId: number,
  requesterId: number,
  requesterRole: string
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      room: {
        include: {
          roomType: true
        }
      },
      payments: true,
      customer: {
        select: {
          id: true,
          fullName: true,
          email: true,
          phoneNumber: true,
        },
      },
    },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  }

  // Customer chỉ được xem booking của chính mình
  if (requesterRole === 'customer' && booking.userId !== requesterId) {
    throw new AppError(403, 'Bạn không có quyền xem đơn đặt phòng này');
  }

const checkIn = new Date(booking.checkInDate);
const checkOut = new Date(booking.checkOutDate);
const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

const lastPayment = booking.payments[0] || null;

  return {
    ...booking,
    totalPrice: Number(booking.totalAmount), 
    totalNights: nights || 1,                
    paymentStatus: lastPayment?.status || 'pending', 
    paymentMethod: lastPayment?.method || 'cash',   
  };
};

interface GetAllBookingsFilter {
  status?: BookingStatus;
  checkInDate?: Date;
  source?: BookingSource;
  page?: number;
  limit?: number;
  search?: string;
  keyword?: string;
}

export const getAllBookings = async (filter?: any) => {
  const page = Number(filter?.page) || 1;
  const limit = Number(filter?.limit) || 20;
  const skip = (page - 1) * limit;
  
  const searchKey = filter?.search || filter?.keyword || filter?.q;

  const where: any = {
    ...(filter?.status && { status: filter.status }),
    ...(filter?.source && { source: filter.source }),
    ...(filter?.checkInDate && { 
      checkInDate: { 
        gte: new Date(filter.checkInDate) 
      } 
    }),
  };

  if (searchKey) {
    const searchString = String(searchKey);
    const isPureNumber = /^\d+$/.test(searchString);

    if (isPureNumber) {
      where.OR = [
        { id: parseInt(searchString) },
        {
          customer: {
            phoneNumber: { contains: searchString }
          }
        }
      ];
    } else {
      where.OR = [
        {
          customer: {
            OR: [
              { fullName: { contains: searchString } },
              { email: { contains: searchString } }
            ]
          }
        }
      ];
    }
  }

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
          },
        },
        room: {
          include: {
            roomType: true,
          }
        },
        payments: {
          select: {
            status: true,
            method: true,
            feeType: true,
          },
        },
      },
    }),
    prisma.booking.count({ where }),
  ]);

  return {
    bookings,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const cancelBooking = async (
  bookingId: number,
  actorId: number,
  actorRole: string,
  reason?: string
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      customer: true,
      payments: {
        where: { status: 'success' },
        take: 1,
      },
    },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  }

  if (actorRole === 'customer') {
    if (booking.userId !== actorId) {
      throw new AppError(403, 'Bạn không có quyền hủy đơn này');
    }
    if (booking.source !== 'online') {
      throw new AppError(403, 'Không thể hủy đơn tại quầy qua ứng dụng');
    }
  }

  if (actorRole === 'receptionist') {
    if (booking.source !== 'offline') {
      throw new AppError(
        403,
        'Chỉ khách hàng hoặc Admin mới có quyền thay đổi đơn online'
      );
    }
  }

  if (['checked_in', 'checked_out', 'cancelled'].includes(booking.status)) {
    throw new AppError(400, `Không thể hủy đơn ở trạng thái ${booking.status}`);
  }

  const canCancel = booking.status === 'confirmed' || booking.paidAt !== null;

  if (!canCancel) {
    throw new AppError(400, 'Không thể hủy đơn ở trạng thái này');
  }

  const now = new Date();
  const daysUntilCheckIn = Math.ceil(
    (booking.checkInDate.getTime() - now.getTime()) / 86400000
  );

  const successPayment = booking.payments[0] ?? null;

  const refundAmount = successPayment
    ? daysUntilCheckIn >= 3
      ? Number(booking.totalAmount)
      : Number(booking.totalAmount) * 0.5
    : 0;

  await prisma.$transaction(async (tx) => {
    const oldBooking = { ...booking };

    const updatedBooking = await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: 'cancelled',
        cancelledAt: now,
        cancelReason: reason ?? 'Khách hàng hủy',
      },
    });

    if (successPayment) {
      const penaltyAmount = Number(booking.totalAmount) - refundAmount;

      // KHÔNG CẬP NHẬT TRẠNG THÁI GIAO DỊCH GỐC - Giữ nguyên success làm lịch sử dòng tiền

      // Tạo bản ghi cho phần tiền trả lại khách (Trạng thái PENDING - Chờ duyệt hoàn tiền)
      if (refundAmount > 0) {
        await tx.payment.create({
          data: {
            bookingId: booking.id,
            amount: refundAmount,
            method: successPayment.method,
            status: 'pending_refund',
            feeType: 'refund',
            transactionRef: `REFUND-${successPayment.transactionRef ?? booking.id}`,
          },
        });
      }

      // Tạo bản ghi cho phần tiền phạt khách sạn thu được
      if (penaltyAmount > 0) {
        await tx.payment.create({
          data: {
            bookingId: booking.id,
            amount: penaltyAmount,
            method: successPayment.method,
            status: 'success',
            feeType: 'penalty',
            paidAt: now,
            transactionRef: `PENALTY-${booking.id}-${Date.now()}`,
          },
        });
      }
    }

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Booking',
      targetId: bookingId,
      action: 'UPDATE',
      oldValue: oldBooking,
      newValue: updatedBooking,
    });
  });
  
  emitBookingUpdate(bookingId, {
    status: 'cancelled',
  });
  
  if (booking.customer) {
    sendCancellationEmail(
      {
        id: booking.id,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        totalAmount: Number(booking.totalAmount),
        roomId: booking.roomId,
      },
      {
        fullName: booking.customer.fullName,
        email: booking.customer.email,
      },
      refundAmount > 0 ? refundAmount : undefined
    );
  }

  return { refundAmount };
};

// ================= HÀM MỚI CHO ADMIN XÁC NHẬN HOÀN TIỀN =================
export const confirmRefund = async (bookingId: number, staffId: number) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { payments: true }
  });

  if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');

  // Tìm giao dịch hoàn tiền đang ở trạng thái pending
  const pendingRefund = booking.payments.find(p => p.feeType === 'refund' && p.status === 'pending_refund');
  
  if (!pendingRefund) {
    throw new AppError(400, 'Không tìm thấy yêu cầu hoàn tiền nào đang chờ xử lý cho đơn này');
  }

  await prisma.$transaction(async (tx) => {
    // Cập nhật trạng thái hoàn tiền thành công
    await tx.payment.update({
      where: { id: pendingRefund.id },
      data: {
        status: 'refunded',
        refundedAt: new Date()
      }
    });

    await createAuditLog({
      tx,
      actorId: staffId,
      targetTable: 'Payment',
      targetId: pendingRefund.id,
      action: 'UPDATE',
      oldValue: { status: 'pending_refund' },
      newValue: { status: 'refunded' }
    });
  });

  emitBookingUpdate(bookingId, { status: 'cancelled' }); 

  return { message: 'Xác nhận hoàn tiền thành công' };
};
// ======================================================================

export const checkIn = async (bookingId: number, staffId: number) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { room: true }
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  }

  if (booking.status !== 'confirmed') {
    throw new AppError(400, `Không thể check-in đơn ở trạng thái ${booking.status}`);
  }

  const now = new Date();
  const scheduledDate = new Date(booking.checkInDate); 

  if (now < scheduledDate) {
    throw new AppError(
      400, 
      `Chưa đến giờ nhận phòng tiêu chuẩn (Sau 14:00 ngày ${scheduledDate.toLocaleDateString('vi-VN')})`
    );
  }

  if (booking.room.status !== 'available') {
    throw new AppError(
      400,
      'Phòng hiện tại chưa sẵn sàng đón khách (Đang có khách khác ở hoặc đang dọn dẹp). Vui lòng đợi phòng sạch mới có thể check-in.'
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.booking.update({
      where: { id: bookingId },
      data: { status: 'checked_in' },
    });

    await tx.room.update({
      where: { id: booking.roomId },
      data: { status: 'occupied' },
    });

    await createAuditLog({
      tx,
      actorId: staffId,
      targetTable: 'Booking',
      targetId: bookingId,
      action: 'UPDATE',
      oldValue: { status: booking.status },
      newValue: { status: 'checked_in' },
    });
  });

  emitBookingUpdate(bookingId, {
    status: 'checked_in',
    roomId: booking.roomId,
    roomStatus: 'occupied',
  });

  return { message: 'Check-in thành công' };
};

export const checkOut = async (bookingId: number, staffId: number) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  }

  if (booking.status !== 'checked_in') {
    throw new AppError(400, `Không thể check-out đơn ở trạng thái ${booking.status}`);
  }

  await prisma.$transaction(async (tx) => {
    await tx.booking.update({
      where: { id: bookingId },
      data: { status: 'checked_out' },
    });

    await tx.room.update({
      where: { id: booking.roomId },
      data: { status: 'cleaning' },
    });

    await createAuditLog({
      tx,
      actorId: staffId,
      targetTable: 'Booking',
      targetId: bookingId,
      action: 'UPDATE',
      oldValue: { status: booking.status },
      newValue: { status: 'checked_out' },
    });
  });

  emitBookingUpdate(bookingId, {
    status: 'checked_out',
    roomId: booking.roomId,
    roomStatus: 'cleaning',
  });

  return { message: 'Check-out thành công' };
};

export const createOfflineBooking = async (
  data: any,
  staffId: number
) => {
  const checkInDate = new Date(data.checkInDate);
  checkInDate.setHours(14, 0, 0, 0);
  const checkOutDate = new Date(data.checkOutDate);
  checkOutDate.setHours(12, 0, 0, 0);
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  return prisma.$transaction(async (tx) => {
    let finalUserId: number;

    if (data.userId) {
      finalUserId = data.userId;
    } else if (data.newCustomer) {
      const newUser = await tx.user.create({
        data: {
          fullName: data.newCustomer.fullName,
          phoneNumber: data.newCustomer.phoneNumber,
          role: 'customer',
          email: `guest${Date.now()}@hotel.com`,
          passwordHash: 'OFFLINE_ACCOUNT',
        },
      });
      finalUserId = newUser.id;
    } else {
      throw new AppError(400, 'Thông tin khách hàng không hợp lệ');
    }

    const rooms = await tx.room.findMany({
      where: {
        roomTypeId: data.roomId,
        status: 'available',
      },
      include: { roomType: true },
    });

    if (rooms.length === 0) {
      throw new AppError(404, 'Không có phòng trống cho loại phòng này');
    }

    let assignedRoom = null;
    for (const room of rooms) {
      const conflict = await tx.booking.findFirst({
        where: {
          roomId: room.id,
          status: { notIn: ['cancelled'] },
          AND: [
            { checkInDate: { lt: checkOutDate } },
            { checkOutDate: { gt: checkInDate } },
          ],
        },
      });

      if (!conflict) {
        assignedRoom = room;
        break;
      }
    }

    if (!assignedRoom) {
      throw new AppError(409, 'Hết phòng trống trong khoảng thời gian này');
    }

    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / MS_PER_DAY);
    const totalAmount = nights * Number(assignedRoom.roomType.basePrice);

    const booking = await tx.booking.create({
      data: {
        userId: finalUserId,
        roomId: assignedRoom.id,
        createdBy: staffId,
        checkInDate,
        checkOutDate,
        guestCount: data.guestCount,
        totalAmount,
        source: 'offline',
        status: 'confirmed',
        paidAt: new Date(),
      },
    });

    await tx.payment.create({
      data: {
        bookingId: booking.id,
        amount: totalAmount,
        method: data.paymentMethod,
        status: 'success',
        feeType: 'booking',
        paidAt: new Date(),
        transactionRef: `OFFLINE-${booking.id}-${Date.now()}`,
      },
    });

    await createAuditLog({
      tx,
      actorId: staffId,
      targetTable: 'Booking',
      targetId: booking.id,
      action: 'CREATE',
      oldValue: null,
      newValue: booking,
    });
    emitBookingUpdate(booking.id, { status: booking.status });
    return booking;
  });
};

export const updateOfflineBooking = async (
  bookingId: number,
  data: Partial<CreateOfflineBookingDto>,
  staffId: number
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  }

  if (booking.source !== 'offline') {
    throw new AppError(
      403,
      'Chỉ khách hàng hoặc Admin mới có quyền thay đổi đơn online'
    );
  }

  const nonEditableStatuses = ['checked_in', 'checked_out', 'cancelled'];

  if (nonEditableStatuses.includes(booking.status)) {
    throw new AppError(400, `Không thể sửa đơn ở trạng thái ${booking.status}`);
  }

  return prisma.$transaction(async (tx) => {
    const checkInDate = data.checkInDate ? new Date(data.checkInDate) : booking.checkInDate;
    if (data.checkInDate) checkInDate.setHours(14, 0, 0, 0);
    const checkOutDate = data.checkOutDate ? new Date(data.checkOutDate) : booking.checkOutDate;
    if (data.checkOutDate) checkOutDate.setHours(12, 0, 0, 0);
    const roomId = data.roomId ?? booking.roomId;

    const hasDateOrRoomChange = data.roomId || data.checkInDate || data.checkOutDate;

    if (hasDateOrRoomChange) {
      await tx.$executeRaw`SELECT room_id FROM room WHERE room_id = ${roomId} FOR UPDATE`;

      const conflict = await tx.booking.findFirst({
        where: {
          roomId,
          id: { not: bookingId },
          status: { notIn: ['cancelled'] as BookingStatus[] },
          AND: [
            { checkInDate: { lt: checkOutDate } },
            { checkOutDate: { gt: checkInDate } },
          ],
        },
      });

      if (conflict) {
        throw new AppError(409, 'Phòng đã được đặt trong khoảng thời gian này');
      }
    }

    let totalAmount = Number(booking.totalAmount);

    if (hasDateOrRoomChange) {
      const room = await tx.room.findUnique({
        where: { id: roomId },
        include: { roomType: true },
      });

      if (!room) {
        throw new AppError(404, 'Không tìm thấy phòng');
      }

      const nights = Math.ceil(
        (checkOutDate.getTime() - checkInDate.getTime()) / MS_PER_DAY
      );

      totalAmount = nights * Number(room.roomType.basePrice);
    }

    const oldBooking = { ...booking };

    const updated = await tx.booking.update({
      where: { id: bookingId },
      data: {
        ...(data.roomId && { roomId: data.roomId }),
        ...(data.checkInDate && { checkInDate }),
        ...(data.checkOutDate && { checkOutDate }),
        ...(data.guestCount && { guestCount: data.guestCount }),
        ...(hasDateOrRoomChange && { totalAmount }),
      },
    });

    const priceDiff = totalAmount - Number(booking.totalAmount);

    if (hasDateOrRoomChange && priceDiff !== 0) {
      await tx.payment.create({
        data: {
          bookingId,
          amount: Math.abs(priceDiff),
          method: 'cash',
          status: 'success', 
          feeType: priceDiff > 0 ? 'booking' : 'refund', 
          paidAt: new Date(),
          ...(priceDiff < 0 && { refundedAt: new Date() }),
          transactionRef: `OFFLINE-ADJ-${bookingId}-${Date.now()}`,
        },
      });
    }

    await createAuditLog({
      tx,
      actorId: staffId,
      targetTable: 'Booking',
      targetId: bookingId,
      action: 'UPDATE',
      oldValue: oldBooking,
      newValue: updated,
    });

    return {
      ...updated,
      priceDiff,
    };
  });
};

export const createReview = async (
  bookingId: number,
  userId: number,
  data: { rating: number; comment?: string }
) => {
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, userId },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  }

  if (booking.status !== 'checked_out') {
    throw new AppError(400, 'Chỉ có thể đánh giá sau khi đã trả phòng');
  }

  const existingReview = await prisma.review.findUnique({
    where: { bookingId },
  });

  if (existingReview) {
    throw new AppError(409, 'Bạn đã đánh giá đơn đặt phòng này rồi');
  }

  return prisma.review.create({
    data: {
      bookingId,
      userId,
      rating: data.rating,
      comment: data.comment,
    },
  });
};

export const getReviewsByRoomType = async (
  roomTypeId: number,
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;

  const where = {
    booking: {
      room: {
        roomTypeId,
      },
    },
  };

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    }),
    prisma.review.count({ where }),
  ]);

  return {
    reviews,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getRefundPreview = async (bookingId: number, userId: number) => {
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, userId },
    include: {
      payments: {
        where: { status: 'success', feeType: 'booking' },
        take: 1,
      },
    },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  }

  if (!['confirmed', 'pending_payment'].includes(booking.status)) {
    throw new AppError(400, 'Đơn không thể hủy');
  }

  const totalAmount = Number(booking.totalAmount);
  const isPaid = booking.payments.length > 0;
  const now = new Date();
  const daysUntilCheckIn = Math.ceil(
    (booking.checkInDate.getTime() - now.getTime()) / 86400000
  );

  let refundAmount = 0;
  let penaltyAmount = 0;
  let refundPolicy = '';

  if (!isPaid) {
    refundPolicy = 'Đơn chưa thanh toán. Hủy ngay mà không mất phí.';
  } else if (daysUntilCheckIn >= 3) {
    refundAmount = totalAmount;
    refundPolicy = 'Hủy trước 3 ngày — hoàn 100% tiền phòng.';
  } else if (daysUntilCheckIn >= 0) {
    refundAmount = totalAmount * 0.5;
    penaltyAmount = totalAmount * 0.5;
    refundPolicy = `Hủy trong vòng 3 ngày trước nhận phòng — hoàn 50% (${daysUntilCheckIn} ngày còn lại).`;
  } else {
    throw new AppError(400, 'Không thể hủy sau ngày nhận phòng');
  }

  return {
    bookingId,
    totalAmount,
    isPaid,
    refundAmount,
    penaltyAmount,
    refundPolicy,
    daysUntilCheckIn,
    checkInDate: booking.checkInDate,
    checkOutDate: booking.checkOutDate,
  };
};