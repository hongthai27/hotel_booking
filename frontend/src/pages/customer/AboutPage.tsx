const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold text-primary mb-8 text-center uppercase tracking-wide">
        Về Hotel Booking
      </h1>
      
      <div className="flex flex-col gap-10 leading-relaxed text-gray-600">
        <div className="w-full h-80 rounded-3xl overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200" 
            alt="Hotel Lobby" 
            className="w-full h-full object-cover"
          />
        </div>

        <article className="flex flex-col gap-4">
          <p className="text-sm font-normal">
            Tọa lạc tại trung tâm thành phố, Hotel Booking là điểm đến lý tưởng cho những khách hàng tìm kiếm sự giao thoa giữa phong cách hiện đại và dịch vụ tận tâm.
          </p>
          <p className="text-sm font-normal">
            Với hệ thống phòng nghỉ được trang bị nội thất cao cấp, chúng tôi cam kết mang lại cho bạn những đêm nghỉ thoải mái và đáng nhớ nhất.
          </p>
        </article>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Sứ mệnh</h3>
            <p className="text-xs">Số hóa trải nghiệm nghỉ dưỡng, giúp việc tìm và đặt phòng trở nên minh bạch, nhanh chóng chỉ với vài cú click.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Cam kết</h3>
            <p className="text-xs">Giá tốt nhất, hỗ trợ 24/7 và hệ thống thanh toán an toàn tuyệt đối theo tiêu chuẩn quốc tế.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;