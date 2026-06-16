import { Prisma, RoomStatus, BookingStatus } from '@prisma/client';
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { createAuditLog } from '../utils/audit-log.util';
import { uploadImage, deleteCloudinaryImage } from '../utils/cloudinary.util';
import { RoomTypeDto, RoomDto, AmenityDto, UpdateAmenityDto, SearchAvailableDto } from '../validations/hotel.schema';

interface RoomFilter {
  status?: RoomStatus;
  floor?: number;
  roomTypeId?: number;
}

// RoomType 

export const getAllRoomTypes = async () => {
  return prisma.roomType.findMany({
    include: {
      images: {
        orderBy: { displayOrder: 'asc' },
      },
      rooms: true,
      amenities: {
        include: {
          amenity: true,
        },
      },
      _count: {
        select: { rooms: true },
      },
    },
  });
};

export const getRoomTypeById = async (id: number) => {
  const roomType = await prisma.roomType.findUnique({
    where: { id },
    include: {
      images: true,
      amenities: {
        include: {
          amenity: true
        }
      }
    }
  });

  if (!roomType) {
    throw new AppError(404, 'Không tìm thấy loại phòng');
  }

  const formattedRoomType = {
    ...roomType,
    amenities: roomType.amenities.map((item: any) => item.amenity)
  };

  return formattedRoomType;
};

export const createRoomType = async (data: RoomTypeDto, files: Express.Multer.File[], actorId: number) => {
  let imageUrls: string[] = [];
  if (files && files.length > 0) {
    const uploadPromises = files.map(async (file) => {
      let dataURI = '';
      if (file.buffer) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        dataURI = "data:" + file.mimetype + ";base64," + b64;
      } else if (file.path) {
        dataURI = file.path;
      }
      if (!dataURI) return null;
      const res = await uploadImage(dataURI);
      let url = typeof res === 'string' ? res : (res as any).secure_url;
      if (url && url.includes('/upload/')) {
        url = url.replace('/upload/', '/upload/f_auto,q_auto,w_1200,c_limit/');
      }

      console.log('Đã tải ảnh lên Cloudinary:', url);
      return url;
    });
    const results = await Promise.all(uploadPromises);
    imageUrls = results.filter((url): url is string => Boolean(url));
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const newRoomType = await tx.roomType.create({
        data: {
          typeName: data.typeName,
          description: data.description,
          maxCapacity: data.maxCapacity,
          basePrice: data.basePrice,
          amenities: {
            create: data.amenityIds.map((amenityId) => ({ amenityId })),
          },
          images: {
            create: imageUrls.map((url, index) => ({
              imageUrl: url,
              displayOrder: index,
            })),
          },
        },
      });

      await createAuditLog({
        tx,
        actorId,
        targetTable: 'RoomType',
        targetId: newRoomType.id,
        action: 'CREATE',
        oldValue: null,
        newValue: newRoomType,
      });

      return newRoomType;
    });
  } catch (error) {
    if (imageUrls.length > 0) {
      Promise.allSettled(imageUrls.map((url) => deleteCloudinaryImage(url))).catch(console.error);
    }
    throw error;
  }
};

export const updateRoomType = async (
  id: number,
  data: RoomTypeDto & {
    version: number;
    deleteImageIds?: number[];
    amenityIds?: number[];
  },
  files: Express.Multer.File[],
  actorId: number
) => {
  const old = await prisma.roomType.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!old) {
    throw new AppError(404, 'Không tìm thấy hạng phòng');
  }

  if (old.version !== data.version) {
    throw new AppError(
      409,
      'Dữ liệu đã bị thay đổi bởi người khác. Vui lòng tải lại trang và thử lại.'
    );
  }

  let newImageUrls: string[] = [];
  if (files && files.length > 0) {
    const uploadPromises = files.map(async (file) => {
      let dataURI = '';
      if (file.buffer) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        dataURI = "data:" + file.mimetype + ";base64," + b64;
      } else if (file.path) {
        dataURI = file.path;
      }
      if (!dataURI) return null;
      const res = await uploadImage(dataURI);
      const url = typeof res === 'string' ? res : (res as any).secure_url;
      console.log('Đã tải ảnh lên Cloudinary:', url);
      return url;
    });
    const results = await Promise.all(uploadPromises);
    newImageUrls = results.filter((url): url is string => Boolean(url));
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      if (data.deleteImageIds && data.deleteImageIds.length > 0) {
      await tx.roomImage.deleteMany({
        where: {
          id: { in: data.deleteImageIds },
          roomTypeId: id,
        },
      });
    }

    if (newImageUrls.length > 0) {
      const remainingImages = await tx.roomImage.findMany({
        where: { roomTypeId: id },
        orderBy: { displayOrder: 'desc' },
        take: 1,
      });

      const startOrder =
        remainingImages.length > 0
          ? remainingImages[0].displayOrder + 1
          : 0;

      await tx.roomImage.createMany({
        data: newImageUrls.map((url, index) => ({
          roomTypeId: id,
          imageUrl: url,
          displayOrder: startOrder + index,
        })),
      });
    }

    const updateResult = await tx.roomType.updateMany({
      where: {
        id,
        version: data.version,
      },
      data: {
        ...(data.typeName && { typeName: data.typeName }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.basePrice !== undefined && { basePrice: data.basePrice }),
        ...(data.maxCapacity && { maxCapacity: data.maxCapacity }),
        version: { increment: 1 },
      },
    });

    if (updateResult.count === 0) {
      throw new AppError(
        409,
        'Dữ liệu đã bị thay đổi bởi người khác. Vui lòng tải lại trang và thử lại.'
      );
    }

    const updated = await tx.roomType.findUniqueOrThrow({ where: { id } });

    if (data.amenityIds !== undefined) {
      await tx.roomTypeAmenity.deleteMany({
        where: { roomTypeId: id },
      });

      if (data.amenityIds.length > 0) {
        await tx.roomTypeAmenity.createMany({
          data: data.amenityIds.map((amenityId: number) => ({
            roomTypeId: id,
            amenityId,
          })),
        });
      }
    }

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'RoomType',
      targetId: id,
      action: 'UPDATE',
      oldValue: {
        typeName: old.typeName,
        description: old.description,
        basePrice: old.basePrice,
        maxCapacity: old.maxCapacity,
        version: old.version,
        imageCount: old.images.length,
      },
      newValue: {
        typeName: updated.typeName,
        description: updated.description,
        basePrice: updated.basePrice,
        maxCapacity: updated.maxCapacity,
        version: updated.version,
        deletedImageIds: data.deleteImageIds ?? [],
        newImagesUploaded: newImageUrls.length,
      },
    });

    return tx.roomType.findUnique({
      where: { id },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    });
  });

    if (data.deleteImageIds && data.deleteImageIds.length > 0) {
      const imagesToDelete = old.images.filter((img) =>
        data.deleteImageIds!.includes(img.id)
      );
      Promise.allSettled(
        imagesToDelete.map((img) => deleteCloudinaryImage(img.imageUrl))
      ).catch(console.error);
    }

    return result;
  } catch (error) {
    if (newImageUrls.length > 0) {
      Promise.allSettled(newImageUrls.map((url) => deleteCloudinaryImage(url))).catch(console.error);
    }
    throw error;
  }
};

export const deleteRoomType = async (id: number, actorId: number) => {
  const existing = await prisma.roomType.findUnique({
    where: { id },
    include: {
      _count: { select: { rooms: true } },
      images: true,
    },
  });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy loại phòng');
  }

  if (existing._count.rooms > 0) {
    throw new AppError(400, 'Không thể xóa loại phòng đang có phòng sử dụng');
  }

  await prisma.$transaction(async (tx) => {
    await tx.roomImage.deleteMany({ where: { roomTypeId: id } });
    await tx.roomTypeAmenity.deleteMany({ where: { roomTypeId: id } });

    await tx.roomType.delete({ where: { id } });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'RoomType',
      targetId: id,
      action: 'DELETE',
      oldValue: existing,
      newValue: null,
    });
  });

  if (existing.images.length > 0) {
      Promise.allSettled(existing.images.map((img) => deleteCloudinaryImage(img.imageUrl))).catch(console.error);
  }
};

export const searchAvailable = async (data: SearchAvailableDto) => {
  const checkInDate = new Date(data.checkIn);
  checkInDate.setHours(14, 0, 0, 0);
  const checkOutDate = new Date(data.checkOut);
  checkOutDate.setHours(12, 0, 0, 0);

  const priceFilter = data.minPrice != null || data.maxPrice != null
    ? {
        basePrice: {
          ...(data.minPrice != null ? { gte: data.minPrice } : {}),
          ...(data.maxPrice != null ? { lte: data.maxPrice } : {}),
        },
      }
    : {};

  const excludedRoomStatuses = Object.values(RoomStatus).filter((s) =>
    ['maintenance', 'out_of_order', 'outoforder'].includes(s.toLowerCase())
  );

  const excludedBookingStatuses = Object.values(BookingStatus).filter((s) =>
    s.toLowerCase() === 'cancelled'
  );

  const availableRoomCondition: Prisma.RoomWhereInput = {
    status: { notIn: excludedRoomStatuses },
    bookings: {
      none: {
        status: { notIn: excludedBookingStatuses },
        AND: [
          { checkInDate: { lt: checkOutDate } },
          { checkOutDate: { gt: checkInDate } },
        ],
      },
    },
  };

  const results = await prisma.roomType.findMany({
    where: {
      maxCapacity: { gte: data.guests },
      ...priceFilter,
      rooms: {
        some: availableRoomCondition,
      },
    },
    include: {
      amenities: {
        include: { amenity: true },
      },
      images: {
        orderBy: { displayOrder: 'asc' },
      },
      _count: {
        select: {
          rooms: { where: availableRoomCondition },
        },
      },
    },
  });

  return results
    .map((rt) => ({
      id: rt.id,
      typeName: rt.typeName,
      description: rt.description,
      maxCapacity: rt.maxCapacity,
      basePrice: Number(rt.basePrice),
      amenities: rt.amenities,
      images: rt.images,
      availableRoomCount: rt._count.rooms,
      lowestPrice: Number(rt.basePrice),
    }))
    .sort((a, b) => a.lowestPrice - b.lowestPrice);
};

//Room

export const getRooms = async (filter: RoomFilter) => {
  return prisma.room.findMany({
    where: filter,
    include: {
      roomType: {
        include: {
          images: { take: 1, orderBy: { displayOrder: 'asc' } },
        },
      },
    },
  });
};

export const createRoom = async (data: RoomDto, actorId: number) => {
  return prisma.$transaction(async (tx) => {
    const roomType = await tx.roomType.findUnique({
      where: { id: data.roomTypeId }
    });

    if (!roomType) {
      throw new AppError(404, 'Không tìm thấy loại phòng');
    }

    const existingRoom = await tx.room.findFirst({
      where: { roomNumber: data.roomNumber }
    });

    if (existingRoom) {
      throw new AppError(409, 'Số phòng này đã tồn tại trong hệ thống');
    }

    const room = await tx.room.create({
      data: {
        roomNumber: data.roomNumber,
        floor: data.floor,
        status: data.status as RoomStatus,
        currentPrice: roomType.basePrice,
        roomType: {
          connect: { id: data.roomTypeId }
        }
      },
    });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Room',
      targetId: room.id,
      action: 'CREATE',
      oldValue: null,
      newValue: room,
    });

    return room;
  });
};

export const updateRoom = async (id: number, data: Partial<RoomDto>, actorId: number) => {
  const existing = await prisma.room.findUnique({ where: { id } });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy phòng');
  }

  const { status, ...safeData } = data;

  return prisma.$transaction(async (tx) => {
    const updated = await tx.room.update({
      where: { id },
      data: safeData,
    });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Room',
      targetId: id,
      action: 'UPDATE',
      oldValue: existing,
      newValue: updated,
    });

    return updated;
  });
};

export const deleteRoom = async (id: number, actorId: number) => {
  const existing = await prisma.room.findUnique({
    where: { id },
    include: {
      _count: { select: { bookings: true } },
    },
  });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy phòng');
  }

  if (existing._count.bookings > 0) {
    throw new AppError(400, 'Không thể xóa phòng đã từng có lịch sử đặt phòng. Hãy đổi trạng thái sang Bảo trì hoặc Ngừng hoạt động.');
  }

  return prisma.$transaction(async (tx) => {
    await tx.room.delete({ where: { id } });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Room',
      targetId: id,
      action: 'DELETE',
      oldValue: existing,
      newValue: null,
    });
  });
};

export const updateRoomStatus = async (
  roomId: number,
  newStatus: string,
  currentVersion: number,
  actorId: number
) => {
  return prisma.$transaction(async (tx) => {
    const room = await tx.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      throw new AppError(404, 'Không tìm thấy phòng');
    }

    if (room.version !== currentVersion) {
      throw new AppError(
        409,
        'Trạng thái phòng vừa được thay đổi bởi nhân viên khác. Vui lòng tải lại.'
      );
    }
    if (['maintenance', 'cleaning', 'out_of_order'].includes(newStatus)) {
      const activeBooking = await tx.booking.findFirst({
        where: {
          roomId,
          status: 'checked_in' as BookingStatus,
        },
      });

      if (activeBooking) {
        throw new AppError(
          400,
          'Không thể vô hiệu hóa phòng đang có đơn đặt phòng'
        );
      }
    }

    const updateResult = await tx.room.updateMany({
      where: { 
        id: roomId,
        version: currentVersion
      },
      data: {
        status: newStatus as RoomStatus,
        version: { increment: 1 },
      },
    });

    if (updateResult.count === 0) {
      throw new AppError(
        409,
        'Trạng thái phòng vừa được thay đổi bởi nhân viên khác. Vui lòng tải lại.'
      );
    }

    const updated = await tx.room.findUniqueOrThrow({ where: { id: roomId } });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Room',
      targetId: roomId,
      action: 'UPDATE',
      oldValue: { status: room.status, version: room.version },
      newValue: { status: newStatus, version: updated.version },
    });

    return updated;
  });
};

export const getAmenities = async () => {
  return prisma.amenity.findMany();
};

export const createAmenity = async (data: AmenityDto, actorId: number) => {
  return prisma.$transaction(async (tx) => {
    const existingAmenity = await tx.amenity.findFirst({
      where: { amenityName: data.amenityName }
    });

    if (existingAmenity) {
      throw new AppError(409, 'Tên tiện ích đã tồn tại');
    }

    const amenity = await tx.amenity.create({
      data: {
        amenityName: data.amenityName,
        description: data.description,
      },
    });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Amenity',
      targetId: amenity.id,
      action: 'CREATE',
      oldValue: null,
      newValue: amenity,
    });

    return amenity;
  });
};

export const updateAmenity = async (id: number, data: UpdateAmenityDto, actorId: number) => {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.amenity.findUnique({ where: { id } });

    if (!existing) {
      throw new AppError(404, 'Không tìm thấy tiện ích');
    }

    if (data.amenityName && data.amenityName !== existing.amenityName) {
      const nameExists = await tx.amenity.findFirst({
        where: { amenityName: data.amenityName }
      });
      if (nameExists) {
        throw new AppError(409, 'Tên tiện ích đã tồn tại');
      }
    }

    const updated = await tx.amenity.update({
      where: { id },
      data: {
        ...(data.amenityName && { amenityName: data.amenityName }),
        ...(data.description !== undefined && { description: data.description }),
      },
    });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Amenity',
      targetId: id,
      action: 'UPDATE',
      oldValue: existing,
      newValue: updated,
    });

    return updated;
  });
};

export const deleteAmenity = async (id: number, actorId: number) => {
  const existing = await prisma.amenity.findUnique({
    where: { id },
    include: {
      _count: { select: { roomTypes: true } },
    },
  });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy tiện ích');
  }

  if (existing._count.roomTypes > 0) {
    throw new AppError(400, 'Không thể xóa tiện ích đang được sử dụng bởi loại phòng');
  }

  return prisma.$transaction(async (tx) => {
    await tx.amenity.delete({ where: { id } });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Amenity',
      targetId: id,
      action: 'DELETE',
      oldValue: existing,
      newValue: null,
    });
  });
};

// ── Room Dashboard (Sơ đồ phòng) ─────────────────────────────────────────────

// Danh sách trạng thái booking được coi là đang sử dụng phòng
const ACTIVE_BOOKING_STATUSES: BookingStatus[] = ['confirmed', 'checked_in'];

export interface RoomGuestOverview {
  bookingId: number;
  guestName: string;
  guestPhone: string;
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
  isUpcoming?: boolean;
  isOverdue?: boolean;
}

export interface RoomOverview {
  roomId: number;
  roomNumber: string;
  floor: number;
  status: RoomStatus | 'reserved';
  currentPrice: number;
  typeName: string;
  maxCapacity: number;
  currentGuest: RoomGuestOverview | null;
  version: number;
}

export const getRoomOverview = async (): Promise<RoomOverview[]> => {
  try {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    const rooms = await prisma.room.findMany({
      include: {
        roomType: {
          select: { typeName: true, maxCapacity: true },
        },
        bookings: {
          where: {
            OR: [
              { status: 'checked_in' },
              {
                status: { in: ['confirmed', 'pending_payment'] },
                checkInDate: { lte: todayEnd },
                checkOutDate: { gt: todayStart },
              }
            ]
          },
          select: {
            id: true,
            status: true,
            checkInDate: true,
            checkOutDate: true,
            guestCount: true,
            customer: { select: { fullName: true, phoneNumber: true } },
          },
          orderBy: { checkInDate: 'asc' },
        },
      },
      orderBy: [{ floor: 'asc' }, { roomNumber: 'asc' }],
    });

    return rooms.map((room) => {
      let finalStatus: RoomStatus | 'reserved' = room.status;
      let guestInfo: RoomGuestOverview | null = null;

      const activeBooking = room.bookings.find((b) => b.status === 'checked_in');

      const upcomingBooking = room.bookings.find(
        (b) => ['confirmed', 'pending_payment'].includes(b.status) && 
               b.id !== activeBooking?.id
      );

      if (activeBooking) {
        finalStatus = 'occupied';
        const isOverdue = now > new Date(activeBooking.checkOutDate);

        guestInfo = {
          bookingId: activeBooking.id,
          guestName: activeBooking.customer?.fullName ?? 'Khách',
          guestPhone: activeBooking.customer?.phoneNumber ?? '—',
          checkInDate: activeBooking.checkInDate,
          checkOutDate: activeBooking.checkOutDate,
          guestCount: activeBooking.guestCount,
          isUpcoming: false,
          isOverdue,
        };
        
      } else {
        if (room.status === 'occupied') {
          finalStatus = 'cleaning';
        }
        
        if (upcomingBooking) {
          if (finalStatus === 'available') {
            finalStatus = 'reserved';
          }
          
          guestInfo = {
            bookingId: upcomingBooking.id,
            guestName: upcomingBooking.customer?.fullName ?? 'Khách',
            guestPhone: upcomingBooking.customer?.phoneNumber ?? '—',
            checkInDate: upcomingBooking.checkInDate,
            checkOutDate: upcomingBooking.checkOutDate,
            guestCount: upcomingBooking.guestCount,
            isUpcoming: true,
            isOverdue: false,
          };
        }
      }

      return {
        roomId: room.id,
        roomNumber: room.roomNumber,
        floor: room.floor ?? 1,
        status: finalStatus,
        currentPrice: Number(room.currentPrice),
        typeName: room.roomType.typeName,
        maxCapacity: room.roomType.maxCapacity,
        currentGuest: guestInfo,
        version: room.version,
      };
    });
  } catch (error: any) {
    throw new AppError(500, `Lỗi khi lấy sơ đồ phòng: ${error.message}`);
  }
};

export const getAllRoomTypesPublic = async () => {
  return prisma.roomType.findMany({
    include: {
      images: {
        orderBy: { displayOrder: 'asc' },
      },
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });
};