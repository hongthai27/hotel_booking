import { useNavigate } from 'react-router-dom';
import SearchForm from '../../components/customer/SearchForm';
import RoomCard from '../../components/customer/RoomCard';
import { useAllRoomTypes, useAvailableRooms } from '../../hooks/queries/use-hotels.query';
import { useSearchStore } from '../../stores/searchStore';

const STATS = [
  { number: '20+', label: 'Phòng sang trọng' },
  { number: '5★', label: 'Đánh giá chất lượng' },
  { number: '24/7', label: 'Dịch vụ hỗ trợ' },
  { number: '100%', label: 'Khách hàng hài lòng' },
];

const FEATURES = [
  {
    title: 'Đặt phòng an toàn',
    desc: 'Hệ thống khóa phòng tức thì khi đặt, tránh tình trạng đặt trùng. Thanh toán bảo mật.',
  },
  {
    title: 'Xác nhận tức thì',
    desc: 'Nhận email xác nhận ngay sau khi thanh toán. Trạng thái cập nhật realtime không cần reload.',
  },
  {
    title: 'Hủy linh hoạt',
    desc: 'Hủy trước 3 ngày hoàn 100%. Chính sách rõ ràng, minh bạch trước khi bạn xác nhận.',
  },
];

const TESTIMONIALS = [
  { name: 'Trần Văn A', rating: 5, comment: 'Phòng sạch sẽ, nhân viên nhiệt tình. Sẽ quay lại!' },
  { name: 'Lê Thị B', rating: 5, comment: 'Suite tuyệt vời, view đẹp. Đáng đồng tiền bát gạo.' },
  { name: 'Phạm Minh C', rating: 4, comment: 'Deluxe rộng rãi, tiện nghi đầy đủ. Bữa sáng ngon.' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { checkIn, checkOut, guests } = useSearchStore();
  const isSearching = !!(checkIn && checkOut);

  // Giữ nguyên logic query ưu việt từ code cũ
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
    <div className="min-h-screen">

      {/* ── SECTION 1: HERO + SEARCH ── */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-dark min-h-[480px] flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
        {/* Vòng trang trí */}
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

        <div className="text-center mb-8 relative z-10 mt-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight">
            Trải nghiệm nghỉ dưỡng<br />đẳng cấp 5 sao
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto font-medium">
            Hơn 20 phòng sang trọng với đầy đủ tiện nghi hiện đại.
            Đặt phòng ngay — nhận ngay ưu đãi tốt nhất.
          </p>
        </div>

        <div className="w-full max-w-4xl relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SỐ LIỆU NỔI BẬT ── */}
      <section className="bg-white py-10 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((item) => (
            <div key={item.label}>
              <p className="text-3xl font-medium text-primary mb-1">{item.number}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: HẠNG PHÒNG NỔI BẬT ── */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-medium text-gray-800 mb-2">
              Các hạng phòng nổi bật
            </h2>
            <p className="text-sm text-gray-500">
              Lựa chọn phòng phù hợp với nhu cầu và ngân sách của bạn
            </p>
          </div>

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

          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/rooms')}
              className="bg-primary text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm hover:shadow"
            >
              Xem tất cả hạng phòng
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TẠI SAO CHỌN CHÚNG TÔI ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-medium text-gray-800 mb-2">
              Tại sao chọn Hotel Booking?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-1 bg-accent rounded-full mx-auto mb-4" />
                <h3 className="font-medium text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: ĐÁNH GIÁ KHÁCH HÀNG ── */}
      <section className="py-14 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-medium text-gray-800 mb-2">
              Khách hàng nói gì?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white text-sm font-medium">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{review.name}</p>
                    <div className="text-amber-400 text-xs">
                      {'★'.repeat(review.rating)}
                      <span className="text-gray-200">
                        {'★'.repeat(5 - review.rating)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CALL TO ACTION ── */}
      <section className="py-16 px-6 bg-primary text-center">
        <h2 className="text-2xl md:text-3xl font-medium text-white mb-3">
          Sẵn sàng trải nghiệm?
        </h2>
        <p className="text-white/80 text-sm md:text-base mb-8 max-w-md mx-auto">
          Đặt phòng ngay hôm nay và tận hưởng kỳ nghỉ hoàn hảo tại khách sạn của chúng tôi.
        </p>
        <button
          onClick={() => navigate('/rooms')}
          className="bg-white text-primary px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Đặt phòng ngay
        </button>
      </section>

    </div>
  );
};

export default HomePage;