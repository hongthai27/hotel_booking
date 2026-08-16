import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import type { RoomType } from '../../types/hotel.types';
import { toast } from 'sonner';
import { useSearchStore } from '../../stores/searchStore';

const PLACEHOLDER = 'https://placehold.co/400x300?text=No+Image';

interface RoomTypeCardProps {
  roomType: Omit<RoomType, 'rooms' | 'description'> & {
    rating?: number;
    reviewsCount?: number;
    availableRoomCount?: number;
  };
  onCompare?: (roomType: RoomTypeCardProps['roomType']) => void;
  showAddToCart?: boolean;
  showCompare?: boolean;
  useSearchQuery?: boolean;
}

const RoomTypeCard = ({
  roomType,
  onCompare,
  showAddToCart = false,
  showCompare = false,
  useSearchQuery = true,
}: RoomTypeCardProps) => {
  const navigate = useNavigate();
  const { addToCart, checkIn, checkOut, guests, setBookingDetails } = useCartStore();
  const searchStore = useSearchStore();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const ci = searchStore.checkIn ? new Date(searchStore.checkIn) : checkIn;
    const co = searchStore.checkOut ? new Date(searchStore.checkOut) : checkOut;

    if (!ci || !co) {
      toast.error('Vui lòng chọn ngày nhận và trả phòng trước khi thêm vào giỏ.');
      return;
    }

    setBookingDetails({ checkIn: ci, checkOut: co, guests: searchStore.guests || guests || 1 });
    addToCart(roomType, 1);
    toast.success(`${roomType.typeName} đã được thêm vào giỏ hàng!`);
  };

  const handleCompareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onCompare) {
      onCompare(roomType);
    }
  };
  
  const handleCardClick = () => {
    const searchParams = new URLSearchParams();
    if (useSearchQuery && checkIn && checkOut) {
      searchParams.set('checkIn', checkIn.toISOString().split('T')[0]);
      searchParams.set('checkOut', checkOut.toISOString().split('T')[0]);
    }
    if (useSearchQuery && guests) {
      searchParams.set('guests', guests.toString());
    }
    navigate(`/room-type/${roomType.id}?${searchParams.toString()}`);
  };

  const mainImage = roomType.images?.[0]?.imageUrl || PLACEHOLDER;

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full group"
      onClick={handleCardClick}
    >
      <div className="h-52 w-full bg-gray-100 overflow-hidden">
        <img 
          src={mainImage} 
          alt={roomType.typeName} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER; }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 flex-1">{roomType.typeName}</h3>
          
          {(useSearchQuery && roomType.availableRoomCount !== undefined) && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${
              roomType.availableRoomCount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}>
              {roomType.availableRoomCount > 0 ? `Còn ${roomType.availableRoomCount} phòng` : 'Hết phòng'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          {roomType.rating !== undefined && roomType.reviewsCount !== undefined && (
             <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 .5l2.939 5.455 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>
                <span className="font-semibold">{roomType.rating.toFixed(1)}</span>
                <span className="text-gray-400">({roomType.reviewsCount})</span>
            </div>
          )}
           <span className="text-gray-300">•</span>
           <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                {roomType.maxCapacity} khách
              </span>
        </div>

        {roomType.amenities && roomType.amenities.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Tiện nghi:</p>
            <div className="flex flex-wrap gap-2">
              {roomType.amenities.slice(0, 3).map((amenity) => (
                <span key={amenity.id} className="bg-gray-50 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200">
                  {amenity.amenityName}
                </span>
              ))}
              {roomType.amenities.length > 3 && (
                <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200">
                  +{roomType.amenities.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-0.5">Từ</span>
            <span className="text-[#004b8f] font-bold text-2xl leading-none">
              {Number(roomType.basePrice).toLocaleString('vi-VN')}đ
            </span>
            <span className="text-xs text-gray-400 mt-1">/ đêm</span>
          </div>
          
          <div className="flex items-center gap-2">
            {showCompare && onCompare && (
              <button
                onClick={handleCompareClick}
                className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                title="So sánh"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662s.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.092-1.21.138-2.43.138-3.662z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
            {showAddToCart ? (
              <button 
                onClick={handleAddToCart}
                disabled={roomType.availableRoomCount === 0}
                className="px-4 py-2.5 bg-[#004b8f] text-white rounded-xl text-sm font-medium hover:bg-blue-900 transition-colors shrink-0 whitespace-nowrap disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Thêm vào giỏ
              </button>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
                className="px-4 py-2.5 bg-white text-[#004b8f] border border-[#004b8f] rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors shrink-0 whitespace-nowrap"
              >
                Xem chi tiết
              </button> 
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomTypeCard;