import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socketService, SOCKET_EVENTS } from '../services/socketService';
import type { BookingStatus } from '../types/booking.types';

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

export const useSocketAllBookings = (bookingIds: number[] = []): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socketService.socket.connected) {
      socketService.connect('customer');
    }

    bookingIds.forEach((id) => {
      if (id) socketService.joinBooking(id);
    });

    const handleUpdate = (_data: BookingUpdatePayload) => {
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

export const useSocketBooking = (bookingId: number): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!bookingId) return;

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