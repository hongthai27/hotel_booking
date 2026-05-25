import { z } from 'zod';

export const createPromotionSchema = z.object({
  code: z.string({ required_error: 'Mã ưu đãi là bắt buộc' })
    .min(1, 'Mã ưu đãi không được để trống'),
  type: z.enum(['percentage', 'fixed', 'free_night'], { 
    required_error: 'Loại ưu đãi là bắt buộc',
    invalid_type_error: 'Loại ưu đãi không hợp lệ'
  }),
  value: z.number({ required_error: 'Giá trị ưu đãi là bắt buộc' })
    .positive('Giá trị ưu đãi phải lớn hơn 0'),
  minNights: z.number().int().positive('Số đêm tối thiểu phải lớn hơn 0').optional().nullable(),
  usageLimit: z.number().int().positive('Giới hạn lượt sử dụng phải lớn hơn 0').optional().nullable(),
  startDate: z.string({ required_error: 'Ngày bắt đầu là bắt buộc' })
    .refine((d) => !isNaN(Date.parse(d)), 'Ngày bắt đầu không hợp lệ'),
  endDate: z.string({ required_error: 'Ngày kết thúc là bắt buộc' })
    .refine((d) => !isNaN(Date.parse(d)), 'Ngày kết thúc không hợp lệ'),
  isActive: z.boolean().optional(),
}).refine(
  (d) => new Date(d.endDate) >= new Date(d.startDate),
  { message: 'Ngày kết thúc phải từ ngày bắt đầu trở đi', path: ['endDate'] }
);

export const updatePromotionSchema = z.object({
  code: z.string().min(1, 'Mã ưu đãi không được để trống').optional(),
  type: z.enum(['percentage', 'fixed', 'free_night']).optional(),
  value: z.number().positive('Giá trị ưu đãi phải lớn hơn 0').optional(),
  minNights: z.number().int().positive('Số đêm tối thiểu phải lớn hơn 0').optional().nullable(),
  usageLimit: z.number().int().positive('Giới hạn lượt sử dụng phải lớn hơn 0').optional().nullable(),
  startDate: z.string().refine((d) => !isNaN(Date.parse(d)), 'Ngày bắt đầu không hợp lệ').optional(),
  endDate: z.string().refine((d) => !isNaN(Date.parse(d)), 'Ngày kết thúc không hợp lệ').optional(),
  isActive: z.boolean().optional(),
}).refine(
  (d) => {
    if (d.startDate && d.endDate) {
      return new Date(d.endDate) >= new Date(d.startDate);
    }
    return true;
  },
  { message: 'Ngày kết thúc phải từ ngày bắt đầu trở đi', path: ['endDate'] }
);