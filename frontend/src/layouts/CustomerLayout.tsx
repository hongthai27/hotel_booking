import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const CustomerLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-accent' : 'text-white hover:text-accent'}`;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-primary text-white h-16 px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <NavLink to="/" className="text-lg font-medium text-white no-underline tracking-wide">
          Hotel Booking
        </NavLink>

        <nav className="flex items-center gap-6">
          <NavLink to="/" end className={navLinkClass}>
            Trang chủ
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            Về chúng tôi
          </NavLink>
          <NavLink to="/rooms" className={navLinkClass}>
            Đặt phòng
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-white"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-accent flex items-center justify-center font-medium text-white text-sm">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    user.fullName.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="text-sm font-medium">{user.fullName}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-2xl min-w-44 shadow-md z-50 overflow-hidden">
                  <NavLink
                    to="/my-bookings"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 no-underline"
                  >
                    Lịch sử đặt phòng
                  </NavLink>
                  <NavLink
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 no-underline"
                  >
                    Hồ sơ cá nhân
                  </NavLink>
                  <hr className="border-gray-100 m-0" />
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-3 bg-transparent border-none cursor-pointer text-red-500 text-sm text-left hover:bg-red-50"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" className="text-white text-sm font-medium no-underline hover:text-accent transition-colors">
                Đăng nhập
              </NavLink>
              <NavLink
                to="/register"
                className="bg-accent text-white px-4 py-1.5 rounded-xl text-sm font-medium no-underline hover:opacity-90 transition-opacity"
              >
                Đăng ký
              </NavLink>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>

      <footer className="bg-primary-dark text-gray-400 text-sm text-center py-6 px-4">
        <p> 89 phường Hoàn Kiếm, TP. Hà Nội</p>
        <p>SDT: 0909 123 456 | Email: contact@hotelbooking.vn</p>
        <p className="mt-2 text-gray-500">© 2026 Hotel Booking. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CustomerLayout;