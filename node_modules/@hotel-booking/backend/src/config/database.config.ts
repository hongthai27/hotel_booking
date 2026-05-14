import { prisma } from '../utils/prisma.util';

// Kiem tra ket noi database khi server khoi dong
// Neu that bai, nem loi de server.ts bat va xu ly
export const testDatabaseConnection = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  } finally {
    // Dong ket noi sau khi kiem tra, Prisma se tu quan ly pool khi co query
    await prisma.$disconnect();
  }
};