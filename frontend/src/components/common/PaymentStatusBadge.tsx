const PaymentStatusBadge = ({ paidAt }: { paidAt?: string | null }) => {
  if (!paidAt) {
    return (
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-orange-600">
        Chưa thanh toán
      </span>
    );
  }
  return (
    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-teal-50 text-teal-700">
      Đã thanh toán
    </span>
  );
};

export default PaymentStatusBadge;