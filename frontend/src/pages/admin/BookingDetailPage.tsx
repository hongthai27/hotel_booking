import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '../../services/booking.service';
import api from '../../services/api';
import { toast } from 'sonner';
import { 
  useCancelAdminBooking 
} from '../../hooks/mutations/useAdminBookingMutation';
import { formatVND, formatDate } from '../../utils/format';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Booking } from '../../types/booking.types';
import CheckInModal from '../../components/admin/CheckInModal';
import CheckOutModal from '../../components/admin/CheckOutModal';

type BookingDetail = Booking & {
  customer?: {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
  };
  totalPrice?: number;
  paymentMethod?: string;
  paymentDeadline?: string | Date;
  totalNights?: number;
};
// ── UTILS ──
const formatDateTime = (dateStr: string | Date) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('vi-VN', { 
    hour: '2-digit', minute: '2-digit', 
    day: '2-digit', month: '2-digit', year: 'numeric' 
  });
};

const calcNights = (checkIn: string, checkOut: string): number =>
  Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
  );

const exportInvoice = (booking: BookingDetail) => {
  const doc = new jsPDF();
  const primary: [number, number, number] = [15, 76, 129];

  // Header
  doc.setFillColor(...primary);
  doc.rect(0, 0, 210, 35, 'F');

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('HOA DON DAT PHONG', 14, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Hotel Booking System', 14, 27);

  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(`#${booking.id}`, 196, 22, { align: 'right' });

  // Thong tin khach
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('THONG TIN KHACH HANG', 14, 50);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(`Ho ten:        ${booking.customer?.fullName ?? ''}`, 14, 60);
  doc.text(`So dien thoai: ${booking.customer?.phoneNumber ?? ''}`, 14, 67);
  doc.text(`Email:         ${booking.customer?.email ?? ''}`, 14, 74);

  // Thong tin dat phong
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('THONG TIN DAT PHONG', 14, 90);

  autoTable(doc, {
    startY: 95,
    head: [['Hang phong', 'So phong', 'Nhan phong', 'Tra phong', 'So dem', 'So khach']],
    body: [[
      booking.room?.roomType?.typeName ?? '',
      booking.room?.roomNumber ?? '',
      formatDate(booking.checkInDate),
      formatDate(booking.checkOutDate),
      String(calcNights(booking.checkInDate, booking.checkOutDate)),
      String(booking.guestCount),
    ]],
    headStyles: { fillColor: primary, fontSize: 9 },
    bodyStyles: { fontSize: 10 },
    margin: { left: 14 },
  });

  // Thanh toan
  const finalY = (doc as any).lastAutoTable.finalY + 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('THANH TOAN', 14, finalY);

  const paymentMethod = booking.payments?.[0]?.method;
  const paymentStatus = booking.payments?.[0]?.status;

  const methodLabel =
    paymentMethod === 'qr_code'
      ? 'Chuyen khoan QR'
      : paymentMethod === 'cash'
      ? 'Tien mat'
      : paymentMethod === 'card'
      ? 'Quet the'
      : '';

  const statusLabel = paymentStatus === 'success' ? 'Da thanh toan' : (paymentStatus ?? '');
  const amount = booking.totalPrice ?? booking.totalAmount ?? 0;

  autoTable(doc, {
    startY: finalY + 5,
    head: [['Noi dung', 'So tien']],
    body: [
      ['Tien phong', formatVND(amount)],
      ['Phuong thuc', methodLabel],
      ['Trang thai', statusLabel],
    ],
    headStyles: { fillColor: primary, fontSize: 9 },
    bodyStyles: { fontSize: 10 },
    columnStyles: { 1: { halign: 'right' } },
    margin: { left: 14 },
  });

  // Tong tien
  const payY = (doc as any).lastAutoTable.finalY + 8;
  doc.setFillColor(240, 247, 255);
  doc.rect(14, payY - 5, 182, 16, 'F');

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primary);
  doc.text('TONG CONG:', 18, payY + 5);
  doc.text(formatVND(amount), 196, payY + 5, { align: 'right' });

  // Footer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(150, 150, 150);
  const footY = doc.internal.pageSize.height - 15;
  doc.text(
    'Cam on quy khach da lua chon Hotel Booking!',
    105, footY, { align: 'center' }
  );
  doc.text(
    `Ngay xuat: ${new Date().toLocaleDateString('vi-VN')}`,
    105, footY + 6, { align: 'center' }
  );

  doc.save(`hoa-don-booking-${booking.id}.pdf`);
};

// ── CONSTANTS ──
const STATUS_MAP: Record<string, { label: string, color: string }> = {
  pending_payment: { label: 'Chờ thanh toán', color: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-green-50 text-green-700 ring-green-600/20' },
  checked_in: { label: 'Đang ở', color: 'bg-blue-50 text-blue-700 ring-blue-600/20' },
  checked_out: { label: 'Đã trả phòng', color: 'bg-purple-50 text-purple-700 ring-purple-600/20' },
  cancelled: { label: 'Đã hủy', color: 'bg-gray-50 text-gray-500 ring-gray-500/20' },
};

const SOURCE_MAP: Record<string, { label: string, color: string }> = {
  online: { label: 'Trực tuyến', color: 'bg-blue-50 text-blue-700' },
  offline: { label: 'Tại quầy', color: 'bg-orange-50 text-orange-700' },
};

const PAYMENT_MAP: Record<string, string> = {
  cash: 'Tiền mặt',
  card: 'Thẻ ngân hàng',
  qr_code: 'Chuyển khoản QR',
  transfer: 'Chuyển khoản',
};

const DetailRow = ({ label, value, isBold = false }: { label: string; value: React.ReactNode; isBold?: boolean }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-sm text-gray-500">{label}</span>
    <span className={`text-sm ${isBold ? 'font-bold text-gray-800' : 'font-medium text-gray-800'}`}>
      {value}
    </span>
  </div>
);

const BookingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [checkinTarget, setCheckinTarget] = useState<any>(null);
  const [checkoutTarget, setCheckoutTarget] = useState<any>(null);

 
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-booking-detail', id],
    queryFn: () => bookingService.getById(Number(id)),
    enabled: !!id,
  });
  const booking = data as BookingDetail;

  const { mutate: cancelBooking, isPending: isCancelling } = useCancelAdminBooking();

  const { mutate: confirmRefund, isPending: isConfirmingRefund } = useMutation({
    mutationFn: (paymentId: number) => api.patch(`/admin/payments/${paymentId}/confirm-refund`),
    onSuccess: () => {
      toast.success('Xác nhận hoàn tiền thành công');
      queryClient.invalidateQueries({ queryKey: ['admin-booking-detail', id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'bookings'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi xác nhận hoàn tiền');
    }
  });

  const refundPayment = booking?.payments?.find(
    (p: any) => p.feeType === 'refund'
  );

  const bookingPayment = booking?.payments?.find((p: any) => p.feeType === 'booking') || booking?.payments?.[0];
  const PAY_METHOD = PAYMENT_MAP[bookingPayment?.method ?? booking?.paymentMethod] ?? bookingPayment?.method ?? booking?.paymentMethod ?? '—';

  const getPaymentStatus = () => {
    if (!booking) return { label: '—', color: 'bg-gray-100 text-gray-500' };

    if (booking.status === 'cancelled') {
      const isRefunded = booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'refunded');
      if (isRefunded) return { label: 'Đã hoàn tiền', color: 'bg-gray-100 text-gray-600' };
      
      const isPendingRefund = booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'pending_refund');
      if (isPendingRefund) return { label: 'Chờ hoàn tiền', color: 'bg-orange-100 text-orange-700' };
      
      return { label: 'Đã hủy', color: 'bg-gray-100 text-gray-500' };
    }
    
    if (booking.paidAt || booking.payments?.some((p: any) => p.feeType === 'booking' && p.status === 'success')) {
      return { label: 'Đã thanh toán', color: 'bg-green-100 text-green-700' };
    }
    
    return { label: 'Chờ thanh toán', color: 'bg-yellow-100 text-yellow-700' };
  };

  const PAY_STATUS = getPaymentStatus();

  const isPaid = booking?.payments?.some((p: any) => p.status === 'success') ?? false;

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
      
      {/*HEADER*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Chi tiết đơn đặt phòng</h2>
        </div>

        {isPaid && (
          <button
            onClick={() => exportInvoice(booking)}
            className="flex items-center justify-center gap-2 text-sm font-medium text-white bg-primary px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors shadow-sm w-fit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Xuất hóa đơn PDF
          </button>
        )}
      </div>

      {/* ── STATES ── */}
      {isLoading && (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center text-red-500 text-sm">
          Đã xảy ra lỗi khi tải dữ liệu đơn đặt phòng.
        </div>
      )}

      {/* ── CONTENT ── */}
      {!isLoading && !isError && booking && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col">
          
          {/* Header Card & Actions */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 rounded-t-2xl">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Mã Đơn</span>
              <span className="text-xl font-bold text-gray-800">#{booking.id}</span>
            </div>
            
            <div className="flex flex-col sm:items-end gap-3">
              {/* Badges */}
              <div className="flex gap-2">
                <span className={`text-xs font-medium px-3 py-1.5 rounded-lg ${SOURCE_MAP[booking.source]?.color ?? 'bg-gray-100 text-gray-500'}`}>
                  {SOURCE_MAP[booking.source]?.label ?? booking.source}
                </span>
                <span className={`text-xs font-medium px-3 py-1.5 rounded-lg ring-1 ${STATUS_MAP[booking.status]?.color ?? 'bg-gray-100 text-gray-500 ring-gray-200'}`}>
                  {STATUS_MAP[booking.status]?.label ?? booking.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-1">
                {/* Hủy (Chỉ offline + Đang chờ/Đã xác nhận) */}
                {booking.source === 'offline' && ['pending_payment', 'confirmed'].includes(booking.status) && (
                  <button
                    onClick={() => {
                      if (window.confirm('Bạn có chắc chắn muốn hủy đơn đặt phòng này?')) {
                        cancelBooking({ id: booking.id });
                      }
                    }}
                    disabled={isCancelling}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
                  >
                    {isCancelling ? 'Đang hủy...' : 'Hủy đơn'}
                  </button>
                )}

                {/* Check-in (Chỉ khi đã xác nhận) */}
                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => setCheckinTarget(booking)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 shadow-sm shadow-green-600/20"
                  >
                    Check-in
                  </button>
                )}

                {/* Check-out (Chỉ khi đang ở) */}
                {booking.status === 'checked_in' && (
                  <button
                    onClick={() => setCheckoutTarget(booking)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 shadow-sm shadow-purple-600/20"
                  >
                    Check-out
                  </button>
                )}

                {/* Xác nhận hoàn tiền */}
                {refundPayment?.status === 'pending_refund' && (
                  <button
                    onClick={() => {
                      if (window.confirm('Bạn xác nhận đã hoàn tiền cho khách hàng này?')) {
                        confirmRefund(refundPayment.id);
                      }
                    }}
                    disabled={isConfirmingRefund}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 shadow-sm shadow-blue-600/20"
                  >
                    {isConfirmingRefund ? 'Đang xử lý...' : 'Xác nhận hoàn tiền'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-8">
            
            {/* Timestamps & Info */}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 px-2">
                <div>
                  <div className="text-xs text-gray-500">Ngày tạo đơn</div>
                  <div className="text-sm font-medium text-gray-800">{formatDateTime(booking.createdAt)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Hạn thanh toán</div>
                  <div className="text-sm font-medium text-gray-800">{booking.paymentDeadline ? formatDateTime(booking.paymentDeadline) : '—'}</div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border border-primary/10">
                <div>
                  <div className="text-xs text-primary/70">Check-in</div>
                  <div className="text-sm font-semibold text-primary-dark">{formatDate(booking.checkInDate)}</div>
                </div>
                <div>
                  <div className="text-xs text-primary/70">Check-out</div>
                  <div className="text-sm font-semibold text-primary-dark">{formatDate(booking.checkOutDate)}</div>
                </div>
                <div>
                  <div className="text-xs text-primary/70">Thời gian</div>
                  <div className="text-sm font-semibold text-primary-dark">{booking.totalNights ?? 1} đêm</div>
                </div>
                <div>
                  <div className="text-xs text-primary/70">Số khách</div>
                  <div className="text-sm font-semibold text-primary-dark">{booking.guestCount ?? 1} người</div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Customer & Room Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Khách hàng</h3>
                <DetailRow label="Họ và tên" value={booking.customer?.fullName ?? '—'} />
                <DetailRow label="Số điện thoại" value={booking.customer?.phoneNumber ?? '—'} />
                <DetailRow label="Email" value={<span className="truncate max-w-[150px] inline-block align-bottom" title={booking.customer?.email}>{booking.customer?.email ?? '—'}</span>} />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phòng lưu trú</h3>
                <DetailRow label="Hạng phòng" value={booking.room?.roomType?.typeName ?? '—'} />
                <DetailRow label="Số phòng" value={booking.room?.roomNumber ?? 'Chưa xếp'} />
                <DetailRow label="Tầng" value={booking.room?.floor ?? '—'} />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Payment */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Thanh toán</h3>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex flex-col gap-2">
                <DetailRow 
                  label="Phương thức" 
                  value={PAY_METHOD} 
                />
                <DetailRow 
                  label="Trạng thái" 
                  value={
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${PAY_STATUS.color}`}>
                      {PAY_STATUS.label}
                    </span>
                  } 
                />
                
                {/* HIỂN THỊ THÊM THỜI GIAN / MÃ GIAO DỊCH GỐC (NẾU CÓ) */}
                {bookingPayment?.paidAt && (
                  <DetailRow 
                    label="Thời gian thanh toán" 
                    value={formatDate(bookingPayment.paidAt)} 
                  />
                )}
                {bookingPayment?.transactionRef && (
                  <DetailRow 
                    label="Mã giao dịch" 
                    value={<span className="font-mono text-xs text-gray-600">{bookingPayment.transactionRef.slice(0, 20)}...</span>} 
                  />
                )}

                <div className="h-px bg-gray-200 w-full my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-800">Tổng cộng</span>
                  <span className="text-xl font-bold text-primary">{formatVND(booking.totalPrice)}</span>
                </div>
                
                {/* HIỂN THỊ TIỀN HOÀN LẠI NẾU CÓ */}
                {refundPayment && (
                  <>
                    <div className="h-px bg-gray-200 w-full my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${refundPayment.status === 'refunded' ? 'text-green-600' : 'text-orange-600'}`}>Số tiền hoàn lại {refundPayment.status === 'refunded' ? '(Đã hoàn)' : '(Chờ duyệt)'}</span>
                      <span className={`text-lg font-bold ${refundPayment.status === 'refunded' ? 'text-green-600' : 'text-orange-600'}`}>{formatVND(Number(refundPayment.amount))}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {checkinTarget && (
        <CheckInModal
          booking={checkinTarget}
          isOpen={!!checkinTarget}
          onClose={() => setCheckinTarget(null)}
          onSuccess={() => setCheckinTarget(null)}
        />
      )}

      {checkoutTarget && (
        <CheckOutModal
          booking={checkoutTarget}
          isOpen={!!checkoutTarget}
          onClose={() => setCheckoutTarget(null)}
          onSuccess={() => setCheckoutTarget(null)}
        />
      )}
    </div>
  );
};

export default BookingDetailPage;