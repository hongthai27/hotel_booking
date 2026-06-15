import { prisma } from '../utils/prisma.util';

export const testDatabaseConnection = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};