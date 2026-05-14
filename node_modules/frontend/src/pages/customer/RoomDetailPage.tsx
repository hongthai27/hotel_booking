import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useRoomTypeDetail } from '../../hooks/queries/use-hotels.query';
import { useAuthStore } from '../../stores/authStore';
import { ReviewList } from '../../components/customer/ReviewList';
import { formatVND, formatDate, calcNights } from '../../utils/format';

const MOCK_ROOMS: Record<number, any> = {
  1: {
    typeName: 'Phòng Deluxe Double',
    basePrice: 1500000,
    maxCapacity: 2,
    description: 'Phòng Deluxe với tầm nhìn hướng phố, trang bị giường King sang trọng và đầy đủ tiện nghi hiện đại.',
    images: [{ id: 1, imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a' }],
    amenities: [{ id: 1, amenityName: 'Wifi' }, { id: 2, amenityName: 'Điều hòa' }]
  },
  2: {
    typeName: 'Phòng Executive Suite',
    basePrice: 3200000,
    maxCapacity: 2,
    description: 'Không gian thượng lưu với phòng khách riêng biệt và ban công ngắm toàn cảnh thành phố.',
    images: [{ id: 2, imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427' }],
    amenities: [{ id: 1, amenityName: 'Wifi' }, { id: 3, amenityName: 'Bồn tắm' }]
  },
  3: {
    typeName: 'Phòng Family Premium',
    basePrice: 2100000,
    maxCapacity: 4,
    description: 'Thiết kế rộng rãi dành cho gia đình, có khu vực bếp nhỏ và không gian sinh hoạt chung.',
    images: [{ id: 3, imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf' }],
    amenities: [{ id: 1, amenityName: 'Wifi' }, { id: 4, amenityName: 'Bếp nhỏ' }]
  }
};

const RoomDetailPage = () => {
  const { roomTypeId } = useParams<{ roomTypeId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const guests = searchParams.get('guests') ?? '1';

  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data: apiData, isLoading } = useRoomTypeDetail(Number(roomTypeId));

  const roomType = apiData || MOCK_ROOMS[Number(roomTypeId)];

  const nights = calcNights(checkIn, checkOut);
  const basePrice = roomType?.basePrice ?? 0;
  const total = nights * basePrice;

  const handleBook = () => {
    if (!checkIn || !checkOut) {
      alert('Vui lòng chọn ngày nhận và trả phòng ở trang chủ trước khi đặt!');
      return;
    }

    if (!user) {
      navigate(`/login?redirect=/booking/${roomTypeId}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
      return;
    }
    navigate(`/booking/${roomTypeId}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  if (isLoading && !roomType) {
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
        <button onClick={() => navigate(-1)} className="text-primary text-sm font-medium hover:underline">
          Quay lại
        </button>
      </div>
    );
  }

  const images = roomType.images ?? [];
  const currentImage = images[selectedIndex]?.imageUrl;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 p-6">
      <button onClick={() => navigate(-1)} className="text-sm text-primary font-medium hover:underline text-left bg-transparent border-none cursor-pointer">
        ← Quay lại danh sách phòng
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="w-full h-96 rounded-2xl overflow-hidden bg-gray-100">
              {currentImage ? (
                <img src={currentImage} alt={roomType.typeName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-sm">
                  Chưa có ảnh
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img: any, idx: number) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      idx === selectedIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">{roomType.typeName}</h1>
              <p className="text-sm text-gray-500">Sức chứa tối đa {roomType.maxCapacity} khách</p>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{roomType.description}</p>
            {roomType.amenities && (
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-gray-800">Tiện nghi</h3>
                <div className="flex flex-wrap gap-2">
                  {roomType.amenities.map((amenity: any) => (
                    <span key={amenity.id} className="text-xs px-3 py-1 rounded-full bg-primary/5 text-primary">
                      {amenity.amenityName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24 flex flex-col gap-5">
            <div>
              <span className="text-xs text-gray-400">Giá mỗi đêm từ</span>
              <p className="text-2xl font-bold text-primary">{formatVND(basePrice)}</p>
            </div>

            {checkIn && checkOut && nights > 0 ? (
              <div className="flex flex-col gap-3 border border-gray-100 rounded-xl p-4 text-sm bg-gray-50/50">
                <div className="flex justify-between">
                  <span className="text-gray-500">Thời gian</span>
                  <span className="text-gray-800 font-medium">{formatDate(checkIn)} - {formatDate(checkOut)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Số đêm</span>
                  <span className="text-gray-800 font-medium">{nights} đêm</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-800">Tổng tiền</span>
                  <span className="text-primary text-lg">{formatVND(total)}</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-[11px] text-orange-700">
                Vui lòng chọn ngày tại trang chủ để xem chi tiết giá tiền.
              </div>
            )}

            <button
              onClick={handleBook}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl border-none cursor-pointer transition-all active:scale-95"
            >
              {user ? 'Đặt phòng ngay' : 'Đăng nhập để đặt phòng'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Đánh giá từ khách hàng
        </h2>

        <ReviewList roomTypeId={+roomTypeId!} />
      </div>
    </div>
  );
};

export default RoomDetailPage;