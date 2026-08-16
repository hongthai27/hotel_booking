import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import CompareBar from '../components/customer/CompareBar';
import { useCartStore } from '../stores/cartStore';

const CustomerLayout = () => {
  const { user, logout } = useAuthStore();
  const { totalItems } = useCartStore();
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

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" end className={navLinkClass}>Trang chủ</NavLink>
          <NavLink to="/about"   className={navLinkClass}>Về chúng tôi</NavLink>
          <NavLink to="/rooms"   className={navLinkClass}>Đặt phòng</NavLink>

          <NavLink to="/contact" className={navLinkClass}>Liên hệ</NavLink>
          <NavLink to="/promotions" className={navLinkClass}>Ưu đãi</NavLink>

        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/cart"
            className="relative p-2 rounded-full hover:bg-white/20 transition-colors mr-2"
            aria-label="Giỏ hàng"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-semibold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6">
        <Outlet />
      </main>
      
      <CompareBar />

      <footer className="bg-primary-dark text-gray-400 text-sm text-center py-6 px-4">
        <p> 89 phường Hoàn Kiếm, TP. Hà Nội</p>
        <p>SDT: 0909 123 456 | Email: contact@hotelbooking.vn</p>
        <p className="mt-2 text-gray-500">© 2026 Hotel Booking. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CustomerLayout;