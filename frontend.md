This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.gitignore
eslint.config.js
index.html
package.json
postcss.config.js
public/icons.svg
README.md
src/App.tsx
src/components/admin/CheckInModal.tsx
src/components/admin/CheckOutModal.tsx
src/components/common/BookingStatusBadge.tsx
src/components/common/FullScreenLoader.tsx
src/components/common/PaymentStatusBadge.tsx
src/components/customer/CancelBookingModal.tsx
src/components/customer/CompareBar.tsx
src/components/customer/HotelCard.tsx
src/components/customer/ReviewForm.tsx
src/components/customer/ReviewList.tsx
src/components/customer/RoomCard.tsx
src/components/customer/RoomTypeCard.tsx
src/components/customer/SearchForm.tsx
src/hooks/mutations/use-booking.mutation.ts
src/hooks/mutations/useAdminBookingMutation.ts
src/hooks/mutations/usePaymentMutation.ts
src/hooks/mutations/useRoomTypeMutation.ts
src/hooks/queries/use-booking.query.ts
src/hooks/queries/use-hotels.query.ts
src/hooks/queries/useAdminBookingsQuery.ts
src/hooks/queries/useBookingsQuery.ts
src/hooks/useSocketBooking.ts
src/index.css
src/layouts/AdminLayout.tsx
src/layouts/AuthLayout.tsx
src/layouts/CustomerLayout.tsx
src/main.tsx
src/pages/admin/AmenityListPage.tsx
src/pages/admin/BookingDetailPage.tsx
src/pages/admin/BookingListPage.tsx
src/pages/admin/DashboardPage.tsx
src/pages/admin/PromotionListPage.tsx
src/pages/admin/RefundListPage.tsx
src/pages/admin/ReportPage.tsx
src/pages/admin/RoomTypeListPage.tsx
src/pages/admin/UserListPage.tsx
src/pages/customer/AboutPage.tsx
src/pages/customer/BookingHistoryPage.tsx
src/pages/customer/BookingPage.tsx
src/pages/customer/CartPage.tsx
src/pages/customer/CheckoutPage.tsx
src/pages/customer/ComparePage.tsx
src/pages/customer/ContactPage.tsx
src/pages/customer/CustomerBookingDetailPage.tsx
src/pages/customer/ForgotPasswordPage.tsx
src/pages/customer/HomePage.tsx
src/pages/customer/LoginPage.tsx
src/pages/customer/PaymentPage.tsx
src/pages/customer/ProfilePage.tsx
src/pages/customer/PromotionsPage.tsx
src/pages/customer/RegisterPage.tsx
src/pages/customer/ResetPasswordPage.tsx
src/pages/customer/RoomDetailPage.tsx
src/pages/customer/RoomListPage.tsx
src/routes/app.routes.tsx
src/routes/ProtectedRoute.tsx
src/services/adminService.ts
src/services/api.ts
src/services/auth.service.ts
src/services/booking.service.ts
src/services/hotel.service.ts
src/services/payment.service.ts
src/services/socketService.ts
src/stores/authStore.ts
src/stores/cartStore.ts
src/stores/compareStore.ts
src/stores/searchStore.ts
src/types/auth.types.ts
src/types/booking.types.ts
src/types/hotel.types.ts
src/types/index.ts
src/utils/format.ts
tailwind.config.ts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path=".gitignore">
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
</file>

<file path="eslint.config.js">
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
</file>

<file path="index.html">
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hotel Booking</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
</file>

<file path="package.json">
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "jspdf": "^4.2.1",
    "jspdf-autotable": "^5.0.8",
    "react": "^19.2.5",
    "react-dom": "^19.2.5",
    "socket.io-client": "^4.8.3",
    "sonner": "^2.0.7",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@tailwindcss/postcss": "^4.2.4",
    "@types/node": "^24.12.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^10.2.1",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.5.0",
    "postcss": "^8.5.14",
    "tailwindcss": "^4.2.4",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.58.2",
    "vite": "^8.0.10"
  }
}
</file>

<file path="postcss.config.js">
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
}
</file>

<file path="public/icons.svg">
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
</file>

<file path="README.md">
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
</file>

<file path="src/App.tsx">
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
  );
};

export default App;
</file>

<file path="src/components/admin/CheckInModal.tsx">
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useCheckIn } from '../../hooks/mutations/useAdminBookingMutation';
import api from '../../services/api';

interface Props {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const CheckInModal = ({ booking, isOpen, onClose, onSuccess }: Props) => {
  const [idNumber, setIdNumber] = useState('');
  const [checkinNote, setCheckinNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [availableRoomsMap, setAvailableRoomsMap] = useState<Record<number, any[]>>({});
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);

  const checkInMutation = useCheckIn();

  useEffect(() => {
    if (isOpen && booking?.roomTypeLines) {
      const fetchAllAvailableRooms = async () => {
        setIsLoadingRooms(true);
        try {
          const newMap: Record<number, any[]> = {};
          await Promise.all(
            booking.roomTypeLines.map(async (line: any) => {
              const res = await api.get(`/admin/rooms?status=available&roomTypeId=${line.roomTypeId}`);
              newMap[line.roomTypeId] = res.data.data || [];
            })
          );
          setAvailableRoomsMap(newMap);
        } catch (error) {
          toast.error('Lỗi khi tải danh sách phòng');
        } finally {
          setIsLoadingRooms(false);
        }
      };
      fetchAllAvailableRooms();
    }
  }, [isOpen, booking]);

  const handleAssignRoom = (key: string, roomId: string) => {
    setAssignments(prev => ({ ...prev, [key]: roomId }));
  };
  
  const totalRoomsToAssign = booking?.roomTypeLines?.reduce((sum: number, line: any) => sum + line.quantity, 0) || 0;
  const allRoomsAssigned = Object.keys(assignments).length === totalRoomsToAssign && Object.values(assignments).every(v => v);

  const handleSubmit = async () => {
    if (!allRoomsAssigned) {
      toast.error('Vui lòng gán tất cả các phòng trước khi check-in.');
      return;
    }
    if (!idNumber.trim()) {
      toast.error('Vui lòng nhập số CCCD hoặc Hộ chiếu');
      return;
    }
    if (!confirmed) {
      toast.error('Vui lòng xác nhận đã kiểm tra giấy tờ');
      return;
    }
    
    const payload = {
      idNumber,
      checkinNote,
      assignments: Object.entries(assignments).map(([key, roomId]) => ({
        bookingRoomTypeId: Number(key.split('_')[0]),
        roomId: Number(roomId)
      }))
    };

    try {
      await checkInMutation.mutateAsync({ 
        id: booking.id, 
        ...payload
      });
      onSuccess();
      onClose();
    } catch {
     }
  };

  const handleClose = () => {
    setIdNumber('');
    setCheckinNote('');
    setConfirmed(false);
    setAssignments({});
    setAvailableRoomsMap({});
    onClose();
  };

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-medium text-gray-800">Xác nhận Check-in</h2>
            <p className="text-xs text-gray-400 mt-0.5">Đơn #{booking.id}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <hr className="border-gray-100 m-0 shrink-0" />

        <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto">
          {/* Room Assignment UI */}
          {booking.roomTypeLines.map((line: any) => 
            Array.from({ length: line.quantity }).map((_, index) => {
              const assignmentKey = `${line.id}_${index}`;
              const availableRooms = availableRoomsMap[line.roomTypeId] || [];

              return (
                <div key={assignmentKey} className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <label className="text-xs font-medium text-gray-600">
                    Gán phòng cho: <span className="font-bold text-primary">{line.roomType.typeName} (slot #{index + 1})</span>
                  </label>
                  <select
                    value={assignments[assignmentKey] || ''}
                    onChange={(e) => handleAssignRoom(assignmentKey, e.target.value)}
                    disabled={isLoadingRooms}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">-- Chọn phòng trống --</option>
                    {availableRooms.map((room) => {
                      const isSelectedByOther = Object.entries(assignments).some(
                        ([k, v]) => v === room.id.toString() && k !== assignmentKey
                      );
                      return (
                        <option key={room.id} value={room.id} disabled={isSelectedByOther}>
                          Phòng {room.roomNumber} (Tầng {room.floor}) {isSelectedByOther ? '- Đã chọn' : ''}
                        </option>
                      );
                    })}
                     {availableRooms.length === 0 && !isLoadingRooms && (
                       <option value="" disabled>Hết phòng trống cho hạng này</option>
                    )}
                  </select>
                </div>
              );
            })
          )}

          {/* Other Fields */}
          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-xs font-medium text-gray-600">
              Số CCCD / Hộ chiếu <span className="text-red-500">*</span>
            </label>
            <input
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Nhập số CCCD hoặc Hộ chiếu của người đại diện"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">
              Ghi chú lễ tân
            </label>
            <textarea
              value={checkinNote}
              onChange={(e) => setCheckinNote(e.target.value)}
              placeholder="Yêu cầu đặc biệt, tình trạng phòng..."
              rows={2}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none"
            />
          </div>

          <label className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-4 h-4 accent-primary mt-0.5 shrink-0"
            />
            <span className="text-sm text-gray-700">
              Xác nhận đã <strong>đối chiếu giấy tờ tùy thân</strong> và thông tin khớp.
            </span>
          </label>
        </div>

        <hr className="border-gray-100 m-0 shrink-0" />

        {/* Actions */}
        <div className="px-6 py-4 flex gap-3 justify-end shrink-0">
          <button
            onClick={handleClose}
            className="text-sm text-gray-500 px-4 py-2 rounded-xl hover:bg-gray-50"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            disabled={!confirmed || !idNumber.trim() || !allRoomsAssigned || checkInMutation.isPending}
            className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 rounded-xl flex items-center gap-2"
          >
            {checkInMutation.isPending && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            Xác nhận Check-in ({Object.keys(assignments).length}/{totalRoomsToAssign})
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;
</file>

<file path="src/components/admin/CheckOutModal.tsx">
import { useState } from 'react';
import { useCheckOut } from '../../hooks/mutations/useAdminBookingMutation';

interface ExtraCharge {
  label: string;
  amount: number;
}

interface Props {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const calcNights = (checkIn: string, checkOut: string): number =>
  Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
  );

const QUICK_EXTRAS: ExtraCharge[] = [
  { label: 'Trả phòng muộn (Late checkout)', amount: 200000 },
  { label: 'Phí gửi xe máy', amount: 50000 },
  { label: 'Phí gửi ô tô', amount: 100000 },
  { label: 'Hư hỏng đồ dùng', amount: 0 },
  { label: 'Dịch vụ giặt ủi', amount: 80000 },
];

const CheckOutModal = ({ booking, isOpen, onClose, onSuccess }: Props) => {
  const [extras, setExtras] = useState<ExtraCharge[]>([]);
  const [newLabel, setNewLabel] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'qr_code'>('cash');

  const checkOutMutation = useCheckOut();

  const addExtra = (label: string, amount: number) => {
    if (!label) return;
    setExtras((prev) => [...prev, { label, amount }]);
    setNewLabel('');
    setNewAmount('');
  };

  const removeExtra = (idx: number) =>
    setExtras((prev) => prev.filter((_, i) => i !== idx));

  const handleClose = () => {
    setExtras([]);
    setNewLabel('');
    setNewAmount('');
    setPaymentMethod('cash');
    onClose();
  };

  const handleSubmit = async () => {
    try {
      await checkOutMutation.mutateAsync({ id: booking.id, extraCharges: extras, paymentMethod } as any);
      onSuccess();
      handleClose();
    } catch {

    }
  };

  if (!isOpen || !booking) return null;

  const roomTotal = Number(booking.totalAmount ?? 0);
  const extraTotal = extras.reduce((sum, e) => sum + e.amount, 0);
  const nights = calcNights(booking.checkInDate, booking.checkOutDate);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-medium text-gray-800">Xác nhận Check-out</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {booking.room?.roomType?.typeName} — Phòng {booking.room?.roomNumber}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <hr className="border-gray-100 m-0 shrink-0" />

        {/* Body scrollable */}
        <div className="px-6 py-5 flex flex-col gap-5 overflow-y-auto flex-1">

          {/* Tiền phòng */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">
                Tiền phòng ({nights} đêm)
              </span>
              <span className="font-medium text-gray-800">
                {formatVND(roomTotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Nhận phòng</span>
              <span className="text-gray-600">{formatDate(booking.checkInDate)}</span>
            </div>
            <div className="flex justify-between text-sm mt-0.5">
              <span className="text-gray-500">Trả phòng</span>
              <span className="text-gray-600">{formatDate(booking.checkOutDate)}</span>
            </div>
            {booking.checkinNote && (
              <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-200">
                Ghi chú nhận phòng: {booking.checkinNote}
              </p>
            )}
          </div>

          {/* Phụ thu nhanh */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-gray-600">Thêm phụ thu nhanh</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_EXTRAS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => addExtra(q.label, q.amount)}
                  className="text-xs border border-gray-200 px-3 py-1.5 rounded-xl hover:border-primary hover:text-primary transition-colors text-gray-600"
                >
                  + {q.label} {q.amount > 0 ? `(${formatVND(q.amount)})` : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Thêm phụ thu thủ công */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-gray-600">Hoặc nhập phụ thu khác</p>
            <div className="flex gap-2">
              <input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Tên phụ thu"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <input
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="Số tiền"
                type="number"
                min={0}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                onClick={() => addExtra(newLabel, Number(newAmount))}
                disabled={!newLabel || !newAmount}
                className="bg-primary hover:bg-primary-dark disabled:opacity-40 text-white px-3 py-2 rounded-xl text-sm transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Danh sách phụ thu */}
          {extras.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-gray-600">Phụ thu phát sinh</p>
              {extras.map((e, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5"
                >
                  <span className="text-sm text-gray-700">{e.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-orange-700">
                      {formatVND(e.amount)}
                    </span>
                    <button
                      onClick={() => removeExtra(i)}
                      className="text-red-400 hover:text-red-600 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tổng cộng */}
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tiền phòng (đã thanh toán trước)</span>
              <span className="text-gray-600 font-medium">
                {formatVND(roomTotal)}
              </span>
            </div>
            {extraTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tổng phụ thu phát sinh</span>
                <span className="text-orange-600 font-medium">
                  {formatVND(extraTotal)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold text-gray-800 text-sm uppercase">Số tiền cần thu thêm</span>
              <span className="text-xl font-bold text-primary">
                {formatVND(extraTotal)}
              </span>
            </div>
            {extraTotal > 0 && (
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-700">Thanh toán phụ thu bằng</span>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white cursor-pointer"
                >
                  <option value="cash">Tiền mặt</option>
                  <option value="qr_code">Chuyển khoản (QR)</option>
                  <option value="card">Quẹt thẻ</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-100 m-0 shrink-0" />

        {/* Actions */}
        <div className="px-6 py-4 flex gap-3 justify-end shrink-0">
          <button
            onClick={handleClose}
            className="text-sm text-gray-500 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            disabled={checkOutMutation.isPending}
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2 rounded-xl flex items-center gap-2 transition-colors"
          >
            {checkOutMutation.isPending && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            Xác nhận Check-out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutModal;
</file>

<file path="src/components/common/BookingStatusBadge.tsx">
const BookingStatusBadge = ({ status }: { status: string }) => {
  const config = {
    pending_payment: { label: 'Chờ thanh toán', className: 'bg-yellow-50 text-yellow-700' },
    confirmed: { label: 'Đã xác nhận', className: 'bg-green-50 text-green-700' },
    checked_in: { label: 'Đang lưu trú', className: 'bg-blue-50 text-blue-700' },
    checked_out: { label: 'Đã trả phòng', className: 'bg-purple-50 text-purple-700' },
    cancelled: { label: 'Đã hủy', className: 'bg-gray-100 text-gray-500' },
  }[status] ?? { label: status, className: 'bg-gray-100 text-gray-500' };

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
};

export default BookingStatusBadge;
</file>

<file path="src/components/common/FullScreenLoader.tsx">
const FullScreenLoader = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default FullScreenLoader;
</file>

<file path="src/components/common/PaymentStatusBadge.tsx">
const PaymentStatusBadge = ({ paidAt }: { paidAt?: string | null }) => {
  if (!paidAt) {
    return (
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-orange-600">
        Chưa thanh toán
      </span>
    );
  }
  return (
    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-teal-50 text-teal-700">
      Đã thanh toán
    </span>
  );
};

export default PaymentStatusBadge;
</file>

<file path="src/components/customer/CancelBookingModal.tsx">
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { bookingService } from '../../services/booking.service';
import { useCancelBooking } from '../../hooks/mutations/use-booking.mutation';

interface Props {
  bookingId: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirmed: () => void;
}

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const CancelBookingModal = ({ bookingId, isOpen, onClose, onConfirmed }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['refund-preview', bookingId],
    queryFn: () => bookingService.getRefundPreview(bookingId),
    enabled: isOpen && !!bookingId,
  });

  const { mutate: cancel, isPending } = useCancelBooking();

  const handleConfirm = () => {
    cancel(
      { id: bookingId },
      {
        onSuccess: () => {
        onConfirmed();
        },
        onError: (err: any) => {
          const message = err?.response?.data?.message ?? 'Có lỗi xảy ra';
          toast.error(message);
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h3 className="text-base font-medium text-gray-800">
            Xác nhận hủy đặt phòng
          </h3>
          <button
            onClick={onClose}
            disabled={isPending}
            className="text-gray-400 hover:text-gray-600 text-sm disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 flex flex-col gap-4">
          {isLoading && (
            <div className="flex items-center justify-center py-8 gap-2">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-400">Đang tải thông tin hoàn tiền...</span>
            </div>
          )}

          {isError && (
            <p className="text-sm text-red-500 text-center py-4">
              Không thể tải thông tin hoàn tiền. Vui lòng thử lại.
            </p>
          )}

          {data && (
            <>
              {/* Policy */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="text-sm text-amber-700 font-normal leading-relaxed">
                  {data.refundPolicy}
                </p>
              </div>

              {/* Chi tiết tài chính */}
              {data.isPaid && (
                <div className="flex flex-col gap-2 text-sm border border-gray-100 rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tổng tiền đặt phòng</span>
                    <span className="text-gray-800 font-medium">
                      {formatVND(data.totalAmount)}
                    </span>
                  </div>
                  {data.penaltyAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phí hủy phòng</span>
                      <span className="text-red-500 font-medium">
                        - {formatVND(data.penaltyAmount)}
                      </span>
                    </div>
                  )}
                  <hr className="border-gray-100" />
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-800">Tiền hoàn lại</span>
                    <span className={data.refundAmount > 0 ? 'text-green-600' : 'text-gray-500'}>
                      {formatVND(data.refundAmount)}
                    </span>
                  </div>
                </div>
              )}

              {!data.isPaid && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <p className="text-sm text-green-700 font-normal">
                    Đơn chưa thanh toán, không có phí hủy.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Giữ nguyên
          </button>
          <button
            onClick={handleConfirm}
            disabled={isPending || isLoading || isError || !data}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
          >
            {isPending ? 'Đang hủy...' : 'Xác nhận hủy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
</file>

<file path="src/components/customer/CompareBar.tsx">
import { useNavigate, useLocation } from 'react-router-dom';
import { useCompareStore } from '../../stores/compareStore';

const PLACEHOLDER = 'https://placehold.co/60x60?text=Room';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const CompareBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, remove, clear } = useCompareStore();

  if (items.length === 0) return null;

  if (location.pathname !== '/rooms') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <span className="text-sm font-medium text-gray-800 shrink-0">
          So sánh ({items.length}/2):
        </span>

        {/* Danh sách đã chọn */}
        <div className="flex gap-3 flex-1">
          {items.map((room) => (
            <div
              key={room.id}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
            >
              <img
                src={room.images?.[0]?.imageUrl ?? PLACEHOLDER}
                alt=""
                className="w-8 h-8 rounded-lg object-cover shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                }}
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-800 truncate max-w-28">
                  {room.typeName}
                </p>
                <p className="text-xs text-primary">
                  {formatVND(Number(room.basePrice))}/đêm
                </p>
              </div>
              <button
                onClick={() => remove(room.id)}
                className="text-gray-400 hover:text-red-500 text-sm shrink-0 transition-colors"
              >
                ×
              </button>
            </div>
          ))}

          {/* Slot trống */}
          {items.length < 2 && (
            <div className="flex items-center justify-center w-40 h-12 border-2 border-dashed border-gray-200 rounded-xl">
              <span className="text-xs text-gray-400">+ Thêm 1 phòng nữa</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={clear}
            className="text-sm text-gray-400 hover:text-gray-600 px-3 py-2 transition-colors"
          >
            Xóa tất cả
          </button>
          <button
            onClick={() => navigate('/compare')}
            disabled={items.length < 2}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            So sánh ngay →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
</file>

<file path="src/components/customer/HotelCard.tsx">
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCompareStore } from '../../stores/compareStore';
import { useAuthStore } from '../../stores/authStore';
import { useCartStore } from '../../stores/cartStore';
import type { RoomType } from '../../types/hotel.types';

interface Props {
  roomType: RoomType;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

const PLACEHOLDER = 'https://placehold.co/400x300?text=No+Image';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const HotelCard = ({ roomType, checkIn, checkOut, guests }: Props) => {
  const navigate = useNavigate();
  const { add, remove, isSelected } = useCompareStore();
  const { user } = useAuthStore();
  const { addToCart, setBookingDetails } = useCartStore();
  const selected = isSelected(roomType.id);

  const image = roomType.images?.[0]?.imageUrl;
  const price = roomType.lowestPrice ?? roomType.basePrice;

  const handleClick = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', String(guests));
    const query = params.toString();
    // Đã sửa lại đường dẫn chuẩn khớp với app.routes.tsx
    navigate(`/room-type/${roomType.id}${query ? `?${query}` : ''}`);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!checkIn || !checkOut) {
      toast.error('Vui lòng chọn ngày nhận và trả phòng trước khi thêm vào giỏ.');
      return;
    }

    if (!user) {
      const params = new URLSearchParams();
      params.set('checkIn', checkIn);
      params.set('checkOut', checkOut);
      if (guests) params.set('guests', String(guests));
      const redirect = encodeURIComponent(`/room-type/${roomType.id}?${params.toString()}`);
      navigate(`/login?redirect=${redirect}`);
      return;
    }

    setBookingDetails({
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: guests || 1,
    });
    addToCart(roomType, 1);
    toast.success(`${roomType.typeName} đã được thêm vào giỏ hàng!`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={image ?? PLACEHOLDER}
          alt={roomType.typeName}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />

        {/* Nút so sánh — góc trên trái */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            selected ? remove(roomType.id) : add(roomType);
          }}
          className={`absolute top-2 left-2 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-all ${
            selected
              ? 'bg-primary text-white'
              : 'bg-white/90 text-gray-600 hover:bg-primary/10'
          }`}
        >
          {selected ? '✓ Đã chọn' : '+ So sánh'}
        </button>

        {/* Badge phòng trống */}
        {roomType.availableRoomCount !== undefined && (
          <span className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm ${
            roomType.availableRoomCount > 0
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-600'
          }`}>
            {roomType.availableRoomCount > 0
              ? `Còn ${roomType.availableRoomCount} phòng`
              : 'Hết phòng'}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-gray-800 font-medium text-base leading-snug">
            {roomType.typeName}
          </h3>
        </div>

        <div className="mb-2">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              {roomType.maxCapacity} khách
            </span>
            <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
              {roomType.maxCapacity <= 2 ? '25m²' : roomType.maxCapacity === 3 ? '35m²' : '50m²'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400">Từ </span>
            <p className="text-primary font-medium text-lg leading-tight">
              {formatVND(price)}
            </p>
            <span className="text-xs text-gray-400">/ đêm</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              disabled={roomType.availableRoomCount === 0}
              className="px-4 py-2 bg-white text-primary border border-primary text-sm font-medium rounded-xl cursor-pointer transition-colors hover:bg-blue-50 disabled:text-gray-300 disabled:border-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              Thêm vào giỏ
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl border-none cursor-pointer transition-colors"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
</file>

<file path="src/components/customer/ReviewForm.tsx">
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../../services/api';

interface ReviewFormProps {
  bookingId: number;
  onSuccess?: () => void;
}

const ReviewForm = ({ bookingId, onSuccess }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: () =>
      api.post(`/bookings/${bookingId}/review`, { rating, comment }),
    onSuccess: () => {
      toast.success('Cảm ơn bạn đã đánh giá!');
      queryClient.invalidateQueries(); 
      onSuccess?.();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? 'Có lỗi xảy ra');
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium text-gray-600">Đánh giá của bạn</p>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="text-2xl transition-colors"
          >
            <span className={star <= (hovered || rating) ? 'text-amber-400' : 'text-gray-200'}>
              ★
            </span>
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Chia sẻ trải nghiệm của bạn..."
        rows={3}
        className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
      />

      <button
        onClick={() => {
          if (rating === 0) {
            toast.error('Vui lòng chọn số sao');
            return;
          }
          submitReview();
        }}
        disabled={isPending || rating === 0}
        className="self-start px-4 py-2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
      >
        {isPending ? 'Đang gửi...' : 'Gửi đánh giá'}
      </button>
    </div>
  );
};

export default ReviewForm;
</file>

<file path="src/components/customer/ReviewList.tsx">
import React from 'react';
import { useRoomTypeReviews } from '../../hooks/queries/useBookingsQuery';

interface ReviewListProps {
  roomTypeId: number;
}

const getInitials = (name: string) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const ReviewList: React.FC<ReviewListProps> = ({ roomTypeId }) => {
  const { data, isLoading } = useRoomTypeReviews(roomTypeId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 bg-gray-50 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  const reviews: any[] = Array.isArray(data) 
    ? data 
    : ((data as any)?.reviews || (data as any)?.data || []);

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-3xl font-medium text-gray-800">
            {average.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500">
            {reviews.length} đánh giá
          </span>
        </div>

        <div className="flex items-center gap-0.5 text-amber-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-xl">
              {star <= Math.round(average) ? '★' : '☆'}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-400">Chưa có đánh giá nào</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                  {getInitials(review.user?.fullName)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">
                    {review.user?.fullName || 'Người dùng ẩn danh'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>{star <= review.rating ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {review.rating}/5
                </span>
              </div>

              {review.comment && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.comment}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
</file>

<file path="src/components/customer/RoomCard.tsx">
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../stores/searchStore';

const PLACEHOLDER = 'https://placehold.co/400x300?text=No+Image';

interface RoomCardProps {
  id: string;
  name: string;
  image?: string;
  price: number;
  maxCapacity?: number;
  availableRooms?: number;
}

const RoomCard = ({ id, name, image, price, maxCapacity, availableRooms }: RoomCardProps) => {
  const navigate = useNavigate();
  const { checkIn, checkOut, guests } = useSearchStore();
  
  const isSearching = !!(checkIn && checkOut);

  const handleCardClick = () => {
   if (checkIn && checkOut) {
      navigate(`/room-type/${id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
    } else {
      navigate(`/room-type/${id}`);
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full"
      onClick={handleCardClick} 
    >
      <div className="h-52 w-full bg-gray-100">
        <img 
          src={image || PLACEHOLDER} 
          alt={name} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          
          {(isSearching && availableRooms !== undefined) && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${
              availableRooms > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}>
              {availableRooms > 0 ? `Còn ${availableRooms} phòng` : 'Hết phòng'}
            </span>
          )}
        </div>

        {maxCapacity && (
          <div className="mb-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                {maxCapacity} khách
              </span>
              <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                {maxCapacity <= 2 ? '25m²' : maxCapacity === 3 ? '35m²' : '50m²'}
              </span>
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-0.5">Từ</span>
            <span className="text-[#004b8f] font-bold text-2xl leading-none">
              {Number(price).toLocaleString('vi-VN')}đ
            </span>
            <span className="text-xs text-gray-400 mt-1">/ đêm</span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
           className="px-5 py-2.5 bg-[#004b8f] text-white rounded-xl text-sm font-medium hover:bg-blue-900 transition-colors shrink-0 whitespace-nowrap"
          >
            Xem chi tiết
          </button> 
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
</file>

<file path="src/components/customer/RoomTypeCard.tsx">
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import type { RoomType } from '../../types/hotel.types';
import { toast } from 'sonner';
import { useSearchStore } from '../../stores/searchStore';

const PLACEHOLDER = 'https://placehold.co/400x300?text=No+Image';

interface RoomTypeCardProps {
  roomType: Omit<RoomType, 'rooms' | 'description'> & {
    rating?: number;
    reviewsCount?: number;
    availableRoomCount?: number;
  };
  onCompare?: (roomType: RoomTypeCardProps['roomType']) => void;
  showAddToCart?: boolean;
  showCompare?: boolean;
  useSearchQuery?: boolean;
}

const RoomTypeCard = ({
  roomType,
  onCompare,
  showAddToCart = false,
  showCompare = false,
  useSearchQuery = true,
}: RoomTypeCardProps) => {
  const navigate = useNavigate();
  const { addToCart, checkIn, checkOut, guests, setBookingDetails } = useCartStore();
  const searchStore = useSearchStore();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const ci = searchStore.checkIn ? new Date(searchStore.checkIn) : checkIn;
    const co = searchStore.checkOut ? new Date(searchStore.checkOut) : checkOut;

    if (!ci || !co) {
      toast.error('Vui lòng chọn ngày nhận và trả phòng trước khi thêm vào giỏ.');
      return;
    }

    setBookingDetails({ checkIn: ci, checkOut: co, guests: searchStore.guests || guests || 1 });
    addToCart(roomType, 1);
    toast.success(`${roomType.typeName} đã được thêm vào giỏ hàng!`);
  };

  const handleCompareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onCompare) {
      onCompare(roomType);
    }
  };
  
  const handleCardClick = () => {
    const searchParams = new URLSearchParams();
    if (useSearchQuery && checkIn && checkOut) {
      searchParams.set('checkIn', checkIn.toISOString().split('T')[0]);
      searchParams.set('checkOut', checkOut.toISOString().split('T')[0]);
    }
    if (useSearchQuery && guests) {
      searchParams.set('guests', guests.toString());
    }
    navigate(`/room-type/${roomType.id}?${searchParams.toString()}`);
  };

  const mainImage = roomType.images?.[0]?.imageUrl || PLACEHOLDER;

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full group"
      onClick={handleCardClick}
    >
      <div className="h-52 w-full bg-gray-100 overflow-hidden">
        <img 
          src={mainImage} 
          alt={roomType.typeName} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER; }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 flex-1">{roomType.typeName}</h3>
          
          {(useSearchQuery && roomType.availableRoomCount !== undefined) && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${
              roomType.availableRoomCount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}>
              {roomType.availableRoomCount > 0 ? `Còn ${roomType.availableRoomCount} phòng` : 'Hết phòng'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          {roomType.rating !== undefined && roomType.reviewsCount !== undefined && (
             <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 .5l2.939 5.455 6.572.955-4.756 4.635 1.123 6.545z"></path></svg>
                <span className="font-semibold">{roomType.rating.toFixed(1)}</span>
                <span className="text-gray-400">({roomType.reviewsCount})</span>
            </div>
          )}
           <span className="text-gray-300">•</span>
           <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                {roomType.maxCapacity} khách
              </span>
        </div>

        {roomType.amenities && roomType.amenities.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Tiện nghi:</p>
            <div className="flex flex-wrap gap-2">
              {roomType.amenities.slice(0, 3).map((amenity) => (
                <span key={amenity.id} className="bg-gray-50 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200">
                  {amenity.amenityName}
                </span>
              ))}
              {roomType.amenities.length > 3 && (
                <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200">
                  +{roomType.amenities.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-0.5">Từ</span>
            <span className="text-[#004b8f] font-bold text-2xl leading-none">
              {Number(roomType.basePrice).toLocaleString('vi-VN')}đ
            </span>
            <span className="text-xs text-gray-400 mt-1">/ đêm</span>
          </div>
          
          <div className="flex items-center gap-2">
            {showCompare && onCompare && (
              <button
                onClick={handleCompareClick}
                className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                title="So sánh"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662s.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.092-1.21.138-2.43.138-3.662z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
            {showAddToCart ? (
              <button 
                onClick={handleAddToCart}
                disabled={roomType.availableRoomCount === 0}
                className="px-4 py-2.5 bg-[#004b8f] text-white rounded-xl text-sm font-medium hover:bg-blue-900 transition-colors shrink-0 whitespace-nowrap disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Thêm vào giỏ
              </button>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
                className="px-4 py-2.5 bg-white text-[#004b8f] border border-[#004b8f] rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors shrink-0 whitespace-nowrap"
              >
                Xem chi tiết
              </button> 
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomTypeCard;
</file>

<file path="src/components/customer/SearchForm.tsx">
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import { useSearchStore } from '../../stores/searchStore';
import { toast } from 'sonner';

const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatCurrency = (value: number | undefined | null) => {
  if (value === undefined || value === null || isNaN(value)) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const parseCurrency = (value: string) => {
  const numericString = value.replace(/\D/g, '');
  if (!numericString) return undefined;
  return parseInt(numericString, 10);
};

const buildSearchSchema = (today: string) =>
  z.object({
    checkIn: z
      .string()
      .min(1, 'Vui lòng chọn ngày nhận phòng')
      .refine((d) => d >= today, 'Ngày nhận phòng phải từ hôm nay trở đi'),
    checkOut: z
      .string()
      .min(1, 'Vui lòng chọn ngày trả phòng'),
    guests: z
      .number()
      .int()
      .min(1, 'Số khách phải ít nhất là 1'),
    minPrice: z.number().min(0, 'Giá không hợp lệ').optional(),
    maxPrice: z.number().min(0, 'Giá không hợp lệ').optional(),
  })
  .refine((d) => d.checkOut > d.checkIn, {
    message: 'Ngày trả phòng phải sau ngày nhận phòng',
    path: ['checkOut'],
  })
  .refine((d) => {
    if (d.minPrice !== undefined && d.maxPrice !== undefined) {
      return d.maxPrice >= d.minPrice;
    }
    return true;
  }, {
    message: 'Giá đến phải lớn hơn hoặc bằng giá từ',
    path: ['maxPrice'],
  });

type SearchFormValues = z.infer<ReturnType<typeof buildSearchSchema>>;

interface SearchFormProps {
  compact?: boolean;
}

const inputClass = (compact: boolean) =>
  `border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors w-full ${
    compact ? 'text-xs' : 'text-sm'
  }`;

const SearchForm = ({ compact = false }: SearchFormProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const today = getToday();
  const setSearchData = useSearchStore((state) => state.setSearchData);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(buildSearchSchema(today)),
    defaultValues: {
      checkIn: searchParams.get('checkIn') || '',
      checkOut: searchParams.get('checkOut') || '',
      guests: Number(searchParams.get('guests')) || 1,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    },
  });

  const checkIn = watch('checkIn');
  const watchedValues = watch();

  useEffect(() => {
    setSearchData({
      checkIn: watchedValues.checkIn,
      checkOut: watchedValues.checkOut,
      guests: watchedValues.guests,
    });
  }, [watchedValues.checkIn, watchedValues.checkOut, watchedValues.guests, setSearchData]);

  const getMinCheckOut = (checkIn: string): string => {
    if (!checkIn) return getToday();
    const date = new Date(checkIn);
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const minCheckOut = getMinCheckOut(checkIn);
  
  const toLocalDateString = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onSubmit = (data: SearchFormValues) => {
    if (data.guests > 10) {
      setShowGroupModal(true);
      return;
    }

    const params = new URLSearchParams({
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: String(data.guests),
    });

    if (data.minPrice) params.set('minPrice', String(data.minPrice));
    if (data.maxPrice) params.set('maxPrice', String(data.maxPrice));

    navigate(`/rooms?${params.toString()}`);
  };

  if (compact) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap gap-2 items-end"
      >
        <div className="flex flex-col gap-1 w-32">
          <label className="text-xs text-gray-400">Nhận phòng</label>
          <Controller
            control={control}
            name="checkIn"
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(toLocalDateString(date))}
                dateFormat="dd/MM/yyyy"
                minDate={new Date(today)}
                placeholderText="dd/mm/yyyy"
                className={inputClass(true)}
                wrapperClassName="w-full"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-1 w-32">
          <label className="text-xs text-gray-400">Trả phòng</label>
          <Controller
            control={control}
            name="checkOut"
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(toLocalDateString(date))}
                dateFormat="dd/MM/yyyy"
                minDate={new Date(minCheckOut)}
                placeholderText="dd/mm/yyyy"
                className={inputClass(true)}
                wrapperClassName="w-full"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-1 w-20">
          <label className="text-xs text-gray-400">Số khách</label>
          <input
            type="number"
            min={1}
            className={inputClass(true)}
            {...register('guests', { valueAsNumber: true })}
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-medium rounded-xl transition-colors whitespace-nowrap"
        >
          Cập nhật
        </button>
      </form>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-800">Ngày nhận phòng</label>
          <Controller
            control={control}
            name="checkIn"
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(toLocalDateString(date))}
                dateFormat="dd/MM/yyyy"
                minDate={new Date(today)}
                placeholderText="dd/mm/yyyy"
                className={inputClass(false)}
                wrapperClassName="w-full"
              />
            )}
          />
          {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-800">Ngày trả phòng</label>
          <Controller
            control={control}
            name="checkOut"
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(toLocalDateString(date))}
                dateFormat="dd/MM/yyyy"
                minDate={new Date(minCheckOut)}
                placeholderText="dd/mm/yyyy"
                className={inputClass(false)}
                wrapperClassName="w-full"
              />
            )}
          />
          {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-800">Số khách</label>
          <input
            type="number"
            min={1}
            className={inputClass(false)}
            {...register('guests', { valueAsNumber: true })}
          />
          {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3 relative">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800 line-clamp-1">Giá từ (VNĐ)</label>
            <Controller
              control={control}
              name="minPrice"
              render={({ field: { onChange, value } }) => (
                <input
                  type="text"
                  placeholder="Min"
                  value={formatCurrency(value)}
                  onChange={(e) => onChange(parseCurrency(e.target.value))}
                  className={`${inputClass(false)} placeholder:text-gray-300`}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800 line-clamp-1">Giá đến (VNĐ)</label>
            <Controller
              control={control}
              name="maxPrice"
              render={({ field: { onChange, value } }) => (
                <input
                  type="text"
                  placeholder="Max"
                  value={formatCurrency(value)}
                  onChange={(e) => onChange(parseCurrency(e.target.value))}
                  className={`${inputClass(false)} placeholder:text-gray-300 ${
                    errors.maxPrice 
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                      : ''
                  }`}
                />
              )}
            />
          </div>
          
          {errors.maxPrice && (
            <p className="text-red-500 text-xs absolute -bottom-5 left-0 w-full whitespace-nowrap">
              {errors.maxPrice.message}
            </p>
          )}
        </div>

        <div className="flex items-end h-full pt-[28px]">
          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl border-none cursor-pointer transition-colors"
          >
            Tìm phòng
          </button>
        </div>
      </form>

      {showGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowGroupModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">Đặt phòng cho nhóm lớn</h2>
            <p className="text-sm text-gray-500 mb-4">
              Với nhóm {watch('guests')} khách, vui lòng để lại thông tin. 
              Chuyên viên kinh doanh của chúng tôi sẽ liên hệ báo giá ưu đãi và sắp xếp phòng gần nhau cho bạn.
            </p>
            
            <input placeholder="Tên công ty/Trưởng đoàn" className="border p-2 w-full mb-3 rounded-md" />
            <input placeholder="Số điện thoại" className="border p-2 w-full mb-3 rounded-md" />
            <textarea placeholder="Yêu cầu đặc biệt (Gala dinner, xe đưa đón...)" className="border p-2 w-full mb-3 rounded-md min-h-[80px]" />
            
            <button 
              onClick={() => {
                toast.success('Yêu cầu báo giá của bạn đã được gửi đi. Chúng tôi sẽ liên hệ lại sớm nhất!');
                setShowGroupModal(false);
              }} 
              className="bg-primary text-white w-full py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Gửi yêu cầu báo giá
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchForm;
</file>

<file path="src/hooks/mutations/use-booking.mutation.ts">
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { bookingService } from '../../services/booking.service';
import type { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { BookingStatus } from '../../types/booking.types';

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: bookingService.create,
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason?: string }) =>
      bookingService.cancel(id, reason),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', 'my'] });
      toast.success('Hủy đặt phòng thành công');
    },

    onError: (err: AxiosError<{ message: string }>) => {
      const message = err.response?.data?.message ?? 'Có lỗi xảy ra, vui lòng thử lại';
      toast.error(message);
    },
  });
};

export const useMyBookings = (status?: BookingStatus) => {
  return useQuery({
    queryKey: ['bookings', 'my', status],
    queryFn: () => bookingService.getMyBookings(status),
  });
};

export const useBookingDetail = (id: number) => {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: () => bookingService.getById(id),
    enabled: !!id, 
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      bookingId,
      data,
    }: {
      bookingId: number
      data: {
        rating: number
        comment?: string
      }
    }) => bookingService.createReview(bookingId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookings', 'my'],
      })

      toast.success('Cảm ơn bạn đã đánh giá!')
    },

    onError: (e: any) =>
      toast.error(
        e.response?.data?.message ?? 'Gửi đánh giá thất bại'
      ),
  })
}
</file>

<file path="src/hooks/mutations/useAdminBookingMutation.ts">
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminService } from '../../services/adminService';
import type { AxiosError } from 'axios';

const useInvalidateAdminBookings = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['admin', 'bookings'] });
};

const handleError = (err: AxiosError<{ message: string }>) => {
  const message = err.response?.data?.message ?? 'Có lỗi xảy ra, vui lòng thử lại';
  toast.error(message);
};

export const useCheckIn = () => {
  const invalidate = useInvalidateAdminBookings();

  return useMutation({
    mutationFn: ({
      id,
      idNumber,
      checkinNote,
    }: {
      id: number;
      idNumber?: string;
      checkinNote?: string;
    }) => adminService.checkIn(id, { idNumber, checkinNote }),
    onSuccess: () => {
      invalidate();
      toast.success('Check-in thành công');
    },
    onError: handleError,
  });
};

export const useCheckOut = () => {
  const invalidate = useInvalidateAdminBookings();

  return useMutation({
    mutationFn: ({
      id,
      extraCharges,
    }: {
      id: number;
      extraCharges: { label: string; amount: number }[];
    }) => adminService.checkOut(id, extraCharges),
    onSuccess: () => {
      invalidate();
      toast.success('Check-out thành công');
    },
    onError: handleError,
  });
};

export const useCancelAdminBooking = () => {
  const invalidate = useInvalidateAdminBookings();

  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason?: string }) =>
      adminService.cancelBooking(id, reason),
    onSuccess: () => {
      invalidate();
      toast.success('Hủy đặt phòng thành công');
    },
    onError: handleError,
  });
};

export const useCreateOfflineBooking = () => {
  const invalidate = useInvalidateAdminBookings();

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      adminService.createOfflineBooking(data),
    onSuccess: () => {
      invalidate();
      toast.success('Tạo đơn tại quầy thành công');
    },
    onError: handleError,
  });
};
</file>

<file path="src/hooks/mutations/usePaymentMutation.ts">
import { useMutation } from '@tanstack/react-query';
import { paymentService } from '../../services/payment.service';

export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: paymentService.initiate,
  });
};

export const useSimulatePayment = () => {
  return useMutation({
    mutationFn: paymentService.simulateSuccess,
  });
};
</file>

<file path="src/hooks/mutations/useRoomTypeMutation.ts">
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import toast from 'react-hot-toast'

const invalidate = (queryClient: any) =>
  queryClient.invalidateQueries({
    queryKey: ['admin', 'room-types'],
  })

export const useCreateRoomType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: FormData) =>
      adminService.createRoomType(data),

    onSuccess: () => {
      invalidate(queryClient)
      toast.success('Tạo hạng phòng thành công')
    },

    onError: (e: any) =>
      toast.error(
        e.response?.data?.message ?? 'Tạo thất bại'
      ),
  })
}

export const useUpdateRoomType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: FormData
    }) =>
      adminService.updateRoomType(id, data),

    onSuccess: () => {
      invalidate(queryClient)
      toast.success('Cập nhật hạng phòng thành công')
    },

    onError: (e: any) =>
      toast.error(
        e.response?.data?.message ?? 'Cập nhật thất bại'
      ),
  })
}

export const useDeleteRoomType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) =>
      adminService.deleteRoomType(id),

    onSuccess: () => {
      invalidate(queryClient)
      toast.success('Đã xóa hạng phòng')
    },

    onError: (e: any) =>
      toast.error(
        e.response?.data?.message ?? 'Xóa thất bại'
      ),
  })
}

export const useUpdateRoomStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number
      status: string
    }) =>
      adminService.updateRoomStatus(id, status),

    onSuccess: () => {
      invalidate(queryClient)
      toast.success(
        'Cập nhật trạng thái phòng thành công'
      )
    },

    onError: (e: any) => {
      if (e.response?.status === 409) {
        toast.error('Dữ liệu vừa bị thay đổi bởi người khác. Đang tải lại...');
        invalidate(queryClient); 
      } else {
        toast.error(e.response?.data?.message ?? 'Cập nhật thất bại');
      }
    },
  })
}
</file>

<file path="src/hooks/queries/use-booking.query.ts">
import { useQuery } from '@tanstack/react-query';
import { bookingService, GetPreviewParams } from '../../services/booking.service';

const bookingKeys = {
  all: ['bookings'] as const,
  previews: () => [...bookingKeys.all, 'previews'] as const,
  preview: (params: GetPreviewParams) => [...bookingKeys.previews(), params] as const,
};

export const useBookingPreview = (params: GetPreviewParams) => {
  return useQuery({
    queryKey: bookingKeys.preview(params),
    queryFn: () => bookingService.getBookingPreview(params),
    enabled: !!params.checkInDate && !!params.checkOutDate && params.rooms.length > 0,
  });
};
</file>

<file path="src/hooks/queries/use-hotels.query.ts">
import { useQuery } from '@tanstack/react-query'
import { hotelService } from '../../services/hotel.service'
import type { SearchParams } from '../../types/hotel.types'

export const useAvailableRooms = (
  params: Partial<SearchParams>
) =>
  useQuery({
    queryKey: ['hotels', 'available', params],

    queryFn: () =>
      hotelService.getAvailable(params as SearchParams),

    enabled:
      !!params.checkIn &&
      !!params.checkOut &&
      !!params.guests,
  })

export const useRoomTypeDetail = (id: number) =>
  useQuery({
    queryKey: ['hotels', id],

    queryFn: () =>
      hotelService.getById(id),

    enabled: !!id,
  })

export const useAllRoomTypes = () =>
  useQuery({
    queryKey: ['hotels', 'all'],
    queryFn: () => hotelService.getAll(), 
  });
</file>

<file path="src/hooks/queries/useAdminBookingsQuery.ts">
import { useQuery } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';

export const useAdminBookings = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['admin', 'bookings', filters],
    queryFn: () => adminService.getBookings(filters),
    refetchInterval: 10000,
  });
};

export const useAdminRoomTypes = () => {
  return useQuery({
    queryKey: ['admin', 'room-types'],
    queryFn: () => adminService.getRoomTypes(),
  });
};

export const useRevenueReport = (from: string, to: string) => {
  return useQuery({
    queryKey: ['admin', 'reports', 'revenue', from, to],
    queryFn: () => adminService.getRevenueReport(from, to),
    enabled: !!from && !!to && from < to,
  });
};

//Sơ đồ phòng Realtime 
export const useRoomOverview = () => {
  return useQuery({
    queryKey: ['admin', 'rooms', 'overview'],
    queryFn: () => adminService.getRoomOverview(),
    refetchInterval: 30000, 
  });
};
</file>

<file path="src/hooks/queries/useBookingsQuery.ts">
import { useQuery } from '@tanstack/react-query';
import { bookingService } from '../../services/booking.service';
import { paymentService } from '../../services/payment.service';
import type { BookingStatus } from '../../types/booking.types';

export const useMyBookings = (status?: BookingStatus) => {
  return useQuery({
    queryKey: ['bookings', 'my', status],
    queryFn: () => bookingService.getMyBookings(status),
  });
};

export const usePaymentStatus = (bookingId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ['payment', 'status', bookingId],
    queryFn: () => paymentService.getStatus(bookingId),
    enabled,
  });
};

export const useRoomTypeReviews = (roomTypeId: number) =>
  useQuery({
    queryKey: ['reviews', roomTypeId],
    queryFn: () => bookingService.getReviewsByRoomType(roomTypeId),
    enabled: !!roomTypeId,
  });
</file>

<file path="src/hooks/useSocketBooking.ts">
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socketService, SOCKET_EVENTS } from '../services/socketService';
import type { BookingStatus } from '../types/booking.types';

interface BookingUpdatePayload {
  status: BookingStatus;
  roomId?: number;
  roomStatus?: string;
}

export interface NewBookingPayload {
  bookingId: number;
  roomTypeName: string;
  guestName: string;
  checkInDate: string;
}

export const useSocketAllBookings = (bookingIds: number[] = []): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socketService.socket.connected) {
      socketService.connect('customer');
    }

    bookingIds.forEach((id) => {
      if (id) socketService.joinBooking(id);
    });

    const handleUpdate = (_data: BookingUpdatePayload) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    };

    socketService.on(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);

    return () => {
      socketService.off(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);
    };
  }, [queryClient, JSON.stringify(bookingIds)]);
};

export const useSocketBooking = (bookingId: number): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!bookingId) return;

    if (!socketService.socket.connected) {
      socketService.connect('customer');
    }

    socketService.joinBooking(bookingId);

    const handleUpdate = (_data: BookingUpdatePayload) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      queryClient.invalidateQueries({ queryKey: ['admin-booking-detail', String(bookingId)] });
    };

    socketService.on(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);
    
    socketService.on(SOCKET_EVENTS.PAYMENT_CONFIRMED, () => {
      queryClient.invalidateQueries({ queryKey: ['payment', 'status', bookingId] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    });

    return () => {
      socketService.off(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);
      socketService.off(SOCKET_EVENTS.PAYMENT_CONFIRMED);
    };
  }, [bookingId, queryClient]);
};

export const useSocketNewBooking = (
  onNewBooking: (payload: NewBookingPayload) => void
): void => {
  useEffect(() => {
    socketService.on(
      SOCKET_EVENTS.BOOKING_NEW,
      onNewBooking as (data: unknown) => void
    );
    
    return () => {
      socketService.off(SOCKET_EVENTS.BOOKING_NEW);
    };
  }, [onNewBooking]);
};
</file>

<file path="src/index.css">
@import "tailwindcss";

@theme {
  --color-primary: #0f4c81;
  --color-primary-dark: #0a3660;
  --color-accent: #c9a227;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
}
</file>

<file path="src/layouts/AdminLayout.tsx">
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

  const [notifications, setNotifications] = useState<NewBookingPayload[]>([]);
  const [showNotif, setShowNotif] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notifRef = useRef<HTMLDivElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const isAdmin = user?.role === 'admin';

 
  const handleNewBooking = useCallback((payload: NewBookingPayload) => {
    setNotifications((prev) => [payload, ...prev].slice(0, 20));
    setUnreadCount((prev) => prev + 1);

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
</file>

<file path="src/layouts/AuthLayout.tsx">
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
</file>

<file path="src/layouts/CustomerLayout.tsx">
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
</file>

<file path="src/main.tsx">
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
</file>

<file path="src/pages/admin/AmenityListPage.tsx">
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminService } from '../../services/adminService';

interface Amenity {
  id: number;
  amenityName: string;
  description: string | null;
}

const AmenityListPage = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [amenityName, setAmenityName] = useState('');
  const [description, setDescription] = useState('');

  const { data: amenities, isLoading } = useQuery<Amenity[]>({
    queryKey: ['admin', 'amenities'],
    queryFn: () => adminService.getAmenities(),
  });

  const { mutate: createAmenity, isPending: isCreating } = useMutation({
    mutationFn: (data: { amenityName: string; description?: string }) =>
      adminService.createAmenity(data),
    onSuccess: () => {
      toast.success('Thêm tiện ích thành công');
      queryClient.invalidateQueries({ queryKey: ['admin', 'amenities'] });
      setIsFormOpen(false);
      setAmenityName('');
      setDescription('');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi thêm tiện ích');
    },
  });

  const { mutate: deleteAmenity } = useMutation({
    mutationFn: (id: number) => adminService.deleteAmenity(id),
    onSuccess: () => {
      toast.success('Xóa tiện ích thành công');
      queryClient.invalidateQueries({ queryKey: ['admin', 'amenities'] });
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi xóa tiện ích');
    },
  });

  const handleSave = () => {
    if (!amenityName.trim()) {
      toast.error('Vui lòng nhập tên tiện ích');
      return;
    }
    createAmenity({ amenityName: amenityName.trim(), description: description.trim() });
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setAmenityName('');
    setDescription('');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tiện ích này?')) {
      deleteAmenity(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý tiện ích</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer border-none"
        >
          Thêm tiện ích
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên tiện ích <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={amenityName}
                onChange={(e) => setAmenityName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isCreating}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 border-none cursor-pointer"
            >
              Lưu
            </button>
            <button
              onClick={handleCancel}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4 flex justify-between items-center bg-white animate-pulse">
              <div className="w-full pr-4">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
              <div className="w-10 h-6 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      ) : !amenities || amenities.length === 0 ? (
        <div className="text-center py-12 border border-gray-100 rounded-xl bg-white">
          <p className="text-gray-500 text-sm font-medium">Chưa có tiện ích</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="border border-gray-100 rounded-xl p-4 flex justify-between items-center bg-white"
            >
              <div className="pr-4 flex-1">
                <h3 className="text-sm font-medium text-gray-800">{amenity.amenityName}</h3>
                {amenity.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{amenity.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(amenity.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap border-none bg-transparent cursor-pointer"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AmenityListPage;
</file>

<file path="src/pages/admin/BookingDetailPage.tsx">
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '../../services/booking.service';
import api from '../../services/api';
import { toast } from 'sonner';
import { 
  useCancelAdminBooking 
} from '../../hooks/mutations/useAdminBookingMutation';
import { formatVND, formatDate } from '../../utils/format';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Booking } from '../../types/booking.types';
import CheckInModal from '../../components/admin/CheckInModal';
import CheckOutModal from '../../components/admin/CheckOutModal';

type BookingDetail = Booking & {
  customer?: {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
  };
  totalPrice?: number;
  paymentMethod?: string;
  paymentDeadline?: string | Date;
  totalNights?: number;
};
// ── UTILS ──
const formatDateTime = (dateStr: string | Date) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('vi-VN', { 
    hour: '2-digit', minute: '2-digit', 
    day: '2-digit', month: '2-digit', year: 'numeric' 
  });
};

const calcNights = (checkIn: string, checkOut: string): number =>
  Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
  );

const exportInvoice = (booking: BookingDetail) => {
  const doc = new jsPDF();
  const primary: [number, number, number] = [15, 76, 129];

  // Header
  doc.setFillColor(...primary);
  doc.rect(0, 0, 210, 35, 'F');

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('HOA DON DAT PHONG', 14, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Hotel Booking System', 14, 27);

  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(`#${booking.id}`, 196, 22, { align: 'right' });

  // Thong tin khach
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('THONG TIN KHACH HANG', 14, 50);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(`Ho ten:        ${booking.customer?.fullName ?? ''}`, 14, 60);
  doc.text(`So dien thoai: ${booking.customer?.phoneNumber ?? ''}`, 14, 67);
  doc.text(`Email:         ${booking.customer?.email ?? ''}`, 14, 74);

  // Thong tin dat phong
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('THONG TIN DAT PHONG', 14, 90);

  autoTable(doc, {
    startY: 95,
    head: [['Hang phong', 'So phong', 'Nhan phong', 'Tra phong', 'So dem', 'So khach']],
    body: [[
      booking.room?.roomType?.typeName ?? '',
      booking.room?.roomNumber ?? '',
      formatDate(booking.checkInDate),
      formatDate(booking.checkOutDate),
      String(calcNights(booking.checkInDate, booking.checkOutDate)),
      String(booking.guestCount),
    ]],
    headStyles: { fillColor: primary, fontSize: 9 },
    bodyStyles: { fontSize: 10 },
    margin: { left: 14 },
  });

  // Thanh toan
  const finalY = (doc as any).lastAutoTable.finalY + 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('THANH TOAN', 14, finalY);

  const paymentMethod = booking.payments?.[0]?.method;
  const paymentStatus = booking.payments?.[0]?.status;

  const methodLabel =
    paymentMethod === 'qr_code'
      ? 'Chuyen khoan QR'
      : paymentMethod === 'cash'
      ? 'Tien mat'
      : paymentMethod === 'card'
      ? 'Quet the'
      : '';

  const statusLabel = paymentStatus === 'success' ? 'Da thanh toan' : (paymentStatus ?? '');
  const amount = booking.totalPrice ?? booking.totalAmount ?? 0;

  autoTable(doc, {
    startY: finalY + 5,
    head: [['Noi dung', 'So tien']],
    body: [
      ['Tien phong', formatVND(amount)],
      ['Phuong thuc', methodLabel],
      ['Trang thai', statusLabel],
    ],
    headStyles: { fillColor: primary, fontSize: 9 },
    bodyStyles: { fontSize: 10 },
    columnStyles: { 1: { halign: 'right' } },
    margin: { left: 14 },
  });

  // Tong tien
  const payY = (doc as any).lastAutoTable.finalY + 8;
  doc.setFillColor(240, 247, 255);
  doc.rect(14, payY - 5, 182, 16, 'F');

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primary);
  doc.text('TONG CONG:', 18, payY + 5);
  doc.text(formatVND(amount), 196, payY + 5, { align: 'right' });

  // Footer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(150, 150, 150);
  const footY = doc.internal.pageSize.height - 15;
  doc.text(
    'Cam on quy khach da lua chon Hotel Booking!',
    105, footY, { align: 'center' }
  );
  doc.text(
    `Ngay xuat: ${new Date().toLocaleDateString('vi-VN')}`,
    105, footY + 6, { align: 'center' }
  );

  doc.save(`hoa-don-booking-${booking.id}.pdf`);
};

// ── CONSTANTS ──
const STATUS_MAP: Record<string, { label: string, color: string }> = {
  pending_payment: { label: 'Chờ thanh toán', color: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-green-50 text-green-700 ring-green-600/20' },
  checked_in: { label: 'Đang ở', color: 'bg-blue-50 text-blue-700 ring-blue-600/20' },
  checked_out: { label: 'Đã trả phòng', color: 'bg-purple-50 text-purple-700 ring-purple-600/20' },
  cancelled: { label: 'Đã hủy', color: 'bg-gray-50 text-gray-500 ring-gray-500/20' },
};

const SOURCE_MAP: Record<string, { label: string, color: string }> = {
  online: { label: 'Trực tuyến', color: 'bg-blue-50 text-blue-700' },
  offline: { label: 'Tại quầy', color: 'bg-orange-50 text-orange-700' },
};

const PAYMENT_MAP: Record<string, string> = {
  cash: 'Tiền mặt',
  card: 'Thẻ ngân hàng',
  qr_code: 'Chuyển khoản QR',
  transfer: 'Chuyển khoản',
};

const DetailRow = ({ label, value, isBold = false }: { label: string; value: React.ReactNode; isBold?: boolean }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-sm text-gray-500">{label}</span>
    <span className={`text-sm ${isBold ? 'font-bold text-gray-800' : 'font-medium text-gray-800'}`}>
      {value}
    </span>
  </div>
);

const BookingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [checkinTarget, setCheckinTarget] = useState<any>(null);
  const [checkoutTarget, setCheckoutTarget] = useState<any>(null);

 
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-booking-detail', id],
    queryFn: () => bookingService.getById(Number(id)),
    enabled: !!id,
  });
  const booking = data as BookingDetail;

  const { mutate: cancelBooking, isPending: isCancelling } = useCancelAdminBooking();

  const { mutate: confirmRefund, isPending: isConfirmingRefund } = useMutation({
    mutationFn: (paymentId: number) => api.patch(`/admin/payments/${paymentId}/confirm-refund`),
    onSuccess: () => {
      toast.success('Xác nhận hoàn tiền thành công');
      queryClient.invalidateQueries({ queryKey: ['admin-booking-detail', id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'bookings'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi xác nhận hoàn tiền');
    }
  });

  const refundPayment = booking?.payments?.find(
    (p: any) => p.feeType === 'refund'
  );

  const bookingPayment = booking?.payments?.find((p: any) => p.feeType === 'booking') || booking?.payments?.[0];
  const PAY_METHOD = PAYMENT_MAP[bookingPayment?.method ?? booking?.paymentMethod] ?? bookingPayment?.method ?? booking?.paymentMethod ?? '—';

  const getPaymentStatus = () => {
    if (!booking) return { label: '—', color: 'bg-gray-100 text-gray-500' };

    if (booking.status === 'cancelled') {
      const isRefunded = booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'refunded');
      if (isRefunded) return { label: 'Đã hoàn tiền', color: 'bg-gray-100 text-gray-600' };
      
      const isPendingRefund = booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'pending_refund');
      if (isPendingRefund) return { label: 'Chờ hoàn tiền', color: 'bg-orange-100 text-orange-700' };
      
      return { label: 'Đã hủy', color: 'bg-gray-100 text-gray-500' };
    }
    
    if (booking.paidAt || booking.payments?.some((p: any) => p.feeType === 'booking' && p.status === 'success')) {
      return { label: 'Đã thanh toán', color: 'bg-green-100 text-green-700' };
    }
    
    return { label: 'Chờ thanh toán', color: 'bg-yellow-100 text-yellow-700' };
  };

  const PAY_STATUS = getPaymentStatus();

  const isPaid = booking?.payments?.some((p: any) => p.status === 'success') ?? false;

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
      
      {/*HEADER*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Chi tiết đơn đặt phòng</h2>
        </div>

        {isPaid && (
          <button
            onClick={() => exportInvoice(booking)}
            className="flex items-center justify-center gap-2 text-sm font-medium text-white bg-primary px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors shadow-sm w-fit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Xuất hóa đơn PDF
          </button>
        )}
      </div>

      {/* ── STATES ── */}
      {isLoading && (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center text-red-500 text-sm">
          Đã xảy ra lỗi khi tải dữ liệu đơn đặt phòng.
        </div>
      )}

      {/* ── CONTENT ── */}
      {!isLoading && !isError && booking && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col">
          
          {/* Header Card & Actions */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 rounded-t-2xl">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Mã Đơn</span>
              <span className="text-xl font-bold text-gray-800">#{booking.id}</span>
            </div>
            
            <div className="flex flex-col sm:items-end gap-3">
              {/* Badges */}
              <div className="flex gap-2">
                <span className={`text-xs font-medium px-3 py-1.5 rounded-lg ${SOURCE_MAP[booking.source]?.color ?? 'bg-gray-100 text-gray-500'}`}>
                  {SOURCE_MAP[booking.source]?.label ?? booking.source}
                </span>
                <span className={`text-xs font-medium px-3 py-1.5 rounded-lg ring-1 ${STATUS_MAP[booking.status]?.color ?? 'bg-gray-100 text-gray-500 ring-gray-200'}`}>
                  {STATUS_MAP[booking.status]?.label ?? booking.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-1">
                {/* Hủy (Chỉ offline + Đang chờ/Đã xác nhận) */}
                {booking.source === 'offline' && ['pending_payment', 'confirmed'].includes(booking.status) && (
                  <button
                    onClick={() => {
                      if (window.confirm('Bạn có chắc chắn muốn hủy đơn đặt phòng này?')) {
                        cancelBooking({ id: booking.id });
                      }
                    }}
                    disabled={isCancelling}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
                  >
                    {isCancelling ? 'Đang hủy...' : 'Hủy đơn'}
                  </button>
                )}

                {/* Check-in (Chỉ khi đã xác nhận) */}
                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => setCheckinTarget(booking)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 shadow-sm shadow-green-600/20"
                  >
                    Check-in
                  </button>
                )}

                {/* Check-out (Chỉ khi đang ở) */}
                {booking.status === 'checked_in' && (
                  <button
                    onClick={() => setCheckoutTarget(booking)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 shadow-sm shadow-purple-600/20"
                  >
                    Check-out
                  </button>
                )}

                {/* Xác nhận hoàn tiền */}
                {refundPayment?.status === 'pending_refund' && (
                  <button
                    onClick={() => {
                      if (window.confirm('Bạn xác nhận đã hoàn tiền cho khách hàng này?')) {
                        confirmRefund(refundPayment.id);
                      }
                    }}
                    disabled={isConfirmingRefund}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 shadow-sm shadow-blue-600/20"
                  >
                    {isConfirmingRefund ? 'Đang xử lý...' : 'Xác nhận hoàn tiền'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-8">
            
            {/* Timestamps & Info */}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 px-2">
                <div>
                  <div className="text-xs text-gray-500">Ngày tạo đơn</div>
                  <div className="text-sm font-medium text-gray-800">{formatDateTime(booking.createdAt)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Hạn thanh toán</div>
                  <div className="text-sm font-medium text-gray-800">{booking.paymentDeadline ? formatDateTime(booking.paymentDeadline) : '—'}</div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border border-primary/10">
                <div>
                  <div className="text-xs text-primary/70">Check-in</div>
                  <div className="text-sm font-semibold text-primary-dark">{formatDate(booking.checkInDate)}</div>
                </div>
                <div>
                  <div className="text-xs text-primary/70">Check-out</div>
                  <div className="text-sm font-semibold text-primary-dark">{formatDate(booking.checkOutDate)}</div>
                </div>
                <div>
                  <div className="text-xs text-primary/70">Thời gian</div>
                  <div className="text-sm font-semibold text-primary-dark">{booking.totalNights ?? 1} đêm</div>
                </div>
                <div>
                  <div className="text-xs text-primary/70">Số khách</div>
                  <div className="text-sm font-semibold text-primary-dark">{booking.guestCount ?? 1} người</div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Customer & Room Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Khách hàng</h3>
                <DetailRow label="Họ và tên" value={booking.customer?.fullName ?? '—'} />
                <DetailRow label="Số điện thoại" value={booking.customer?.phoneNumber ?? '—'} />
                <DetailRow label="Email" value={<span className="truncate max-w-[150px] inline-block align-bottom" title={booking.customer?.email}>{booking.customer?.email ?? '—'}</span>} />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phòng lưu trú</h3>
                <DetailRow label="Hạng phòng" value={booking.room?.roomType?.typeName ?? '—'} />
                <DetailRow label="Số phòng" value={booking.room?.roomNumber ?? 'Chưa xếp'} />
                <DetailRow label="Tầng" value={booking.room?.floor ?? '—'} />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Payment */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Thanh toán</h3>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex flex-col gap-2">
                <DetailRow 
                  label="Phương thức" 
                  value={PAY_METHOD} 
                />
                <DetailRow 
                  label="Trạng thái" 
                  value={
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${PAY_STATUS.color}`}>
                      {PAY_STATUS.label}
                    </span>
                  } 
                />
                
                {/* HIỂN THỊ THÊM THỜI GIAN / MÃ GIAO DỊCH GỐC (NẾU CÓ) */}
                {bookingPayment?.paidAt && (
                  <DetailRow 
                    label="Thời gian thanh toán" 
                    value={formatDate(bookingPayment.paidAt)} 
                  />
                )}
                {bookingPayment?.transactionRef && (
                  <DetailRow 
                    label="Mã giao dịch" 
                    value={<span className="font-mono text-xs text-gray-600">{bookingPayment.transactionRef.slice(0, 20)}...</span>} 
                  />
                )}

                <div className="h-px bg-gray-200 w-full my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-800">Tổng cộng</span>
                  <span className="text-xl font-bold text-primary">{formatVND(booking.totalPrice)}</span>
                </div>
                
                {/* HIỂN THỊ TIỀN HOÀN LẠI NẾU CÓ */}
                {refundPayment && (
                  <>
                    <div className="h-px bg-gray-200 w-full my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${refundPayment.status === 'refunded' ? 'text-green-600' : 'text-orange-600'}`}>Số tiền hoàn lại {refundPayment.status === 'refunded' ? '(Đã hoàn)' : '(Chờ duyệt)'}</span>
                      <span className={`text-lg font-bold ${refundPayment.status === 'refunded' ? 'text-green-600' : 'text-orange-600'}`}>{formatVND(Number(refundPayment.amount))}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {checkinTarget && (
        <CheckInModal
          booking={checkinTarget}
          isOpen={!!checkinTarget}
          onClose={() => setCheckinTarget(null)}
          onSuccess={() => setCheckinTarget(null)}
        />
      )}

      {checkoutTarget && (
        <CheckOutModal
          booking={checkoutTarget}
          isOpen={!!checkoutTarget}
          onClose={() => setCheckoutTarget(null)}
          onSuccess={() => setCheckoutTarget(null)}
        />
      )}
    </div>
  );
};

export default BookingDetailPage;
</file>

<file path="src/pages/admin/BookingListPage.tsx">
import { useState, useEffect, useRef } from 'react';
import { useAdminBookings } from '../../hooks/queries/useAdminBookingsQuery';
import { 
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
import CheckInModal from '../../components/admin/CheckInModal';
import CheckOutModal from '../../components/admin/CheckOutModal';

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
      items: [{ roomTypeId: selectedRoomId!, quantity: 1 }],
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
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg flex flex-col gap-5 sm:gap-6 p-5 sm:p-8 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Tạo đơn tại quầy</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={isNewCustomer} onChange={(e) => setIsNewCustomer(e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <span className="text-sm font-medium text-gray-700">Khách hàng mới</span>
          </label>

          {isNewCustomer ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 ml-1">Ngày nhận phòng</label>
            <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 ml-1">Ngày trả phòng</label>
            <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-2">
          <button onClick={onClose} className="w-full sm:flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Hủy bỏ</button>
          <button onClick={handleSubmit} disabled={isPending || !validateForm()} className="w-full sm:flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-blue-700 shadow-md shadow-blue-100">
            {isPending ? 'Đang xử lý...' : 'Xác nhận tạo đơn'}
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingListPage = () => {
  const navigate = useNavigate();
  const [checkinTarget, setCheckinTarget] = useState<any>(null);
  const [checkoutTarget, setCheckoutTarget] = useState<any>(null);
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

    return (
      <BookingStatusBadge status={booking.status} />
    );
  };

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-gray-800">
          Quản lý đơn đặt phòng
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors w-full sm:w-auto"
        >
          Tạo đơn tại quầy
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Tìm theo tên khách, mã đơn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:flex-1"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-auto"
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
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-auto"
        >
          <option value="">Tất cả nguồn</option>
          <option value="online">Trực tuyến</option>
          <option value="offline">Tại quầy</option>
        </select>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
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
                          onClick={() => setCheckinTarget(booking)}
                          className="text-green-600 text-sm font-medium hover:underline"
                        >
                          Check-in
                        </button>
                      )}

                      {booking.status === 'checked_in' && (
                        <button
                          onClick={() => setCheckoutTarget(booking)}
                          className="text-purple-600 text-sm font-medium hover:underline"
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
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
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                  Trước
                </div>
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
                <div className="flex items-center gap-1">
                  Sau
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && <CreateOfflineBookingModal onClose={() => setShowModal(false)} />}
      
      {checkinTarget && (
        <CheckInModal
          booking={checkinTarget}
          isOpen={!!checkinTarget}
          onClose={() => setCheckinTarget(null)}
          onSuccess={() => setCheckinTarget(null)}
        />
      )}

      {checkoutTarget && (
        <CheckOutModal
          booking={checkoutTarget}
          isOpen={!!checkoutTarget}
          onClose={() => setCheckoutTarget(null)}
          onSuccess={() => setCheckoutTarget(null)}
        />
      )}
    </div>
  );
};

export default BookingListPage;
</file>

<file path="src/pages/admin/DashboardPage.tsx">
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoomOverview } from '../../hooks/queries/useAdminBookingsQuery';
import { useSocketAllBookings } from '../../hooks/useSocketBooking';
import { formatVND, formatDate } from '../../utils/format';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../../services/api';
import CheckInModal from '../../components/admin/CheckInModal';
import CheckOutModal from '../../components/admin/CheckOutModal';

export interface RoomGuestOverview {
  bookingId: number;
  guestName: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  isUpcoming?: boolean;
  isOverdue?: boolean;
}

export interface RoomOverview {
  roomId: number;
  roomNumber: string;
  floor: number;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance' | 'reserved';
  currentPrice: number;
  typeName: string;
  maxCapacity: number;
  currentGuest: RoomGuestOverview | null;
  version: number;
}

const STATUS_CONFIG = {
  available: {
    label: 'Trống',
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-700',
  },
  occupied: {
    label: 'Có khách',
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    text: 'text-blue-700',
  },
  cleaning: {
    label: 'Dọn dẹp',
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-700',
  },
  maintenance: {
    label: 'Bảo trì',
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
  },
  reserved: {
    label: 'Đã đặt trước',
    bg: 'bg-orange-50',
    border: 'border-orange-400',
    text: 'text-orange-700',
  },
} as const;

interface RoomCardProps {
  room: RoomOverview;
  cfg: typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG];
  onStatusChange: (roomId: number, status: 'available' | 'maintenance', version: number) => void;
  isUpdating: boolean;
  onCheckIn: (booking: any) => void;
  onCheckOut: (booking: any) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  cfg,
  onStatusChange,
  isUpdating,
  onCheckIn,
  onCheckOut,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isOverdue = room.currentGuest?.isOverdue;
  const navigate = useNavigate();

  return (
    <div
      className={`
        relative ${cfg.bg} border-2 ${isOverdue ? 'border-red-500 ring-2 ring-red-500/20 animate-pulse' : cfg.border} rounded-xl p-3
        cursor-pointer hover:shadow-md transition-shadow select-none
      `}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {isOverdue && (
        <div className="absolute -top-2.5 -right-2.5 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-lg shadow-sm border border-white z-10 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          QUÁ GIỜ
        </div>
      )}

      <div className={`text-sm font-bold flex items-center justify-between ${cfg.text}`}>
        <span>{room.roomNumber}</span>
      </div>

      <div className="text-xs text-gray-500 truncate mt-0.5 font-medium">
        {room.typeName}
      </div>

      <div className={`text-xs font-semibold mt-1.5 ${cfg.text}`}>
        {cfg.label}
      </div>

      {room.status === 'cleaning' && (
        <button
          disabled={isUpdating}
          onClick={(e) => {
            e.stopPropagation();
          onStatusChange(room.roomId, 'available', room.version);
          }}
          className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white text-[11px] py-1 rounded-lg font-bold transition-all shadow-sm disabled:opacity-50"
        >
          {isUpdating ? '...' : 'Dọn xong'}
        </button>
      )}

      {room.status === 'maintenance' && (
        <button
          disabled={isUpdating}
          onClick={(e) => {
            e.stopPropagation();
          onStatusChange(room.roomId, 'available', room.version);
          }}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] py-1 rounded-lg font-bold transition-all shadow-sm disabled:opacity-50"
        >
          {isUpdating ? '...' : 'Sửa xong'}
        </button>
      )}

      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-xl shadow-xl p-4 min-w-[220px] text-left">
          <div className="text-sm font-bold text-gray-800 mb-1">
            Phòng {room.roomNumber}
          </div>
          <div className="text-xs text-gray-500 mb-1">
            {room.typeName} • Tối đa {room.maxCapacity} người
          </div>
          <div className="text-sm text-primary font-semibold">
            {formatVND(room.currentPrice)} / đêm
          </div>

          {room.currentGuest && (
            <div className="border-t border-gray-100 mt-3 pt-3">
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${room.currentGuest.isUpcoming ? 'text-orange-600' : isOverdue ? 'text-red-600' : 'text-blue-600'}`}>
                {room.currentGuest.isUpcoming ? 'Khách sắp đến hôm nay' : isOverdue ? 'Khách quá hạn trả phòng' : 'Khách đang ở'}
              </div>
              <div className="text-sm font-semibold text-gray-700 mb-0.5">
                {room.currentGuest.guestName}
              </div>
              <div className="text-xs text-gray-500 mb-0.5">
                 SĐT: {room.currentGuest.guestPhone}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                 Mã đơn: <span className="font-mono font-medium text-gray-700">#{room.currentGuest.bookingId}</span>
              </div>
              <div className={`text-xs font-medium p-2 rounded-lg ${
                isOverdue ? 'bg-red-50 text-red-600 border border-red-200' : 
                room.currentGuest.isUpcoming ? 'bg-orange-50 text-orange-600' : 
                'bg-blue-50 text-blue-600'
              }`}>
                {room.currentGuest.isUpcoming 
                  ? `Nhận phòng: ${formatDate(room.currentGuest.checkInDate)} (Sau 14:00)`
                  : `Trả phòng: ${formatDate(room.currentGuest.checkOutDate)} (Trước 12:00)`
                }
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/bookings/${room.currentGuest!.bookingId}`);
                    setShowTooltip(false);
                  }}
                  className="flex-1 text-center font-bold text-[11px] py-1.5 rounded-lg transition-all text-primary bg-primary/10 hover:bg-primary/20"
                >
                  Chi tiết đơn
                </button>

                {room.status === 'occupied' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCheckOut({
                        id: room.currentGuest!.bookingId,
                        status: 'checked_in',
                        customer: { fullName: room.currentGuest!.guestName, phoneNumber: room.currentGuest!.guestPhone },
                        room: { roomNumber: room.roomNumber, roomType: { typeName: room.typeName } },
                        checkInDate: room.currentGuest!.checkInDate,
                        checkOutDate: room.currentGuest!.checkOutDate,
                      });
                      setShowTooltip(false);
                    }}
                    className={`flex-1 text-center font-bold text-[11px] py-1.5 rounded-lg transition-all text-white shadow-sm ${
                      isOverdue ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    Check-out
                  </button>
                ) : room.currentGuest.isUpcoming ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCheckIn({
                        id: room.currentGuest!.bookingId,
                        status: 'confirmed',
                        customer: { fullName: room.currentGuest!.guestName, phoneNumber: room.currentGuest!.guestPhone },
                        room: { roomNumber: room.roomNumber, roomType: { typeName: room.typeName } },
                        checkInDate: room.currentGuest!.checkInDate,
                        checkOutDate: room.currentGuest!.checkOutDate,
                      });
                      setShowTooltip(false);
                    }}
                    className="flex-1 text-center font-bold text-[11px] py-1.5 rounded-lg transition-all text-white bg-green-600 hover:bg-green-700 shadow-sm"
                  >
                    Check-in
                  </button>
                ) : null}
              </div>
            </div>
          )}

          {/* Chỉ cho phép báo bảo trì khi phòng trống hoặc đang dọn dẹp */}
          {(room.status === 'available' || room.status === 'cleaning') && (
            <div className="border-t border-gray-100 mt-3 pt-3">
              <button
                disabled={isUpdating}
                onClick={(e) => {
                  e.stopPropagation();
          onStatusChange(room.roomId, 'maintenance', room.version);
                  setShowTooltip(false);
                }}
                className="w-full text-center text-red-600 bg-red-50 hover:bg-red-100 font-bold text-[11px] py-1.5 rounded-lg border border-red-200 transition-all disabled:opacity-50"
              >
                Báo bảo trì
              </button>
            </div>
          )}

          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useRoomOverview();
  const [checkinTarget, setCheckinTarget] = useState<any>(null);
  const [checkoutTarget, setCheckoutTarget] = useState<any>(null);
  
  const rooms = (data || []) as RoomOverview[];

  // Mutation xử lý cập nhật trạng thái phòng (Dọn xong / Báo bảo trì)
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: ({ roomId, status, version }: { roomId: number; status: 'available' | 'maintenance', version: number }) => 
      api.patch(`/admin/rooms/${roomId}/status`, { status, version }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries();
      
      if (variables.status === 'maintenance') {
        toast.error('Đã chuyển phòng sang trạng thái bảo trì.');
      } else {
        toast.success('Cập nhật trạng thái phòng thành công.');
      }
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái phòng.');
    }
  });

  useSocketAllBookings();

  // Nhóm danh sách phòng theo tầng
  const byFloor = rooms.reduce<Record<number, RoomOverview[]>>((acc, room) => {
    const floor = room.floor ?? 1;
    if (!acc[floor]) {
      acc[floor] = [];
    }
    acc[floor].push(room);
    return acc;
  }, {});

  // Tính toán số lượng cho hộp thống kê (Summary Grid)
  const summary = {
    available: rooms.filter((r) => r.status === 'available').length,
    occupied: rooms.filter((r) => r.status === 'occupied').length,
    cleaning: rooms.filter((r) => r.status === 'cleaning').length,
    maintenance: rooms.filter((r) => r.status === 'maintenance').length,
    reserved: rooms.filter((r) => r.status === 'reserved').length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sơ đồ phòng tổng quan</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {Object.entries(STATUS_CONFIG).map(([status, cfg]) => (
          <div
            key={status}
            className={`${cfg.bg} border ${cfg.border} rounded-2xl p-5 shadow-sm transition-transform hover:-translate-y-1`}
          >
            <div className={`text-3xl font-bold ${cfg.text}`}>
              {summary[status as keyof typeof summary] ?? 0}
            </div>
            <div className={`text-sm font-semibold mt-1 ${cfg.text}`}>
              {cfg.label}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {Object.keys(byFloor)
          .map(Number)
          .sort((a, b) => a - b)
          .map((floor) => (
            <div key={floor} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {floor}
                </div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Tầng {floor}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
                {byFloor[floor].map((room) => {
                  const cfg = STATUS_CONFIG[room.status];
                  return (
                    <RoomCard 
                      key={room.roomId} 
                      room={room} 
                      cfg={cfg} 
                onStatusChange={(id, stat, version) => updateStatus({ roomId: id, status: stat, version })}
                      isUpdating={isUpdatingStatus}
                      onCheckIn={setCheckinTarget}
                      onCheckOut={setCheckoutTarget}
                    />
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      {checkinTarget && (
        <CheckInModal
          booking={checkinTarget}
          isOpen={!!checkinTarget}
          onClose={() => setCheckinTarget(null)}
          onSuccess={() => setCheckinTarget(null)}
        />
      )}

      {checkoutTarget && (
        <CheckOutModal
          booking={checkoutTarget}
          isOpen={!!checkoutTarget}
          onClose={() => setCheckoutTarget(null)}
          onSuccess={() => setCheckoutTarget(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
</file>

<file path="src/pages/admin/PromotionListPage.tsx">
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../../services/api';
import { formatDate, formatVND } from '../../utils/format';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const promotionSchema = z.object({
  code: z.string().min(1, 'Mã ưu đãi không được để trống'),
  type: z.enum(['percentage', 'fixed', 'free_night']),
  value: z.coerce.number().positive('Giá trị phải lớn hơn 0'),
  minNights: z.coerce.number().int().min(0).optional(),
  usageLimit: z.coerce.number().int().min(0).optional(),
  startDate: z.string().min(1, 'Chọn ngày bắt đầu'),
  endDate: z.string().min(1, 'Chọn ngày kết thúc'),
  isActive: z.preprocess((val) => val === true || val === 'true', z.boolean()),
}).refine(data => new Date(data.endDate) >= new Date(data.startDate), {
  message: 'Ngày kết thúc phải từ ngày bắt đầu trở đi',
  path: ['endDate'],
});

const PromotionListPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: rawData, isLoading } = useQuery({
    queryKey: ['admin', 'promotions'],
    queryFn: () => api.get('/promotions').then((r) => r.data),
  });

  const extractData = () => {
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData;
    if (Array.isArray(rawData.data)) return rawData.data;
    if (Array.isArray(rawData.promotions)) return rawData.promotions;
    if (Array.isArray(rawData.data?.promotions)) return rawData.data.promotions;
    return [];
  };

  const promotions = extractData();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      type: 'percentage',
      isActive: true,
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/promotions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
      queryClient.invalidateQueries({ queryKey: ['public', 'promotions'] });
      toast.success('Tạo mã ưu đãi thành công');
      handleCloseModal();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: any }) => api.put(`/promotions/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
      queryClient.invalidateQueries({ queryKey: ['public', 'promotions'] });
      toast.success('Cập nhật mã ưu đãi thành công');
      handleCloseModal();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: number) => api.patch(`/promotions/${id}/toggle`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
      queryClient.invalidateQueries({ queryKey: ['public', 'promotions'] });
      toast.success('Thay đổi trạng thái thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/promotions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'promotions'] });
      queryClient.invalidateQueries({ queryKey: ['public', 'promotions'] });
      toast.success('Xóa mã ưu đãi thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const handleOpenModal = (promo?: any) => {
    if (promo) {
      setEditingId(promo.id);
      setValue('code', promo.code);
      setValue('type', promo.type);
      setValue('value', promo.value);
      setValue('minNights', promo.minNights || 0);
      setValue('usageLimit', promo.usageLimit || 0);
      setValue('startDate', promo.startDate?.split('T')[0] || '');
      setValue('endDate', promo.endDate?.split('T')[0] || '');
      setValue('isActive', promo.isActive);
    } else {
      setEditingId(null);
      reset({ type: 'percentage', isActive: true, minNights: 0, usageLimit: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    reset();
  };

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      minNights: data.minNights > 0 ? Number(data.minNights) : null,
      usageLimit: data.usageLimit > 0 ? Number(data.usageLimit) : null,
    };
    
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý mã Khuyến mãi</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm"
        >
          + Tạo mã mới
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Mã ưu đãi</th>
                <th className="px-4 py-3 font-medium">Chi tiết giảm</th>
                <th className="px-4 py-3 font-medium">Thời hạn</th>
                <th className="px-4 py-3 font-medium text-center">Lượt dùng</th>
                <th className="px-4 py-3 font-medium text-center">Trạng thái</th>
                <th className="px-4 py-3 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">Đang tải dữ liệu...</td>
                </tr>
              )}
              {!isLoading && promotions?.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">Hệ thống chưa có mã khuyến mãi nào</td>
                </tr>
              )}
              {promotions?.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-bold text-gray-800 uppercase">{promo.code}</td>
                  <td className="px-4 py-4">
                    <span className="font-medium text-green-600 block mb-0.5">
                      {promo.type === 'percentage' && `Giảm ${promo.value}%`}
                      {promo.type === 'fixed' && `Giảm ${formatVND(promo.value)}`}
                      {promo.type === 'free_night' && `Tặng ${promo.value} đêm`}
                    </span>
                    {promo.minNights ? <span className="text-xs text-gray-400">Đk: Tối thiểu {promo.minNights} đêm</span> : ''}
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    <span className="block mb-0.5">Từ: {promo.startDate ? formatDate(promo.startDate).split(' ')[0] : '—'}</span>
                    <span className="block text-red-500">Đến: {promo.endDate ? formatDate(promo.endDate).split(' ')[0] : '—'}</span>
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600 font-medium">
                    {promo.usedCount} <span className="text-gray-400 font-normal">/ {promo.usageLimit || '∞'}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => toggleMutation.mutate(promo.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        promo.isActive 
                          ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {promo.isActive ? 'Đang bật' : 'Đã khóa'}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button onClick={() => handleOpenModal(promo)} className="text-blue-600 hover:underline mr-4 font-medium">Sửa</button>
                    <button 
                      onClick={() => window.confirm(`Xác nhận xóa mã ${promo.code}?`) && deleteMutation.mutate(promo.id)} 
                      className="text-red-500 hover:underline font-medium"
                    >Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-5">{editingId ? 'Chỉnh sửa ưu đãi' : 'Tạo ưu đãi mới'}</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-600 mb-1">Mã Code (Tự đặt) *</label><input {...register('code')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 uppercase focus:ring-2 focus:ring-primary/20 outline-none" placeholder="VD: SUMMER24" />{errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message as string}</p>}</div>
                <div><label className="block text-sm text-gray-600 mb-1">Trạng thái mã</label><select {...register('isActive')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none"><option value="true">Cho phép sử dụng</option><option value="false">Tạm khóa mã này</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-600 mb-1">Loại giảm giá *</label><select {...register('type')} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none"><option value="percentage">Giảm theo %</option><option value="fixed">Giảm số tiền cố định</option><option value="free_night">Tặng đêm miễn phí</option></select></div>
                <div><label className="block text-sm text-gray-600 mb-1">Giá trị giảm *</label><input {...register('value')} type="number" step="any" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="15 (%), hoặc 200000 (đ)" />{errors.value && <p className="text-red-500 text-xs mt-1">{errors.value.message as string}</p>}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-600 mb-1">Cần đặt tối thiểu (Đêm)</label><input {...register('minNights')} type="number" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="0 = Bỏ qua" /></div>
                <div><label className="block text-sm text-gray-600 mb-1">Giới hạn số người dùng</label><input {...register('usageLimit')} type="number" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="0 = Không giới hạn" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-600 mb-1">Ngày bắt đầu *</label><input {...register('startDate')} type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" />{errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message as string}</p>}</div>
                <div><label className="block text-sm text-gray-600 mb-1">Ngày kết thúc *</label><input {...register('endDate')} type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 outline-none" />{errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message as string}</p>}</div>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors">Đóng</button>
                <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center gap-2">
                  {(createMutation.isPending || updateMutation.isPending) && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                  {editingId ? 'Cập nhật' : 'Hoàn tất tạo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionListPage;
</file>

<file path="src/pages/admin/RefundListPage.tsx">
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { socketService, SOCKET_EVENTS } from '../../services/socketService';
import { useEffect } from 'react';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '—';
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const RefundListPage = () => {
  const queryClient = useQueryClient();

  const { data: refunds, isLoading } = useQuery({
    queryKey: ['admin', 'refunds'],
    queryFn: () =>
      api.get<{ data: any[] }>('/admin/refunds').then((r) => r.data.data),
  });

  useEffect(() => {
    const handleUpdate = () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'refunds'] });
    };

    socketService.on(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);

    return () => {
      socketService.off(SOCKET_EVENTS.BOOKING_UPDATED, handleUpdate);
    };
  }, [queryClient]);

  const confirmMutation = useMutation({
    mutationFn: (paymentId: number) => api.patch(`/admin/payments/${paymentId}/confirm-refund`),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'refunds'] });
      alert('Xác nhận hoàn tiền thành công!');
    },
    onError: () => {
      alert('Có lỗi xảy ra khi xác nhận!');
    }
  });

  const handleConfirmRefund = (paymentId: number) => {
    if (window.confirm('Xác nhận bạn đã chuyển khoản hoàn tiền cho khách hàng này?')) {
      confirmMutation.mutate(paymentId);
    }
  };

  const totalRefunded = refunds?.reduce(
    (sum, r) => sum + (r.status === 'refunded' ? Number(r.amount) : 0),
    0
  ) ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800">Quản lý hoàn tiền</h2>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-1 w-full sm:w-fit">
        <span className="text-xs text-gray-400">Tổng tiền đã hoàn</span>
        <p className="text-2xl font-semibold text-red-500">
          {formatVND(totalRefunded)}
        </p>
        <span className="text-xs text-gray-400">
          {refunds?.filter(r => r.status === 'refunded').length ?? 0} giao dịch đã hoàn
        </span>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Mã GD', 'Khách hàng', 'Phòng', 'Số tiền hoàn', 'Ngày hoàn', 'Mã đơn', 'Trạng thái'].map((col) => (
                  <th key={col} className="text-left px-4 py-3 text-xs font-medium text-gray-500 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="text-center py-16">
                    <span className="text-sm text-gray-400">Đang tải...</span>
                  </td>
                </tr>
              )}

              {!isLoading && (!refunds || refunds.length === 0) && (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-400 text-sm">
                    Chưa có giao dịch hoàn tiền nào
                  </td>
                </tr>
              )}

              {!isLoading && refunds?.map((refund) => (
                <tr key={refund.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 text-xs font-mono whitespace-nowrap">
                    {refund.transactionRef ?? '—'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-800 truncate max-w-[150px]" title={refund.booking?.customer?.fullName}>
                      {refund.booking?.customer?.fullName ?? '—'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {refund.booking?.customer?.phoneNumber}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm whitespace-nowrap">
                    <span className="truncate max-w-[150px] inline-block align-bottom" title={refund.booking?.room?.roomType?.typeName}>
                      {refund.booking?.room?.roomType?.typeName ?? '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-red-500 font-medium text-sm whitespace-nowrap">
                    {formatVND(Number(refund.amount))}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm whitespace-nowrap">
                    {refund.refundedAt ? formatDate(refund.refundedAt) : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
                    #{refund.bookingId}
                  </td>
                  
                  <td className="px-4 py-3 whitespace-nowrap">
                    {/* Nút chỉ hiện khi trạng thái là pending_refund */}
                    {refund.status === 'pending_refund' && (
                      <div className="flex flex-col gap-2">
                        <div className="text-xs text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-200 w-fit">
                          Đang xử lý
                        </div>
                        <button
                          onClick={() => handleConfirmRefund(refund.id)}
                          disabled={confirmMutation.isPending}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 w-fit transition-colors"
                        >
                          {confirmMutation.isPending ? 'Đang xử lý...' : 'Xác nhận đã hoàn'}
                        </button>
                      </div>
                    )}

                    {/* Huy hiệu chỉ hiện khi trạng thái là refunded */}
                    {refund.status === 'refunded' && (
                      <div className="text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200 w-fit">
                        Đã hoàn tiền
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RefundListPage;
</file>

<file path="src/pages/admin/ReportPage.tsx">
import { useState } from 'react';
import { useRevenueReport } from '../../hooks/queries/useAdminBookingsQuery';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const getStartOfPeriod = (monthsAgo: number = 6) => {
  const now = new Date();
  now.setMonth(now.getMonth() - (monthsAgo - 1));
  now.setDate(1);
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
};

const getEndOfMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${lastDay}`;
};

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const formatMillions = (value: number) => {
  if (value === 0) return '0';
  return `${(value / 1_000_000).toFixed(1)}tr`;
};

const COLORS = ['#0f4c81', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#6366f1', '#ec4899', '#14b8a6'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-md text-sm">
      <p className="text-gray-500 mb-1">{label || payload[0].name}</p>
      <p className="text-primary font-medium">
        {formatVND(payload[0].value)}
      </p>
    </div>
  );
};

const ReportPage = () => {
  const [from, setFrom] = useState(getStartOfPeriod(6)); 
  const [to, setTo] = useState(getEndOfMonth());
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(true); 

  const { data, isLoading } = useRevenueReport(
    submitted ? from : '',
    submitted ? to : ''
  );

  const rawPieData = data?.byRoomType || data?.roomTypeRevenue || data?.revenueByRoomType || [];
  const pieData = rawPieData.map((item: any) => ({
    name: item.roomTypeName || item.name || item.roomType || 'Chưa xác định',
    revenue: Number(item.revenue || item.total || item.amount || 0)
  })).filter((item: any) => item.revenue > 0);

  const handleSubmit = () => {
    if (from >= to) {
      setError('Ngày bắt đầu phải trước ngày kết thúc');
      setSubmitted(false);
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleExportExcel = () => {
    if (!data || !data.monthly) return;

    const workbook = XLSX.utils.book_new();

    const excelData = data.monthly.map((item: any) => ({
      'Tháng': item.month,
      'Doanh thu (VNĐ)': item.revenue,
      'Số đơn': item.bookingCount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Doanh thu');

    if (data.byRoomType && data.byRoomType.length > 0) {
      const roomTypeData = data.byRoomType.map((item: any) => ({
        'Hạng phòng': item.roomTypeName || item.name,
        'Doanh thu (VNĐ)': item.revenue,
      }));
      const roomTypeSheet = XLSX.utils.json_to_sheet(roomTypeData);
      XLSX.utils.book_append_sheet(workbook, roomTypeSheet, 'Theo hạng phòng');
    }

    XLSX.writeFile(workbook, 'bao-cao-doanh-thu.xlsx');
  };

  const handleExportPDF = () => {
    if (!data || !data.monthly) return;

    const doc = new jsPDF();
    const removeAccents = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    const formatVND_PDF = (amount: number) => amount.toLocaleString('vi-VN') + 'd';

    const primary: [number, number, number] = [15, 76, 129];

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(removeAccents('BÁO CÁO DOANH THU'), 14, 20);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(removeAccents(`Thời gian: Từ ${from} đến ${to}`), 14, 28);
    doc.text(removeAccents(`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`), 14, 34);

    doc.setFont('helvetica', 'bold');
    doc.text(removeAccents('TỔNG QUAN'), 14, 45);
    
    doc.setFont('helvetica', 'normal');
    doc.text(removeAccents(`Tổng doanh thu: ${formatVND_PDF(data.summary.totalRevenue)}`), 14, 52);
    doc.text(removeAccents(`Tổng số đơn đặt phòng: ${data.summary.totalBookings}`), 14, 59);
    doc.text(removeAccents(`Tỉ lệ lấp đầy trung bình: ${data.summary.avgOccupancyRate}%`), 14, 66);

    let finalY = 75;

    doc.setFont('helvetica', 'bold');
    doc.text(removeAccents('DOANH THU THEO THÁNG'), 14, finalY);

    const monthlyBody = data.monthly.map((item: any) => [
      item.month,
      formatVND_PDF(item.revenue),
      String(item.bookingCount)
    ]);

    autoTable(doc, {
      startY: finalY + 5,
      head: [[removeAccents('Tháng'), removeAccents('Doanh thu'), removeAccents('Số đơn')]],
      body: monthlyBody,
      headStyles: { fillColor: primary, fontSize: 9 },
      bodyStyles: { fontSize: 10 },
      margin: { left: 14 }
    });

    finalY = (doc as any).lastAutoTable.finalY + 15;

    if (pieData.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text(removeAccents('DOANH THU THEO HẠNG PHÒNG'), 14, finalY);

      const roomTypeBody = pieData.map((item: any) => [
        removeAccents(item.name),
        formatVND_PDF(item.revenue)
      ]);

      autoTable(doc, {
        startY: finalY + 5,
        head: [[removeAccents('Hạng phòng'), removeAccents('Doanh thu')]],
        body: roomTypeBody,
        headStyles: { fillColor: primary, fontSize: 9 },
        bodyStyles: { fontSize: 10 },
        margin: { left: 14 }
      });
    }

    doc.save('bao-cao-doanh-thu.pdf');
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800">Báo cáo doanh thu</h2>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Từ ngày</label>
          <input
            type="date"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setError('');
              setSubmitted(false);
            }}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Đến ngày</label>
          <input
            type="date"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setError('');
              setSubmitted(false);
            }}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl transition-colors"
        >
          Xem báo cáo
        </button>

        {error && (
          <p className="text-red-500 text-xs w-full">{error}</p>
        )}
      </div>

      {isLoading && (
        <div className="flex flex-col gap-6 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-7 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
          
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm h-72" />

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
            <div className="h-4 bg-gray-200 rounded w-32" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-3 bg-gray-100 rounded w-20" />
                <div className="h-3 bg-gray-100 rounded w-32" />
                <div className="h-3 bg-gray-100 rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && submitted && data && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-1">
              <span className="text-xs text-gray-400">Tổng doanh thu</span>
              <p className="text-2xl font-semibold text-primary">
                {formatVND(data.summary.totalRevenue)}
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-1">
              <span className="text-xs text-gray-400">Tổng đơn đặt phòng</span>
              <p className="text-2xl font-semibold text-gray-800">
                {data.summary.totalBookings} đơn
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-1">
              <span className="text-xs text-gray-400">Tỉ lệ lấp đầy trung bình</span>
              <p className="text-2xl font-semibold text-gray-800">
                {data.summary.avgOccupancyRate}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.monthly.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-medium text-gray-800 mb-4">
                  Doanh thu theo tháng
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={data.monthly}
                    margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
                  >
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: '#9ca3af' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={formatMillions}
                      tick={{ fontSize: 12, fill: '#9ca3af' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
                    <Bar
                      dataKey="revenue"
                      fill="#0f4c81"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={48}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col">
              <h3 className="text-sm font-medium text-gray-800 mb-4">
                Doanh thu theo hạng phòng
              </h3>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="revenue"
                      nameKey="name"
                    >
                      {pieData.map((_entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex-1 w-full min-h-[280px] flex flex-col items-center justify-center text-center text-sm text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 p-4">
                  <span>API Backend hiện tại chưa trả về dữ liệu doanh thu theo hạng phòng.</span>
                </div>
              )}
            </div>
          </div>

          {/* Monthly table */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-800">Chi tiết theo tháng</h3>
              {data.monthly.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={handleExportPDF}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                  >
                    Xuất PDF
                  </button>
                  <button
                    onClick={handleExportExcel}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                  >
                    Xuất Excel
                  </button>
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">Tháng</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">Doanh thu</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">Số đơn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.monthly.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-10 text-gray-400 text-sm">
                        Không có dữ liệu trong khoảng thời gian này
                      </td>
                    </tr>
                  )}
                  {data.monthly.map((item: any) => (
                    <tr key={item.month} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-gray-800 font-medium">{item.month}</td>
                      <td className="px-5 py-3 text-primary font-medium">
                        {formatVND(item.revenue)}
                      </td>
                      <td className="px-5 py-3 text-gray-600">{item.bookingCount} đơn</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !submitted && !error && (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <p className="text-gray-400 text-sm">
            Chọn khoảng thời gian và nhấn "Xem báo cáo"
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportPage;
</file>

<file path="src/pages/admin/RoomTypeListPage.tsx">
import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAdminRoomTypes } from '../../hooks/queries/useAdminBookingsQuery';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { toast } from 'sonner';

const PLACEHOLDER = 'https://placehold.co/400x300?text=No+Image';

const roomTypeSchema = z.object({
  typeName: z.string().min(1, 'Vui lòng nhập tên hạng phòng'),
  maxCapacity: z.number({ message: 'Vui lòng nhập số' }).min(1, 'Sức chứa tối thiểu là 1'),
  basePrice: z.number({ message: 'Vui lòng nhập số' }).min(0, 'Giá không được âm'),
  description: z.string().optional(),
});

type RoomTypeFormValues = z.infer<typeof roomTypeSchema>;

const formatCurrency = (value: number | undefined | null) => {
  if (value === undefined || value === null || isNaN(value)) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const parseCurrency = (value: string) => {
  const numericString = value.replace(/\D/g, '');
  if (!numericString) return 0;
  return parseInt(numericString, 10);
};

const SkeletonCard = () => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden animate-pulse">
    <div className="h-40 bg-gray-200" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-3 bg-gray-100 rounded w-1/3" />
      <div className="flex gap-2 mt-1">
        <div className="h-6 bg-gray-100 rounded-full w-12" />
        <div className="h-6 bg-gray-100 rounded-full w-16" />
      </div>
      <div className="flex justify-between pt-3 border-t border-gray-100 mt-auto">
        <div className="h-3 bg-gray-100 rounded w-16" />
        <div className="flex gap-3">
          <div className="h-3 bg-gray-100 rounded w-8" />
          <div className="h-3 bg-gray-100 rounded w-8" />
        </div>
      </div>
    </div>
  </div>
);

const RoomTypeFormModal = ({
  onClose,
  defaultValues,
}: {
  onClose: () => void;
  defaultValues?: any;
}) => {
  const queryClient = useQueryClient();
  const { data: amenitiesList = [], isLoading: isLoadingAmenities } = useQuery({
    queryKey: ['admin', 'amenities'],
    queryFn: () => api.get('/admin/amenities').then(res => res.data?.data || res.data)
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<RoomTypeFormValues>({
    resolver: zodResolver(roomTypeSchema),
    defaultValues: defaultValues
      ? {
          typeName: defaultValues.typeName,
          maxCapacity: defaultValues.maxCapacity,
          basePrice: Number(defaultValues.basePrice),
          description: defaultValues.description ?? '',
        }
      : { typeName: '', maxCapacity: 1, basePrice: 0, description: '' },
  });

  const [selectedAmenities, setSelectedAmenities] = useState<number[]>(
    defaultValues?.amenities?.map((a: any) => a.amenityId ?? a.amenity?.id ?? a.id) ?? []
  );

  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { mutate: createRoomType, isPending: isCreating } = useMutation({
    mutationFn: (data: FormData) => api.post('/admin/room-types', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Thêm hạng phòng thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const { mutate: updateRoomType, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: number, data: FormData }) => api.put(`/admin/room-types/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Cập nhật hạng phòng thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const isPending = isCreating || isUpdating;

  const existingImages: { id: number; imageUrl: string }[] = defaultValues?.images ?? [];
  const visibleExistingImages = existingImages.filter((img) => !deleteImageIds.includes(img.id));

  const handleDeleteExistingImage = (imageId: number) => {
    setDeleteImageIds((prev) => [...prev, imageId]);
  };

  const handleClose = () => {
    if (isDirty || imageFiles.length > 0 || deleteImageIds.length > 0) {
      if (window.confirm('Dữ liệu chưa được lưu. Bạn có chắc chắn muốn hủy?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    
    const validFiles = files.filter(f => {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
        toast.error(`File ${f.name} không đúng định dạng ảnh (jpg, png, webp)`);
        return false;
      }
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`File ${f.name} vượt quá dung lượng 5MB`);
        return false;
      }
      return true;
    });

    const newFiles = [...imageFiles, ...validFiles].slice(0, 10);
    setImageFiles(newFiles);
    setPreviewUrls(newFiles.map((f) => URL.createObjectURL(f)));
  };

  const handleRemoveNewImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setPreviewUrls(newFiles.map((f) => URL.createObjectURL(f)));
  };

  const toggleAmenity = (id: number) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const onSubmit = (data: RoomTypeFormValues) => {
    const formData = new FormData();

    formData.append('typeName', data.typeName);
    if (data.description) formData.append('description', data.description);
    formData.append('maxCapacity', String(data.maxCapacity));
    formData.append('basePrice', String(data.basePrice));

    selectedAmenities.forEach((id) => formData.append('amenityIds', String(id)));
    imageFiles.forEach((file) => formData.append('images', file));

    if (defaultValues?.id) {
      formData.append('version', String(defaultValues.version));
      if (deleteImageIds.length > 0) {
        formData.append('deleteImageIds', JSON.stringify(deleteImageIds));
      }
      updateRoomType(
        { id: defaultValues.id, data: formData },
        { onSuccess: () => onClose() }
      );
    } else {
      createRoomType(formData, { onSuccess: () => onClose() });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">
            {defaultValues ? 'Chỉnh sửa hạng phòng' : 'Thêm hạng phòng'}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-sm"
            disabled={isPending}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form
          id="room-type-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-6 py-4 overflow-y-auto flex-1"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Tên hạng phòng</label>
            <input
              {...register('typeName')}
              placeholder="VD: Phòng Deluxe"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
            />
            {errors.typeName && (
              <p className="text-red-500 text-xs">{errors.typeName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Sức chứa tối đa</label>
              <input
                type="number"
                {...register('maxCapacity', { valueAsNumber: true })}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
              />
              {errors.maxCapacity && (
                <p className="text-red-500 text-xs">{errors.maxCapacity.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Giá / đêm (đ)</label>
              <Controller
                control={control}
                name="basePrice"
                render={({ field: { onChange, value } }) => (
                  <input
                    type="text"
                    value={formatCurrency(value)}
                    onChange={(e) => onChange(parseCurrency(e.target.value))}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
                  />
                )}
              />
              {errors.basePrice && (
                <p className="text-red-500 text-xs">{errors.basePrice.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Mô tả</label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Mô tả ngắn về hạng phòng..."
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full resize-none"
            />
          </div>

          {defaultValues && existingImages.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">
                Ảnh hiện tại ({visibleExistingImages.length}/{existingImages.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {visibleExistingImages.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.imageUrl}
                      alt=""
                      className="w-16 h-16 object-cover rounded-xl border border-gray-100"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteExistingImage(img.id)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      title="Đánh dấu xóa ảnh này"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              {deleteImageIds.length > 0 && (
                <p className="text-xs text-orange-500">
                  {deleteImageIds.length} ảnh sẽ bị xóa khi lưu
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">
              {defaultValues ? 'Thêm ảnh mới' : 'Ảnh phòng'} ({imageFiles.length}/10)
            </label>
            <label className="border-2 border-dashed border-gray-200 rounded-xl px-4 py-5 flex flex-col items-center gap-1.5 cursor-pointer hover:border-primary/50 transition-colors">
              <span className="text-sm text-gray-400">Nhấn để chọn ảnh</span>
              <span className="text-xs text-gray-300">
                JPG, PNG, WEBP · Tối đa 10 ảnh · Mỗi ảnh tối đa 5MB
              </span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={url}
                      alt=""
                      className="w-16 h-16 object-cover rounded-xl border border-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(idx)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Tiện nghi</label>
            {isLoadingAmenities ? (
              <div className="text-xs text-gray-400">Đang tải danh sách tiện nghi...</div>
            ) : amenitiesList.length === 0 ? (
              <div className="text-xs text-gray-400">Chưa có tiện nghi nào. Hãy thêm trong Quản lý Tiện ích.</div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {amenitiesList.map((amenity: any) => (
                  <label
                    key={amenity.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity.id)}
                      onChange={() => toggleAmenity(amenity.id)}
                      className="accent-primary w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{amenity.amenityName}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </form>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            form="room-type-form"
            disabled={isPending}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPending ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </div>
    </div>
  );
};

const RoomFormModal = ({
  onClose,
  defaultValues,
  roomTypeId,
}: {
  onClose: () => void;
  defaultValues?: any;
  roomTypeId: number;
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues
      ? {
          roomNumber: defaultValues.roomNumber,
          floor: defaultValues.floor || 1,
          status: defaultValues.status || 'available',
        }
      : { roomNumber: '', floor: 1, status: 'available' },
  });

  const { mutate: saveRoom, isPending } = useMutation({
    mutationFn: (data: any) =>
      defaultValues
        ? api.put(`/admin/rooms/${defaultValues.id}`, data)
        : api.post('/admin/rooms', { ...data, roomTypeId }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(defaultValues ? 'Cập nhật phòng thành công' : 'Thêm phòng thành công');
      onClose();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra'),
  });

  const onSubmit = (data: any) => {
    saveRoom({
      roomNumber: data.roomNumber,
      floor: Number(data.floor),
      status: data.status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-sm flex flex-col">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">
            {defaultValues ? 'Chỉnh sửa phòng' : 'Thêm phòng mới'}
          </h3>
          <button onClick={onClose} disabled={isPending} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form id="room-form" onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Số phòng</label>
            <input
              {...register('roomNumber', { required: 'Số phòng là bắt buộc' })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="VD: 101"
            />
            {errors.roomNumber && <p className="text-red-500 text-xs mt-1">{errors.roomNumber.message as string}</p>}
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Tầng</label>
            <input
              type="number"
              {...register('floor', { required: 'Tầng là bắt buộc', min: 1 })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {!defaultValues && (
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Trạng thái ban đầu</label>
              <select
                {...register('status')}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              >
                <option value="available">Trống</option>
                <option value="maintenance">Bảo trì</option>
                <option value="out_of_order">Ngừng hoạt động</option>
              </select>
            </div>
          )}
        </form>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button type="button" onClick={onClose} disabled={isPending} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl disabled:opacity-50">Hủy</button>
          <button type="submit" form="room-form" disabled={isPending} className="px-4 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2">
            {isPending ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </div>
    </div>
  );
};

const RoomTypeListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [expandedRoomTypeId, setExpandedRoomTypeId] = useState<number | null>(null);
  
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editRoomTarget, setEditRoomTarget] = useState<any>(null);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<number | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortPriceOrder, setSortPriceOrder] = useState<'asc' | 'desc' | null>(null);

  const queryClient = useQueryClient();

  const { data: roomTypes, isLoading } = useAdminRoomTypes();
  
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: ({ id, status, version }: { id: number; status: string; version: number }) => 
      api.patch(`/admin/rooms/${id}/status`, { status, version }),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Cập nhật trạng thái phòng thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật'),
  });

  const deleteRoomMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/admin/rooms/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Xóa phòng thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Không thể xóa phòng này'),
  });

  const deleteRoomTypeMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/admin/room-types/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Xóa hạng phòng thành công');
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Không thể xóa hạng phòng này'),
  });

  const toggleExpand = (id: number) => {
    setExpandedRoomTypeId(prev => (prev === id ? null : id));
  };

  const displayedRoomTypes = useMemo(() => {
    if (!roomTypes) return [];
    let result = [...roomTypes];
    if (searchTerm) {
      result = result.filter((rt: any) => rt.typeName.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (sortPriceOrder) {
      result.sort((a: any, b: any) => {
        if (sortPriceOrder === 'asc') return a.basePrice - b.basePrice;
        return b.basePrice - a.basePrice;
      });
    }
    return result;
  }, [roomTypes, searchTerm, sortPriceOrder]);

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý hạng phòng</h2>
        <button
          onClick={() => {
            setEditTarget(null);
            setShowModal(true);
          }}
          className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          Thêm hạng phòng
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <input 
          type="text" 
          placeholder="Tìm kiếm hạng phòng..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none flex-1"
        />
        <button 
          onClick={() => setSortPriceOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          Giá tiền {sortPriceOrder === 'asc' ? '↑' : sortPriceOrder === 'desc' ? '↓' : ''}
        </button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {!isLoading && (!roomTypes || roomTypes.length === 0) && (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <p className="text-gray-800 font-medium text-sm">Chưa có hạng phòng nào</p>
          <p className="text-gray-400 text-sm">Nhấn "Thêm hạng phòng" để bắt đầu</p>
        </div>
      )}

      {!isLoading && displayedRoomTypes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedRoomTypes.map((rt: any) => {
            const image = rt.images?.[0]?.imageUrl;
            const visibleAmenities = rt.amenities?.slice(0, 3) ?? [];
            const extraAmenities = (rt.amenities?.length ?? 0) - 3;
            const isExpanded = expandedRoomTypeId === rt.id;

            return (
              <div
                key={rt.id}
                onClick={() => toggleExpand(rt.id)}
                className={`bg-white border ${isExpanded ? 'border-primary ring-1 ring-primary/20' : 'border-gray-100'} rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all cursor-pointer`}
              >
                {image ? (
                  <img
                    src={image}
                    alt={rt.typeName}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                    }}
                  />
                ) : (
                  <img
                    src={PLACEHOLDER}
                    alt={rt.typeName}
                    className="w-full h-40 object-cover"
                  />
                )}

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">{rt.typeName}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Tối đa {rt.maxCapacity} khách</p>
                  </div>

                  <p className="text-primary font-medium text-sm">
                    {Number(rt.basePrice || 0).toLocaleString('vi-VN')}đ
                    <span className="text-gray-400 font-normal"> / đêm</span>
                  </p>

                  {visibleAmenities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {visibleAmenities.map((a: any) => (
                        <span key={a.amenity?.id ?? a.id} className="text-xs font-normal px-2.5 py-1 rounded-full bg-primary/5 text-primary">
                          {a.amenity?.amenityName ?? a.amenityName}
                        </span>
                      ))}
                      {extraAmenities > 0 && (
                        <span className="text-xs font-normal px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                          +{extraAmenities} nữa
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                    <span className="text-xs text-gray-400">
                      {rt._count?.rooms ?? rt.rooms?.length ?? 0} phòng
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const duplicatedTarget = {
                            ...rt,
                            id: undefined,
                            version: undefined,
                            typeName: `${rt.typeName} - Copy`,
                          };
                          setEditTarget(duplicatedTarget);
                          setShowModal(true);
                        }}
                        className="text-green-600 text-sm font-medium hover:underline"
                      >
                        Nhân bản
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditTarget(rt); 
                          setShowModal(true);
                        }}
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        Sửa
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Xác nhận xóa hạng phòng ${rt.typeName}?`)) {
                            deleteRoomTypeMutation.mutate(rt.id);
                          }
                        }} 
                        className="text-red-500 text-sm font-medium hover:underline"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div 
                    className="border-t border-gray-100 bg-gray-50/50 p-4 cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-800">
                        Danh sách phòng ({rt.rooms?.length || 0})
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoomTypeId(rt.id);
                          setEditRoomTarget(null);
                          setShowRoomModal(true);
                        }}
                        className="text-xs font-medium bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        + Thêm phòng
                      </button>
                    </div>
                    
                    {rt.rooms && rt.rooms.length > 0 ? (
                      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                            <tr>
                              <th className="px-3 py-2 font-medium">Phòng</th>
                              <th className="px-3 py-2 font-medium">Tầng</th>
                              <th className="px-3 py-2 font-medium">Giá</th>
                              <th className="px-3 py-2 font-medium">Trạng thái</th>
                              <th className="px-3 py-2 font-medium text-right">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {rt.rooms.map((room: any) => (
                              <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 py-2 font-medium text-gray-800">
                                  {room.roomNumber}
                                </td>
                                <td className="px-3 py-2 text-gray-600">
                                  {room.floor}
                                </td>
                                <td className="px-3 py-2 text-gray-600">
                                  {Number(room.basePrice ?? rt.basePrice).toLocaleString('vi-VN')}đ
                                </td>
                                <td className="px-3 py-2">
                                  <select
                                    value={room.status}
                                    disabled={isUpdatingStatus}
                                    onChange={(e) => {
                                      const newStatus = e.target.value;
                                      if (window.confirm('Bạn có chắc chắn muốn thay đổi trạng thái phòng này?')) {
                                        updateStatus({ id: room.id, status: newStatus, version: room.version });
                                      }
                                    }}
                                    className="border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 cursor-pointer"
                                  >
                                    <option value="available">Trống</option>
                                    <option value="occupied">Đang ở</option>
                                    <option value="maintenance">Bảo trì</option>
                                <option value="out_of_order">Ngừng hoạt động</option>
                                  </select>
                                </td>
                                <td className="px-3 py-2 text-right">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedRoomTypeId(rt.id);
                                      setEditRoomTarget(room);
                                      setShowRoomModal(true);
                                    }}
                                    className="text-blue-600 hover:underline mr-3 font-medium"
                                  >
                                    Sửa
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (window.confirm(`Xác nhận xóa phòng ${room.roomNumber}?`)) {
                                        deleteRoomMutation.mutate(room.id);
                                      }
                                    }}
                                    className="text-red-500 hover:underline font-medium"
                                  >
                                    Xóa
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-4 border border-dashed border-gray-200 rounded-xl bg-white">
                        <p className="text-xs text-gray-400">Không có phòng nào thuộc hạng này</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <RoomTypeFormModal
          onClose={() => {
            setShowModal(false);
            setEditTarget(null);
          }}
          defaultValues={editTarget}
        />
      )}

      {showRoomModal && selectedRoomTypeId !== null && (
        <RoomFormModal
          onClose={() => setShowRoomModal(false)}
          defaultValues={editRoomTarget}
          roomTypeId={selectedRoomTypeId}
        />
      )}
    </div>
  );
};

export default RoomTypeListPage;
</file>

<file path="src/pages/admin/UserListPage.tsx">
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminService } from '../../services/adminService';
import { useAuthStore } from '../../stores/authStore';

const ROLE_LABEL: Record<string, string> = {
  admin: 'Admin',
  receptionist: 'Lễ tân',
  customer: 'Khách hàng',
};

const ROLE_CLASS: Record<string, string> = {
  admin: 'bg-purple-50 text-purple-700',
  receptionist: 'bg-blue-50 text-blue-700',
  customer: 'bg-gray-100 text-gray-600',
};

const STATUS_LABEL: Record<string, string> = {
  active: 'Hoạt động',
  inactive: 'Đã khóa',
};

const STATUS_CLASS: Record<string, string> = {
  active: 'bg-green-50 text-green-700',
  inactive: 'bg-red-50 text-red-500',
};

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-3 bg-gray-100 rounded w-3/4" />
      </td>
    ))}
  </tr>
);

const UserListPage = () => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuthStore();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const filters = {
    ...(search && { search }),
    ...(role && { role }),
    ...(status && { status }),
  };

  const { data: rawData, isLoading } = useQuery({
    queryKey: ['admin', 'users', filters],
    queryFn: () => adminService.getUsers(filters),
  });

  const extractData = () => {
    if (!rawData) return [];
    if (rawData.users) return rawData.users;
    if (rawData.data?.users) return rawData.data.users;
    if (rawData.data?.data?.users) return rawData.data.data.users;
    if (Array.isArray(rawData)) return rawData;
    if (Array.isArray(rawData.data)) return rawData.data;
    return [];
  };

  const users = extractData();

  const { mutate: updateUser } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { role?: string; status?: string } }) =>
      adminService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('Cập nhật tài khoản thành công');
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message ?? 'Có lỗi xảy ra';
      toast.error(message);
    },
  });

  const handleChange = (id: number, data: { role?: string; status?: string }) => {
    if (!window.confirm('Xác nhận thay đổi quyền/trạng thái?')) return;
    updateUser({ id, data });
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800">Quản lý tài khoản</h2>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Tìm theo tên, email, số điện thoại..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-64"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">Tất cả vai trò</option>
          <option value="admin">Admin</option>
          <option value="receptionist">Lễ tân</option>
          <option value="customer">Khách hàng</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Đã khóa</option>
        </select>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
    <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Họ tên', 'Email', 'SĐT', 'Vai trò', 'Trạng thái', 'Hành động'].map((col) => (
                  <th key={col} className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              )}

              {!isLoading && users.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400 text-sm">
                    Không có tài khoản nào
                  </td>
                </tr>
              )}

              {!isLoading && users.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">
                      {user.fullName}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{user.email}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{user.phoneNumber}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${ROLE_CLASS[user.role] ?? 'bg-gray-100 text-gray-500'}`}>
                        {ROLE_LABEL[user.role] ?? user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_CLASS[user.status] ?? 'bg-gray-100 text-gray-500'}`}>
                        {STATUS_LABEL[user.status] ?? user.status}
                      </span>
                    </td>
                  <td className="px-4 py-3">
                    <select
                      defaultValue=""
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!value) return;

                        const isRole = ['admin', 'receptionist', 'customer'].includes(value);
                        handleChange(user.id, isRole ? { role: value } : { status: value });

                        e.target.value = '';
                      }}
                      className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="" disabled>Chọn hành động</option>
                      <option value="admin" disabled={user.id === currentUser?.id}>Đặt làm Admin</option>
                      <option value="receptionist" disabled={user.id === currentUser?.id}>Đặt làm Lễ tân</option>
                      <option value="customer" disabled={user.id === currentUser?.id}>Đặt làm Khách hàng</option>
                      <option value="" disabled>──────────</option>
                      <option value="inactive" disabled={user.id === currentUser?.id || user.status === 'inactive'}>Khóa tài khoản</option>
                      <option value="active" disabled={user.id === currentUser?.id || user.status === 'active'}>Mở khóa tài khoản</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
</file>

<file path="src/pages/customer/AboutPage.tsx">
const PLACEHOLDER = 'https://placehold.co/1200x800?text=Hotel+Booking';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col gap-16">
      
      {/* 1. HERO SECTION */}
      <div className="text-center max-w-4xl mx-auto relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 tracking-wide uppercase relative z-10">
          Về Hotel Booking
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed relative z-10">
          Kiến tạo một nền tảng công nghệ lưu trú toàn diện, kết nối khách hàng đến với những không gian nghỉ dưỡng lý tưởng bằng sự minh bạch và dịch vụ tận tâm.
        </p>
      </div>

      {/* BANNER IMAGE WITH TINT OVERLAY */}
      <div className="w-full h-96 rounded-3xl overflow-hidden shadow-sm bg-gray-100 relative group">
        <div className="absolute inset-0 bg-primary/5 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0 duration-500" />
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200" 
          alt="Hotel Lobby" 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />
      </div>

      {/* 2. THƯ NGỎ TỪ ĐỘI NGŨ VẬN HÀNH */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start border-b border-gray-100 pb-12">
        <div className="md:col-span-1">
          <h2 className="text-3xl font-medium text-gray-800 border-l-4 border-primary pl-3">
            Lời ngỏ từ Ban điều hành
          </h2>
          <p className="text-sm text-gray-400 mt-2 pl-4">Triết lý và cam kết dịch vụ</p>
        </div>
        <div className="md:col-span-2 flex flex-col gap-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Tọa lạc tại trung tâm thành phố Hà Nội, Hotel Booking được xây dựng với mục tiêu định nghĩa lại trải nghiệm đặt phòng và lưu trú thời đại số. Chúng tôi hiểu rằng mỗi chuyến đi đều mang một ý nghĩa đặc biệt, và một không gian nghỉ ngơi phù hợp chính là khởi đầu cho một hành trình trọn vẹn.
          </p>
          <p>
            Không chỉ dừng lại ở một nền tảng kết nối, chúng tôi chú trọng vào việc cá nhân hóa trải nghiệm của từng khách hàng. Từ những yêu cầu đặc biệt nhỏ nhất trước khi nhận phòng cho đến quy trình hỗ trợ sau khi trả phòng đều được đội ngũ chuyên nghiệp tối ưu hóa bằng sự chân thành và trách nhiệm cao nhất.
          </p>
        </div>
      </div>

      {/* 3. SỐ LIỆU THỐNG KÊ KINH DOANH */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-r from-primary/5 via-blue-50/30 to-transparent rounded-2xl p-8 text-center border border-primary/10">
        {[
          { value: '24+', label: 'Phòng nghỉ đạt chuẩn' },
          { value: '10.000+', label: 'Khách hàng tin tưởng' },
          { value: '98%', label: 'Đánh giá tuyệt đối' },
          { value: '24/7', label: 'Hỗ trợ trực tuyến' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-3xl font-bold bg-gradient-to-b from-primary to-primary-dark bg-clip-text text-transparent">{stat.value}</span>
            <span className="text-sm text-gray-600 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* 4. GIÁ TRỊ CỐT LÕI (BENTO BOX UI PHỐI MÀU) */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-medium text-gray-800 text-center mb-1">Giá trị cốt lõi</h1>
          <p className="text-sm text-gray-400 text-center mb-8">Nền tảng vững chắc làm nên thương hiệu</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-7 bg-white border border-gray-100 rounded-2xl shadow-sm md:col-span-2 hover:border-primary/20 transition-colors">
            <h3 className="text-base font-medium text-primary mb-2">Sứ mệnh số hóa</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tối ưu hóa toàn bộ quy trình tìm kiếm và đặt phòng bằng công nghệ hiện đại. Giúp khách hàng tiếp cận thông tin một cách trực quan, chính xác chỉ với vài thao tác đơn giản trên mọi thiết bị.
            </p>
          </div>
          
          <div className="p-7 bg-primary/5 border border-primary/10 rounded-2xl md:col-span-1">
            <h3 className="text-base font-medium text-gray-800 mb-2">Sự minh bạch</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Cam kết thông tin hạng phòng, hình ảnh thực tế, mức giá hiển thị công khai và chính sách hoàn hủy rõ ràng 100%, không phát sinh phụ phí ẩn.
            </p>
          </div>

          <div className="p-7 bg-blue-50/50 border border-blue-100/50 rounded-2xl md:col-span-1">
            <h3 className="text-base font-medium text-gray-800 mb-2">Dịch vụ tận tâm</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Đội ngũ nhân sự được đào tạo bài bản theo tiêu chuẩn quốc tế, luôn sẵn sàng lắng nghe và giải quyết mọi nhu cầu của quý khách trong suốt thời gian lưu trú.
            </p>
          </div>

          <div className="p-7 bg-white border border-gray-100 rounded-2xl shadow-sm md:col-span-2 hover:border-primary/20 transition-colors">
            <h3 className="text-base font-medium text-primary mb-2">Cam kết lâu dài</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Không ngừng nâng cấp cơ sở vật chất, đa dạng hóa các tiện ích tích hợp và lắng nghe phản hồi thực tế để mang lại giá trị bền vững và sự an tâm tuyệt đối cho khách hàng.
            </p>
          </div>
        </div>
      </div>

      {/* 5. HÀNH TRÌNH KHÁCH HÀNG (TIMELINE VỚI ĐIỂM NHẤN MÀU) */}
      <div className="border-t border-gray-100 pt-12">
        <h2 className="text-3xl font-medium text-gray-800 text-center mb-1">Hành trình trải nghiệm đơn giản</h2>
        <p className="text-sm text-gray-400 text-center mb-10">Ba bước tinh gọn cho một kỳ nghỉ hoàn hảo</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Khám phá không gian', desc: 'Sử dụng hệ thống lọc thông minh để tìm hạng phòng đáp ứng đúng nhu cầu và ngân sách mong muốn.' },
            { step: '02', title: 'Xác nhận an toàn', desc: 'Kiểm tra thông tin khách hàng, gửi kèm các yêu cầu đặc biệt và tiến hành thanh toán bảo mật qua mã QR.' },
            { step: '03', title: 'Tận hưởng dịch vụ', desc: 'Nhận phòng nhanh chóng tại quầy và bắt đầu trải nghiệm hệ sinh thái tiện ích cao cấp dành riêng cho bạn.' },
          ].map((item) => (
            <div key={item.step} className="flex flex-col gap-2 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-3xl font-extrabold text-primary/15">{item.step}</span>
              <h3 className="text-base font-medium text-gray-800 mt-1">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. VỊ TRÍ ĐẮC ĐỊA TẠI HÀ NỘI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-12 items-center">
        <div className="md:col-span-1">
          <h2 className="text-3xl font-medium text-gray-800 mb-2">Vị trí đắc địa</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Nằm tại khu vực trung tâm sầm uất của Hà Nội, kết nối giao thông linh hoạt, giúp quý khách dễ dàng di chuyển tới các điểm đến nổi tiếng trong thành phố.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-4 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
          {[
            { place: 'Trung tâm hành chính', distance: '5 phút di chuyển' },
            { place: 'Trung tâm thương mại lớn', distance: '7 phút di chuyển' },
            { place: 'Khu ẩm thực và giải trí', distance: '3 phút đi bộ' },
            { place: 'Sân bay quốc tế Nội Bài', distance: '30 phút di chuyển' },
          ].map((loc) => (
            <div key={loc.place} className="flex flex-col p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
              <span className="text-base font-medium text-gray-800 mb-1">{loc.place}</span>
              <span className="text-sm text-primary font-medium">{loc.distance}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
</file>

<file path="src/pages/customer/BookingHistoryPage.tsx">
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useMyBookings } from '../../hooks/queries/useBookingsQuery';
import { useSocketAllBookings } from '../../hooks/useSocketBooking';
import type { Booking, BookingStatus } from '../../types/booking.types';
import { formatVND, formatDate, calcNights } from '../../utils/format';
import BookingStatusBadge from '../../components/common/BookingStatusBadge';
import CancelBookingModal from '../../components/customer/CancelBookingModal';
import ReviewForm from '../../components/customer/ReviewForm';

const TABS: { label: string; value: BookingStatus | undefined }[] = [
  { label: 'Tất cả', value: undefined },
  { label: 'Chờ thanh toán', value: 'pending_payment' },
  { label: 'Đã xác nhận', value: 'confirmed' },
  { label: 'Đã trả phòng', value: 'checked_out' },
  { label: 'Đã hủy', value: 'cancelled' },
];

const CANCELLABLE: BookingStatus[] = ['pending_payment', 'confirmed'];

const PLACEHOLDER = 'https://placehold.co/400x300?text=No+Image';

const BookingCard = ({
  booking,
  setCancelTarget,
}: {
  booking: Booking;
  setCancelTarget: (id: number | null) => void;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const nights = calcNights(booking.checkInDate, booking.checkOutDate);
  const image = booking.room?.roomType?.images?.[0]?.imageUrl;

  const renderBadges = () => {
    if (booking.status === 'cancelled') {
      const refundPayment = booking.payments?.find((p) => p.feeType === 'refund');

      if (refundPayment?.status === 'refunded') {
        return (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
            Đã hoàn tiền
          </span>
        );
      }

      if (refundPayment?.status === 'pending_refund') {
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

    return (
      <>
        <BookingStatusBadge status={booking.status} />
        {booking.paidAt ? (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
            Đã thanh toán
          </span>
        ) : (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
            Chờ thanh toán
          </span>
        )}
      </>
    );
  };

  return (
    <div 
      onClick={() => navigate(`/bookings/${booking.id}`)}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="sm:w-40 h-36 sm:h-auto shrink-0 bg-gray-100">
        <img
          src={image ?? PLACEHOLDER}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />
      </div>

      <div className="flex-1 p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-medium text-gray-800">
              {booking.room?.roomType?.typeName ?? 'Phòng'}
            </h3>
            {booking.room?.roomNumber && (
              <p className="text-xs text-gray-400 mt-0.5">
                Phòng {booking.room.roomNumber}
              </p>
            )}
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {renderBadges()}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 font-normal">
          <span>{formatDate(booking.checkInDate)} → {formatDate(booking.checkOutDate)}</span>
          <span>{nights} đêm · {booking.guestCount} khách</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <span className="text-primary font-medium text-sm">
            {formatVND(booking.totalAmount)}
          </span>

          {CANCELLABLE.includes(booking.status) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCancelTarget(booking.id);
              }}
              className="text-red-500 text-sm font-medium hover:underline"
            >
              Hủy đặt phòng
            </button>
          )}
        </div>

        {booking.status === 'checked_out' && !booking.review && (
          <div 
            className="mt-1 pt-3 border-t border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <ReviewForm
              bookingId={booking.id}
              onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: ['bookings'] });
              }}
            />
          </div>
        )}

        {booking.status === 'checked_out' && booking.review && (
          <div className="mt-1 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < booking.review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-400">Bạn đã đánh giá</span>
            </div>
            {booking.review.comment && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                "{booking.review.comment}"
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const BookingHistoryPage = () => {
  const [activeStatus, setActiveStatus] = useState<BookingStatus | undefined>(undefined);
  const [cancelTarget, setCancelTarget] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: bookings, isLoading, isError } = useMyBookings(activeStatus);

  const bookingIds = bookings?.map((b: any) => b.id) || [];
  useSocketAllBookings(bookingIds);

  const handleCancelSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
    setCancelTarget(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-medium text-gray-800">Lịch sử đặt phòng</h2>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveStatus(tab.value)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
              activeStatus === tab.value
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-500">Đang tải...</span>
          </div>
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <p className="text-gray-800 font-medium text-sm">Đã xảy ra lỗi</p>
          <p className="text-gray-500 text-sm">Vui lòng thử lại sau.</p>
        </div>
      )}

      {!isLoading && !isError && bookings?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-gray-800 font-medium text-sm">
            Bạn chưa có đặt phòng nào
          </p>
          <Link to="/rooms" className="text-sm text-primary font-medium hover:underline">
            Tìm phòng ngay
          </Link>
        </div>
      )}

      {!isLoading && !isError && bookings && bookings.length > 0 && (
        <div className="flex flex-col gap-4">
          {bookings.map((booking: any) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              setCancelTarget={setCancelTarget}
            />
          ))}
        </div>
      )}

      {cancelTarget && (
        <CancelBookingModal
          bookingId={cancelTarget}
          isOpen={!!cancelTarget}
          onClose={() => setCancelTarget(null)}
          onConfirmed={handleCancelSuccess}
        />
      )}
    </div>
  );
};

export default BookingHistoryPage;
</file>

<file path="src/pages/customer/BookingPage.tsx">
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '../../stores/authStore';
import { useRoomTypeDetail } from '../../hooks/queries/use-hotels.query';
import { useCreateBooking } from '../../hooks/mutations/use-booking.mutation';
import { useSocketAllBookings } from '../../hooks/useSocketBooking';
import { formatVND, formatDate, calcNights } from '../../utils/format';
import api from '../../services/api';

const MOCK_ROOMS: Record<number, any> = {
  1: { typeName: 'Phòng Deluxe Double', basePrice: 1500000, maxCapacity: 2 },
  2: { typeName: 'Phòng Executive Suite', basePrice: 3200000, maxCapacity: 2 },
  3: { typeName: 'Phòng Family Premium', basePrice: 2100000, maxCapacity: 4 }
};

// --- BỔ SUNG: Mảng gợi ý yêu cầu đặc biệt ---
const QUICK_REQUESTS = [
  'Phòng không hút thuốc',
  'Tầng cao, view đẹp',
  'Có bồn tắm',
  'Gần thang máy',
  'Đến muộn sau 22h',
];

const BookingPage = () => {
  useSocketAllBookings();

  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, getMe } = useAuthStore();

  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const guests = Number(searchParams.get('guests')) || 1;

  // --- BỔ SUNG: State lưu yêu cầu đặc biệt ---
  const [specialRequests, setSpecialRequests] = useState('');

  // --- BỔ SUNG: State và cấu hình mã ưu đãi ---
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('hotel_token');
    if (token && !user?.phoneNumber) {
      getMe().catch(() => {});
    }
  }, [user, getMe]);

  const isValidDate = (dateString: string) => {
    if (!dateString) return false;
    const d = new Date(dateString);
    return !isNaN(d.getTime());
  };

  const isDatesValid = isValidDate(checkIn) && isValidDate(checkOut);

  const { data: apiData, isLoading: isLoadingRoom } = useRoomTypeDetail(Number(id));
  const roomType = apiData || MOCK_ROOMS[Number(id)];
  
  const { mutate: createBooking, isPending } = useCreateBooking();

  const nights = isDatesValid ? calcNights(checkIn, checkOut) : 0;
  const basePrice = roomType?.basePrice ?? 0;
  const total = nights * basePrice;

  // --- BỔ SUNG: Tính ngày deadline hủy miễn phí ---
  const cancelDeadline = (checkIn && isDatesValid)
    ? formatDate(new Date(new Date(checkIn).getTime() - 3 * 86400000).toISOString())
    : '';

  // --- BỔ SUNG: Hàm toggle chọn nhanh yêu cầu ---
  const toggleQuickRequest = (req: string) => {
    setSpecialRequests((prev) => {
      if (prev.includes(req)) {
        return prev
          .replace(req, '')
          .replace(/^[,\s]+|[,\s]+$/g, '')
          .replace(/,\s*,/g, ',');
      }
      return prev ? `${prev}, ${req}` : req;
    });
  };

  // --- BỔ SUNG: Hàm áp dụng và hủy mã ưu đãi ---
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    
    const code = promoCode.toUpperCase().trim();

    setIsApplyingPromo(true);
    try {
      // Gọi API kiểm tra mã ưu đãi
      const res = await api.get(`/promotions/validate`, { params: { code } });
      const promo = res.data.data;

      if (promo.minNights && nights < promo.minNights) {
        toast.error(`Chưa đủ điều kiện: Cần đặt tối thiểu ${promo.minNights} đêm`);
        return;
      }

      // Tạo thông báo điều kiện hiển thị
      let condition = '';
      if (promo.type === 'percentage') condition = `Giảm ${promo.value}% tổng đơn`;
      else if (promo.type === 'free_night') condition = `Tặng ${promo.value} đêm miễn phí`;
      else if (promo.type === 'fixed') condition = `Giảm ${formatVND(promo.value)}`;

      setAppliedPromo({ code, type: promo.type, value: promo.value, condition, minNights: promo.minNights });
      toast.success('Áp dụng mã ưu đãi thành công!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Mã ưu đãi không hợp lệ hoặc đã hết hạn!');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  // --- BỔ SUNG: Tính toán lại tổng tiền sau giảm giá ---
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percentage') {
      discountAmount = (total * appliedPromo.value) / 100;
    } else if (appliedPromo.type === 'free_night') {
      discountAmount = basePrice * appliedPromo.value;
    } else if (appliedPromo.type === 'fixed') {
      discountAmount = appliedPromo.value;
    }
  }
  const finalTotal = Math.max(0, total - discountAmount);

  const handleSubmit = () => {
    if (!roomType) return;

    // --- BỔ SUNG: Chặn đặt phòng nếu nhập mã nhưng quên nhấn Áp dụng ---
    if (promoCode.trim() !== '' && !appliedPromo) {
      toast.error('Bạn đã nhập mã ưu đãi nhưng chưa nhấn nút "Áp dụng"!');
      return;
    }

    createBooking(
      {
        roomId: Number(id),
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guestCount: guests,
        specialRequests: specialRequests || undefined, // --- BỔ SUNG: Gửi request ---
        promoCode: appliedPromo?.code || undefined, // --- BỔ SUNG: Gửi mã ưu đãi về Backend ---
      } as any, // Ép kiểu tạm thời tránh lỗi TypeScript nếu hook chưa cập nhật type
      {
        onSuccess: (booking: any) => {
          navigate(`/payment/${booking.id}`);
        },
        onError: (err: any) => {
          const status = err?.response?.status;
          const message = err?.response?.data?.message ?? 'Có lỗi xảy ra';

          if (status === 409) {
            toast.error('Phòng đã được đặt trong khoảng thời gian này');
            navigate('/rooms');
            return;
          }

          toast.error(message);
        },
      }
    );
  };

  if (isLoadingRoom) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (!roomType) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-gray-800 font-medium text-sm">Không tìm thấy thông tin phòng</p>
        <button
          onClick={() => navigate(-1)}
          className="text-primary text-sm font-medium hover:underline"
        >
          Quay lại
        </button>
      </div>
    );
  }

  if (!isDatesValid) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-gray-800 font-medium text-sm">
          Thông tin ngày nhận hoặc trả phòng bị thiếu. Vui lòng chọn lại!
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Quay lại chọn ngày
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 py-8 px-4">
      <h2 className="text-xl font-medium text-gray-800">Xác nhận đặt phòng</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── CỘT TRÁI ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-base font-medium text-gray-800">
              Thông tin khách hàng
            </h3>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Họ và tên</label>
                <input
                  type="text"
                  value={user?.fullName ?? ''}
                  readOnly
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 bg-gray-50 cursor-not-allowed w-full outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="email"
                  value={user?.email ?? ''}
                  readOnly
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 bg-gray-50 cursor-not-allowed w-full outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Số điện thoại</label>
                <input
                  type="text"
                  value={user?.phoneNumber ?? ''}
                  readOnly
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 bg-gray-50 cursor-not-allowed w-full outline-none"
                />
              </div>
            </div>
          </div>

          {/* ── BỔ SUNG: Yêu cầu đặc biệt ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-medium text-gray-800 mb-1">
              Yêu cầu đặc biệt <span className="text-gray-400 font-normal">(không bắt buộc)</span>
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Chúng tôi sẽ cố gắng đáp ứng yêu cầu, nhưng không đảm bảo 100%.
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {QUICK_REQUESTS.map((req) => {
                const active = specialRequests.includes(req);
                return (
                  <button
                    key={req}
                    type="button"
                    onClick={() => toggleQuickRequest(req)}
                    className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                      active
                        ? 'bg-primary text-white border-primary'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    {active ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 inline-block mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 inline-block mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    )}
                    {req}
                  </button>
                );
              })}
            </div>

            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Hoặc ghi yêu cầu riêng của bạn..."
              rows={3}
              maxLength={500}
              className="border border-gray-200 rounded-xl px-4 py-3 text-base w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-300"
            />
            <p className="text-sm text-gray-300 text-right mt-1">
              {specialRequests.length}/500
            </p>
          </div>

          {/* ── BỔ SUNG: Khối nhập mã ưu đãi ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-medium text-gray-800 mb-3">
              Mã ưu đãi / Khuyến mãi
            </h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã ưu đãi (VD: EARLY15)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={!!appliedPromo}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary uppercase placeholder:normal-case"
              />
              {!appliedPromo ? (
                <button
                  onClick={handleApplyPromo}
              disabled={isApplyingPromo}
              className="px-5 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors shrink-0 disabled:opacity-70"
                >
              {isApplyingPromo ? 'Đang kiểm tra...' : 'Áp dụng'}
                </button>
              ) : (
                <button
                  onClick={handleRemovePromo}
                  className="px-5 py-2.5 border border-red-200 text-red-500 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors shrink-0"
                >
                  Hủy mã
                </button>
              )}
            </div>
            
            {appliedPromo && (
              <p className="text-sm text-green-600 mt-3 font-medium flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Đã áp dụng mã {appliedPromo.code}: {appliedPromo.condition}
              </p>
            )}
          </div>

          {/* ── BỔ SUNG: Giao diện Chính sách hủy phòng mới ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-medium text-gray-800 mb-4">
              Chính sách hủy phòng
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center shrink-0 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-800">Hoàn 100% — Hủy trước 3 ngày</p>
                  <p className="text-sm text-gray-500 mt-0.5">Hủy trước {cancelDeadline} → hoàn toàn bộ tiền phòng</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center shrink-0 text-yellow-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-800">Hoàn 50% — Hủy trong 3 ngày trước</p>
                  <p className="text-sm text-gray-500 mt-0.5">Hủy từ ngày {cancelDeadline} trở đi → hoàn 50% tiền phòng</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center shrink-0 text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-800">Không hoàn tiền — Sau khi nhận phòng</p>
                  <p className="text-sm text-gray-500 mt-0.5">Không thể hủy sau khi đã check-in</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CỘT PHẢI ── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 flex flex-col gap-4">
            
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <h3 className="text-base font-medium text-gray-800">Chi tiết đặt phòng</h3>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-400">Loại phòng</span>
                <span className="text-base font-medium text-gray-800">
                  {roomType.typeName}
                </span>
              </div>

              <div className="flex flex-col gap-2 text-base border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Nhận phòng</span>
                  <span className="text-gray-800 font-medium">{formatDate(checkIn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Trả phòng</span>
                  <span className="text-gray-800 font-medium">{formatDate(checkOut)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Số đêm</span>
                  <span className="text-gray-800 font-medium">{nights} đêm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Số khách</span>
                  <span className="text-gray-800 font-medium">{guests} khách</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Giá / đêm</span>
                  <span className="text-gray-800 font-medium">{formatVND(basePrice)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between mt-1 text-green-600 font-medium">
                    <span>Ưu đãi ({appliedPromo.code})</span>
                    <span>- {formatVND(discountAmount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-4 items-center">
                <span className="text-base font-medium text-gray-800">Tổng cộng</span>
                <div className="flex flex-col items-end">
                  {appliedPromo && (
                    <span className="text-sm text-gray-400 line-through mb-1">{formatVND(total)}</span>
                  )}
                  <span className="text-xl font-semibold text-primary">{formatVND(finalTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="w-full py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white text-base font-medium rounded-xl border-none cursor-pointer transition-colors"
              >
                {isPending ? 'Đang xử lý...' : 'Xác nhận đặt phòng'}
              </button>
              
              <p className="text-sm text-gray-400 text-center mt-1">
                Thanh toán sau qua QR · Miễn phí hủy trước 3 ngày
              </p>
            </div>

            {/* ── BỔ SUNG: Badge an toàn ── */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-600 shrink-0">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">
                    Đặt phòng an toàn
                  </p>
                  <p className="text-sm text-green-600 leading-relaxed">
                    Phòng được giữ chỗ ngay lập tức. Thanh toán qua QR bảo mật.
                    Chính sách hoàn tiền rõ ràng.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
</file>

<file path="src/pages/customer/CartPage.tsx">
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCartStore } from '../../stores/cartStore';
import { useAvailableRooms } from '../../hooks/queries/use-hotels.query';
import { formatVND, calcNights } from '../../utils/format';

const PLACEHOLDER_IMG = 'https://placehold.co/400x300?text=Image';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, totalAmount, updateQuantity, removeFromCart, checkIn, checkOut, syncInventory } = useCartStore();
  
  const hasAlertedRef = useRef(false);

  const { data: freshRooms, isFetching } = useAvailableRooms({
    checkIn: checkIn ? new Date(checkIn).toISOString().split('T')[0] : '',
    checkOut: checkOut ? new Date(checkOut).toISOString().split('T')[0] : '',
    guests: 1
  });

  useEffect(() => {
    if (freshRooms && items.length > 0) {
      const hasReduced = syncInventory(freshRooms);

      if (hasReduced && !hasAlertedRef.current) {
        toast.error('Rất tiếc! Số lượng phòng trống vừa thay đổi, giỏ hàng của bạn đã được cập nhật.');
        hasAlertedRef.current = true;
      }
    }
  }, [freshRooms, items, syncInventory]);

  const nights = (checkIn && checkOut) ? calcNights(new Date(checkIn), new Date(checkOut)) : 0;
  const finalTotal = totalAmount * nights;

  const handleProceedToBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error('Vui lòng chọn ngày nhận và trả phòng trước khi đặt.');
      navigate('/');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-gray-800 font-medium text-sm">Giỏ hàng của bạn đang trống.</p>
        <button
          onClick={() => navigate('/rooms')}
          className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Khám phá phòng ngay
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map(({ roomType, quantity }) => (
            <div key={roomType.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm flex gap-4 p-4">
              <div className="w-32 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={roomType.images?.[0]?.imageUrl || PLACEHOLDER_IMG}
                  alt={roomType.typeName}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-800">{roomType.typeName}</h3>
                  <button onClick={() => removeFromCart(roomType.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <p className="text-sm text-primary font-semibold mt-1">{formatVND(roomType.basePrice)}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(roomType.id, quantity - 1)}
                      className="px-3 py-1.5 text-gray-500 hover:text-primary disabled:text-gray-300"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-medium text-gray-800 text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(roomType.id, quantity + 1)}
                      className="px-3 py-1.5 text-gray-500 hover:text-primary disabled:text-gray-300"
                      disabled={
                        roomType.availableRoomCount
                          ? quantity >= roomType.availableRoomCount
                          : false
                      }
                    >
                      +
                    </button>
                  </div>
                  {roomType.availableRoomCount !== undefined && (
                    <p className="text-xs text-gray-400 ml-2">
                      (Còn lại: {roomType.availableRoomCount})
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm sticky top-24">
            <h2 className="text-base font-medium text-gray-800 mb-4">Tóm tắt đơn hàng</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Ngày nhận phòng</span>
                <span className="font-medium text-gray-800">{checkIn ? new Date(checkIn).toLocaleDateString('vi-VN') : 'Chưa chọn'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ngày trả phòng</span>
                <span className="font-medium text-gray-800">{checkOut ? new Date(checkOut).toLocaleDateString('vi-VN') : 'Chưa chọn'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Số đêm</span>
                <span className="font-medium text-gray-800">{nights > 0 ? `${nights} đêm` : '—'}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 my-4" />
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-800">Tổng cộng</span>
              <span className="text-xl font-semibold text-primary">{nights > 0 ? formatVND(finalTotal) : '—'}</span>
            </div>
            <p className="text-xs text-gray-400 text-right mt-1">Chưa bao gồm ưu đãi</p>
            <button
              onClick={handleProceedToBooking}
              disabled={nights <= 0}
              className="w-full mt-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Tiến hành đặt phòng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
</file>

<file path="src/pages/customer/CheckoutPage.tsx">
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCartStore } from '../../stores/cartStore';
import { bookingService } from '../../services/booking.service';
import { formatVND } from '../../utils/format';
import api from '../../services/api';

const PLACEHOLDER_IMG = 'https://placehold.co/400x300?text=Image';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, checkIn, checkOut, guests, clearCart } = useCartStore();

  const [specialRequests, setSpecialRequests] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; type: string; value: number; minNights?: number } | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0 || !checkIn || !checkOut) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-gray-800 font-medium text-sm">Giỏ hàng trống hoặc thiếu ngày nhận/trả phòng.</p>
        <button
          onClick={() => navigate('/cart')}
          className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Quay lại giỏ hàng
        </button>
      </div>
    );
  }

  const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000));
  const subtotal = items.reduce((sum, item) => sum + item.roomType.basePrice * item.quantity * nights, 0);

  const discountAmount = (() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'percentage') return (subtotal * appliedPromo.value) / 100;
    if (appliedPromo.type === 'fixed') return appliedPromo.value;
    if (appliedPromo.type === 'free_night') {
      const maxPrice = Math.max(...items.map((i) => i.roomType.basePrice));
      return maxPrice * appliedPromo.value;
    }
    return 0;
  })();

  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    const code = promoCode.toUpperCase().trim();
    setIsApplyingPromo(true);
    try {
      const res = await api.get('/promotions/validate', { params: { code } });
      const promo = res.data.data;

      if (promo.minNights && nights < promo.minNights) {
        toast.error(`Chưa đủ điều kiện: Cần đặt tối thiểu ${promo.minNights} đêm`);
        return;
      }

      setAppliedPromo({ code, type: promo.type, value: promo.value, minNights: promo.minNights });
      toast.success('Áp dụng mã ưu đãi thành công!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Mã ưu đãi không hợp lệ hoặc đã hết hạn!');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const booking = await bookingService.create({
        items: items.map((item) => ({ roomTypeId: item.roomType.id, quantity: item.quantity })),
        checkInDate: checkIn.toISOString(),
        checkOutDate: checkOut.toISOString(),
        guestCount: guests,
        specialRequests: specialRequests || undefined,
        promoCode: appliedPromo?.code,
      });
      clearCart();
      navigate(`/payment/${booking.id}`);
    } catch (error: any) {
      const detail = error.response?.data?.errors?.[0]?.message;
      toast.error(detail || error.response?.data?.message || 'Không thể tạo đơn đặt phòng, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate('/cart')}
        className="text-sm text-primary font-medium hover:underline text-left bg-transparent border-none cursor-pointer w-fit mb-4"
      >
        ← Quay lại giỏ hàng
      </button>

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Xác nhận đặt phòng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left: chi tiết đơn ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Ngày & khách */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h2 className="text-base font-medium text-gray-800 mb-3">Thông tin lưu trú</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div>
                <span className="text-gray-400 block text-xs uppercase tracking-wide mb-0.5">Nhận phòng</span>
                <span className="text-gray-800 font-medium">{checkIn.toLocaleDateString('vi-VN')}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs uppercase tracking-wide mb-0.5">Trả phòng</span>
                <span className="text-gray-800 font-medium">{checkOut.toLocaleDateString('vi-VN')}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs uppercase tracking-wide mb-0.5">Thời gian lưu trú</span>
                <span className="text-gray-800 font-medium">{nights} đêm</span>
              </div>
              <div>
                <span className="text-gray-400 block text-xs uppercase tracking-wide mb-0.5">Số khách</span>
                <span className="text-gray-800 font-medium">{guests} khách</span>
              </div>
            </div>
          </div>

          {/* Danh sách phòng */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
            {items.map((item) => (
              <div key={item.roomType.id} className="flex gap-4 p-4">
                <div className="w-24 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={item.roomType.images?.[0]?.imageUrl || PLACEHOLDER_IMG}
                    alt={item.roomType.typeName}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-sm font-medium text-gray-800">{item.roomType.typeName}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.quantity} phòng × {nights} đêm</p>
                </div>
                <p className="text-sm font-semibold text-gray-800 self-center">
                  {formatVND(item.roomType.basePrice * item.quantity * nights)}
                </p>
              </div>
            ))}
          </div>

          {/* Yêu cầu đặc biệt */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <label htmlFor="specialRequests" className="text-sm font-medium text-gray-800 block mb-2">
              Yêu cầu đặc biệt <span className="text-gray-400 font-normal">(không bắt buộc)</span>
            </label>
            <textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="VD: phòng tầng cao, giường đôi, nhận phòng sớm..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-400 text-right mt-1">{specialRequests.length}/500</p>
          </div>

          {/* Mã ưu đãi */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-medium text-gray-800 mb-3">Mã ưu đãi</h2>
            {!appliedPromo ? (
              <div className="flex gap-2">
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Nhập mã ưu đãi"
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={isApplyingPromo || !promoCode.trim()}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isApplyingPromo ? 'Đang kiểm tra...' : 'Áp dụng'}
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
                <span className="text-sm text-green-700 font-medium">Đã áp dụng mã "{appliedPromo.code}"</span>
                <button
                  onClick={() => { setAppliedPromo(null); setPromoCode(''); }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Bỏ
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: tóm tắt & thanh toán ── */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm sticky top-24">
            <h2 className="text-base font-medium text-gray-800 mb-4">Tóm tắt thanh toán</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tạm tính</span>
                <span className="font-medium text-gray-800">{formatVND(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Giảm giá</span>
                  <span className="font-medium text-green-600">-{formatVND(discountAmount)}</span>
                </div>
              )}
            </div>
            <div className="border-t border-gray-100 my-4" />
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-800">Tổng cộng</span>
              <span className="text-xl font-semibold text-primary">{formatVND(total)}</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-5 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting && (
                <span className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
              )}
              {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt phòng'}
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              Bạn sẽ được chuyển đến trang thanh toán sau khi xác nhận
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
</file>

<file path="src/pages/customer/ComparePage.tsx">
import { useNavigate } from 'react-router-dom';
import { useCompareStore } from '../../stores/compareStore';
import { useSearchStore } from '../../stores/searchStore';

const PLACEHOLDER = 'https://placehold.co/400x250?text=Room';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const ComparePage = () => {
  const { items, clear } = useCompareStore();
  const navigate = useNavigate();
  const { checkIn, checkOut, guests } = useSearchStore();

  if (items.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-gray-400 text-sm">
          Chọn ít nhất 2 hạng phòng để so sánh
        </p>
        <button
          onClick={() => navigate('/rooms')}
          className="text-primary text-sm hover:underline"
        >
          ← Quay lại tìm phòng
        </button>
      </div>
    );
  }

  const [r1, r2] = items;

  const handleBookClick = (roomId: number) => {
    if (checkIn && checkOut) {
      navigate(`/room-type/${roomId}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
    } else {
      navigate(`/room-type/${roomId}`);
    }
  };

  // Gộp tất cả amenities từ 2 phòng
  const allAmenities = Array.from(
    new Set([
      ...(r1.amenities?.map((a: any) => a.amenity?.amenityName || a.amenityName).filter(Boolean) ?? []),
      ...(r2.amenities?.map((a: any) => a.amenity?.amenityName || a.amenityName).filter(Boolean) ?? []),
    ])
  );

  const hasAmenity = (room: typeof r1, name: string) =>
    room.amenities?.some((a: any) => (a.amenity?.amenityName || a.amenityName) === name) ?? false;

  const rows = [
    {
      label: 'Giá / đêm',
      v1: formatVND(Number(r1.basePrice)),
      v2: formatVND(Number(r2.basePrice)),
      highlight: true,
    },
    {
      label: 'Sức chứa',
      v1: `${r1.maxCapacity} người`,
      v2: `${r2.maxCapacity} người`,
      highlight: false,
    },
    {
      label: 'Diện tích (ước tính)',
      v1: r1.maxCapacity <= 2 ? '25m²' : r1.maxCapacity === 3 ? '35m²' : '50m²',
      v2: r2.maxCapacity <= 2 ? '25m²' : r2.maxCapacity === 3 ? '35m²' : '50m²',
      highlight: false,
    },
    {
      label: 'Giá trung bình / khách',
      v1: formatVND(Math.round(Number(r1.basePrice) / r1.maxCapacity)),
      v2: formatVND(Math.round(Number(r2.basePrice) / r2.maxCapacity)),
      highlight: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-gray-800">So sánh hạng phòng</h1>
        <button
          onClick={() => { clear(); navigate('/rooms'); }}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Chọn lại
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">

        {/* Ảnh + Tên phòng */}
        <div className="grid grid-cols-3">
          <div className="bg-gray-50 p-4 flex items-end">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Tiêu chí
            </span>
          </div>
          {[r1, r2].map((room) => (
          <div key={room.id} className="border-l border-gray-100 relative">
              <img
                src={room.images?.[0]?.imageUrl ?? PLACEHOLDER}
                alt={room.typeName}
                className="w-full h-40 object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                }}
              />
            
            {/* Badge phòng trống */}
            {room.availableRoomCount !== undefined && (
              <span className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm ${
                room.availableRoomCount > 0
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-600'
              }`}>
                {room.availableRoomCount > 0
                  ? `Còn ${room.availableRoomCount} phòng`
                  : 'Hết phòng'}
              </span>
            )}

              <div className="p-4">
                <h2 className="font-medium text-gray-800 mb-1">{room.typeName}</h2>
                {room.description && (
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {room.description}
                  </p>
                )}
                <button
                onClick={() => handleBookClick(room.id)}
                  className="mt-3 w-full bg-primary text-white text-xs font-medium py-2 rounded-xl hover:bg-primary-dark transition-colors"
                >
                Xem chi tiết & Đặt phòng →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Các chỉ tiêu chính */}
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 border-t border-gray-100 ${
              row.highlight
                ? 'bg-blue-50/50'
                : i % 2 === 0
                ? 'bg-gray-50/50'
                : 'bg-white'
            }`}
          >
            <div className="px-4 py-3 text-xs font-medium text-gray-500">
              {row.label}
            </div>
            {[row.v1, row.v2].map((v, j) => (
              <div
                key={j}
                className={`px-4 py-3 border-l border-gray-100 text-sm ${
                  row.highlight ? 'font-medium text-primary' : 'text-gray-800'
                }`}
              >
                {v}
              </div>
            ))}
          </div>
        ))}

        {/* Tiện ích */}
        {allAmenities.length > 0 && (
          <div className="border-t border-gray-100">
            <div className="grid grid-cols-3 bg-gray-50 px-4 py-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Tiện ích
              </span>
              <span className="border-l border-gray-100" />
              <span className="border-l border-gray-100" />
            </div>
            {allAmenities.map((name, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-t border-gray-100 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                }`}
              >
                <div className="px-4 py-2.5 text-xs text-gray-600">{name}</div>
                {[r1, r2].map((room, j) => (
                  <div
                    key={j}
                    className="px-4 py-2.5 border-l border-gray-100 text-center"
                  >
                    {hasAmenity(room, name) ? (
                      <span className="text-green-500 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </span>
                    ) : (
                      <span className="text-gray-200 text-base">—</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
</file>

<file path="src/pages/customer/ContactPage.tsx">
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

const contactSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập họ tên'),
  email:    z.string().email('Email không hợp lệ'),
  phone:    z.string().optional(),
  subject:  z.string().min(1, 'Vui lòng chọn chủ đề'),
  message:  z.string().min(10, 'Nội dung tối thiểu 10 ký tự'),
})

const SUBJECTS = [
  'Hỏi về đặt phòng',
  'Thay đổi / Hủy đặt phòng',
  'Góp ý dịch vụ',
  'Báo lỗi hệ thống',
  'Khác',
]

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: any) => {
    // Giả lập gửi form (không cần backend thật)
    await new Promise(r => setTimeout(r, 1000))
    console.log('Contact form submitted:', data)
    toast.success('Đã gửi tin nhắn! Chúng tôi sẽ phản hồi trong 24 giờ.')
    setSubmitted(true)
    reset()
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-medium text-gray-800 mb-3">Liên hệ với chúng tôi</h1>
        <p className="text-base text-gray-500">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">

        {/* ── Thông tin liên hệ ── */}
        <div className="md:col-span-2 flex flex-col gap-5">

          <div className="bg-primary rounded-2xl p-6 text-white">
            <h2 className="text-lg font-medium mb-5">Thông tin liên hệ</h2>
            {[
              { label: 'Địa chỉ',   value: '89 phường Hoàn Kiếm, TP. Hà Nội' },
              { label: 'Điện thoại', value: '0909 123 456' },
              { label: 'Email',      value: 'contact@hotelbooking.vn' },
              { label: 'Giờ làm việc', value: 'Thứ 2 – Chủ nhật\n06:00 – 22:00' },
            ].map(item => (
              <div key={item.label} className="flex gap-3 mb-4 last:mb-0">
                <div>
                  <p className="text-white/60 text-sm mb-0.5">{item.label}</p>
                  <p className="text-base leading-snug whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mạng xã hội */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <p className="text-base font-medium text-gray-800 mb-3">Theo dõi chúng tôi</p>
            <div className="flex gap-3">
              {[
                { label: 'Facebook', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { label: 'Zalo',     color: 'bg-sky-50 text-sky-700 border-sky-200'   },
                { label: 'YouTube',  color: 'bg-red-50 text-red-700 border-red-200'   },
              ].map(s => (
                <button key={s.label}
                  className={`flex items-center gap-1.5 text-sm font-medium
                              px-3 py-2 rounded-xl border ${s.color}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bản đồ Google Maps */}
          <div className="bg-gray-100 rounded-2xl h-64 overflow-hidden border border-gray-100 shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096814183571!2d105.84117131533206!3d21.028811885998316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2sHo%C3%A0n%20Ki%E1%BA%BFm%2C%20Hanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1691234567890!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            />
          </div>
        </div>

        {/* ── Form liên hệ ── */}
        <div className="md:col-span-3">
          <div className="bg-white border border-gray-100 rounded-2xl p-6">

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                <div>
                  <p className="text-lg font-medium text-gray-800 mb-1">Đã gửi thành công!</p>
                  <p className="text-base text-gray-500">
                    Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
                  </p>
                </div>
                <button onClick={() => setSubmitted(false)}
                  className="text-base text-primary hover:underline">
                  Gửi tin nhắn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <h2 className="text-lg font-medium text-gray-800 mb-1">Gửi tin nhắn</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1.5 block">Họ và tên *</label>
                    <input {...register('fullName')} placeholder="Nguyễn Văn A"
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-base w-full
                                 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message as string}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1.5 block">Email *</label>
                    <input {...register('email')} type="email" placeholder="email@example.com"
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-base w-full
                                 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message as string}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Số điện thoại</label>
                  <input {...register('phone')} placeholder="0909 123 456"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-base w-full
                               focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Chủ đề *</label>
                  <select {...register('subject')}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-base w-full
                               focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                               text-gray-700 bg-white">
                    <option value="">-- Chọn chủ đề --</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject.message as string}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 mb-1.5 block">Nội dung *</label>
                  <textarea {...register('message')} rows={5}
                    placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                    className="border border-gray-200 rounded-xl px-4 py-3 text-base w-full
                               resize-none focus:outline-none focus:ring-2
                               focus:ring-primary/20 focus:border-primary" />
                  {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message as string}</p>}
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="bg-primary text-white py-3 rounded-xl text-base font-medium
                             hover:bg-primary-dark disabled:opacity-60
                             flex items-center justify-center gap-2">
                  {isSubmitting && (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  )}
                  Gửi tin nhắn
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
</file>

<file path="src/pages/customer/CustomerBookingDetailPage.tsx">
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '../../services/booking.service';
import { formatVND, formatDate, calcNights } from '../../utils/format';
import CancelBookingModal from '../../components/customer/CancelBookingModal';
import { useState } from 'react';
import ReviewForm from '../../components/customer/ReviewForm';

const CustomerBookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showCancel, setShowCancel] = useState(false);

  const { data: booking, isLoading, isError } = useQuery({
    queryKey: ['bookings', +id!],
    queryFn: () => bookingService.getById(+id!),
    enabled: !!id,
  });

  if (isLoading) return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (isError || !booking) return (
    <div className="text-center py-20">
      <p className="text-gray-400 text-sm mb-4">Không tìm thấy giao dịch</p>
      <button onClick={() => navigate('/my-bookings')} className="text-primary text-sm hover:underline">
        ← Quay lại lịch sử
      </button>
    </div>
  );

  const nights = calcNights(booking.checkInDate, booking.checkOutDate);

  const STATUS = (({
    pending_payment: { label: 'Chờ thanh toán', cls: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    confirmed: { label: 'Đã xác nhận', cls: 'bg-green-50 text-green-700 border-green-200' },
    checked_in: { label: 'Đang lưu trú', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
    checked_out: { label: 'Đã trả phòng', cls: 'bg-purple-50 text-purple-700 border-purple-200' },
    cancelled: { label: 'Đã hủy', cls: 'bg-gray-100 text-gray-500 border-gray-200' },
  } as Record<string, { label: string; cls: string }>)[booking.status]) ?? { label: booking.status, cls: 'bg-gray-100 text-gray-500 border-gray-200' };

  const bookingPayment = booking.payments?.find((p: any) => p.feeType === 'booking') || booking.payments?.[0];

  const PAY_METHOD = (({
    qr_code: 'Chuyển khoản QR',
    cash: 'Tiền mặt',
    card: 'Quẹt thẻ',
  } as Record<string, string>)[bookingPayment?.method ?? '']) ?? '—';

  const getPaymentStatus = () => {
    if (booking.status === 'cancelled') {
      const isRefunded = booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'refunded');
      if (isRefunded) return { label: 'Đã hoàn tiền', cls: 'text-gray-600' };
      
      const isPendingRefund = booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'pending_refund');
      if (isPendingRefund) return { label: 'Chờ hoàn tiền', cls: 'text-orange-600' };
      
      return { label: 'Đã hủy', cls: 'text-gray-500' };
    }
    
    if (booking.paidAt || booking.payments?.some((p: any) => p.feeType === 'booking' && p.status === 'success')) {
      return { label: 'Đã thanh toán', cls: 'text-green-600' };
    }
    
    return { label: 'Chờ thanh toán', cls: 'text-yellow-600' };
  };

  const PAY_STATUS = getPaymentStatus();
  const canCancel = ['confirmed', 'pending_payment'].includes(booking.status);

  const discountAmount = Number((booking as any).discountAmount) || 0;
  const promoCode = (booking as any).promoCode;
  const bookingSource = (booking as any).source || 'online';
  const refundPaymentInfo = booking.payments?.find((p: any) => p.feeType === 'refund');

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate('/my-bookings')}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          ← Lịch sử đặt phòng
        </button>
        <span className="text-gray-300 text-sm">/</span>
        <span className="text-sm text-gray-500">Chi tiết đơn #{booking.id}</span>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-medium text-gray-800">
            Đơn đặt phòng #{booking.id}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Đặt ngày {formatDate(booking.createdAt)}
          </p>
        </div>
        <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${STATUS.cls}`}>
          {STATUS.label}
        </span>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4">
        {booking.room?.roomType?.images?.[0]?.imageUrl ? (
          <img
            src={booking.room.roomType.images[0].imageUrl}
            alt={booking.room?.roomType?.typeName}
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-48 bg-primary/5 flex items-center justify-center border-b border-primary/10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-primary/20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}

        <div className="p-5">
          <h2 className="text-base font-medium text-gray-800 mb-1">
            {booking.room?.roomType?.typeName}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Phòng {booking.room?.roomNumber}
            {booking.room?.floor ? ` · Tầng ${booking.room.floor}` : ''}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Nhận phòng</p>
              <p className="text-sm font-medium text-gray-800">
                {formatDate(booking.checkInDate)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Trả phòng</p>
              <p className="text-sm font-medium text-gray-800">
                {formatDate(booking.checkOutDate)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Số đêm</p>
              <p className="text-sm font-medium text-gray-800">{nights} đêm</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Số khách</p>
              <p className="text-sm font-medium text-gray-800">
                {booking.guestCount} khách
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
        <h2 className="text-sm font-medium text-gray-800 mb-4">Thông tin thanh toán</h2>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Phương thức</span>
            <span className="text-gray-800">{PAY_METHOD}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Trạng thái</span>
            <span className={`font-medium ${PAY_STATUS.cls}`}>{PAY_STATUS.label}</span>
          </div>
          
          {booking.paidAt && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Thời gian thanh toán</span>
              <span className="text-gray-800">{formatDate(booking.paidAt)}</span>
            </div>
          )}
          {bookingPayment?.transactionRef && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Mã giao dịch</span>
              <span className="text-gray-600 font-mono text-xs">
                {bookingPayment.transactionRef.slice(0, 20)}...
              </span>
            </div>
          )}

          {discountAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Ưu đãi {promoCode ? `(${promoCode})` : ''}</span>
              <span className="font-medium text-green-600">
                - {formatVND(discountAmount)}
              </span>
            </div>
          )}

          <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Tổng tiền</span>
            <div className="flex flex-col items-end">
              {discountAmount > 0 && (
                <span className="text-xs text-gray-400 line-through mb-0.5">
                  {formatVND(Number(booking.totalAmount) + discountAmount)}
                </span>
              )}
              <span className="text-xl font-medium text-primary">
                {formatVND(booking.totalAmount)}
              </span>
            </div>
          </div>

          {booking.status === 'cancelled' && refundPaymentInfo && (
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center mt-3">
              <span className={`text-sm font-medium ${refundPaymentInfo.status === 'refunded' ? 'text-green-600' : 'text-orange-600'}`}>
                Số tiền hoàn lại {refundPaymentInfo.status === 'refunded' ? '(Đã hoàn)' : ''}
              </span>
              <span className={`text-lg font-medium ${refundPaymentInfo.status === 'refunded' ? 'text-green-600' : 'text-orange-600'}`}>
                {formatVND(Number(refundPaymentInfo.amount))}
              </span>
            </div>
          )}

          {booking.status === 'cancelled' && booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'pending_refund') && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-700 mt-2">
              <span>Đang xử lý hoàn tiền (dự kiến 3–5 ngày làm việc)</span>
            </div>
          )}

          {booking.status === 'cancelled' && booking.payments?.some((p: any) => p.feeType === 'refund' && p.status === 'refunded') && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-700 mt-2">
              <span>Đã hoàn tiền thành công</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Nguồn đặt phòng</span>
          <span className={`font-medium px-2.5 py-1 rounded-full text-xs border ${
            bookingSource === 'online'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'bg-orange-50 text-orange-700 border-orange-200'
          }`}>
            {bookingSource === 'online' ? 'Trực tuyến' : 'Tại quầy'}
          </span>
        </div>
      </div>

      {booking.status === 'checked_out' && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-medium text-gray-800 mb-4">Đánh giá trải nghiệm</h2>
          
          {!booking.review ? (
            <ReviewForm 
              bookingId={booking.id} 
              onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: ['bookings', +id!] });
                queryClient.invalidateQueries({ queryKey: ['bookings'] });
              }}
            />
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < booking.review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-400">Bạn đã đánh giá vào {formatDate(booking.review.createdAt)}</span>
              </div>
              {booking.review.comment && (
                <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {booking.review.comment}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        {booking.status === 'pending_payment' && (
          <button
            onClick={() => navigate(`/payment/${booking.id}`)}
            className="flex-1 bg-primary text-white py-3 rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Tiến hành thanh toán
          </button>
        )}

        {canCancel && (
          <button
            onClick={() => setShowCancel(true)}
            className="flex-1 border border-red-200 text-red-500 py-3 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors"
          >
            Hủy đặt phòng
          </button>
        )}

        {!canCancel && booking.status !== 'pending_payment' && (
          <button
            onClick={() => navigate('/my-bookings')}
            className="w-full border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Quay lại lịch sử
          </button>
        )}
      </div>

      <CancelBookingModal
        bookingId={booking.id}
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
        onConfirmed={() => {
          setShowCancel(false);
          navigate('/my-bookings');
        }}
      />
    </div>
  );
};

export default CustomerBookingDetailPage;
</file>

<file path="src/pages/customer/ForgotPasswordPage.tsx">
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../../services/api';

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

type FormValues = z.infer<typeof schema>;

const ForgotPasswordPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await api.post('/auth/forgot-password', { email: data.email });
      setSubmitted(true);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  return (
    <div className="w-full">
      
      {/* HEADER */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Quên mật khẩu</h2>
        <p className="text-sm text-gray-500 mt-2">Nhập email để nhận link đặt lại mật khẩu</p>
      </div>

      {submitted ? (
        /* TRẠNG THÁI GỬI THÀNH CÔNG */
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
            <p className="text-sm text-green-700 font-semibold mb-1">
              Kiểm tra hộp thư của bạn
            </p>
            <p className="text-sm text-green-600 leading-relaxed">
              Chúng tôi đã gửi link đặt lại mật khẩu. Vui lòng kiểm tra hộp thư (kể cả Spam).
            </p>
          </div>
          <div className="text-center">
            <Link to="/login" className="text-sm font-semibold text-primary hover:underline">
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      ) : (
        /* FORM NHẬP EMAIL */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register('email')}
              disabled={isSubmitting}
              className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium rounded-xl px-4 py-3 text-sm transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang gửi...
                </>
              ) : (
                'Gửi link đặt lại mật khẩu'
              )}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
</file>

<file path="src/pages/customer/HomePage.tsx">
import { useNavigate } from 'react-router-dom';
import SearchForm from '../../components/customer/SearchForm';
import RoomCard from '../../components/customer/RoomCard';
import { useAllRoomTypes, useAvailableRooms } from '../../hooks/queries/use-hotels.query';
import { useSearchStore } from '../../stores/searchStore';

const STATS = [
  { number: '24+', label: 'Hạng phòng sang trọng' },
  { number: '5★', label: 'Tiêu chuẩn quốc tế' },
  { number: '24/7', label: 'Dịch vụ cá nhân hóa' },
  { number: '98%', label: 'Khách hàng hài lòng' },
];

const AMENITIES = [
  { title: 'Ẩm thực tinh hoa', desc: 'Nhà hàng 5 sao với thực đơn Á - Âu', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600' },
  { title: 'Thư giãn tuyệt đối', desc: 'Spa & Massage trị liệu cao cấp', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600' },
  { title: 'Hồ bơi vô cực', desc: 'Tầm nhìn toàn cảnh thành phố', img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600' },
];

const TESTIMONIALS = [
  { name: 'Trần Văn A', rating: 5, comment: 'Không gian sang trọng, yên tĩnh. Nhân viên hỗ trợ check-in rất nhanh chóng. Trải nghiệm tuyệt vời!' },
  { name: 'Lê Thị B', rating: 5, comment: 'Phòng Suite có view toàn cảnh cực kỳ ấn tượng. Chắc chắn sẽ chọn nơi này cho chuyến công tác tới.' },
  { name: 'Phạm Minh C', rating: 4, comment: 'Bữa sáng buffet ngon và đa dạng. Hồ bơi sạch sẽ. Rất đáng với mức giá bỏ ra.' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { checkIn, checkOut, guests } = useSearchStore();
  const isSearching = !!(checkIn && checkOut);

  const { data: allRooms, isLoading: isLoadingAll } = useAllRoomTypes();
  const { data: availableRoomsData, isLoading: isLoadingAvailable } = useAvailableRooms({
    checkIn,
    checkOut,
    guests: guests || 1,
  });

  const roomList = (isSearching ? availableRoomsData : allRooms) || [];
  const isLoading = isSearching ? isLoadingAvailable : isLoadingAll;
  const featuredRooms = roomList.slice(0, 3);

  return (
    // Dùng w-screen và margin âm để phá vỡ container của Layout, giúp ảnh sát lên Header và tràn viền
    <div className="min-h-screen w-screen relative left-1/2 -translate-x-1/2 -mt-4 md:-mt-6 overflow-hidden">

      {/* ── SECTION 1: HERO IMAGE + SEARCH ── */}
      <section className="relative min-h-[600px] flex flex-col items-center justify-center px-6 py-24 bg-gray-900">
        {/* Ảnh nền có phủ mờ */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay đen mờ */}

        <div className="text-center mb-10 relative z-10 mt-8">
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-5 tracking-wide">
            Nghệ Thuật Lưu Trú Đích Thực
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Đánh thức mọi giác quan tại không gian nghỉ dưỡng đẳng cấp giữa lòng thủ đô. Khám phá sự tĩnh lặng và tiện nghi hoàn hảo dành riêng cho bạn.
          </p>
        </div>

        {/* Form tìm kiếm nổi bật */}
        <div className="w-full max-w-6xl relative z-10">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-6">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SỐ LIỆU NỔI BẬT ── */}
      <section className="bg-white py-12 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <p className="text-4xl font-semibold text-primary">{item.number}</p>
              <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: HẠNG PHÒNG NỔI BẬT ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-2">
                Không Gian Lưu Trú
              </h2>
              <p className="text-sm text-gray-500 max-w-xl">
                Từng hạng phòng được thiết kế tỉ mỉ, giao thoa giữa nét đẹp truyền thống và hơi thở hiện đại, mang đến sự thoải mái tuyệt đối.
              </p>
            </div>
            <button
              onClick={() => navigate('/rooms')}
              className="text-primary text-sm font-medium hover:underline whitespace-nowrap"
            >
              Xem tất cả hạng phòng →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-3 flex justify-center py-20">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-gray-500 animate-pulse">
                    {isSearching ? 'Đang kiểm tra phòng trống...' : 'Đang tải dữ liệu phòng...'}
                  </span>
                </div>
              </div>
            ) : featuredRooms.length > 0 ? (
              featuredRooms.map((room: any) => (
                <RoomCard
                  key={room.id}
                  id={room.id.toString()}
                  name={room.typeName || room.name || 'Phòng chưa có tên'}
                  image={room.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a'}
                  price={room.basePrice || room.price || 0}
                  maxCapacity={room.maxCapacity}
                  availableRooms={room.availableRoomCount ?? room._count?.rooms ?? 0}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-500">
                {isSearching ? 'Rất tiếc, không còn phòng nào trống trong thời gian này.' : 'Hệ thống hiện tại chưa có dữ liệu phòng nào.'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TIỆN ÍCH & TRẢI NGHIỆM ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-2">
              Trải Nghiệm Đẳng Cấp
            </h2>
            <p className="text-sm text-gray-500">Dịch vụ tiện ích trọn vẹn nâng tầm kỳ nghỉ của bạn</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {AMENITIES.map((item) => (
              <div key={item.title} className="group cursor-pointer">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: BANNER ƯU ĐÃI KHUYẾN MÃI ── */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto bg-primary rounded-3xl overflow-hidden shadow-lg relative">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
           <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Ưu đãi mùa hè</span>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">Kỳ nghỉ trọn vẹn - Giá siêu ưu đãi</h2>
                <p className="text-primary-100 text-sm md:text-base text-white/90">Giảm ngay 15% cho khách hàng đặt phòng trước 14 ngày.</p>
              </div>
              <button 
                onClick={() => navigate('/promotions')} 
                className="bg-white text-primary px-8 py-3 rounded-xl font-medium shadow-md hover:bg-gray-50 transition-colors shrink-0"
              >
                Khám phá ngay
              </button>
           </div>
        </div>
      </section>

      {/* ── SECTION 6: ĐÁNH GIÁ KHÁCH HÀNG ── */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-2">
              Khách hàng nói gì về chúng tôi?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
                <div className="text-4xl text-gray-200 absolute top-4 right-6 font-serif">"</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{review.name}</p>
                    <div className="flex text-amber-400 gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic relative z-10">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
</file>

<file path="src/pages/customer/LoginPage.tsx">
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { useAuthStore } from '../../stores/authStore';

// Đã gỡ bỏ giới hạn 6 ký tự để Backend tự kiểm tra
const loginSchema = z.object({
  identifier: z.string().min(1, 'Vui lòng nhập Email hoặc Số điện thoại'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'), 
});

type LoginFormValues = z.infer<typeof loginSchema>;
type LoginLocationState = {
  from?: {
    pathname: string;
    search?: string;
  };
};

const LoginPage: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string>(''); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      setLoginError(''); 
      
      await login(data.identifier, data.password);
      
      const currentUser = useAuthStore.getState().user;
      const locationState = location.state as LoginLocationState | null;
      const encodedRedirectPath = searchParams.get('redirect') || searchParams.get('returnUrl');
      const redirectPath =
        (encodedRedirectPath ? decodeURIComponent(encodedRedirectPath) : null) ||
        (locationState?.from
          ? `${locationState.from.pathname}${locationState.from.search ?? ''}`
          : null);
      
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        return;
      }

      if (currentUser?.role === 'admin' || currentUser?.role === 'receptionist') {
        navigate('/admin/bookings', { replace: true });
      } else {
        navigate('/', { replace: true }); 
      }
      
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';

      setLoginError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Đăng nhập</h2>
        <p className="text-sm text-gray-500 mt-2">Chào mừng bạn quay trở lại</p>
      </div>

      {/* Khung báo lỗi từ Server */}
      {loginError && (
        <div className="mb-5 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{loginError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Email / Số điện thoại</label>
          <input
            type="text"
            placeholder="Nhập email hoặc SĐT"
            {...register('identifier')}
            disabled={isSubmitting}
            className={`border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
              errors.identifier ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {errors.identifier && (
            <span className="text-xs text-red-500">{errors.identifier.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              disabled={isSubmitting}
              className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
            >
              {showPassword ? 'Ẩn' : 'Hiện'}
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs text-red-500">
              {errors.password ? errors.password.message : ''}
            </span>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary hover:underline ml-auto"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium rounded-xl px-4 py-3 text-sm transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang xử lý...
            </>
          ) : (
            'Đăng nhập'
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
</file>

<file path="src/pages/customer/PaymentPage.tsx">
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useInitiatePayment, useSimulatePayment } from '../../hooks/mutations/usePaymentMutation';
import { usePaymentStatus } from '../../hooks/queries/useBookingsQuery';
import { useSocketBooking } from '../../hooks/useSocketBooking';
import { formatVND } from '../../utils/format';

interface PaymentData {
  paymentId: number;
  transactionRef: string;
  qrPayload: string;
  amount: number;
  expiredAt: string;
}

const formatCountdown = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const PaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isSuccessHandled = useRef(false);

  useSocketBooking(Number(id));

  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { mutate: initiate } = useInitiatePayment();
  const { mutate: simulate, isPending: isSimulating } = useSimulatePayment();

  const { data: statusData } = usePaymentStatus(
    Number(id),
    !!paymentData
  );

  useEffect(() => {
    initiate(Number(id), {
      onSuccess: (data) => {
        setPaymentData(data);
        const seconds = Math.ceil(
          (new Date(data.expiredAt).getTime() - Date.now()) / 1000
        );
        setTimeLeft(Math.max(0, seconds));
      },
      onError: () => {
        toast.error('Không thể khởi tạo thanh toán');
        navigate('/rooms');
      },
    });
  }, [id, initiate, navigate]);

  useEffect(() => {
    if (!paymentData) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          toast.error('Phiên thanh toán đã hết hạn');
          navigate('/rooms');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [paymentData, navigate]);

  useEffect(() => {
    if (!statusData) return;

    if (statusData.bookingStatus === 'confirmed' && !isSuccessHandled.current) {
      isSuccessHandled.current = true;
      queryClient.invalidateQueries();
      toast.success('Thanh toán thành công!');
      navigate('/my-bookings');
    }
  }, [statusData, navigate, queryClient]);

  const handleSimulate = () => {
    if (!paymentData) return;
    simulate(paymentData.transactionRef, {
      onSuccess: () => {
        if (!isSuccessHandled.current) {
          isSuccessHandled.current = true;
          queryClient.invalidateQueries();
          toast.success('Thanh toán thành công!');
          navigate('/my-bookings');
        }
      },
      onError: () => toast.error('Giả lập thất bại'),
    });
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Đang khởi tạo thanh toán...</span>
        </div>
      </div>
    );
  }

  const isExpiringSoon = timeLeft < 60;
  const isFailed = statusData?.paymentStatus === 'failed';

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-6 py-8">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col items-center gap-5">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-800 mb-1">
            Thanh toán đơn đặt phòng
          </h2>
          <p className="text-sm text-gray-500 font-normal">
            Quét mã QR để hoàn tất thanh toán
          </p>
        </div>

        <div className="text-center">
          <span className="text-xs text-gray-400">Số tiền cần thanh toán</span>
          <p className="text-2xl font-semibold text-primary">
            {formatVND(paymentData.amount)}
          </p>
        </div>

        {isFailed ? (
          <div className="flex flex-col items-center gap-2 py-8">
            <p className="text-red-500 font-medium text-sm">Thanh toán thất bại</p>
            <p className="text-gray-500 text-sm">Vui lòng thử lại hoặc chọn phòng khác</p>
          </div>
        ) : (
          <div className="p-3 border border-gray-100 rounded-2xl">
            <QRCodeSVG
              value={paymentData.qrPayload}
              size={200}
              level="M"
            />
          </div>
        )}

        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-gray-400">Thời gian còn lại</span>
          <span className={`text-2xl font-semibold tabular-nums ${
            isExpiringSoon ? 'text-red-500' : 'text-gray-800'
          }`}>
            {formatCountdown(timeLeft)}
          </span>
          {isExpiringSoon && (
            <span className="text-xs text-red-400">Sắp hết hạn</span>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          Mã giao dịch: {paymentData.transactionRef}
        </p>

        {import.meta.env.DEV && (
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="w-full py-2.5 border border-primary text-primary text-sm font-medium rounded-xl hover:bg-primary hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isSimulating ? 'Đang xử lý...' : 'Thanh toán thành công'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
</file>

<file path="src/pages/customer/ProfilePage.tsx">
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../../services/auth.service';
import type { User } from '../../types/auth.types';
import { useLocation, useNavigate } from 'react-router-dom';

// ── Update Info Form ───────────────────────────────────────────────────────────

const updateInfoSchema = z.object({
  fullName: z.string().min(2, 'Tối thiểu 2 ký tự'),
  phoneNumber: z.string().regex(/^\d{10,11}$/, 'SĐT không hợp lệ'),
});

type UpdateInfoValues = z.infer<typeof updateInfoSchema>;

const UpdateInfoForm = ({
  user,
  onSuccess,
}: {
  user: User | null;
  onSuccess: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateInfoValues>({
    resolver: zodResolver(updateInfoSchema),
    defaultValues: {
      fullName: user?.fullName ?? '',
      phoneNumber: user?.phoneNumber ?? '',
    },
  });

  const onSubmit = async (data: UpdateInfoValues) => {
    try {
      await authService.updateProfile(data);
      await onSuccess();
      toast.success('Cập nhật thông tin thành công');
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Có lỗi xảy ra');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">Họ và tên</label>
        <input
          {...register('fullName')}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">Email</label>
        <input
          value={user?.email ?? ''}
          disabled
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-base bg-gray-50 text-gray-400 cursor-not-allowed w-full"
        />
        <p className="text-sm text-gray-400">Email không thể thay đổi</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">Số điện thoại</label>
        <input
          {...register('phoneNumber')}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-xl text-base font-medium flex items-center justify-center gap-2 mt-2 transition-colors"
      >
        {isSubmitting && (
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        )}
        Lưu thay đổi
      </button>
    </form>
  );
};

// ── Change Password Form ───────────────────────────────────────────────────────

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Nhập mật khẩu hiện tại'),
    newPassword: z.string().min(6, 'Tối thiểu 6 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordValues) => {
    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Đổi mật khẩu thành công');
      reset();
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Có lỗi xảy ra');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Mật khẩu hiện tại */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">Mật khẩu hiện tại</label>
        <div className="relative">
          <input
            {...register('currentPassword')}
            type={showCurrent ? 'text' : 'password'}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full pr-16"
          />
          <button
            type="button"
            onClick={() => setShowCurrent((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600"
          >
            {showCurrent ? 'Ẩn' : 'Hiện'}
          </button>
        </div>
        {errors.currentPassword && (
          <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
        )}
      </div>

      {/* Mật khẩu mới */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">Mật khẩu mới</label>
        <div className="relative">
          <input
            {...register('newPassword')}
            type={showNew ? 'text' : 'password'}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full pr-16"
          />
          <button
            type="button"
            onClick={() => setShowNew((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600"
          >
            {showNew ? 'Ẩn' : 'Hiện'}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-sm text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Xác nhận mật khẩu */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-600">Xác nhận mật khẩu</label>
        <input
          {...register('confirmPassword')}
          type={showNew ? 'text' : 'password'}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-xl text-base font-medium flex items-center justify-center gap-2 mt-2 transition-colors"
      >
        {isSubmitting && (
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        )}
        Đổi mật khẩu
      </button>
    </form>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────────

const ROLE_LABEL: Record<string, string> = {
  admin: 'Quản trị viên',
  receptionist: 'Lễ tân',
  customer: 'Khách hàng',
};

const ROLE_CLASS: Record<string, string> = {
  admin: 'bg-purple-50 text-purple-700',
  receptionist: 'bg-blue-50 text-blue-700',
  customer: 'bg-gray-100 text-gray-600',
};

const ProfilePage = () => {
  const { user, getMe } = useAuthStore();

  const [tab, setTab] = useState<'info' | 'password'>('info');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarLoading(true);
    try {
      await authService.uploadAvatar(file);
      await getMe();
      toast.success('Cập nhật ảnh đại diện thành công');
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Upload thất bại');
    } finally {
      setAvatarLoading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-medium text-gray-800 mb-6">Hồ sơ cá nhân</h1>

      {/* ── Avatar ── */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-accent flex items-center justify-center">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="text-white text-3xl font-medium">
                {user?.fullName?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <button
            onClick={() => fileRef.current?.click()}
            disabled={avatarLoading}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs hover:bg-primary-dark shadow-md disabled:opacity-60 transition-colors"
          >
            {avatarLoading ? (
              <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            )}
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <p className="text-sm text-gray-400 mt-3">
          Nhấn vào + để đổi ảnh (tối đa 2MB)
        </p>
        <p className="text-lg font-medium text-gray-800 mt-2">{user?.fullName}</p>
        <p className="text-base text-gray-500">{user?.email}</p>

        {user?.role && (
          <span className={`mt-2 text-sm font-medium px-3 py-1 rounded-full ${ROLE_CLASS[user.role] ?? 'bg-gray-100 text-gray-600'}`}>
            {ROLE_LABEL[user.role] ?? user.role}
          </span>
        )}
      </div>

      {/* ── Tabs ── */}
      <div className="flex border-b border-gray-100 mb-6">
        {[
          { key: 'info', label: 'Thông tin cá nhân' },
          { key: 'password', label: 'Đổi mật khẩu' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as 'info' | 'password')}
            className={`pb-3 mr-6 text-base font-medium border-b-2 transition-colors ${
              tab === t.key
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'info' && <UpdateInfoForm user={user} onSuccess={getMe} />}
      {tab === 'password' && <ChangePasswordForm />}
    </div>
  );
};

export default ProfilePage;
</file>

<file path="src/pages/customer/PromotionsPage.tsx">
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const PromotionsPage = () => {
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Đã sao chép mã ưu đãi: ${code}`);
  };

  const { data: rawData, isLoading } = useQuery({
    queryKey: ['public', 'promotions'],
    queryFn: () => api.get('/promotions/public').then((r) => r.data),
  });

  const extractData = () => {
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData;
    if (Array.isArray(rawData.data)) return rawData.data;
    if (Array.isArray(rawData.promotions)) return rawData.promotions;
    if (Array.isArray(rawData.data?.promotions)) return rawData.data.promotions;
    return [];
  };

  // Lọc ra các mã đang bật và chưa quá hạn
  const validPromotions = extractData().filter((p: any) => {
    const isNotExpired = new Date(p.endDate) >= new Date();
    return p.isActive && isNotExpired;
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
    <div className="text-center mb-10">
      <h1 className="text-3xl font-medium text-gray-800 mb-2">Ưu đãi đặc biệt</h1>
      <p className="text-base text-gray-500">Những ưu đãi tốt nhất dành riêng cho bạn</p>
    </div>

    {isLoading && (
      <div className="text-center py-20">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Đang tải các chương trình ưu đãi...</p>
      </div>
    )}

    {!isLoading && validPromotions.length === 0 && (
      <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
        <p className="text-gray-500 text-lg">Hiện tại hệ thống chưa có chương trình ưu đãi nào.</p>
      </div>
    )}

    <div className="grid md:grid-cols-2 gap-6">
      {!isLoading && validPromotions.map((promo: any) => {
        let badge = '';
        let title = '';
        let desc = '';
        let tag = 'VOUCHER';
        let condition = `Áp dụng từ ${formatDate(promo.startDate)} đến ${formatDate(promo.endDate)}`;

        if (promo.type === 'percentage') {
          badge = `-${promo.value}%`;
          title = `Giảm ${promo.value}% tổng hóa đơn`;
          desc = `Nhập mã ${promo.code} để được giảm trực tiếp ${promo.value}% trên tổng giá trị đơn đặt phòng.`;
          tag = 'HOT DEAL';
        } else if (promo.type === 'fixed') {
          badge = `-${formatVND(promo.value)}`;
          title = `Giảm trực tiếp ${formatVND(promo.value)}`;
          desc = `Nhận ngay ưu đãi giảm ${formatVND(promo.value)} khi sử dụng mã ${promo.code} lúc thanh toán.`;
        } else if (promo.type === 'free_night') {
          badge = `+${promo.value} đêm`;
          title = `Tặng thêm ${promo.value} đêm miễn phí`;
          desc = `Tận hưởng thêm ${promo.value} đêm lưu trú hoàn toàn miễn phí khi đặt phòng cùng chúng tôi.`;
          tag = 'STAY MORE';
        }

        if (promo.minNights) {
          condition += ` (Yêu cầu đặt tối thiểu ${promo.minNights} đêm)`;
        }

        return (
        <div key={promo.id}
             className="bg-white rounded-3xl overflow-hidden border border-gray-200 
                        hover:border-[#17365D]/30 hover:shadow-xl 
                        hover:-translate-y-1 transition-all duration-300 flex flex-col">
          
          {/* Phần đầu: Nền Xanh Navy đậm (sáng hơn xíu nữa) */}
          <div className="bg-[#17365D] p-6 md:p-8 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            <div className="relative z-10 flex justify-between items-start mb-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10">
                {tag}
              </span>
            </div>
            <h3 className="relative z-10 text-xl font-medium text-white mb-2">{title}</h3>
            <span className="relative z-10 text-4xl md:text-5xl font-bold text-amber-400 tracking-tight">{badge}</span>
          </div>

          {/* Phần nội dung: Nền Trắng */}
          <div className="p-6 md:p-8 flex-1 flex flex-col bg-white">
            <p className="text-gray-600 text-base mb-6 leading-relaxed flex-1">
              {desc}
            </p>
            
            {/* Hộp điều kiện */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-500 shrink-0 mt-0.5">
                <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-500 italic">{condition}</p>
            </div>

            <button
               onClick={() => handleCopyCode(promo.code)}
               className="block w-full text-center border-2 border-dashed border-[#17365D] text-[#17365D]
                          py-3 rounded-xl text-base font-medium shadow-sm
                          hover:bg-[#17365D] hover:text-white transition-all duration-300">
              Lấy mã: {promo.code}
            </button>
          </div>
        </div>
      )})}
    </div>

    {/* Banner cuối đồng bộ màu Xanh Navy */}
    <div className="mt-10 bg-[#17365D] rounded-3xl p-8 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      <div className="relative z-10">
        <h2 className="text-2xl font-medium mb-2">Đăng ký nhận ưu đãi mới nhất</h2>
        <p className="text-white/70 text-base mb-5">
          Nhận thông báo về khuyến mãi và ưu đãi độc quyền qua email
        </p>
        <div className="flex gap-2 justify-center max-w-sm mx-auto">
          <input type="email" placeholder="Email của bạn"
                 className="flex-1 px-4 py-2.5 rounded-xl text-base text-gray-800 bg-white border border-transparent
                            focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-400 shadow-sm" />
          <button className="bg-amber-400 text-[#17365D] px-5 py-2.5 rounded-xl text-base
                             font-bold hover:bg-amber-500 transition-colors whitespace-nowrap shadow-sm">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PromotionsPage
</file>

<file path="src/pages/customer/RegisterPage.tsx">
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner'; 

import { useAuthStore } from '../../stores/authStore';
import type { RegisterDTO } from '../../types/auth.types';

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    phoneNumber: z.string().regex(/^[0-9]{10,11}$/, 'Số điện thoại phải gồm 10 đến 11 chữ số'),
    password: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .regex(/[a-z]/, 'Phải chứa ít nhất 1 chữ thường')
      .regex(/[A-Z]/, 'Phải chứa ít nhất 1 chữ hoa')
      .regex(/[0-9]/, 'Phải chứa ít nhất 1 số')
      .regex(/[\W_]/, 'Phải chứa ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { register: registerAction } = useAuthStore();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched', // Hiện lỗi đỏ ngay khi người dùng nhập sai và blur ra ngoài
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsSubmitting(true);

      const payload: RegisterDTO = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      };

      await registerAction(payload);
      
      toast.success('Đăng ký tài khoản thành công!');
      navigate('/login');
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'Đăng ký thất bại. Vui lòng thử lại sau.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Tạo tài khoản mới</h2>
        <p className="text-sm text-gray-500 mt-2">Điền thông tin bên dưới để đăng ký</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Họ và tên</label>
          <input
            type="text"
            placeholder="Nhập họ và tên"
            {...register('fullName')}
            disabled={isSubmitting}
            className={`border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
              errors.fullName ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {errors.fullName && <span className="text-xs text-red-500">{errors.fullName.message}</span>}
        </div>

        {/* Grid: Email & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              {...register('email')}
              disabled={isSubmitting}
              className={`border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="text"
              placeholder="0912345678"
              {...register('phoneNumber')}
              disabled={isSubmitting}
              className={`border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.phoneNumber && <span className="text-xs text-red-500">{errors.phoneNumber.message}</span>}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu"
              {...register('password')}
              disabled={isSubmitting}
              className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
            >
              {showPassword ? 'Ẩn' : 'Hiện'}
            </button>
          </div>
          <p className="text-[11px] text-gray-400">
            * Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
          </p>
          {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Nhập lại mật khẩu"
              {...register('confirmPassword')}
              disabled={isSubmitting}
              className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isSubmitting}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
            >
              {showConfirmPassword ? 'Ẩn' : 'Hiện'}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium rounded-xl px-4 py-3 text-sm transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang đăng ký...
            </>
          ) : (
            'Đăng ký'
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Đã có tài khoản?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
</file>

<file path="src/pages/customer/ResetPasswordPage.tsx">
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../../services/api';

const schema = z
  .object({
    password: z
      .string()
      .min(8, 'Mật khẩu tối thiểu 8 ký tự')
      .regex(/[a-z]/, 'Phải có ít nhất 1 chữ thường')
      .regex(/[A-Z]/, 'Phải có ít nhất 1 chữ hoa')
      .regex(/[0-9]/, 'Phải có ít nhất 1 số')
      .regex(/[\W_]/, 'Phải có ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  // Thêm state để quản lý ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Nếu không có token -> redirect ngay
  useEffect(() => {
    if (!token) {
      toast.error('Link không hợp lệ');
      navigate('/login');
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await api.post('/auth/reset-password', {
        token,
        password: data.password,
      });
      toast.success('Đặt lại mật khẩu thành công!');
      navigate('/login');
    } catch (err: any) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 400) {
        setError('root', {
          message: 'Link đã hết hạn. Vui lòng yêu cầu lại.',
        });
        return;
      }

      toast.error(message ?? 'Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  if (!token) return null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Đặt lại mật khẩu</h2>
        <p className="text-sm text-gray-500 mt-2">Nhập mật khẩu mới cho tài khoản của bạn</p>
      </div>

      {/* Token hết hạn */}
      {errors.root && (
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
            <p className="text-sm text-red-700 font-semibold mb-1">
              Đã có lỗi xảy ra
            </p>
            <p className="text-sm text-red-600 leading-relaxed">
              {errors.root.message}
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-4">
            <button
              onClick={() => navigate('/forgot-password')}
              className="w-full flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-xl px-4 py-3 text-sm transition-all"
            >
              Gửi lại email
            </button>
            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {!errors.root && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Mật khẩu mới</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu mới"
                {...register('password')}
                disabled={isSubmitting}
                className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
              >
                {showPassword ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu mới"
                {...register('confirmPassword')}
                disabled={isSubmitting}
                className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isSubmitting}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
              >
                {showConfirmPassword ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium rounded-xl px-4 py-3 text-sm transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                'Xác nhận đặt lại'
              )}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;
</file>

<file path="src/pages/customer/RoomDetailPage.tsx">
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useRoomTypeDetail, useAvailableRooms } from '../../hooks/queries/use-hotels.query';
import { useAuthStore } from '../../stores/authStore';
import { useSearchStore } from '../../stores/searchStore';
import { ReviewList } from '../../components/customer/ReviewList';
import { useCartStore } from '../../stores/cartStore';

const PLACEHOLDER = 'https://placehold.co/800x500?text=No+Image';

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const calcNights = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 0;
  return Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
  );
};

const RoomDetailPage = () => {
  const { roomTypeId } = useParams<{ roomTypeId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const searchStore = useSearchStore();

  const checkIn = searchParams.get('checkIn') || searchStore.checkIn || '';
  const checkOut = searchParams.get('checkOut') || searchStore.checkOut || '';
  const guests = searchParams.get('guests') || searchStore.guests?.toString() || '1';

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: roomType, isLoading, isError } = useRoomTypeDetail(
    Number(roomTypeId)
  );

  const { data: availableRooms, isSuccess: availabilityLoaded } = useAvailableRooms({
    checkIn, checkOut, guests: Number(guests),
  });

  const matched = availableRooms?.find((r) => r.id === Number(roomTypeId));
  const liveAvailableCount = matched?.availableRoomCount ?? (availabilityLoaded ? 0 : undefined);
  const maxQuantity = Math.min(liveAvailableCount ?? 1, 10); // 10 = giới hạn cứng của backend (bookingItemSchema)

  const [quantity, setQuantity] = useState(1);
  useEffect(() => { setQuantity(1); }, [roomTypeId, checkIn, checkOut]); // reset khi đổi phòng/ngày

  const nights = calcNights(checkIn, checkOut);
  const basePrice = Number(roomType?.basePrice ?? 0);
  const total = nights * basePrice * quantity;

  // 8. Không crash nếu thiếu ảnh & Sắp xếp theo displayOrder
  const images =
    roomType?.images && roomType.images.length > 0
      ? [...roomType.images].sort((a, b) => a.displayOrder - b.displayOrder)
      : [{ id: 0, imageUrl: PLACEHOLDER, displayOrder: 0 }];

  // 3. Prev/Next button logic
  const handlePrev = () =>
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));

  const handleNext = () =>
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  const { items, checkIn: cartCheckIn, clearCart, addToCart, setBookingDetails } = useCartStore();

  const handleBook = () => {
    if (!checkIn || !checkOut || nights <= 0) {
      alert('Vui lòng chọn ngày nhận và trả phòng ở trang chủ trước khi đặt!');
      return;
    }
    if (!user) {
      const redirect = encodeURIComponent(
        `/room-type/${roomTypeId}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
      );
      navigate(`/login?redirect=${redirect}`);
      return;
    }
    if (!roomType || liveAvailableCount === 0) return;

    if (items.length > 0 && cartCheckIn && checkIn &&
      cartCheckIn.toISOString().split('T')[0] !== checkIn) {
      if (!window.confirm('Giỏ hàng đang có phòng cho ngày khác. Thêm phòng này sẽ xoá giỏ hàng cũ, tiếp tục?')) return;
      clearCart();
    }

    setBookingDetails({ checkIn: new Date(checkIn), checkOut: new Date(checkOut), guests: Number(guests) });
    addToCart(
      {
        id: roomType.id,
        typeName: roomType.typeName,
        basePrice: Number(roomType.basePrice),
        maxCapacity: roomType.maxCapacity,
        availableRoomCount: liveAvailableCount ?? roomType.availableRoomCount, // dùng số thực tế thay vì undefined
        images: roomType.images,
      },
      quantity
    );
    navigate('/cart');
  };

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Đang tải...</span>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (isError || !roomType) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-gray-800 font-medium text-sm">
          Không tìm thấy thông tin phòng
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-primary text-sm font-medium hover:underline"
        >
          Quay lại
        </button>
      </div>
    );
  }

  const currentImage = images[activeIndex]?.imageUrl ?? PLACEHOLDER;

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 p-6">
      {/* ── Breadcrumb ── */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-primary font-medium hover:underline text-left bg-transparent border-none cursor-pointer w-fit"
      >
        ← Quay lại danh sách phòng
      </button>

      {/* 7. Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left: Gallery + Info ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Gallery Container */}
          <div className="flex flex-col gap-3">
            {/* 1. Ảnh lớn chính */}
            <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-gray-100 group">
              <img
                src={currentImage}
                alt={roomType.typeName}
                className="w-full h-full object-cover transition-opacity duration-200"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                }}
              />

              {/* 5. Image counter badge */}
              <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                {activeIndex + 1} / {images.length}
              </div>

              {/* Prev / Next buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    disabled={images.length <= 1}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed border-none cursor-pointer text-lg font-bold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={images.length <= 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed border-none cursor-pointer text-lg font-bold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* 2. Thumbnail list */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {images.map((img, idx) => (
                  <button
                    key={img.id ?? idx}
                    onClick={() => setActiveIndex(idx)}
                    // 4. Active thumbnail state
                    className={`shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer p-0 snap-start ${
                      idx === activeIndex
                        ? 'border-primary ring-2 ring-primary/20 opacity-100'
                        : 'border-transparent hover:border-gray-300 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      // 6. Placeholder fallback
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                {roomType.typeName}
              </h1>
              <p className="text-sm text-gray-500 font-normal">
                Sức chứa tối đa {roomType.maxCapacity} khách
              </p>
            </div>

            {roomType.description && (
              <p className="text-sm text-gray-600 font-normal leading-relaxed">
                {roomType.description}
              </p>
            )}

            {/* Amenities */}
            {roomType.amenities && roomType.amenities.length > 0 && (
              <div className="flex flex-col gap-3 mt-2">
                <h3 className="text-sm font-medium text-gray-800">Tiện nghi</h3>
                <div className="flex flex-wrap gap-2">
                  {roomType.amenities.map((amenity: any) => (
                    <span
                      key={amenity.id}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10"
                    >
                      {amenity.amenityName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Booking card ── */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24 flex flex-col gap-5">
            {/* Giá */}
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Giá mỗi đêm từ</span>
              <div className="flex items-baseline gap-1 mt-1">
                <p className="text-3xl font-bold text-primary">
                  {formatVND(basePrice)}
                </p>
              </div>
            </div>

            {/* Chi tiết ngày */}
            {checkIn && checkOut && nights > 0 ? (
              <div className="flex flex-col gap-3 border border-gray-100 rounded-xl p-4 text-sm bg-gray-50/50">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Nhận phòng</span>
                  <span className="text-gray-800 font-medium">
                    {formatDate(checkIn)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Trả phòng</span>
                  <span className="text-gray-800 font-medium">
                    {formatDate(checkOut)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Thời gian lưu trú</span>
                  <span className="text-gray-800 font-medium">{nights} đêm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Số khách</span>
                  <span className="text-gray-800 font-medium">{guests} khách</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Số lượng phòng</span>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}
                      className="px-2.5 py-1 text-gray-500 hover:text-primary disabled:text-gray-300">-</button>
                    <span className="w-8 text-center font-medium text-gray-800">{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(maxQuantity, q + 1))} disabled={quantity >= maxQuantity}
                      className="px-2.5 py-1 text-gray-500 hover:text-primary disabled:text-gray-300">+</button>
                  </div>
                </div>
                {liveAvailableCount !== undefined && (
                  <p className="text-xs text-gray-400 text-right -mt-2">Còn {liveAvailableCount} phòng trống</p>
                )}
                <hr className="border-gray-200 my-1" />
                <div className="flex justify-between items-center font-semibold text-base">
                  <span className="text-gray-800">Tổng cộng</span>
                  <span className="text-primary">{formatVND(total)}</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700 leading-relaxed text-center">
                Vui lòng chọn ngày nhận và trả phòng tại trang chủ trước khi đặt!
              </div>
            )}

            {/* Button đặt phòng */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleBook}
                disabled={liveAvailableCount === 0}
                className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl border-none cursor-pointer transition-all active:scale-[0.98] shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!user ? 'Đăng nhập để đặt phòng' : liveAvailableCount === 0 ? 'Hết phòng' : 'Đặt phòng ngay'}
              </button>
              
              {!user && (
                <p className="text-xs text-gray-400 text-center font-normal mt-1">
                  Bạn cần có tài khoản để thực hiện giao dịch
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Review Section ── */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Đánh giá từ khách hàng
        </h2>
        <ReviewList roomTypeId={Number(roomTypeId)} />
      </div>
    </div>
  );
};

export default RoomDetailPage;
</file>

<file path="src/pages/customer/RoomListPage.tsx">
import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAvailableRooms } from '../../hooks/queries/use-hotels.query';
import { hotelService } from '../../services/hotel.service';
import HotelCard from '../../components/customer/HotelCard';
import SearchForm from '../../components/customer/SearchForm';
import { formatVND } from '../../utils/format';

type SortKey = 'price_asc' | 'price_desc' | 'capacity_asc';

const PLACEHOLDER = 'https://placehold.co/400x300?text=No+Image';

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

// Component thanh trượt giá 2 đầu tự thiết kế (Native HTML5 Range)
const DualPriceSlider = ({
  priceMin,
  priceMax,
  onChange,
}: {
  priceMin: number | '';
  priceMax: number | '';
  onChange: (min: number | '', max: number | '') => void;
}) => {
  const minLimit = 0;
  const maxLimit = 10000000; // Giới hạn tối đa là 10 triệu
  
  // Nếu trống thì lấy mặc định mốc min/max
  const currentMin = priceMin === '' ? minLimit : priceMin;
  const currentMax = priceMax === '' ? maxLimit : priceMax;

  const getPercent = (val: number) => Math.round(((val - minLimit) / (maxLimit - minLimit)) * 100);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), currentMax - 100000);
    if (val === minLimit && currentMax === maxLimit) {
      onChange('', '');
    } else {
      onChange(val === minLimit ? '' : val, currentMax === maxLimit ? '' : currentMax);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), currentMin + 100000);
    if (currentMin === minLimit && val === maxLimit) {
      onChange('', '');
    } else {
      onChange(currentMin === minLimit ? '' : currentMin, val === maxLimit ? '' : val);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <style>
        {`
          .dual-range::-webkit-slider-thumb {
            pointer-events: auto;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid #2563eb;
            cursor: pointer;
            -webkit-appearance: none;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .dual-range::-moz-range-thumb {
            pointer-events: auto;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid #2563eb;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border: none;
          }
        `}
      </style>

      <div className="relative w-full h-8 flex items-center justify-center">
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full z-0" />
        <div
          className="absolute h-1.5 bg-primary rounded-full z-10"
          style={{
            left: `${getPercent(currentMin)}%`,
            right: `${100 - getPercent(currentMax)}%`,
          }}
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={100000} // Nhảy mỗi bước là 100.000đ
          value={currentMin}
          onChange={handleMinChange}
          className="dual-range absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none z-20"
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={100000}
          value={currentMax}
          onChange={handleMaxChange}
          className="dual-range absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none z-20"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 border border-gray-200 rounded-xl px-2 py-2 text-sm text-gray-700 bg-gray-50 text-center font-medium whitespace-nowrap">
          {formatVND(currentMin)}
        </div>
        <span className="text-gray-400">-</span>
        <div className="flex-1 border border-gray-200 rounded-xl px-2 py-2 text-sm text-gray-700 bg-gray-50 text-center font-medium whitespace-nowrap">
          {currentMax >= maxLimit ? '10M+' : formatVND(currentMax)}
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-6 bg-gray-100 rounded-full w-16" />
        <div className="h-6 bg-gray-100 rounded-full w-20" />
      </div>
      <div className="h-8 bg-gray-100 rounded-xl mt-2" />
    </div>
  </div>
);

const DiscoveryCollections = () => {
  const navigate = useNavigate();
  const { data: roomTypes = [], isLoading } = useQuery({
    queryKey: ['hotels', 'all'],
    queryFn: () => hotelService.getAllRoomTypes(),
  });

  const collections = useMemo(() => {
    return {
      couples: roomTypes.filter((rt: any) => rt.typeName.toLowerCase().includes('standard') || rt.typeName.toLowerCase().includes('deluxe')),
      luxury: roomTypes.filter((rt: any) => rt.typeName.toLowerCase().includes('premium') || rt.typeName.toLowerCase().includes('suite')),
      family: roomTypes.filter((rt: any) => rt.typeName.toLowerCase().includes('family')),
    };
  }, [roomTypes]);

  if (isLoading) return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-72" />
      ))}
    </div>
  );

  const renderSection = (title: string, subtitle: string, list: any[]) => {
    if (list.length === 0) return null;
    return (
      <div className="mb-10">
        <div className="mb-4">
          <h3 className="text-xl font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((rt: any) => (
            <div key={rt.id || rt.roomTypeId}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              onClick={() => navigate(`/room-type/${rt.id || rt.roomTypeId}`)}
            >
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={rt.images?.[0]?.imageUrl ?? rt.roomImages?.[0]?.imageUrl ?? PLACEHOLDER}
                  alt={rt.typeName}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <span className="text-white text-base font-medium">{rt.typeName}</span>
                  <span className="bg-white/95 text-primary text-sm font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {formatVND(Number(rt.basePrice))}/đêm
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                      {rt.maxCapacity} khách
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                      {rt.maxCapacity <= 2 ? '25m²' : rt.maxCapacity === 3 ? '35m²' : '50m²'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/room-type/${rt.id || rt.roomTypeId}`);
                  }}
                  className="w-full border border-primary text-primary py-2 rounded-xl text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  Xem chi tiết & Đặt phòng
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {renderSection('Dành cho Cặp đôi', 'Không gian ấm cúng, thiết kế tinh tế và đầy đủ tiện nghi cho kỳ nghỉ lãng mạn', collections.couples)}
      {renderSection('Trải nghiệm Đẳng cấp', 'Hạng phòng sang trọng bậc nhất với tầm nhìn thượng uyển và dịch vụ cá nhân hóa', collections.luxury)}
      {renderSection('Kỳ nghỉ Gia đình', 'Không gian rộng rãi, kết nối tối ưu, lý tưởng cho những khoảnh khắc gắn kết thành viên', collections.family)}
    </div>
  );
};

const StayInclusions = () => (
  <div className="bg-gray-50 py-12 px-6 border-t border-gray-100">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-xl font-medium text-gray-800 text-center mb-1 bg-clip-text">
        Đặc quyền dành riêng cho bạn
      </h2>
      <p className="text-sm text-gray-400 text-center mb-8">Trải nghiệm trọn vẹn giá trị nghỉ dưỡng cao cấp tích hợp trong mỗi lượt đặt phòng</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-center">
        {[
          { title: 'Hồ bơi vô cực', desc: 'Tự do thư giãn với tầm nhìn toàn cảnh tuyệt đẹp trên tầng cao nhất' },
          { title: 'Bữa sáng buffet', desc: 'Khởi đầu ngày mới với thực đơn phong phú tại nhà hàng cao cấp' },
          { title: 'Dọn phòng hằng ngày', desc: 'Đảm bảo không gian lưu trú luôn sạch sẽ, ngăn nắp và thơm mát' },
          { title: 'Đồ uống chào mừng', desc: 'Thưởng thức hương vị tươi mát đặc trưng ngay khi hoàn tất nhận phòng' },
        ].map(item => (
          <div key={item.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-center items-center">
            <p className="font-medium text-gray-800 text-base mb-1">{item.title}</p>
            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RoomListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const guests = Number(searchParams.get('guests') ?? 1);
  const roomCount = Number(searchParams.get('roomCount') ?? 1);

  const [priceMin, setPriceMin] = useState<number | ''>('');
  const [priceMax, setPriceMax] = useState<number | ''>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('price_asc');
  const [showFilter, setShowFilter] = useState(false);

  const enabled = !!checkIn && !!checkOut && !!guests;

  const queryParams = {
    checkIn,
    checkOut,
    guests,
    roomCount,
    ...(priceMin !== '' && { minPrice: priceMin }),
    ...(priceMax !== '' && { maxPrice: priceMax }),
  };

  const { data: rooms = [], isLoading, isError, refetch } = useAvailableRooms(
    enabled ? queryParams : {}
  );

  const filtered = useMemo(() => {
    let list = [...rooms];

    if (selectedAmenities.length > 0) {
      list = list.filter((rt) =>
        selectedAmenities.every((name) =>
          rt.amenities?.some((a: any) => (a.amenity?.amenityName || a.amenityName) === name)
        )
      );
    }

    switch (sort) {
      case 'price_asc':
        list.sort((a, b) => (a.lowestPrice ?? Number(a.basePrice)) - (b.lowestPrice ?? Number(b.basePrice)));
        break;
      case 'price_desc':
        list.sort((a, b) => (b.lowestPrice ?? Number(b.basePrice)) - (a.lowestPrice ?? Number(a.basePrice)));
        break;
      case 'capacity_asc':
        list.sort((a, b) => a.maxCapacity - b.maxCapacity);
        break;
    }

    return list;
  }, [rooms, selectedAmenities, sort]);

  const amenityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    rooms.forEach((rt: any) => {
      const uniqueAmenities = new Set<string>();
      rt.amenities?.forEach((a: any) => {
        const name = a.amenity?.amenityName || a.amenityName;
        if (name) uniqueAmenities.add(name);
      });
      uniqueAmenities.forEach(name => { counts[name] = (counts[name] || 0) + 1; });
    });
    // Chuyển thành mảng và sắp xếp ưu tiên những tiện ích có nhiều phòng nhất lên đầu
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [rooms]);

  const toggleAmenity = (name: string) =>
    setSelectedAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );

  const clearFilters = () => {
    setPriceMin('');
    setPriceMax('');
    setSelectedAmenities([]);
    setSort('price_asc');
  };

  const extendCheckOut = () => {
    if (!checkOut) return;
    const newCheckOut = new Date(checkOut);
    newCheckOut.setDate(newCheckOut.getDate() + 1);
    const newCheckOutStr = newCheckOut.toISOString().split('T')[0];
    const newParams = new URLSearchParams(searchParams);
    newParams.set('checkOut', newCheckOutStr);
    setSearchParams(newParams);
  };

  const hasFilter = priceMin !== '' || priceMax !== '' || selectedAmenities.length > 0;
  const activeFilterCount = selectedAmenities.length + (priceMin !== '' || priceMax !== '' ? 1 : 0);

  if (!enabled) {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-br from-primary to-primary-dark py-12 px-6">
          <div className="max-w-4xl mx-auto text-center mb-6">
            <h1 className="text-4xl font-medium text-white mb-2">
              Tìm không gian lý tưởng của bạn
            </h1>
            <p className="text-white/70 text-sm">
              Nhập thông tin lịch trình để kiểm tra tình trạng phòng trống và nhận báo giá ưu đãi chính xác nhất
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-5 shadow-xl">
            <SearchForm />
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-10 px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-gray-800">Khám phá các bộ sưu tập phòng</h2>
          </div>
          <DiscoveryCollections />
        </div>

        <StayInclusions />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 text-base text-gray-600 mb-3">
          <span className="font-medium text-gray-800">
            {formatDate(checkIn)} → {formatDate(checkOut)}
          </span>
          <span className="text-gray-300">·</span>
          <span>{guests} khách</span>
          <button
            onClick={() => navigate('/')}
            className="ml-auto text-sm text-primary hover:underline font-medium"
          >
            Đổi tiêu chí tìm kiếm
          </button>
        </div>
        <SearchForm />
      </div>

      <div className="flex gap-6 relative">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-24 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Bộ lọc</h2>
              {hasFilter && (
                <button onClick={clearFilters} className="text-sm text-primary hover:underline font-medium">
                  Xóa tất cả
                </button>
              )}
            </div>

            <div className="mb-6">
              <p className="text-base font-medium text-gray-700 mb-3">Giá / đêm</p>
              <DualPriceSlider 
                priceMin={priceMin} 
                priceMax={priceMax} 
                onChange={(min, max) => { setPriceMin(min); setPriceMax(max); }} 
              />

              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { label: 'Dưới 1tr', min: undefined, max: 1000000 },
                  { label: '1 - 3tr', min: 1000000, max: 3000000 },
                  { label: 'Trên 3tr', min: 3000000, max: undefined },
                ].map((p) => {
                  const active = priceMin === (p.min ?? '') && priceMax === (p.max ?? '');
                  return (
                    <button
                      key={p.label}
                      onClick={() => {
                        setPriceMin(p.min ?? '');
                        setPriceMax(p.max ?? '');
                      }}
                      className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                        active
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-200 text-gray-600 hover:border-primary/50'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {amenityCounts.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-base font-medium text-gray-700 mb-3">Tiện ích</p>
                <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                  {amenityCounts.map(([name, count]) => (
                    <label key={name} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(name)}
                          onChange={() => toggleAmenity(name)}
                          className="w-4 h-4 rounded border-gray-300 text-primary accent-primary"
                        />
                        <span className="text-base text-gray-600 group-hover:text-gray-800 transition-colors">{name}</span>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{count}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              {!isLoading && (
                <p className="text-base text-gray-600">
                  {filtered.length > 0 ? (
                    <>
                      <span className="font-bold text-gray-800">{filtered.length}</span> hạng phòng phù hợp
                      {hasFilter && (
                        <span className="ml-2 text-sm text-primary font-medium">
                          (đã lọc từ {rooms.length})
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="font-medium text-gray-800">Không tìm thấy phòng phù hợp</span>
                  )}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="lg:hidden flex items-center gap-2 text-base border border-gray-200 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Bộ lọc
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="text-base border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 bg-white cursor-pointer"
              >
                <option value="price_asc">Giá: Thấp → Cao</option>
                <option value="price_desc">Giá: Cao → Thấp</option>
                <option value="capacity_asc">Sức chứa tăng dần</option>
              </select>
            </div>
          </div>

          {/* Tag bộ lọc đang chọn (Active Filter Pills) */}
          {hasFilter && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-gray-500 mr-1">Đang lọc theo:</span>
              {(priceMin !== '' || priceMax !== '') && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700">
                  Giá: {priceMin ? formatVND(Number(priceMin)) : '0đ'} - {priceMax ? formatVND(Number(priceMax)) : 'Trở lên'}
                  <button onClick={() => { setPriceMin(''); setPriceMax(''); }} className="hover:text-blue-900 ml-1 text-base leading-none">&times;</button>
                </span>
              )}
              {selectedAmenities.map((name) => (
                <span key={name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700">
                  {name}
                  <button onClick={() => toggleAmenity(name)} className="hover:text-blue-900 ml-1 text-base leading-none">&times;</button>
                </span>
              ))}
              <button onClick={clearFilters} className="text-sm text-gray-400 hover:text-gray-700 underline ml-2 transition-colors">
                Xóa tất cả
              </button>
            </div>
          )}

          {showFilter && (
            <div className="lg:hidden bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
              <p className="text-base font-medium text-gray-700 mb-2">Giá / đêm</p>
              <div className="mb-4">
                <DualPriceSlider 
                  priceMin={priceMin} 
                  priceMax={priceMax} 
                  onChange={(min, max) => { setPriceMin(min); setPriceMax(max); }} 
                />
              </div>

              <p className="text-base font-medium text-gray-700 mb-2">Tiện ích</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {amenityCounts.map(([name, count]) => (
                  <button
                    key={name}
                    onClick={() => toggleAmenity(name)}
                    className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                      selectedAmenities.includes(name)
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-200 text-gray-600 hover:border-primary/50'
                    }`}
                  >
                    {name} ({count})
                  </button>
                ))}
              </div>

              {hasFilter && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2.5 bg-gray-50 text-gray-600 text-base font-medium rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Xóa tất cả bộ lọc
                </button>
              )}
            </div>
          )}

          {isLoading && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p className="text-gray-800 font-medium text-base">Đã xảy ra lỗi khi tải dữ liệu</p>
              <button
                onClick={() => refetch()}
                className="text-base font-medium text-primary border border-primary px-5 py-2 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Thử lại
              </button>
            </div>
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-6 text-center rounded-2xl bg-white border border-gray-100 shadow-sm px-4">
              <div className="max-w-md">
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  Không có phòng phù hợp
                </p>
                <p className="text-base text-gray-500 leading-relaxed">
                  {hasFilter 
                    ? `Đang lọc từ ${rooms.length} kết quả nhưng không có phòng nào khớp với bộ lọc của bạn.`
                    : `Rất tiếc, chúng tôi không tìm thấy phòng trống nào trong khoảng thời gian `}
                  {!hasFilter && (
                    <>
                      <span className="font-medium text-gray-700">{formatDate(checkIn)} — {formatDate(checkOut)} </span>
                      cho <span className="font-medium text-gray-700">{roomCount} phòng và {guests} khách</span>.
                    </>
                  )}
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-xs">
                {hasFilter ? (
                  <button
                    onClick={clearFilters}
                    className="flex items-center justify-center text-base font-medium text-primary border border-primary px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors w-full"
                  >
                    Xóa bộ lọc
                  </button>
                ) : (
                  <button
                    onClick={extendCheckOut}
                    className="flex items-center justify-center text-base font-medium text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors w-full"
                  >
                    Thêm 1 ngày (trả phòng ngày {formatDate(
                      new Date(new Date(checkOut).setDate(new Date(checkOut).getDate() + 1))
                        .toISOString().split('T')[0]
                    )})
                  </button>
                )}
                
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center text-base text-gray-400 hover:text-gray-600 transition-colors mt-2"
                >
                  Tìm kiếm lại từ đầu
                </button>
              </div>
            </div>
          )}

          {!isLoading && !isError && filtered.length > 0 && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((room: any) => (
                <HotelCard
                  key={room.id}
                  roomType={room}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  guests={guests}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomListPage;
</file>

<file path="src/routes/app.routes.tsx">
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import AdminLayout from '../layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';

const S = Suspense;

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
const CustomerBookingDetailPage = lazy(() => import('../pages/customer/CustomerBookingDetailPage'));
const ProfilePage = lazy(() => import('../pages/customer/ProfilePage'));
const ComparePage = lazy(() => import('../pages/customer/ComparePage'));
const PromotionsPage = lazy(() => import('../pages/customer/PromotionsPage'))
const ContactPage = lazy(() => import('../pages/customer/ContactPage'))
import CartPage from '../pages/customer/CartPage';
import CheckoutPage from '../pages/customer/CheckoutPage';

const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const BookingListPage = lazy(() => import('../pages/admin/BookingListPage'));
const BookingDetailPage = lazy(() => import('../pages/admin/BookingDetailPage'));
const RoomTypeListPage = lazy(() => import('../pages/admin/RoomTypeListPage'));
const ReportPage = lazy(() => import('../pages/admin/ReportPage'));
const RefundListPage = lazy(() => import('../pages/admin/RefundListPage'));
const UserListPage = lazy(() => import('../pages/admin/UserListPage'));
const AmenityListPage = lazy(() => import('../pages/admin/AmenityListPage'));
const PromotionListPage = lazy(() => import('../pages/admin/PromotionListPage'));


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
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
    ],
  },
  {
    path: '/',
    element: <CustomerLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'rooms', element: <RoomListPage /> },
      { path: '/promotions', element: <PromotionsPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: 'room-type/:roomTypeId', element: <RoomDetailPage /> },
      { path: 'booking/:id', element: <BookingPage /> },
      {
        path: 'cart',
        element: (
          <ProtectedRoute roles={['customer']}>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute roles={['customer']}>
            <S><CheckoutPage /></S>
          </ProtectedRoute>
        ),
      },
      { path: 'payment/:id', element: <PaymentPage /> },
      {
        path: 'my-bookings',
        element: (
          <ProtectedRoute roles={['customer']}>
            <MyBookingsPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute roles={['customer']}>
            <S><ProfilePage /></S>
          </ProtectedRoute>
        )
      },
      { path: 'compare', element: <S><ComparePage /></S> },
      {
        path: 'bookings/:id',
        element: (
          <ProtectedRoute roles={['customer']}>
            <CustomerBookingDetailPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute roles={['admin', 'receptionist']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'bookings', element: <BookingListPage /> },
      { path: 'bookings/:id', element: <BookingDetailPage /> },
      { path: 'room-types', element: <RoomTypeListPage /> },
      {
        path: 'reports',
        element: (
          <ProtectedRoute roles={['admin']}>
            <ReportPage />
          </ProtectedRoute>
        )
      },
      { path: 'refunds', element: <RefundListPage /> },
      {
        path: 'users',
        element: (
          <ProtectedRoute roles={['admin']}>
            <UserListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'amenities',
        element: (
          <ProtectedRoute roles={['admin']}>
            <AmenityListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'promotions',
        element: (
          <ProtectedRoute roles={['admin']}>
            <PromotionListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute roles={['admin', 'receptionist']}>
            <S><ProfilePage /></S>
          </ProtectedRoute>
        ),
      },
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
</file>

<file path="src/routes/ProtectedRoute.tsx">
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore'; 

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const location = useLocation();
  
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-3">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-normal">Đang tải...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
</file>

<file path="src/services/adminService.ts">
import api from './api';

export const adminService = {
  getBookings: async (filters?: Record<string, unknown>) => {
    const r = await api.get('/admin/bookings', { params: filters });
    return r.data.data;
  },

  createOfflineBooking: async (data: Record<string, unknown>) => {
    const r = await api.post('/admin/bookings', data);
    return r.data.data;
  },

  updateOfflineBooking: async (id: number, data: Record<string, unknown>) => {
    const r = await api.patch(`/admin/bookings/${id}`, data);
    return r.data.data;
  },

  checkIn: async (id: number, data: { idNumber?: string; checkinNote?: string }) => {
    const r = await api.patch(`/admin/bookings/${id}/checkin`, data);
    return r.data.data;
  },

  checkOut: async (id: number, extraCharges: { label: string; amount: number }[]) => {
    const r = await api.patch(`/admin/bookings/${id}/checkout`, { extraCharges });
    return r.data.data;
  },

  cancelBooking: async (id: number, reason?: string) => {
    const r = await api.patch(`/admin/bookings/${id}/cancel`, { reason });
    return r.data.data;
  },

  searchUsers: async (keyword: string) => {
    const r = await api.get('/auth/admin/users/search', { params: { keyword } });
    return r.data.data;
  },

  getRoomTypes: async () => {
    const r = await api.get('/admin/room-types');
    return r.data.data;
  },

  getAmenities: async () => {
    const r = await api.get('/admin/amenities');
    return r.data.data;
  },

  createRoomType: async (data: FormData) => {
    const r = await api.post('/admin/room-types', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return r.data.data;
  },

  getRooms: async (filters?: Record<string, unknown>) => {
    const r = await api.get('/admin/rooms', { params: filters });
    return r.data.data;
  },

  updateRoomStatus: async (id: number, status: string) => {
    const r = await api.patch(`/admin/rooms/${id}/status`, { status });
    return r.data.data;
  },

  getRevenueReport: async (from: string, to: string) => {
    const r = await api.get('/admin/reports/revenue', { params: { from, to } });
    return r.data.data;
  },
  
  getUsers: async (filters?: Record<string, unknown>) => {
    const r = await api.get('/auth/admin/users', { params: filters });
    return r.data.data;
  },

  updateUser: async (id: number, data: { role?: string; status?: string }) => {
    const r = await api.patch(`auth/admin/users/${id}`, data);
    return r.data.data;
  },
  
  createAmenity: async (data: { amenityName: string; description?: string }) => {
    const response = await api.post('/admin/amenities', data);
    return response.data.data;
  },

  deleteAmenity: async (id: number) => {
    const response = await api.delete(`/admin/amenities/${id}`);
    return response.data.data;
  },

  updateRoomType: async (id: number, data: FormData) => {
    const r = await api.put(`/admin/room-types/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return r.data.data;
  },

  deleteRoomType: async (id: number) => {
    const r = await api.delete(`/admin/room-types/${id}`);
    return r.data;
  },

  // ── Thêm method gọi API Sơ đồ phòng (Dashboard) ──
  getRoomOverview: async () => {
    const r = await api.get('/admin/rooms/overview');
    return r.data.data;
  },
};
</file>

<file path="src/services/api.ts">
import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { AxiosError } from 'axios';

const TOKEN_KEY = 'hotel_token';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const responseSuccessInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const responseErrorInterceptor = (error: AxiosError): Promise<never> => {
  if (error.response?.status === 401) {
      // Tranh vong lap reload vo han khi nguoi dung nhap sai mat khau
    const isLoginPage = window.location.pathname === '/login';

    if (!isLoginPage) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }
  }

  return Promise.reject(error);
};

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

export default api;
</file>

<file path="src/services/auth.service.ts">
import api from './api';
import type { User, LoginDTO, RegisterDTO, AuthResponse } from '../types/auth.types';

export const authService = {
  login: async (data: LoginDTO): Promise<AuthResponse> => {
    const response = await api.post<{ data: AuthResponse }>('/auth/login', data);
    return response.data.data;
  },

  register: async (data: RegisterDTO): Promise<void> => {
    await api.post('/auth/register', data);
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<{ data: User }>('/auth/me');
    return response.data.data;
  },

  updateProfile: (data: { fullName?: string; phoneNumber?: string }): Promise<User> =>
    api.put<{ data: User }>('/auth/profile', data).then((r) => r.data.data),

  uploadAvatar: (file: File): Promise<User> => {
    const form = new FormData();
    form.append('avatar', file);
    return api
      .post<{ data: User }>('/auth/profile/avatar', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data.data);
  },

  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> =>
    api.put('/auth/profile/password', data).then(() => undefined),
};
</file>

<file path="src/services/booking.service.ts">
import api from './api';
import type { Booking, BookingStatus, Review, RefundPreview } from '../types/booking.types';

interface BookingItem {
  roomTypeId: number;
  quantity: number;
}

interface CreateBookingData {
  items: BookingItem[];
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  specialRequests?: string;
  promoCode?: string;
}

interface CancelResponse {
  refundAmount: number;
}

export const bookingService = {
  create: async (data: CreateBookingData): Promise<Booking> => {
    const r = await api.post<{ data: Booking }>('/bookings', data);
    return r.data.data;
  },

  getMyBookings: async (status?: BookingStatus): Promise<Booking[]> => {
    const r = await api.get<{ data: Booking[] }>('/bookings/my', {
      params: status ? { status } : undefined,
    });
    return r.data.data;
  },

  getById: async (id: number): Promise<Booking> => {
    const r = await api.get<{ data: Booking }>(`/bookings/${id}`);
    return r.data.data;
  },

  cancel: async (id: number, reason?: string): Promise<CancelResponse> => {
    const r = await api.patch<{ data: CancelResponse }>(`/bookings/${id}/cancel`, { reason });
    return r.data.data;
  },

  getRefundPreview: (id: number): Promise<RefundPreview> =>
    api
      .get<{ data: RefundPreview }>(`/bookings/${id}/refund-preview`)
      .then((r) => r.data.data),

  createReview: (
    bookingId: number,
    data: { rating: number; comment?: string }
  ): Promise<Review> =>
    api
      .post<{ data: Review }>(`/bookings/${bookingId}/review`, data)
      .then((r) => r.data.data),

  getReviewsByRoomType: (roomTypeId: number): Promise<Review[]> =>
    api
      .get<{ data: Review[] }>(`/hotels/${roomTypeId}/reviews`)
      .then((r) => r.data.data),
      
};
</file>

<file path="src/services/hotel.service.ts">
import api from './api';
import type { RoomType, SearchParams } from '../types/hotel.types';

export const hotelService = {
  getAvailable: (params: SearchParams): Promise<RoomType[]> =>
    api
      .get<{ data: RoomType[] }>('/hotels/available', {
        params,
      })
      .then((r) => r.data.data),

  getById: (id: number): Promise<RoomType> =>
    api
      .get<{ data: RoomType }>(`/hotels/${id}`)
      .then((r) => r.data.data),

  getAll: (): Promise<RoomType[]> =>
    api
      .get<{ data: RoomType[] }>('/hotels')
      .then((r) => r.data.data),
      
  getAllRoomTypes: (): Promise<RoomType[]> =>
    api
      .get<{ data: RoomType[] }>('/hotels/room-types')
      .then((r) => r.data.data),
};
</file>

<file path="src/services/payment.service.ts">
import api from './api';

interface InitiatePaymentResponse {
  paymentId: number;
  transactionRef: string;
  qrPayload: string;
  amount: number;
  expiredAt: string;
}

interface PaymentStatusResponse {
  bookingStatus: string;
  paymentStatus: string | null;
  transactionRef: string | null;
}

interface SimulateSuccessResponse {
  message: string;
  status: string;
}

export const paymentService = {
  initiate: async (bookingId: number): Promise<InitiatePaymentResponse> => {
    const r = await api.post<{ data: InitiatePaymentResponse }>('/payments/initiate', { bookingId });
    return r.data.data;
  },

  getStatus: async (bookingId: number): Promise<PaymentStatusResponse> => {
    const r = await api.get<{ data: PaymentStatusResponse }>(`/payments/${bookingId}/status`);
    return r.data.data;
  },

  simulateSuccess: async (transactionRef: string): Promise<SimulateSuccessResponse> => {
  const r = await api.post<{ data: SimulateSuccessResponse }>('/payments/simulate-success', { transactionRef });
  return r.data.data;
},
};
</file>

<file path="src/services/socketService.ts">
import { io, Socket } from 'socket.io-client';

export const SOCKET_EVENTS = {
  BOOKING_UPDATED: 'booking:updated',
  ROOM_UPDATED: 'room:updated',
  PAYMENT_CONFIRMED: 'payment:confirmed',
  BOOKING_NEW: 'booking:new',
} as const;

type SocketEvent = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];

const SERVER_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';

class SocketService {
  public socket: Socket;
  private currentRole: string | null = null;

  constructor() {
    this.socket = io(SERVER_URL, {
      transports: ['websocket'],
      autoConnect: false,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      if (this.currentRole) {
        this.socket.emit('join:role', this.currentRole);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  connect(role: string): void {
    this.currentRole = role;
    this.socket.auth = { token: localStorage.getItem('hotel_token') }; // đọc lại token mới nhất
    if (!this.socket.connected) {
      this.socket.connect();
    } else {
      this.socket.emit('join:role', role);
    }
  }

  joinBooking(bookingId: number): void {
    if (this.socket.connected) {
      this.socket.emit('join:booking', bookingId);
    } else {
            this.socket.once('connect', () => {
        this.socket.emit('join:booking', bookingId);
      });
    }
  }

  on(event: SocketEvent, callback: (data: unknown) => void): void {
 
    this.socket.on(event, callback);
  }

  off(event: SocketEvent, callback?: (data: unknown) => void): void {
    if (callback) {
      this.socket.off(event, callback);
    } else {
      this.socket.off(event);
    }
  }

  disconnect(): void {
    this.currentRole = null;
    this.socket.disconnect();
  }
}

export const socketService = new SocketService();
</file>

<file path="src/stores/authStore.ts">
import { create } from 'zustand';
import { authService } from '../services/auth.service';
import { socketService } from '../services/socketService';
import type { User, RegisterDTO } from '../types/auth.types';

const TOKEN_KEY = 'hotel_token';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (data: RegisterDTO) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<void>;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,

  login: async (identifier: string, password: string) => {

    const data = await authService.login({ identifier, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    set({ user: data.user, token: data.token });

    // Kết nối socket sau khi login thành công
    socketService.connect(data.user.role);
  },

  register: async (data: RegisterDTO) => {
   
    await authService.register(data);
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ user: null, token: null });

    // Ngắt kết nối socket khi logout
    socketService.disconnect();
  },

  getMe: async () => {
    const user = await authService.getMe();
    set({ user });
  },

  initAuth: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    // isLoading chỉ nên được dùng khi load lại toàn bộ trang web (init)
    set({ token, isLoading: true });
    try {
      await get().getMe();
      const role = useAuthStore.getState().user?.role;
      if (role) socketService.connect(role); // THÊM
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      set({ token: null, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
</file>

<file path="src/stores/cartStore.ts">
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface CartRoomType {
  id: number;
  typeName: string;
  basePrice: number;
  maxCapacity: number;
  availableRoomCount?: number;
  images?: { imageUrl: string }[];
}

export interface CartItem {
  roomType: CartRoomType;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number; // Tổng số lượng phòng trong giỏ
  totalAmount: number; // Tổng giá cơ bản, chưa nhân số đêm
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  setBookingDetails: (details: { checkIn: Date; checkOut: Date; guests: number }) => void;
  addToCart: (roomType: CartRoomType, quantity: number) => void;
  removeFromCart: (roomTypeId: number) => void;
  updateQuantity: (roomTypeId: number, quantity: number) => void;
  clearCart: () => void;
  syncInventory: (freshRooms: CartRoomType[]) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => {
      const updateState = (newItems: CartItem[]) => {
        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = newItems.reduce(
          (sum, item) => sum + item.roomType.basePrice * item.quantity,
          0
        );
        set({ items: newItems, totalItems, totalAmount });
      };

      return {
        items: [],
        totalItems: 0,
        totalAmount: 0,
        checkIn: null,
        checkOut: null,
        guests: 1,

        setBookingDetails: (details) => {
          set({
            checkIn: details.checkIn,
            checkOut: details.checkOut,
            guests: details.guests,
          });
        },

        addToCart: (roomType, quantity) => {
          const state = get();
          const existingItem = state.items.find((item) => item.roomType.id === roomType.id);
          const maxQuantity = roomType.availableRoomCount;

          if (maxQuantity !== undefined && maxQuantity <= 0) {
            toast.error(`Rất tiếc, ${roomType.typeName} đã hết phòng.`);
            return;
          }

          let newItems: CartItem[];

          if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (maxQuantity !== undefined && newQuantity > maxQuantity) {
              toast.warning(`Chỉ còn ${maxQuantity} phòng trống cho ${roomType.typeName}.`);
              newItems = state.items.map((item) =>
                item.roomType.id === roomType.id ? { ...item, quantity: maxQuantity } : item
              );
            } else {
              newItems = state.items.map((item) =>
                item.roomType.id === roomType.id ? { ...item, quantity: newQuantity } : item
              );
            }
          } else {
            if (maxQuantity !== undefined && quantity > maxQuantity) {
               toast.warning(`Chỉ còn ${maxQuantity} phòng trống cho ${roomType.typeName}.`);
               newItems = [...state.items, { roomType, quantity: maxQuantity }];
            } else {
               newItems = [...state.items, { roomType, quantity }];
            }
          }
          updateState(newItems);
        },

        removeFromCart: (roomTypeId) => {
          const state = get();
          const newItems = state.items.filter((item) => item.roomType.id !== roomTypeId);
          updateState(newItems);
        },

        updateQuantity: (roomTypeId, quantity) => {
          const state = get();
          const itemToUpdate = state.items.find((item) => item.roomType.id === roomTypeId);
          
          if (!itemToUpdate) return;
          
          const maxQuantity = itemToUpdate.roomType.availableRoomCount;
          let newQuantity = quantity;

          if (maxQuantity !== undefined && quantity > maxQuantity) {
            toast.warning(`Chỉ còn ${maxQuantity} phòng trống cho ${itemToUpdate.roomType.typeName}.`);
            newQuantity = maxQuantity;
          }

          const newItems = state.items
            .map((item) => (item.roomType.id === roomTypeId ? { ...item, quantity: newQuantity } : item))
            .filter((item) => item.quantity > 0); // Tự động xóa nếu số lượng <= 0
            
          updateState(newItems);
        },

        clearCart: () =>
          set({
            items: [],
            totalItems: 0,
            totalAmount: 0,
            checkIn: null,
            checkOut: null,
            guests: 1,
          }),

        syncInventory: (freshRooms) => {
          let hasReduced = false; // Biến cờ báo hiệu xem có phòng nào bị ép giảm số lượng không

          set((state) => {
            let isStateChanged = false;

            // Bước 1 & 2 & 3: Duyệt và ép số lượng
            const newItems = state.items.map((item) => {
              const freshRoom = freshRooms.find((r) => r.id === item.roomType.id);
              const realAvailable = freshRoom?.availableRoomCount || 0;

              // Nếu số lượng trống mới khác số lượng trống cũ lưu trong giỏ
              // Hoặc số lượng khách đang chọn lớn hơn số lượng thực tế
              if (
                item.roomType.availableRoomCount !== realAvailable ||
                item.quantity > realAvailable
              ) {
                isStateChanged = true;
                
                if (item.quantity > realAvailable) {
                  hasReduced = true; // Đánh dấu là có phòng bị ép giảm để báo ra UI
                }

                return {
                  ...item,
                  roomType: { ...item.roomType, availableRoomCount: realAvailable },
                  quantity: Math.min(item.quantity, realAvailable), // Ép số lượng xuống
                };
              }
              return item; // Trả về y nguyên nếu không có gì đổi
            });

            // Nếu không có gì thay đổi, trả về state cũ để chống re-render
            if (!isStateChanged) return state;

            // Bước 4: Lọc bỏ những phòng hết sạch (quantity = 0)
            const validItems = newItems.filter((item) => item.quantity > 0);

            // Bước 5: TÍNH LẠI TỔNG TIỀN (Quan trọng nhất)
            // Lưu ý: Giá ở đây là basePrice. Tính toán số đêm (nights) thường được làm ở UI (CartPage).
            // Nếu store của bạn lưu totalAmount theo kiểu (basePrice * quantity), thì tính như sau:
            const newTotalAmount = validItems.reduce(
              (sum, item) => sum + item.roomType.basePrice * item.quantity,
              0
            );

            // Trả về State mới
            return {
              items: validItems,
              totalAmount: newTotalAmount,
            };
          });

          return hasReduced; // Trả về kết quả cho CartPage.tsx biết để gọi toast.error
        },
      };
    },
    {
      name: 'hotel-booking-cart', // Tên key trong localStorage
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (key === 'checkIn' || key === 'checkOut') {
            if (typeof value === 'string') {
              const date = new Date(value);
              return isNaN(date.getTime()) ? null : date;
            }
          }
          return value;
        },
      }),
    }
  )
);
</file>

<file path="src/stores/compareStore.ts">
import { create } from 'zustand';
import type { RoomType } from '../types/hotel.types';

interface CompareStore {
  items: RoomType[];
  add: (room: RoomType) => void;
  remove: (id: number) => void;
  clear: () => void;
  isSelected: (id: number) => boolean;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  items: [],

  add: (room) => {
    const { items } = get();
    if (items.find((r) => r.id === room.id)) return;
    if (items.length >= 2) {
      // Thay thế cái cũ nhất
      set({ items: [items[1], room] });
    } else {
      set({ items: [...items, room] });
    }
  },

  remove: (id) =>
    set((s) => ({ items: s.items.filter((r) => r.id !== id) })),

  clear: () => set({ items: [] }),

  isSelected: (id) => get().items.some((r) => r.id === id),
}));
</file>

<file path="src/stores/searchStore.ts">
import { create } from 'zustand';

interface SearchState {
  checkIn: string;
  checkOut: string;
  guests: number;
  setSearchData: (data: { checkIn?: string; checkOut?: string; guests?: number }) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  checkIn: '',
  checkOut: '',
  guests: 1,
  setSearchData: (data) => set((state) => ({ ...state, ...data })),
}));
</file>

<file path="src/types/auth.types.ts">
export type UserRole = 'customer' | 'receptionist' | 'admin';

export type UserStatus = 'active' | 'inactive';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUrl?: string | null;
  role: UserRole;
  status: UserStatus;
}

export interface LoginDTO {
  identifier: string;
  password: string;
}

export interface RegisterDTO {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
</file>

<file path="src/types/booking.types.ts">
export type BookingStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'checked_in'
  | 'checked_out'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'success' | 'failed' | 'pending_refund' | 'refunded';

export type PaymentMethod = 'qr_code' | 'cash' | 'card';

export type BookingSource = 'online' | 'offline';

export type PaymentFeeType = 'booking' | 'penalty' | 'refund';

export interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  feeType: PaymentFeeType; 
  transactionRef?: string;
  paidAt?: string;
  refundedAt?: string;
  createdAt: string;
}

export interface BookingRoomTypeLine {
  id: number;
  roomTypeId: number;
  quantity: number;
  priceAtBooking: number;
  roomType: {
    id: number;
    typeName: string;
    basePrice: number;
    images?: { imageUrl: string; displayOrder: number }[];
  };
}

export interface AssignedRoom {
  id: number;
  roomId: number;
  checkinAt: string;
  checkoutAt?: string | null;
  idNumber?: string | null;
  checkinNote?: string | null;
  extraCharges?: { label: string; amount: number }[] | null;
  room: {
    id: number;
    roomNumber: string;
    floor?: number;
    roomType: {
      id: number;
      typeName: string;
      basePrice: number;
    };
  };
}

export interface Booking {
  id: number;
  userId: number;
  createdBy?: number;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  totalAmount: number;
  source: BookingSource;
  status: BookingStatus;
  paidAt?: string | null;
  specialRequests?: string | null; 
  cancelledAt?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
  review?: Review | null;
  roomTypeLines: BookingRoomTypeLine[];
  assignedRooms: AssignedRoom[];
  payments?: Payment[];
}
export interface Review {
  id: number;
  bookingId: number;
  rating: number;
  comment?: string;
  createdAt: string;
  user: {
    fullName: string;
  };
}

export interface CreateReviewData {
  rating: number;
  comment?: string;
}

export interface RefundPreview {
  bookingId: number;
  totalAmount: number;
  isPaid: boolean;
  refundAmount: number;
  penaltyAmount: number;
  refundPolicy: string;
  daysUntilCheckIn: number;
  checkInDate: string;
  checkOutDate: string;
}
</file>

<file path="src/types/hotel.types.ts">
export interface RoomImage {
  id: number;
  roomTypeId: number;
  imageUrl: string;
  displayOrder: number;
  createdAt: string;
}

export interface Amenity {
  id: number;
  amenityName: string;
  description?: string;
}

export interface RoomType {
  id: number;
  typeName: string;
  description?: string;
  maxCapacity: number;
  basePrice: number;
  version: number; 
  images: RoomImage[];
  amenities: Amenity[];
  availableRoomCount?: number;
  lowestPrice?: number;
}

export interface SearchParams {
  checkIn: string;
  checkOut: string;
  guests: number;
  minPrice?: number;
  maxPrice?: number;
}
</file>

<file path="src/types/index.ts">

</file>

<file path="src/utils/format.ts">
export const formatVND = (amount: number): string =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);

export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

export const calcNights = (checkIn: string, checkOut: string): number =>
  Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
  );

export const formatStars = (rating: number): string =>
  '★'.repeat(rating) + '☆'.repeat(5 - rating);
</file>

<file path="tailwind.config.ts">
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f4c81',
          dark: '#0a3660',
        },
        accent: {
          DEFAULT: '#c9a227',
        },
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config
</file>

<file path="tsconfig.app.json">
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
</file>

<file path="tsconfig.json">
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
</file>

<file path="tsconfig.node.json">
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "module": "esnext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
</file>

<file path="vite.config.ts">
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
</file>

</files>
