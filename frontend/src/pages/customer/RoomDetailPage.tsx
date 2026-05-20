import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useRoomTypeDetail } from '../../hooks/queries/use-hotels.query';
import { useAuthStore } from '../../stores/authStore';
import { ReviewList } from '../../components/customer/ReviewList';

const PLACEHOLDER = 'https://placehold.co/800x500?text=No+Image';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const calcNights = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 0;
  return Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
  );
};

const RoomDetailPage = () => {
  const { roomTypeId } = useParams<{ roomTypeId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const guests = searchParams.get('guests') ?? '1';

  const [activeIndex, setActiveIndex] = useState(0);

  const { data: roomType, isLoading, isError } = useRoomTypeDetail(
    Number(roomTypeId)
  );

  const nights = calcNights(checkIn, checkOut);
  const basePrice = roomType?.basePrice ?? 0;
  const total = nights * basePrice;

  // 8. Không crash nếu thiếu ảnh & Sắp xếp theo displayOrder
  const images =
    roomType?.images && roomType.images.length > 0
      ? [...roomType.images].sort((a, b) => a.displayOrder - b.displayOrder)
      : [{ id: 0, imageUrl: PLACEHOLDER, displayOrder: 0 }];

  // 3. Prev/Next button logic
  const handlePrev = () =>
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));

  const handleNext = () =>
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  const handleBook = () => {
    if (!checkIn || !checkOut) {
      alert('Vui lòng chọn ngày nhận và trả phòng ở trang chủ trước khi đặt!');
      return;
    }

    if (!user) {
      navigate(
        `/login?redirect=/booking/${roomTypeId}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
      );
      return;
    }
    navigate(
      `/booking/${roomTypeId}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Đang tải...</span>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (isError || !roomType) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-gray-800 font-medium text-sm">
          Không tìm thấy thông tin phòng
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-primary text-sm font-medium hover:underline"
        >
          Quay lại
        </button>
      </div>
    );
  }

  const currentImage = images[activeIndex]?.imageUrl ?? PLACEHOLDER;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 p-6">
      {/* ── Breadcrumb ── */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-primary font-medium hover:underline text-left bg-transparent border-none cursor-pointer w-fit"
      >
        ← Quay lại danh sách phòng
      </button>

      {/* 7. Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left: Gallery + Info ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Gallery Container */}
          <div className="flex flex-col gap-3">
            {/* 1. Ảnh lớn chính */}
            <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-gray-100 group">
              <img
                src={currentImage}
                alt={roomType.typeName}
                className="w-full h-full object-cover transition-opacity duration-200"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                }}
              />

              {/* 5. Image counter badge */}
              <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                {activeIndex + 1} / {images.length}
              </div>

              {/* Prev / Next buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    disabled={images.length <= 1}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed border-none cursor-pointer text-lg font-bold"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={images.length <= 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed border-none cursor-pointer text-lg font-bold"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* 2. Thumbnail list */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {images.map((img, idx) => (
                  <button
                    key={img.id ?? idx}
                    onClick={() => setActiveIndex(idx)}
                    // 4. Active thumbnail state
                    className={`shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer p-0 snap-start ${
                      idx === activeIndex
                        ? 'border-primary ring-2 ring-primary/20 opacity-100'
                        : 'border-transparent hover:border-gray-300 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      // 6. Placeholder fallback
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                {roomType.typeName}
              </h1>
              <p className="text-sm text-gray-500 font-normal">
                Sức chứa tối đa {roomType.maxCapacity} khách
              </p>
            </div>

            {roomType.description && (
              <p className="text-sm text-gray-600 font-normal leading-relaxed">
                {roomType.description}
              </p>
            )}

            {/* Amenities */}
            {roomType.amenities && roomType.amenities.length > 0 && (
              <div className="flex flex-col gap-3 mt-2">
                <h3 className="text-sm font-medium text-gray-800">Tiện nghi</h3>
                <div className="flex flex-wrap gap-2">
                  {roomType.amenities.map((amenity: any) => (
                    <span
                      key={amenity.id}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10"
                    >
                      {amenity.amenityName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Booking card ── */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24 flex flex-col gap-5">
            {/* Giá */}
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Giá mỗi đêm từ</span>
              <div className="flex items-baseline gap-1 mt-1">
                <p className="text-3xl font-bold text-primary">
                  {formatVND(basePrice)}
                </p>
              </div>
            </div>

            {/* Chi tiết ngày */}
            {checkIn && checkOut && nights > 0 ? (
              <div className="flex flex-col gap-3 border border-gray-100 rounded-xl p-4 text-sm bg-gray-50/50">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Nhận phòng</span>
                  <span className="text-gray-800 font-medium">
                    {formatDate(checkIn)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Trả phòng</span>
                  <span className="text-gray-800 font-medium">
                    {formatDate(checkOut)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Thời gian lưu trú</span>
                  <span className="text-gray-800 font-medium">{nights} đêm</span>
                </div>
                <hr className="border-gray-100 my-1" />
                <div className="flex justify-between items-center font-semibold text-base">
                  <span className="text-gray-800">Tổng cộng</span>
                  <span className="text-primary">{formatVND(total)}</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700 leading-relaxed">
                Vui lòng chọn ngày nhận và trả phòng tại trang chủ để xem chi tiết giá tiền dự kiến.
              </div>
            )}

            {/* Button đặt phòng */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleBook}
                className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl border-none cursor-pointer transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                {user ? 'Đặt phòng ngay' : 'Đăng nhập để đặt phòng'}
              </button>
              
              {!user && (
                <p className="text-xs text-gray-400 text-center font-normal mt-1">
                  Bạn cần có tài khoản để thực hiện giao dịch
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Review Section ── */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Đánh giá từ khách hàng
        </h2>
        <ReviewList roomTypeId={Number(roomTypeId)} />
      </div>
    </div>
  );
};

export default RoomDetailPage;