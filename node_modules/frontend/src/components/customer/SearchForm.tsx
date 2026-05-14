import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react'; // THÊM DÒNG NÀY
import { useSearchStore } from '../../stores/searchStore'; // THÊM DÒNG NÀY

const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
      .min(1, 'Số khách phải ít nhất là 1')
      .max(10, 'Số khách tối đa là 10'),
  }).refine((d) => d.checkOut > d.checkIn, {
    message: 'Ngày trả phòng phải sau ngày nhận phòng',
    path: ['checkOut'],
  });

type SearchFormValues = z.infer<ReturnType<typeof buildSearchSchema>>;

const SearchForm = () => {
  const navigate = useNavigate();
  const today = getToday();
  const setSearchData = useSearchStore((state) => state.setSearchData); // LẤY HÀM LƯU TỪ STORE

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(buildSearchSchema(today)),
    defaultValues: {
      checkIn: '',
      checkOut: '',
      guests: 1,
    },
  });

  const checkIn = watch('checkIn');
  const watchedValues = watch(); // THEO DÕI TOÀN BỘ FORM

  // ĐOẠN CODE MỚI: Tự động lưu vào Store mỗi khi Form thay đổi
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
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-800">
          Ngày nhận phòng
        </label>
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
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              wrapperClassName="w-full"
            />
          )}
        />
        {errors.checkIn && (
          <p className="text-red-500 text-xs">{errors.checkIn.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-800">
          Ngày trả phòng
        </label>
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
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              wrapperClassName="w-full"
            />
          )}
        />
        {errors.checkOut && (
          <p className="text-red-500 text-xs">{errors.checkOut.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-800">
          Số khách
        </label>
        <input
          type="number"
          min={1}
          max={10}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          {...register('guests', { valueAsNumber: true })}
        />
        {errors.guests && (
          <p className="text-red-500 text-xs">{errors.guests.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl border-none cursor-pointer transition-colors"
      >
        Tìm phòng
      </button>
    </form>
  );
};

export default SearchForm;