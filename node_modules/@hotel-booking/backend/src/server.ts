import  http from 'http';
import { env } from './config/env.config';
import { testDatabaseConnection } from './config/database.config';
import { logger } from './utils/logger.util';
import { startCancelExpiredBookingsJob } from './jobs/cancel-expired-bookings.job';
import { initSocket } from './config/socket.config';
import app from './app';

const httpServer = http.createServer(app);

const bootstrap = async (): Promise<void> => {
  await testDatabaseConnection();

  initSocket(httpServer);

  startCancelExpiredBookingsJob();

  httpServer.listen(env.PORT, () => {
    logger.info(`Server running on http://localhost:${env.PORT}`);
    logger.info(`Environment: ${env.NODE_ENV}`);
  });
};

bootstrap().catch((error) => {
  logger.error('Server failed to start:', error);
  process.exit(1);
});