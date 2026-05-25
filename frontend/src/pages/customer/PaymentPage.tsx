import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useInitiatePayment, useSimulatePayment } from '../../hooks/mutations/usePaymentMutation';
import { usePaymentStatus } from '../../hooks/queries/useBookingsQuery';
import { useSocketBooking } from '../../hooks/useSocketBooking';
import { formatVND } from '../../utils/format';

interface PaymentData {
  paymentId: number;
  transactionRef: string;
  qrPayload: string;
  amount: number;
  expiredAt: string;
}

const formatCountdown = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const PaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isSuccessHandled = useRef(false);

  useSocketBooking(Number(id));

  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { mutate: initiate } = useInitiatePayment();
  const { mutate: simulate, isPending: isSimulating } = useSimulatePayment();

  const { data: statusData } = usePaymentStatus(
    Number(id),
    !!paymentData
  );

  useEffect(() => {
    initiate(Number(id), {
      onSuccess: (data) => {
        setPaymentData(data);
        const seconds = Math.ceil(
          (new Date(data.expiredAt).getTime() - Date.now()) / 1000
        );
        setTimeLeft(Math.max(0, seconds));
      },
      onError: () => {
        toast.error('Không thể khởi tạo thanh toán');
        navigate('/rooms');
      },
    });
  }, [id, initiate, navigate]);

  useEffect(() => {
    if (!paymentData) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          toast.error('Phiên thanh toán đã hết hạn');
          navigate('/rooms');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [paymentData, navigate]);

  useEffect(() => {
    if (!statusData) return;

    if (statusData.bookingStatus === 'confirmed' && !isSuccessHandled.current) {
      isSuccessHandled.current = true;
      queryClient.invalidateQueries();
      toast.success('Thanh toán thành công!');
      navigate('/my-bookings');
    }
  }, [statusData, navigate, queryClient]);

  const handleSimulate = () => {
    if (!paymentData) return;
    simulate(paymentData.transactionRef, {
      onSuccess: () => {
        if (!isSuccessHandled.current) {
          isSuccessHandled.current = true;
          queryClient.invalidateQueries();
          toast.success('Thanh toán thành công!');
          navigate('/my-bookings');
        }
      },
      onError: () => toast.error('Giả lập thất bại'),
    });
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Đang khởi tạo thanh toán...</span>
        </div>
      </div>
    );
  }

  const isExpiringSoon = timeLeft < 60;
  const isFailed = statusData?.paymentStatus === 'failed';

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-6 py-8">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col items-center gap-5">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1">
            Thanh toán đơn đặt phòng
          </h2>
          <p className="text-sm text-gray-500 font-normal">
            Quét mã QR để hoàn tất thanh toán
          </p>
        </div>

        <div className="text-center">
          <span className="text-xs text-gray-400">Số tiền cần thanh toán</span>
          <p className="text-2xl font-semibold text-primary">
            {formatVND(paymentData.amount)}
          </p>
        </div>

        {isFailed ? (
          <div className="flex flex-col items-center gap-2 py-8">
            <p className="text-red-500 font-medium text-sm">Thanh toán thất bại</p>
            <p className="text-gray-500 text-sm">Vui lòng thử lại hoặc chọn phòng khác</p>
          </div>
        ) : (
          <div className="p-3 border border-gray-100 rounded-2xl">
            <QRCodeSVG
              value={paymentData.qrPayload}
              size={200}
              level="M"
            />
          </div>
        )}

        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-gray-400">Thời gian còn lại</span>
          <span className={`text-2xl font-semibold tabular-nums ${
            isExpiringSoon ? 'text-red-500' : 'text-gray-800'
          }`}>
            {formatCountdown(timeLeft)}
          </span>
          {isExpiringSoon && (
            <span className="text-xs text-red-400">Sắp hết hạn</span>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          Mã giao dịch: {paymentData.transactionRef}
        </p>

        {import.meta.env.DEV && (
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="w-full py-2.5 border border-primary text-primary text-sm font-medium rounded-xl hover:bg-primary hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isSimulating ? 'Đang xử lý...' : 'Thanh toán thành công'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;