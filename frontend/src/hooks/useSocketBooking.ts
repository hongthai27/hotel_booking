import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socketService, SOCKET_EVENTS } from '../services/socketService';
import type { BookingStatus } from '../types/booking.types';

interface BookingUpdatePayload {
  status: BookingStatus;
  roomId?: number;
  roomStatus?: string;
}

// 1. Hook dùng cho danh sách (Admin & Lịch sử khách)
export const useSocketAllBookings = (bookingIds: number[] = []): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Join vào tất cả các room đang hiện trên màn hình
    bookingIds.forEach(id => {
      if (id) socketService.joinBooking(id);
    });

    const handleUpdate = (_data: BookingUpdatePayload) => {
      // Khi có update, quét sạch mọi cache liên quan
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

// 2. Hook dùng cho trang Chi tiết
export const useSocketBooking = (bookingId: number): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!bookingId) return;
    
    socketService.joinBooking(bookingId);

    const handleUpdate = (_data: BookingUpdatePayload) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      // Cập nhật riêng luôn cho trang Chi tiết Admin
      queryClient.invalidateQueries({ queryKey: ['admin-booking-detail', String(bookingId)] });
    };

    socketService.on(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);

    return () => {
      socketService.off(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);
    };
  }, [bookingId, queryClient]);
};