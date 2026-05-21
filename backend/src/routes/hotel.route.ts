import { Router } from 'express';
import multer from 'multer';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import { validateBody, validateQuery } from '../middlewares/validate.middleware';
import {
  roomTypeSchema,
  roomSchema,
  amenitySchema,
  searchAvailableSchema,
  updateRoomStatusSchema,
} from '../validations/hotel.schema';
import * as hotelController from '../controllers/hotel.controller';

const router = Router();

// Cấu hình Multer để upload ảnh
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file jpeg, png, webp'), false);
    }
  },
}) as any;

// ── Public Routes ─────────────────────────────────────────────────────────────

router.get(
  '/hotels/available',
  validateQuery(searchAvailableSchema),
  hotelController.searchAvailable
);

// Dat truoc cac route co params de tranh conflict
router.get('/hotels/room-types', hotelController.getAllRoomTypesPublic);

router.get('/hotels/:roomTypeId', hotelController.getRoomTypeById);

router.get('/hotels', hotelController.getAllRoomTypes);

// ── Admin - Room Types ────────────────────────────────────────────────────────

router.get(
  '/admin/room-types',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  hotelController.getAllRoomTypes
);

router.post(
  '/admin/room-types',
  authenticateJWT,
  authorizeRole(['admin']),
  upload.array('images', 10),
  validateBody(roomTypeSchema),
  hotelController.createRoomType
);

router.put(
  '/admin/room-types/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  upload.array('images', 10),
  validateBody(roomTypeSchema),
  hotelController.updateRoomType
);

router.delete(
  '/admin/room-types/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  hotelController.deleteRoomType
);

// ── Admin - Rooms (QUẢN LÝ PHÒNG) ─────────────────────────────────────────────

router.get(
  '/admin/rooms',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  hotelController.getRooms
);
 // ROUTE SƠ ĐỒ PHÒNG (DASHBOARD)
router.get(
  '/admin/rooms/overview',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  hotelController.getRoomOverview
);

router.post(
  '/admin/rooms',
  authenticateJWT,
  authorizeRole(['admin']),
  validateBody(roomSchema),
  hotelController.createRoom
);

router.put(
  '/admin/rooms/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  validateBody(roomSchema),
  hotelController.updateRoom
);

router.patch(
  '/admin/rooms/:id/status',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  validateBody(updateRoomStatusSchema),
  hotelController.updateRoomStatus
);

// ── Admin - Amenities (TIỆN ÍCH) ──────────────────────────────────────────────

router.get(
  '/admin/amenities',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  hotelController.getAmenities
);

router.post(
  '/admin/amenities',
  authenticateJWT,
  authorizeRole(['admin']),
  validateBody(amenitySchema),
  hotelController.createAmenity
);

router.delete(
  '/admin/amenities/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  hotelController.deleteAmenity
);

export default router;