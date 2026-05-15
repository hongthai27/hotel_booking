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

// Khoi tao transporter mot lan, tai su dung cho moi lan gui
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
    <h2>Xac nhan dat phong thanh cong</h2>
    <p>Xin chao ${user.fullName},</p>
    <p>Don dat phong cua ban da duoc xac nhan.</p>
    <ul>
      <li>Ma don: #${booking.id}</li>
      <li>Phong: ${booking.roomId}</li>
      <li>Nhan phong: ${booking.checkInDate.toLocaleDateString('vi-VN')}</li>
      <li>Tra phong: ${booking.checkOutDate.toLocaleDateString('vi-VN')}</li>
      <li>Tong tien: ${booking.totalAmount.toLocaleString('vi-VN')} VND</li>
    </ul>
    <p>Cam on ban da su dung dich vu cua chung toi.</p>
  `;
};

const buildCancellationHtml = (
  booking: BookingEmailData,
  user: UserEmailData,
  refundAmount?: number
): string => {
  const refundSection = refundAmount
    ? `<p>So tien hoan tra: ${refundAmount.toLocaleString('vi-VN')} VND</p>`
    : '<p>Don dat phong nay khong du dieu kien hoan tien.</p>';

  return `
    <h2>Thong bao huy dat phong</h2>
    <p>Xin chao ${user.fullName},</p>
    <p>Don dat phong #${booking.id} da duoc huy thanh cong.</p>
    <ul>
      <li>Ma don: #${booking.id}</li>
      <li>Phong: ${booking.roomId}</li>
      <li>Nhan phong: ${booking.checkInDate.toLocaleDateString('vi-VN')}</li>
      <li>Tra phong: ${booking.checkOutDate.toLocaleDateString('vi-VN')}</li>
    </ul>
    ${refundSection}
    <p>Cam on ban da su dung dich vu cua chung toi.</p>
  `;
};

// Boc try/catch tai tang utility, khong throw ra ngoai
// Neu gui that bai, chi log loi va de luong giao dich chinh tiep tuc binh thuong
export const sendBookingConfirmationEmail = async (
  booking: BookingEmailData,
  user: UserEmailData
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: user.email,
      subject: `Xac nhan dat phong #${booking.id}`,
      html: buildBookingConfirmationHtml(booking, user),
    });

    logger.info(`Da gui email xac nhan don #${booking.id} den ${user.email}`);
  } catch (error) {
    logger.error(`Loi gui email xac nhan don #${booking.id}`, error);
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
      subject: `Thong bao huy dat phong #${booking.id}`,
      html: buildCancellationHtml(booking, user, refundAmount),
    });

    logger.info(`Da gui email huy don #${booking.id} den ${user.email}`);
  } catch (error) {
    logger.error(`Loi gui email huy don #${booking.id}`, error);
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
    subject: '[Hotel Booking] Dat lai mat khau',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2>Xin chao ${fullName},</h2>
        <p>
          Chung toi nhan duoc yeu cau dat lai mat khau
          cho tai khoan cua ban.
        </p>
        <p>
          Nhan vao nut ben duoi de dat mat khau moi.
          Link co hieu luc trong <strong>15 phut</strong>.
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
          Dat lai mat khau
        </a>
        <p style="color:#888;font-size:12px">
          Neu ban khong yeu cau dat lai mat khau,
          hay bo qua email nay.
          Tai khoan cua ban van an toan.
        </p>
      </div>
    `,
  }).catch((err) => {
    logger.error('[Email] sendResetPasswordEmail error:', err);
  });
};