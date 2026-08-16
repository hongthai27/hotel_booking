import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCartStore } from '../../stores/cartStore';
import { bookingService } from '../../services/booking.service';
import { formatVND } from '../../utils/format';
import api from '../../services/api';

const PLACEHOLDER_IMG = 'https://placehold.co/400x300?text=Image';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, checkIn, checkOut, guests, clearCart } = useCartStore();

  const [specialRequests, setSpecialRequests] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; type: string; value: number; minNights?: number } | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0 || !checkIn || !checkOut) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-gray-800 font-medium text-sm">Giỏ hàng trống hoặc thiếu ngày nhận/trả phòng.</p>
        <button
          onClick={() => navigate('/cart')}
          className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Quay lại giỏ hàng
        </button>
      </div>
    );
  }

  const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000));
  const subtotal = items.reduce((sum, item) => sum + item.roomType.basePrice * item.quantity * nights, 0);

  const discountAmount = (() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'percentage') return (subtotal * appliedPromo.value) / 100;
    if (appliedPromo.type === 'fixed') return appliedPromo.value;
    if (appliedPromo.type === 'free_night') {
      const maxPrice = Math.max(...items.map((i) => i.roomType.basePrice));
      return maxPrice * appliedPromo.value;
    }
    return 0;
  })();

  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    const code = promoCode.toUpperCase().trim();
    setIsApplyingPromo(true);
    try {
      const res = await api.get('/promotions/validate', { params: { code } });
      const promo = res.data.data;

      if (promo.minNights && nights < promo.minNights) {
        toast.error(`Chưa đủ điều kiện: Cần đặt tối thiểu ${promo.minNights} đêm`);
        return;
      }

      setAppliedPromo({ code, type: promo.type, value: promo.value, minNights: promo.minNights });
      toast.success('Áp dụng mã ưu đãi thành công!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Mã ưu đãi không hợp lệ hoặc đã hết hạn!');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const booking = await bookingService.create({
        items: items.map((item) => ({ roomTypeId: item.roomType.id, quantity: item.quantity })),
        checkInDate: checkIn.toISOString(),
        checkOutDate: checkOut.toISOString(),
        guestCount: guests,
        specialRequests: specialRequests || undefined,
        promoCode: appliedPromo?.code,
      });
      clearCart();
      navigate(`/payment/${booking.id}`);
    } catch (error: any) {
      const detail = error.response?.data?.errors?.[0]?.message;
      toast.error(detail || error.response?.data?.message || 'Không thể tạo đơn đặt phòng, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate('/cart')}
        className="text-sm text-primary font-medium hover:underline text-left bg-transparent border-none cursor-pointer w-fit mb-4"
      >
        ← Quay lại giỏ hàng
      </button>

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Xác nhận đặt phòng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left: chi tiết đơn ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Ngày & khách */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h2 className="text-base font-medium text-gray-800 mb-3">Thông tin lưu trú</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div>
                <span className="text-gray-400 block text-xs uppercase tracking-wide mb-0.5">Nhận phòng</span>
                <span className="text-gray-800 font-medium">{checkIn.toLocaleDateString('vi-VN')}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs uppercase tracking-wide mb-0.5">Trả phòng</span>
                <span className="text-gray-800 font-medium">{checkOut.toLocaleDateString('vi-VN')}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs uppercase tracking-wide mb-0.5">Thời gian lưu trú</span>
                <span className="text-gray-800 font-medium">{nights} đêm</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs uppercase tracking-wide mb-0.5">Số khách</span>
                <span className="text-gray-800 font-medium">{guests} khách</span>
              </div>
            </div>
          </div>

          {/* Danh sách phòng */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
            {items.map((item) => (
              <div key={item.roomType.id} className="flex gap-4 p-4">
                <div className="w-24 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={item.roomType.images?.[0]?.imageUrl || PLACEHOLDER_IMG}
                    alt={item.roomType.typeName}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-sm font-medium text-gray-800">{item.roomType.typeName}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.quantity} phòng × {nights} đêm</p>
                </div>
                <p className="text-sm font-semibold text-gray-800 self-center">
                  {formatVND(item.roomType.basePrice * item.quantity * nights)}
                </p>
              </div>
            ))}
          </div>

          {/* Yêu cầu đặc biệt */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <label htmlFor="specialRequests" className="text-sm font-medium text-gray-800 block mb-2">
              Yêu cầu đặc biệt <span className="text-gray-400 font-normal">(không bắt buộc)</span>
            </label>
            <textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="VD: phòng tầng cao, giường đôi, nhận phòng sớm..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-400 text-right mt-1">{specialRequests.length}/500</p>
          </div>

          {/* Mã ưu đãi */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-medium text-gray-800 mb-3">Mã ưu đãi</h2>
            {!appliedPromo ? (
              <div className="flex gap-2">
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Nhập mã ưu đãi"
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={isApplyingPromo || !promoCode.trim()}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isApplyingPromo ? 'Đang kiểm tra...' : 'Áp dụng'}
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
                <span className="text-sm text-green-700 font-medium">Đã áp dụng mã "{appliedPromo.code}"</span>
                <button
                  onClick={() => { setAppliedPromo(null); setPromoCode(''); }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Bỏ
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: tóm tắt & thanh toán ── */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm sticky top-24">
            <h2 className="text-base font-medium text-gray-800 mb-4">Tóm tắt thanh toán</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tạm tính</span>
                <span className="font-medium text-gray-800">{formatVND(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Giảm giá</span>
                  <span className="font-medium text-green-600">-{formatVND(discountAmount)}</span>
                </div>
              )}
            </div>
            <div className="border-t border-gray-100 my-4" />
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-800">Tổng cộng</span>
              <span className="text-xl font-semibold text-primary">{formatVND(total)}</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-5 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting && (
                <span className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
              )}
              {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt phòng'}
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              Bạn sẽ được chuyển đến trang thanh toán sau khi xác nhận
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;