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
    set({ isLoading: true });
    try {
      const data = await authService.login({ identifier, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      set({ user: data.user, token: data.token });

      // Kết nối socket sau khi login thành công
      socketService.connect(data.user.role);
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data: RegisterDTO) => {
    set({ isLoading: true });
    try {
      await authService.register(data);
    } finally {
      set({ isLoading: false });
    }
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

    set({ token, isLoading: true });
    try {
      await get().getMe();

      // Kết nối socket sau khi xác thực thành công
      const user = get().user;
      if (user) {
        socketService.connect(user.role);
      }
    } catch {
      // get().logout() đã bao gồm cả việc clear localStorage và ngắt socket
      get().logout();
    } finally {
      set({ isLoading: false });
    }
  },
}));