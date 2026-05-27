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