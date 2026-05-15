import { Prisma, RoomStatus, BookingStatus } from '@prisma/client';
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { createAuditLog } from '../utils/audit-log.util';
import { uploadImage } from '../utils/cloudinary.util';
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

export const updateRoomType = async (id: number, data: RoomTypeDto, actorId: number) => {
  const existing = await prisma.roomType.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy loại phòng');
  }

  const imageUrls = data.images && data.images.length > 0
    ? await Promise.all(data.images.map((image) => uploadImage(image)))
    : [];

  return prisma.$transaction(async (tx) => {
    const updated = await tx.roomType.update({
      where: { id },
      data: {
        typeName: data.typeName,
        description: data.description,
        maxCapacity: data.maxCapacity,
        basePrice: data.basePrice,
        amenities: {
          deleteMany: {},
          create: data.amenityIds.map((amenityId) => ({ amenityId })),
        },
        ...(imageUrls.length > 0 && {
          images: {
            deleteMany: {},
            create: imageUrls.map((url, index) => ({
              imageUrl: url,
              displayOrder: index,
            })),
          },
        }),
      },
    });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'RoomType',
      targetId: id,
      action: 'UPDATE',
      oldValue: existing,
      newValue: updated,
    });

    return updated;
  });
};

export const deleteRoomType = async (id: number, actorId: number) => {
  const existing = await prisma.roomType.findUnique({
    where: { id },
    include: {
      _count: { select: { rooms: true } },
    },
  });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy loại phòng');
  }

  if (existing._count.rooms > 0) {
    throw new AppError(400, 'Không thể xóa loại phòng đang có phòng sử dụng');
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
  const checkOutDate = new Date(data.checkOut);

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
    status: 'available',
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
  id: number,
  status: RoomStatus,
  actorId: number
) => {
  const existing = await prisma.room.findUnique({ where: { id } });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy phòng');
  }

  const blockedStatuses: RoomStatus[] = ['maintenance', 'cleaning'];

  if (blockedStatuses.includes(status)) {
    const activeBooking = await prisma.booking.findFirst({
      where: {
        roomId: id,
        status: { in: ['confirmed', 'checked_in'] as BookingStatus[] },
        checkOutDate: { gt: new Date() },
      },
    });

    if (activeBooking) {
      throw new AppError(400, 'Không thể vô hiệu hóa phòng đang có đơn đặt phòng');
    }
  }

  return prisma.$transaction(async (tx) => {
    const updated = await tx.room.update({
      where: { id },
      data: { status },
    });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Room',
      targetId: id,
      action: 'UPDATE',
      oldValue: { status: existing.status },
      newValue: { status: updated.status },
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
    // Chốt thời điểm hiện tại để lọc chính xác các booking đang diễn ra
    const now = new Date();

    const rooms = await prisma.room.findMany({
      include: {
        roomType: {
          select: {
            typeName: true,
            maxCapacity: true,
          },
        },
        bookings: {
          where: {
            status: { in: ACTIVE_BOOKING_STATUSES },
            checkInDate: { lte: now },
            checkOutDate: { gt: now },
          },
          select: {
            id: true,
            checkInDate: true,
            checkOutDate: true,
            guestCount: true,
            customer: {
              select: {
                fullName: true,
                phoneNumber: true,
              },
            },
          },
          take: 1, 
        },
      },
      orderBy: [
        { floor: 'asc' },
        { roomNumber: 'asc' },
      ],
    });

    return rooms.map((room) => {
      const activeBooking = room.bookings[0];

      return {
        roomId: room.id,
        roomNumber: room.roomNumber,
        floor: room.floor ?? 1,
        status: room.status,
        currentPrice: Number(room.currentPrice),
        typeName: room.roomType.typeName,
        maxCapacity: room.roomType.maxCapacity,

        currentGuest: activeBooking
          ? {
              bookingId: activeBooking.id,
              guestName: activeBooking.customer.fullName, 
              guestPhone: activeBooking.customer.phoneNumber, 
              checkInDate: activeBooking.checkInDate,
              checkOutDate: activeBooking.checkOutDate,
              guestCount: activeBooking.guestCount,
            }
          : null,
      };
    });
  } catch (error: any) {
    throw new AppError(500, `Lỗi khi lấy sơ đồ phòng: ${error.message}`);
  }
};