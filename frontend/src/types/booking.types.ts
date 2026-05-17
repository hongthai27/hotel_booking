export type BookingStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'checked_in'
  | 'checked_out'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

export type PaymentMethod = 'qr_code' | 'cash' | 'card';

export type BookingSource = 'online' | 'offline';

export type PaymentFeeType = 'booking' | 'penalty' | 'refund';

export interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  feeType: PaymentFeeType; 
  transactionRef?: string;
  paidAt?: string;
  refundedAt?: string;
  createdAt: string;
}

export interface Booking {
  id: number;
  userId: number;
  roomId: number;
  createdBy?: number;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  totalAmount: number;
  source: BookingSource;
  status: BookingStatus;
  paidAt?: string | null;
  cancelledAt?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
  room?: {
    id: number;
    roomNumber: string;
    floor?: number;
    roomType: {
      id: number;
      typeName: string;
      basePrice: number;
      images: {
        imageUrl: string;
        displayOrder: number;
      }[];
    };
  };
  payments?: Payment[];
}
export interface Review {
  id: number;
  bookingId: number;
  rating: number;
  comment?: string;
  createdAt: string;
  user: {
    fullName: string;
  };
}

export interface CreateReviewData {
  rating: number;
  comment?: string;
}

export interface RefundPreview {
  bookingId: number;
  totalAmount: number;
  isPaid: boolean;
  refundAmount: number;
  penaltyAmount: number;
  refundPolicy: string;
  daysUntilCheckIn: number;
  checkInDate: string;
  checkOutDate: string;
}