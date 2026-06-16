import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAdminRoomTypes } from '../../hooks/queries/useAdminBookingsQuery';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { toast } from 'sonner';

const PLACEHOLDER = 'https://placehold.co/400x300?text=No+Image';

const roomTypeSchema = z.object({
  typeName: z.string().min(1, 'Vui lòng nhập tên hạng phòng'),
  maxCapacity: z.number({ message: 'Vui lòng nhập số' }).min(1, 'Sức chứa tối thiểu là 1'),
  basePrice: z.number({ message: 'Vui lòng nhập số' }).min(0, 'Giá không được âm'),
  description: z.string().optional(),
});

type RoomTypeFormValues = z.infer<typeof roomTypeSchema>;

const formatCurrency = (value: number | undefined | null) => {
  if (value === undefined || value === null || isNaN(value)) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const parseCurrency = (value: string) => {
  const numericString = value.replace(/\D/g, '');
  if (!numericString) return 0;
  return parseInt(numericString, 10);
};

const SkeletonCard = () => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden animate-pulse">
    <div className="h-40 bg-gray-200" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-3 bg-gray-100 rounded w-1/3" />
      <div className="flex gap-2 mt-1">
        <div className="h-6 bg-gray-100 rounded-full w-12" />
        <div className="h-6 bg-gray-100 rounded-full w-16" />
      </div>
      <div className="flex justify-between pt-3 border-t border-gray-100 mt-auto">
        <div className="h-3 bg-gray-100 rounded w-16" />
        <div className="flex gap-3">
          <div className="h-3 bg-gray-100 rounded w-8" />
          <div className="h-3 bg-gray-100 rounded w-8" />
        </div>
      </div>
    </div>
  </div>
);

const RoomTypeFormModal = ({
  onClose,
  defaultValues,
}: {
  onClose: () => void;
  defaultValues?: any;
}) => {
  const queryClient = useQueryClient();
  const { data: amenitiesList = [], isLoading: isLoadingAmenities } = useQuery({
    queryKey: ['admin', 'amenities'],
    queryFn: () => api.get('/admin/amenities').then(res => res.data?.data || res.data)
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<RoomTypeFormValues>({
    resolver: zodResolver(roomTypeSchema),
    defaultValues: defaultValues
      ? {
          typeName: defaultValues.typeName,
          maxCapacity: defaultValues.maxCapacity,
          basePrice: Number(defaultValues.basePrice),
          description: defaultValues.description ?? '',
        }
      : { typeName: '', maxCapacity: 1, basePrice: 0, description: '' },
  });

  const [selectedAmenities, setSelectedAmenities] = useState<number[]>(
    defaultValues?.amenities?.map((a: any) => a.amenityId ?? a.amenity?.id ?? a.id) ?? []
  );

  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { mutate: createRoomType, isPending: isCreating } = useMutation({
    mutationFn: (data: FormData) => api.post('/admin/room-types', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Thêm hạng phòng thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const { mutate: updateRoomType, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: number, data: FormData }) => api.put(`/admin/room-types/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Cập nhật hạng phòng thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const isPending = isCreating || isUpdating;

  const existingImages: { id: number; imageUrl: string }[] = defaultValues?.images ?? [];
  const visibleExistingImages = existingImages.filter((img) => !deleteImageIds.includes(img.id));

  const handleDeleteExistingImage = (imageId: number) => {
    setDeleteImageIds((prev) => [...prev, imageId]);
  };

  const handleClose = () => {
    if (isDirty || imageFiles.length > 0 || deleteImageIds.length > 0) {
      if (window.confirm('Dữ liệu chưa được lưu. Bạn có chắc chắn muốn hủy?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    
    const validFiles = files.filter(f => {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
        toast.error(`File ${f.name} không đúng định dạng ảnh (jpg, png, webp)`);
        return false;
      }
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`File ${f.name} vượt quá dung lượng 5MB`);
        return false;
      }
      return true;
    });

    const newFiles = [...imageFiles, ...validFiles].slice(0, 10);
    setImageFiles(newFiles);
    setPreviewUrls(newFiles.map((f) => URL.createObjectURL(f)));
  };

  const handleRemoveNewImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setPreviewUrls(newFiles.map((f) => URL.createObjectURL(f)));
  };

  const toggleAmenity = (id: number) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const onSubmit = (data: RoomTypeFormValues) => {
    const formData = new FormData();

    formData.append('typeName', data.typeName);
    if (data.description) formData.append('description', data.description);
    formData.append('maxCapacity', String(data.maxCapacity));
    formData.append('basePrice', String(data.basePrice));

    selectedAmenities.forEach((id) => formData.append('amenityIds', String(id)));
    imageFiles.forEach((file) => formData.append('images', file));

    if (defaultValues?.id) {
      formData.append('version', String(defaultValues.version));
      if (deleteImageIds.length > 0) {
        formData.append('deleteImageIds', JSON.stringify(deleteImageIds));
      }
      updateRoomType(
        { id: defaultValues.id, data: formData },
        { onSuccess: () => onClose() }
      );
    } else {
      createRoomType(formData, { onSuccess: () => onClose() });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">
            {defaultValues ? 'Chỉnh sửa hạng phòng' : 'Thêm hạng phòng'}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-sm"
            disabled={isPending}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form
          id="room-type-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-6 py-4 overflow-y-auto flex-1"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Tên hạng phòng</label>
            <input
              {...register('typeName')}
              placeholder="VD: Phòng Deluxe"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
            />
            {errors.typeName && (
              <p className="text-red-500 text-xs">{errors.typeName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Sức chứa tối đa</label>
              <input
                type="number"
                {...register('maxCapacity', { valueAsNumber: true })}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
              />
              {errors.maxCapacity && (
                <p className="text-red-500 text-xs">{errors.maxCapacity.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Giá / đêm (đ)</label>
              <Controller
                control={control}
                name="basePrice"
                render={({ field: { onChange, value } }) => (
                  <input
                    type="text"
                    value={formatCurrency(value)}
                    onChange={(e) => onChange(parseCurrency(e.target.value))}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
                  />
                )}
              />
              {errors.basePrice && (
                <p className="text-red-500 text-xs">{errors.basePrice.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Mô tả</label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Mô tả ngắn về hạng phòng..."
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full resize-none"
            />
          </div>

          {defaultValues && existingImages.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">
                Ảnh hiện tại ({visibleExistingImages.length}/{existingImages.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {visibleExistingImages.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.imageUrl}
                      alt=""
                      className="w-16 h-16 object-cover rounded-xl border border-gray-100"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteExistingImage(img.id)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      title="Đánh dấu xóa ảnh này"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              {deleteImageIds.length > 0 && (
                <p className="text-xs text-orange-500">
                  {deleteImageIds.length} ảnh sẽ bị xóa khi lưu
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">
              {defaultValues ? 'Thêm ảnh mới' : 'Ảnh phòng'} ({imageFiles.length}/10)
            </label>
            <label className="border-2 border-dashed border-gray-200 rounded-xl px-4 py-5 flex flex-col items-center gap-1.5 cursor-pointer hover:border-primary/50 transition-colors">
              <span className="text-sm text-gray-400">Nhấn để chọn ảnh</span>
              <span className="text-xs text-gray-300">
                JPG, PNG, WEBP · Tối đa 10 ảnh · Mỗi ảnh tối đa 5MB
              </span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={url}
                      alt=""
                      className="w-16 h-16 object-cover rounded-xl border border-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(idx)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Tiện nghi</label>
            {isLoadingAmenities ? (
              <div className="text-xs text-gray-400">Đang tải danh sách tiện nghi...</div>
            ) : amenitiesList.length === 0 ? (
              <div className="text-xs text-gray-400">Chưa có tiện nghi nào. Hãy thêm trong Quản lý Tiện ích.</div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {amenitiesList.map((amenity: any) => (
                  <label
                    key={amenity.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity.id)}
                      onChange={() => toggleAmenity(amenity.id)}
                      className="accent-primary w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{amenity.amenityName}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </form>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            form="room-type-form"
            disabled={isPending}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPending ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </div>
    </div>
  );
};

const RoomFormModal = ({
  onClose,
  defaultValues,
  roomTypeId,
}: {
  onClose: () => void;
  defaultValues?: any;
  roomTypeId: number;
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues
      ? {
          roomNumber: defaultValues.roomNumber,
          floor: defaultValues.floor || 1,
          status: defaultValues.status || 'available',
        }
      : { roomNumber: '', floor: 1, status: 'available' },
  });

  const { mutate: saveRoom, isPending } = useMutation({
    mutationFn: (data: any) =>
      defaultValues
        ? api.put(`/admin/rooms/${defaultValues.id}`, data)
        : api.post('/admin/rooms', { ...data, roomTypeId }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(defaultValues ? 'Cập nhật phòng thành công' : 'Thêm phòng thành công');
      onClose();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const onSubmit = (data: any) => {
    saveRoom({
      roomNumber: data.roomNumber,
      floor: Number(data.floor),
      status: data.status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-sm flex flex-col">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">
            {defaultValues ? 'Chỉnh sửa phòng' : 'Thêm phòng mới'}
          </h3>
          <button onClick={onClose} disabled={isPending} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form id="room-form" onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Số phòng</label>
            <input
              {...register('roomNumber', { required: 'Số phòng là bắt buộc' })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="VD: 101"
            />
            {errors.roomNumber && <p className="text-red-500 text-xs mt-1">{errors.roomNumber.message as string}</p>}
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Tầng</label>
            <input
              type="number"
              {...register('floor', { required: 'Tầng là bắt buộc', min: 1 })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {!defaultValues && (
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Trạng thái ban đầu</label>
              <select
                {...register('status')}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              >
                <option value="available">Trống</option>
                <option value="maintenance">Bảo trì</option>
                <option value="out_of_order">Ngừng hoạt động</option>
              </select>
            </div>
          )}
        </form>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button type="button" onClick={onClose} disabled={isPending} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl disabled:opacity-50">Hủy</button>
          <button type="submit" form="room-form" disabled={isPending} className="px-4 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2">
            {isPending ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </div>
    </div>
  );
};

const RoomTypeListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [expandedRoomTypeId, setExpandedRoomTypeId] = useState<number | null>(null);
  
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editRoomTarget, setEditRoomTarget] = useState<any>(null);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<number | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortPriceOrder, setSortPriceOrder] = useState<'asc' | 'desc' | null>(null);

  const queryClient = useQueryClient();

  const { data: roomTypes, isLoading } = useAdminRoomTypes();
  
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: ({ id, status, version }: { id: number; status: string; version: number }) => 
      api.patch(`/admin/rooms/${id}/status`, { status, version }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Cập nhật trạng thái phòng thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật'),
  });

  const deleteRoomMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/admin/rooms/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Xóa phòng thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Không thể xóa phòng này'),
  });

  const deleteRoomTypeMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/admin/room-types/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Xóa hạng phòng thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Không thể xóa hạng phòng này'),
  });

  const toggleExpand = (id: number) => {
    setExpandedRoomTypeId(prev => (prev === id ? null : id));
  };

  const displayedRoomTypes = useMemo(() => {
    if (!roomTypes) return [];
    let result = [...roomTypes];
    if (searchTerm) {
      result = result.filter((rt: any) => rt.typeName.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (sortPriceOrder) {
      result.sort((a: any, b: any) => {
        if (sortPriceOrder === 'asc') return a.basePrice - b.basePrice;
        return b.basePrice - a.basePrice;
      });
    }
    return result;
  }, [roomTypes, searchTerm, sortPriceOrder]);

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý hạng phòng</h2>
        <button
          onClick={() => {
            setEditTarget(null);
            setShowModal(true);
          }}
          className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          Thêm hạng phòng
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <input 
          type="text" 
          placeholder="Tìm kiếm hạng phòng..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none flex-1"
        />
        <button 
          onClick={() => setSortPriceOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          Giá tiền {sortPriceOrder === 'asc' ? '↑' : sortPriceOrder === 'desc' ? '↓' : ''}
        </button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {!isLoading && (!roomTypes || roomTypes.length === 0) && (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <p className="text-gray-800 font-medium text-sm">Chưa có hạng phòng nào</p>
          <p className="text-gray-400 text-sm">Nhấn "Thêm hạng phòng" để bắt đầu</p>
        </div>
      )}

      {!isLoading && displayedRoomTypes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedRoomTypes.map((rt: any) => {
            const image = rt.images?.[0]?.imageUrl;
            const visibleAmenities = rt.amenities?.slice(0, 3) ?? [];
            const extraAmenities = (rt.amenities?.length ?? 0) - 3;
            const isExpanded = expandedRoomTypeId === rt.id;

            return (
              <div
                key={rt.id}
                onClick={() => toggleExpand(rt.id)}
                className={`bg-white border ${isExpanded ? 'border-primary ring-1 ring-primary/20' : 'border-gray-100'} rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all cursor-pointer`}
              >
                {image ? (
                  <img
                    src={image}
                    alt={rt.typeName}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                    }}
                  />
                ) : (
                  <img
                    src={PLACEHOLDER}
                    alt={rt.typeName}
                    className="w-full h-40 object-cover"
                  />
                )}

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">{rt.typeName}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Tối đa {rt.maxCapacity} khách</p>
                  </div>

                  <p className="text-primary font-medium text-sm">
                    {Number(rt.basePrice || 0).toLocaleString('vi-VN')}đ
                    <span className="text-gray-400 font-normal"> / đêm</span>
                  </p>

                  {visibleAmenities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {visibleAmenities.map((a: any) => (
                        <span key={a.amenity?.id ?? a.id} className="text-xs font-normal px-2.5 py-1 rounded-full bg-primary/5 text-primary">
                          {a.amenity?.amenityName ?? a.amenityName}
                        </span>
                      ))}
                      {extraAmenities > 0 && (
                        <span className="text-xs font-normal px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                          +{extraAmenities} nữa
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                    <span className="text-xs text-gray-400">
                      {rt._count?.rooms ?? rt.rooms?.length ?? 0} phòng
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const duplicatedTarget = {
                            ...rt,
                            id: undefined,
                            version: undefined,
                            typeName: `${rt.typeName} - Copy`,
                          };
                          setEditTarget(duplicatedTarget);
                          setShowModal(true);
                        }}
                        className="text-green-600 text-sm font-medium hover:underline"
                      >
                        Nhân bản
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditTarget(rt); 
                          setShowModal(true);
                        }}
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        Sửa
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Xác nhận xóa hạng phòng ${rt.typeName}?`)) {
                            deleteRoomTypeMutation.mutate(rt.id);
                          }
                        }} 
                        className="text-red-500 text-sm font-medium hover:underline"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div 
                    className="border-t border-gray-100 bg-gray-50/50 p-4 cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-800">
                        Danh sách phòng ({rt.rooms?.length || 0})
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoomTypeId(rt.id);
                          setEditRoomTarget(null);
                          setShowRoomModal(true);
                        }}
                        className="text-xs font-medium bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        + Thêm phòng
                      </button>
                    </div>
                    
                    {rt.rooms && rt.rooms.length > 0 ? (
                      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                            <tr>
                              <th className="px-3 py-2 font-medium">Phòng</th>
                              <th className="px-3 py-2 font-medium">Tầng</th>
                              <th className="px-3 py-2 font-medium">Giá</th>
                              <th className="px-3 py-2 font-medium">Trạng thái</th>
                              <th className="px-3 py-2 font-medium text-right">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {rt.rooms.map((room: any) => (
                              <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 py-2 font-medium text-gray-800">
                                  {room.roomNumber}
                                </td>
                                <td className="px-3 py-2 text-gray-600">
                                  {room.floor}
                                </td>
                                <td className="px-3 py-2 text-gray-600">
                                  {Number(room.basePrice ?? rt.basePrice).toLocaleString('vi-VN')}đ
                                </td>
                                <td className="px-3 py-2">
                                  <select
                                    value={room.status}
                                    disabled={isUpdatingStatus}
                                    onChange={(e) => {
                                      const newStatus = e.target.value;
                                      if (window.confirm('Bạn có chắc chắn muốn thay đổi trạng thái phòng này?')) {
                                        updateStatus({ id: room.id, status: newStatus, version: room.version });
                                      }
                                    }}
                                    className="border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 cursor-pointer"
                                  >
                                    <option value="available">Trống</option>
                                    <option value="occupied">Đang ở</option>
                                    <option value="maintenance">Bảo trì</option>
                                <option value="out_of_order">Ngừng hoạt động</option>
                                  </select>
                                </td>
                                <td className="px-3 py-2 text-right">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedRoomTypeId(rt.id);
                                      setEditRoomTarget(room);
                                      setShowRoomModal(true);
                                    }}
                                    className="text-blue-600 hover:underline mr-3 font-medium"
                                  >
                                    Sửa
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (window.confirm(`Xác nhận xóa phòng ${room.roomNumber}?`)) {
                                        deleteRoomMutation.mutate(room.id);
                                      }
                                    }}
                                    className="text-red-500 hover:underline font-medium"
                                  >
                                    Xóa
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-4 border border-dashed border-gray-200 rounded-xl bg-white">
                        <p className="text-xs text-gray-400">Không có phòng nào thuộc hạng này</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <RoomTypeFormModal
          onClose={() => {
            setShowModal(false);
            setEditTarget(null);
          }}
          defaultValues={editTarget}
        />
      )}

      {showRoomModal && selectedRoomTypeId !== null && (
        <RoomFormModal
          onClose={() => setShowRoomModal(false)}
          defaultValues={editRoomTarget}
          roomTypeId={selectedRoomTypeId}
        />
      )}
    </div>
  );
};

export default RoomTypeListPage;