import { Prisma, RoomStatus, BookingStatus } from '@prisma/client';
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { createAuditLog } from '../utils/audit-log.util';
import { uploadImage, deleteCloudinaryImage } from '../utils/cloudinary.util';
import { RoomTypeDto, RoomDto, AmenityDto, SearchAvailableDto } from '../validations/hotel.schema';

interface RoomFilter {
  status?: RoomStatus;
  floor?: number;
  roomTypeId?: number;
}

// ── RoomType ───────────────────────────────────────────────────────────────────

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

export const createRoomType = async (data: RoomTypeDto, actorId: number) => {
  const imageUrls = data.images && data.images.length > 0
    ? await Promise.all(data.images.map((image) => uploadImage(image)))
    : [];

  return prisma.$transaction(async (tx) => {
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
    newImageUrls = await Promise.all(
      files.map((file) => uploadImage(file.path))
    );
  }

  return prisma.$transaction(async (tx) => {
    if (data.deleteImageIds && data.deleteImageIds.length > 0) {
      const imagesToDelete = old.images.filter((img) =>
        data.deleteImageIds!.includes(img.id)
      );

      imagesToDelete.forEach((img) => {
        deleteCloudinaryImage(img.imageUrl);
      });

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

  if (existing.images.length > 0) {
      Promise.allSettled(existing.images.map((img) => deleteCloudinaryImage(img.imageUrl)));
  }

  return prisma.$transaction(async (tx) => {
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

  // Thêm type annotation Prisma.RoomWhereInput
  const availableRoomCondition: Prisma.RoomWhereInput = {
    status: { not: 'maintenance' },
    bookings: {
      none: {
        status: { notIn: ['cancelled'] as BookingStatus[] },
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

// ── Room ───────────────────────────────────────────────────────────────────────

export const getRooms = async (filter: RoomFilter) => {
  return prisma.room.findMany({
    where: {
      ...(filter.status && { status: filter.status }),
      ...(filter.floor && { floor: filter.floor }),
      ...(filter.roomTypeId && { roomTypeId: filter.roomTypeId }),
    },
    include: {
      roomType: true,
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

    const room = await tx.room.create({
      data: {
        roomNumber: data.roomNumber,
        floor: data.floor,
        status: data.status,
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

  // Không cho phép cập nhật status qua hàm này
  // Mọi thay đổi status phải đi qua updateRoomStatus để kiểm tra booking
  const { status: _, ...safeData } = data;

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

    // Optimistic locking — kiểm tra version ở memory trước
    if (room.version !== currentVersion) {
      throw new AppError(
        409,
        'Trạng thái phòng vừa được thay đổi bởi nhân viên khác. Vui lòng tải lại.'
      );
    }

    // Không cho chuyển sang maintenance/cleaning nếu còn booking active
    if (['maintenance', 'cleaning'].includes(newStatus)) {
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

    // Khóa atomic: Đảm bảo version khớp 100% lúc chạm vào DB bằng updateMany
    const updateResult = await tx.room.updateMany({
      where: { 
        id: roomId,
        version: currentVersion
      },
      data: {
        status: newStatus as any,
        version: { increment: 1 }, // Tự động tăng version
      },
    });

    if (updateResult.count === 0) {
      // Bắt lỗi nếu version bị thay đổi trong tíc tắc
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

// ── Amenity ────────────────────────────────────────────────────────────────────

export const getAmenities = async () => {
  return prisma.amenity.findMany();
};

export const createAmenity = async (data: AmenityDto, actorId: number) => {
  return prisma.$transaction(async (tx) => {
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
}

export interface RoomOverview {
  roomId: number;
  roomNumber: string;
  floor: number;
  status: RoomStatus;
  currentPrice: number;
  typeName: string;
  maxCapacity: number;
  currentGuest: RoomGuestOverview | null;
}

/**
 * Lấy sơ đồ phòng tổng quan bao gồm trạng thái thực tế và thông tin khách hiện tại.
 * Phục vụ dashboard realtime cho Admin và Lễ tân.
 */
export const getRoomOverview = async (): Promise<RoomOverview[]> => {
  try {
    const now = new Date();
    
    // Tạo mốc thời gian ngày hôm nay để quét các đơn đặt trước
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
            status: { in: ACTIVE_BOOKING_STATUSES },
            checkInDate: { lte: todayEnd },
            checkOutDate: { gt: todayStart },
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
      // 1. Khách ĐANG Ở thực tế: Bắt buộc trạng thái đơn phải là 'checked_in'
      const activeBooking = room.bookings.find((b) => b.status === 'checked_in');

      // 2. Khách SẮP ĐẾN hôm nay: Đơn mới ở trạng thái 'confirmed' (chưa check-in)
      const upcomingBooking = room.bookings.find(
        (b) => b.status === 'confirmed' && 
               new Date(b.checkInDate) >= todayStart && 
               new Date(b.checkInDate) <= todayEnd
      );
      let finalStatus = room.status;
      let guestInfo = null;

      if (activeBooking) {
        // Nếu có khách đang ở -> Hiện màu Xanh dương
        finalStatus = 'occupied'; 
        guestInfo = {
          bookingId: activeBooking.id,
          guestName: activeBooking.customer.fullName,
          guestPhone: activeBooking.customer.phoneNumber,
          checkInDate: activeBooking.checkInDate,
          checkOutDate: activeBooking.checkOutDate,
          guestCount: activeBooking.guestCount,
          isUpcoming: false,
        };
        
      } else if (upcomingBooking && room.status === 'available') {
        // Nếu phòng trống SẠCH VÀ có khách sắp đến chiều nay -> Kích hoạt màu Cam tự động!
        finalStatus = 'reserved' as any;
        guestInfo = {
          bookingId: upcomingBooking.id,
          guestName: upcomingBooking.customer.fullName,
          guestPhone: upcomingBooking.customer.phoneNumber,
          checkInDate: upcomingBooking.checkInDate,
          checkOutDate: upcomingBooking.checkOutDate,
          guestCount: upcomingBooking.guestCount,
          isUpcoming: true, // Gắn cờ để Frontend hiển thị nhãn "Khách sắp đến"
        };
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