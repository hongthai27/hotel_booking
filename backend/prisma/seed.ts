import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const hash = (pw: string) => bcrypt.hash(pw, 10)

// Tạo Date offset ngày từ hôm nay
const d = (offsetDays: number, hour = 14): Date => {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)
  date.setHours(hour, 0, 0, 0)
  return date
}

// Tạo Date cách đây N tháng + offset ngày
const m = (monthsAgo: number, offsetDays = 0, hour = 14): Date => {
  const date = new Date()
  date.setMonth(date.getMonth() - monthsAgo)
  date.setDate(date.getDate() + offsetDays)
  date.setHours(hour, 0, 0, 0)
  return date
}

// ─── ẢNH ────────────────────────────────────────
const IMGS = {
  std:    ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
           'https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800&q=80',
           'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80'],
  dlx:    ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
           'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
           'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'],
  ste:    ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
           'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
           'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80'],
  fam:    ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
           'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
           'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80'],
  prm:    ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
           'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
           'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80'],
}

// ─── MAIN ────────────────────────────────────────
async function main() {
  console.log('Bat dau seed...\nXoa du lieu cu...')

  await prisma.auditLog.deleteMany()
  await prisma.review.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.room.deleteMany()
  await prisma.roomTypeAmenity.deleteMany()
  await prisma.roomImage.deleteMany()
  await prisma.roomType.deleteMany()
  await prisma.amenity.deleteMany()
  await prisma.user.deleteMany()

  // ════════════════════════════════════════════
  // 1. USERS: 1 admin · 3 lễ tân · 12 khách
  // ════════════════════════════════════════════
  console.log('Tao 16 users...')

  const admin = await prisma.user.create({ data: {
    fullName: 'Quản Trị Viên', email: 'admin@hotel.com',
    phoneNumber: '0900000001', passwordHash: await hash('Admin@123'),
    role: 'admin', status: 'active',
  }})

  const [r1, r2, r3] = await Promise.all([
    prisma.user.create({ data: { fullName: 'Nguyễn Thị Lễ Tân', email: 'receptionist@hotel.com',
      phoneNumber: '0900000002', passwordHash: await hash('Recep@123'),
      role: 'receptionist', status: 'active' }}),
    prisma.user.create({ data: { fullName: 'Trần Văn Lộc', email: 'loc.tran@hotel.com',
      phoneNumber: '0900000003', passwordHash: await hash('Recep@123'),
      role: 'receptionist', status: 'active' }}),
    prisma.user.create({ data: { fullName: 'Lê Thị Mai', email: 'mai.le@hotel.com',
      phoneNumber: '0900000004', passwordHash: await hash('Recep@123'),
      role: 'receptionist', status: 'active' }}),
  ])

  const customers = await Promise.all([
    // c[0]
    prisma.user.create({ data: { fullName: 'Trần Văn Khách', email: 'customer@hotel.com',
      phoneNumber: '0901000001', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[1]
    prisma.user.create({ data: { fullName: 'Lê Thị Hoa', email: 'hoa.le@gmail.com',
      phoneNumber: '0901000002', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[2]
    prisma.user.create({ data: { fullName: 'Phạm Minh Tuấn', email: 'tuan.pham@gmail.com',
      phoneNumber: '0901000003', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[3]
    prisma.user.create({ data: { fullName: 'Nguyễn Văn Nam', email: 'nam.nguyen@gmail.com',
      phoneNumber: '0901000004', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[4]
    prisma.user.create({ data: { fullName: 'Đỗ Thị Bình', email: 'binh.do@gmail.com',
      phoneNumber: '0901000005', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[5]
    prisma.user.create({ data: { fullName: 'Hoàng Văn Đức', email: 'duc.hoang@gmail.com',
      phoneNumber: '0901000006', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[6]
    prisma.user.create({ data: { fullName: 'Vũ Thị Lan', email: 'lan.vu@gmail.com',
      phoneNumber: '0901000007', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[7]
    prisma.user.create({ data: { fullName: 'Bùi Quốc Hùng', email: 'hung.bui@gmail.com',
      phoneNumber: '0901000008', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[8]
    prisma.user.create({ data: { fullName: 'Đinh Thị Thu', email: 'thu.dinh@gmail.com',
      phoneNumber: '0901000009', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[9]
    prisma.user.create({ data: { fullName: 'Lý Minh Khoa', email: 'khoa.ly@gmail.com',
      phoneNumber: '0901000010', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[10]
    prisma.user.create({ data: { fullName: 'Trương Thị Ngân', email: 'ngan.truong@gmail.com',
      phoneNumber: '0901000011', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[11]
    prisma.user.create({ data: { fullName: 'Mai Văn Phúc', email: 'phuc.mai@gmail.com',
      phoneNumber: '0901000012', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
  ])
  const [c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11] = customers
  console.log('Xong: 16 users (1 admin, 3 le tan, 12 khach)')

  // ════════════════════════════════════════════
  // 2. AMENITIES
  // ════════════════════════════════════════════
  console.log('Tao tien ich...')
  const [wifi, ac, tv, minibar, bathtub, balcony, safe, roomSvc, breakfast, pool] =
    await Promise.all([
      prisma.amenity.create({ data: { amenityName: 'WiFi miễn phí', description: 'Tốc độ cao 100Mbps' }}),
      prisma.amenity.create({ data: { amenityName: 'Điều hòa', description: 'Inverter Daikin 2 chiều' }}),
      prisma.amenity.create({ data: { amenityName: 'TV màn hình phẳng', description: 'Smart TV 4K 55 inch' }}),
      prisma.amenity.create({ data: { amenityName: 'Minibar', description: 'Đồ uống & snack hàng ngày' }}),
      prisma.amenity.create({ data: { amenityName: 'Bồn tắm Jacuzzi', description: 'Bồn tắm sục cao cấp' }}),
      prisma.amenity.create({ data: { amenityName: 'Ban công riêng', description: 'View thành phố / hồ bơi' }}),
      prisma.amenity.create({ data: { amenityName: 'Két an toàn', description: 'Két điện tử trong phòng' }}),
      prisma.amenity.create({ data: { amenityName: 'Dịch vụ phòng 24/7', description: 'Phục vụ tận phòng' }}),
      prisma.amenity.create({ data: { amenityName: 'Bữa sáng miễn phí', description: 'Buffet sáng tại nhà hàng' }}),
      prisma.amenity.create({ data: { amenityName: 'Hồ bơi riêng', description: 'Hồ bơi riêng trên sân thượng' }}),
    ])
  console.log('Xong: 10 tien ich')

  // ════════════════════════════════════════════
  // 3. ROOM TYPES + IMAGES + AMENITIES
  // ════════════════════════════════════════════
  console.log('Tao 5 hang phong...')

  const mkType = async (name: string, desc: string, cap: number, price: number,
    imgs: string[], ams: {id:number}[]) => {
    const rt = await prisma.roomType.create({
      data: { typeName: name, description: desc, maxCapacity: cap, basePrice: price, version: 0 },
    })
    await prisma.roomImage.createMany({ data: imgs.map((url,i) => ({ roomTypeId: rt.id, imageUrl: url, displayOrder: i })) })
    await prisma.roomTypeAmenity.createMany({ data: ams.map(a => ({ roomTypeId: rt.id, amenityId: a.id })) })
    return rt
  }

  const [rtStd, rtDlx, rtPrm, rtSte, rtFam] = await Promise.all([
    mkType('Phòng Standard',
      'Phòng tiêu chuẩn thoải mái, đầy đủ tiện nghi cơ bản. Lý tưởng cho khách công tác ngắn ngày hoặc cặp đôi.',
      2, 750000, IMGS.std, [wifi, ac, tv, safe]),

    mkType('Phòng Deluxe',
      'Phòng cao cấp rộng rãi với ban công view thành phố. Không gian sang trọng, thích hợp cho kỳ nghỉ đặc biệt.',
      3, 1400000, IMGS.dlx, [wifi, ac, tv, minibar, balcony, safe, breakfast]),

    mkType('Phòng Premium',
      'Phòng hạng sang với nội thất cao cấp, bồn tắm đứng và hồ bơi riêng trên sân thượng tầng 5.',
      3, 2500000, IMGS.prm, [wifi, ac, tv, minibar, bathtub, balcony, safe, breakfast, pool]),

    mkType('Phòng Suite',
      'Suite 5 sao với phòng khách riêng biệt, bồn tắm Jacuzzi và view panorama toàn thành phố từ tầng cao nhất.',
      4, 4500000, IMGS.ste, [wifi, ac, tv, minibar, bathtub, balcony, safe, roomSvc, breakfast, pool]),

    mkType('Phòng Family',
      'Thiết kế đặc biệt cho gia đình với 2 phòng ngủ liên thông, góc vui chơi và khu vực sinh hoạt rộng rãi.',
      5, 2800000, IMGS.fam, [wifi, ac, tv, minibar, safe, roomSvc, breakfast]),
  ])
  console.log('Xong: 5 hang phong voi 15 anh Unsplash')

  // ════════════════════════════════════════════
  // 4. ROOMS — 24 phòng, mệnh giá đa dạng
  // ════════════════════════════════════════════
  console.log('Tao 24 phong...')

  const mkRoom = (typeId: number, num: string, floor: number, price: number, status = 'available') =>
    prisma.room.create({ data: { roomTypeId: typeId, roomNumber: num, floor, currentPrice: price, status: status as any, version: 0 }})

  const [
    // Tầng 1 — Standard (giá thấp nhất)
    r101, r102, r103, r104,
    // Tầng 2 — Standard + Deluxe
    r201, r202, r203, r204,
    // Tầng 3 — Deluxe
    r301, r302, r303, r304,
    // Tầng 4 — Premium
    r401, r402, r403, r404,
    // Tầng 5 — Premium cao cấp hơn
    r501, r502,
    // Tầng 6 — Suite
    r601, r602,
    // Tầng 7 — Suite penthouse
    r701,
    // Tầng 8 — Family
    r801, r802, r803,
  ] = await Promise.all([
    // Tầng 1 — Standard (750k–850k)
    mkRoom(rtStd.id, '101', 1, 750000),
    mkRoom(rtStd.id, '102', 1, 750000),
    mkRoom(rtStd.id, '103', 1, 780000, 'cleaning'),
    mkRoom(rtStd.id, '104', 1, 800000),

    // Tầng 2 — Standard + Deluxe (850k–1.5M)
    mkRoom(rtStd.id, '201', 2, 850000),
    mkRoom(rtStd.id, '202', 2, 860000),
    mkRoom(rtDlx.id, '203', 2, 1400000, 'occupied'),
    mkRoom(rtDlx.id, '204', 2, 1450000),

    // Tầng 3 — Deluxe (1.5M–1.8M)
    mkRoom(rtDlx.id, '301', 3, 1500000),
    mkRoom(rtDlx.id, '302', 3, 1550000),
    mkRoom(rtDlx.id, '303', 3, 1600000),
    mkRoom(rtDlx.id, '304', 3, 1800000, 'maintenance'),

    // Tầng 4 — Premium (2.2M–2.8M)
    mkRoom(rtPrm.id, '401', 4, 2200000),
    mkRoom(rtPrm.id, '402', 4, 2400000),
    mkRoom(rtPrm.id, '403', 4, 2600000, 'occupied'),
    mkRoom(rtPrm.id, '404', 4, 2800000),

    // Tầng 5 — Premium view cao (3M–3.2M)
    mkRoom(rtPrm.id, '501', 5, 3000000),
    mkRoom(rtPrm.id, '502', 5, 3200000),

    // Tầng 6 — Suite (4.5M–5M)
    mkRoom(rtSte.id, '601', 6, 4500000),
    mkRoom(rtSte.id, '602', 6, 5000000),

    // Tầng 7 — Suite Penthouse (6M)
    mkRoom(rtSte.id, '701', 7, 6000000),

    // Tầng 8 — Family (2.8M–3.5M)
    mkRoom(rtFam.id, '801', 8, 2800000),
    mkRoom(rtFam.id, '802', 8, 3000000),
    mkRoom(rtFam.id, '803', 8, 3500000),
  ])
  console.log('Xong: 24 phong (750k -> 6M/dem, 4 trang thai)')

  // ════════════════════════════════════════════
  // 5. BOOKINGS + PAYMENTS — 6 tháng
  // ════════════════════════════════════════════
  console.log('Tao 28 bookings trai dai 6 thang...')

  const mkPay = (bookingId: number, amount: number, method: string,
    status: string, feeType: string, paidAt?: Date, refundedAt?: Date, ref?: string) =>
    prisma.payment.create({ data: {
      bookingId, amount, method: method as any, status: status as any,
      feeType: feeType as any,
      ...(paidAt && { paidAt }),
      ...(refundedAt && { refundedAt }),
      transactionRef: ref ?? `TXN-${bookingId}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
    }})

  // ── HIỆN TẠI (demo trực tiếp) ──
  // B01: Đang ở (checked_in) — demo Check-out. CÓ THÊM ID NUMBER & CHECKIN NOTE
  const b01 = await prisma.booking.create({ data: {
    userId: c0.id, roomId: r203.id,
    checkInDate: d(-1), checkOutDate: d(2), guestCount: 2,
    totalAmount: 4200000, source: 'online', status: 'checked_in', paidAt: d(-2),
    idNumber: '001099001234', checkinNote: 'Khách đến nhận phòng sớm 30 phút.',
  }})
  await mkPay(b01.id, 4200000, 'qr_code', 'success', 'booking', d(-2))

  // B02: Confirmed — nhận phòng ngày mai (demo Check-in). CÓ YÊU CẦU ĐẶC BIỆT
  const b02 = await prisma.booking.create({ data: {
    userId: c1.id, roomId: r301.id,
    checkInDate: d(1), checkOutDate: d(3), guestCount: 2,
    totalAmount: 3000000, source: 'online', status: 'confirmed', paidAt: d(-1),
    specialRequests: 'Tầng cao, view đẹp, Giường đôi (Double bed)',
  }})
  await mkPay(b02.id, 3000000, 'qr_code', 'success', 'booking', d(-1))

  // B03: Pending payment — demo QR thanh toán. CÓ YÊU CẦU ĐẶC BIỆT
  const b03 = await prisma.booking.create({ data: {
    userId: c2.id, roomId: r401.id,
    checkInDate: d(5), checkOutDate: d(7), guestCount: 2,
    totalAmount: 4400000, source: 'online', status: 'pending_payment',
    specialRequests: 'Đến muộn sau 22h, Gần thang máy',
  }})
  await mkPay(b03.id, 4400000, 'qr_code', 'pending', 'booking')

  // B04: Offline — lễ tân tạo, confirmed
  const b04 = await prisma.booking.create({ data: {
    userId: c3.id, roomId: r801.id,
    createdBy: r1.id, checkInDate: d(3), checkOutDate: d(7),
    guestCount: 4, totalAmount: 11200000, source: 'offline', status: 'confirmed', paidAt: new Date(),
  }})
  await mkPay(b04.id, 11200000, 'cash', 'success', 'booking', new Date())

  // B05: Cancelled + pending_refund 50%
  const b05 = await prisma.booking.create({ data: {
    userId: c4.id, roomId: r302.id,
    checkInDate: d(2), checkOutDate: d(4), guestCount: 2,
    totalAmount: 3100000, source: 'online', status: 'cancelled',
    paidAt: d(-5), cancelledAt: d(-1), cancelReason: 'Thay đổi kế hoạch',
  }})
  await mkPay(b05.id, 3100000, 'qr_code', 'refunded', 'booking', d(-5), d(-1))
  await mkPay(b05.id, 1550000, 'qr_code', 'pending_refund', 'refund', undefined, undefined, `REFUND-B05-${Date.now()}`)
  await mkPay(b05.id, 1550000, 'qr_code', 'success', 'penalty', d(-1), undefined, `PENALTY-B05-${Date.now()}`)

  // B06: Suite — confirmed xa
  const b06 = await prisma.booking.create({ data: {
    userId: c0.id, roomId: r601.id,
    checkInDate: d(14), checkOutDate: d(17), guestCount: 2,
    totalAmount: 13500000, source: 'online', status: 'confirmed', paidAt: d(-2),
  }})
  await mkPay(b06.id, 13500000, 'qr_code', 'success', 'booking', d(-2))

  // B07: Premium + offline — lễ tân r2
  const b07 = await prisma.booking.create({ data: {
    userId: c5.id, roomId: r501.id,
    createdBy: r2.id, checkInDate: d(10), checkOutDate: d(13),
    guestCount: 2, totalAmount: 9000000, source: 'offline', status: 'confirmed', paidAt: new Date(),
  }})
  await mkPay(b07.id, 9000000, 'card', 'success', 'booking', new Date())

  // B08: Cancelled + hoàn 100% đã xong
  const b08 = await prisma.booking.create({ data: {
    userId: c6.id, roomId: r201.id,
    checkInDate: d(20), checkOutDate: d(22), guestCount: 2,
    totalAmount: 1720000, source: 'online', status: 'cancelled',
    paidAt: d(-10), cancelledAt: d(-7), cancelReason: 'Đổi địa điểm đi chơi',
  }})
  await mkPay(b08.id, 1720000, 'qr_code', 'refunded', 'booking', d(-10), d(-7))
  await mkPay(b08.id, 1720000, 'qr_code', 'refunded', 'refund', undefined, d(-5), `REFUND-B08-${Date.now()}`)

  // B09: Family Penthouse — xa trong tương lai
  const b09 = await prisma.booking.create({ data: {
    userId: c7.id, roomId: r803.id,
    checkInDate: d(30), checkOutDate: d(35), guestCount: 5,
    totalAmount: 17500000, source: 'online', status: 'confirmed', paidAt: d(-1),
  }})
  await mkPay(b09.id, 17500000, 'qr_code', 'success', 'booking', d(-1))

  // ── THÁNG TRƯỚC (data báo cáo tháng 1) ──
  // B10: Checked-out CÓ EXTRA CHARGES ĐỂ TEST
  const b10 = await prisma.booking.create({ data: {
    userId: c1.id, roomId: r101.id,
    checkInDate: m(1, -5), checkOutDate: m(1, -2), guestCount: 2,
    totalAmount: 2250000, source: 'online', status: 'checked_out', paidAt: m(1, -6),
    extraTotal: 150000, 
    extraCharges: [{ label: 'Nước suối minibar', amount: 50000 }, { label: 'Phí giặt ủi', amount: 100000 }]
  }})
  await mkPay(b10.id, 2250000, 'qr_code', 'success', 'booking', m(1, -6))
  await mkPay(b10.id, 150000, 'cash', 'success', 'booking', m(1, -2), undefined, `EXTRA-B10-${Date.now()}`)

  const b11 = await prisma.booking.create({ data: {
    userId: c2.id, roomId: r303.id,
    checkInDate: m(1, -12), checkOutDate: m(1, -9), guestCount: 3,
    totalAmount: 4800000, source: 'online', status: 'checked_out', paidAt: m(1, -13),
  }})
  await mkPay(b11.id, 4800000, 'qr_code', 'success', 'booking', m(1, -13))

  const b12 = await prisma.booking.create({ data: {
    userId: c3.id, roomId: r402.id,
    createdBy: r1.id, checkInDate: m(1, -20), checkOutDate: m(1, -17),
    guestCount: 3, totalAmount: 7200000, source: 'offline', status: 'checked_out', paidAt: m(1, -20),
  }})
  await mkPay(b12.id, 7200000, 'cash', 'success', 'booking', m(1, -20))

  const b13 = await prisma.booking.create({ data: {
    userId: c8.id, roomId: r601.id,
    checkInDate: m(1, -25), checkOutDate: m(1, -22), guestCount: 2,
    totalAmount: 13500000, source: 'online', status: 'checked_out', paidAt: m(1, -26),
  }})
  await mkPay(b13.id, 13500000, 'qr_code', 'success', 'booking', m(1, -26))

  // ── 2 THÁNG TRƯỚC ──
  const b14 = await prisma.booking.create({ data: {
    userId: c4.id, roomId: r202.id,
    checkInDate: m(2, -3), checkOutDate: m(2), guestCount: 2,
    totalAmount: 1720000, source: 'online', status: 'checked_out', paidAt: m(2, -4),
  }})
  await mkPay(b14.id, 1720000, 'qr_code', 'success', 'booking', m(2, -4))

  const b15 = await prisma.booking.create({ data: {
    userId: c5.id, roomId: r501.id,
    checkInDate: m(2, -10), checkOutDate: m(2, -7), guestCount: 2,
    totalAmount: 9000000, source: 'online', status: 'checked_out', paidAt: m(2, -11),
  }})
  await mkPay(b15.id, 9000000, 'qr_code', 'success', 'booking', m(2, -11))

  const b16 = await prisma.booking.create({ data: {
    userId: c9.id, roomId: r701.id,
    checkInDate: m(2, -18), checkOutDate: m(2, -15), guestCount: 2,
    totalAmount: 18000000, source: 'online', status: 'checked_out', paidAt: m(2, -19),
  }})
  await mkPay(b16.id, 18000000, 'qr_code', 'success', 'booking', m(2, -19))

  const b17 = await prisma.booking.create({ data: {
    userId: c6.id, roomId: r802.id,
    createdBy: r3.id, checkInDate: m(2, -25), checkOutDate: m(2, -20),
    guestCount: 5, totalAmount: 15000000, source: 'offline', status: 'checked_out', paidAt: m(2, -25),
  }})
  await mkPay(b17.id, 15000000, 'card', 'success', 'booking', m(2, -25))

  // ── 3 THÁNG TRƯỚC ──
  const b18 = await prisma.booking.create({ data: {
    userId: c7.id, roomId: r104.id,
    checkInDate: m(3, -5), checkOutDate: m(3, -3), guestCount: 2,
    totalAmount: 1600000, source: 'online', status: 'checked_out', paidAt: m(3, -6),
  }})
  await mkPay(b18.id, 1600000, 'qr_code', 'success', 'booking', m(3, -6))

  const b19 = await prisma.booking.create({ data: {
    userId: c10.id, roomId: r403.id,
    checkInDate: m(3, -12), checkOutDate: m(3, -9), guestCount: 3,
    totalAmount: 7800000, source: 'online', status: 'checked_out', paidAt: m(3, -13),
  }})
  await mkPay(b19.id, 7800000, 'qr_code', 'success', 'booking', m(3, -13))

  const b20 = await prisma.booking.create({ data: {
    userId: c11.id, roomId: r602.id,
    checkInDate: m(3, -20), checkOutDate: m(3, -16), guestCount: 2,
    totalAmount: 20000000, source: 'online', status: 'checked_out', paidAt: m(3, -21),
  }})
  await mkPay(b20.id, 20000000, 'qr_code', 'success', 'booking', m(3, -21))

  // ── 4 THÁNG TRƯỚC ──
  const b21 = await prisma.booking.create({ data: {
    userId: c0.id, roomId: r201.id,
    checkInDate: m(4, -8), checkOutDate: m(4, -6), guestCount: 2,
    totalAmount: 1700000, source: 'online', status: 'checked_out', paidAt: m(4, -9),
  }})
  await mkPay(b21.id, 1700000, 'qr_code', 'success', 'booking', m(4, -9))

  const b22 = await prisma.booking.create({ data: {
    userId: c3.id, roomId: r502.id,
    checkInDate: m(4, -15), checkOutDate: m(4, -12), guestCount: 2,
    totalAmount: 9600000, source: 'online', status: 'checked_out', paidAt: m(4, -16),
  }})
  await mkPay(b22.id, 9600000, 'qr_code', 'success', 'booking', m(4, -16))

  const b23 = await prisma.booking.create({ data: {
    userId: c8.id, roomId: r801.id,
    createdBy: r2.id, checkInDate: m(4, -22), checkOutDate: m(4, -18),
    guestCount: 4, totalAmount: 11200000, source: 'offline', status: 'checked_out', paidAt: m(4, -22),
  }})
  await mkPay(b23.id, 11200000, 'cash', 'success', 'booking', m(4, -22))

  // ── 5 THÁNG TRƯỚC ──
  const b24 = await prisma.booking.create({ data: {
    userId: c1.id, roomId: r304.id,
    checkInDate: m(5, -10), checkOutDate: m(5, -7), guestCount: 2,
    totalAmount: 5400000, source: 'online', status: 'checked_out', paidAt: m(5, -11),
  }})
  await mkPay(b24.id, 5400000, 'qr_code', 'success', 'booking', m(5, -11))

  const b25 = await prisma.booking.create({ data: {
    userId: c9.id, roomId: r404.id,
    checkInDate: m(5, -20), checkOutDate: m(5, -17), guestCount: 3,
    totalAmount: 8400000, source: 'online', status: 'checked_out', paidAt: m(5, -21),
  }})
  await mkPay(b25.id, 8400000, 'qr_code', 'success', 'booking', m(5, -21))

  const b26 = await prisma.booking.create({ data: {
    userId: c11.id, roomId: r701.id,
    checkInDate: m(5, -28), checkOutDate: m(5, -25), guestCount: 2,
    totalAmount: 18000000, source: 'online', status: 'checked_out', paidAt: m(5, -29),
  }})
  await mkPay(b26.id, 18000000, 'qr_code', 'success', 'booking', m(5, -29))

  // ── 6 THÁNG TRƯỚC ──
  const b27 = await prisma.booking.create({ data: {
    userId: c5.id, roomId: r102.id,
    checkInDate: m(6, -15), checkOutDate: m(6, -13), guestCount: 2,
    totalAmount: 1500000, source: 'online', status: 'checked_out', paidAt: m(6, -16),
  }})
  await mkPay(b27.id, 1500000, 'qr_code', 'success', 'booking', m(6, -16))

  const b28 = await prisma.booking.create({ data: {
    userId: c10.id, roomId: r803.id,
    createdBy: r1.id, checkInDate: m(6, -25), checkOutDate: m(6, -20),
    guestCount: 5, totalAmount: 17500000, source: 'offline', status: 'checked_out', paidAt: m(6, -25),
  }})
  await mkPay(b28.id, 17500000, 'card', 'success', 'booking', m(6, -25))

  console.log('Xong: 28 bookings trai dai 6 thang')

  // ════════════════════════════════════════════
  // 6. REVIEWS — 10 đánh giá
  // ════════════════════════════════════════════
  console.log('Tao 10 danh gia...')
  await Promise.all([
    prisma.review.create({ data: { bookingId: b10.id, userId: c1.id, rating: 5,
      comment: 'Phòng sạch sẽ, nhân viên rất thân thiện. Sẽ quay lại lần sau!' }}),
    prisma.review.create({ data: { bookingId: b11.id, userId: c2.id, rating: 4,
      comment: 'Phòng Deluxe đẹp, view ban công tuyệt. Chỉ tiếc WiFi đôi khi hơi chậm.' }}),
    prisma.review.create({ data: { bookingId: b12.id, userId: c3.id, rating: 5,
      comment: 'Dịch vụ xuất sắc! Lễ tân nhiệt tình, phòng rộng và thoáng mát.' }}),
    prisma.review.create({ data: { bookingId: b13.id, userId: c8.id, rating: 5,
      comment: 'Suite thực sự xứng đáng với giá tiền. Bồn tắm Jacuzzi tuyệt vời!' }}),
    prisma.review.create({ data: { bookingId: b15.id, userId: c5.id, rating: 4,
      comment: 'Premium rất đáng tiền. Bữa sáng phong phú, hồ bơi sạch và đẹp.' }}),
    prisma.review.create({ data: { bookingId: b16.id, userId: c9.id, rating: 5,
      comment: 'Penthouse Suite — trải nghiệm không thể quên. View 360 độ đẹp mê hồn.' }}),
    prisma.review.create({ data: { bookingId: b18.id, userId: c7.id, rating: 3,
      comment: 'Phòng ổn, vị trí thuận tiện. Tuy nhiên cách âm chưa tốt.' }}),
    prisma.review.create({ data: { bookingId: b19.id, userId: c10.id, rating: 4,
      comment: 'Phòng Premium xứng đáng 4 sao. Giá hợp lý cho chất lượng này.' }}),
    prisma.review.create({ data: { bookingId: b24.id, userId: c1.id, rating: 5,
      comment: 'Lần thứ 3 đặt phòng tại đây rồi, không bao giờ thất vọng!' }}),
    prisma.review.create({ data: { bookingId: b27.id, userId: c5.id, rating: 4,
      comment: 'Standard nhưng rất sạch và thoải mái. Giá phải chăng.' }}),
  ])
  console.log('Xong: 10 danh gia (3-5 sao)')

  // ════════════════════════════════════════════
  // 7. AUDIT LOGS
  // ════════════════════════════════════════════
  console.log('Tao audit logs...')
  await prisma.auditLog.createMany({ data: [
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtStd.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Standard', basePrice: 750000 }) },
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtDlx.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Deluxe', basePrice: 1400000 }) },
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtPrm.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Premium', basePrice: 2500000 }) },
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtSte.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Suite', basePrice: 4500000 }) },
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtFam.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Family', basePrice: 2800000 }) },
    { actorId: admin.id, targetTable: 'Room', targetId: r304.id,
      action: 'UPDATE',
      oldValue: JSON.stringify({ status: 'available' }),
      newValue: JSON.stringify({ status: 'maintenance' }) },
    { actorId: r1.id, targetTable: 'Booking', targetId: b01.id,
      action: 'UPDATE',
      oldValue: JSON.stringify({ status: 'confirmed' }),
      newValue: JSON.stringify({ status: 'checked_in' }) },
    { actorId: r1.id, targetTable: 'Booking', targetId: b04.id,
      action: 'CREATE', newValue: JSON.stringify({ source: 'offline', totalAmount: 11200000 }) },
    { actorId: r2.id, targetTable: 'Booking', targetId: b07.id,
      action: 'CREATE', newValue: JSON.stringify({ source: 'offline', totalAmount: 9000000 }) },
    { actorId: r3.id, targetTable: 'Booking', targetId: b17.id,
      action: 'CREATE', newValue: JSON.stringify({ source: 'offline', totalAmount: 15000000 }) },
    { actorId: admin.id, targetTable: 'User', targetId: c7.id,
      action: 'UPDATE',
      oldValue: JSON.stringify({ status: 'active' }),
      newValue: JSON.stringify({ status: 'active', note: 'Verified VIP customer' }) },
  ]})
  console.log('Xong: 11 audit log entries')

  // ════════════════════════════════════════════
  // TỔNG KẾT
  // ════════════════════════════════════════════
  const totalRevenue = [2250000,4800000,7200000,13500000,1720000,9000000,18000000,15000000,
    1600000,7800000,20000000,1700000,9600000,11200000,5400000,8400000,18000000,1500000,17500000]
    .reduce((a,b)=>a+b,0)

  console.log('\nSEED HOAN TAT!\n' + '━'.repeat(58))
  console.log('TONG KET:')
  console.log(`   Users:      16 (1 admin, 3 le tan, 12 khach hang)`)
  console.log(`   Amenities:  10 tien ich`)
  console.log(`   RoomTypes:  5 hang phong (15 anh Unsplash)`)
  console.log(`   Rooms:      24 phong (750k -> 6M/dem)`)
  console.log(`   Bookings:   28 (trai dai 6 thang)`)
  console.log(`   Payments:   ~33 (booking/penalty/refund/pending_refund/extra)`)
  console.log(`   Reviews:    10 danh gia (3-5 sao)`)
  console.log(`   AuditLogs:  11 entries`)
  console.log(`   Tong DT:    ${(totalRevenue/1000000).toFixed(1)}M VND (6 thang)`)
  console.log('━'.repeat(58))

  console.log('\nTAI KHOAN:')
  console.log('   Admin:   admin@hotel.com        / Admin@123')
  console.log('   Le tan:  receptionist@hotel.com / Recep@123 (+ 2 le tan khac)')
  console.log('   Khach:   customer@hotel.com     / Customer@123 (+ 11 khach khac)')

  console.log('\nDEMO NGAY SAU SEED:')
  console.log('   B01 -- Phong 203 DANG CO KHACH     -> Check-out')
  console.log('   B02 -- Phong 301 NHAN PHONG NGAY MAI -> Check-in')
  console.log('   B03 -- Phong 401 CHO THANH TOAN    -> QR + Simulate')
  console.log('   B04 -- Don quay phong 801          -> Huy offline')
  console.log('   B05 -- Huy 50% + PENDING REFUND    -> Xac nhan hoan tien')
  console.log('   B06 -- Suite 601 14 ngay nua       -> Huy truoc 3 ngay (hoan 100%)')
  console.log('   B13 -- Suite review 5 sao          -> Xem RoomDetail')
  console.log('   Dashboard: 203=occupied 301=available 304=maintenance 103=cleaning')
  console.log('   Bao cao:   6 thang du lieu san sang')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())