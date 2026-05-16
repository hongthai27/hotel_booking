import React, { useState } from 'react';
import { useRoomOverview } from '../../hooks/queries/useAdminBookingsQuery';
import { useSocketAllBookings } from '../../hooks/useSocketBooking';
import { formatVND, formatDate } from '../../utils/format';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';
import { toast } from 'sonner';

export interface RoomGuestOverview {
  bookingId: number;
  guestName: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  isUpcoming?: boolean;
}

export interface RoomOverview {
  roomId: number;
  roomNumber: string;
  floor: number;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance' | 'reserved';
  currentPrice: number;
  typeName: string;
  maxCapacity: number;
  currentGuest: RoomGuestOverview | null;
}

const STATUS_CONFIG = {
  available: {
    label: 'Trống',
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-700',
  },
  occupied: {
    label: 'Có khách',
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    text: 'text-blue-700',
  },
  cleaning: {
    label: 'Dọn dẹp',
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-700',
  },
  maintenance: {
    label: 'Bảo trì',
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
  },
  reserved: {
    label: 'Đã đặt trước',
    bg: 'bg-orange-50',
    border: 'border-orange-400',
    text: 'text-orange-700',
  },
} as const;

interface RoomCardProps {
  room: RoomOverview;
  cfg: typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG];
  onStatusChange: (roomId: number, status: 'available' | 'maintenance') => void;
  isUpdating: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  cfg,
  onStatusChange,
  isUpdating,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`
        relative ${cfg.bg} border-2 ${cfg.border} rounded-xl p-3
        cursor-pointer hover:shadow-md transition-shadow select-none
      `}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`text-sm font-bold flex items-center justify-between ${cfg.text}`}>
        <span>{room.roomNumber}</span>
      </div>

      <div className="text-xs text-gray-500 truncate mt-0.5 font-medium">
        {room.typeName}
      </div>

      <div className={`text-xs font-semibold mt-1.5 ${cfg.text}`}>
        {cfg.label}
      </div>

      {room.status === 'cleaning' && (
        <button
          disabled={isUpdating}
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange(room.roomId, 'available');
          }}
          className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white text-[11px] py-1 rounded-lg font-bold transition-all shadow-sm disabled:opacity-50"
        >
          {isUpdating ? '...' : 'Dọn xong'}
        </button>
      )}

      {room.status === 'maintenance' && (
        <button
          disabled={isUpdating}
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange(room.roomId, 'available');
          }}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] py-1 rounded-lg font-bold transition-all shadow-sm disabled:opacity-50"
        >
          {isUpdating ? '...' : 'Sửa xong'}
        </button>
      )}

      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-xl shadow-xl p-4 min-w-[220px] text-left">
          <div className="text-sm font-bold text-gray-800 mb-1">
            Phòng {room.roomNumber}
          </div>
          <div className="text-xs text-gray-500 mb-1">
            {room.typeName} • Tối đa {room.maxCapacity} người
          </div>
          <div className="text-sm text-primary font-semibold">
            {formatVND(room.currentPrice)} / đêm
          </div>

          {room.currentGuest && (
            <div className="border-t border-gray-100 mt-3 pt-3">
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${room.currentGuest.isUpcoming ? 'text-orange-600' : 'text-blue-600'}`}>
                {room.currentGuest.isUpcoming ? 'Khách sắp đến hôm nay' : 'Khách đang ở'}
              </div>
              <div className="text-sm font-semibold text-gray-700 mb-0.5">
                {room.currentGuest.guestName}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                 SĐT: {room.currentGuest.guestPhone}
              </div>
              <div className={`text-xs font-medium p-2 rounded-lg ${room.currentGuest.isUpcoming ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-500'}`}>
                {room.currentGuest.isUpcoming 
                  ? `Nhận phòng: ${formatDate(room.currentGuest.checkInDate)} (Sau 14:00)`
                  : `Trả phòng: ${formatDate(room.currentGuest.checkOutDate)} (Trước 12:00)`
                }
              </div>
            </div>
          )}

          {/* Chỉ cho phép báo bảo trì khi phòng trống hoặc đang dọn dẹp */}
          {(room.status === 'available' || room.status === 'cleaning') && (
            <div className="border-t border-gray-100 mt-3 pt-3">
              <button
                disabled={isUpdating}
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(room.roomId, 'maintenance');
                  setShowTooltip(false);
                }}
                className="w-full text-center text-red-600 bg-red-50 hover:bg-red-100 font-bold text-[11px] py-1.5 rounded-lg border border-red-200 transition-all disabled:opacity-50"
              >
                Báo bảo trì
              </button>
            </div>
          )}

          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useRoomOverview();
  
  const rooms = (data || []) as RoomOverview[];

  // Mutation xử lý cập nhật trạng thái phòng (Dọn xong / Báo bảo trì)
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: ({ roomId, status }: { roomId: number; status: 'available' | 'maintenance' }) => 
      adminService.updateRoomStatus(roomId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'rooms'] });
      queryClient.invalidateQueries({ queryKey: ['admin-rooms'] });
      queryClient.invalidateQueries({ queryKey: ['admin-room-types'] });
      
      if (variables.status === 'maintenance') {
        toast.error('Đã chuyển phòng sang trạng thái bảo trì.');
      } else {
        toast.success('Cập nhật trạng thái phòng thành công.');
      }
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái phòng.');
    }
  });

  useSocketAllBookings();

  // Nhóm danh sách phòng theo tầng
  const byFloor = rooms.reduce<Record<number, RoomOverview[]>>((acc, room) => {
    const floor = room.floor ?? 1;
    if (!acc[floor]) {
      acc[floor] = [];
    }
    acc[floor].push(room);
    return acc;
  }, {});

  // Tính toán số lượng cho hộp thống kê (Summary Grid)
  const summary = {
    available: rooms.filter((r) => r.status === 'available').length,
    occupied: rooms.filter((r) => r.status === 'occupied').length,
    cleaning: rooms.filter((r) => r.status === 'cleaning').length,
    maintenance: rooms.filter((r) => r.status === 'maintenance').length,
    reserved: rooms.filter((r) => r.status === 'reserved').length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sơ đồ phòng tổng quan</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {Object.entries(STATUS_CONFIG).map(([status, cfg]) => (
          <div
            key={status}
            className={`${cfg.bg} border ${cfg.border} rounded-2xl p-5 shadow-sm transition-transform hover:-translate-y-1`}
          >
            <div className={`text-3xl font-bold ${cfg.text}`}>
              {summary[status as keyof typeof summary] ?? 0}
            </div>
            <div className={`text-sm font-semibold mt-1 ${cfg.text}`}>
              {cfg.label}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {Object.keys(byFloor)
          .map(Number)
          .sort((a, b) => a - b)
          .map((floor) => (
            <div key={floor} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {floor}
                </div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Tầng {floor}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
                {byFloor[floor].map((room) => {
                  const cfg = STATUS_CONFIG[room.status];
                  return (
                    <RoomCard 
                      key={room.roomId} 
                      room={room} 
                      cfg={cfg} 
                      onStatusChange={(id, stat) => updateStatus({ roomId: id, status: stat })}
                      isUpdating={isUpdatingStatus}
                    />
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardPage;