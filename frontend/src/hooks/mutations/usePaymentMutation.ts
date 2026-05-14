import { useMutation } from '@tanstack/react-query';
import { paymentService } from '../../services/payment.service';

export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: paymentService.initiate,
  });
};

export const useSimulatePayment = () => {
  return useMutation({
    mutationFn: paymentService.simulateSuccess,
  });
};