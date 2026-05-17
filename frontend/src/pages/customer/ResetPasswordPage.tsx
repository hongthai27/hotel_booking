import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../../services/api';

const schema = z
  .object({
    password: z
      .string()
      .min(8, 'Mật khẩu tối thiểu 8 ký tự')
      .regex(/[a-z]/, 'Phải có ít nhất 1 chữ thường')
      .regex(/[A-Z]/, 'Phải có ít nhất 1 chữ hoa')
      .regex(/[0-9]/, 'Phải có ít nhất 1 số')
      .regex(/[\W_]/, 'Phải có ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  // Thêm state để quản lý ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Nếu không có token -> redirect ngay
  useEffect(() => {
    if (!token) {
      toast.error('Link không hợp lệ');
      navigate('/login');
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await api.post('/auth/reset-password', {
        token,
        password: data.password,
      });
      toast.success('Đặt lại mật khẩu thành công!');
      navigate('/login');
    } catch (err: any) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 400) {
        setError('root', {
          message: 'Link đã hết hạn. Vui lòng yêu cầu lại.',
        });
        return;
      }

      toast.error(message ?? 'Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  if (!token) return null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Đặt lại mật khẩu</h2>
        <p className="text-sm text-gray-500 mt-2">Nhập mật khẩu mới cho tài khoản của bạn</p>
      </div>

      {/* Token hết hạn */}
      {errors.root && (
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
            <p className="text-sm text-red-700 font-semibold mb-1">
              Đã có lỗi xảy ra
            </p>
            <p className="text-sm text-red-600 leading-relaxed">
              {errors.root.message}
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-4">
            <button
              onClick={() => navigate('/forgot-password')}
              className="w-full flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-xl px-4 py-3 text-sm transition-all"
            >
              Gửi lại email
            </button>
            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {!errors.root && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Mật khẩu mới</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu mới"
                {...register('password')}
                disabled={isSubmitting}
                className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
              >
                {showPassword ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu mới"
                {...register('confirmPassword')}
                disabled={isSubmitting}
                className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isSubmitting}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
              >
                {showConfirmPassword ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium rounded-xl px-4 py-3 text-sm transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                'Xác nhận đặt lại'
              )}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;