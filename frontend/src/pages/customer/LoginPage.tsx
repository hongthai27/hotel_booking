import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuthStore } from '../../stores/authStore';

const loginSchema = z.object({
  identifier: z.string().min(1, 'Vui lòng nhập Email hoặc Số điện thoại'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      
      await login(data.identifier, data.password);
      
      toast.success('Đăng nhập thành công!');
      
      // Chuyển hướng người dùng về trang cũ (nếu có) hoặc trang chủ
      const returnUrl = searchParams.get('returnUrl') || '/';
      navigate(returnUrl);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Đăng nhập thất bại, vui lòng kiểm tra lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 w-full max-w-md">
        
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-1">
            Đăng nhập
          </h1>
          <p className="text-sm text-gray-500 font-normal">
            Chào mừng bạn quay lại hệ thống
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          
          {/* KHỐI EMAIL / SỐ ĐIỆN THOẠI */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email / Số điện thoại</label>
            <input
              type="text"
              placeholder="Nhập email hoặc số điện thoại"
              {...register('identifier')}
              disabled={isSubmitting}
              className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                errors.identifier ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.identifier && (
              <span className="text-xs text-red-500">{errors.identifier.message}</span>
            )}
          </div>

          {/* KHỐI MẬT KHẨU (ĐÃ TÍCH HỢP HIỆN/ẨN & QUÊN MẬT KHẨU) */}
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
            
            <div className="flex items-start justify-between mt-1">
              <span className="text-xs text-red-500">
                {errors.password ? errors.password.message : ''}
              </span>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary hover:underline shrink-0 ml-2"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          {/* NÚT SUBMIT ĐĂNG NHẬP */}
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

          {/* LINK TỚI TRANG ĐĂNG KÝ */}
          <div className="text-center mt-4 text-sm text-gray-500">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Đăng ký ngay
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;