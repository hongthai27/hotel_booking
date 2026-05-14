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