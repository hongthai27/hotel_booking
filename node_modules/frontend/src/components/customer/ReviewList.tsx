import React from 'react';
import { useRoomTypeReviews } from '../../hooks/queries/useBookingsQuery';

interface ReviewListProps {
  roomTypeId: number;
}

const getInitials = (name: string) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const ReviewList: React.FC<ReviewListProps> = ({ roomTypeId }) => {
  const { data, isLoading } = useRoomTypeReviews(roomTypeId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 bg-gray-50 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  const reviews: any[] = Array.isArray(data) ? data : ((data as any)?.data || []);

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-3xl font-medium text-gray-800">
            {average.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500">
            {reviews.length} đánh giá
          </span>
        </div>

        <div className="flex items-center gap-0.5 text-amber-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-xl">
              {star <= Math.round(average) ? '★' : '☆'}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-400">Chưa có đánh giá nào</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                  {getInitials(review.user?.fullName)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">
                    {review.user?.fullName || 'Người dùng ẩn danh'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>{star <= review.rating ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {review.rating}/5
                </span>
              </div>

              {review.comment && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.comment}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};