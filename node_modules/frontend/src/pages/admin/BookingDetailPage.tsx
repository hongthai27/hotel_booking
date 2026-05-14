import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { bookingService } from '../../services/booking.service';
import { 
  useCheckIn, 
  useCheckOut, 
  useCancelAdminBooking 
} from '../../hooks/mutations/useAdminBookingMutation';
import { formatVND, formatDate } from '../../utils/format';

// ── UTILS ──
const formatDateTime = (dateStr: string) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('vi-VN', { 
    hour: '2-digit', minute: '2-digit', 
    day: '2-digit', month: '2-digit', year: 'numeric' 
  });
};

// ── CONSTANTS ──
const STATUS_MAP: Record<string, { label: string, color: string }> = {
  pending_payment: { label: 'Chờ thanh toán', color: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-green-50 text-green-700 ring-green-600/20' },
  checked_in: { label: 'Đang ở', color: 'bg-blue-50 text-blue-700 ring-blue-600/20' },
  checked_out: { label: 'Đã trả phòng', color: 'bg-purple-50 text-purple-700 ring-purple-600/20' },
  cancelled: { label: 'Đã hủy', color: 'bg-gray-50 text-gray-500 ring-gray-500/20' },
};

const SOURCE_MAP: Record<string, { label: string, color: string }> = {
  online: { label: 'Trực tuyến', color: 'bg-blue-50 text-blue-700' },
  offline: { label: 'Tại quầy', color: 'bg-orange-50 text-orange-700' },
};

const PAYMENT_MAP: Record<string, string> = {
  cash: 'Tiền mặt',
  card: 'Thẻ ngân hàng',
  transfer: 'Chuyển khoản',
};

const PAYMENT_STATUS_MAP: Record<string, { label: string, color: string }> = {
  pending: { label: 'Chờ thanh toán', color: 'bg-yellow-100 text-yellow-700' },
  completed: { label: 'Đã thanh toán', color: 'bg-green-100 text-green-700' },
  refunded: { label: 'Đã hoàn tiền', color: 'bg-gray-100 text-gray-600' },
  failed: { label: 'Thất bại', color: 'bg-red-100 text-red-700' }
};

// ── COMPONENTS ──
const DetailRow = ({ label, value, isBold = false }: { label: string; value: React.ReactNode; isBold?: boolean }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-sm text-gray-500">{label}</span>
    <span className={`text-sm ${isBold ? 'font-bold text-gray-800' : 'font-medium text-gray-800'}`}>
      {value}
    </span>
  </div>
);

const BookingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Hooks gọi API
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-booking-detail', id],
    queryFn: () => bookingService.getById(Number(id)),
    enabled: !!id,
  });
  const booking = data as any;
  // Hooks thao tác (Mutations)
  const { mutate: checkIn, isPending: isCheckingIn } = useCheckIn();
  const { mutate: checkOut, isPending: isCheckingOut } = useCheckOut();
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelAdminBooking();

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
      
      {/* ── HEADER ── */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Chi tiết đơn đặt phòng</h2>
      </div>

      {/* ── STATES ── */}
      {isLoading && (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center text-red-500 text-sm">
          Đã xảy ra lỗi khi tải dữ liệu đơn đặt phòng.
        </div>
      )}

      {/* ── CONTENT ── */}
      {!isLoading && !isError && booking && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col">
          
          {/* Header Card & Actions */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 rounded-t-2xl">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Mã Đơn</span>
              <span className="text-xl font-bold text-gray-800">#{booking.id}</span>
            </div>
            
            <div className="flex flex-col sm:items-end gap-3">
              {/* Badges */}
              <div className="flex gap-2">
                <span className={`text-xs font-medium px-3 py-1.5 rounded-lg ${SOURCE_MAP[booking.source]?.color ?? 'bg-gray-100 text-gray-500'}`}>
                  {SOURCE_MAP[booking.source]?.label ?? booking.source}
                </span>
                <span className={`text-xs font-medium px-3 py-1.5 rounded-lg ring-1 ${STATUS_MAP[booking.status]?.color ?? 'bg-gray-100 text-gray-500 ring-gray-200'}`}>
                  {STATUS_MAP[booking.status]?.label ?? booking.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-1">
                {/* Hủy (Chỉ offline + Đang chờ/Đã xác nhận) */}
                {booking.source === 'offline' && ['pending_payment', 'confirmed'].includes(booking.status) && (
                  <button
                    onClick={() => {
                      if (window.confirm('Bạn có chắc chắn muốn hủy đơn đặt phòng này?')) {
                        cancelBooking({ id: booking.id });
                      }
                    }}
                    disabled={isCancelling}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
                  >
                    {isCancelling ? 'Đang hủy...' : 'Hủy đơn'}
                  </button>
                )}

                {/* Check-in (Chỉ khi đã xác nhận) */}
                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => {
                      if (window.confirm('Xác nhận Check-in cho khách hàng này?')) {
                        checkIn(booking.id);
                      }
                    }}
                    disabled={isCheckingIn}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 shadow-sm shadow-green-600/20"
                  >
                    {isCheckingIn ? 'Đang xử lý...' : 'Check-in'}
                  </button>
                )}

                {/* Check-out (Chỉ khi đang ở) */}
                {booking.status === 'checked_in' && (
                  <button
                    onClick={() => {
                      if (window.confirm('Xác nhận Check-out cho khách hàng này?')) {
                        checkOut(booking.id);
                      }
                    }}
                    disabled={isCheckingOut}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 shadow-sm shadow-purple-600/20"
                  >
                    {isCheckingOut ? 'Đang xử lý...' : 'Check-out'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-8">
            
            {/* Timestamps & Info */}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 px-2">
                <div>
                  <div className="text-xs text-gray-500">Ngày tạo đơn</div>
                  <div className="text-sm font-medium text-gray-800">{formatDateTime(booking.createdAt)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Hạn thanh toán</div>
                  <div className="text-sm font-medium text-gray-800">{booking.paymentDeadline ? formatDateTime(booking.paymentDeadline) : '—'}</div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border border-primary/10">
                <div>
                  <div className="text-xs text-primary/70">Check-in</div>
                  <div className="text-sm font-semibold text-primary-dark">{formatDate(booking.checkInDate)}</div>
                </div>
                <div>
                  <div className="text-xs text-primary/70">Check-out</div>
                  <div className="text-sm font-semibold text-primary-dark">{formatDate(booking.checkOutDate)}</div>
                </div>
                <div>
                  <div className="text-xs text-primary/70">Thời gian</div>
                  <div className="text-sm font-semibold text-primary-dark">{booking.totalNights ?? 1} đêm</div>
                </div>
                <div>
                  <div className="text-xs text-primary/70">Số khách</div>
                  <div className="text-sm font-semibold text-primary-dark">{booking.guestCount ?? 1} người</div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Customer & Room Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Khách hàng</h3>
                <DetailRow label="Họ và tên" value={booking.customer?.fullName ?? '—'} />
                <DetailRow label="Số điện thoại" value={booking.customer?.phoneNumber ?? '—'} />
                <DetailRow label="Email" value={<span className="truncate max-w-[150px] inline-block align-bottom" title={booking.customer?.email}>{booking.customer?.email ?? '—'}</span>} />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phòng lưu trú</h3>
                <DetailRow label="Hạng phòng" value={booking.room?.roomType?.typeName ?? '—'} />
                <DetailRow label="Số phòng" value={booking.room?.roomNumber ?? 'Chưa xếp'} />
                <DetailRow label="Tầng" value={booking.room?.floor ?? '—'} />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Payment */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Thanh toán</h3>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex flex-col gap-2">
                <DetailRow 
                  label="Phương thức" 
                  value={PAYMENT_MAP[booking.paymentMethod] ?? booking.paymentMethod ?? '—'} 
                />
                <DetailRow 
                  label="Trạng thái" 
                  value={
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${PAYMENT_STATUS_MAP[booking.paymentStatus]?.color ?? 'bg-gray-200 text-gray-600'}`}>
                      {PAYMENT_STATUS_MAP[booking.paymentStatus]?.label ?? booking.paymentStatus ?? '—'}
                    </span>
                  } 
                />
                <div className="h-px bg-gray-200 w-full my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-800">Tổng cộng</span>
                  <span className="text-xl font-bold text-primary">{formatVND(booking.totalPrice)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetailPage;