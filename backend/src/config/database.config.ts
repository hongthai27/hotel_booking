import { prisma } from '../utils/prisma.util';

// Kiểm tra kết nối database khi server khởi động
// Nếu thất bại, ném lỗi để server.ts bắt và xử lý
export const testDatabaseConnection = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  } finally {
    // Đóng kết nối sau khi kiểm tra, Prisma sẽ tự quản lý pool khi có query
    await prisma.$disconnect();
  }
};