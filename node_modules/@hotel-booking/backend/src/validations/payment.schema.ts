import { z } from 'zod';

export const initiatePaymentSchema = z.object({
  bookingId: z
    .number({ required_error: 'Mã đặt phòng là bắt buộc' })
    .int('Mã đặt phòng phải là số nguyên')
    .min(1, 'Mã đặt phòng không hợp lệ'),
});

export const simulatePaymentSchema = z.object({
  transactionRef: z
    .string({ required_error: 'Mã giao dịch là bắt buộc' })
    .min(1, 'Mã giao dịch không được để trống'),
});

export type InitiatePaymentDTO = z.infer<typeof initiatePaymentSchema>;
export type SimulatePaymentDTO = z.infer<typeof simulatePaymentSchema>;