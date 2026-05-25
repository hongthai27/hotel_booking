import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '../../stores/authStore';
import { useRoomTypeDetail } from '../../hooks/queries/use-hotels.query';
import { useCreateBooking } from '../../hooks/mutations/use-booking.mutation';
import { useSocketAllBookings } from '../../hooks/useSocketBooking';
import { formatVND, formatDate, calcNights } from '../../utils/format';
import api from '../../services/api';

const MOCK_ROOMS: Record<number, any> = {
  1: { typeName: 'Phòng Deluxe Double', basePrice: 1500000, maxCapacity: 2 },
  2: { typeName: 'Phòng Executive Suite', basePrice: 3200000, maxCapacity: 2 },
  3: { typeName: 'Phòng Family Premium', basePrice: 2100000, maxCapacity: 4 }
};

// --- BỔ SUNG: Mảng gợi ý yêu cầu đặc biệt ---
const QUICK_REQUESTS = [
  'Phòng không hút thuốc',
  'Tầng cao, view đẹp',
  'Có bồn tắm',
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

  // --- BỔ SUNG: State và cấu hình mã ưu đãi ---
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

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

  // --- BỔ SUNG: Hàm áp dụng và hủy mã ưu đãi ---
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    
    const code = promoCode.toUpperCase().trim();

    setIsApplyingPromo(true);
    try {
      // Gọi API kiểm tra mã ưu đãi
      const res = await api.get(`/promotions/validate`, { params: { code } });
      const promo = res.data.data;

      if (promo.minNights && nights < promo.minNights) {
        toast.error(`Chưa đủ điều kiện: Cần đặt tối thiểu ${promo.minNights} đêm`);
        return;
      }

      // Tạo thông báo điều kiện hiển thị
      let condition = '';
      if (promo.type === 'percentage') condition = `Giảm ${promo.value}% tổng đơn`;
      else if (promo.type === 'free_night') condition = `Tặng ${promo.value} đêm miễn phí`;
      else if (promo.type === 'fixed') condition = `Giảm ${formatVND(promo.value)}`;

      setAppliedPromo({ code, type: promo.type, value: promo.value, condition, minNights: promo.minNights });
      toast.success('Áp dụng mã ưu đãi thành công!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Mã ưu đãi không hợp lệ hoặc đã hết hạn!');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  // --- BỔ SUNG: Tính toán lại tổng tiền sau giảm giá ---
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percentage') {
      discountAmount = (total * appliedPromo.value) / 100;
    } else if (appliedPromo.type === 'free_night') {
      discountAmount = basePrice * appliedPromo.value;
    } else if (appliedPromo.type === 'fixed') {
      discountAmount = appliedPromo.value;
    }
  }
  const finalTotal = Math.max(0, total - discountAmount);

  const handleSubmit = () => {
    if (!roomType) return;

    // --- BỔ SUNG: Chặn đặt phòng nếu nhập mã nhưng quên nhấn Áp dụng ---
    if (promoCode.trim() !== '' && !appliedPromo) {
      toast.error('Bạn đã nhập mã ưu đãi nhưng chưa nhấn nút "Áp dụng"!');
      return;
    }

    createBooking(
      {
        roomId: Number(id),
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guestCount: guests,
        specialRequests: specialRequests || undefined, // --- BỔ SUNG: Gửi request ---
        promoCode: appliedPromo?.code || undefined, // --- BỔ SUNG: Gửi mã ưu đãi về Backend ---
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
    <div className="max-w-6xl mx-auto flex flex-col gap-6 py-8 px-4">
      <h2 className="text-xl font-medium text-gray-800">Xác nhận đặt phòng</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── CỘT TRÁI ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-base font-medium text-gray-800">
              Thông tin khách hàng
            </h3>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Họ và tên</label>
                <input
                  type="text"
                  value={user?.fullName ?? ''}
                  readOnly
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 bg-gray-50 cursor-not-allowed w-full outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="email"
                  value={user?.email ?? ''}
                  readOnly
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 bg-gray-50 cursor-not-allowed w-full outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Số điện thoại</label>
                <input
                  type="text"
                  value={user?.phoneNumber ?? ''}
                  readOnly
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 bg-gray-50 cursor-not-allowed w-full outline-none"
                />
              </div>
            </div>
          </div>

          {/* ── BỔ SUNG: Yêu cầu đặc biệt ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-medium text-gray-800 mb-1">
              Yêu cầu đặc biệt <span className="text-gray-400 font-normal">(không bắt buộc)</span>
            </h3>
            <p className="text-sm text-gray-400 mb-3">
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
                    className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                      active
                        ? 'bg-primary text-white border-primary'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    {active ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 inline-block mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 inline-block mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    )}
                    {req}
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
              className="border border-gray-200 rounded-xl px-4 py-3 text-base w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-300"
            />
            <p className="text-sm text-gray-300 text-right mt-1">
              {specialRequests.length}/500
            </p>
          </div>

          {/* ── BỔ SUNG: Khối nhập mã ưu đãi ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-medium text-gray-800 mb-3">
              Mã ưu đãi / Khuyến mãi
            </h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã ưu đãi (VD: EARLY15)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={!!appliedPromo}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary uppercase placeholder:normal-case"
              />
              {!appliedPromo ? (
                <button
                  onClick={handleApplyPromo}
              disabled={isApplyingPromo}
              className="px-5 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors shrink-0 disabled:opacity-70"
                >
              {isApplyingPromo ? 'Đang kiểm tra...' : 'Áp dụng'}
                </button>
              ) : (
                <button
                  onClick={handleRemovePromo}
                  className="px-5 py-2.5 border border-red-200 text-red-500 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors shrink-0"
                >
                  Hủy mã
                </button>
              )}
            </div>
            
            {appliedPromo && (
              <p className="text-sm text-green-600 mt-3 font-medium flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Đã áp dụng mã {appliedPromo.code}: {appliedPromo.condition}
              </p>
            )}
          </div>

          {/* ── BỔ SUNG: Giao diện Chính sách hủy phòng mới ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-medium text-gray-800 mb-4">
              Chính sách hủy phòng
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center shrink-0 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-800">Hoàn 100% — Hủy trước 3 ngày</p>
                  <p className="text-sm text-gray-500 mt-0.5">Hủy trước {cancelDeadline} → hoàn toàn bộ tiền phòng</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center shrink-0 text-yellow-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-800">Hoàn 50% — Hủy trong 3 ngày trước</p>
                  <p className="text-sm text-gray-500 mt-0.5">Hủy từ ngày {cancelDeadline} trở đi → hoàn 50% tiền phòng</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center shrink-0 text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-800">Không hoàn tiền — Sau khi nhận phòng</p>
                  <p className="text-sm text-gray-500 mt-0.5">Không thể hủy sau khi đã check-in</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CỘT PHẢI ── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 flex flex-col gap-4">
            
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <h3 className="text-base font-medium text-gray-800">Chi tiết đặt phòng</h3>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-400">Loại phòng</span>
                <span className="text-base font-medium text-gray-800">
                  {roomType.typeName}
                </span>
              </div>

              <div className="flex flex-col gap-2 text-base border-t border-gray-100 pt-4">
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
                {appliedPromo && (
                  <div className="flex justify-between mt-1 text-green-600 font-medium">
                    <span>Ưu đãi ({appliedPromo.code})</span>
                    <span>- {formatVND(discountAmount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-4 items-center">
                <span className="text-base font-medium text-gray-800">Tổng cộng</span>
                <div className="flex flex-col items-end">
                  {appliedPromo && (
                    <span className="text-sm text-gray-400 line-through mb-1">{formatVND(total)}</span>
                  )}
                  <span className="text-xl font-semibold text-primary">{formatVND(finalTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="w-full py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white text-base font-medium rounded-xl border-none cursor-pointer transition-colors"
              >
                {isPending ? 'Đang xử lý...' : 'Xác nhận đặt phòng'}
              </button>
              
              <p className="text-sm text-gray-400 text-center mt-1">
                Thanh toán sau qua QR · Miễn phí hủy trước 3 ngày
              </p>
            </div>

            {/* ── BỔ SUNG: Badge an toàn ── */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600 shrink-0">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">
                    Đặt phòng an toàn
                  </p>
                  <p className="text-sm text-green-600 leading-relaxed">
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