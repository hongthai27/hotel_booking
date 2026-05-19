import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const ROLE_LABEL: Record<string, string> = {
  admin: 'Admin',
  receptionist: 'Lễ tân',
};

const AdminLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAdmin = user?.role === 'admin';

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
        md:translate-x-0 md:static
      `}>
        <div className="text-white font-medium text-lg px-4 pb-6 border-b border-white/10 mb-4">
          Hotel Booking
        </div>

        <nav className="flex flex-col gap-1" onClick={() => setSidebarOpen(false)}>
          <NavLink to="/admin/dashboard" className={navLinkClass}>Sơ đồ phòng</NavLink>
          <NavLink to="/admin/bookings" className={navLinkClass}>Quản lý đơn đặt phòng</NavLink>
          <NavLink to="/admin/refunds" className={navLinkClass}>Quản lý hoàn tiền</NavLink>
          {isAdmin && (
            <>
              <NavLink to="/admin/room-types" className={navLinkClass}>Quản lý phòng</NavLink>
              <NavLink to="/admin/reports" className={navLinkClass}>Báo cáo</NavLink>
              <NavLink to="/admin/users" className={navLinkClass}>Quản lý tài khoản</NavLink>
              <NavLink to="/admin/amenities" className={navLinkClass}>Quản lý tiện ích</NavLink>
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

          <div className="flex items-center gap-3 ml-auto">
            {user?.role && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-cyan-100 text-cyan-700'
              }`}>
                {ROLE_LABEL[user.role] ?? user.role}
              </span>
            )}
            <span className="text-sm font-medium text-gray-800 hidden sm:inline-block">
              {user?.fullName}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition-colors"
            >
              Đăng xuất
            </button>
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