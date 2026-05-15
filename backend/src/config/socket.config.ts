import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import { env } from '../config/env.config';

let io: SocketServer | null = null;

export const initSocket = (httpServer: HttpServer): SocketServer => {
  io = new SocketServer(httpServer, {
    cors: {
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
    },
  });

  io.on('connection', (socket: Socket) => {
    // Tham gia room theo role (admin, receptionist, customer)
    socket.on('join:role', (role: string) => {
      socket.join(`role:${role}`);
    });

    // Tham gia room theo bookingId để nhận cập nhật trạng thái đơn cụ thể
    socket.on('join:booking', (bookingId: number) => {
      socket.join(`booking:${bookingId}`);
    });

    socket.on('disconnect', () => {

    });
  });

  return io;
};

export const getIO = (): SocketServer => {
  if (!io) {
    throw new Error('Socket.IO chưa được khởi tạo. Gọi initSocket trước.');
  }
  return io;
};