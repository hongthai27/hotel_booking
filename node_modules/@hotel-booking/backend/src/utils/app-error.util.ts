// Loi co kiem soat, chu dong throw tu service layer
// isOperational = true de phan biet voi loi he thong khong mong doi
export class AppError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean = true;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';

    // Giu stack trace chinh xac tu noi throw, bo qua constructor nay
    Error.captureStackTrace(this, this.constructor);
  }
}