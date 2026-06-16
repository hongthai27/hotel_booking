import { z } from 'zod';

const fullNameSchema = z
  .string({ required_error: 'Họ tên là bắt buộc' })
  .trim()
  .min(2, 'Họ tên phải có ít nhất 2 ký tự');

const emailSchema = z
  .string({ required_error: 'Email là bắt buộc' })
  .trim()
  .email('Email không đúng định dạng');

const phoneNumberSchema = z
  .string({ required_error: 'Số điện thoại là bắt buộc' })
  .trim()
  .regex(/^\d{10,11}$/, 'Số điện thoại phải có 10 đến 11 chữ số');

const passwordSchema = z
  .string({ required_error: 'Mật khẩu là bắt buộc' })
  .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
  .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái viết thường')
  .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa')
  .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 số')
  .regex(/[\W_]/, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt');

export const registerSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  identifier: z
    .string({ required_error: 'Email hoặc số điện thoại là bắt buộc' })
    .trim()
    .min(1, 'Vui lòng không để trống email hoặc số điện thoại'),
  password: passwordSchema,
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema, 
});

export const resetPasswordSchema = z.object({
  token: z.string({ required_error: 'Token là bắt buộc' }).min(1, 'Token không hợp lệ'),
  password: passwordSchema, 
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Họ tên tối thiểu 2 ký tự').optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10,11}$/, 'Số điện thoại không hợp lệ')
    .optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Nhập mật khẩu hiện tại'),
  newPassword: z.string().min(6, 'Mật khẩu mới tối thiểu 6 ký tự'),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;