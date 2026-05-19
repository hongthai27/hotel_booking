import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAvailableRooms } from '../../hooks/queries/use-hotels.query';
import HotelCard from '../../components/customer/HotelCard';
import SearchForm from '../../components/customer/SearchForm';

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

const SkeletonCard = () => (
  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-6 bg-gray-100 rounded-full w-16" />
        <div className="h-6 bg-gray-100 rounded-full w-20" />
      </div>
      <div className="h-8 bg-gray-100 rounded-xl mt-2" />
    </div>
  </div>
);

const RoomListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Đọc params hiện tại
  const checkIn   = searchParams.get('checkIn') ?? '';
  const checkOut  = searchParams.get('checkOut') ?? '';
  const guests    = Number(searchParams.get('guests') ?? 1);
  const roomCount = Number(searchParams.get('roomCount') ?? 1);
  const minPrice  = searchParams.get('minPrice') ?? '';
  const maxPrice  = searchParams.get('maxPrice') ?? '';

  // Kiểm tra trạng thái bộ lọc
  const hasPriceFilter = !!minPrice || !!maxPrice;
  const hasParams = !!checkIn && !!checkOut;

  // Xóa bộ lọc giá — giữ nguyên ngày và số khách
  const clearPriceFilter = () => {
    const newParams = new URLSearchParams();
    newParams.set('checkIn',   checkIn);
    newParams.set('checkOut',  checkOut);
    newParams.set('guests',    String(guests));
    newParams.set('roomCount', String(roomCount));
    setSearchParams(newParams);
  };

  // Mở rộng ngày (checkOut +1 ngày)
  const extendCheckOut = () => {
    if (!checkOut) return;
    const newCheckOut = new Date(checkOut);
    newCheckOut.setDate(newCheckOut.getDate() + 1);
    const newCheckOutStr = newCheckOut.toISOString().split('T')[0];
    const newParams = new URLSearchParams(searchParams);
    newParams.set('checkOut', newCheckOutStr);
    setSearchParams(newParams);
  };

  // Gọi API lấy danh sách phòng
  const { data: rooms, isLoading, isError } = useAvailableRooms(
    hasParams 
      ? { 
          checkIn, 
          checkOut, 
          guests, 
          ...(minPrice && { minPrice: Number(minPrice) }), 
          ...(maxPrice && { maxPrice: Number(maxPrice) }) 
        } 
      : {}
  );

  // Trạng thái chưa nhập đủ thông tin tìm kiếm
  if (!hasParams) {
    return (
      <div className="max-w-4xl mx-auto py-12 flex flex-col items-center gap-6">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            Tìm phòng phù hợp với bạn
          </h2>
          <p className="text-gray-500 text-sm">
            Vui lòng nhập ngày nhận phòng, trả phòng và số khách để xem danh sách phòng.
          </p>
        </div>
        <div className="w-full">
          <SearchForm />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Tiêu đề trang và thông tin tóm tắt */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium text-gray-800">
          {isLoading
            ? 'Đang tìm kiếm...'
            : `${rooms?.length ?? 0} phòng phù hợp`}
        </h2>
        <p className="text-sm text-gray-500 font-normal">
          {formatDate(checkIn)} → {formatDate(checkOut)} · {guests} khách
        </p>
      </div>

      <SearchForm />

      {/* Trạng thái đang tải */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Trạng thái lỗi API */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-gray-800 font-medium text-sm">
            Đã xảy ra lỗi khi tải dữ liệu
          </p>
          <p className="text-gray-500 text-sm">
            Vui lòng thử lại sau.
          </p>
        </div>
      )}

      {/* Trạng thái KHÔNG tìm thấy phòng (Empty State) - Đã loại bỏ icon/emoji */}
      {!isLoading && !isError && rooms?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-6 text-center rounded-2xl bg-white border border-gray-100 shadow-sm px-4">
          
          {/* Thông báo chính */}
          <div className="max-w-md">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Không có phòng phù hợp
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Rất tiếc, chúng tôi không tìm thấy phòng trống nào trong khoảng thời gian
              <span className="font-medium text-gray-700"> {formatDate(checkIn)} — {formatDate(checkOut)} </span>
              cho <span className="font-medium text-gray-700">{roomCount} phòng và {guests} khách</span>.
            </p>
          </div>

          {/* Gợi ý hành động */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            {/* Hành động 1: Xóa bộ lọc giá */}
            {hasPriceFilter && (
              <button
                onClick={clearPriceFilter}
                className="flex items-center justify-center text-sm font-medium text-primary border border-primary px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors w-full"
              >
                Xóa bộ lọc giá VNĐ
              </button>
            )}
            
            {/* Hành động 2: Mở rộng ngày */}
            <button
              onClick={extendCheckOut}
              className="flex items-center justify-center text-sm font-medium text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors w-full"
            >
              Thêm 1 ngày (trả phòng ngày {formatDate(
                new Date(new Date(checkOut).setDate(new Date(checkOut).getDate() + 1))
                  .toISOString().split('T')[0]
              )})
            </button>
            
            {/* Hành động 3: Quay về trang chủ */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center text-sm text-gray-400 hover:text-gray-600 hover:underline transition-colors mt-2"
            >
              Tìm kiếm lại từ đầu
            </button>
          </div>

          {/* Gợi ý nhỏ bên dưới */}
          <p className="text-xs text-gray-400 max-w-sm">
            Gợi ý: Thử thay đổi ngày nhận/trả phòng linh hoạt hoặc giảm số lượng phòng/khách cần đặt.
          </p>
        </div>
      )}

      {/* Hiển thị danh sách phòng khi có kết quả */}
      {!isLoading && !isError && rooms && rooms.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((roomType: any, index: number) => (
            <HotelCard
              key={`${roomType.id ?? 'hotel'}-${index}`}
              roomType={roomType}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomListPage;