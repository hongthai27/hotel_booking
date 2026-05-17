import { useNavigate } from 'react-router-dom';
import type { RoomType } from '../../types/hotel.types';

interface Props {
  roomType: RoomType;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

const HotelCard = ({ roomType, checkIn, checkOut, guests }: Props) => {
  const navigate = useNavigate();

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
    navigate(`/room-type/${roomType.id}${query ? `?${query}` : ''}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Image */}
      {image ? (
        <img
          src={image}
          alt={roomType.typeName}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
          <span className="text-white/60 text-sm font-normal">Chưa có ảnh</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Tên + sức chứa */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-gray-800 font-medium text-base leading-snug">
            {roomType.typeName}
          </h3>
          {roomType.availableRoomCount !== undefined && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
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

        <p className="text-gray-500 text-sm font-normal">
          Tối đa {roomType.maxCapacity} khách
        </p>

        {/* Amenities */}
        {visibleAmenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleAmenities.map((amenity, index) => (
              <span
                key={`${amenity.id ?? 'amenity'}-${index}`}
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

        {/* Giá + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400 font-normal">Từ</span>
            <p className="text-primary font-medium text-lg leading-tight">
              {price.toLocaleString('vi-VN')}đ
            </p>
            <span className="text-xs text-gray-400 font-normal">/ đêm</span>
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