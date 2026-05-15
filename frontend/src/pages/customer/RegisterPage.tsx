import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner'; 

import { useAuthStore } from '../../stores/authStore';
import type { RegisterDTO } from '../../types/auth.types';

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    phoneNumber: z.string().regex(/^[0-9]{10,11}$/, 'Số điện thoại phải gồm 10 đến 11 chữ số'),
    password: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .regex(/[a-z]/, 'Phải chứa ít nhất 1 chữ thường')
      .regex(/[A-Z]/, 'Phải chứa ít nhất 1 chữ hoa')
      .regex(/[0-9]/, 'Phải chứa ít nhất 1 số')
      .regex(/[\W_]/, 'Phải chứa ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { register: registerAction } = useAuthStore();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched', // Hiện lỗi đỏ ngay khi người dùng nhập sai và blur ra ngoài
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsSubmitting(true);

      const payload: RegisterDTO = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      };

      await registerAction(payload);
      
      toast.success('Đăng ký tài khoản thành công!');
      navigate('/login');
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'Đăng ký thất bại. Vui lòng thử lại sau.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Tạo tài khoản mới</h2>
        <p className="text-sm text-gray-500 mt-2">Điền thông tin bên dưới để đăng ký</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Họ và tên</label>
          <input
            type="text"
            placeholder="Nhập họ và tên"
            {...register('fullName')}
            disabled={isSubmitting}
            className={`border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
              errors.fullName ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {errors.fullName && <span className="text-xs text-red-500">{errors.fullName.message}</span>}
        </div>

        {/* Grid: Email & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              {...register('email')}
              disabled={isSubmitting}
              className={`border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="text"
              placeholder="0912345678"
              {...register('phoneNumber')}
              disabled={isSubmitting}
              className={`border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.phoneNumber && <span className="text-xs text-red-500">{errors.phoneNumber.message}</span>}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu"
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
          <p className="text-[11px] text-gray-400">
            * Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
          </p>
          {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Nhập lại mật khẩu"
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
            <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* Submit Button */}
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
              Đang đăng ký...
            </>
          ) : (
            'Đăng ký'
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Đã có tài khoản?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;