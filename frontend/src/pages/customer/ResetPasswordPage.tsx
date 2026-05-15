import { useEffect } from 'react';
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

  // Neu khong co token → redirect ngay
  useEffect(() => {
    if (!token) {
      toast.error('Link khong hop le');
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
      toast.success('Dat lai mat khau thanh cong!');
      navigate('/login');
    } catch (err: any) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 400) {
        setError('root', {
          message: 'Link da het han. Vui long yeu cau lai.',
        });
        return;
      }

      toast.error(message ?? 'Co loi xay ra, vui long thu lai');
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 w-full max-w-md">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-1">
            Dat lai mat khau
          </h1>
          <p className="text-sm text-gray-500 font-normal">
            Nhap mat khau moi cho tai khoan cua ban
          </p>
        </div>

        {/* Token het han */}
        {errors.root && (
          <div className="flex flex-col gap-4 mb-4">
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="text-sm text-red-600 font-normal">
                {errors.root.message}
              </p>
            </div>
            <button
              onClick={() => navigate('/forgot-password')}
              className="w-full py-2.5 border border-primary text-primary text-sm font-medium rounded-xl hover:bg-primary hover:text-white transition-colors"
            >
              Gui lai email
            </button>
            <Link
              to="/login"
              className="text-center text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Quay lai dang nhap
            </Link>
          </div>
        )}

        {/* Form */}
        {!errors.root && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Mat khau moi</label>
              <input
                type="password"
                placeholder="Toi thieu 6 ky tu"
                {...register('password')}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Xac nhan mat khau</label>
              <input
                type="password"
                placeholder="Nhap lai mat khau moi"
                {...register('confirmPassword')}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
            >
              {isSubmitting ? 'Dang xu ly...' : 'Dat lai mat khau'}
            </button>

            <Link
              to="/login"
              className="text-center text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Quay lai dang nhap
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;