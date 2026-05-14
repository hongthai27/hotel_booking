import express from 'express';
import cors from 'cors';
import { Application, Request, Response, NextFunction } from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { router } from './routes';
import { AppError } from './utils/app-error.util';

const app: Application = express();

app.set('json replacer', (_key: string, value: unknown) => {
  if (
    value !== null &&
    typeof value === 'object' &&
    value.constructor?.name === 'Decimal'
  ) {
    return Number(value);
  }
  return value;
});

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

// PHẦN 4: JSON 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint không tồn tại',
  });
});

app.use(errorMiddleware);

export default app;