import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../../services/api';

const schema = z.object({
  email: z.string().email('Email khong hop le'),
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
    } catch {
      toast.error('Co loi xay ra, vui long thu lai sau');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 w-full max-w-md">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-1">
            Quen mat khau
          </h1>
          <p className="text-sm text-gray-500 font-normal">
            Nhap email de nhan link dat lai mat khau
          </p>
        </div>

        {submitted ? (
          // Success state
          <div className="flex flex-col gap-4">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="text-sm text-green-700 font-medium mb-1">
                Kiem tra hop thu cua ban
              </p>
              <p className="text-sm text-green-600 font-normal leading-relaxed">
                Neu email ton tai trong he thong, chung toi da gui link dat lai mat khau.
                Vui long kiem tra hop thu (ke ca Spam).
              </p>
            </div>
            <Link
              to="/login"
              className="text-center text-sm text-primary font-medium hover:underline"
            >
              Quay lai dang nhap
            </Link>
          </div>
        ) : (
          // Form state
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                {...register('email')}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
            >
              {isSubmitting ? 'Dang gui...' : 'Gui link dat lai mat khau'}
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

export default ForgotPasswordPage;