import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../stores/searchStore';

interface RoomCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  maxCapacity?: number;
  availableRooms?: number;
}

const RoomCard = ({ id, name, image, price, maxCapacity, availableRooms }: RoomCardProps) => {
  const navigate = useNavigate();
  const { checkIn, checkOut, guests } = useSearchStore();
  
  const isSearching = !!(checkIn && checkOut);

  const handleCardClick = () => {
   if (checkIn && checkOut) {
      navigate(`/room-type/${id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
    } else {
      navigate(`/room-type/${id}`);
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full"
      onClick={handleCardClick} 
    >
      <div className="h-52 w-full">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          
          {(isSearching && availableRooms !== undefined) && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${
              availableRooms > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}>
              {availableRooms > 0 ? `Còn ${availableRooms} phòng` : 'Hết phòng'}
            </span>
          )}
        </div>

        {maxCapacity && (
          <p className="text-gray-500 text-sm mb-4">Tối đa {maxCapacity} khách</p>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-0.5">Từ</span>
            <span className="text-[#004b8f] font-bold text-2xl leading-none">
              {Number(price).toLocaleString('vi-VN')}đ
            </span>
            <span className="text-xs text-gray-400 mt-1">/ đêm</span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
           className="px-5 py-2.5 bg-[#004b8f] text-white rounded-xl text-sm font-medium hover:bg-blue-900 transition-colors shrink-0 whitespace-nowrap"
          >
            Xem chi tiết
          </button> 
        </div>
      </div>
    </div>
  );
};

export default RoomCard;