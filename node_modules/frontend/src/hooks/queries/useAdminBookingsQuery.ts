import { useQuery } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';

export const useAdminBookings = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['admin', 'bookings', filters],
    queryFn: () => adminService.getBookings(filters),
  });
};

export const useAdminRoomTypes = () => {
  return useQuery({
    queryKey: ['admin', 'room-types'],
    queryFn: () => adminService.getRoomTypes(),
  });
};

export const useRevenueReport = (from: string, to: string) => {
  return useQuery({
    queryKey: ['admin', 'reports', 'revenue', from, to],
    queryFn: () => adminService.getRevenueReport(from, to),
    enabled: !!from && !!to && from < to,
  });
};