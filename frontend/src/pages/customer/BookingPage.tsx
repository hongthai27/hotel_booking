import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '../../stores/authStore';
import { useRoomTypeDetail } from '../../hooks/queries/use-hotels.query';
import { useCreateBooking } from '../../hooks/mutations/use-booking.mutation';
import { useSocketAllBookings } from '../../hooks/useSocketBooking';
import ReviewForm from '../../components/customer/ReviewForm';
import { formatVND, formatDate, calcNights } from '../../utils/format';

const MOCK_ROOMS: Record<number, any> = {
  1: { typeName: 'Phòng Deluxe Double', basePrice: 1500000, maxCapacity: 2 },
  2: { typeName: 'Phòng Executive Suite', basePrice: 3200000, maxCapacity: 2 },
  3: { typeName: 'Phòng Family Premium', basePrice: 2100000, maxCapacity: 4 }
};

// --- BỔ SUNG: Mảng gợi ý yêu cầu đặc biệt ---
const QUICK_REQUESTS = [
  'Phòng không hút thuốc',
  'Tầng cao, view đẹp',
  'Giường đôi (Double bed)',
  'Gần thang máy',
  'Đến muộn sau 22h',
];

const BookingPage = () => {
  useSocketAllBookings();

  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, getMe } = useAuthStore();

  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const guests = Number(searchParams.get('guests')) || 1;

  // --- BỔ SUNG: State lưu yêu cầu đặc biệt ---
  const [specialRequests, setSpecialRequests] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('hotel_token');
    if (token && !user?.phoneNumber) {
      getMe().catch(() => {});
    }
  }, [user, getMe]);

  const isValidDate = (dateString: string) => {
    if (!dateString) return false;
    const d = new Date(dateString);
    return !isNaN(d.getTime());
  };

  const isDatesValid = isValidDate(checkIn) && isValidDate(checkOut);

  const { data: apiData, isLoading: isLoadingRoom } = useRoomTypeDetail(Number(id));
  const roomType = apiData || MOCK_ROOMS[Number(id)];
  
  const { mutate: createBooking, isPending } = useCreateBooking();

  const nights = isDatesValid ? calcNights(checkIn, checkOut) : 0;
  const basePrice = roomType?.basePrice ?? 0;
  const total = nights * basePrice;

  const booking = (roomType as any)?.booking; 

  // --- BỔ SUNG: Tính ngày deadline hủy miễn phí ---
  const cancelDeadline = (checkIn && isDatesValid)
    ? formatDate(new Date(new Date(checkIn).getTime() - 3 * 86400000).toISOString())
    : '';

  // --- BỔ SUNG: Hàm toggle chọn nhanh yêu cầu ---
  const toggleQuickRequest = (req: string) => {
    setSpecialRequests((prev) => {
      if (prev.includes(req)) {
        return prev
          .replace(req, '')
          .replace(/^[,\s]+|[,\s]+$/g, '')
          .replace(/,\s*,/g, ',');
      }
      return prev ? `${prev}, ${req}` : req;
    });
  };

  const handleSubmit = () => {
    if (!roomType) return;

    createBooking(
      {
        roomId: Number(id),
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guestCount: guests,
        specialRequests: specialRequests || undefined, // --- BỔ SUNG: Gửi request ---
      } as any, // Ép kiểu tạm thời tránh lỗi TypeScript nếu hook chưa cập nhật type
      {
        onSuccess: (booking: any) => {
          navigate(`/payment/${booking.id}`);
        },
        onError: (err: any) => {
          const status = err?.response?.status;
          const message = err?.response?.data?.message ?? 'Có lỗi xảy ra';

          if (status === 409) {
            toast.error('Phòng đã được đặt trong khoảng thời gian này');
            navigate('/rooms');
            return;
          }

          toast.error(message);
        },
      }
    );
  };

  if (isLoadingRoom) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (!roomType) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-gray-800 font-medium text-sm">Không tìm thấy thông tin phòng</p>
        <button
          onClick={() => navigate(-1)}
          className="text-primary text-sm font-medium hover:underline"
        >
          Quay lại
        </button>
      </div>
    );
  }

  if (!isDatesValid) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-gray-800 font-medium text-sm">
          Thông tin ngày nhận hoặc trả phòng bị thiếu. Vui lòng chọn lại!
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Quay lại chọn ngày
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 py-8 px-4">
      <h2 className="text-lg font-medium text-gray-800">Xác nhận đặt phòng</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── CỘT TRÁI ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-medium text-gray-800">
              Thông tin khách hàng
            </h3>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Họ và tên</label>
                <input
                  type="text"
                  value={user?.fullName ?? ''}
                  readOnly
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50 cursor-not-allowed w-full outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Email</label>
                <input
                  type="email"
                  value={user?.email ?? ''}
                  readOnly
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50 cursor-not-allowed w-full outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Số điện thoại</label>
                <input
                  type="text"
                  value={user?.phoneNumber ?? ''}
                  readOnly
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50 cursor-not-allowed w-full outline-none"
                />
              </div>
            </div>
          </div>

          {/* ── BỔ SUNG: Yêu cầu đặc biệt ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-medium text-gray-800 mb-1">
              Yêu cầu đặc biệt <span className="text-gray-400 font-normal">(không bắt buộc)</span>
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Chúng tôi sẽ cố gắng đáp ứng yêu cầu, nhưng không đảm bảo 100%.
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {QUICK_REQUESTS.map((req) => {
                const active = specialRequests.includes(req);
                return (
                  <button
                    key={req}
                    type="button"
                    onClick={() => toggleQuickRequest(req)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      active
                        ? 'bg-primary text-white border-primary'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    {active ? '✓ ' : '+ '} {req}
                  </button>
                );
              })}
            </div>

            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Hoặc ghi yêu cầu riêng của bạn..."
              rows={3}
              maxLength={500}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-300"
            />
            <p className="text-xs text-gray-300 text-right mt-1">
              {specialRequests.length}/500
            </p>
          </div>

          {/* ── BỔ SUNG: Giao diện Chính sách hủy phòng mới ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-medium text-gray-800 mb-4">
              Chính sách hủy phòng
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center shrink-0 text-green-600 text-sm">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Hoàn 100% — Hủy trước 3 ngày</p>
                  <p className="text-xs text-gray-500 mt-0.5">Hủy trước {cancelDeadline} → hoàn toàn bộ tiền phòng</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center shrink-0 text-yellow-600 text-sm">
                  !
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Hoàn 50% — Hủy trong 3 ngày trước</p>
                  <p className="text-xs text-gray-500 mt-0.5">Hủy từ ngày {cancelDeadline} trở đi → hoàn 50% tiền phòng</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center shrink-0 text-red-500 text-sm">
                  ✕
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Không hoàn tiền — Sau khi nhận phòng</p>
                  <p className="text-xs text-gray-500 mt-0.5">Không thể hủy sau khi đã check-in</p>
                </div>
              </div>
            </div>
          </div>

          {booking?.status === 'checked_out' && !booking.review && (
            <ReviewForm bookingId={booking.id} />
          )}
        </div>

        {/* ── CỘT PHẢI ── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 flex flex-col gap-4">
            
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-medium text-gray-800">Chi tiết đặt phòng</h3>

              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400">Loại phòng</span>
                <span className="text-sm font-medium text-gray-800">
                  {roomType.typeName}
                </span>
              </div>

              <div className="flex flex-col gap-2 text-sm border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Nhận phòng</span>
                  <span className="text-gray-800 font-medium">{formatDate(checkIn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Trả phòng</span>
                  <span className="text-gray-800 font-medium">{formatDate(checkOut)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Số đêm</span>
                  <span className="text-gray-800 font-medium">{nights} đêm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Số khách</span>
                  <span className="text-gray-800 font-medium">{guests} khách</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Giá / đêm</span>
                  <span className="text-gray-800 font-medium">{formatVND(basePrice)}</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-4">
                <span className="text-sm font-medium text-gray-800">Tổng cộng</span>
                <span className="text-lg font-semibold text-primary">{formatVND(total)}</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="w-full py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl border-none cursor-pointer transition-colors"
              >
                {isPending ? 'Đang xử lý...' : 'Xác nhận đặt phòng'}
              </button>
              
              <p className="text-xs text-gray-400 text-center mt-1">
                Thanh toán sau qua QR · Miễn phí hủy trước 3 ngày
              </p>
            </div>

            {/* ── BỔ SUNG: Badge an toàn ── */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-lg shrink-0">🔒</span>
                <div>
                  <p className="text-xs font-medium text-green-700 mb-1">
                    Đặt phòng an toàn
                  </p>
                  <p className="text-xs text-green-600 leading-relaxed">
                    Phòng được giữ chỗ ngay lập tức. Thanh toán qua QR bảo mật.
                    Chính sách hoàn tiền rõ ràng.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;