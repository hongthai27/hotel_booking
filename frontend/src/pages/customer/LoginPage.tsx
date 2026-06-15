import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { useAuthStore } from '../../stores/authStore';

// Đã gỡ bỏ giới hạn 6 ký tự để Backend tự kiểm tra
const loginSchema = z.object({
  identifier: z.string().min(1, 'Vui lòng nhập Email hoặc Số điện thoại'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'), 
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string>(''); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      setLoginError(''); 
      
      await login(data.identifier, data.password);
      
      const currentUser = useAuthStore.getState().user;
      const redirectPath = searchParams.get('redirect') || searchParams.get('returnUrl');
      
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        return;
      }

      if (currentUser?.role === 'admin' || currentUser?.role === 'receptionist') {
        navigate('/admin/bookings', { replace: true });
      } else {
        navigate('/', { replace: true }); 
      }
      
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';

      setLoginError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Đăng nhập</h2>
        <p className="text-sm text-gray-500 mt-2">Chào mừng bạn quay trở lại</p>
      </div>

      {/* Khung báo lỗi từ Server */}
      {loginError && (
        <div className="mb-5 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{loginError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Email / Số điện thoại</label>
          <input
            type="text"
            placeholder="Nhập email hoặc SĐT"
            {...register('identifier')}
            disabled={isSubmitting}
            className={`border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
              errors.identifier ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {errors.identifier && (
            <span className="text-xs text-red-500">{errors.identifier.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
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
          
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs text-red-500">
              {errors.password ? errors.password.message : ''}
            </span>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary hover:underline ml-auto"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium rounded-xl px-4 py-3 text-sm transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
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
            'Đăng nhập'
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;