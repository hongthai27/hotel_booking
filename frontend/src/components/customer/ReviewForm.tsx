import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../../services/api';

interface ReviewFormProps {
  bookingId: number;
  onSuccess?: () => void;
}

const ReviewForm = ({ bookingId, onSuccess }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: () =>
      api.post(`/bookings/${bookingId}/review`, { rating, comment }),
    onSuccess: () => {
      toast.success('Cảm ơn bạn đã đánh giá!');
      queryClient.invalidateQueries(); 
      onSuccess?.();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? 'Có lỗi xảy ra');
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium text-gray-600">Đánh giá của bạn</p>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="text-2xl transition-colors"
          >
            <span className={star <= (hovered || rating) ? 'text-amber-400' : 'text-gray-200'}>
              ★
            </span>
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Chia sẻ trải nghiệm của bạn..."
        rows={3}
        className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
      />

      <button
        onClick={() => {
          if (rating === 0) {
            toast.error('Vui lòng chọn số sao');
            return;
          }
          submitReview();
        }}
        disabled={isPending || rating === 0}
        className="self-start px-4 py-2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
      >
        {isPending ? 'Đang gửi...' : 'Gửi đánh giá'}
      </button>
    </div>
  );
};

export default ReviewForm;