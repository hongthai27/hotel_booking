export class AppError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean = true;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}