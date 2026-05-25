import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../../services/auth.service';
import type { User } from '../../types/auth.types';
import { useLocation, useNavigate } from 'react-router-dom';

// ── Update Info Form ───────────────────────────────────────────────────────────

const updateInfoSchema = z.object({
  fullName: z.string().min(2, 'Tối thiểu 2 ký tự'),
  phoneNumber: z.string().regex(/^\d{10,11}$/, 'SĐT không hợp lệ'),
});

type UpdateInfoValues = z.infer<typeof updateInfoSchema>;

const UpdateInfoForm = ({
  user,
  onSuccess,
}: {
  user: User | null;
  onSuccess: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateInfoValues>({
    resolver: zodResolver(updateInfoSchema),
    defaultValues: {
      fullName: user?.fullName ?? '',
      phoneNumber: user?.phoneNumber ?? '',
    },
  });

  const onSubmit = async (data: UpdateInfoValues) => {
    try {
      await authService.updateProfile(data);
      await onSuccess();
      toast.success('Cập nhật thông tin thành công');
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Có lỗi xảy ra');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">Họ và tên</label>
        <input
          {...register('fullName')}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">Email</label>
        <input
          value={user?.email ?? ''}
          disabled
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-base bg-gray-50 text-gray-400 cursor-not-allowed w-full"
        />
        <p className="text-sm text-gray-400">Email không thể thay đổi</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">Số điện thoại</label>
        <input
          {...register('phoneNumber')}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-xl text-base font-medium flex items-center justify-center gap-2 mt-2 transition-colors"
      >
        {isSubmitting && (
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        )}
        Lưu thay đổi
      </button>
    </form>
  );
};

// ── Change Password Form ───────────────────────────────────────────────────────

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Nhập mật khẩu hiện tại'),
    newPassword: z.string().min(6, 'Tối thiểu 6 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordValues) => {
    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Đổi mật khẩu thành công');
      reset();
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Có lỗi xảy ra');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Mật khẩu hiện tại */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">Mật khẩu hiện tại</label>
        <div className="relative">
          <input
            {...register('currentPassword')}
            type={showCurrent ? 'text' : 'password'}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full pr-16"
          />
          <button
            type="button"
            onClick={() => setShowCurrent((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600"
          >
            {showCurrent ? 'Ẩn' : 'Hiện'}
          </button>
        </div>
        {errors.currentPassword && (
          <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
        )}
      </div>

      {/* Mật khẩu mới */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">Mật khẩu mới</label>
        <div className="relative">
          <input
            {...register('newPassword')}
            type={showNew ? 'text' : 'password'}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full pr-16"
          />
          <button
            type="button"
            onClick={() => setShowNew((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600"
          >
            {showNew ? 'Ẩn' : 'Hiện'}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-sm text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Xác nhận mật khẩu */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">Xác nhận mật khẩu</label>
        <input
          {...register('confirmPassword')}
          type={showNew ? 'text' : 'password'}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-xl text-base font-medium flex items-center justify-center gap-2 mt-2 transition-colors"
      >
        {isSubmitting && (
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        )}
        Đổi mật khẩu
      </button>
    </form>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────────

const ROLE_LABEL: Record<string, string> = {
  admin: 'Quản trị viên',
  receptionist: 'Lễ tân',
  customer: 'Khách hàng',
};

const ROLE_CLASS: Record<string, string> = {
  admin: 'bg-purple-50 text-purple-700',
  receptionist: 'bg-blue-50 text-blue-700',
  customer: 'bg-gray-100 text-gray-600',
};

const ProfilePage = () => {
  const { user, getMe } = useAuthStore();

  const [tab, setTab] = useState<'info' | 'password'>('info');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarLoading(true);
    try {
      await authService.uploadAvatar(file);
      await getMe();
      toast.success('Cập nhật ảnh đại diện thành công');
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Upload thất bại');
    } finally {
      setAvatarLoading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-medium text-gray-800 mb-6">Hồ sơ cá nhân</h1>

      {/* ── Avatar ── */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-accent flex items-center justify-center">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="text-white text-3xl font-medium">
                {user?.fullName?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <button
            onClick={() => fileRef.current?.click()}
            disabled={avatarLoading}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs hover:bg-primary-dark shadow-md disabled:opacity-60 transition-colors"
          >
            {avatarLoading ? (
              <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            )}
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <p className="text-sm text-gray-400 mt-3">
          Nhấn vào + để đổi ảnh (tối đa 2MB)
        </p>
        <p className="text-lg font-medium text-gray-800 mt-2">{user?.fullName}</p>
        <p className="text-base text-gray-500">{user?.email}</p>

        {user?.role && (
          <span className={`mt-2 text-sm font-medium px-3 py-1 rounded-full ${ROLE_CLASS[user.role] ?? 'bg-gray-100 text-gray-600'}`}>
            {ROLE_LABEL[user.role] ?? user.role}
          </span>
        )}
      </div>

      {/* ── Tabs ── */}
      <div className="flex border-b border-gray-100 mb-6">
        {[
          { key: 'info', label: 'Thông tin cá nhân' },
          { key: 'password', label: 'Đổi mật khẩu' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as 'info' | 'password')}
            className={`pb-3 mr-6 text-base font-medium border-b-2 transition-colors ${
              tab === t.key
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'info' && <UpdateInfoForm user={user} onSuccess={getMe} />}
      {tab === 'password' && <ChangePasswordForm />}
    </div>
  );
};

export default ProfilePage;