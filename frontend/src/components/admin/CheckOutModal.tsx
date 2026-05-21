import { useState } from 'react';
import { useCheckOut } from '../../hooks/mutations/useAdminBookingMutation';

interface ExtraCharge {
  label: string;
  amount: number;
}

interface Props {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const calcNights = (checkIn: string, checkOut: string): number =>
  Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
  );

const QUICK_EXTRAS: ExtraCharge[] = [
  { label: 'Trả phòng muộn (Late checkout)', amount: 200000 },
  { label: 'Phí gửi xe máy', amount: 50000 },
  { label: 'Phí gửi ô tô', amount: 100000 },
  { label: 'Hư hỏng đồ dùng', amount: 0 },
  { label: 'Dịch vụ giặt ủi', amount: 80000 },
];

const CheckOutModal = ({ booking, isOpen, onClose, onSuccess }: Props) => {
  const [extras, setExtras] = useState<ExtraCharge[]>([]);
  const [newLabel, setNewLabel] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const checkOutMutation = useCheckOut();

  const addExtra = (label: string, amount: number) => {
    if (!label) return;
    setExtras((prev) => [...prev, { label, amount }]);
    setNewLabel('');
    setNewAmount('');
  };

  const removeExtra = (idx: number) =>
    setExtras((prev) => prev.filter((_, i) => i !== idx));

  const handleClose = () => {
    setExtras([]);
    setNewLabel('');
    setNewAmount('');
    onClose();
  };

  const handleSubmit = async () => {
    try {
      await checkOutMutation.mutateAsync({ id: booking.id, extraCharges: extras });
      onSuccess();
      handleClose();
    } catch {
      // lỗi được xử lý trong mutation onError
    }
  };

  if (!isOpen || !booking) return null;

  const roomTotal = Number(booking.totalAmount ?? 0);
  const extraTotal = extras.reduce((sum, e) => sum + e.amount, 0);
  const grandTotal = roomTotal + extraTotal;
  const nights = calcNights(booking.checkInDate, booking.checkOutDate);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-medium text-gray-800">Xác nhận Check-out</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {booking.room?.roomType?.typeName} — Phòng {booking.room?.roomNumber}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <hr className="border-gray-100 m-0 shrink-0" />

        {/* Body scrollable */}
        <div className="px-6 py-5 flex flex-col gap-5 overflow-y-auto flex-1">

          {/* Tiền phòng */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">
                Tiền phòng ({nights} đêm)
              </span>
              <span className="font-medium text-gray-800">
                {formatVND(roomTotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Nhận phòng</span>
              <span className="text-gray-600">{formatDate(booking.checkInDate)}</span>
            </div>
            <div className="flex justify-between text-sm mt-0.5">
              <span className="text-gray-500">Trả phòng</span>
              <span className="text-gray-600">{formatDate(booking.checkOutDate)}</span>
            </div>
            {booking.checkinNote && (
              <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-200">
                Ghi chú nhận phòng: {booking.checkinNote}
              </p>
            )}
          </div>

          {/* Phụ thu nhanh */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-gray-600">Thêm phụ thu nhanh</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_EXTRAS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => addExtra(q.label, q.amount)}
                  className="text-xs border border-gray-200 px-3 py-1.5 rounded-xl hover:border-primary hover:text-primary transition-colors text-gray-600"
                >
                  + {q.label} {q.amount > 0 ? `(${formatVND(q.amount)})` : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Thêm phụ thu thủ công */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-gray-600">Hoặc nhập phụ thu khác</p>
            <div className="flex gap-2">
              <input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Tên phụ thu"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <input
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="Số tiền"
                type="number"
                min={0}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                onClick={() => addExtra(newLabel, Number(newAmount))}
                disabled={!newLabel || !newAmount}
                className="bg-primary hover:bg-primary-dark disabled:opacity-40 text-white px-3 py-2 rounded-xl text-sm transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Danh sách phụ thu */}
          {extras.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-gray-600">Phụ thu phát sinh</p>
              {extras.map((e, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5"
                >
                  <span className="text-sm text-gray-700">{e.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-orange-700">
                      {formatVND(e.amount)}
                    </span>
                    <button
                      onClick={() => removeExtra(i)}
                      className="text-red-400 hover:text-red-600 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tổng cộng */}
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
            {extraTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tổng phụ thu</span>
                <span className="text-orange-600 font-medium">
                  {formatVND(extraTotal)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-medium text-gray-800 text-sm">TỔNG THANH TOÁN</span>
              <span className="text-xl font-medium text-primary">
                {formatVND(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        <hr className="border-gray-100 m-0 shrink-0" />

        {/* Actions */}
        <div className="px-6 py-4 flex gap-3 justify-end shrink-0">
          <button
            onClick={handleClose}
            className="text-sm text-gray-500 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            disabled={checkOutMutation.isPending}
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2 rounded-xl flex items-center gap-2 transition-colors"
          >
            {checkOutMutation.isPending && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            Xác nhận Check-out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutModal;