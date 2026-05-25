import { useNavigate } from 'react-router-dom';
import { useCompareStore } from '../../stores/compareStore';
import { useSearchStore } from '../../stores/searchStore';

const PLACEHOLDER = 'https://placehold.co/400x250?text=Room';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const ComparePage = () => {
  const { items, clear } = useCompareStore();
  const navigate = useNavigate();
  const { checkIn, checkOut, guests } = useSearchStore();

  if (items.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-gray-400 text-sm">
          Chọn ít nhất 2 hạng phòng để so sánh
        </p>
        <button
          onClick={() => navigate('/rooms')}
          className="text-primary text-sm hover:underline"
        >
          ← Quay lại tìm phòng
        </button>
      </div>
    );
  }

  const [r1, r2] = items;

  const handleBookClick = (roomId: number) => {
    if (checkIn && checkOut) {
      navigate(`/room-type/${roomId}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
    } else {
      navigate(`/room-type/${roomId}`);
    }
  };

  // Gộp tất cả amenities từ 2 phòng
  const allAmenities = Array.from(
    new Set([
      ...(r1.amenities?.map((a: any) => a.amenity?.amenityName || a.amenityName).filter(Boolean) ?? []),
      ...(r2.amenities?.map((a: any) => a.amenity?.amenityName || a.amenityName).filter(Boolean) ?? []),
    ])
  );

  const hasAmenity = (room: typeof r1, name: string) =>
    room.amenities?.some((a: any) => (a.amenity?.amenityName || a.amenityName) === name) ?? false;

  const rows = [
    {
      label: 'Giá / đêm',
      v1: formatVND(Number(r1.basePrice)),
      v2: formatVND(Number(r2.basePrice)),
      highlight: true,
    },
    {
      label: 'Sức chứa',
      v1: `${r1.maxCapacity} người`,
      v2: `${r2.maxCapacity} người`,
      highlight: false,
    },
    {
      label: 'Diện tích (ước tính)',
      v1: r1.maxCapacity <= 2 ? '25m²' : r1.maxCapacity === 3 ? '35m²' : '50m²',
      v2: r2.maxCapacity <= 2 ? '25m²' : r2.maxCapacity === 3 ? '35m²' : '50m²',
      highlight: false,
    },
    {
      label: 'Giá trung bình / khách',
      v1: formatVND(Math.round(Number(r1.basePrice) / r1.maxCapacity)),
      v2: formatVND(Math.round(Number(r2.basePrice) / r2.maxCapacity)),
      highlight: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-gray-800">So sánh hạng phòng</h1>
        <button
          onClick={() => { clear(); navigate('/rooms'); }}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Chọn lại
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">

        {/* Ảnh + Tên phòng */}
        <div className="grid grid-cols-3">
          <div className="bg-gray-50 p-4 flex items-end">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Tiêu chí
            </span>
          </div>
          {[r1, r2].map((room) => (
          <div key={room.id} className="border-l border-gray-100 relative">
              <img
                src={room.images?.[0]?.imageUrl ?? PLACEHOLDER}
                alt={room.typeName}
                className="w-full h-40 object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                }}
              />
            
            {/* Badge phòng trống */}
            {room.availableRoomCount !== undefined && (
              <span className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm ${
                room.availableRoomCount > 0
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-600'
              }`}>
                {room.availableRoomCount > 0
                  ? `Còn ${room.availableRoomCount} phòng`
                  : 'Hết phòng'}
              </span>
            )}

              <div className="p-4">
                <h2 className="font-medium text-gray-800 mb-1">{room.typeName}</h2>
                {room.description && (
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {room.description}
                  </p>
                )}
                <button
                onClick={() => handleBookClick(room.id)}
                  className="mt-3 w-full bg-primary text-white text-xs font-medium py-2 rounded-xl hover:bg-primary-dark transition-colors"
                >
                Xem chi tiết & Đặt phòng →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Các chỉ tiêu chính */}
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 border-t border-gray-100 ${
              row.highlight
                ? 'bg-blue-50/50'
                : i % 2 === 0
                ? 'bg-gray-50/50'
                : 'bg-white'
            }`}
          >
            <div className="px-4 py-3 text-xs font-medium text-gray-500">
              {row.label}
            </div>
            {[row.v1, row.v2].map((v, j) => (
              <div
                key={j}
                className={`px-4 py-3 border-l border-gray-100 text-sm ${
                  row.highlight ? 'font-medium text-primary' : 'text-gray-800'
                }`}
              >
                {v}
              </div>
            ))}
          </div>
        ))}

        {/* Tiện ích */}
        {allAmenities.length > 0 && (
          <div className="border-t border-gray-100">
            <div className="grid grid-cols-3 bg-gray-50 px-4 py-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Tiện ích
              </span>
              <span className="border-l border-gray-100" />
              <span className="border-l border-gray-100" />
            </div>
            {allAmenities.map((name, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-t border-gray-100 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                }`}
              >
                <div className="px-4 py-2.5 text-xs text-gray-600">{name}</div>
                {[r1, r2].map((room, j) => (
                  <div
                    key={j}
                    className="px-4 py-2.5 border-l border-gray-100 text-center"
                  >
                    {hasAmenity(room, name) ? (
                      <span className="text-green-500 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </span>
                    ) : (
                      <span className="text-gray-200 text-base">—</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;