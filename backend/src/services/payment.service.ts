import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { createAuditLog } from '../utils/audit-log.util';
import { sendBookingConfirmationEmail } from '../utils/email.util';
import { emitPaymentConfirmed, emitBookingUpdate, emitNewBooking } from '../utils/socket.util';

const buildQrPayload = (
  transactionRef: string,
  amount: number,
  bookingId: number
): string => {
  return JSON.stringify({
    app: 'Hotel Booking',
    transactionRef,
    amount,
    note: `Thanh toán đơn đặt phòng #${bookingId}`,
    timestamp: new Date().toISOString(),
  });
};

export const initiatePayment = async (bookingId: number, userId: number) => {
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, userId },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  }

  if (booking.status !== 'pending_payment') {
    throw new AppError(400, 'Đơn đặt phòng không ở trạng thái chờ thanh toán');
  }

  const expiredAt = new Date(booking.createdAt.getTime() + 15 * 60 * 1000);

  if (new Date() > expiredAt) {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'cancelled', cancelReason: 'Hệ thống tự động hủy do quá hạn thanh toán 15 phút' }
    });
    throw new AppError(400, 'Đơn đặt phòng đã quá 15 phút. Hệ thống tự động hủy đơn, vui lòng đặt phòng mới.');
  }

  const existingPayment = await prisma.payment.findFirst({
    where: { bookingId, status: 'pending' },
  });

  const payment = existingPayment ?? await prisma.payment.create({
    data: {
      bookingId,
      amount: booking.totalAmount,
      method: 'qr_code',
      status: 'pending',
      feeType: 'booking',
      transactionRef: uuidv4(),
    },
  });

  return {
    paymentId: payment.id,
    transactionRef: payment.transactionRef,
    amount: Number(payment.amount),
    qrPayload: buildQrPayload(
      payment.transactionRef!,
      Number(payment.amount),
      bookingId
    ),
    expiredAt,
  };
};

export const getPaymentStatus = async (bookingId: number, userId: number) => {
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, userId },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  }

  const payment = await prisma.payment.findFirst({
    where: { bookingId },
    orderBy: { createdAt: 'desc' },
  });

  return {
    bookingStatus: booking.status,
    paymentStatus: payment?.status ?? null,
    transactionRef: payment?.transactionRef ?? null,
  };
};

export const simulateSuccess = async (transactionRef: string) => {
  const payment = await prisma.payment.findUnique({
    where: { transactionRef },
  });

  if (!payment) {
    throw new AppError(404, 'Không tìm thấy giao dịch');
  }

  const booking = await prisma.booking.findUnique({
    where: { id: payment.bookingId },
    include: {
      customer: true,
      room: {
        include: { roomType: true },
      },
    },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng liên quan');
  }

  const result = await prisma.$transaction(async (tx) => {
    const oldPayment = { ...payment };

    const updateResult = await tx.payment.updateMany({
      where: { 
        transactionRef,
        status: 'pending'
      },
      data: {
        status: 'success',
        paidAt: new Date(),
      },
    });

    if (updateResult.count === 0) {
      const current = await tx.payment.findUnique({ where: { transactionRef } });
      return { processed: true, message: 'Giao dịch đã được xử lý trước đó', status: current?.status };
    }

    const updatedPayment = await tx.payment.findUniqueOrThrow({ where: { transactionRef } });

    await tx.booking.update({
      where: { id: payment.bookingId },
      data: { status: 'confirmed', paidAt: new Date() },
    });

    await createAuditLog({
      tx,
      actorId: booking.userId, 
      targetTable: 'Payment',
      targetId: payment.id,
      action: 'UPDATE',
      oldValue: oldPayment,
      newValue: updatedPayment,
    });
    
    return { processed: false };
  });

  if (result.processed) {
    return {
      message: result.message,
      status: result.status,
    };
  }

  emitPaymentConfirmed(payment.bookingId);
  emitBookingUpdate(payment.bookingId, { status: 'confirmed' });

  if (booking?.customer) {
    emitNewBooking({
      bookingId: booking.id,
      roomTypeName: booking.room.roomType.typeName,
      guestName: booking.customer.fullName,
      checkInDate: booking.checkInDate,
    });

    void sendBookingConfirmationEmail(
      {
        ...booking,
        roomName: booking.room.roomType.typeName,
        roomTypeName: booking.room.roomType.typeName,
        roomNumber: booking.room.roomNumber,
        totalAmount: Number(booking.totalAmount),
      } as never,
      booking.customer
    ).catch(() => {});
  }

  return {
    message: 'Giả lập thanh toán thành công',
    status: 'success',
  };
};

export const confirmRefund = async (paymentId: number, actorId: number) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!payment || payment.status !== 'pending_refund') {
    throw new AppError(400, 'Giao dịch không tồn tại hoặc không ở trạng thái chờ hoàn tiền');
  }

  return prisma.$transaction(async (tx) => {
    const updateResult = await tx.payment.updateMany({
      where: { id: paymentId, status: 'pending_refund' },
      data: { status: 'refunded', refundedAt: new Date() },
    });

    if (updateResult.count === 0) {
      throw new AppError(400, 'Giao dịch đã được xử lý hoặc không còn ở trạng thái chờ hoàn tiền');
    }

    const updated = await tx.payment.findUniqueOrThrow({ where: { id: paymentId } });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Payment',
      targetId: paymentId,
      action: 'UPDATE',
      oldValue: { status: 'pending_refund' },
      newValue: { status: 'refunded' },
    });

    return updated;
  });
};

export const simulateFailure = async (transactionRef: string) => {
  const payment = await prisma.payment.findUnique({
    where: { transactionRef },
  });

  if (!payment) {
    throw new AppError(404, 'Không tìm thấy giao dịch');
  }

  const updateResult = await prisma.payment.updateMany({
    where: { 
      transactionRef,
      status: 'pending'
    },
    data: { status: 'failed' },
  });

  if (updateResult.count === 0) {
    const current = await prisma.payment.findUnique({ where: { transactionRef } });
    return {
      message: 'Giao dịch đã được xử lý trước đó',
      status: current?.status,
    };
  }

  return {
    message: 'Giả lập thanh toán thất bại',
    status: 'failed',
  };
};