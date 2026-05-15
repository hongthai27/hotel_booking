import React, { useState } from 'react';
import { useRoomOverview } from '../../hooks/queries/useAdminBookingsQuery';
import { useSocketAllBookings } from '../../hooks/useSocketBooking';
import { formatVND, formatDate } from '../../utils/format';

// ── TYPES ──────────────────────────────────────────────────────────────────

export interface RoomGuestOverview {
  bookingId: number;
  guestName: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
}

export interface RoomOverview {
  roomId: number;
  roomNumber: string;
  floor: number;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  currentPrice: number;
  typeName: string;
  maxCapacity: number;
  currentGuest: RoomGuestOverview | null;
}

// ── CONFIGS ────────────────────────────────────────────────────────────────

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
} as const;

// ── COMPONENTS ─────────────────────────────────────────────────────────────

const RoomCard: React.FC<{ room: RoomOverview; cfg: typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG] }> = ({
  room,
  cfg,
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
      {/* ROOM NUMBER */}
      <div className={`text-sm font-bold ${cfg.text}`}>
        {room.roomNumber}
      </div>

      {/* ROOM TYPE */}
      <div className="text-xs text-gray-500 truncate mt-0.5 font-medium">
        {room.typeName}
      </div>

      {/* STATUS */}
      <div className={`text-xs font-semibold mt-1.5 ${cfg.text}`}>
        {cfg.label}
      </div>

      {/* TOOLTIP */}
      {showTooltip && (
        <div
          className="
            absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2
            bg-white border border-gray-200 rounded-xl shadow-xl p-4
            min-w-[220px] text-left
          "
        >
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
              <div className="text-sm font-semibold text-gray-700 mb-1">
                {room.currentGuest.guestName}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                📞 {room.currentGuest.guestPhone}
              </div>
              <div className="text-xs font-medium text-red-500 bg-red-50 p-2 rounded-lg">
                Trả phòng: {formatDate(room.currentGuest.checkOutDate)}
              </div>
            </div>
          )}

          {/* Mũi tên trỏ xuống của Tooltip */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const { data, isLoading } = useRoomOverview();
  
  // ÉP KIỂU RÕ RÀNG Ở ĐÂY LÀ XONG NGAY LỖI TS
  const rooms = (data || []) as RoomOverview[];

  // Hook lắng nghe Socket cho Realtime Booking (Nếu có khách đặt/hủy phòng)
  useSocketAllBookings();

  // Gộp phòng theo tầng
  const byFloor = rooms.reduce<Record<number, RoomOverview[]>>((acc, room) => {
    const floor = room.floor ?? 1;
    if (!acc[floor]) {
      acc[floor] = [];
    }
    acc[floor].push(room);
    return acc;
  }, {});

  // Tính toán số lượng cho Summary (Không cần gõ lại kiểu nữa vì rooms đã chuẩn)
  const summary = {
    available: rooms.filter((r) => r.status === 'available').length,
    occupied: rooms.filter((r) => r.status === 'occupied').length,
    cleaning: rooms.filter((r) => r.status === 'cleaning').length,
    maintenance: rooms.filter((r) => r.status === 'maintenance').length,
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

      {/* SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(STATUS_CONFIG).map(([status, cfg]) => (
          <div
            key={status}
            className={`${cfg.bg} border ${cfg.border} rounded-2xl p-5 shadow-sm transition-transform hover:-translate-y-1`}
          >
            <div className={`text-3xl font-bold ${cfg.text}`}>
              {summary[status as keyof typeof summary]}
            </div>
            <div className={`text-sm font-semibold mt-1 ${cfg.text}`}>
              {cfg.label}
            </div>
          </div>
        ))}
      </div>

      {/* FLOORS */}
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
                  return <RoomCard key={room.roomId} room={room} cfg={cfg} />;
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardPage;