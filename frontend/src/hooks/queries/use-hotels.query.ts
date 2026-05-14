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