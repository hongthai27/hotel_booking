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
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      set({ token: null, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));