import api from './api';

interface InitiatePaymentResponse {
  paymentId: number;
  transactionRef: string;
  qrPayload: string;
  amount: number;
  expiredAt: string;
}

interface PaymentStatusResponse {
  bookingStatus: string;
  paymentStatus: string | null;
  transactionRef: string | null;
}

interface SimulateSuccessResponse {
  message: string;
  status: string;
}

export const paymentService = {
  initiate: async (bookingId: number): Promise<InitiatePaymentResponse> => {
    const r = await api.post<{ data: InitiatePaymentResponse }>('/payments/initiate', { bookingId });
    return r.data.data;
  },

  getStatus: async (bookingId: number): Promise<PaymentStatusResponse> => {
    const r = await api.get<{ data: PaymentStatusResponse }>(`/payments/${bookingId}/status`);
    return r.data.data;
  },

  simulateSuccess: async (transactionRef: string): Promise<SimulateSuccessResponse> => {
  const r = await api.post<{ data: SimulateSuccessResponse }>('/payments/simulate-success', { transactionRef });
  return r.data.data;
},
};