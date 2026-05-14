import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import { registerSchema, loginSchema } from '../validations/auth.schema';

const router = Router();

router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.get('/me', authenticateJWT, authController.getMe);

router.get(
  '/admin/users',
  authenticateJWT,
  authorizeRole(['admin']),
  authController.getAllUsers
);

router.get(
  '/admin/users/search',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  authController.searchUsers
);

router.patch(
  '/admin/users/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  authController.updateUser
);

export default router;