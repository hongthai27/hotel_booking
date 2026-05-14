import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { bookingService } from '../../services/booking.service';
import type { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { BookingStatus } from '../../types/booking.types';

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: bookingService.create,
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason?: string }) =>
      bookingService.cancel(id, reason),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', 'my'] });
      toast.success('Hủy đặt phòng thành công');
    },

    onError: (err: AxiosError<{ message: string }>) => {
      const message = err.response?.data?.message ?? 'Có lỗi xảy ra, vui lòng thử lại';
      toast.error(message);
    },
  });
};

export const useMyBookings = (status?: BookingStatus) => {
  return useQuery({
    queryKey: ['bookings', 'my', status],
    queryFn: () => bookingService.getMyBookings(status),
  });
};

export const useBookingDetail = (id: number) => {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: () => bookingService.getById(id),
    enabled: !!id, 
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      bookingId,
      data,
    }: {
      bookingId: number
      data: {
        rating: number
        comment?: string
      }
    }) => bookingService.createReview(bookingId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookings', 'my'],
      })

      toast.success('Cảm ơn bạn đã đánh giá!')
    },

    onError: (e: any) =>
      toast.error(
        e.response?.data?.message ?? 'Gửi đánh giá thất bại'
      ),
  })
}