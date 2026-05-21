import { useNavigate } from 'react-router-dom';
import { useCompareStore } from '../../stores/compareStore';

const PLACEHOLDER = 'https://placehold.co/60x60?text=Room';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const CompareBar = () => {
  const navigate = useNavigate();
  const { items, remove, clear } = useCompareStore();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        <span className="text-sm font-medium text-gray-800 shrink-0">
          So sánh ({items.length}/2):
        </span>

        {/* Danh sách đã chọn */}
        <div className="flex gap-3 flex-1">
          {items.map((room) => (
            <div
              key={room.id}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
            >
              <img
                src={room.images?.[0]?.imageUrl ?? PLACEHOLDER}
                alt=""
                className="w-8 h-8 rounded-lg object-cover shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                }}
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-800 truncate max-w-28">
                  {room.typeName}
                </p>
                <p className="text-xs text-primary">
                  {formatVND(Number(room.basePrice))}/đêm
                </p>
              </div>
              <button
                onClick={() => remove(room.id)}
                className="text-gray-400 hover:text-red-500 text-sm shrink-0 transition-colors"
              >
                ×
              </button>
            </div>
          ))}

          {/* Slot trống */}
          {items.length < 2 && (
            <div className="flex items-center justify-center w-40 h-12 border-2 border-dashed border-gray-200 rounded-xl">
              <span className="text-xs text-gray-400">+ Thêm 1 phòng nữa</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={clear}
            className="text-sm text-gray-400 hover:text-gray-600 px-3 py-2 transition-colors"
          >
            Xóa tất cả
          </button>
          <button
            onClick={() => navigate('/compare')}
            disabled={items.length < 2}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            So sánh ngay →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;