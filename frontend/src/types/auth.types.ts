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