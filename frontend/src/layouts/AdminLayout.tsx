import { useState, useCallback, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useSocketNewBooking } from '../hooks/useSocketBooking';
import type { NewBookingPayload } from '../hooks/useSocketBooking';

const ROLE_LABEL: Record<string, string> = {
  admin: 'Admin',
  receptionist: 'Lễ tân',
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const AdminLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Notification state ─────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState<NewBookingPayload[]>([]);
  const [showNotif, setShowNotif] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notifRef = useRef<HTMLDivElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const isAdmin = user?.role === 'admin';

  // ── Socket listener ────────────────────────────────────────────────────────
  const handleNewBooking = useCallback((payload: NewBookingPayload) => {
    setNotifications((prev) => [payload, ...prev].slice(0, 20));
    setUnreadCount((prev) => prev + 1);

    // Âm thanh thông báo nhẹ
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch {}
  }, []);

  useSocketNewBooking(handleNewBooking);

  // ── Click outside đóng dropdown ──
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleOpenNotif = () => {
    setShowNotif((prev) => !prev);
    setUnreadCount(0);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors no-underline ${
      isActive
        ? 'bg-primary text-white'
        : 'text-gray-400 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen z-50 w-60 bg-primary-dark flex flex-col py-6 px-3 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:sticky md:top-0
      `}>
        <div className="text-white font-medium text-lg px-4 pb-6 border-b border-white/10 mb-4 shrink-0">
          Hotel Booking
        </div>

        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto scrollbar-hide pb-4" onClick={() => setSidebarOpen(false)}>
          <NavLink to="/admin/dashboard" className={navLinkClass}>Sơ đồ phòng</NavLink>
          <NavLink to="/admin/bookings" className={navLinkClass}>Quản lý đơn đặt phòng</NavLink>
          <NavLink to="/admin/refunds" className={navLinkClass}>Quản lý hoàn tiền</NavLink>
          {isAdmin && (
            <>
              <NavLink to="/admin/room-types" className={navLinkClass}>Quản lý phòng</NavLink>
              <NavLink to="/admin/reports" className={navLinkClass}>Báo cáo</NavLink>
              <NavLink to="/admin/users" className={navLinkClass}>Quản lý tài khoản</NavLink>
              <NavLink to="/admin/amenities" className={navLinkClass}>Quản lý tiện ích</NavLink>
              <NavLink to="/admin/promotions" className={navLinkClass}>Quản lý khuyến mãi</NavLink>
            </>
          )}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 h-16 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <div className="flex items-center gap-4 ml-auto">
             {/* Notification Bell */}
             <div className="relative" ref={notifRef}>
              <button onClick={handleOpenNotif} className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              {showNotif && (
                <div className="absolute -right-4 sm:right-0 top-12 w-[300px] sm:w-80 bg-white border border-gray-100 rounded-2xl shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                    <span className="text-sm font-medium">Thông báo mới</span>
                    {notifications.length > 0 && (
                      <button onClick={() => setNotifications([])} className="text-xs text-gray-400">Xóa tất cả</button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-sm text-gray-400">Không có đơn mới</div>
                    ) : (
                      notifications.map((notif, idx) => (
                        <Link key={idx} to="/admin/bookings" className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-50" onClick={() => setShowNotif(false)}>
                          <p className="text-xs font-medium">Đơn mới #{notif.bookingId}</p>
                          <p className="text-xs text-gray-500">{notif.guestName} - {notif.roomTypeName}</p>
                          <p className="text-[10px] text-gray-400">Ngày đến: {formatDate(notif.checkInDate)}</p>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {user?.role && (
              <span className={`hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-cyan-100 text-cyan-700'
              }`}>
                {ROLE_LABEL[user.role] ?? user.role}
              </span>
            )}
            
            {/* User Profile Dropdown */}
            <div className="relative ml-2" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-transparent border-none cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center font-medium text-primary text-sm border border-primary/20">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.fullName?.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="text-sm font-medium text-gray-800 hidden sm:block">
                  {user?.fullName}
                </span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform hidden sm:block ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-2xl min-w-[200px] shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800 truncate">{user?.fullName}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/admin/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 no-underline"
                  >
                    Hồ sơ cá nhân
                  </Link>
                  <hr className="border-gray-100 m-0" />
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-3 bg-transparent border-none cursor-pointer text-red-500 text-sm text-left hover:bg-red-50 font-medium"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;