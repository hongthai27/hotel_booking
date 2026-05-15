import * as nodemailer from 'nodemailer';
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
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

const buildBookingConfirmationHtml = (
  booking: BookingEmailData,
  user: UserEmailData
): string => {
  return `
    <h2>Xác nhận đặt phòng thành công</h2>
    <p>Xin chào ${user.fullName},</p>
    <p>Đơn đặt phòng của bạn đã được xác nhận.</p>
    <ul>
      <li>Mã đơn: #${booking.id}</li>
      <li>Phòng: ${booking.roomId}</li>
      <li>Nhận phòng: ${booking.checkInDate.toLocaleDateString('vi-VN')}</li>
      <li>Trả phòng: ${booking.checkOutDate.toLocaleDateString('vi-VN')}</li>
      <li>Tổng tiền: ${booking.totalAmount.toLocaleString('vi-VN')} VND</li>
    </ul>
    <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
  `;
};

const buildCancellationHtml = (
  booking: BookingEmailData,
  user: UserEmailData,
  refundAmount?: number
): string => {
  const refundSection = refundAmount
    ? `<p>Số tiền hoàn trả: ${refundAmount.toLocaleString('vi-VN')} VND</p>`
    : '<p>Đơn đặt phòng này không đủ điều kiện hoàn tiền.</p>';

  return `
    <h2>Thông báo hủy đặt phòng</h2>
    <p>Xin chào ${user.fullName},</p>
    <p>Đơn đặt phòng #${booking.id} đã được hủy thành công.</p>
    <ul>
      <li>Mã đơn: #${booking.id}</li>
      <li>Phòng: ${booking.roomId}</li>
      <li>Nhận phòng: ${booking.checkInDate.toLocaleDateString('vi-VN')}</li>
      <li>Trả phòng: ${booking.checkOutDate.toLocaleDateString('vi-VN')}</li>
    </ul>
    ${refundSection}
    <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
  `;
};

// Bọc try/catch tại tầng utility, không throw ra ngoài
// Nếu gửi thất bại, chỉ log lỗi và để luồng giao dịch chính tiếp tục bình thường
export const sendBookingConfirmationEmail = async (
  booking: BookingEmailData,
  user: UserEmailData
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: user.email,
      subject: `Xác nhận đặt phòng #${booking.id}`,
      html: buildBookingConfirmationHtml(booking, user),
    });

    logger.info(`Đã gửi email xác nhận đơn #${booking.id} đến ${user.email}`);
  } catch (error) {
    logger.error(`Lỗi gửi email xác nhận đơn #${booking.id}`, error);
  }
};

export const sendCancellationEmail = async (
  booking: BookingEmailData,
  user: UserEmailData,
  refundAmount?: number
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: user.email,
      subject: `Thông báo hủy đặt phòng #${booking.id}`,
      html: buildCancellationHtml(booking, user, refundAmount),
    });

    logger.info(`Đã gửi email hủy đơn #${booking.id} đến ${user.email}`);
  } catch (error) {
    logger.error(`Lỗi gửi email hủy đơn #${booking.id}`, error);
  }
};

export const sendResetPasswordEmail = async (
  email: string,
  fullName: string,
  resetLink: string
): Promise<void> => {
  await transporter.sendMail({
    from: env.EMAIL_USER,
    to: email,
    subject: '[Hotel Booking] Đặt lại mật khẩu',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2>Xin chào ${fullName},</h2>
        <p>
          Chúng tôi nhận được yêu cầu đặt lại mật khẩu
          cho tài khoản của bạn.
        </p>
        <p>
          Nhấn vào nút bên dưới để đặt mật khẩu mới.
          Link có hiệu lực trong <strong>15 phút</strong>.
        </p>
        <a href="${resetLink}"
          style="
            display:inline-block;
            margin:16px 0;
            padding:12px 24px;
            background:#0f4c81;
            color:#fff;
            border-radius:8px;
            text-decoration:none;
            font-weight:500;
          "
        >
          Đặt lại mật khẩu
        </a>
        <p style="color:#888;font-size:12px">
          Nếu bạn không yêu cầu đặt lại mật khẩu,
          hãy bỏ qua email này.
          Tài khoản của bạn vẫn an toàn.
        </p>
      </div>
    `,
  }).catch((err) => {
    logger.error('[Email] sendResetPasswordEmail error:', err);
  });
};