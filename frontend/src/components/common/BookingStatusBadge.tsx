const BookingStatusBadge = ({ status }: { status: string }) => {
  const config = {
    pending_payment: { label: 'Chờ thanh toán', className: 'bg-yellow-50 text-yellow-700' },
    confirmed: { label: 'Đã xác nhận', className: 'bg-green-50 text-green-700' },
    checked_in: { label: 'Đang lưu trú', className: 'bg-blue-50 text-blue-700' },
    checked_out: { label: 'Đã trả phòng', className: 'bg-purple-50 text-purple-700' },
    cancelled: { label: 'Đã hủy', className: 'bg-gray-100 text-gray-500' },
  }[status] ?? { label: status, className: 'bg-gray-100 text-gray-500' };

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
};

export default BookingStatusBadge;