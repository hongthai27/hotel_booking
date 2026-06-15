import { env } from '../config/env.config';

const isDevelopment = env.NODE_ENV === 'development';

const formatMessage = (level: string, message: string): string => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
};

const info = (message: string): void => {
  if (!isDevelopment) return;
  console.log(formatMessage('INFO', message));
};

const warn = (message: string): void => {
  console.warn(formatMessage('WARN', message));
};

const error = (message: string, err?: unknown): void => {
  console.error(formatMessage('ERROR', message));

  if (err instanceof Error && isDevelopment) {
    console.error(err.stack);
  }
};

export const logger = { info, warn, error };