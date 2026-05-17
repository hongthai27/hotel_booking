import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { bookingService } from '../../services/booking.service';
import { useCancelBooking } from '../../hooks/mutations/use-booking.mutation';

interface Props {
  bookingId: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirmed: () => void;
}

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const CancelBookingModal = ({ bookingId, isOpen, onClose, onConfirmed }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['refund-preview', bookingId],
    queryFn: () => bookingService.getRefundPreview(bookingId),
    enabled: isOpen && !!bookingId,
  });

  const { mutate: cancel, isPending } = useCancelBooking();

  const handleConfirm = () => {
    cancel(
      { id: bookingId },
      {
        onSuccess: () => {
        onConfirmed();
        },
        onError: (err: any) => {
          const message = err?.response?.data?.message ?? 'Có lỗi xảy ra';
          toast.error(message);
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h3 className="text-base font-medium text-gray-800">
            Xác nhận hủy đặt phòng
          </h3>
          <button
            onClick={onClose}
            disabled={isPending}
            className="text-gray-400 hover:text-gray-600 text-sm disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 flex flex-col gap-4">
          {isLoading && (
            <div className="flex items-center justify-center py-8 gap-2">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-400">Đang tải thông tin hoàn tiền...</span>
            </div>
          )}

          {isError && (
            <p className="text-sm text-red-500 text-center py-4">
              Không thể tải thông tin hoàn tiền. Vui lòng thử lại.
            </p>
          )}

          {data && (
            <>
              {/* Policy */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="text-sm text-amber-700 font-normal leading-relaxed">
                  {data.refundPolicy}
                </p>
              </div>

              {/* Chi tiết tài chính */}
              {data.isPaid && (
                <div className="flex flex-col gap-2 text-sm border border-gray-100 rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tổng tiền đặt phòng</span>
                    <span className="text-gray-800 font-medium">
                      {formatVND(data.totalAmount)}
                    </span>
                  </div>
                  {data.penaltyAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phí hủy phòng</span>
                      <span className="text-red-500 font-medium">
                        - {formatVND(data.penaltyAmount)}
                      </span>
                    </div>
                  )}
                  <hr className="border-gray-100" />
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-800">Tiền hoàn lại</span>
                    <span className={data.refundAmount > 0 ? 'text-green-600' : 'text-gray-500'}>
                      {formatVND(data.refundAmount)}
                    </span>
                  </div>
                </div>
              )}

              {!data.isPaid && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <p className="text-sm text-green-700 font-normal">
                    Đơn chưa thanh toán, không có phí hủy.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Giữ nguyên
          </button>
          <button
            onClick={handleConfirm}
            disabled={isPending || isLoading || isError || !data}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
          >
            {isPending ? 'Đang hủy...' : 'Xác nhận hủy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;