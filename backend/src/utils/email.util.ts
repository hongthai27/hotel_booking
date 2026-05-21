import nodemailer from 'nodemailer';
import { env } from '../config/env.config';
import { logger } from './logger.util';

export interface BookingEmailData {
  id: number;
  checkInDate: Date;
  checkOutDate: Date;
  totalAmount: number;
  roomId: number;
}

export interface UserEmailData {
  fullName: string;
  email: string;
}

// Khởi tạo transporter một lần, tái sử dụng cho mỗi lần gửi
const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    logger.error('[Email] Kết nối thất bại:', err);
  } else {
    logger.info('[Email] Email server sẵn sàng');
  }
});

export const sendBookingConfirmationEmail = async (
  booking: any,
  user: any
): Promise<void> => {
  try {
    console.log(`[Email] Gửi xác nhận đặt phòng #${booking.id} → ${user.email}`);

    const roomName = booking.room?.roomType?.typeName ?? 'Phòng đã đặt';
    const roomNumber = booking.room?.roomNumber ?? '—';
    const checkIn = booking.checkInDate
      ? new Date(booking.checkInDate).toLocaleDateString('vi-VN')
      : '—';
    const checkOut = booking.checkOutDate
      ? new Date(booking.checkOutDate).toLocaleDateString('vi-VN')
      : '—';
    const totalAmount = booking.totalAmount
      ? Number(booking.totalAmount).toLocaleString('vi-VN') + ' ₫'
      : '—';

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: user.email,
      subject: `[Hotel Booking] Xác nhận đặt phòng #${booking.id}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#1a1a1a">

          <div style="background:#0f4c81;padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;font-size:18px;margin:0;font-weight:500">
              Xác nhận đặt phòng thành công
            </h1>
          </div>

          <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none">
            <p style="margin:0 0 16px">Xin chào <strong>${user.fullName}</strong>,</p>
            <p style="margin:0 0 20px;color:#6b7280;font-size:14px">
              Đơn đặt phòng của bạn đã được xác nhận thành công. Dưới đây là thông tin chi tiết:
            </p>

            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Mã đơn</td>
                <td style="padding:10px 14px;font-weight:500;border-bottom:1px solid #f3f4f6">#${booking.id}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Hạng phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${roomName}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Số phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${roomNumber}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Ngày nhận phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${checkIn}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Ngày trả phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${checkOut}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Số khách</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${booking.guestCount} khách</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;font-weight:500">Tổng tiền</td>
                <td style="padding:10px 14px;color:#0f4c81;font-weight:600;font-size:16px">${totalAmount}</td>
              </tr>
            </table>

            <div style="background:#f0f7ff;border-radius:8px;padding:14px;margin-top:20px;font-size:13px;color:#1a56db">
              Vui lòng mang theo CCCD/Hộ chiếu khi nhận phòng.
            </div>
          </div>

          <div style="background:#f9fafb;padding:16px 24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center">
              Hotel Booking System · Mọi thắc mắc liên hệ qua email này
            </p>
          </div>

        </div>
      `,
    });

    console.log(`[Email] Gửi xác nhận thành công → ${user.email}`);
  } catch (err: any) {
    console.error(`[Email] Gửi xác nhận thất bại:`, err.message);
  }
};

export const sendCancellationEmail = async (
  booking: any,
  user: any,
  refundAmount: number = 0
): Promise<void> => {
  try {
    console.log(`[Email] Gửi thông báo hủy đơn #${booking.id} → ${user.email}`);

    const roomName = booking.room?.roomType?.typeName ?? 'Phòng đã đặt';
    const checkIn = booking.checkInDate
      ? new Date(booking.checkInDate).toLocaleDateString('vi-VN')
      : '—';
    const checkOut = booking.checkOutDate
      ? new Date(booking.checkOutDate).toLocaleDateString('vi-VN')
      : '—';
    const cancelledAt = booking.cancelledAt
      ? new Date(booking.cancelledAt).toLocaleDateString('vi-VN')
      : new Date().toLocaleDateString('vi-VN');

    const refundText =
      refundAmount > 0
        ? `<div style="background:#f0fdf4;border-radius:8px;padding:14px;margin-top:20px;font-size:13px;color:#16a34a">
             Số tiền hoàn lại: <strong>${Number(refundAmount).toLocaleString('vi-VN')} ₫</strong><br>
             <span style="color:#6b7280">Dự kiến xử lý trong 3-5 ngày làm việc</span>
           </div>`
        : `<div style="background:#fef9c3;border-radius:8px;padding:14px;margin-top:20px;font-size:13px;color:#854d0e">
             Không hoàn tiền theo chính sách hủy phòng.
           </div>`;

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: user.email,
      subject: `[Hotel Booking] Xác nhận hủy đặt phòng #${booking.id}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#1a1a1a">

          <div style="background:#dc2626;padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;font-size:18px;margin:0;font-weight:500">
              Xác nhận hủy đặt phòng
            </h1>
          </div>

          <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none">
            <p style="margin:0 0 16px">Xin chào <strong>${user.fullName}</strong>,</p>
            <p style="margin:0 0 20px;color:#6b7280;font-size:14px">
              Đơn đặt phòng của bạn đã được hủy. Dưới đây là thông tin chi tiết:
            </p>

            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Mã đơn đã hủy</td>
                <td style="padding:10px 14px;font-weight:500;border-bottom:1px solid #f3f4f6">#${booking.id}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Hạng phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${roomName}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Ngày nhận phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${checkIn}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Ngày trả phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${checkOut}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280">Thời điểm hủy</td>
                <td style="padding:10px 14px">${cancelledAt}</td>
              </tr>
            </table>

            ${refundText}
          </div>

          <div style="background:#f9fafb;padding:16px 24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center">
              Hotel Booking System · Mọi thắc mắc liên hệ qua email này
            </p>
          </div>

        </div>
      `,
    });

    console.log(`[Email] Gửi thông báo hủy thành công → ${user.email}`);
  } catch (err: any) {
    console.error(`[Email] Gửi thông báo hủy thất bại:`, err.message);
  }
};

export const sendResetPasswordEmail = async (
  email: string,
  fullName: string,
  resetLink: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: email,
      subject: '[Hotel Booking] Đặt lại mật khẩu',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto">
          <h2>Xin chào ${fullName},</h2>
          <p>
            Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.
          </p>
          <p>
            Nhấn vào nút bên dưới để đặt mật khẩu mới.
            Link có hiệu lực trong <strong>15 phút</strong>.
          </p>
          
          <a href="${resetLink}"
            style="display:inline-block;margin:16px 0;padding:12px 24px;background:#0f4c81;color:#fff;border-radius:8px;text-decoration:none;font-weight:500;"
          >
            Đặt lại mật khẩu
          </a>

          <p style="color:#888;font-size:12px">
            Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.
          </p>
        </div>
      `,
    }).catch((err) => {
      console.error('[Email] sendResetPasswordEmail error:', err);
    });
  } catch (err) {
    console.error('[Email] sendResetPasswordEmail error:', err);
  }
};