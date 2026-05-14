/*
  Warnings:

  - You are about to drop the column `current_price` on the `room` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `ROOM_status_idx` ON `room`;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `current_price`;
