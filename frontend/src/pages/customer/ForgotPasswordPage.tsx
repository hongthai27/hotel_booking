import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../../services/api';

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

type FormValues = z.infer<typeof schema>;

const ForgotPasswordPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await api.post('/auth/forgot-password', { email: data.email });
      setSubmitted(true);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  return (
    <div className="w-full">
      
      {/* HEADER */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Quên mật khẩu</h2>
        <p className="text-sm text-gray-500 mt-2">Nhập email để nhận link đặt lại mật khẩu</p>
      </div>

      {submitted ? (
        /* TRẠNG THÁI GỬI THÀNH CÔNG */
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
            <p className="text-sm text-green-700 font-semibold mb-1">
              Kiểm tra hộp thư của bạn
            </p>
            <p className="text-sm text-green-600 leading-relaxed">
              Chúng tôi đã gửi link đặt lại mật khẩu. Vui lòng kiểm tra hộp thư (kể cả Spam).
            </p>
          </div>
          <div className="text-center">
            <Link to="/login" className="text-sm font-semibold text-primary hover:underline">
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      ) : (
        /* FORM NHẬP EMAIL */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register('email')}
              disabled={isSubmitting}
              className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
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
                  Đang gửi...
                </>
              ) : (
                'Gửi link đặt lại mật khẩu'
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

export default ForgotPasswordPage;