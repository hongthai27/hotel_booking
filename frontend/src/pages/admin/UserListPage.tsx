import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminService } from '../../services/adminService';

const ROLE_LABEL: Record<string, string> = {
  admin: 'Admin',
  receptionist: 'Lễ tân',
  customer: 'Khách hàng',
};

const ROLE_CLASS: Record<string, string> = {
  admin: 'bg-purple-50 text-purple-700',
  receptionist: 'bg-blue-50 text-blue-700',
  customer: 'bg-gray-100 text-gray-600',
};

const STATUS_LABEL: Record<string, string> = {
  active: 'Hoạt động',
  inactive: 'Đã khóa',
};

const STATUS_CLASS: Record<string, string> = {
  active: 'bg-green-50 text-green-700',
  inactive: 'bg-red-50 text-red-500',
};

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-3 bg-gray-100 rounded w-3/4" />
      </td>
    ))}
  </tr>
);

const UserListPage = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const filters = {
    ...(search && { search }),
    ...(role && { role }),
    ...(status && { status }),
  };

  const { data: rawData, isLoading } = useQuery({
    queryKey: ['admin', 'users', filters],
    queryFn: () => adminService.getUsers(filters),
  });

  const extractData = () => {
    if (!rawData) return [];
    if (rawData.users) return rawData.users;
    if (rawData.data?.users) return rawData.data.users;
    if (rawData.data?.data?.users) return rawData.data.data.users;
    if (Array.isArray(rawData)) return rawData;
    if (Array.isArray(rawData.data)) return rawData.data;
    return [];
  };

  const users = extractData();

  const { mutate: updateUser } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { role?: string; status?: string } }) =>
      adminService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('Cập nhật tài khoản thành công');
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message ?? 'Có lỗi xảy ra';
      toast.error(message);
    },
  });

  const handleChange = (id: number, data: { role?: string; status?: string }) => {
    if (!window.confirm('Xác nhận thay đổi quyền/trạng thái?')) return;
    updateUser({ id, data });
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-medium text-gray-800">Quản lý tài khoản</h2>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Tìm theo tên, email, số điện thoại..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-64"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">Tất cả vai trò</option>
          <option value="admin">Admin</option>
          <option value="receptionist">Lễ tân</option>
          <option value="customer">Khách hàng</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Đã khóa</option>
        </select>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
    <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Họ tên', 'Email', 'SĐT', 'Vai trò', 'Trạng thái', 'Hành động'].map((col) => (
                  <th key={col} className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              )}

              {!isLoading && users.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400 text-sm">
                    Không có tài khoản nào
                  </td>
                </tr>
              )}

              {!isLoading && users.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">
                      {user.fullName}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{user.email}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{user.phoneNumber}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${ROLE_CLASS[user.role] ?? 'bg-gray-100 text-gray-500'}`}>
                        {ROLE_LABEL[user.role] ?? user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_CLASS[user.status] ?? 'bg-gray-100 text-gray-500'}`}>
                        {STATUS_LABEL[user.status] ?? user.status}
                      </span>
                    </td>
                  <td className="px-4 py-3">
                    <select
                      defaultValue=""
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!value) return;

                        const isRole = ['admin', 'receptionist', 'customer'].includes(value);
                        handleChange(user.id, isRole ? { role: value } : { status: value });

                        e.target.value = '';
                      }}
                      className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="" disabled>Chọn hành động</option>
                      <option value="admin">Đặt làm Admin</option>
                      <option value="receptionist">Đặt làm Lễ tân</option>
                      <option value="customer">Đặt làm Khách hàng</option>
                      <option value="" disabled>──────────</option>
                      <option value="inactive">Khóa tài khoản</option>
                      <option value="active">Mở khóa tài khoản</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;