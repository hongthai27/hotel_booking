import { io, Socket } from 'socket.io-client';

export const SOCKET_EVENTS = {
  BOOKING_UPDATED: 'booking:updated',
  ROOM_UPDATED: 'room:updated',
  PAYMENT_CONFIRMED: 'payment:confirmed',
  BOOKING_NEW: 'booking:new',
} as const;

type SocketEvent = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];

const SERVER_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';

class SocketService {
  public socket: Socket;
  private currentRole: string | null = null;

  constructor() {
    this.socket = io(SERVER_URL, {
      transports: ['websocket'],
      autoConnect: false,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      if (this.currentRole) {
        this.socket.emit('join:role', this.currentRole);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  connect(role: string): void {
    this.currentRole = role;
    if (!this.socket.connected) {
      this.socket.connect();
    } else {
      this.socket.emit('join:role', role);
    }
  }

  joinBooking(bookingId: number): void {
    if (this.socket.connected) {
      this.socket.emit('join:booking', bookingId);
    } else {
            this.socket.once('connect', () => {
        this.socket.emit('join:booking', bookingId);
      });
    }
  }

  on(event: SocketEvent, callback: (data: unknown) => void): void {
 
    this.socket.on(event, callback);
  }

  off(event: SocketEvent, callback?: (data: unknown) => void): void {
    if (callback) {
      this.socket.off(event, callback);
    } else {
      this.socket.off(event);
    }
  }

  disconnect(): void {
    this.currentRole = null;
    this.socket.disconnect();
  }
}

export const socketService = new SocketService();