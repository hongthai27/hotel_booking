import { Router } from 'express';
import authRoutes from './auth.route';
import hotelRoutes from './hotel.route';
import bookingRoutes from './booking.route';
import paymentRoutes from './payment.route';
import promotionRoutes from './promotion.route';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/hotels', hotelRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/promotions', promotionRoutes);
router.use('/admin', adminRoutes);

export { router };
