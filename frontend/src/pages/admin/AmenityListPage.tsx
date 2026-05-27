import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminService } from '../../services/adminService';

interface Amenity {
  id: number;
  amenityName: string;
  description: string | null;
}

const AmenityListPage = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [amenityName, setAmenityName] = useState('');
  const [description, setDescription] = useState('');

  const { data: amenities, isLoading } = useQuery<Amenity[]>({
    queryKey: ['admin', 'amenities'],
    queryFn: () => adminService.getAmenities(),
  });

  const { mutate: createAmenity, isPending: isCreating } = useMutation({
    mutationFn: (data: { amenityName: string; description?: string }) =>
      adminService.createAmenity(data),
    onSuccess: () => {
      toast.success('Thêm tiện ích thành công');
      queryClient.invalidateQueries({ queryKey: ['admin', 'amenities'] });
      setIsFormOpen(false);
      setAmenityName('');
      setDescription('');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi thêm tiện ích');
    },
  });

  const { mutate: deleteAmenity } = useMutation({
    mutationFn: (id: number) => adminService.deleteAmenity(id),
    onSuccess: () => {
      toast.success('Xóa tiện ích thành công');
      queryClient.invalidateQueries({ queryKey: ['admin', 'amenities'] });
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi xóa tiện ích');
    },
  });

  const handleSave = () => {
    if (!amenityName.trim()) {
      toast.error('Vui lòng nhập tên tiện ích');
      return;
    }
    createAmenity({ amenityName: amenityName.trim(), description: description.trim() });
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setAmenityName('');
    setDescription('');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tiện ích này?')) {
      deleteAmenity(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý tiện ích</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer border-none"
        >
          Thêm tiện ích
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên tiện ích <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={amenityName}
                onChange={(e) => setAmenityName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isCreating}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 border-none cursor-pointer"
            >
              Lưu
            </button>
            <button
              onClick={handleCancel}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4 flex justify-between items-center bg-white animate-pulse">
              <div className="w-full pr-4">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
              <div className="w-10 h-6 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      ) : !amenities || amenities.length === 0 ? (
        <div className="text-center py-12 border border-gray-100 rounded-xl bg-white">
          <p className="text-gray-500 text-sm font-medium">Chưa có tiện ích</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="border border-gray-100 rounded-xl p-4 flex justify-between items-center bg-white"
            >
              <div className="pr-4 flex-1">
                <h3 className="text-sm font-medium text-gray-800">{amenity.amenityName}</h3>
                {amenity.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{amenity.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(amenity.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap border-none bg-transparent cursor-pointer"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AmenityListPage;