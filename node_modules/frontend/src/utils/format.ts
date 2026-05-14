export const formatVND = (amount: number): string =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);

export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

export const calcNights = (checkIn: string, checkOut: string): number =>
  Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
  );

export const formatStars = (rating: number): string =>
  '★'.repeat(rating) + '☆'.repeat(5 - rating);