import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import { useSearchStore } from '../../stores/searchStore';
import { toast } from 'sonner';

const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatCurrency = (value: number | undefined | null) => {
  if (value === undefined || value === null || isNaN(value)) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const parseCurrency = (value: string) => {
  const numericString = value.replace(/\D/g, '');
  if (!numericString) return undefined;
  return parseInt(numericString, 10);
};

const buildSearchSchema = (today: string) =>
  z.object({
    checkIn: z
      .string()
      .min(1, 'Vui lòng chọn ngày nhận phòng')
      .refine((d) => d >= today, 'Ngày nhận phòng phải từ hôm nay trở đi'),
    checkOut: z
      .string()
      .min(1, 'Vui lòng chọn ngày trả phòng'),
    guests: z
      .number()
      .int()
      .min(1, 'Số khách phải ít nhất là 1'),
    minPrice: z.number().min(0, 'Giá không hợp lệ').optional(),
    maxPrice: z.number().min(0, 'Giá không hợp lệ').optional(),
  })
  .refine((d) => d.checkOut > d.checkIn, {
    message: 'Ngày trả phòng phải sau ngày nhận phòng',
    path: ['checkOut'],
  })
  .refine((d) => {
    if (d.minPrice !== undefined && d.maxPrice !== undefined) {
      return d.maxPrice >= d.minPrice;
    }
    return true;
  }, {
    message: 'Giá đến phải lớn hơn hoặc bằng giá từ',
    path: ['maxPrice'],
  });

type SearchFormValues = z.infer<ReturnType<typeof buildSearchSchema>>;

interface SearchFormProps {
  compact?: boolean;
}

const inputClass = (compact: boolean) =>
  `border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors w-full ${
    compact ? 'text-xs' : 'text-sm'
  }`;

const SearchForm = ({ compact = false }: SearchFormProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const today = getToday();
  const setSearchData = useSearchStore((state) => state.setSearchData);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(buildSearchSchema(today)),
    defaultValues: {
      checkIn: searchParams.get('checkIn') || '',
      checkOut: searchParams.get('checkOut') || '',
      guests: Number(searchParams.get('guests')) || 1,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    },
  });

  const checkIn = watch('checkIn');
  const watchedValues = watch();

  useEffect(() => {
    setSearchData({
      checkIn: watchedValues.checkIn,
      checkOut: watchedValues.checkOut,
      guests: watchedValues.guests,
    });
  }, [watchedValues.checkIn, watchedValues.checkOut, watchedValues.guests, setSearchData]);

  const getMinCheckOut = (checkIn: string): string => {
    if (!checkIn) return getToday();
    const date = new Date(checkIn);
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const minCheckOut = getMinCheckOut(checkIn);
  
  const toLocalDateString = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onSubmit = (data: SearchFormValues) => {
    if (data.guests > 10) {
      setShowGroupModal(true);
      return;
    }

    const params = new URLSearchParams({
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: String(data.guests),
    });

    if (data.minPrice) params.set('minPrice', String(data.minPrice));
    if (data.maxPrice) params.set('maxPrice', String(data.maxPrice));

    navigate(`/rooms?${params.toString()}`);
  };

  if (compact) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap gap-2 items-end"
      >
        <div className="flex flex-col gap-1 w-32">
          <label className="text-xs text-gray-400">Nhận phòng</label>
          <Controller
            control={control}
            name="checkIn"
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(toLocalDateString(date))}
                dateFormat="dd/MM/yyyy"
                minDate={new Date(today)}
                placeholderText="dd/mm/yyyy"
                className={inputClass(true)}
                wrapperClassName="w-full"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-1 w-32">
          <label className="text-xs text-gray-400">Trả phòng</label>
          <Controller
            control={control}
            name="checkOut"
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(toLocalDateString(date))}
                dateFormat="dd/MM/yyyy"
                minDate={new Date(minCheckOut)}
                placeholderText="dd/mm/yyyy"
                className={inputClass(true)}
                wrapperClassName="w-full"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-1 w-20">
          <label className="text-xs text-gray-400">Số khách</label>
          <input
            type="number"
            min={1}
            className={inputClass(true)}
            {...register('guests', { valueAsNumber: true })}
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-medium rounded-xl transition-colors whitespace-nowrap"
        >
          Cập nhật
        </button>
      </form>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-800">Ngày nhận phòng</label>
          <Controller
            control={control}
            name="checkIn"
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(toLocalDateString(date))}
                dateFormat="dd/MM/yyyy"
                minDate={new Date(today)}
                placeholderText="dd/mm/yyyy"
                className={inputClass(false)}
                wrapperClassName="w-full"
              />
            )}
          />
          {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-800">Ngày trả phòng</label>
          <Controller
            control={control}
            name="checkOut"
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(toLocalDateString(date))}
                dateFormat="dd/MM/yyyy"
                minDate={new Date(minCheckOut)}
                placeholderText="dd/mm/yyyy"
                className={inputClass(false)}
                wrapperClassName="w-full"
              />
            )}
          />
          {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-800">Số khách</label>
          <input
            type="number"
            min={1}
            className={inputClass(false)}
            {...register('guests', { valueAsNumber: true })}
          />
          {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3 relative">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800 line-clamp-1">Giá từ (VNĐ)</label>
            <Controller
              control={control}
              name="minPrice"
              render={({ field: { onChange, value } }) => (
                <input
                  type="text"
                  placeholder="Min"
                  value={formatCurrency(value)}
                  onChange={(e) => onChange(parseCurrency(e.target.value))}
                  className={`${inputClass(false)} placeholder:text-gray-300`}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800 line-clamp-1">Giá đến (VNĐ)</label>
            <Controller
              control={control}
              name="maxPrice"
              render={({ field: { onChange, value } }) => (
                <input
                  type="text"
                  placeholder="Max"
                  value={formatCurrency(value)}
                  onChange={(e) => onChange(parseCurrency(e.target.value))}
                  className={`${inputClass(false)} placeholder:text-gray-300 ${
                    errors.maxPrice 
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                      : ''
                  }`}
                />
              )}
            />
          </div>
          
          {errors.maxPrice && (
            <p className="text-red-500 text-xs absolute -bottom-5 left-0 w-full whitespace-nowrap">
              {errors.maxPrice.message}
            </p>
          )}
        </div>

        <div className="flex items-end h-full pt-[28px]">
          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl border-none cursor-pointer transition-colors"
          >
            Tìm phòng
          </button>
        </div>
      </form>

      {showGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowGroupModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">Đặt phòng cho nhóm lớn</h2>
            <p className="text-sm text-gray-500 mb-4">
              Với nhóm {watch('guests')} khách, vui lòng để lại thông tin. 
              Chuyên viên kinh doanh của chúng tôi sẽ liên hệ báo giá ưu đãi và sắp xếp phòng gần nhau cho bạn.
            </p>
            
            <input placeholder="Tên công ty/Trưởng đoàn" className="border p-2 w-full mb-3 rounded-md" />
            <input placeholder="Số điện thoại" className="border p-2 w-full mb-3 rounded-md" />
            <textarea placeholder="Yêu cầu đặc biệt (Gala dinner, xe đưa đón...)" className="border p-2 w-full mb-3 rounded-md min-h-[80px]" />
            
            <button 
              onClick={() => {
                toast.success('Yêu cầu báo giá của bạn đã được gửi đi. Chúng tôi sẽ liên hệ lại sớm nhất!');
                setShowGroupModal(false);
              }} 
              className="bg-primary text-white w-full py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Gửi yêu cầu báo giá
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchForm;