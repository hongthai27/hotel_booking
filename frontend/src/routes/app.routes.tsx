import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import AdminLayout from '../layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';

const HomePage = lazy(() => import('../pages/customer/HomePage'));
const LoginPage = lazy(() => import('../pages/customer/LoginPage'));
const RegisterPage = lazy(() => import('../pages/customer/RegisterPage'));
const RoomListPage = lazy(() => import('../pages/customer/RoomListPage'));
const RoomDetailPage = lazy(() => import('../pages/customer/RoomDetailPage'));
const BookingPage = lazy(() => import('../pages/customer/BookingPage'));
const PaymentPage = lazy(() => import('../pages/customer/PaymentPage'));
const MyBookingsPage = lazy(() => import('../pages/customer/BookingHistoryPage'));
const AboutPage = lazy(() => import('../pages/customer/AboutPage'));
const ForgotPasswordPage = lazy(() => import('../pages/customer/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/customer/ResetPasswordPage'));

const BookingListPage = lazy(() => import('../pages/admin/BookingListPage'));
const BookingDetailPage = lazy(() => import('../pages/admin/BookingDetailPage'));
const RoomTypeListPage = lazy(() => import('../pages/admin/RoomTypeListPage'));
const ReportPage = lazy(() => import('../pages/admin/ReportPage'));
const UserListPage = lazy(() => import('../pages/admin/UserListPage'));
const AmenityListPage = lazy(() => import('../pages/admin/AmenityListPage'));

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">403</h1>
        <p className="text-gray-600 mb-8 font-medium">Bạn không có quyền truy cập trang này</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600 mb-8 font-medium">404 - Trang không tồn tại</p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element:<ResetPasswordPage />,
      },
    ],
  },
  {
    path: '/',
    element: <CustomerLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'rooms', element: <RoomListPage /> },
      { path: 'room-type/:roomTypeId', element: <RoomDetailPage /> },
      { path: 'booking/:id', element: <BookingPage /> },
      { path: 'payment/:id', element: <PaymentPage /> },
      { path: 'my-bookings', element: <MyBookingsPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'bookings', element: <BookingListPage /> },
      { path: 'bookings/:id', element: <BookingDetailPage /> },
      { path: 'room-types', element: <RoomTypeListPage /> },
      { path: 'reports', element: <ReportPage /> },
      {
        path: 'users',
        element: (
          <ProtectedRoute roles={['admin']}>
            <UserListPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'amenities',
        element: (
          <ProtectedRoute roles={['admin']}>
            <AmenityListPage />
          </ProtectedRoute>
        )
      }
    ],
  },
  { path: '/unauthorized', element: <UnauthorizedPage /> },
  { path: '*', element: <NotFoundPage /> },
]);

export const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-gray-500 font-medium text-lg animate-pulse">
            Đang tải...
          </div>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;