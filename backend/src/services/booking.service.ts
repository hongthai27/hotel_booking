import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { createAuditLog } from '../utils/audit-log.util';
import { Prisma, BookingStatus, BookingSource, RoomStatus } from '@prisma/client';
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

  const excludedRoomStatuses = Object.values(RoomStatus).filter((s) =>
    ['maintenance', 'out_of_order', 'outoforder'].includes(s.toLowerCase())
  );

  const excludedBookingStatuses = Object.values(BookingStatus).filter((s) =>
    s.toLowerCase() === 'cancelled'
  );

  return prisma.$transaction(async (tx) => {
    const rooms = await tx.room.findMany({
      where: {
        roomTypeId: data.roomId,
        status: { notIn: excludedRoomStatuses },
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
          status: { notIn: excludedBookingStatuses },
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

    let totalAmount = nights * Number(availableRoom.roomType.basePrice);
    let discountAmount = 0;
    let appliedPromotionId: number | null = null;

    // -- LOGIC ÁP DỤNG MÃ KHUYẾN MÃI TỪ DATABASE --
    if (data.promoCode) {
      const code = data.promoCode.toUpperCase().trim();
      const promo = await tx.promotion.findUnique({
        where: { code },
      });

      if (!promo || !promo.isActive) {
        throw new AppError(400, 'Mã ưu đãi không hợp lệ hoặc đã bị khóa.');
      }

      const now = new Date();
      if (now < promo.startDate || now > promo.endDate) {
        throw new AppError(400, 'Mã ưu đãi đã hết hạn hoặc chưa đến thời gian áp dụng.');
      }

      if (promo.usageLimit !== null && promo.usedCount >= promo.usageLimit) {
        throw new AppError(400, 'Mã ưu đãi đã hết lượt sử dụng.');
      }

      if (promo.minNights && nights < promo.minNights) {
        throw new AppError(400, `Chưa đủ điều kiện: Cần đặt tối thiểu ${promo.minNights} đêm.`);
      }

      // Kiểm tra mỗi user chỉ được dùng 1 lần với mã này (không tính đơn đã hủy)
      const hasUsed = await tx.booking.findFirst({
        where: {
          userId,
          promotionId: promo.id,
          status: { notIn: excludedBookingStatuses },
        },
      });

      if (hasUsed) {
        throw new AppError(400, 'Bạn đã sử dụng mã ưu đãi này trước đó rồi.');
      }

      if (promo.type === 'percentage') discountAmount = (totalAmount * promo.value) / 100;
      else if (promo.type === 'free_night') discountAmount = Number(availableRoom.roomType.basePrice) * promo.value;
      else if (promo.type === 'fixed') discountAmount = promo.value;

      totalAmount = Math.max(0, totalAmount - discountAmount);
      appliedPromotionId = promo.id;

      // Cập nhật tăng số lượt sử dụng mã
      await tx.promotion.update({
        where: { id: promo.id },
        data: { usedCount: { increment: 1 } },
      });
    }

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
        specialRequests: data.specialRequests,
        promoCode: data.promoCode ? data.promoCode.toUpperCase().trim() : null,
        discountAmount,
        promotionId: appliedPromotionId,
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
      review: true,
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
      review: true,
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
  q?: string;
}

export const getAllBookings = async (filter?: GetAllBookingsFilter) => {
  const page = Number(filter?.page) || 1;
  const limit = Number(filter?.limit) || 20;
  const skip = (page - 1) * limit;
  
  const searchKey = filter?.search || filter?.keyword || filter?.q;

  const where: Prisma.BookingWhereInput = {
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

      await tx.payment.update({
        where: { id: successPayment.id },
        data: { status: refundAmount > 0 ? 'pending_refund' : 'success' },
      });

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
  
  const fullBooking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      customer: true,
      room: {
        include: {
          roomType: {
            include: {
              images: { take: 1, orderBy: { displayOrder: 'asc' } },
            },
          },
        },
      },
    },
  });

  if (fullBooking?.customer) {
    void sendCancellationEmail(fullBooking as never, fullBooking.customer, refundAmount).catch(() => {});
  }

  return { refundAmount };
};

export const checkIn = async (
  bookingId: number,
  staffId: number,
  data: { idNumber?: string; checkinNote?: string }
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { room: true },
  });

  if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');

  if (booking.status !== 'confirmed') {
    throw new AppError(400, `Không thể check-in đơn ở trạng thái ${booking.status}`);
  }

  // Chỉ cho phép check-in vào đúng ngày (hoặc sau ngày) nhận phòng
  const now = new Date();
  const checkInDay = new Date(booking.checkInDate);
  checkInDay.setHours(0, 0, 0, 0); // Lấy mốc 0h sáng của ngày check-in

  if (now.getTime() < checkInDay.getTime()) {
    throw new AppError(400, 'Chưa đến ngày nhận phòng. Không thể thao tác check-in sớm!');
  }

  let finalRoomId = booking.roomId;
  let isReassigned = false;
  let newRoomNumber = '';

  const excludedBookingStatuses = Object.values(BookingStatus).filter((s) =>
    s.toLowerCase() === 'cancelled'
  );

  // Kiểm tra xem phòng đã thực sự trống và sẵn sàng chưa
  if (booking.room.status.toLowerCase() !== 'available') {
    // 1. Tự động tìm phòng trống khác cùng hạng
    const availableRooms = await prisma.room.findMany({
      where: {
        roomTypeId: booking.room.roomTypeId,
        status: Object.values(RoomStatus).find(s => s.toLowerCase() === 'available') || ('available' as RoomStatus),
        id: { not: booking.roomId }
      }
    });

    let substituteRoom = null;
    for (const r of availableRooms) {
      const conflict = await prisma.booking.findFirst({
        where: {
          roomId: r.id,
          status: { notIn: excludedBookingStatuses },
          AND: [
            { checkInDate: { lt: booking.checkOutDate } },
            { checkOutDate: { gt: booking.checkInDate } },
          ],
        },
      });
      if (!conflict) {
        substituteRoom = r;
        break;
      }
    }

    if (substituteRoom) {
      finalRoomId = substituteRoom.id;
      newRoomNumber = substituteRoom.roomNumber;
      isReassigned = true;
    } else {
      let statusText = '';
      switch (booking.room.status as string) {
        case 'occupied': statusText = 'đang có khách ở (khách cũ chưa check-out)'; break;
        case 'cleaning': statusText = 'đang dọn dẹp chưa xong'; break;
        case 'maintenance': statusText = 'đang bảo trì'; break;
        case 'out_of_order': statusText = 'đã ngừng hoạt động'; break;
        default: statusText = booking.room.status;
      }
      throw new AppError(400, `Phòng ${booking.room.roomNumber} hiện chưa sẵn sàng (${statusText}) và không còn phòng trống tương đương để đổi. Vui lòng hoàn tất check-out, dọn phòng hoặc đổi hạng phòng khác.`);
    }
  }

  await prisma.$transaction(async (tx) => {
    if (isReassigned) {
      await tx.$executeRaw`SELECT room_id FROM room WHERE room_id = ${finalRoomId} FOR UPDATE`;

      const conflict = await tx.booking.findFirst({
        where: {
          roomId: finalRoomId,
          status: { notIn: excludedBookingStatuses },
          AND: [
            { checkInDate: { lt: booking.checkOutDate } },
            { checkOutDate: { gt: booking.checkInDate } },
          ],
        },
      });

      const currentRoomStatus = await tx.room.findUnique({ where: { id: finalRoomId } });

      if (conflict || currentRoomStatus?.status.toLowerCase() !== 'available') {
        throw new AppError(409, 'Phòng được tự động chọn vừa bị thay đổi trạng thái. Vui lòng thử lại.');
      }
    }

    await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: 'checked_in',
        ...(isReassigned && { roomId: finalRoomId }),
        ...(data.idNumber && { idNumber: data.idNumber }),
        ...(data.checkinNote && { checkinNote: data.checkinNote }),
      },
    });

    await tx.room.update({
      where: { id: finalRoomId },
      data: { status: Object.values(RoomStatus).find(s => s.toLowerCase() === 'occupied') || ('occupied' as RoomStatus) },
    });

    await createAuditLog({
      tx,
      actorId: staffId,
      targetTable: 'Booking',
      targetId: bookingId,
      action: 'UPDATE',
      oldValue: { status: booking.status, roomId: booking.roomId },
      newValue: { status: 'checked_in', idNumber: data.idNumber, ...(isReassigned && { roomId: finalRoomId }) },
    });
  });

  emitBookingUpdate(bookingId, {
    status: 'checked_in',
    roomId: finalRoomId,
    roomStatus: Object.values(RoomStatus).find(s => s.toLowerCase() === 'occupied') || 'occupied',
    ...(isReassigned && { message: `Đã tự động đổi sang phòng ${newRoomNumber}` })
  });

  if (isReassigned) {
    return { message: `Phòng ${booking.room.roomNumber} chưa sẵn sàng. Hệ thống đã tự động chuyển sang phòng ${newRoomNumber} và Check-in thành công.` };
  }

  return { message: 'Check-in thành công' };
};

export const checkOut = async (
  bookingId: number,
  staffId: number,
  extraCharges: { label: string; amount: number }[],
  paymentMethod: string = 'cash'
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      room: { include: { roomType: true } },
    },
  });

  if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');

  if (booking.status !== 'checked_in') {
    throw new AppError(400, `Không thể check-out đơn ở trạng thái ${booking.status}`);
  }

  // --- THÊM LOGIC TỰ ĐỘNG TÍNH PHỤ THU QUÁ GIỜ ---
  const now = new Date();
  const checkOutDate = new Date(booking.checkOutDate);
  
  if (now > checkOutDate) {
    const diffMs = now.getTime() - checkOutDate.getTime();
    const overstayHours = Math.ceil(diffMs / (1000 * 60 * 60)); // Làm tròn lên số giờ (VD: lố 1h15p tính là 2h)
    
    const basePrice = Number(booking.room.roomType.basePrice);
    const hourlyRate = basePrice * 0.1; // Phạt 10% giá phòng cho mỗi giờ
    const overstayFee = Math.min(overstayHours * hourlyRate, basePrice); // Tối đa 100% (1 ngày)

    // Kiểm tra xem lễ tân đã tự thêm phí quá giờ vào form chưa (tránh tính trùng)
    const alreadyHasLateFee = extraCharges.some(c => c.label.toLowerCase().includes('quá giờ') || c.label.toLowerCase().includes('trễ'));
    
    if (overstayFee > 0 && !alreadyHasLateFee) {
      extraCharges.push({
        label: `Phụ thu quá giờ (${overstayHours} giờ)`,
        amount: overstayFee
      });
    }
  }

  const extraTotal = extraCharges.reduce((sum, c) => sum + c.amount, 0);

  await prisma.$transaction(async (tx) => {
    await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: 'checked_out',
        extraCharges: extraCharges.length > 0 ? extraCharges : undefined,
        extraTotal,
      },
    });

    await tx.room.update({
      where: { id: booking.roomId },
      data: { status: Object.values(RoomStatus).find(s => s.toLowerCase() === 'cleaning') || ('cleaning' as RoomStatus) },
    });

    // Tạo payment record phụ thu nếu có
    if (extraTotal > 0) {
      await tx.payment.create({
        data: {
          bookingId,
          amount: extraTotal,
          method: paymentMethod as "cash" | "qr_code",
          status: 'success',
          feeType: 'booking',
          paidAt: new Date(),
          transactionRef: `EXTRA-${bookingId}-${Date.now()}`,
        },
      });
    }

    await createAuditLog({
      tx,
      actorId: staffId,
      targetTable: 'Booking',
      targetId: bookingId,
      action: 'UPDATE',
      oldValue: { status: booking.status },
      newValue: { status: 'checked_out', extraTotal },
    });
  });

  emitBookingUpdate(bookingId, {
    status: 'checked_out',
    roomId: booking.roomId,
    roomStatus: Object.values(RoomStatus).find(s => s.toLowerCase() === 'cleaning') || 'cleaning',
  });

  return { message: 'Check-out thành công', extraTotal };
};

export const createOfflineBooking = async (
  data: CreateOfflineBookingDto,
  staffId: number
) => {
  const checkInDate = new Date(data.checkInDate);
  checkInDate.setHours(14, 0, 0, 0);
  const checkOutDate = new Date(data.checkOutDate);
  checkOutDate.setHours(12, 0, 0, 0);

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

    const excludedRoomStatuses = Object.values(RoomStatus).filter((s) =>
      ['maintenance', 'out_of_order', 'outoforder'].includes(s.toLowerCase())
    );

    const excludedBookingStatuses = Object.values(BookingStatus).filter((s) =>
      s.toLowerCase() === 'cancelled'
    );

    const rooms = await tx.room.findMany({
      where: {
        roomTypeId: data.roomId,
        status: { notIn: excludedRoomStatuses },
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
          status: { notIn: excludedBookingStatuses },
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
    let totalAmount = nights * Number(assignedRoom.roomType.basePrice);
    let discountAmount = 0;
    let appliedPromotionId: number | null = null;

    if (data.promoCode) {
      const code = data.promoCode.toUpperCase().trim();
      const promo = await tx.promotion.findUnique({
        where: { code },
      });

      if (!promo || !promo.isActive) {
        throw new AppError(400, 'Mã ưu đãi không hợp lệ hoặc đã bị khóa.');
      }

      const now = new Date();
      if (now < promo.startDate || now > promo.endDate) {
        throw new AppError(400, 'Mã ưu đãi đã hết hạn hoặc chưa đến thời gian áp dụng.');
      }

      if (promo.usageLimit !== null && promo.usedCount >= promo.usageLimit) {
        throw new AppError(400, 'Mã ưu đãi đã hết lượt sử dụng.');
      }

      if (promo.minNights && nights < promo.minNights) {
        throw new AppError(400, `Chưa đủ điều kiện: Cần đặt tối thiểu ${promo.minNights} đêm.`);
      }

      const hasUsed = await tx.booking.findFirst({
        where: {
          userId: finalUserId,
          promotionId: promo.id,
          status: { notIn: excludedBookingStatuses },
        },
      });

      if (hasUsed) {
        throw new AppError(400, 'Khách hàng đã sử dụng mã ưu đãi này trước đó rồi.');
      }

      if (promo.type === 'percentage') discountAmount = (totalAmount * promo.value) / 100;
      else if (promo.type === 'free_night') discountAmount = Number(assignedRoom.roomType.basePrice) * promo.value;
      else if (promo.type === 'fixed') discountAmount = promo.value;

      totalAmount = Math.max(0, totalAmount - discountAmount);
      appliedPromotionId = promo.id;

      await tx.promotion.update({
        where: { id: promo.id },
        data: { usedCount: { increment: 1 } },
      });
    }

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
        promoCode: data.promoCode ? data.promoCode.toUpperCase().trim() : null,
        discountAmount,
        promotionId: appliedPromotionId,
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

    const excludedBookingStatuses = Object.values(BookingStatus).filter((s) =>
      s.toLowerCase() === 'cancelled'
    );

    if (hasDateOrRoomChange) {
      await tx.$executeRaw`SELECT room_id FROM room WHERE room_id = ${roomId} FOR UPDATE`;

      const conflict = await tx.booking.findFirst({
        where: {
          roomId,
          id: { not: bookingId },
          status: { notIn: excludedBookingStatuses },
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

      const newBaseTotal = nights * Number(room.roomType.basePrice);
      totalAmount = Math.max(0, newBaseTotal - Number(booking.discountAmount));
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

export const getAllRoomTypesPublic = async () => {
  return prisma.roomType.findMany({
    include: {
      amenities: {
        include: { amenity: true },
      },
      images: {
        take: 1,
        orderBy: { displayOrder: 'asc' },
      },
    },
    orderBy: { basePrice: 'asc' },
  });
};

export const getCheckOutPreview = async (bookingId: number) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      room: {
        include: { roomType: true },
      },
      customer: true,
    },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  }

  const now = new Date();
  const checkOutDate = new Date(booking.checkOutDate);
  let overstayHours = 0;
  let overstayFee = 0;

  if (now > checkOutDate) {
    const diffMs = now.getTime() - checkOutDate.getTime();
    overstayHours = Math.ceil(diffMs / (1000 * 60 * 60));
    const basePrice = Number(booking.room.roomType.basePrice);
    const hourlyRate = basePrice * 0.1;
    overstayFee = Math.min(overstayHours * hourlyRate, basePrice);
  }

  return {
    bookingId: booking.id,
    guestName: booking.customer?.fullName ?? 'Khách',
    roomNumber: booking.room.roomNumber,
    checkOutDate: booking.checkOutDate,
    actualCheckOut: now,
    overstayHours,
    overstayFee,
    basePrice: Number(booking.room.roomType.basePrice),
  };
};