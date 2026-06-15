import * as cron from 'node-cron';
import { prisma } from '../utils/prisma.util';
import { createAuditLog } from '../utils/audit-log.util';
import { logger } from '../utils/logger.util';
import { emitBookingUpdate } from '../utils/socket.util';

const PAYMENT_EXPIRY_MINUTES = 15;
const CANCEL_REASON = 'Hết thời gian thanh toán';
const SYSTEM_ACTOR_ID = 0; 

const cancelExpiredBookings = async (): Promise<void> => {
  const expiryThreshold = new Date(
    Date.now() - PAYMENT_EXPIRY_MINUTES * 60 * 1000
  );

  const expiredBookings = await prisma.booking.findMany({
    where: {
      status: 'pending_payment',
      createdAt: { lt: expiryThreshold },
    },
  });

  if (expiredBookings.length === 0) return;

  const now = new Date();
  let cancelledCount = 0;

  for (const booking of expiredBookings) {
    try {
      let updatedBooking; 

      await prisma.$transaction(async (tx) => {
        updatedBooking = await tx.booking.update({
          where: { id: booking.id },
          data: {
            status: 'cancelled',
            cancelledAt: now,
            cancelReason: CANCEL_REASON,
          },
        });

       
        await createAuditLog({
          tx,
          actorId: 1,
          targetTable: 'Booking',
          targetId: booking.id,
          action: 'UPDATE',
          oldValue: booking,
          newValue: updatedBooking,
        });
      });

      if (updatedBooking) {
        emitBookingUpdate(booking.id, {
          status: 'cancelled',
        });
      }

      cancelledCount++;
    } catch (error) {
      logger.error(`Lỗi hủy booking #${booking.id}:`, error);
    }
  }

  logger.info(`Đã tự động hủy ${cancelledCount} booking hết hạn thanh toán`);
};

export const startCancelExpiredBookingsJob = (): void => {
  cron.schedule('* * * * *', async () => {
    try {
      await cancelExpiredBookings();
    } catch (error) {
      logger.error('Lỗi khi chạy job hủy booking hết hạn:', error);
    }
  });

  logger.info('Cronjob: Cancel expired bookings đã được khởi động');
};