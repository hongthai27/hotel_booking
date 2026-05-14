import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socketService, SOCKET_EVENTS } from '../services/socketService';
import type { BookingStatus } from '../types/booking.types';

interface BookingUpdatePayload {
  status: BookingStatus;
  roomId?: number;
  roomStatus?: string;
}

export const useSocketBooking = (bookingId: number): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!bookingId) return;

    socketService.joinBooking(bookingId);

    socketService.on(SOCKET_EVENTS.BOOKING_UPDATED, (_data: BookingUpdatePayload) => {
      queryClient.invalidateQueries({ queryKey: ['bookings', 'my'] });
      queryClient.invalidateQueries({ queryKey: ['bookings', bookingId] });
    });

    return () => {
      socketService.off(SOCKET_EVENTS.BOOKING_UPDATED);
    };
  }, [bookingId, queryClient]);
};

export const useSocketAllBookings = (): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socketService.on(SOCKET_EVENTS.BOOKING_UPDATED, (_data: BookingUpdatePayload) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['rooms'] }); 
    });

    return () => {
      socketService.off(SOCKET_EVENTS.BOOKING_UPDATED);
    };
  }, [queryClient]);
};