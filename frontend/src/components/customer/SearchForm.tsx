import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';
import { useSearchStore } from '../../stores/searchStore';

// --- CÁC HÀM TIỆN ÍCH ---
const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Hàm thêm dấu chấm vào số (VD: 500000 -> "500.000")
const formatCurrency = (value: number | undefined | null) => {
  if (value === undefined || value === null || isNaN(value)) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Hàm chuyển text có dấu chấm về lại số nguyên (VD: "500.000" -> 500000)
const parseCurrency = (value: string) => {
  const numericString = value.replace(/\D/g, ''); // Chỉ giữ lại các chữ số, bỏ mọi ký tự khác
  if (!numericString) return undefined;
  return parseInt(numericString, 10);
};

// --- SCHEMA KIỂM TRA DỮ LIỆU ---
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
      .min(1, 'Số khách phải ít nhất là 1')
      .max(10, 'Số khách tối đa là 10'),
    minPrice: z.number().min(0, 'Giá không hợp lệ').optional(),
    maxPrice: z.number().min(0, 'Giá không hợp lệ').optional(),
  })
  .refine((d) => d.checkOut > d.checkIn, {
    message: 'Ngày trả phòng phải sau ngày nhận phòng',
    path: ['checkOut'],
  })
  // THÊM LOGIC: Kiểm tra Giá đến phải lớn hơn Giá từ
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

// --- BỔ SUNG: Interface cho Props ---
interface SearchFormProps {
  compact?: boolean;
}

// --- BỔ SUNG: Helper class cho input ---
const inputClass = (compact: boolean) =>
  `border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors w-full ${
    compact ? 'text-xs' : 'text-sm'
  }`;

const SearchForm = ({ compact = false }: SearchFormProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const today = getToday();
  const setSearchData = useSearchStore((state) => state.setSearchData);

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
    const params = new URLSearchParams({
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: String(data.guests),
    });

    if (data.minPrice) params.set('minPrice', String(data.minPrice));
    if (data.maxPrice) params.set('maxPrice', String(data.maxPrice));

    navigate(`/rooms?${params.toString()}`);
  };

  // --- BỔ SUNG: Render giao diện Compact ---
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
            max={10}
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

  // --- GIỮ NGUYÊN: Render giao diện đầy đủ mặc định ---
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start"
    >
      {/* Ngày nhận phòng */}
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

      {/* Ngày trả phòng */}
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

      {/* Số khách */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-800">Số khách</label>
        <input
          type="number"
          min={1}
          max={10}
          className={inputClass(false)}
          {...register('guests', { valueAsNumber: true })}
        />
        {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
      </div>

      {/* Khối Lọc Giá (Tự động format có dấu chấm) */}
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
        
        {/* Hiển thị lỗi nếu Giá đến < Giá từ */}
        {errors.maxPrice && (
          <p className="text-red-500 text-xs absolute -bottom-5 left-0 w-full whitespace-nowrap">
            {errors.maxPrice.message}
          </p>
        )}
      </div>

      {/* Nút Tìm Kiếm */}
      <div className="flex items-end h-full pt-[28px]">
        <button
          type="submit"
          className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl border-none cursor-pointer transition-colors"
        >
          Tìm phòng
        </button>
      </div>
    </form>
  );
};

export default SearchForm;