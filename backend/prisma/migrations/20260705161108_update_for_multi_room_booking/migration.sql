/*
  Warnings:

  - You are about to drop the column `id_number` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `promotion` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `promotion` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(8))`.
  - You are about to alter the column `reset_token` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `BOOKING_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `BOOKING_room_id_fkey`;

-- AlterTable
ALTER TABLE `audit_log` MODIFY `action` ENUM('CREATE', 'UPDATE', 'DELETE', 'DEACTIVATE') NOT NULL;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `id_number`,
    DROP COLUMN `room_id`,
    ADD COLUMN `checkin_at` DATETIME(3) NULL,
    ADD COLUMN `checkout_at` DATETIME(3) NULL,
    MODIFY `check_in_date` DATETIME(3) NOT NULL,
    MODIFY `check_out_date` DATETIME(3) NOT NULL,
    MODIFY `checkin_note` TEXT NULL,
    MODIFY `extra_total` DECIMAL(12, 2) NULL,
    MODIFY `special_requests` TEXT NULL,
    MODIFY `discount_amount` DECIMAL(12, 2) NULL,
    MODIFY `promo_code` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `status` ENUM('pending', 'success', 'failed', 'refunded', 'pending_refund') NOT NULL DEFAULT 'pending',
    MODIFY `fee_type` ENUM('booking', 'penalty', 'refund') NULL;

-- AlterTable
ALTER TABLE `promotion` DROP COLUMN `updated_at`,
    ADD COLUMN `description` TEXT NULL,
    MODIFY `type` ENUM('percentage', 'fixed', 'free_night') NOT NULL,
    MODIFY `value` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `room` MODIFY `status` ENUM('available', 'occupied', 'maintenance', 'cleaning', 'out_of_order', 'outoforder') NOT NULL DEFAULT 'available';

-- AlterTable
ALTER TABLE `user` MODIFY `reset_token` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `BOOKING_ROOM` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,
    `price_at_booking` DECIMAL(12, 2) NOT NULL,

    INDEX `BOOKING_ROOM_booking_id_idx`(`booking_id`),
    INDEX `BOOKING_ROOM_room_id_idx`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BOOKING` ADD CONSTRAINT `BOOKING_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `USER`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BOOKING_ROOM` ADD CONSTRAINT `BOOKING_ROOM_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `BOOKING`(`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BOOKING_ROOM` ADD CONSTRAINT `BOOKING_ROOM_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `ROOM`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `booking` RENAME INDEX `BOOKING_promotion_id_fkey` TO `BOOKING_promotion_id_idx`;
