import { io, Socket } from 'socket.io-client';

export const SOCKET_EVENTS = {
  BOOKING_UPDATED: 'booking:updated',
  ROOM_UPDATED: 'room:updated',
  PAYMENT_CONFIRMED: 'payment:confirmed',
} as const;

type SocketEvent = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];

const SERVER_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';

class SocketService {
  private socket: Socket | null = null;

  connect(role: string): void {
    if (this.socket?.connected) return;

    this.socket = io(SERVER_URL, {
     
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
      this.socket?.emit('join:role', role);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('connect_error', (error: Error) => {
      console.error('Socket connection error:', error.message);
    });
  }

  joinBooking(bookingId: number): void {
    if (!this.socket) return;
    this.socket.emit('join:booking', bookingId);
  }

  on(event: SocketEvent, callback: (data: unknown) => void): void {
    if (!this.socket) return;
    this.socket.on(event, callback);
  }

  off(event: SocketEvent): void {
    if (!this.socket) return;
    this.socket.off(event);
  }

  disconnect(): void {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
  }

  get isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const socketService = new SocketService();