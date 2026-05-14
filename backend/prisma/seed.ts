import { PrismaClient, Prisma, UserRole, UserStatus, RoomStatus, BookingSource, BookingStatus, PaymentMethod, PaymentStatus, AuditAction } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const d = (offset: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  date.setHours(14, 0, 0, 0);
  return date;
};

const IMG = {
  standard: [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
  ],
  deluxe: [
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
  ],
  suite: [
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  ],
  family: [
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80',
  ],
};

async function main() {
  console.log('Bắt đầu seed dữ liệu...');

  // Xóa dữ liệu cũ
  await prisma.auditLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.roomTypeAmenity.deleteMany();
  await prisma.roomImage.deleteMany();
  await prisma.roomType.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.user.deleteMany();

  // 1. Khởi tạo Users
  const passwordHash = await bcrypt.hash('Admin@123', 10);
  const customerPass = await bcrypt.hash('Customer@123', 10);

  const admin = await prisma.user.create({
    data: {
      fullName: 'Nguyễn Văn Admin',
      email: 'admin@hotel.com',
      phoneNumber: '0901000001',
      passwordHash: passwordHash,
      role: UserRole.admin,
      status: UserStatus.active,
    },
  });

  const receptionist = await prisma.user.create({
    data: {
      fullName: 'Trần Thị Lễ Tân',
      email: 'receptionist@hotel.com',
      phoneNumber: '0901000002',
      passwordHash: await bcrypt.hash('Recep@123', 10),
      role: UserRole.receptionist,
      status: UserStatus.active,
    },
  });

  const customer = await prisma.user.create({
    data: {
      fullName: 'Lê Văn Khách',
      email: 'customer@hotel.com',
      phoneNumber: '0901000003',
      passwordHash: customerPass,
      role: UserRole.customer,
      status: UserStatus.active,
    },
  });

  // 2. Khởi tạo Amenities
  const amensData = [
    { amenityName: 'WiFi miễn phí', description: 'Tốc độ cao' },
    { amenityName: 'Điều hòa nhiệt độ', description: '2 chiều' },
    { amenityName: 'TV màn hình phẳng', description: 'Smart TV' },
    { amenityName: 'Minibar', description: 'Đồ uống lạnh' },
    { amenityName: 'Bồn tắm', description: 'Sang trọng' },
    { amenityName: 'Ban công', description: 'View đẹp' },
  ];
  
  const amenities = await Promise.all(
    amensData.map(a => prisma.amenity.create({ data: a }))
  );
  const [wifi, ac, tv, minibar, bathtub, balcony] = amenities;

  // 3. Khởi tạo Hạng phòng
  const standardType = await prisma.roomType.create({
    data: { typeName: 'Standard', description: 'Phòng tiêu chuẩn', maxCapacity: 2, basePrice: 800000 },
  });
  const deluxeType = await prisma.roomType.create({
    data: { typeName: 'Deluxe', description: 'Phòng cao cấp', maxCapacity: 3, basePrice: 1500000 },
  });
  const suiteType = await prisma.roomType.create({
    data: { typeName: 'Suite', description: 'Phòng tổng thống', maxCapacity: 4, basePrice: 3500000 },
  });

  // 4. Gán ảnh và tiện ích
  await prisma.roomImage.createMany({
    data: [
      { roomTypeId: standardType.id, imageUrl: IMG.standard[0], displayOrder: 1 },
      { roomTypeId: deluxeType.id, imageUrl: IMG.deluxe[0], displayOrder: 1 },
      { roomTypeId: suiteType.id, imageUrl: IMG.suite[0], displayOrder: 1 },
    ]
  });

  await prisma.roomTypeAmenity.createMany({
    data: [
      { roomTypeId: standardType.id, amenityId: wifi.id },
      { roomTypeId: deluxeType.id, amenityId: wifi.id },
      { roomTypeId: deluxeType.id, amenityId: balcony.id },
      { roomTypeId: suiteType.id, amenityId: wifi.id },
      { roomTypeId: suiteType.id, amenityId: bathtub.id },
    ]
  });

  // 5. Khởi tạo 25 phòng vật lý
  const roomData: Prisma.RoomCreateManyInput[] = [];
  // Tầng 1-2: Standard
  for (let i = 1; i <= 2; i++) {
    for (let j = 1; j <= 5; j++) {
      roomData.push({
        roomNumber: `${i}0${j}`,
        floor: i,
        roomTypeId: standardType.id,
        currentPrice: 800000,
        status: RoomStatus.available,
      });
    }
  }
  // Tầng 3-4: Deluxe
  for (let i = 3; i <= 4; i++) {
    for (let j = 1; j <= 5; j++) {
      roomData.push({
        roomNumber: `${i}0${j}`,
        floor: i,
        roomTypeId: deluxeType.id,
        currentPrice: 1500000,
        status: i === 3 && j === 1 ? RoomStatus.occupied : RoomStatus.available, // Phòng 301 occupied
      });
    }
  }
  // Tầng 5: Suite
  for (let j = 1; j <= 5; j++) {
    roomData.push({
      roomNumber: `50${j}`,
      floor: 5,
      roomTypeId: suiteType.id,
      currentPrice: 3500000,
      status: RoomStatus.available,
    });
  }
  await prisma.room.createMany({ data: roomData });

  const r101 = await prisma.room.findFirst({ where: { roomNumber: '101' } });
  const r102 = await prisma.room.findFirst({ where: { roomNumber: '102' } });
  const r201 = await prisma.room.findFirst({ where: { roomNumber: '201' } });
  const r501 = await prisma.room.findFirst({ where: { roomNumber: '501' } });

  // 6. Khởi tạo Bookings và Payments
  // Booking đã checkout để review
  const bDone = await prisma.booking.create({
    data: {
      userId: customer.id,
      roomId: r101!.id,
      checkInDate: d(-10),
      checkOutDate: d(-8),
      guestCount: 2,
      totalAmount: 1600000,
      status: BookingStatus.checked_out,
      source: BookingSource.online,
    },
  });

  // Booking tại quầy
  const bOffline = await prisma.booking.create({
    data: {
      userId: customer.id,
      roomId: r201!.id,
      createdBy: receptionist.id,
      checkInDate: d(-2),
      checkOutDate: d(1),
      guestCount: 2,
      totalAmount: 1500000,
      status: BookingStatus.checked_in,
      source: BookingSource.offline,
    },
  });

  // Booking chờ thanh toán
  const bPending = await prisma.booking.create({
    data: {
      userId: customer.id,
      roomId: r501!.id,
      checkInDate: d(2),
      checkOutDate: d(5),
      guestCount: 2,
      totalAmount: 10500000,
      status: BookingStatus.pending_payment,
      source: BookingSource.online,
    },
  });

  // Booking bị hủy hoàn tiền 50%
  const bCancel = await prisma.booking.create({
    data: {
      userId: customer.id,
      roomId: r102!.id,
      checkInDate: d(-1),
      checkOutDate: d(1),
      guestCount: 1,
      totalAmount: 800000,
      status: BookingStatus.cancelled,
      source: BookingSource.online,
    },
  });
  await prisma.payment.create({
    data: {
      bookingId: bCancel.id,
      amount: 400000,
      method: PaymentMethod.card, 
      status: PaymentStatus.refunded,
      transactionRef: 'REFUND50',
      paidAt: d(-2),
    },
  });

  // PHẦN 1 — REVIEWS
  await prisma.review.create({
    data: {
      bookingId: bDone.id,
      userId: customer.id,
      rating: 5,
      comment: 'Phòng rất sạch sẽ, nhân viên phục vụ tận tình chu đáo.',
    },
  });

  // PHẦN 2 — AUDIT LOGS
  await prisma.auditLog.createMany({
    data: [
      { actorId: admin.id, targetTable: 'ROOM_TYPE', targetId: suiteType.id, action: AuditAction.CREATE, newValue: 'Admin tạo mới hạng phòng Suite' },
      { actorId: receptionist.id, targetTable: 'BOOKING', targetId: bOffline.id, action: AuditAction.CREATE, newValue: 'Lễ tân tạo booking offline tại quầy' },
      { actorId: receptionist.id, targetTable: 'BOOKING', targetId: bOffline.id, action: AuditAction.UPDATE, newValue: 'Lễ tân thực hiện check-in' },
    ],
  });

  // PHẦN 3 — SUMMARY CONSOLE
  const summary = {
    users: await prisma.user.count(),
    amenities: await prisma.amenity.count(),
    roomTypes: await prisma.roomType.count(),
    rooms: await prisma.room.count(),
    bookings: await prisma.booking.count(),
    reviews: await prisma.review.count(),
  };

  console.log('\n--- Seed hoàn tất ---');
  console.log('Số lượng Users:', summary.users);
  console.log('Số lượng Amenities:', summary.amenities);
  console.log('Số lượng Room Types:', summary.roomTypes);
  console.log('Số lượng Rooms:', summary.rooms);
  console.log('Số lượng Bookings:', summary.bookings);
  console.log('Số lượng Reviews:', summary.reviews);

  // PHẦN 4 — TÀI KHOẢN TEST
  console.log('\n--- TÀI KHOẢN KIỂM THỬ ---');
  console.log('Admin:      admin@hotel.com / Admin@123');
  console.log('Lễ tân:     receptionist@hotel.com / Recep@123');
  console.log('Khách hàng: customer@hotel.com / Customer@123');

  // PHẦN 5 — DEMO SCENARIOS
  console.log('\n--- TÌNH HUỐNG DEMO ---');
  console.log('Phòng 301 đang có khách (Occupied)');
  console.log('Booking chờ thanh toán: Mã đơn #' + bPending.id);
  console.log('Booking offline: Mã đơn #' + bOffline.id);
  console.log('Hoàn tiền 50%: Đơn #' + bCancel.id + ' đã hoàn tiền 50%');
  console.log('Có review: Đơn #' + bDone.id + ' đã có đánh giá từ khách hàng');
  console.log('-----------------------\n');
}

// PHẦN 6 — MAIN FUNCTION
main()
  .catch((e) => {
    console.error('Lỗi khi chạy seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });