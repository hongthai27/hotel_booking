import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '—';
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const RefundListPage = () => {
  const { data: refunds, isLoading } = useQuery({
    queryKey: ['admin', 'refunds'],
    queryFn: () =>
      api.get<{ data: any[] }>('/admin/refunds').then((r) => r.data.data),
  });

  const totalRefunded = refunds?.reduce(
    (sum, r) => sum + Number(r.amount),
    0
  ) ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-medium text-gray-800">Quản lý hoàn tiền</h2>

      {/* Summary */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-1 w-fit">
        <span className="text-xs text-gray-400">Tổng tiền đã hoàn</span>
        <p className="text-2xl font-semibold text-red-500">
          {formatVND(totalRefunded)}
        </p>
        <span className="text-xs text-gray-400">
          {refunds?.length ?? 0} giao dịch
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Mã GD', 'Khách hàng', 'Phòng', 'Số tiền hoàn', 'Ngày hoàn', 'Mã đơn'].map((col) => (
                  <th key={col} className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm text-gray-400">Đang tải...</span>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && (!refunds || refunds.length === 0) && (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400 text-sm">
                    Chưa có giao dịch hoàn tiền nào
                  </td>
                </tr>
              )}

              {!isLoading && refunds?.map((refund) => (
                <tr key={refund.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 text-xs font-mono">
                    {refund.transactionRef ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-800">
                      {refund.booking?.customer?.fullName ?? '—'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {refund.booking?.customer?.phoneNumber}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {refund.booking?.room?.roomType?.typeName ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-red-500 font-medium text-sm">
                    {formatVND(Number(refund.amount))}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {refund.refundedAt ? formatDate(refund.refundedAt) : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm">
                    #{refund.bookingId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RefundListPage;