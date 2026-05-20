import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { socketService, SOCKET_EVENTS } from '../../services/socketService';
import { useEffect } from 'react';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '—';
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const RefundListPage = () => {
  const queryClient = useQueryClient();

  const { data: refunds, isLoading } = useQuery({
    queryKey: ['admin', 'refunds'],
    queryFn: () =>
      api.get<{ data: any[] }>('/admin/refunds').then((r) => r.data.data),
  });

  useEffect(() => {
    const handleUpdate = () => {
      // Khi có người hủy phòng, tự động tải lại danh sách hoàn tiền
      queryClient.invalidateQueries({ queryKey: ['admin', 'refunds'] });
    };

    // Gọi đúng tên biến socketService và tên sự kiện BOOKING_UPDATED
    socketService.on(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);

    return () => {
      socketService.off(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);
    };
  }, [queryClient]);

  const confirmMutation = useMutation({
    mutationFn: (paymentId: number) => api.patch(`/admin/payments/${paymentId}/confirm-refund`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'refunds'] });
      alert('Xác nhận hoàn tiền thành công!');
    },
    onError: () => {
      alert('Có lỗi xảy ra khi xác nhận!');
    }
  });

  const handleConfirmRefund = (paymentId: number) => {
    if (window.confirm('Xác nhận bạn đã chuyển khoản hoàn tiền cho khách hàng này?')) {
      confirmMutation.mutate(paymentId);
    }
  };

  const totalRefunded = refunds?.reduce(
    (sum, r) => sum + (r.status === 'refunded' ? Number(r.amount) : 0),
    0
  ) ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-medium text-gray-800">Quản lý hoàn tiền</h2>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-1 w-fit">
        <span className="text-xs text-gray-400">Tổng tiền đã hoàn</span>
        <p className="text-2xl font-semibold text-red-500">
          {formatVND(totalRefunded)}
        </p>
        <span className="text-xs text-gray-400">
          {refunds?.filter(r => r.status === 'refunded').length ?? 0} giao dịch đã hoàn
        </span>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Mã GD', 'Khách hàng', 'Phòng', 'Số tiền hoàn', 'Ngày hoàn', 'Mã đơn', 'Trạng thái'].map((col) => (
                  <th key={col} className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="text-center py-16">
                    <span className="text-sm text-gray-400">Đang tải...</span>
                  </td>
                </tr>
              )}

              {!isLoading && (!refunds || refunds.length === 0) && (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-400 text-sm">
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
                  
                  <td className="px-4 py-3">
                    {/* Nút chỉ hiện khi trạng thái là pending_refund */}
                    {refund.status === 'pending_refund' && (
                      <div className="flex flex-col gap-2">
                        <div className="text-xs text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-200 w-fit">
                          Đang xử lý ({formatVND(Number(refund.amount))})
                        </div>
                        <button
                          onClick={() => handleConfirmRefund(refund.id)}
                          disabled={confirmMutation.isPending}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 w-fit transition-colors"
                        >
                          {confirmMutation.isPending ? 'Đang xử lý...' : 'Xác nhận đã hoàn'}
                        </button>
                      </div>
                    )}

                    {/* Huy hiệu chỉ hiện khi trạng thái là refunded */}
                    {refund.status === 'refunded' && (
                      <div className="text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200 w-fit">
                        Đã hoàn tiền ({formatVND(Number(refund.amount))})
                      </div>
                    )}
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