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