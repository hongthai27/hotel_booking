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

  checkIn: async (id: number) => {
    const r = await api.patch(`/admin/bookings/${id}/checkin`);
    return r.data.data;
  },

  checkOut: async (id: number) => {
    const r = await api.patch(`/admin/bookings/${id}/checkout`);
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
};