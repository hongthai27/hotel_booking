import { Router, Request, Response } from 'express';
import authRouter from './auth.route';
import hotelRouter from './hotel.route';
import bookingRouter from './booking.route';
import paymentRouter from './payment.route';
import promotionRouter from './promotion.route';
import adminRouter from './admin.routes';
import { startCronJobs } from '../services/cron.service';

export const router = Router();

startCronJobs();

router.get('/health', (_req: Request, res: Response): void => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

router.use('/auth', authRouter);
router.use('/', hotelRouter);
router.use('/', bookingRouter);
router.use('/', paymentRouter);
router.use('/promotions', promotionRouter);
router.use('/admin', adminRouter);

// TODO: router.use('/users', userRouter);