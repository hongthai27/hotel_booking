import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socketService, SOCKET_EVENTS } from '../services/socketService';
import type { BookingStatus } from '../types/booking.types';

// ── Types ──────────────────────────────────────────────────────────────────────
interface BookingUpdatePayload {
  status: BookingStatus;
  roomId?: number;
  roomStatus?: string;
}

export interface NewBookingPayload {
  bookingId: number;
  roomTypeName: string;
  guestName: string;
  checkInDate: string;
}

// ── 1. Hook dùng cho danh sách (Lịch sử khách & Danh sách Admin) ──────────────
export const useSocketAllBookings = (bookingIds: number[] = []): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Đảm bảo Socket luôn được mở khi Khách hàng truy cập trang
    if (!socketService.socket.connected) {
      socketService.connect('customer');
    }

    // Join vào tất cả các room đang hiện trên màn hình (dành cho User)
    bookingIds.forEach((id) => {
      if (id) socketService.joinBooking(id);
    });

    const handleUpdate = (_data: BookingUpdatePayload) => {
      // Quét sạch mọi cache liên quan khi có biến động
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    };

    socketService.on(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);

    return () => {
      socketService.off(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);
    };
  }, [queryClient, JSON.stringify(bookingIds)]);
};

// ── 2. Hook dùng cho trang Chi tiết (Theo dõi 1 đơn duy nhất) ─────────────────
export const useSocketBooking = (bookingId: number): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!bookingId) return;

    // Đảm bảo Socket luôn được mở khi Khách hàng truy cập trang
    if (!socketService.socket.connected) {
      socketService.connect('customer');
    }

    socketService.joinBooking(bookingId);

    const handleUpdate = (_data: BookingUpdatePayload) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      queryClient.invalidateQueries({ queryKey: ['admin-booking-detail', String(bookingId)] });
    };

    socketService.on(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);
    
    // Lắng nghe thêm event thanh toán cho trang chi tiết
    socketService.on(SOCKET_EVENTS.PAYMENT_CONFIRMED, () => {
      queryClient.invalidateQueries({ queryKey: ['payment', 'status', bookingId] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    });

    return () => {
      socketService.off(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);
      socketService.off(SOCKET_EVENTS.PAYMENT_CONFIRMED);
    };
  }, [bookingId, queryClient]);
};

// ── 3. Hook lắng nghe đơn mới realtime (Dùng trong AdminLayout) ────────────────
export const useSocketNewBooking = (
  onNewBooking: (payload: NewBookingPayload) => void
): void => {
  useEffect(() => {
    socketService.on(
      SOCKET_EVENTS.BOOKING_NEW,
      onNewBooking as (data: unknown) => void
    );
    
    return () => {
      socketService.off(SOCKET_EVENTS.BOOKING_NEW);
    };
  }, [onNewBooking]);
};