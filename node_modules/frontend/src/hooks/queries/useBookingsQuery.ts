import { useQuery } from '@tanstack/react-query';
import { bookingService } from '../../services/booking.service';
import { paymentService } from '../../services/payment.service';
import type { BookingStatus } from '../../types/booking.types';

export const useMyBookings = (status?: BookingStatus) => {
  return useQuery({
    queryKey: ['bookings', 'my', status],
    queryFn: () => bookingService.getMyBookings(status),
  });
};

export const usePaymentStatus = (bookingId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ['payment', 'status', bookingId],
    queryFn: () => paymentService.getStatus(bookingId),
    enabled,
  });
};

export const useRoomTypeReviews = (roomTypeId: number) =>
  useQuery({
    queryKey: ['reviews', roomTypeId],
    queryFn: () => bookingService.getReviewsByRoomType(roomTypeId),
    enabled: !!roomTypeId,
  });