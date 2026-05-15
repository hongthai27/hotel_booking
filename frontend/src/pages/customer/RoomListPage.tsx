import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const guests = Number(searchParams.get('guests')) || 1;

  const hasParams = !!checkIn && !!checkOut;

  const { data: rooms, isLoading, isError } = useAvailableRooms(
    hasParams ? { checkIn, checkOut, guests } : {}
  );

  // Chưa có params — hiển thị form tìm kiếm
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
      {/* ── Header ── */}
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

      {/* ── Search form thu gọn ── */}
      <SearchForm />

      {/* ── Loading skeleton ── */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* ── Error ── */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-gray-800 font-medium text-sm">
            Đã xảy ra lỗi khi tải dữ liệu
          </p>
          <p className="text-gray-500 text-sm">
            Vui lòng thử lại sau.
          </p>
        </div>
      )}

      {/* ── Empty ── */}
      {!isLoading && !isError && rooms?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <p className="text-gray-800 font-medium text-sm">
            Không có phòng phù hợp với tìm kiếm của bạn
          </p>
          <p className="text-gray-500 text-sm text-center max-w-sm">
            Thử thay đổi ngày nhận phòng, trả phòng hoặc giảm số lượng khách.
          </p>
        </div>
      )}

      {/* ── Results ── */}
      {!isLoading && !isError && rooms && rooms.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((roomType) => (
            <HotelCard
              key={roomType.id}
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