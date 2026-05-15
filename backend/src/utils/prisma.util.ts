import { PrismaClient } from '@prisma/client';
import { env } from '../config/env.config';

// Singleton instance, khởi tạo một lần duy nhất trong suốt vòng đời ứng dụng
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  });

// Trong development, Hot Module Replacement có thể tạo nhiều instance mới
// Gán vào globalThis để tái sử dụng instance cũ, tránh leak kết nối
if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}