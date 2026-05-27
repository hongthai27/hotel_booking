import { z } from 'zod';

export const roomTypeSchema = z.object({
  typeName: z
    .string({ required_error: 'Tên loại phòng là bắt buộc' })
    .min(1, 'Tên loại phòng không được để trống'),
  description: z.string().optional(),
  maxCapacity: z.coerce
    .number({ required_error: 'Sức chứa là bắt buộc' })
    .int()
    .positive('Sức chứa phải lớn hơn 0'),
  basePrice: z.coerce
    .number({ required_error: 'Giá cơ bản là bắt buộc' })
    .nonnegative('Giá cơ bản không được âm'),
  amenityIds: z
    .any()
    .transform((val) => {
      if (Array.isArray(val)) return val.map(Number);
      if (typeof val === 'string') {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) return parsed.map(Number);
          return [Number(parsed)];
        } catch {
          return [Number(val)];
        }
      }
      return [];
    }),
  version: z.coerce.number().int().nonnegative().optional(),
  deleteImageIds: z.union([z.string(), z.array(z.coerce.number().int().positive())]).optional(),
});

export const roomSchema = z.object({
  roomNumber: z
    .string({ required_error: 'Số phòng là bắt buộc' })
    .min(1, 'Số phòng không được để trống'),
  // Thêm z.coerce vào roomTypeId và floor
  roomTypeId: z.coerce
    .number({ required_error: 'Loại phòng là bắt buộc' })
    .int()
    .positive('roomTypeId không hợp lệ'),
  floor: z.coerce
    .number().int().positive('Tầng phải lớn hơn 0')
    .optional(),
  status: z.enum(['available', 'occupied', 'maintenance', 'cleaning', 'out_of_order'], {
    required_error: 'Trạng thái phòng là bắt buộc',
    invalid_type_error: 'Trạng thái phòng không hợp lệ',
  }),
});

export const amenitySchema = z.object({
  amenityName: z
    .string({ required_error: 'Tên tiện ích là bắt buộc' })
    .min(1, 'Tên tiện ích không được để trống'),
  description: z.string().optional(),
});

// Thêm schema mới cho PATCH /admin/rooms/:id/status
export const updateRoomStatusSchema = z.object({
  status: z.enum(['available', 'occupied', 'maintenance', 'cleaning', 'out_of_order'], {
    required_error: 'Trạng thái phòng là bắt buộc',
    invalid_type_error: 'Trạng thái phòng không hợp lệ',
  }),
  version: z.number({ required_error: 'Version là bắt buộc' }).int().nonnegative('Version không hợp lệ'),
});

export const searchAvailableSchema = z.object({
  checkIn: z.string().refine((d) => !isNaN(Date.parse(d)), 'checkIn không hợp lệ'),
  checkOut: z.string().refine((d) => !isNaN(Date.parse(d)), 'checkOut không hợp lệ'),
  guests: z.coerce.number().int().min(1).max(10, 'Số lượng khách quá lớn'),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
})
  .refine(
    (d) => new Date(d.checkIn) >= new Date(new Date().toDateString()),
    'checkIn phải từ hôm nay trở đi'
  )
  .refine(
    (d) => new Date(d.checkOut) > new Date(d.checkIn),
    'checkOut phải sau checkIn'
  )
  .refine(
    (d) => {
      const diffMs = new Date(d.checkOut).getTime() - new Date(d.checkIn).getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      return diffDays <= 30;
    },
    'Thời gian đặt phòng tối đa là 30 ngày'
  );

export type RoomTypeDto = z.infer<typeof roomTypeSchema>;
export type RoomDto = z.infer<typeof roomSchema>;
export type AmenityDto = z.infer<typeof amenitySchema>;
export type UpdateRoomStatusDto = z.infer<typeof updateRoomStatusSchema>;
export type SearchAvailableDto = z.infer<typeof searchAvailableSchema>;