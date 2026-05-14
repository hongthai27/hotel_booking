import { Router, Request, Response } from 'express';
import authRouter from './auth.route';
import hotelRouter from './hotel.route';
import bookingRouter from './booking.route';
import paymentRouter from './payment.route';

export const router = Router();

router.get('/health', (_req: Request, res: Response): void => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

router.use('/auth', authRouter);
router.use('/', hotelRouter);
router.use('/', bookingRouter);
router.use('/', paymentRouter);

// TODO: router.use('/users', userRouter);