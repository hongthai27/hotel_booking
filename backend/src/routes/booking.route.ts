import { Router } from 'express';
import * as bookingController from '../controllers/booking.controller';
import * as reportController from '../controllers/report.controller';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import { validateBody, validateQuery } from '../middlewares/validate.middleware';
import {
  createBookingSchema,
  createOfflineBookingSchema,
  updateOfflineBookingSchema,
  getAllBookingsQuerySchema,
  createReviewSchema,
} from '../validations/booking.schema';

const router = Router();

// ── Hotels: Public Reviews ──────────────────────────────────────────────────

router.get(
  '/hotels/:roomTypeId/reviews',
  bookingController.getReviewsByRoomType
);

// ── Customer: Bookings & Reviews ───────────────────────────────────────────

router.get('/bookings/my', authenticateJWT, bookingController.getMyBookings);

router.post(
  '/bookings',
  authenticateJWT,
  authorizeRole(['customer']),
  validateBody(createBookingSchema),
  bookingController.createBooking
);

router.get(
  '/bookings/:id/refund-preview',
  authenticateJWT,
  authorizeRole(['customer']),
  bookingController.getRefundPreview
);

router.get('/bookings/:id', authenticateJWT, bookingController.getBookingById);

router.patch(
  '/bookings/:id/cancel',
  authenticateJWT,
  bookingController.cancelBooking
);

router.post(
  '/bookings/:id/review',
  authenticateJWT,
  authorizeRole(['customer']),
  validateBody(createReviewSchema),
  bookingController.createReview
);

// ── Admin: Bookings ────────────────────────────────────────────────────────────

router.get(
  '/admin/bookings',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  validateQuery(getAllBookingsQuerySchema),
  bookingController.getAllBookings
);

router.post(
  '/admin/bookings',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  validateBody(createOfflineBookingSchema),
  bookingController.createOfflineBooking
);

router.patch(
  '/admin/bookings/:id',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  validateBody(updateOfflineBookingSchema),
  bookingController.updateOfflineBooking
);

router.patch(
  '/admin/bookings/:id/checkin',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  bookingController.checkIn
);

router.patch(
  '/admin/bookings/:id/checkout',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  bookingController.checkOut
);

router.patch(
  '/admin/bookings/:id/cancel',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  bookingController.cancelBooking
);

router.get(
  '/admin/bookings/:id',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  bookingController.getBookingById
);

// ── Admin: Refunds & Reports ─────────────────────────────────────────────────────

router.get(
  '/admin/refunds',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  reportController.getRefundList
);

router.get(
  '/admin/reports/revenue',
  authenticateJWT,
  authorizeRole(['admin']),
  reportController.getRevenueReport
);

router.patch(
  '/admin/payments/:id/confirm-refund',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  bookingController.confirmRefund
);

export default router;