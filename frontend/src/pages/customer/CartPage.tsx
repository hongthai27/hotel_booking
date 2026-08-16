import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCartStore } from '../../stores/cartStore';
import { useAvailableRooms } from '../../hooks/queries/use-hotels.query';
import { formatVND, calcNights } from '../../utils/format';

const PLACEHOLDER_IMG = 'https://placehold.co/400x300?text=Image';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, totalAmount, updateQuantity, removeFromCart, checkIn, checkOut, syncInventory } = useCartStore();
  
  const hasAlertedRef = useRef(false);

  const { data: freshRooms, isFetching } = useAvailableRooms({
    checkIn: checkIn ? new Date(checkIn).toISOString().split('T')[0] : '',
    checkOut: checkOut ? new Date(checkOut).toISOString().split('T')[0] : '',
    guests: 1
  });

  useEffect(() => {
    if (freshRooms && items.length > 0) {
      const hasReduced = syncInventory(freshRooms);

      if (hasReduced && !hasAlertedRef.current) {
        toast.error('Rất tiếc! Số lượng phòng trống vừa thay đổi, giỏ hàng của bạn đã được cập nhật.');
        hasAlertedRef.current = true;
      }
    }
  }, [freshRooms, items, syncInventory]);

  const nights = (checkIn && checkOut) ? calcNights(new Date(checkIn), new Date(checkOut)) : 0;
  const finalTotal = totalAmount * nights;

  const handleProceedToBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error('Vui lòng chọn ngày nhận và trả phòng trước khi đặt.');
      navigate('/');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-gray-800 font-medium text-sm">Giỏ hàng của bạn đang trống.</p>
        <button
          onClick={() => navigate('/rooms')}
          className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Khám phá phòng ngay
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map(({ roomType, quantity }) => (
            <div key={roomType.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm flex gap-4 p-4">
              <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={roomType.images?.[0]?.imageUrl || PLACEHOLDER_IMG}
                  alt={roomType.typeName}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-800">{roomType.typeName}</h3>
                  <button onClick={() => removeFromCart(roomType.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <p className="text-sm text-primary font-semibold mt-1">{formatVND(roomType.basePrice)}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(roomType.id, quantity - 1)}
                      className="px-3 py-1.5 text-gray-500 hover:text-primary disabled:text-gray-300"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-medium text-gray-800 text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(roomType.id, quantity + 1)}
                      className="px-3 py-1.5 text-gray-500 hover:text-primary disabled:text-gray-300"
                      disabled={
                        roomType.availableRoomCount
                          ? quantity >= roomType.availableRoomCount
                          : false
                      }
                    >
                      +
                    </button>
                  </div>
                  {roomType.availableRoomCount !== undefined && (
                    <p className="text-xs text-gray-400 ml-2">
                      (Còn lại: {roomType.availableRoomCount})
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm sticky top-24">
            <h2 className="text-base font-medium text-gray-800 mb-4">Tóm tắt đơn hàng</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Ngày nhận phòng</span>
                <span className="font-medium text-gray-800">{checkIn ? new Date(checkIn).toLocaleDateString('vi-VN') : 'Chưa chọn'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ngày trả phòng</span>
                <span className="font-medium text-gray-800">{checkOut ? new Date(checkOut).toLocaleDateString('vi-VN') : 'Chưa chọn'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Số đêm</span>
                <span className="font-medium text-gray-800">{nights > 0 ? `${nights} đêm` : '—'}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 my-4" />
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-800">Tổng cộng</span>
              <span className="text-xl font-semibold text-primary">{nights > 0 ? formatVND(finalTotal) : '—'}</span>
            </div>
            <p className="text-xs text-gray-400 text-right mt-1">Chưa bao gồm ưu đãi</p>
            <button
              onClick={handleProceedToBooking}
              disabled={nights <= 0}
              className="w-full mt-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Tiến hành đặt phòng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;