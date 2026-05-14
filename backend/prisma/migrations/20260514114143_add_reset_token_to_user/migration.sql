/*
  Warnings:

  - Added the required column `current_price` to the `ROOM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `current_price` DECIMAL(12, 2) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `reset_token` VARCHAR(255) NULL,
    ADD COLUMN `reset_token_expiry` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `ROOM_status_idx` ON `ROOM`(`status`);
