import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { bookingService } from '../../services/booking.service';
import { formatVND, formatDate, calcNights } from '../../utils/format';
import CancelBookingModal from '../../components/customer/CancelBookingModal';
import { useState } from 'react';

const PLACEHOLDER = 'https://placehold.co/800x400?text=No+Image';

const CustomerBookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCancel, setShowCancel] = useState(false);

  const { data: booking, isLoading, isError } = useQuery({
    queryKey: ['bookings', +id!],
    queryFn: () => bookingService.getById(+id!),
    enabled: !!id,
  });

  if (isLoading) return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (isError || !booking) return (
    <div className="text-center py-20">
      <p className="text-gray-400 text-sm mb-4">Không tìm thấy giao dịch</p>
      <button onClick={() => navigate('/my-bookings')} className="text-primary text-sm hover:underline">
        ← Quay lại lịch sử
      </button>
    </div>
  );

  const nights = calcNights(booking.checkInDate, booking.checkOutDate);

  const STATUS = (({
    pending_payment: { label: 'Chờ thanh toán', cls: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    confirmed: { label: 'Đã xác nhận', cls: 'bg-green-50 text-green-700 border-green-200' },
    checked_in: { label: 'Đang lưu trú', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
    checked_out: { label: 'Đã trả phòng', cls: 'bg-purple-50 text-purple-700 border-purple-200' },
    cancelled: { label: 'Đã hủy', cls: 'bg-gray-100 text-gray-500 border-gray-200' },
  } as Record<string, { label: string; cls: string }>)[booking.status]) ?? { label: booking.status, cls: 'bg-gray-100 text-gray-500 border-gray-200' };

  // Lấy đúng giao dịch thanh toán gốc (tránh nhầm với lệnh hoàn tiền)
  const bookingPayment = booking.payments?.find((p: any) => p.feeType === 'booking') || booking.payments?.[0];

  const PAY_METHOD = (({
    qr_code: 'Chuyển khoản QR',
    cash: 'Tiền mặt',
    card: 'Quẹt thẻ',
  } as Record<string, string>)[bookingPayment?.method ?? '']) ?? '—';

  // HÀM MỚI: Xử lý trạng thái thanh toán chuẩn xác giống hệt trang Lịch sử
  const getPaymentStatus = () => {
    if (booking.status === 'cancelled') {
      const isRefunded = booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'refunded');
      if (isRefunded) return { label: 'Đã hoàn tiền', cls: 'text-gray-600' };
      
      const isPendingRefund = booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'pending');
      if (isPendingRefund) return { label: 'Chờ hoàn tiền', cls: 'text-orange-600' };
      
      return { label: 'Đã hủy', cls: 'text-gray-500' };
    }
    
    if (booking.paidAt || booking.payments?.some((p: any) => p.feeType === 'booking' && p.status === 'success')) {
      return { label: 'Đã thanh toán', cls: 'text-green-600' };
    }
    
    return { label: 'Chờ thanh toán', cls: 'text-yellow-600' };
  };

  const PAY_STATUS = getPaymentStatus();
  const canCancel = ['confirmed', 'pending_payment'].includes(booking.status);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate('/my-bookings')}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          ← Lịch sử đặt phòng
        </button>
        <span className="text-gray-300 text-sm">/</span>
        <span className="text-sm text-gray-500">Chi tiết đơn #{booking.id}</span>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-medium text-gray-800">
            Đơn đặt phòng #{booking.id}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Đặt ngày {formatDate(booking.createdAt)}
          </p>
        </div>
        <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${STATUS.cls}`}>
          {STATUS.label}
        </span>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4">
        <img
          src={booking.room?.roomType?.images?.[0]?.imageUrl ?? PLACEHOLDER}
          alt={booking.room?.roomType?.typeName}
          className="w-full h-48 object-cover"
          onError={(e) => { e.currentTarget.src = PLACEHOLDER }}
        />

        <div className="p-5">
          <h2 className="text-base font-medium text-gray-800 mb-1">
            {booking.room?.roomType?.typeName}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Phòng {booking.room?.roomNumber}
            {booking.room?.floor ? ` · Tầng ${booking.room.floor}` : ''}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Nhận phòng</p>
              <p className="text-sm font-medium text-gray-800">
                {formatDate(booking.checkInDate)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Trả phòng</p>
              <p className="text-sm font-medium text-gray-800">
                {formatDate(booking.checkOutDate)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Số đêm</p>
              <p className="text-sm font-medium text-gray-800">{nights} đêm</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Số khách</p>
              <p className="text-sm font-medium text-gray-800">
                {booking.guestCount} khách
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
        <h2 className="text-sm font-medium text-gray-800 mb-4">Thông tin thanh toán</h2>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Phương thức</span>
            <span className="text-gray-800">{PAY_METHOD}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Trạng thái</span>
            <span className={`font-medium ${PAY_STATUS.cls}`}>{PAY_STATUS.label}</span>
          </div>
          
          {/* Lấy đúng giao dịch thanh toán gốc để hiển thị */}
          {bookingPayment?.paidAt && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Thời gian thanh toán</span>
              <span className="text-gray-800">{formatDate(bookingPayment.paidAt)}</span>
            </div>
          )}
          {bookingPayment?.transactionRef && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Mã giao dịch</span>
              <span className="text-gray-600 font-mono text-xs">
                {bookingPayment.transactionRef.slice(0, 20)}...
              </span>
            </div>
          )}

          <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Tổng tiền</span>
            <span className="text-xl font-medium text-primary">
              {formatVND(booking.totalAmount)}
            </span>
          </div>

          {/* Banner báo đang xử lý hoàn tiền */}
          {booking.status === 'cancelled' && booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'pending') && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-700 mt-2">
              <span>Đang xử lý hoàn tiền (dự kiến 3–5 ngày làm việc)</span>
            </div>
          )}

          {/* Banner báo đã hoàn tiền thành công */}
          {booking.status === 'cancelled' && booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'refunded') && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-700 mt-2">
              <span>Đã hoàn tiền thành công</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Nguồn đặt phòng</span>
          <span className={`font-medium px-2.5 py-1 rounded-full text-xs border ${
            booking.source === 'online'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'bg-orange-50 text-orange-700 border-orange-200'
          }`}>
            {booking.source === 'online' ? 'Trực tuyến' : 'Tại quầy'}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        {booking.status === 'pending_payment' && (
          <button
            onClick={() => navigate(`/payment/${booking.id}`)}
            className="flex-1 bg-primary text-white py-3 rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Tiến hành thanh toán
          </button>
        )}

        {canCancel && (
          <button
            onClick={() => setShowCancel(true)}
            className="flex-1 border border-red-200 text-red-500 py-3 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors"
          >
            Hủy đặt phòng
          </button>
        )}

        {!canCancel && booking.status !== 'pending_payment' && (
          <button
            onClick={() => navigate('/my-bookings')}
            className="w-full border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Quay lại lịch sử
          </button>
        )}
      </div>

      <CancelBookingModal
        bookingId={booking.id}
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
        onConfirmed={() => {
          setShowCancel(false);
          navigate('/my-bookings');
        }}
      />
    </div>
  );
};

export default CustomerBookingDetailPage;