-- AlterTable
ALTER TABLE `payment` ADD COLUMN `fee_type` ENUM('booking', 'penalty', 'refund') NOT NULL DEFAULT 'booking';
