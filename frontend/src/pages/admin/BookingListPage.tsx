import { useState, useEffect, useRef } from 'react';
import { useAdminBookings } from '../../hooks/queries/useAdminBookingsQuery';
import { 
  useCheckIn, 
  useCheckOut, 
  useCancelAdminBooking,
  useCreateOfflineBooking 
} from '../../hooks/mutations/useAdminBookingMutation';
import { adminService } from '../../services/adminService';
import { hotelService } from '../../services/hotel.service';
import { toast } from 'sonner';
import { useSocketAllBookings } from '../../hooks/useSocketBooking';
import { formatDate } from '../../utils/format';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import BookingStatusBadge from '../../components/common/BookingStatusBadge';
// Đã xóa import PaymentStatusBadge thừa ở đây

const SOURCE_LABEL: Record<string, string> = {
  online: 'Trực tuyến',
  offline: 'Tại quầy',
};

const SOURCE_CLASS: Record<string, string> = {
  online: 'bg-blue-50 text-blue-700',
  offline: 'bg-orange-50 text-orange-700',
};

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const CreateOfflineBookingModal = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'qr_code'>('cash');

  const { mutate: createOffline, isPending } = useCreateOfflineBooking();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!keyword.trim() || isNewCustomer) {
      setUsers([]);
      setShowDropdown(false);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const result = await adminService.searchUsers(keyword);
        const userData = Array.isArray(result) ? result : (result?.data || []);
        setUsers(userData);
        setShowDropdown(userData.length > 0);
      } catch { setUsers([]); }
    }, 400);
    return () => clearTimeout(timer);
  }, [keyword, isNewCustomer]);

  useEffect(() => {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setRooms([]);
      setSelectedRoomId(null);
      return;
    }
    const fetchRooms = async () => {
      setIsLoadingRooms(true);
      try {
        const result = await hotelService.getAvailable({ checkIn, checkOut, guests });
        setRooms(result ?? []);
      } catch { setRooms([]); }
      finally { setIsLoadingRooms(false); }
    };
    fetchRooms();
  }, [checkIn, checkOut, guests]);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights();
  const selectedRoomDetails = rooms.find(r => r.id === selectedRoomId);
  const totalPrice = selectedRoomDetails ? nights * Number(selectedRoomDetails.basePrice) : 0;

  const validateForm = () => {
    const hasCustomer = isNewCustomer ? (newName && newPhone) : selectedUser;
    return hasCustomer && checkIn && checkOut && checkOut > checkIn && selectedRoomId;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    createOffline({
      ...(isNewCustomer ? { newCustomer: { fullName: newName, phoneNumber: newPhone } } : { userId: selectedUser.id }),
      roomId: selectedRoomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guestCount: guests,
      paymentMethod,
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin', 'bookings'] });
        onClose();
      },
      onError: (err: any) => toast.error(err?.response?.data?.message ?? 'Lỗi hệ thống'),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg flex flex-col gap-6 p-8 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">Tạo đơn tại quầy</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">✕</button>
        </div>

        <div className="flex flex-col gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={isNewCustomer} onChange={(e) => setIsNewCustomer(e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <span className="text-sm font-medium text-gray-700">Khách hàng mới</span>
          </label>

          {isNewCustomer ? (
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Họ và tên" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" placeholder="Số điện thoại" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <input type="text" value={keyword} onChange={(e) => { setKeyword(e.target.value); setSelectedUser(null); }} placeholder="Tìm tên hoặc số điện thoại..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              {showDropdown && users.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-xl z-30 max-h-48 overflow-y-auto">
                  {users.map((user) => (
                    <button key={user.id} onClick={() => { setSelectedUser(user); setKeyword(user.fullName); setShowDropdown(false); }} className="w-full text-left px-4 py-2.5 hover:bg-blue-50 border-b last:border-0 text-sm">
                      <p className="font-semibold">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.phoneNumber}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 ml-1">Ngày nhận phòng</label>
            <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 ml-1">Ngày trả phòng</label>
            <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 ml-1">Số lượng khách</label>
            <input type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 ml-1">Phương thức thanh toán</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as any)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm">
              <option value="cash">Tiền mặt</option>
              <option value="qr_code">Chuyển khoản (QR Code)</option>
              <option value="card">Thẻ ngân hàng</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 ml-1">Chọn loại phòng</label>
          {!checkIn || !checkOut || checkOut <= checkIn ? (
            <div className="border-2 border-dashed border-gray-100 rounded-xl p-6 text-center text-xs text-gray-400">Vui lòng chọn thời gian hợp lệ</div>
          ) : (
            <div className="border border-gray-200 rounded-xl divide-y max-h-40 overflow-y-auto">
              {isLoadingRooms ? <div className="p-4 text-center text-xs text-gray-500">Đang tìm phòng...</div> :
               rooms.length === 0 ? <div className="p-4 text-center text-xs text-red-400">Hết phòng trống</div> :
               rooms.map((room) => (
                <label key={room.id} className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${selectedRoomId === room.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                  <input type="radio" checked={selectedRoomId === room.id} onChange={() => setSelectedRoomId(room.id)} className="w-4 h-4 accent-blue-600" />
                  <div className="flex-1 text-sm">
                    <p className="font-bold text-gray-800">{room.typeName}</p>
                    <p className="text-xs text-gray-500">{room.availableRoomCount} phòng trống · {room.basePrice?.toLocaleString('vi-VN')}đ</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {selectedRoomDetails && (
          <div className="flex items-center justify-between p-4 bg-blue-50/50 border border-blue-100 rounded-xl mt-2">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-blue-600">Tổng thanh toán</span>
              <span className="text-xs text-blue-500 mt-0.5">
                {nights} đêm x {selectedRoomDetails.basePrice?.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <span className="text-lg font-bold text-blue-700">
              {totalPrice.toLocaleString('vi-VN')}đ
            </span>
          </div>
        )}

        <div className="flex gap-3 mt-2">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Hủy bỏ</button>
          <button onClick={handleSubmit} disabled={isPending || !validateForm()} className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-blue-700 shadow-md shadow-blue-100">
            {isPending ? 'Đang xử lý...' : 'Xác nhận tạo đơn'}
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingListPage = () => {
  const navigate = useNavigate();
  const { mutate: checkIn, isPending: isCheckingIn } = useCheckIn();
  const { mutate: checkOut, isPending: isCheckingOut } = useCheckOut();
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelAdminBooking();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, source]);

  const filters = {
    search: debouncedSearch,
    keyword: debouncedSearch,
    status: status || undefined,
    source: source || undefined,
    page,
    limit: 20,
  };

  const { data: rawData, isLoading, isError } = useAdminBookings(filters);

  const extractData = () => {
    if (!rawData) return { list: [], payload: { page: 1, totalPages: 1, total: 0 } };
    
    const responseData = rawData.data || rawData;
    const list = responseData.bookings || [];
    const paginationData = responseData.pagination || { 
      page: responseData.page || 1, 
      totalPages: responseData.totalPages || 1, 
      total: responseData.total || list.length 
    };

    return {
      list: Array.isArray(list) ? list : [],
      payload: paginationData
    };
  };

  const { list: bookings, payload } = extractData();
  
  const pagination = {
    page: payload.page || 1,
    totalPages: payload.totalPages || 1,
    total: payload.total || 0
  };

  const bookingIds = bookings.map((b: any) => b.id);
  useSocketAllBookings(bookingIds);

  const renderBadges = (booking: any) => {
    // 1. Nếu đơn bị hủy: Ưu tiên hiển thị trạng thái hoàn tiền (Chờ hoàn / Đã hoàn / Đã hủy)
    if (booking.status === 'cancelled') {
      const isRefunded = booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'refunded');
      if (isRefunded) {
        return (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
            Đã hoàn tiền
          </span>
        );
      }

      const isPendingRefund = booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'pending');
      if (isPendingRefund) {
        return (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
            Chờ hoàn tiền
          </span>
        );
      }
      
      return (
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
          Đã hủy
        </span>
      );
    }

    // 2. Nếu đơn bình thường: CHỈ CẦN 1 THẺ BookingStatusBadge 
    return (
      <BookingStatusBadge status={booking.status} />
    );
  };

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800">
          Quản lý đơn đặt phòng
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          Tạo đơn tại quầy
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Tìm theo tên khách, mã đơn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-64"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="pending_payment">Chờ thanh toán</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="checked_in">Đang ở</option>
          <option value="checked_out">Đã trả phòng</option>
          <option value="cancelled">Đã hủy</option>
        </select>

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">Tất cả nguồn</option>
          <option value="online">Trực tuyến</option>
          <option value="offline">Tại quầy</option>
        </select>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Mã đơn', 'Khách', 'Phòng', 'Nhận phòng', 'Trả phòng', 'Nguồn', 'Trạng thái', 'Thao tác'].map((col) => (
                  <th key={col} className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                <tr>
                  <td colSpan={8} className="text-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm text-gray-400">Đang tải...</span>
                    </div>
                  </td>
                </tr>
              )}

              {isError && (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-400 text-sm">
                    Đã xảy ra lỗi, vui lòng thử lại
                  </td>
                </tr>
              )}

              {!isLoading && !isError && bookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-400 text-sm">
                    Không có đơn đặt phòng nào
                  </td>
                </tr>
              )}

              {!isLoading && !isError && bookings.map((booking: any) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-800 font-medium">
                    #{booking.id}
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    <div>{booking.customer?.fullName ?? '—'}</div>
                    <div className="text-xs text-gray-400">{booking.customer?.phoneNumber}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    <div>{booking.room?.roomType?.typeName ?? '—'}</div>
                    <div className="text-xs text-gray-400">Phòng {booking.room?.roomNumber}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(booking.checkInDate)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDate(booking.checkOutDate)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${SOURCE_CLASS[booking.source] ?? 'bg-gray-100 text-gray-500'}`}>
                      {SOURCE_LABEL[booking.source] ?? booking.source}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {/* GỌI HÀM RENDER BADGE THÔNG MINH Ở ĐÂY */}
                    <div className="flex gap-2 flex-wrap">
                      {renderBadges(booking)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button 
                        onClick={() => navigate(`/admin/bookings/${booking.id}`)} 
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        Chi tiết
                      </button>

                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => {
                            if (!window.confirm('Xác nhận check-in cho đơn này?')) return;
                            checkIn(booking.id);
                          }}
                          disabled={isCheckingIn}
                          className="text-green-600 text-sm font-medium hover:underline disabled:opacity-50"
                        >
                          Check-in
                        </button>
                      )}

                      {booking.status === 'checked_in' && (
                        <button
                          onClick={() => {
                            if (!window.confirm('Xác nhận check-out cho đơn này?')) return;
                            checkOut(booking.id);
                          }}
                          disabled={isCheckingOut}
                          className="text-purple-600 text-sm font-medium hover:underline disabled:opacity-50"
                        >
                          Check-out
                        </button>
                      )}

                      {booking.source === 'offline' &&
                        ['confirmed', 'pending_payment'].includes(booking.status) && (
                          <button
                            onClick={() => {
                              if (!window.confirm('Xác nhận hủy đơn đặt phòng này?')) return;
                              cancelBooking({ id: booking.id });
                            }}
                            disabled={isCancelling}
                            className="text-red-500 text-sm font-medium hover:underline disabled:opacity-50"
                          >
                            Hủy
                          </button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              Trang {pagination.page} / {pagination.totalPages} ({pagination.total} đơn)
            </span>

            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="
                  px-3 py-1.5 text-xs
                  border border-gray-200 rounded-lg
                  text-gray-600 hover:bg-gray-50
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                ← Trước
              </button>

              <button
                disabled={page === pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="
                  px-3 py-1.5 text-xs
                  border border-gray-200 rounded-lg
                  text-gray-600 hover:bg-gray-50
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                Sau →
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && <CreateOfflineBookingModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BookingListPage;