import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { createAuditLog } from '../utils/audit-log.util';
import { sendBookingConfirmationEmail } from '../utils/email.util';
import { emitPaymentConfirmed, emitBookingUpdate, emitNewBooking } from '../utils/socket.util';

// Tạo QR payload giả lập, chứa thông tin giao dịch để frontend hiển thị mã QR
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

  // Tính expiredAt một lần duy nhất, dùng chung cho cả 2 trường hợp
  const expiredAt = new Date(booking.createdAt.getTime() + 15 * 60 * 1000);

  // Query trực tiếp thay vì kéo toàn bộ payments về RAM rồi filter
  const existingPayment = await prisma.payment.findFirst({
    where: { bookingId, status: 'pending' },
  });

  // Tạo payment mới nếu chưa có, dùng lại nếu đã có
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

  // Lấy payment mới nhất, có thể null nếu chưa tạo payment
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

  if (payment.status !== 'pending') {
    return {
      message: 'Giao dịch đã được xử lý trước đó',
      status: payment.status,
    };
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

  await prisma.$transaction(async (tx) => {
    const oldPayment = { ...payment };

    const updatedPayment = await tx.payment.update({
      where: { transactionRef },
      data: {
        status: 'success',
        paidAt: new Date(),
      },
    });

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
  });

  // PHÁT SỰ KIỆN SOCKET CHO KHÁCH HÀNG
  emitPaymentConfirmed(payment.bookingId);
  emitBookingUpdate(payment.bookingId, { status: 'confirmed' });

  // GỬI EMAIL & PHÁT SỰ KIỆN SOCKET CHO LỄ TÂN/ADMIN
  if (booking?.customer) {
    // Báo đơn mới lên hệ thống nội bộ
    emitNewBooking({
      bookingId: booking.id,
      roomTypeName: booking.room.roomType.typeName,
      guestName: booking.customer.fullName,
      checkInDate: booking.checkInDate,
    });

    // Fire and forget - Không block luồng response
    void sendBookingConfirmationEmail(
      {
        ...booking,
        // Truyền đích danh tên hạng phòng và số phòng ra ngoài để template Email dễ đọc
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
    const updated = await tx.payment.update({
      where: { id: paymentId },
      data: { status: 'refunded', refundedAt: new Date() },
    });

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