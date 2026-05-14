import dotenv from 'dotenv';
import { z } from 'zod';

// Nạp biến môi trường từ file .env vào process.env trước khi validate
dotenv.config();

// Schema validate toàn bộ biến môi trường
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  PORT: z
    .string()
    .regex(/^\d+$/, 'PORT phải là số nguyên dương')
    .transform(Number)
    .default('3000'),

  // Database
  DATABASE_URL: z
    .string({ required_error: 'DATABASE_URL là bắt buộc' })
    .min(1, 'DATABASE_URL không được để trống'),

  // JWT
  JWT_SECRET: z
    .string({ required_error: 'JWT_SECRET là bắt buộc' })
    .min(32, 'JWT_SECRET phải có ít nhất 32 ký tự'),

  JWT_EXPIRES_IN: z
    .string()
    .default('7d'),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z
    .string({ required_error: 'CLOUDINARY_CLOUD_NAME là bắt buộc' })
    .min(1, 'CLOUDINARY_CLOUD_NAME không được để trống'),

  CLOUDINARY_API_KEY: z
    .string({ required_error: 'CLOUDINARY_API_KEY là bắt buộc' })
    .min(1, 'CLOUDINARY_API_KEY không được để trống'),

  CLOUDINARY_API_SECRET: z
    .string({ required_error: 'CLOUDINARY_API_SECRET là bắt buộc' })
    .min(1, 'CLOUDINARY_API_SECRET không được để trống'),

  // Email
  EMAIL_HOST: z
    .string({ required_error: 'EMAIL_HOST là bắt buộc' })
    .min(1, 'EMAIL_HOST không được để trống'),

  EMAIL_PORT: z
    .string()
    .regex(/^\d+$/, 'EMAIL_PORT phải là số nguyên dương')
    .transform(Number)
    .default('587'),

  EMAIL_USER: z
    .string({ required_error: 'EMAIL_USER là bắt buộc' })
    .email('EMAIL_USER phải là địa chỉ email hợp lệ'),

  EMAIL_PASS: z
    .string({ required_error: 'EMAIL_PASS là bắt buộc' })
    .min(1, 'EMAIL_PASS không được để trống'),

  // Webhook
  WEBHOOK_SECRET: z
    .string({ required_error: 'WEBHOOK_SECRET là bắt buộc' })
    .min(16, 'WEBHOOK_SECRET phải có ít nhất 16 ký tự'),
});

const parsed = envSchema.safeParse(process.env);

// Nếu validate thất bại, log rõ từng lỗi và dừng server ngay lập tức
if (!parsed.success) {
  console.error('Environment validation failed:');

  parsed.error.errors.forEach((err) => {
    console.error(`  [${err.path.join('.')}]: ${err.message}`);
  });

  console.error('Check your .env file and try again.');

  process.exit(1);
}

export const env = parsed.data;

// Export type để dùng ở nơi khác nếu cần
export type Env = typeof env;