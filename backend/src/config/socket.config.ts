import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { env } from '../config/env.config';

let io: SocketServer | null = null;

export const initSocket = (httpServer: HttpServer): SocketServer => {
  io = new SocketServer(httpServer, {
    cors: {
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;
    if (token) {
      try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: number; role: string };
        socket.data.userId = decoded.userId;
        socket.data.role = decoded.role;
      } catch {
        // token sai → coi như khách vãng lai, không có role
      }
    }
    next();
  });

  io.on('connection', (socket: Socket) => {
    socket.on('join:role', (role: string) => {
      // CHỈ join đúng phòng khớp với role đã xác thực từ token
      if (socket.data.role && socket.data.role === role) {
        socket.join(`role:${role}`);
      }
    });

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