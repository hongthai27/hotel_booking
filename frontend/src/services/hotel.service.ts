import api from './api';
import type { RoomType, SearchParams } from '../types/hotel.types';

export const hotelService = {
  getAvailable: (params: SearchParams) =>
    api
      .get<{ data: RoomType[] }>('/hotels/available', {
        params,
      })
      .then((r) => r.data.data),

  getById: (id: number) =>
    api
      .get<{ data: RoomType }>(`/hotels/${id}`)
      .then((r) => r.data.data),

  getAll: () =>
    api
      .get<{ data: RoomType[] }>('/hotels')
      .then((r) => r.data.data),
      
};