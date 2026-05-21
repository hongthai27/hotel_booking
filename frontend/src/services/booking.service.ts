import api from './api';
import type { Booking, BookingStatus, Review, RefundPreview } from '../types/booking.types';

interface CreateBookingData {
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  specialRequests?: string;
}

interface CancelResponse {
  refundAmount: number;
}

export const bookingService = {
  create: async (data: CreateBookingData): Promise<Booking> => {
    const r = await api.post<{ data: Booking }>('/bookings', data);
    return r.data.data;
  },

  getMyBookings: async (status?: BookingStatus): Promise<Booking[]> => {
    const r = await api.get<{ data: Booking[] }>('/bookings/my', {
      params: status ? { status } : undefined,
    });
    return r.data.data;
  },

  getById: async (id: number): Promise<Booking> => {
    const r = await api.get<{ data: Booking }>(`/bookings/${id}`);
    return r.data.data;
  },

  cancel: async (id: number, reason?: string): Promise<CancelResponse> => {
    const r = await api.patch<{ data: CancelResponse }>(`/bookings/${id}/cancel`, { reason });
    return r.data.data;
  },

  getRefundPreview: (id: number): Promise<RefundPreview> =>
    api
      .get<{ data: RefundPreview }>(`/bookings/${id}/refund-preview`)
      .then((r) => r.data.data),

  createReview: (
    bookingId: number,
    data: { rating: number; comment?: string }
  ) =>
    api
      .post(`/bookings/${bookingId}/review`, data)
      .then((r) => r.data),

  getReviewsByRoomType: (roomTypeId: number) =>
    api
      .get<{ data: Review[] }>(`/hotels/${roomTypeId}/reviews`)
      .then((r) => r.data.data),
      
};