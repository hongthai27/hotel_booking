import { Router } from 'express';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import * as adminController from '../controllers/admin.controller';

const router = Router();

router.get(
  '/users',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  adminController.searchUsers
);

router.get('/refunds', adminController.getAllRefunds);

export default router;