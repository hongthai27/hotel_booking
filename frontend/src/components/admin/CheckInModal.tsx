import { useState } from 'react';
import { toast } from 'sonner';
import { useCheckIn } from '../../hooks/mutations/useAdminBookingMutation';

interface Props {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const CheckInModal = ({ booking, isOpen, onClose, onSuccess }: Props) => {
  const [idNumber, setIdNumber] = useState('');
  const [checkinNote, setCheckinNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const checkInMutation = useCheckIn();

  const handleSubmit = async () => {
    if (!idNumber.trim()) {
      toast.error('Vui lòng nhập số CCCD hoặc Hộ chiếu');
      return;
    }
    if (!confirmed) {
      toast.error('Vui lòng xác nhận đã kiểm tra giấy tờ');
      return;
    }
    try {
      await checkInMutation.mutateAsync({ id: booking.id, idNumber, checkinNote });
      onSuccess();
      onClose();
    } catch {
      // lỗi được xử lý trong mutation onError
    }
  };

  const handleClose = () => {
    setIdNumber('');
    setCheckinNote('');
    setConfirmed(false);
    onClose();
  };

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md flex flex-col">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-medium text-gray-800">Xác nhận Check-in</h2>
            <p className="text-xs text-gray-400 mt-0.5">Đơn #{booking.id}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <hr className="border-gray-100 m-0" />

        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Thông tin booking */}
          <div className="bg-gray-50 rounded-xl p-4 text-sm flex flex-col gap-1.5">
            <div className="flex justify-between">
              <span className="text-gray-500">Khách</span>
              <span className="font-medium text-gray-800">
                {booking.customer?.fullName ?? '—'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phòng</span>
              <span className="text-gray-800">
                {booking.room?.roomType?.typeName} — {booking.room?.roomNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Nhận phòng</span>
              <span className="text-gray-800">{formatDate(booking.checkInDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Trả phòng</span>
              <span className="text-gray-800">{formatDate(booking.checkOutDate)}</span>
            </div>
          </div>

          {/* Số CCCD */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">
              Số CCCD / Hộ chiếu <span className="text-red-500">*</span>
            </label>
            <input
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Nhập số CCCD hoặc Hộ chiếu"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
            />
          </div>

          {/* Ghi chú */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">
              Ghi chú lễ tân{' '}
              <span className="text-gray-400 font-normal">
                (yêu cầu đặc biệt, tình trạng phòng...)
              </span>
            </label>
            <textarea
              value={checkinNote}
              onChange={(e) => setCheckinNote(e.target.value)}
              placeholder="VD: Khách yêu cầu thêm gối, phòng có vết trầy xước nhỏ trên tường..."
              rows={3}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full resize-none"
            />
          </div>

          {/* Checkbox xác nhận giấy tờ — BẮT BUỘC */}
          <label
            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
              confirmed
                ? 'bg-green-50 border-green-300'
                : 'bg-gray-50 border-gray-200 hover:border-primary/50'
            }`}
          >
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-4 h-4 accent-primary mt-0.5 shrink-0"
            />
            <span className="text-sm text-gray-700 leading-snug">
              Xác nhận đã <strong>đối chiếu giấy tờ tùy thân</strong> của khách hàng và
              thông tin khớp với đơn đặt phòng
            </span>
          </label>
        </div>

        <hr className="border-gray-100 m-0" />

        {/* Actions */}
        <div className="px-6 py-4 flex gap-3 justify-end">
          <button
            onClick={handleClose}
            className="text-sm text-gray-500 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            disabled={!confirmed || !idNumber.trim() || checkInMutation.isPending}
            className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 rounded-xl flex items-center gap-2 transition-colors"
          >
            {checkInMutation.isPending && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            Xác nhận Check-in
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;