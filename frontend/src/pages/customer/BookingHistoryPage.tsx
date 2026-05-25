import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useMyBookings } from '../../hooks/queries/useBookingsQuery';
import { useSocketAllBookings } from '../../hooks/useSocketBooking';
import type { Booking, BookingStatus } from '../../types/booking.types';
import { formatVND, formatDate, calcNights } from '../../utils/format';
import BookingStatusBadge from '../../components/common/BookingStatusBadge';
import CancelBookingModal from '../../components/customer/CancelBookingModal';
import ReviewForm from '../../components/customer/ReviewForm';

const TABS: { label: string; value: BookingStatus | undefined }[] = [
  { label: 'Tất cả', value: undefined },
  { label: 'Chờ thanh toán', value: 'pending_payment' },
  { label: 'Đã xác nhận', value: 'confirmed' },
  { label: 'Đã trả phòng', value: 'checked_out' },
  { label: 'Đã hủy', value: 'cancelled' },
];

const CANCELLABLE: BookingStatus[] = ['pending_payment', 'confirmed'];

const PLACEHOLDER = 'https://placehold.co/400x300?text=No+Image';

const BookingCard = ({
  booking,
  setCancelTarget,
}: {
  booking: Booking;
  setCancelTarget: (id: number | null) => void;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const nights = calcNights(booking.checkInDate, booking.checkOutDate);
  const image = booking.room?.roomType?.images?.[0]?.imageUrl;

  const renderBadges = () => {
    if (booking.status === 'cancelled') {
      const refundPayment = booking.payments?.find((p) => p.feeType === 'refund');

      if (refundPayment?.status === 'refunded') {
        return (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
            Đã hoàn tiền ({formatVND(Number(refundPayment.amount))})
          </span>
        );
      }

      if (refundPayment?.status === 'pending_refund') {
        return (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
            Chờ hoàn tiền ({formatVND(Number(refundPayment.amount))})
          </span>
        );
      }
      
      return (
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
          Đã hủy
        </span>
      );
    }

    return (
      <>
        <BookingStatusBadge status={booking.status} />
        {booking.paidAt ? (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
            Đã thanh toán
          </span>
        ) : (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
            Chờ thanh toán
          </span>
        )}
      </>
    );
  };

  return (
    <div 
      onClick={() => navigate(`/bookings/${booking.id}`)}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="sm:w-40 h-36 sm:h-auto shrink-0 bg-gray-100">
        <img
          src={image ?? PLACEHOLDER}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />
      </div>

      <div className="flex-1 p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-medium text-gray-800">
              {booking.room?.roomType?.typeName ?? 'Phòng'}
            </h3>
            {booking.room?.roomNumber && (
              <p className="text-xs text-gray-400 mt-0.5">
                Phòng {booking.room.roomNumber}
              </p>
            )}
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {renderBadges()}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 font-normal">
          <span>{formatDate(booking.checkInDate)} → {formatDate(booking.checkOutDate)}</span>
          <span>{nights} đêm · {booking.guestCount} khách</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <span className="text-primary font-medium text-sm">
            {formatVND(booking.totalAmount)}
          </span>

          {CANCELLABLE.includes(booking.status) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCancelTarget(booking.id);
              }}
              className="text-red-500 text-sm font-medium hover:underline"
            >
              Hủy đặt phòng
            </button>
          )}
        </div>

        {booking.status === 'checked_out' && !booking.review && (
          <div 
            className="mt-1 pt-3 border-t border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <ReviewForm
              bookingId={booking.id}
              onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: ['bookings'] });
              }}
            />
          </div>
        )}

        {booking.status === 'checked_out' && booking.review && (
          <div className="mt-1 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < booking.review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-400">Bạn đã đánh giá</span>
            </div>
            {booking.review.comment && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                "{booking.review.comment}"
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const BookingHistoryPage = () => {
  const [activeStatus, setActiveStatus] = useState<BookingStatus | undefined>(undefined);
  const [cancelTarget, setCancelTarget] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: bookings, isLoading, isError } = useMyBookings(activeStatus);

  const bookingIds = bookings?.map((b: any) => b.id) || [];
  useSocketAllBookings(bookingIds);

  const handleCancelSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
    setCancelTarget(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-medium text-gray-800">Lịch sử đặt phòng</h2>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveStatus(tab.value)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
              activeStatus === tab.value
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-500">Đang tải...</span>
          </div>
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <p className="text-gray-800 font-medium text-sm">Đã xảy ra lỗi</p>
          <p className="text-gray-500 text-sm">Vui lòng thử lại sau.</p>
        </div>
      )}

      {!isLoading && !isError && bookings?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-gray-800 font-medium text-sm">
            Bạn chưa có đặt phòng nào
          </p>
          <Link to="/rooms" className="text-sm text-primary font-medium hover:underline">
            Tìm phòng ngay
          </Link>
        </div>
      )}

      {!isLoading && !isError && bookings && bookings.length > 0 && (
        <div className="flex flex-col gap-4">
          {bookings.map((booking: any) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              setCancelTarget={setCancelTarget}
            />
          ))}
        </div>
      )}

      {cancelTarget && (
        <CancelBookingModal
          bookingId={cancelTarget}
          isOpen={!!cancelTarget}
          onClose={() => setCancelTarget(null)}
          onConfirmed={handleCancelSuccess}
        />
      )}
    </div>
  );
};

export default BookingHistoryPage;