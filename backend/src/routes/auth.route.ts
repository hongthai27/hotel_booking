import { Router } from 'express';
import multer from 'multer';
import * as authController from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import { 
  registerSchema, 
  loginSchema,
  forgotPasswordSchema, 
  resetPasswordSchema,
  updateProfileSchema,
  changePasswordSchema,
} from '../validations/auth.schema';
import path from 'path';
import fs from 'fs';

const router = Router();

// 1. Định nghĩa đường dẫn tới thư mục uploads (nằm cùng cấp với src hoặc trong backend)
const uploadDir = path.join(__dirname, '../../uploads'); 

// 2. Kiểm tra nếu chưa có thư mục thì tự tạo ra
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Cấu hình Multer để upload avatar
const uploadAvatar = multer({
  storage: multer.diskStorage({
    // Sử dụng đường dẫn an toàn đã tạo ở trên
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => cb(null, `avatar-${Date.now()}-${file.originalname}`),
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    file.mimetype.startsWith('image/')
      ? cb(null, true)
      : cb(new Error('Chỉ chấp nhận file ảnh'));
  },
}).single('avatar');

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

// ─── Forgot & Reset Password ──────────────────────────────────────────────────

router.post(
  '/forgot-password',
  validateBody(forgotPasswordSchema), 
  authController.forgotPassword
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema), 
  authController.resetPassword
);

// ─── Profile Routes ──────────────────────────────────────────────────────────

router.put(
  '/profile',
  authenticateJWT,
  validateBody(updateProfileSchema),
  authController.updateProfile
);

router.post(
  '/profile/avatar',
  authenticateJWT,
  uploadAvatar,
  authController.uploadAvatar
);

router.put(
  '/profile/password',
  authenticateJWT,
  validateBody(changePasswordSchema),
  authController.changePassword
);

export default router;