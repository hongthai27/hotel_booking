export type BookingStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'checked_in'
  | 'checked_out'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'success' | 'failed' | 'pending_refund' | 'refunded';

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

export interface BookingRoomTypeLine {
  id: number;
  roomTypeId: number;
  quantity: number;
  priceAtBooking: number;
  roomType: {
    id: number;
    typeName: string;
    basePrice: number;
    images?: { imageUrl: string; displayOrder: number }[];
  };
}

export interface AssignedRoom {
  id: number;
  roomId: number;
  checkinAt: string;
  checkoutAt?: string | null;
  idNumber?: string | null;
  checkinNote?: string | null;
  extraCharges?: { label: string; amount: number }[] | null;
  room: {
    id: number;
    roomNumber: string;
    floor?: number;
    roomType: {
      id: number;
      typeName: string;
      basePrice: number;
    };
  };
}

export interface Booking {
  id: number;
  userId: number;
  createdBy?: number;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  totalAmount: number;
  source: BookingSource;
  status: BookingStatus;
  paidAt?: string | null;
  specialRequests?: string | null; 
  cancelledAt?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
  review?: Review | null;
  roomTypeLines: BookingRoomTypeLine[];
  assignedRooms: AssignedRoom[];
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
