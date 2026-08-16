import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useCheckIn } from '../../hooks/mutations/useAdminBookingMutation';
import api from '../../services/api';

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
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [availableRoomsMap, setAvailableRoomsMap] = useState<Record<number, any[]>>({});
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);

  const checkInMutation = useCheckIn();

  useEffect(() => {
    if (isOpen && booking?.roomTypeLines) {
      const fetchAllAvailableRooms = async () => {
        setIsLoadingRooms(true);
        try {
          const newMap: Record<number, any[]> = {};
          await Promise.all(
            booking.roomTypeLines.map(async (line: any) => {
              const res = await api.get(`/admin/rooms?status=available&roomTypeId=${line.roomTypeId}`);
              newMap[line.roomTypeId] = res.data.data || [];
            })
          );
          setAvailableRoomsMap(newMap);
        } catch (error) {
          toast.error('Lỗi khi tải danh sách phòng');
        } finally {
          setIsLoadingRooms(false);
        }
      };
      fetchAllAvailableRooms();
    }
  }, [isOpen, booking]);

  const handleAssignRoom = (key: string, roomId: string) => {
    setAssignments(prev => ({ ...prev, [key]: roomId }));
  };
  
  const totalRoomsToAssign = booking?.roomTypeLines?.reduce((sum: number, line: any) => sum + line.quantity, 0) || 0;
  const allRoomsAssigned = Object.keys(assignments).length === totalRoomsToAssign && Object.values(assignments).every(v => v);

  const handleSubmit = async () => {
    if (!allRoomsAssigned) {
      toast.error('Vui lòng gán tất cả các phòng trước khi check-in.');
      return;
    }
    if (!idNumber.trim()) {
      toast.error('Vui lòng nhập số CCCD hoặc Hộ chiếu');
      return;
    }
    if (!confirmed) {
      toast.error('Vui lòng xác nhận đã kiểm tra giấy tờ');
      return;
    }
    
    const payload = {
      idNumber,
      checkinNote,
      assignments: Object.entries(assignments).map(([key, roomId]) => ({
        bookingRoomTypeId: Number(key.split('_')[0]),
        roomId: Number(roomId)
      }))
    };

    try {
      await checkInMutation.mutateAsync({ 
        id: booking.id, 
        ...payload
      });
      onSuccess();
      onClose();
    } catch {
     }
  };

  const handleClose = () => {
    setIdNumber('');
    setCheckinNote('');
    setConfirmed(false);
    setAssignments({});
    setAvailableRoomsMap({});
    onClose();
  };

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between shrink-0">
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

        <hr className="border-gray-100 m-0 shrink-0" />

        <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto">
          {/* Room Assignment UI */}
          {booking.roomTypeLines.map((line: any) => 
            Array.from({ length: line.quantity }).map((_, index) => {
              const assignmentKey = `${line.id}_${index}`;
              const availableRooms = availableRoomsMap[line.roomTypeId] || [];

              return (
                <div key={assignmentKey} className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <label className="text-xs font-medium text-gray-600">
                    Gán phòng cho: <span className="font-bold text-primary">{line.roomType.typeName} (slot #{index + 1})</span>
                  </label>
                  <select
                    value={assignments[assignmentKey] || ''}
                    onChange={(e) => handleAssignRoom(assignmentKey, e.target.value)}
                    disabled={isLoadingRooms}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">-- Chọn phòng trống --</option>
                    {availableRooms.map((room) => {
                      const isSelectedByOther = Object.entries(assignments).some(
                        ([k, v]) => v === room.id.toString() && k !== assignmentKey
                      );
                      return (
                        <option key={room.id} value={room.id} disabled={isSelectedByOther}>
                          Phòng {room.roomNumber} (Tầng {room.floor}) {isSelectedByOther ? '- Đã chọn' : ''}
                        </option>
                      );
                    })}
                     {availableRooms.length === 0 && !isLoadingRooms && (
                       <option value="" disabled>Hết phòng trống cho hạng này</option>
                    )}
                  </select>
                </div>
              );
            })
          )}

          {/* Other Fields */}
          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-xs font-medium text-gray-600">
              Số CCCD / Hộ chiếu <span className="text-red-500">*</span>
            </label>
            <input
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Nhập số CCCD hoặc Hộ chiếu của người đại diện"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">
              Ghi chú lễ tân
            </label>
            <textarea
              value={checkinNote}
              onChange={(e) => setCheckinNote(e.target.value)}
              placeholder="Yêu cầu đặc biệt, tình trạng phòng..."
              rows={2}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none"
            />
          </div>

          <label className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-4 h-4 accent-primary mt-0.5 shrink-0"
            />
            <span className="text-sm text-gray-700">
              Xác nhận đã <strong>đối chiếu giấy tờ tùy thân</strong> và thông tin khớp.
            </span>
          </label>
        </div>

        <hr className="border-gray-100 m-0 shrink-0" />

        {/* Actions */}
        <div className="px-6 py-4 flex gap-3 justify-end shrink-0">
          <button
            onClick={handleClose}
            className="text-sm text-gray-500 px-4 py-2 rounded-xl hover:bg-gray-50"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            disabled={!confirmed || !idNumber.trim() || !allRoomsAssigned || checkInMutation.isPending}
            className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 rounded-xl flex items-center gap-2"
          >
            {checkInMutation.isPending && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            Xác nhận Check-in ({Object.keys(assignments).length}/{totalRoomsToAssign})
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;