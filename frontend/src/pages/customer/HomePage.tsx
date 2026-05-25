import { useNavigate } from 'react-router-dom';
import SearchForm from '../../components/customer/SearchForm';
import RoomCard from '../../components/customer/RoomCard';
import { useAllRoomTypes, useAvailableRooms } from '../../hooks/queries/use-hotels.query';
import { useSearchStore } from '../../stores/searchStore';

const STATS = [
  { number: '24+', label: 'Hạng phòng sang trọng' },
  { number: '5★', label: 'Tiêu chuẩn quốc tế' },
  { number: '24/7', label: 'Dịch vụ cá nhân hóa' },
  { number: '98%', label: 'Khách hàng hài lòng' },
];

const AMENITIES = [
  { title: 'Ẩm thực tinh hoa', desc: 'Nhà hàng 5 sao với thực đơn Á - Âu', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600' },
  { title: 'Thư giãn tuyệt đối', desc: 'Spa & Massage trị liệu cao cấp', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600' },
  { title: 'Hồ bơi vô cực', desc: 'Tầm nhìn toàn cảnh thành phố', img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600' },
];

const TESTIMONIALS = [
  { name: 'Trần Văn A', rating: 5, comment: 'Không gian sang trọng, yên tĩnh. Nhân viên hỗ trợ check-in rất nhanh chóng. Trải nghiệm tuyệt vời!' },
  { name: 'Lê Thị B', rating: 5, comment: 'Phòng Suite có view toàn cảnh cực kỳ ấn tượng. Chắc chắn sẽ chọn nơi này cho chuyến công tác tới.' },
  { name: 'Phạm Minh C', rating: 4, comment: 'Bữa sáng buffet ngon và đa dạng. Hồ bơi sạch sẽ. Rất đáng với mức giá bỏ ra.' },
];

const HomePage = () => {
  const navigate = useNavigate();
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
    // Dùng w-screen và margin âm để phá vỡ container của Layout, giúp ảnh sát lên Header và tràn viền
    <div className="min-h-screen w-screen relative left-1/2 -translate-x-1/2 -mt-4 md:-mt-6 overflow-hidden">

      {/* ── SECTION 1: HERO IMAGE + SEARCH ── */}
      <section className="relative min-h-[600px] flex flex-col items-center justify-center px-6 py-24 bg-gray-900">
        {/* Ảnh nền có phủ mờ */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay đen mờ */}

        <div className="text-center mb-10 relative z-10 mt-8">
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-5 tracking-wide">
            Nghệ Thuật Lưu Trú Đích Thực
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Đánh thức mọi giác quan tại không gian nghỉ dưỡng đẳng cấp giữa lòng thủ đô. Khám phá sự tĩnh lặng và tiện nghi hoàn hảo dành riêng cho bạn.
          </p>
        </div>

        {/* Form tìm kiếm nổi bật */}
        <div className="w-full max-w-6xl relative z-10">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-6">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SỐ LIỆU NỔI BẬT ── */}
      <section className="bg-white py-12 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <p className="text-4xl font-semibold text-primary">{item.number}</p>
              <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: HẠNG PHÒNG NỔI BẬT ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-2">
                Không Gian Lưu Trú
              </h2>
              <p className="text-sm text-gray-500 max-w-xl">
                Từng hạng phòng được thiết kế tỉ mỉ, giao thoa giữa nét đẹp truyền thống và hơi thở hiện đại, mang đến sự thoải mái tuyệt đối.
              </p>
            </div>
            <button
              onClick={() => navigate('/rooms')}
              className="text-primary text-sm font-medium hover:underline whitespace-nowrap"
            >
              Xem tất cả hạng phòng →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-3 flex justify-center py-20">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-gray-500 animate-pulse">
                    {isSearching ? 'Đang kiểm tra phòng trống...' : 'Đang tải dữ liệu phòng...'}
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
              <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-500">
                {isSearching ? 'Rất tiếc, không còn phòng nào trống trong thời gian này.' : 'Hệ thống hiện tại chưa có dữ liệu phòng nào.'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TIỆN ÍCH & TRẢI NGHIỆM ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-2">
              Trải Nghiệm Đẳng Cấp
            </h2>
            <p className="text-sm text-gray-500">Dịch vụ tiện ích trọn vẹn nâng tầm kỳ nghỉ của bạn</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {AMENITIES.map((item) => (
              <div key={item.title} className="group cursor-pointer">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: BANNER ƯU ĐÃI KHUYẾN MÃI ── */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto bg-primary rounded-3xl overflow-hidden shadow-lg relative">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
           <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Ưu đãi mùa hè</span>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">Kỳ nghỉ trọn vẹn - Giá siêu ưu đãi</h2>
                <p className="text-primary-100 text-sm md:text-base text-white/90">Giảm ngay 15% cho khách hàng đặt phòng trước 14 ngày.</p>
              </div>
              <button 
                onClick={() => navigate('/promotions')} 
                className="bg-white text-primary px-8 py-3 rounded-xl font-medium shadow-md hover:bg-gray-50 transition-colors shrink-0"
              >
                Khám phá ngay
              </button>
           </div>
        </div>
      </section>

      {/* ── SECTION 6: ĐÁNH GIÁ KHÁCH HÀNG ── */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-2">
              Khách hàng nói gì về chúng tôi?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
                <div className="text-4xl text-gray-200 absolute top-4 right-6 font-serif">"</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{review.name}</p>
                    <div className="flex text-amber-400 gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic relative z-10">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;