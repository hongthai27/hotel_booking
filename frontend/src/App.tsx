import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
import { AppRouter } from './routes/app.routes';
import { useAuthStore } from './stores/authStore';
import { socketService } from './services/socketService'; // <--- Thêm import này

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  const initAuth = useAuthStore((s) => s.initAuth);
  const user = useAuthStore((s) => s.user); // <--- Lấy user hiện tại

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // BÍ QUYẾT 1: Báo cho Backend biết "Tôi là Admin" để vào đúng room
  useEffect(() => {
    if (user) {
      socketService.connect(user.role);
    } else {
      socketService.disconnect();
    }
  }, [user]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontSize: '13px',
              fontFamily: 'var(--font-sans)',
            },
            duration: 3000,
          }}
        />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;