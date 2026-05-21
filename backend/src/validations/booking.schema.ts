import { z } from 'zod';

const MAX_STAY_DAYS = 30;
const MAX_GUESTS = 10;

const checkInDateSchema = z
  .string({ required_error: 'Ngày nhận phòng là bắt buộc' })
  .refine((d) => !isNaN(Date.parse(d)), 'Ngày nhận phòng không hợp lệ')
  .refine(
    (d) => new Date(d) >= new Date(new Date().toDateString()),
    'Ngày nhận phòng phải từ hôm nay trở đi'
  );

const checkOutDateSchema = z
  .string({ required_error: 'Ngày trả phòng là bắt buộc' })
  .refine((d) => !isNaN(Date.parse(d)), 'Ngày trả phòng không hợp lệ');

const guestCountSchema = z
  .number({ required_error: 'Số lượng khách là bắt buộc' })
  .int('Số lượng khách phải là số nguyên')
  .min(1, 'Số lượng khách phải ít nhất là 1')
  .max(MAX_GUESTS, `Số lượng khách tối đa là ${MAX_GUESTS} người`);

const roomIdSchema = z
  .number({ required_error: 'Mã phòng là bắt buộc' })
  .int('Mã phòng phải là số nguyên')
  .min(1, 'Mã phòng không hợp lệ');

const checkDateRange = (d: { checkInDate: string; checkOutDate: string }) => {
  const diffMs = new Date(d.checkOutDate).getTime() - new Date(d.checkInDate).getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= MAX_STAY_DAYS;
};

export const createBookingSchema = z
  .object({
    roomId: z.coerce.number().int().min(1),
    checkInDate: z.string().min(1, 'Vui lòng chọn ngày nhận phòng'),
    checkOutDate: z.string().min(1, 'Vui lòng chọn ngày trả phòng'),
    guestCount: z.coerce.number().int().min(1).max(MAX_GUESTS),
    specialRequests: z.string().max(500).optional(),
  })
  .refine(
    (d) => new Date(d.checkOutDate) > new Date(d.checkInDate),
    {
      message: 'Ngày trả phòng phải sau ngày nhận phòng',
      path: ['checkOutDate'],
    }
  )
  .refine(checkDateRange, {
    message: `Thời gian lưu trú tối đa là ${MAX_STAY_DAYS} ngày`,
    path: ['checkOutDate'],
  });

export const createOfflineBookingSchema = z
  .object({
    userId: z
      .number()
      .int('Mã người dùng phải là số nguyên')
      .min(1, 'Mã người dùng không hợp lệ')
      .optional()
      .nullable(),
    newCustomer: z
      .object({
        fullName: z.string({ required_error: 'Tên khách hàng là bắt buộc' }),
        phoneNumber: z.string({ required_error: 'Số điện thoại là bắt buộc' }),
      })
      .optional(),
    roomId: roomIdSchema,
    checkInDate: checkInDateSchema,
    checkOutDate: checkOutDateSchema,
    guestCount: guestCountSchema,
    paymentMethod: z.enum(['cash', 'card', 'qr_code'], {
      required_error: 'Phương thức thanh toán là bắt buộc',
      invalid_type_error: 'Phương thức thanh toán không hợp lệ',
    }),
  })
  .refine(
    (d) => new Date(d.checkOutDate) > new Date(d.checkInDate),
    {
      message: 'Ngày trả phòng phải sau ngày nhận phòng',
      path: ['checkOutDate'],
    }
  )
  .refine(checkDateRange, {
    message: `Thời gian lưu trú tối đa là ${MAX_STAY_DAYS} ngày`,
    path: ['checkOutDate'],
  });
  
export const getAllBookingsQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive('Trang phải là số nguyên dương')
    .optional(),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100, 'Không thể lấy quá 100 đơn mỗi lần')
    .optional(),
  status: z.enum(
    ['pending_payment', 'confirmed', 'checked_in', 'checked_out', 'cancelled'],
    { invalid_type_error: 'Trạng thái không hợp lệ' }
  ).optional(),
  source: z.enum(['online', 'offline']).optional(),
  checkInDate: z
    .string()
    .refine((d) => !isNaN(Date.parse(d)), 'Ngày không hợp lệ')
    .optional(),
  search: z.string().optional(),
  keyword: z.string().optional(),
});

export const updateOfflineBookingSchema = z.object({
  userId: z.coerce.number().int().min(1).optional(),
  roomId: z.coerce.number().int().min(1).optional(),
  checkInDate: z
    .string()
    .refine((d) => !isNaN(Date.parse(d)), 'Ngày nhận phòng không hợp lệ')
    .optional(),
  checkOutDate: z
    .string()
    .refine((d) => !isNaN(Date.parse(d)), 'Ngày trả phòng không hợp lệ')
    .optional(),
  guestCount: z.coerce.number().int().min(1).max(MAX_GUESTS).optional(),
  paymentMethod: z.enum(['cash', 'card']).optional(),
});

export type UpdateOfflineBookingDto = z.infer<typeof updateOfflineBookingSchema>;
export type CreateBookingDto = z.infer<typeof createBookingSchema>;
export type CreateOfflineBookingDto = z.infer<typeof createOfflineBookingSchema>;
export type GetAllBookingsQueryDto = z.infer<typeof getAllBookingsQuerySchema>;

export const createReviewSchema = z.object({
  rating: z
    .number({ required_error: 'Đánh giá là bắt buộc' })
    .int('Đánh giá phải là số nguyên')
    .min(1, 'Đánh giá thấp nhất là 1')
    .max(5, 'Đánh giá cao nhất là 5'),
  comment: z
    .string()
    .max(500, 'Bình luận không được vượt quá 500 ký tự')
    .optional(),
});

export type CreateReviewDto = z.infer<typeof createReviewSchema>;