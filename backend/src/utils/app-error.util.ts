// Lỗi có kiểm soát, chủ động throw từ service layer
// isOperational = true để phân biệt với lỗi hệ thống không mong đợi
export class AppError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean = true;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';

    // Giữ stack trace chính xác từ nơi throw, bỏ qua constructor này
    Error.captureStackTrace(this, this.constructor);
  }
}