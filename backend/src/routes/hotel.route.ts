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

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
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

router.get(
  '/hotels/available',
  validateQuery(searchAvailableSchema),
  hotelController.searchAvailable
);

router.get('/hotels/:roomTypeId', hotelController.getRoomTypeById);

router.get('/hotels', hotelController.getAllRoomTypes);

router.get(
  '/admin/room-types',
  authenticateJWT,
  authorizeRole(['admin']),
  hotelController.getAllRoomTypes
);

router.get(
  '/admin/room-types/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  hotelController.getRoomTypeById
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

router.get(
  '/admin/rooms',
  authenticateJWT,
  authorizeRole(['admin']),
  hotelController.getRooms
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
  authorizeRole(['admin']),
  validateBody(updateRoomStatusSchema),
  hotelController.updateRoomStatus
);

router.get(
  '/admin/amenities',
  authenticateJWT,
  authorizeRole(['admin']),
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