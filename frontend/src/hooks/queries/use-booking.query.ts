import { useQuery } from '@tanstack/react-query';
import { bookingService, GetPreviewParams } from '../../services/booking.service';

const bookingKeys = {
  all: ['bookings'] as const,
  previews: () => [...bookingKeys.all, 'previews'] as const,
  preview: (params: GetPreviewParams) => [...bookingKeys.previews(), params] as const,
};

export const useBookingPreview = (params: GetPreviewParams) => {
  return useQuery({
    queryKey: bookingKeys.preview(params),
    queryFn: () => bookingService.getBookingPreview(params),
    enabled: !!params.checkInDate && !!params.checkOutDate && params.rooms.length > 0,
  });
};
