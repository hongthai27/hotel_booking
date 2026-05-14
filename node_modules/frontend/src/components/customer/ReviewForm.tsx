import React, { useState } from 'react';
import { useCreateReview } from '../../hooks/mutations/use-booking.mutation';

interface ReviewFormProps {
  bookingId: number;
  onSuccess?: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  bookingId,
  onSuccess,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { mutate: createReview, isPending } = useCreateReview();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    createReview(
      {
        bookingId,
        data: { rating, comment },
      },
      {
        onSuccess: () => {
          setRating(0);
          setComment('');
          onSuccess?.();
        },
      }
    );
  };

  return (
    <div className="border border-gray-100 rounded-2xl p-5 bg-white">
      <h3 className="text-sm font-medium text-gray-800 mb-4">
        Chia sẻ trải nghiệm của bạn
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl cursor-pointer hover:text-amber-300 transition-colors ${
                star <= rating ? 'text-amber-400' : 'text-gray-200'
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Nhận xét của bạn (tùy chọn)..."
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        <button
          type="submit"
          disabled={rating === 0 || isPending}
          className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? 'Đang gửi...' : 'Gửi đánh giá'}
        </button>
      </form>
    </div>
  );
};