import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { BookingStatus } from '@prisma/client';

export const getRevenueReport = async (from: string, to: string) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    throw new AppError(400, 'Ngày không hợp lệ');
  }

  if (fromDate >= toDate) {
    throw new AppError(400, 'Ngày bắt đầu phải trước ngày kết thúc');
  }

  // Doanh thu theo tháng, chỉ tính payment success
  const monthly = await prisma.$queryRaw<Array<{
    month: string;
    revenue: number;
    bookingCount: bigint;
  }>>`
    SELECT
      DATE_FORMAT(p.paid_at, '%Y-%m') AS month,
      SUM(p.amount) AS revenue,
      COUNT(DISTINCT b.booking_id) AS bookingCount
    FROM PAYMENT p
    INNER JOIN BOOKING b ON b.booking_id = p.booking_id
    WHERE p.status = 'success'
      AND p.paid_at BETWEEN ${fromDate} AND ${toDate}
    GROUP BY month
    ORDER BY month ASC
  `;

  const totalRevenue = monthly.reduce(
    (sum, item) => sum + Number(item.revenue),
    0
  );

  const totalBookings = monthly.reduce(
    (sum, item) => sum + Number(item.bookingCount),
    0
  );

  const totalRooms = await prisma.room.count();

  const totalDays = Math.ceil(
    (toDate.getTime() - fromDate.getTime()) / 86400000
  );

  // Lấy tất cả booking có overlap với khoảng thời gian báo cáo
  // Dùng overlap condition thay vì gte/lte để không bỏ sót booking
  // cross-boundary (check-in trước fromDate hoặc check-out sau toDate)
  const checkedBookings = await prisma.booking.findMany({
    where: {
      status: {
        in: ['checked_in', 'checked_out'] as BookingStatus[],
      },
      // Booking overlap khi: checkIn < toDate AND checkOut > fromDate
      checkInDate: { lt: toDate },
      checkOutDate: { gt: fromDate },
    },
    select: {
      checkInDate: true,
      checkOutDate: true,
    },
  });

  // Clamp ngày về trong khoảng báo cáo trước khi tính số đêm
  // Tránh tính đêm của những ngày nằm ngoài khoảng from-to
  const usedNights = checkedBookings.reduce((sum, booking) => {
    const effectiveCheckIn = booking.checkInDate < fromDate
      ? fromDate
      : booking.checkInDate;

    const effectiveCheckOut = booking.checkOutDate > toDate
      ? toDate
      : booking.checkOutDate;

    const nights = Math.ceil(
      (effectiveCheckOut.getTime() - effectiveCheckIn.getTime()) / 86400000
    );

    return sum + nights;
  }, 0);

  const avgOccupancyRate =
    totalRooms * totalDays > 0
      ? Math.round((usedNights / (totalRooms * totalDays)) * 10000) / 100
      : 0;

  return {
    summary: {
      totalRevenue,
      totalBookings,
      avgOccupancyRate,
    },
    monthly: monthly.map((item) => ({
      month: item.month,
      revenue: Number(item.revenue),
      bookingCount: Number(item.bookingCount),
    })),
  };
};