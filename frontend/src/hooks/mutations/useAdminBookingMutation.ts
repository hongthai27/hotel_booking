import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminService } from '../../services/adminService';
import type { AxiosError } from 'axios';

const useInvalidateAdminBookings = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['admin', 'bookings'] });
};

const handleError = (err: AxiosError<{ message: string }>) => {
  const message = err.response?.data?.message ?? 'Có lỗi xảy ra, vui lòng thử lại';
  toast.error(message);
};

export const useCheckIn = () => {
  const invalidate = useInvalidateAdminBookings();

  return useMutation({
    mutationFn: (id: number) => adminService.checkIn(id),
    onSuccess: () => {
      invalidate();
      toast.success('Check-in thành công');
    },
    onError: handleError,
  });
};

export const useCheckOut = () => {
  const invalidate = useInvalidateAdminBookings();

  return useMutation({
    mutationFn: (id: number) => adminService.checkOut(id),
    onSuccess: () => {
      invalidate();
      toast.success('Check-out thành công');
    },
    onError: handleError,
  });
};

export const useCancelAdminBooking = () => {
  const invalidate = useInvalidateAdminBookings();

  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason?: string }) =>
      adminService.cancelBooking(id, reason),
    onSuccess: () => {
      invalidate();
      toast.success('Hủy đặt phòng thành công');
    },
    onError: handleError,
  });
};

export const useCreateOfflineBooking = () => {
  const invalidate = useInvalidateAdminBookings();

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      adminService.createOfflineBooking(data),
    onSuccess: () => {
      invalidate();
    },
    onError: handleError,
  });
};