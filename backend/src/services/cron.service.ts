import { prisma } from '../utils/prisma.util';
import { emitBookingUpdate } from '../utils/socket.util';

export const startCronJobs = () => {
  setInterval(async () => {
    try {
      const now = new Date();
      const expiredTime = new Date(now.getTime() - 15 * 60 * 1000);

      const expiredBookings = await prisma.booking.findMany({
        where: {
          status: 'pending_payment',
          createdAt: { lt: expiredTime },
        },
      });

      if (expiredBookings.length > 0) {
        for (const booking of expiredBookings) {
          await prisma.booking.update({
            where: { id: booking.id },
            data: {
              status: 'cancelled',
              cancelReason: 'Hệ thống tự động hủy do quá hạn thanh toán 15 phút',
              cancelledAt: now,
            },
          });
          
          emitBookingUpdate(booking.id, { status: 'cancelled' });
        }
        console.log(`[Cron] Đã tự động hủy ${expiredBookings.length} đơn đặt phòng bị treo quá hạn thanh toán.`);
      }
    } catch (error) {
      console.error('[Cron] Lỗi khi dọn dẹp đơn quá hạn:', error);
    }
  }, 60 * 1000);
};