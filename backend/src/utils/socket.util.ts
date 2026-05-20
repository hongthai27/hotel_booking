import { getIO } from '../config/socket.config';

export const SOCKET_EVENTS = {
  BOOKING_UPDATED: 'booking:updated',
  ROOM_UPDATED: 'room:updated',
  PAYMENT_CONFIRMED: 'payment:confirmed',
  BOOKING_NEW: 'booking:new',
} as const;

export const emitBookingUpdate = (bookingId: number, data: unknown): void => {
  try {
    const io = getIO();
    io.to(`booking:${bookingId}`).emit(SOCKET_EVENTS.BOOKING_UPDATED, data);
    io.to('role:receptionist').emit(SOCKET_EVENTS.BOOKING_UPDATED, data);
    io.to('role:admin').emit(SOCKET_EVENTS.BOOKING_UPDATED, data);
  } catch (error) {
    console.error('Lỗi emit booking update:', error);
  }
};

export const emitPaymentConfirmed = (bookingId: number): void => {
  try {
    const io = getIO();
    io.to(`booking:${bookingId}`).emit(SOCKET_EVENTS.PAYMENT_CONFIRMED);
  } catch (error) {
    console.error('Lỗi emit payment confirmed:', error);
  }
};

export const emitNewBooking = (booking: {
  bookingId: number;
  roomTypeName: string;
  guestName: string;
  checkInDate: Date;
}): void => {
  try {
    const io = getIO();
    io.to('role:receptionist').emit(SOCKET_EVENTS.BOOKING_NEW, booking);
    io.to('role:admin').emit(SOCKET_EVENTS.BOOKING_NEW, booking);
  } catch (err) {
    console.error('[Socket] emitNewBooking error:', err);
  }
};