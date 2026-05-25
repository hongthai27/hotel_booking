import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../stores/searchStore';

const PLACEHOLDER = 'https://placehold.co/400x300?text=No+Image';

interface RoomCardProps {
  id: string;
  name: string;
  image?: string;
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
      <div className="h-52 w-full bg-gray-100">
        <img 
          src={image || PLACEHOLDER} 
          alt={name} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />
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
          <div className="mb-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                {maxCapacity} khách
              </span>
              <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                {maxCapacity <= 2 ? '25m²' : maxCapacity === 3 ? '35m²' : '50m²'}
              </span>
            </div>
          </div>
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