import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const PromotionsPage = () => {
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Đã sao chép mã ưu đãi: ${code}`);
  };

  const { data: rawData, isLoading } = useQuery({
    queryKey: ['public', 'promotions'],
    queryFn: () => api.get('/promotions/public').then((r) => r.data),
  });

  const extractData = () => {
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData;
    if (Array.isArray(rawData.data)) return rawData.data;
    if (Array.isArray(rawData.promotions)) return rawData.promotions;
    if (Array.isArray(rawData.data?.promotions)) return rawData.data.promotions;
    return [];
  };

  // Lọc ra các mã đang bật và chưa quá hạn
  const validPromotions = extractData().filter((p: any) => {
    const isNotExpired = new Date(p.endDate) >= new Date();
    return p.isActive && isNotExpired;
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
    <div className="text-center mb-10">
      <h1 className="text-3xl font-medium text-gray-800 mb-2">Ưu đãi đặc biệt</h1>
      <p className="text-base text-gray-500">Những ưu đãi tốt nhất dành riêng cho bạn</p>
    </div>

    {isLoading && (
      <div className="text-center py-20">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Đang tải các chương trình ưu đãi...</p>
      </div>
    )}

    {!isLoading && validPromotions.length === 0 && (
      <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
        <p className="text-gray-500 text-lg">Hiện tại hệ thống chưa có chương trình ưu đãi nào.</p>
      </div>
    )}

    <div className="grid md:grid-cols-2 gap-6">
      {!isLoading && validPromotions.map((promo: any) => {
        let badge = '';
        let title = '';
        let desc = '';
        let tag = 'VOUCHER';
        let condition = `Áp dụng từ ${formatDate(promo.startDate)} đến ${formatDate(promo.endDate)}`;

        if (promo.type === 'percentage') {
          badge = `-${promo.value}%`;
          title = `Giảm ${promo.value}% tổng hóa đơn`;
          desc = `Nhập mã ${promo.code} để được giảm trực tiếp ${promo.value}% trên tổng giá trị đơn đặt phòng.`;
          tag = 'HOT DEAL';
        } else if (promo.type === 'fixed') {
          badge = `-${formatVND(promo.value)}`;
          title = `Giảm trực tiếp ${formatVND(promo.value)}`;
          desc = `Nhận ngay ưu đãi giảm ${formatVND(promo.value)} khi sử dụng mã ${promo.code} lúc thanh toán.`;
        } else if (promo.type === 'free_night') {
          badge = `+${promo.value} đêm`;
          title = `Tặng thêm ${promo.value} đêm miễn phí`;
          desc = `Tận hưởng thêm ${promo.value} đêm lưu trú hoàn toàn miễn phí khi đặt phòng cùng chúng tôi.`;
          tag = 'STAY MORE';
        }

        if (promo.minNights) {
          condition += ` (Yêu cầu đặt tối thiểu ${promo.minNights} đêm)`;
        }

        return (
        <div key={promo.id}
             className="bg-white rounded-3xl overflow-hidden border border-gray-200 
                        hover:border-[#17365D]/30 hover:shadow-xl 
                        hover:-translate-y-1 transition-all duration-300 flex flex-col">
          
          {/* Phần đầu: Nền Xanh Navy đậm (sáng hơn xíu nữa) */}
          <div className="bg-[#17365D] p-6 md:p-8 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            <div className="relative z-10 flex justify-between items-start mb-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10">
                {tag}
              </span>
            </div>
            <h3 className="relative z-10 text-xl font-medium text-white mb-2">{title}</h3>
            <span className="relative z-10 text-4xl md:text-5xl font-bold text-amber-400 tracking-tight">{badge}</span>
          </div>

          {/* Phần nội dung: Nền Trắng */}
          <div className="p-6 md:p-8 flex-1 flex flex-col bg-white">
            <p className="text-gray-600 text-base mb-6 leading-relaxed flex-1">
              {desc}
            </p>
            
            {/* Hộp điều kiện */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-500 shrink-0 mt-0.5">
                <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-500 italic">{condition}</p>
            </div>

            <button
               onClick={() => handleCopyCode(promo.code)}
               className="block w-full text-center border-2 border-dashed border-[#17365D] text-[#17365D]
                          py-3 rounded-xl text-base font-medium shadow-sm
                          hover:bg-[#17365D] hover:text-white transition-all duration-300">
              Lấy mã: {promo.code}
            </button>
          </div>
        </div>
      )})}
    </div>

    {/* Banner cuối đồng bộ màu Xanh Navy */}
    <div className="mt-10 bg-[#17365D] rounded-3xl p-8 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      <div className="relative z-10">
        <h2 className="text-2xl font-medium mb-2">Đăng ký nhận ưu đãi mới nhất</h2>
        <p className="text-white/70 text-base mb-5">
          Nhận thông báo về khuyến mãi và ưu đãi độc quyền qua email
        </p>
        <div className="flex gap-2 justify-center max-w-sm mx-auto">
          <input type="email" placeholder="Email của bạn"
                 className="flex-1 px-4 py-2.5 rounded-xl text-base text-gray-800 bg-white border border-transparent
                            focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-400 shadow-sm" />
          <button className="bg-amber-400 text-[#17365D] px-5 py-2.5 rounded-xl text-base
                             font-bold hover:bg-amber-500 transition-colors whitespace-nowrap shadow-sm">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PromotionsPage