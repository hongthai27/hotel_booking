import { Router } from 'express';
import * as promotionController from '../controllers/promotion.controller';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { createPromotionSchema, updatePromotionSchema } from '../validations/promotion.schema';

const router = Router();

// Route: GET /promotions/validate?code=XYZ
router.get('/validate', promotionController.validatePromotion);

// --- Admin Routes ---
router.get(
  '/',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  promotionController.getAllPromotions
);

router.post(
  '/',
  authenticateJWT,
  authorizeRole(['admin']),
  validateBody(createPromotionSchema),
  promotionController.createPromotion
);

router.put(
  '/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  validateBody(updatePromotionSchema),
  promotionController.updatePromotion
);

router.patch(
  '/:id/toggle',
  authenticateJWT,
  authorizeRole(['admin']),
  promotionController.togglePromotion
);

router.delete(
  '/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  promotionController.deletePromotion
);

export default router;