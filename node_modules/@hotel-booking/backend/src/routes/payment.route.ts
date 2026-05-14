import { Router } from 'express';
import * as paymentController from '../controllers/payment.controller';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { initiatePaymentSchema, simulatePaymentSchema } from '../validations/payment.schema';

const router = Router();

router.post(
  '/payments/initiate',
  authenticateJWT,
  authorizeRole(['customer']),
  validateBody(initiatePaymentSchema),
  paymentController.initiatePayment
);

router.get(
  '/payments/:bookingId/status',
  authenticateJWT,
  paymentController.getPaymentStatus
);

router.post(
  '/payments/simulate-success',
  validateBody(simulatePaymentSchema),
  paymentController.simulateSuccess
);

export default router;