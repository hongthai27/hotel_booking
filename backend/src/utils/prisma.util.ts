import { PrismaClient } from '@prisma/client';
import { env } from '../config/env.config';

// Singleton instance, khoi tao mot lan duy nhat trong suot vong doi ung dung
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  });

// Trong development, Hot Module Replacement co the tao nhieu instance moi
// Gan vao globalThis de tai su dung instance cu, tranh leak ket noi
if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}