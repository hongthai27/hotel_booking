import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { UserRole } from '../../types/auth.types';
import { useAuthStore } from '../../stores/authStore';

interface Props {
  roles?: UserRole[];
}

const ProtectedRoute = ({ roles }: Props) => {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-3">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-normal">Dang tai...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;