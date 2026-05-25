import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../../services/api';
import { formatDate, formatVND } from '../../utils/format';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const promotionSchema = z.object({
  code: z.string().min(1, 'Mã ưu đãi không được để trống'),
  type: z.enum(['percentage', 'fixed', 'free_night']),
  value: z.coerce.number().positive('Giá trị phải lớn hơn 0'),
  minNights: z.coerce.number().int().min(0).optional(),
  usageLimit: z.coerce.number().int().min(0).optional(),
  startDate: z.string().min(1, 'Chọn ngày bắt đầu'),
  endDate: z.string().min(1, 'Chọn ngày kết thúc'),
  isActive: z.preprocess((val) => val === true || val === 'true', z.boolean()),
}).refine(data => new Date(data.endDate) >= new Date(data.startDate), {
  message: 'Ngày kết thúc phải từ ngày bắt đầu trở đi',
  path: ['endDate'],
});

const PromotionListPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: rawData, isLoading } = useQuery({
    queryKey: ['admin', 'promotions'],
    queryFn: () => api.get('/promotions').then((r) => r.data),
  });

  const extractData = () => {
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData;
    if (Array.isArray(rawData.data)) return rawData.data;
    if (Array.isArray(rawData.promotions)) return rawData.promotions;
    if (Array.isArray(rawData.data?.promotions)) return rawData.data.promotions;
    return [];
  };

  const promotions = extractData();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      type: 'percentage',
      isActive: true,
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/promotions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
      queryClient.invalidateQueries({ queryKey: ['public', 'promotions'] });
      toast.success('Tạo mã ưu đãi thành công');
      handleCloseModal();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: any }) => api.put(`/promotions/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
      queryClient.invalidateQueries({ queryKey: ['public', 'promotions'] });
      toast.success('Cập nhật mã ưu đãi thành công');
      handleCloseModal();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: number) => api.patch(`/promotions/${id}/toggle`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
      queryClient.invalidateQueries({ queryKey: ['public', 'promotions'] });
      toast.success('Thay đổi trạng thái thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/promotions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
      queryClient.invalidateQueries({ queryKey: ['public', 'promotions'] });
      toast.success('Xóa mã ưu đãi thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const handleOpenModal = (promo?: any) => {
    if (promo) {
      setEditingId(promo.id);
      setValue('code', promo.code);
      setValue('type', promo.type);
      setValue('value', promo.value);
      setValue('minNights', promo.minNights || 0);
      setValue('usageLimit', promo.usageLimit || 0);
      setValue('startDate', promo.startDate?.split('T')[0] || '');
      setValue('endDate', promo.endDate?.split('T')[0] || '');
      setValue('isActive', promo.isActive);
    } else {
      setEditingId(null);
      reset({ type: 'percentage', isActive: true, minNights: 0, usageLimit: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    reset();
  };

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      minNights: data.minNights > 0 ? Number(data.minNights) : null,
      usageLimit: data.usageLimit > 0 ? Number(data.usageLimit) : null,
    };
    
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800">Quản lý mã Khuyến mãi</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm"
        >
          + Tạo mã mới
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Mã ưu đãi</th>
                <th className="px-4 py-3 font-medium">Chi tiết giảm</th>
                <th className="px-4 py-3 font-medium">Thời hạn</th>
                <th className="px-4 py-3 font-medium text-center">Lượt dùng</th>
                <th className="px-4 py-3 font-medium text-center">Trạng thái</th>
                <th className="px-4 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">Đang tải dữ liệu...</td>
                </tr>
              )}
              {!isLoading && promotions?.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">Hệ thống chưa có mã khuyến mãi nào</td>
                </tr>
              )}
              {promotions?.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-bold text-gray-800 uppercase">{promo.code}</td>
                  <td className="px-4 py-4">
                    <span className="font-medium text-green-600 block mb-0.5">
                      {promo.type === 'percentage' && `Giảm ${promo.value}%`}
                      {promo.type === 'fixed' && `Giảm ${formatVND(promo.value)}`}
                      {promo.type === 'free_night' && `Tặng ${promo.value} đêm`}
                    </span>
                    {promo.minNights ? <span className="text-xs text-gray-400">Đk: Tối thiểu {promo.minNights} đêm</span> : ''}
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    <span className="block mb-0.5">Từ: {promo.startDate ? formatDate(promo.startDate).split(' ')[0] : '—'}</span>
                    <span className="block text-red-500">Đến: {promo.endDate ? formatDate(promo.endDate).split(' ')[0] : '—'}</span>
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600 font-medium">
                    {promo.usedCount} <span className="text-gray-400 font-normal">/ {promo.usageLimit || '∞'}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => toggleMutation.mutate(promo.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        promo.isActive 
                          ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {promo.isActive ? 'Đang bật' : 'Đã khóa'}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button onClick={() => handleOpenModal(promo)} className="text-blue-600 hover:underline mr-4 font-medium">Sửa</button>
                    <button 
                      onClick={() => window.confirm(`Xác nhận xóa mã ${promo.code}?`) && deleteMutation.mutate(promo.id)} 
                      className="text-red-500 hover:underline font-medium"
                    >Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-xl font-medium text-gray-800 mb-5">{editingId ? 'Chỉnh sửa ưu đãi' : 'Tạo ưu đãi mới'}</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-600 mb-1">Mã Code (Tự đặt) *</label><input {...register('code')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 uppercase focus:ring-2 focus:ring-primary/20 outline-none" placeholder="VD: SUMMER24" />{errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message as string}</p>}</div>
                <div><label className="block text-sm text-gray-600 mb-1">Trạng thái mã</label><select {...register('isActive')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none"><option value="true">Cho phép sử dụng</option><option value="false">Tạm khóa mã này</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-600 mb-1">Loại giảm giá *</label><select {...register('type')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none"><option value="percentage">Giảm theo %</option><option value="fixed">Giảm số tiền cố định</option><option value="free_night">Tặng đêm miễn phí</option></select></div>
                <div><label className="block text-sm text-gray-600 mb-1">Giá trị giảm *</label><input {...register('value')} type="number" step="any" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="15 (%), hoặc 200000 (đ)" />{errors.value && <p className="text-red-500 text-xs mt-1">{errors.value.message as string}</p>}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-600 mb-1">Cần đặt tối thiểu (Đêm)</label><input {...register('minNights')} type="number" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="0 = Bỏ qua" /></div>
                <div><label className="block text-sm text-gray-600 mb-1">Giới hạn số người dùng</label><input {...register('usageLimit')} type="number" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="0 = Không giới hạn" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-600 mb-1">Ngày bắt đầu *</label><input {...register('startDate')} type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" />{errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message as string}</p>}</div>
                <div><label className="block text-sm text-gray-600 mb-1">Ngày kết thúc *</label><input {...register('endDate')} type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" />{errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message as string}</p>}</div>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors">Đóng</button>
                <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center gap-2">
                  {(createMutation.isPending || updateMutation.isPending) && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                  {editingId ? 'Cập nhật' : 'Hoàn tất tạo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionListPage;