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
  const visibleAmenities = roomType.amenities?.slice(0, 3) ?? [];
  const extraAmenities = (roomType.amenities?.length ?? 0) - 3;

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

        <p className="text-gray-500 text-sm font-normal">
          Tối đa {roomType.maxCapacity} khách
        </p>

        {visibleAmenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleAmenities.map((amenity) => (
              <span
                key={amenity.id}
                className="text-xs font-normal px-2.5 py-1 rounded-full bg-primary/5 text-primary"
              >
                {amenity.amenityName}
              </span>
            ))}
            {extraAmenities > 0 && (
              <span className="text-xs font-normal px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                +{extraAmenities} nữa
              </span>
            )}
          </div>
        )}

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