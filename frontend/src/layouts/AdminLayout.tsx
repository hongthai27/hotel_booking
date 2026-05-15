import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const ROLE_LABEL: Record<string, string> = {
  admin: 'Admin',
  receptionist: 'Lễ tân', // Đã sửa lại lỗi typo "Le tan" thành tiếng Việt có dấu
};

const AdminLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

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
      <aside className="w-60 bg-primary-dark flex flex-col fixed top-0 left-0 h-screen z-50 py-6 px-3">
        <div className="text-white font-medium text-lg px-4 pb-6 border-b border-white/10 mb-4">
          Hotel Booking
        </div>

        <nav className="flex flex-col gap-1">
          {/* MENU MỚI THÊM ĐẦU TIÊN: SƠ ĐỒ PHÒNG */}
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            Sơ đồ phòng
          </NavLink>

          <NavLink to="/admin/bookings" className={navLinkClass}>
            Quản lý đơn đặt phòng
          </NavLink>

          {isAdmin && (
            <>
              <NavLink to="/admin/room-types" className={navLinkClass}>
                Quản lý phòng
              </NavLink>
              <NavLink to="/admin/reports" className={navLinkClass}>
                Báo cáo
              </NavLink>
              <NavLink to="/admin/users" className={navLinkClass}>
                Quản lý tài khoản
              </NavLink>
              <NavLink to="/admin/amenities" className={navLinkClass}>
                Quản lý tiện ích
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      <div className="ml-60 flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-100 h-16 px-6 flex items-center justify-end gap-3 sticky top-0 z-40 shadow-sm">
          {user?.role && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              user.role === 'admin'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-cyan-100 text-cyan-700'
            }`}>
              {ROLE_LABEL[user.role] ?? user.role}
            </span>
          )}

          <span className="text-sm font-medium text-gray-800">
            {user?.fullName}
          </span>

          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl border-none cursor-pointer transition-colors"
          >
            Đăng xuất
          </button>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;