import { PrismaClient, Room } from '@prisma/client'
import bcrypt from 'bcrypt'
import { createBooking, checkIn, checkOut } from '../src/services/booking.service'

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
  std: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941749/hotel-booking/ig6tytjn2kzhefp7egju.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941746/hotel-booking/csrfrarfwosrumfgjnm8.jpg',
  ],
  dlx: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941384/hotel-booking/txpbg5oznpcqjx4cn66n.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941383/hotel-booking/xuwf8vcbtxcc1plfd9cv.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941390/hotel-booking/zvd2mughq1t6zrctsxki.jpg',
  ] ,
  prm: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779942028/hotel-booking/x7rkjmoxu9sfdyuitt8w.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779942007/hotel-booking/d471zjmwrvc3iqwsgffs.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779942046/hotel-booking/irjmftdvkggfdugm7ojg.png',
  ] ,
  ste: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941266/hotel-booking/oagkvrcbocgk4joymwjp.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941264/hotel-booking/b25an2xiz5mutwmvsi87.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941264/hotel-booking/abi6agcrhhyglllnwoid.jpg',
  ] ,
  fam: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941539/hotel-booking/a5d5ftln2g0bdltjegk0.png',
'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941521/hotel-booking/sedi48yxqmvx3xiftjps.png',
  ] ,
  sgl: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941307/hotel-booking/ua0tvxvjdyzjrjr3vubf.png',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941428/hotel-booking/mn2j0xefxjeh2m19hzaf.jpg',
  ] ,
  twn: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941574/hotel-booking/jp2ghcskvalitkh045h4.png',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941596/hotel-booking/bbdp11zqlz4e0rucwlb4.jpg',
  ] ,
  stu: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941341/hotel-booking/jfq0smcvsyz56vb0tdgo.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941342/hotel-booking/cdtjw4c4f35yxhwubfyh.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941460/hotel-booking/r7kktchnu9jgiympjoof.jpg',
  ] ,
  exe: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941794/hotel-booking/lweehyoiqs3vzlpgjsr9.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941794/hotel-booking/g0qra01j1wodiuvacvle.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941794/hotel-booking/bf1e5mz8osd1c0n5cjyo.jpg',
  ] ,
  prs: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779942175/hotel-booking/snkoaxyuaoske3sdqrnf.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779942177/hotel-booking/apkcqk1smfzuy06rj1q1.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779942173/hotel-booking/c2l0vzw5hlk7gysgloro.jpg',
  ] 
}

// ─── MAIN ────────────────────────────────────────
async function main() {
  console.log(`Bat dau seed...\nXoa du lieu cu...`)

  await prisma.auditLog.deleteMany()
  await prisma.review.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.bookingRoom.deleteMany()
  await prisma.bookingRoomType.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.room.deleteMany()
  await prisma.roomTypeAmenity.deleteMany()
  await prisma.roomImage.deleteMany()
  await prisma.roomType.deleteMany()
  await prisma.promotion.deleteMany()
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
  console.log('Tao 10 hang phong...')

  const mkType = async (name: string, desc: string, cap: number, price: number,
    imgs: string[], ams: {id:number}[]) => {
    const rt = await prisma.roomType.create({
      data: { typeName: name, description: desc, maxCapacity: cap, basePrice: price, version: 0 },
    })
    const validImgs = imgs.filter(Boolean)
    if (validImgs.length > 0) {
      await prisma.roomImage.createMany({ data: validImgs.map((url,i) => ({ roomTypeId: rt.id, imageUrl: url, displayOrder: i })) })
    }
    await prisma.roomTypeAmenity.createMany({ data: ams.map(a => ({ roomTypeId: rt.id, amenityId: a.id })) })
    return rt
  }

  const [rtStd, rtDlx, rtPrm, rtSte, rtFam, rtSgl, rtTwn, rtStu, rtExe, rtPrs] = await Promise.all([
    mkType('Phòng Standard',
      'Phòng tiêu chuẩn thoải mái, đầy đủ tiện nghi cơ bản. Lý tưởng cho khách công tác ngắn ngày hoặc cặp đôi.',
      2, 899000, IMGS.std, [wifi, ac, tv, safe]),

    mkType('Phòng Deluxe',
      'Phòng cao cấp rộng rãi với ban công view thành phố. Không gian sang trọng, thích hợp cho kỳ nghỉ đặc biệt.',
      3, 1599000, IMGS.dlx, [wifi, ac, tv, minibar, balcony, safe, breakfast]),

    mkType('Phòng Premium',
      'Phòng hạng sang với nội thất cao cấp, bồn tắm đứng và hồ bơi riêng trên sân thượng tầng 5.',
      3, 5899000, IMGS.prm, [wifi, ac, tv, minibar, bathtub, balcony, safe, breakfast, pool]),

    mkType('Phòng Suite',
      'Suite 5 sao với phòng khách riêng biệt, bồn tắm Jacuzzi và view panorama toàn thành phố từ tầng cao nhất.',
      4, 4999000, IMGS.ste, [wifi, ac, tv, minibar, bathtub, balcony, safe, roomSvc, breakfast, pool]),

    mkType('Phòng Family',
      'Thiết kế đặc biệt cho gia đình với 2 phòng ngủ liên thông, góc vui chơi và khu vực sinh hoạt rộng rãi.',
      5, 3299000, IMGS.fam, [wifi, ac, tv, minibar, safe, roomSvc, breakfast]),
      
    mkType('Phòng Single',
      'Phòng nhỏ gọn tiện lợi dành cho 1 người, phù hợp khách đi công tác tiết kiệm.',
      1, 599000, IMGS.sgl, [wifi, ac, tv]),
      
    mkType('Phòng Twin',
      'Phòng 2 giường đơn rộng rãi, thích hợp cho bạn bè hoặc đồng nghiệp đi chung.',
      2, 999000, IMGS.twn, [wifi, ac, tv, safe]),
      
    mkType('Phòng Studio',
      'Phòng Studio có bếp nhỏ và khu vực ăn uống, thích hợp lưu trú dài ngày.',
      2, 1399000, IMGS.stu, [wifi, ac, tv, minibar]),
      
    mkType('Phòng Executive',
      'Phòng làm việc cao cấp, được trang bị bàn làm việc lớn, máy pha cafe, view trung tâm.',
      2, 3499000, IMGS.exe, [wifi, ac, tv, minibar, balcony, roomSvc]),
      
    mkType('Phòng President',
      'Phòng Tổng thống siêu sang, bao trọn 1 tầng, dịch vụ quản gia 24/7 và hồ bơi vô cực riêng.',
      6, 12000000, IMGS.prs, [wifi, ac, tv, minibar, bathtub, balcony, safe, roomSvc, breakfast, pool]),
  ])
  console.log('Xong: 10 hang phong voi nhieu anh Unsplash')

  // ════════════════════════════════════════════
  // 4. ROOMS — 29 phòng, mệnh giá đa dạng
  // ════════════════════════════════════════════
  console.log('Tao 29 phong...')

  const mkRoom = (typeId: number, num: string, floor: number, status = 'available') =>
    prisma.room.create({ data: { roomTypeId: typeId, roomNumber: num, floor, status: status as any, version: 0 }})

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
    // Tầng 9 — Mới
    r901, r902, r903, r904, r905,
  ] = await Promise.all([
    // Tầng 1 — Standard
    mkRoom(rtStd.id, '101', 1),
    mkRoom(rtStd.id, '102', 1),
    mkRoom(rtStd.id, '103', 1, 'cleaning'),
    mkRoom(rtStd.id, '104', 1),

    // Tầng 2 — Standard + Deluxe
    mkRoom(rtStd.id, '201', 2),
    mkRoom(rtStd.id, '202', 2),
    mkRoom(rtDlx.id, '203', 2, 'occupied'),
    mkRoom(rtDlx.id, '204', 2),

    // Tầng 3 — Deluxe
    mkRoom(rtDlx.id, '301', 3),
    mkRoom(rtDlx.id, '302', 3),
    mkRoom(rtDlx.id, '303', 3),
    mkRoom(rtDlx.id, '304', 3, 'maintenance'),

    // Tầng 4 — Premium
    mkRoom(rtPrm.id, '401', 4),
    mkRoom(rtPrm.id, '402', 4),
    mkRoom(rtPrm.id, '403', 4, 'occupied'),
    mkRoom(rtPrm.id, '404', 4),

    // Tầng 5 — Premium view cao
    mkRoom(rtPrm.id, '501', 5),
    mkRoom(rtPrm.id, '502', 5),

    // Tầng 6 — Suite
    mkRoom(rtSte.id, '601', 6),
    mkRoom(rtSte.id, '602', 6),

    // Tầng 7 — Suite Penthouse
    mkRoom(rtSte.id, '701', 7),

    // Tầng 8 — Family
    mkRoom(rtFam.id, '801', 8),
    mkRoom(rtFam.id, '802', 8),
    mkRoom(rtFam.id, '803', 8),
    
    mkRoom(rtSgl.id, '901', 9),
    mkRoom(rtTwn.id, '902', 9),
    mkRoom(rtStu.id, '903', 9),
    mkRoom(rtExe.id, '904', 9),
    mkRoom(rtPrs.id, '905', 9),
  ])
  console.log('Xong: 29 phong')

  // ════════════════════════════════════════════
  // 5. PROMOTIONS
  // ════════════════════════════════════════════
  console.log('Tao 10 ma khuyen mai...')
  const [promo1, promo2, promo3, promo4, promo5, promo6, promo7, promo8, promo9, promo10] = await Promise.all([
    prisma.promotion.create({ data: { code: 'SUMMER2026', type: 'percentage', value: 10, startDate: m(1), endDate: d(30), usageLimit: 100 }}),
    prisma.promotion.create({ data: { code: 'WELCOME', type: 'fixed', value: 200000, startDate: m(6), endDate: d(365), usageLimit: 500 }}),
    prisma.promotion.create({ data: { code: 'STAY3', type: 'free_night', value: 1, minNights: 3, startDate: m(2), endDate: d(60) }}),
    prisma.promotion.create({ data: { code: 'VIP15', type: 'percentage', value: 15, startDate: m(3), endDate: d(90) }}),
    prisma.promotion.create({ data: { code: 'FLASH500K', type: 'fixed', value: 500000, minNights: 2, startDate: m(1), endDate: d(10), usageLimit: 50 }}),
    prisma.promotion.create({ data: { code: 'TET2026', type: 'percentage', value: 20, startDate: m(5), endDate: m(4), isActive: false }}),
    prisma.promotion.create({ data: { code: 'WEEKEND', type: 'percentage', value: 5, startDate: m(6), endDate: d(180) }}),
    prisma.promotion.create({ data: { code: 'FAMILY', type: 'fixed', value: 300000, minNights: 2, startDate: m(4), endDate: d(120) }}),
    prisma.promotion.create({ data: { code: 'LUCKY', type: 'percentage', value: 50, usageLimit: 10, usedCount: 10, startDate: m(1), endDate: d(30) }}),
    prisma.promotion.create({ data: { code: 'EARLYBIRD', type: 'percentage', value: 10, startDate: m(6), endDate: d(300) }}),
  ])

  // ════════════════════════════════════════════
  // 6. BOOKINGS — qua đúng luồng thật (createBooking/checkIn/checkOut/cancelBooking)
  // ════════════════════════════════════════════
  console.log('Tao bookings qua luong that...')

  const mkPay = (bookingId: number, amount: number, method: string,
    status: string, feeType: string, paidAt?: Date, refundedAt?: Date, ref?: string) =>
    prisma.payment.create({ data: {
      bookingId, amount, method: method as any, status: status as any,
      feeType: feeType as any,
      ...(paidAt && { paidAt }),
      ...(refundedAt && { refundedAt }),
      transactionRef: ref ?? `TXN-${bookingId}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
    }})

  type SeedTarget = 'pending_payment' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'

  const seedBooking = async (opts: {
    userId: number
    items: { roomTypeId: number; quantity: number }[]
    checkIn: Date
    checkOut: Date
    guestCount: number
    target: SeedTarget
    createdBy?: number
    specialRequests?: string
    promoCode?: string
    method?: 'cash' | 'card' | 'qr_code'
    cancelReason?: string
    idNumber?: string
    checkinNote?: string
    extra?: { label: string; amount: number }[]
  }) => {
    const booking = await createBooking(
      {
        items: opts.items,
        checkInDate: opts.checkIn.toISOString(),
        checkOutDate: opts.checkOut.toISOString(),
        guestCount: opts.guestCount,
        specialRequests: opts.specialRequests,
        promoCode: opts.promoCode,
      } as any,
      opts.userId
    )

    if (opts.createdBy) {
      await prisma.booking.update({ where: { id: booking.id }, data: { createdBy: opts.createdBy, source: 'offline' } })
    }

    if (opts.target === 'pending_payment') return booking

    await mkPay(booking.id, Number(booking.totalAmount), opts.method ?? 'qr_code', 'success', 'booking', opts.checkIn)
    await prisma.booking.update({ where: { id: booking.id }, data: { status: 'confirmed', paidAt: opts.checkIn } })

    if (opts.target === 'confirmed') return booking

    if (opts.target === 'cancelled') {
      const daysUntil = Math.ceil((opts.checkIn.getTime() - Date.now()) / 86400000)
      const refundAmount = daysUntil >= 3 ? Number(booking.totalAmount) : Number(booking.totalAmount) * 0.5
      const penalty = Number(booking.totalAmount) - refundAmount
      await prisma.booking.update({
        where: { id: booking.id },
        data: { status: 'cancelled', cancelledAt: new Date(), cancelReason: opts.cancelReason ?? 'Khách hàng hủy' },
      })
      const successPay = await prisma.payment.findFirst({ where: { bookingId: booking.id, status: 'success', feeType: 'booking' } })
      if (successPay) {
        await prisma.payment.update({ where: { id: successPay.id }, data: { status: 'pending_refund' } })
        if (refundAmount > 0) await mkPay(booking.id, refundAmount, 'qr_code', 'pending_refund', 'refund')
        if (penalty > 0) await mkPay(booking.id, penalty, 'qr_code', 'success', 'penalty', new Date())
      }
      return booking
    }

    const lines = await prisma.bookingRoomType.findMany({ where: { bookingId: booking.id } })
    const bookingRoomIds: number[] = []
    for (const line of lines) {
      for (let n = 0; n < line.quantity; n++) {
        const br = await checkIn(booking.id, opts.createdBy ?? 1, {
          bookingRoomTypeId: line.id,
          idNumber: opts.idNumber,
          checkinNote: opts.checkinNote,
        })
        bookingRoomIds.push(br.id)
      }
    }

    if (opts.target === 'checked_in') return booking

    for (const brId of bookingRoomIds) {
      await checkOut(booking.id, opts.createdBy ?? 1, brId, opts.extra ?? [], opts.method ?? 'cash')
      const br = await prisma.bookingRoom.findUnique({ where: { id: brId } })
      if (br) await prisma.room.update({ where: { id: br.roomId }, data: { status: 'available' } }) // seed: mô phỏng "đã dọn xong"
    }

    return booking
  }

  // ── HIỆN TẠI (demo trực tiếp) ──
  console.log('Tao 10 bookings demo hien tai...')

  const b01 = await seedBooking({
    userId: c0.id, items: [{ roomTypeId: rtDlx.id, quantity: 1 }],
    checkIn: d(-1), checkOut: d(2), guestCount: 2, target: 'checked_in',
    idNumber: '001099001234', checkinNote: 'Khách đến nhận phòng sớm 30 phút.',
  })

  const b02 = await seedBooking({
    userId: c1.id, items: [{ roomTypeId: rtDlx.id, quantity: 1 }],
    checkIn: d(1), checkOut: d(3), guestCount: 2, target: 'confirmed',
    specialRequests: 'Tầng cao, view đẹp, Giường đôi (Double bed)',
  })

  const b03 = await seedBooking({
    userId: c2.id, items: [{ roomTypeId: rtPrm.id, quantity: 1 }],
    checkIn: d(5), checkOut: d(7), guestCount: 2, target: 'pending_payment',
    specialRequests: 'Đến muộn sau 22h, Gần thang máy',
  })

  const b04 = await seedBooking({
    userId: c3.id, items: [{ roomTypeId: rtFam.id, quantity: 1 }],
    checkIn: d(3), checkOut: d(7), guestCount: 4, target: 'confirmed',
    createdBy: r1.id, method: 'cash',
  })

  const b05 = await seedBooking({
    userId: c4.id, items: [{ roomTypeId: rtDlx.id, quantity: 1 }],
    checkIn: d(2), checkOut: d(4), guestCount: 2, target: 'cancelled',
    cancelReason: 'Thay đổi kế hoạch',
  })

  const b06 = await seedBooking({
    userId: c0.id, items: [{ roomTypeId: rtSte.id, quantity: 1 }],
    checkIn: d(14), checkOut: d(17), guestCount: 2, target: 'confirmed',
  })

  const b07 = await seedBooking({
    userId: c5.id, items: [{ roomTypeId: rtPrm.id, quantity: 1 }],
    checkIn: d(10), checkOut: d(13), guestCount: 2, target: 'confirmed',
    createdBy: r2.id, method: 'card',
  })

  const b08 = await seedBooking({
    userId: c6.id, items: [{ roomTypeId: rtStd.id, quantity: 1 }],
    checkIn: d(20), checkOut: d(22), guestCount: 2, target: 'cancelled',
    cancelReason: 'Đổi địa điểm đi chơi',
  })

  const b09 = await seedBooking({
    userId: c7.id, items: [{ roomTypeId: rtFam.id, quantity: 1 }],
    checkIn: d(30), checkOut: d(35), guestCount: 5, target: 'confirmed',
  })

  // B10: MỚI — demo đúng tính năng giỏ hàng nhiều phòng
  const b10 = await seedBooking({
    userId: c8.id,
    items: [{ roomTypeId: rtDlx.id, quantity: 2 }, { roomTypeId: rtStd.id, quantity: 1 }],
    checkIn: d(8), checkOut: d(10), guestCount: 6, target: 'confirmed',
    specialRequests: 'Đặt cho nhóm bạn 6 người, muốn phòng gần nhau',
  })

  console.log('Xong: 10 bookings demo hien tai (B01-B10)')

  // ── QUÁ KHỨ (6 tháng, đơn giản hoá so với bản cũ để chạy qua service thật) ──
  console.log('Tao du lieu qua khu (6 thang)...')

  const roomTypeIds = [rtStd.id, rtDlx.id, rtPrm.id, rtSte.id, rtFam.id, rtSgl.id, rtTwn.id, rtStu.id, rtExe.id, rtPrs.id]

  let pastBookingCount = 0
  let pastReviewCount = 0

  const comments = [
    'Kỳ nghỉ tuyệt vời. Rất hài lòng!',
    'Phòng sạch sẽ, nhân viên nhiệt tình. Sẽ quay lại.',
    'Không gian sang trọng, đáng đồng tiền bát gạo.',
    'View đẹp, bữa sáng ngon. Trải nghiệm rất tốt.',
    'Tiện nghi đầy đủ, giường ngủ rất thoải mái.',
    'Dịch vụ xuất sắc, quá trình check-in/out nhanh chóng.',
  ]

  for (let monthAgo = 6; monthAgo >= 1; monthAgo--) {
    for (let i = 0; i < 18; i++) {
      const customer = customers[(monthAgo * 18 + i) % customers.length]
      const roomTypeId = roomTypeIds[i % roomTypeIds.length]
      const offsetStart = -28 + i
      const nights = (i % 3) + 1

      const b = await seedBooking({
        userId: customer.id,
        items: [{ roomTypeId, quantity: 1 }],
        checkIn: m(monthAgo, offsetStart),
        checkOut: m(monthAgo, offsetStart + nights),
        guestCount: 2,
        target: 'checked_out',
        createdBy: i % 4 === 0 ? r1.id : undefined,
        method: i % 3 === 0 ? 'cash' : 'qr_code',
        promoCode: i % 4 === 0 && nights >= 2 ? 'WELCOME' : undefined,
        extra: i % 5 === 0 ? [{ label: 'Nước suối minibar', amount: 50000 }, { label: 'Phí giặt ủi', amount: 100000 }] : undefined,
      })

      await prisma.review.create({
        data: {
          bookingId: b.id, userId: customer.id,
          rating: 4 + Math.floor(Math.random() * 2),
          comment: comments[Math.floor(Math.random() * comments.length)],
        },
      })
      pastBookingCount++
      pastReviewCount++
    }

    for (let i = 0; i < 3; i++) {
      const customer = customers[(monthAgo * 3 + i) % customers.length]
      const roomTypeId = roomTypeIds[(i + monthAgo) % roomTypeIds.length]
      const offsetStart = -20 + i * 5

      await seedBooking({
        userId: customer.id,
        items: [{ roomTypeId, quantity: 1 }],
        checkIn: m(monthAgo, offsetStart),
        checkOut: m(monthAgo, offsetStart + 2),
        guestCount: 2,
        target: 'cancelled',
        cancelReason: 'Thay đổi lịch trình',
      })
      pastBookingCount++
    }

    console.log(`   Thang -${monthAgo}: xong`)
  }

  console.log(`Xong: ${pastBookingCount} bookings qua khu + ${pastReviewCount} danh gia`)

  // ════════════════════════════════════════════
  // 7. AUDIT LOGS
  // ════════════════════════════════════════════
  console.log('Tao audit logs...')
  await prisma.auditLog.createMany({ data: [
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtStd.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Standard', basePrice: 899000 }) },
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtDlx.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Deluxe', basePrice: 1599000 }) },
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtPrm.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Premium', basePrice: 5899000 }) },
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtSte.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Suite', basePrice: 4999000 }) },
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtFam.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Family', basePrice: 3299000 }) },
    { actorId: admin.id, targetTable: 'Room', targetId: r304.id,
      action: 'UPDATE',
      oldValue: JSON.stringify({ status: 'available' }),
      newValue: JSON.stringify({ status: 'maintenance' }) },
    { actorId: r1.id, targetTable: 'Booking', targetId: b01.id,
      action: 'UPDATE',
      oldValue: JSON.stringify({ status: 'confirmed' }),
      newValue: JSON.stringify({ status: 'checked_in' }) },
    { actorId: r1.id, targetTable: 'Booking', targetId: b04.id,
      action: 'CREATE', newValue: JSON.stringify({ source: 'offline', totalAmount: 13196000 }) },
    { actorId: r2.id, targetTable: 'Booking', targetId: b07.id,
      action: 'CREATE', newValue: JSON.stringify({ source: 'offline', totalAmount: 19497000 }) },
    { actorId: admin.id, targetTable: 'User', targetId: c7.id,
      action: 'UPDATE',
      oldValue: JSON.stringify({ status: 'active' }),
      newValue: JSON.stringify({ status: 'active', note: 'Verified VIP customer' }) },
    { actorId: admin.id, targetTable: 'Promotion', targetId: promo1.id, action: 'CREATE', newValue: JSON.stringify({ code: 'SUMMER2026' }) },
    { actorId: admin.id, targetTable: 'Promotion', targetId: promo2.id, action: 'CREATE', newValue: JSON.stringify({ code: 'WELCOME' }) },
    { actorId: admin.id, targetTable: 'Promotion', targetId: promo3.id, action: 'CREATE', newValue: JSON.stringify({ code: 'STAY3' }) },
    { actorId: admin.id, targetTable: 'Promotion', targetId: promo4.id, action: 'CREATE', newValue: JSON.stringify({ code: 'VIP15' }) },
  ]})
  console.log('Xong: > 15 audit log entries')

  // ════════════════════════════════════════════
  // TỔNG KẾT
  // ════════════════════════════════════════════
  const revenueAgg = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: 'success', feeType: { in: ['booking', 'penalty'] } },
  })
  const totalRevenue = Number(revenueAgg._sum.amount ?? 0)

  console.log(`\nSEED HOAN TAT!\n` + '━'.repeat(58))
  console.log('TONG KET:')
  console.log(`   Users:      16 (1 admin, 3 le tan, 12 khach hang)`)
  console.log(`   Amenities:  10 tien ich`)
  console.log(`   RoomTypes:  10 hang phong (da dang gia tien)`)
  console.log(`   Rooms:      29 phong`)
  console.log(`   Promotions: 10 ma khuyen mai`)
  console.log(`   Bookings:   ~${pastBookingCount + 10} (trai dai 6 thang)`)
  console.log(`   Reviews:    ~${pastReviewCount} danh gia (4-5 sao)`)
  console.log(`   AuditLogs:  ~15 entries`)
  console.log(`   Tong DT:    ${(totalRevenue / 1000000).toFixed(1)}M VND (6 thang)`)
  console.log('━'.repeat(58))

  console.log(`\nTAI KHOAN:`)
  console.log('   Admin:   admin@hotel.com        / Admin@123')
  console.log('   Le tan:  receptionist@hotel.com / Recep@123 (+ 2 le tan khac)')
  console.log('   Khach:   customer@hotel.com     / Customer@123 (+ 11 khach khac)')

  console.log(`\nDEMO NGAY SAU SEED:`)
  console.log('   B01 -- Da check-in                -&gt; demo Check-out')
  console.log('   B02 -- Confirmed, chua gan phong cu the (gan luc check-in) -&gt; demo Check-in')
  console.log('   B03 -- Cho thanh toan             -&gt; demo QR + Simulate')
  console.log('   B04 -- Don quay, confirmed         -&gt; demo Huy offline')
  console.log('   B05 -- Huy 50% + PENDING REFUND    -&gt; demo Xac nhan hoan tien')
  console.log('   B06 -- Suite, xa ngay              -&gt; demo Huy truoc 3 ngay (hoan 100%)')
  console.log('   B10 -- Nhieu phong (2 Deluxe + 1 Standard) -&gt; demo tinh nang gio hang')
  console.log(`   Reviews -- Da tu dong tao ~${pastReviewCount} danh gia tu cac khach hang cu`)
  console.log('   Bao cao:   6 thang du lieu san sang')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())