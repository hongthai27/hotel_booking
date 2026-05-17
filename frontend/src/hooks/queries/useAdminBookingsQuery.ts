import { useQuery } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';

export const useAdminBookings = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['admin', 'bookings', filters],
    queryFn: () => adminService.getBookings(filters),
    refetchInterval: 10000,
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

// ── Sơ đồ phòng Realtime ──
export const useRoomOverview = () => {
  return useQuery({
    queryKey: ['admin', 'rooms', 'overview'],
    queryFn: () => adminService.getRoomOverview(),
    // Tự động fetch lại mỗi 30 giây để cập nhật trạng thái phòng mới nhất
    refetchInterval: 30000, 
  });
};