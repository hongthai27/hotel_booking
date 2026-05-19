import SearchForm from '../../components/customer/SearchForm';
import RoomCard from '../../components/customer/RoomCard';
import { useAllRoomTypes, useAvailableRooms } from '../../hooks/queries/use-hotels.query';
import { useSearchStore } from '../../stores/searchStore';

const features = [
  {
    title: 'Đặt phòng dễ dàng',
    desc: 'Quy trình đơn giản, nhanh chóng chỉ trong vài bước. Xác nhận đặt phòng ngay lập tức.',
  },
  {
    title: 'Thanh toán an toàn',
    desc: 'Hệ thống bảo mật tiêu chuẩn quốc tế. Thông tin của bạn luôn được bảo vệ tuyệt đối.',
  },
  {
    title: 'Hủy miễn phí',
    desc: 'Linh hoạt thay đổi kế hoạch. Hủy phòng trước 3 ngày được hoàn tiền 100%.',
  },
];

const HomePage = () => {
  const { checkIn, checkOut, guests } = useSearchStore();
  const isSearching = !!(checkIn && checkOut);

  const { data: allRooms, isLoading: isLoadingAll } = useAllRoomTypes();

  const { data: availableRoomsData, isLoading: isLoadingAvailable } = useAvailableRooms({
    checkIn,
    checkOut,
    guests: guests || 1,
  });

  const roomList = (isSearching ? availableRoomsData : allRooms) || [];
  const isLoading = isSearching ? isLoadingAvailable : isLoadingAll;
  const featuredRooms = roomList.slice(0, 3);

  return (
    <div>
      <div className="bg-gradient-to-br from-primary to-primary-dark px-6 py-20 flex flex-col items-center text-center">
        <h1 className="text-white text-3xl font-semibold leading-snug max-w-xl mb-3">
          Tìm phòng hoàn hảo cho bạn
        </h1>
        <p className="text-white/70 text-base font-normal mb-10 max-w-md">
          Trải nghiệm nghỉ dưỡng đẳng cấp tại trung tâm thành phố
        </p>
        <div className="w-full max-w-4xl">
          <SearchForm />
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 py-12">
        <h2 className="text-lg font-medium text-gray-800 mb-6 text-center">
          Tại sao chọn chúng tôi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
            >
              <div className="w-8 h-1 bg-accent rounded-full" />
              <h3 className="text-gray-800 font-medium text-sm">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm font-normal leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 py-12">
        <h2 className="text-lg font-medium text-gray-800 mb-8 text-center uppercase tracking-wide">
          Hạng phòng nổi bật
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-3 flex justify-center py-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-gray-500 animate-pulse">
                  {isSearching ? 'Đang kiểm tra phòng trống...' : 'Đang tải phòng từ hệ thống...'}
                </span>
              </div>
            </div>
          ) : featuredRooms.length > 0 ? (
            featuredRooms.map((room: any) => (
              <RoomCard
                key={room.id}
                id={room.id.toString()}
                name={room.typeName || room.name || 'Phòng chưa có tên'}
                image={room.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a'}
                price={room.basePrice || room.price || 0}
                maxCapacity={room.maxCapacity}
                availableRooms={room.availableRoomCount ?? room._count?.rooms ?? 0}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-10 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-500">
              {isSearching ? 'Rất tiếc, không còn phòng nào trống trong thời gian này.' : 'Hệ thống hiện tại chưa có dữ liệu phòng nào.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;