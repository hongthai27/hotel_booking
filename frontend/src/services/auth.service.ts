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
};