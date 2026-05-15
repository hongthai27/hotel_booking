import { env } from '../config/env.config';

const isDevelopment = env.NODE_ENV === 'development';

const formatMessage = (level: string, message: string): string => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
};

// Chỉ log ở development, bỏ qua ở production để giảm noise
const info = (message: string): void => {
  if (!isDevelopment) return;
  console.log(formatMessage('INFO', message));
};

// Log cảnh báo ở mọi môi trường
const warn = (message: string): void => {
  console.warn(formatMessage('WARN', message));
};

// Log lỗi ở mọi môi trường, kèm theo stack nếu có
const error = (message: string, err?: unknown): void => {
  console.error(formatMessage('ERROR', message));

  if (err instanceof Error && isDevelopment) {
    console.error(err.stack);
  }
};

export const logger = { info, warn, error };