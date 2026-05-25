import { useNavigate } from 'react-router-dom';
import { useCompareStore } from '../../stores/compareStore';
import type { RoomType } from '../../types/hotel.types';

interface Props {
  roomType: RoomType;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

const PLACEHOLDER = 'https://placehold.co/400x300?text=No+Image';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const HotelCard = ({ roomType, checkIn, checkOut, guests }: Props) => {
  const navigate = useNavigate();
  const { add, remove, isSelected } = useCompareStore();
  const selected = isSelected(roomType.id);

  const image = roomType.images?.[0]?.imageUrl;
  const price = roomType.lowestPrice ?? roomType.basePrice;

  const handleClick = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', String(guests));
    const query = params.toString();
    // Đã sửa lại đường dẫn chuẩn khớp với app.routes.tsx
    navigate(`/room-type/${roomType.id}${query ? `?${query}` : ''}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={image ?? PLACEHOLDER}
          alt={roomType.typeName}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />

        {/* Nút so sánh — góc trên trái */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            selected ? remove(roomType.id) : add(roomType);
          }}
          className={`absolute top-2 left-2 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-all ${
            selected
              ? 'bg-primary text-white'
              : 'bg-white/90 text-gray-600 hover:bg-primary/10'
          }`}
        >
          {selected ? '✓ Đã chọn' : '+ So sánh'}
        </button>

        {/* Badge phòng trống */}
        {roomType.availableRoomCount !== undefined && (
          <span className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm ${
            roomType.availableRoomCount > 0
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-600'
          }`}>
            {roomType.availableRoomCount > 0
              ? `Còn ${roomType.availableRoomCount} phòng`
              : 'Hết phòng'}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-gray-800 font-medium text-base leading-snug">
            {roomType.typeName}
          </h3>
        </div>

        <div className="mb-2">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              {roomType.maxCapacity} khách
            </span>
            <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
              {roomType.maxCapacity <= 2 ? '25m²' : roomType.maxCapacity === 3 ? '35m²' : '50m²'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400">Từ </span>
            <p className="text-primary font-medium text-lg leading-tight">
              {formatVND(price)}
            </p>
            <span className="text-xs text-gray-400">/ đêm</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl border-none cursor-pointer transition-colors"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;