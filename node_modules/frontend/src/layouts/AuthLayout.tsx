import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const AuthLayout: React.FC = () => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  if (user) {
    if (user.role === 'admin' || user.role === 'receptionist') {
      return <Navigate to="/admin/bookings" replace />;
    }
    return <Navigate to="/my-bookings" replace />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary to-primary-dark overflow-hidden px-4">
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-white/5 rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-white/5 rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl px-8 py-10">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-primary"
            >
              <path d="M3 21h18" />
              <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
              <path d="M9 10h.01" />
              <path d="M15 10h.01" />
              <path d="M9 14h.01" />
              <path d="M15 14h.01" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Hotel Booking</h1>
          <p className="text-sm text-gray-500 mt-1">Hệ thống quản lý đặt phòng</p>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;