const PLACEHOLDER = 'https://placehold.co/1200x800?text=Hotel+Booking';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col gap-16">
      
      {/* 1. HERO SECTION */}
      <div className="text-center max-w-4xl mx-auto relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 tracking-wide uppercase relative z-10">
          Về Hotel Booking
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed relative z-10">
          Kiến tạo một nền tảng công nghệ lưu trú toàn diện, kết nối khách hàng đến với những không gian nghỉ dưỡng lý tưởng bằng sự minh bạch và dịch vụ tận tâm.
        </p>
      </div>

      {/* BANNER IMAGE WITH TINT OVERLAY */}
      <div className="w-full h-96 rounded-3xl overflow-hidden shadow-sm bg-gray-100 relative group">
        <div className="absolute inset-0 bg-primary/5 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0 duration-500" />
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200" 
          alt="Hotel Lobby" 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />
      </div>

      {/* 2. THƯ NGỎ TỪ ĐỘI NGŨ VẬN HÀNH */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start border-b border-gray-100 pb-12">
        <div className="md:col-span-1">
          <h2 className="text-3xl font-medium text-gray-800 border-l-4 border-primary pl-3">
            Lời ngỏ từ Ban điều hành
          </h2>
          <p className="text-sm text-gray-400 mt-2 pl-4">Triết lý và cam kết dịch vụ</p>
        </div>
        <div className="md:col-span-2 flex flex-col gap-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Tọa lạc tại trung tâm thành phố Hà Nội, Hotel Booking được xây dựng với mục tiêu định nghĩa lại trải nghiệm đặt phòng và lưu trú thời đại số. Chúng tôi hiểu rằng mỗi chuyến đi đều mang một ý nghĩa đặc biệt, và một không gian nghỉ ngơi phù hợp chính là khởi đầu cho một hành trình trọn vẹn.
          </p>
          <p>
            Không chỉ dừng lại ở một nền tảng kết nối, chúng tôi chú trọng vào việc cá nhân hóa trải nghiệm của từng khách hàng. Từ những yêu cầu đặc biệt nhỏ nhất trước khi nhận phòng cho đến quy trình hỗ trợ sau khi trả phòng đều được đội ngũ chuyên nghiệp tối ưu hóa bằng sự chân thành và trách nhiệm cao nhất.
          </p>
        </div>
      </div>

      {/* 3. SỐ LIỆU THỐNG KÊ KINH DOANH */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-r from-primary/5 via-blue-50/30 to-transparent rounded-2xl p-8 text-center border border-primary/10">
        {[
          { value: '24+', label: 'Phòng nghỉ đạt chuẩn' },
          { value: '10.000+', label: 'Khách hàng tin tưởng' },
          { value: '98%', label: 'Đánh giá tuyệt đối' },
          { value: '24/7', label: 'Hỗ trợ trực tuyến' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-3xl font-bold bg-gradient-to-b from-primary to-primary-dark bg-clip-text text-transparent">{stat.value}</span>
            <span className="text-sm text-gray-600 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* 4. GIÁ TRỊ CỐT LÕI (BENTO BOX UI PHỐI MÀU) */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-medium text-gray-800 text-center mb-1">Giá trị cốt lõi</h1>
          <p className="text-sm text-gray-400 text-center mb-8">Nền tảng vững chắc làm nên thương hiệu</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-7 bg-white border border-gray-100 rounded-2xl shadow-sm md:col-span-2 hover:border-primary/20 transition-colors">
            <h3 className="text-base font-medium text-primary mb-2">Sứ mệnh số hóa</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tối ưu hóa toàn bộ quy trình tìm kiếm và đặt phòng bằng công nghệ hiện đại. Giúp khách hàng tiếp cận thông tin một cách trực quan, chính xác chỉ với vài thao tác đơn giản trên mọi thiết bị.
            </p>
          </div>
          
          <div className="p-7 bg-primary/5 border border-primary/10 rounded-2xl md:col-span-1">
            <h3 className="text-base font-medium text-gray-800 mb-2">Sự minh bạch</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Cam kết thông tin hạng phòng, hình ảnh thực tế, mức giá hiển thị công khai và chính sách hoàn hủy rõ ràng 100%, không phát sinh phụ phí ẩn.
            </p>
          </div>

          <div className="p-7 bg-blue-50/50 border border-blue-100/50 rounded-2xl md:col-span-1">
            <h3 className="text-base font-medium text-gray-800 mb-2">Dịch vụ tận tâm</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Đội ngũ nhân sự được đào tạo bài bản theo tiêu chuẩn quốc tế, luôn sẵn sàng lắng nghe và giải quyết mọi nhu cầu của quý khách trong suốt thời gian lưu trú.
            </p>
          </div>

          <div className="p-7 bg-white border border-gray-100 rounded-2xl shadow-sm md:col-span-2 hover:border-primary/20 transition-colors">
            <h3 className="text-base font-medium text-primary mb-2">Cam kết lâu dài</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Không ngừng nâng cấp cơ sở vật chất, đa dạng hóa các tiện ích tích hợp và lắng nghe phản hồi thực tế để mang lại giá trị bền vững và sự an tâm tuyệt đối cho khách hàng.
            </p>
          </div>
        </div>
      </div>

      {/* 5. HÀNH TRÌNH KHÁCH HÀNG (TIMELINE VỚI ĐIỂM NHẤN MÀU) */}
      <div className="border-t border-gray-100 pt-12">
        <h2 className="text-3xl font-medium text-gray-800 text-center mb-1">Hành trình trải nghiệm đơn giản</h2>
        <p className="text-sm text-gray-400 text-center mb-10">Ba bước tinh gọn cho một kỳ nghỉ hoàn hảo</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Khám phá không gian', desc: 'Sử dụng hệ thống lọc thông minh để tìm hạng phòng đáp ứng đúng nhu cầu và ngân sách mong muốn.' },
            { step: '02', title: 'Xác nhận an toàn', desc: 'Kiểm tra thông tin khách hàng, gửi kèm các yêu cầu đặc biệt và tiến hành thanh toán bảo mật qua mã QR.' },
            { step: '03', title: 'Tận hưởng dịch vụ', desc: 'Nhận phòng nhanh chóng tại quầy và bắt đầu trải nghiệm hệ sinh thái tiện ích cao cấp dành riêng cho bạn.' },
          ].map((item) => (
            <div key={item.step} className="flex flex-col gap-2 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-3xl font-extrabold text-primary/15">{item.step}</span>
              <h3 className="text-base font-medium text-gray-800 mt-1">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. VỊ TRÍ ĐẮC ĐỊA TẠI HÀ NỘI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-12 items-center">
        <div className="md:col-span-1">
          <h2 className="text-3xl font-medium text-gray-800 mb-2">Vị trí đắc địa</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Nằm tại khu vực trung tâm sầm uất của Hà Nội, kết nối giao thông linh hoạt, giúp quý khách dễ dàng di chuyển tới các điểm đến nổi tiếng trong thành phố.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-4 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
          {[
            { place: 'Trung tâm hành chính', distance: '5 phút di chuyển' },
            { place: 'Trung tâm thương mại lớn', distance: '7 phút di chuyển' },
            { place: 'Khu ẩm thực và giải trí', distance: '3 phút đi bộ' },
            { place: 'Sân bay quốc tế Nội Bài', distance: '30 phút di chuyển' },
          ].map((loc) => (
            <div key={loc.place} className="flex flex-col p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
              <span className="text-base font-medium text-gray-800 mb-1">{loc.place}</span>
              <span className="text-sm text-primary font-medium">{loc.distance}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutPage;