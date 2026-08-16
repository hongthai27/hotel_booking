-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `BOOKING_created_by_fkey`;

-- AlterTable
ALTER TABLE `audit_log` MODIFY `action` ENUM('CREATE', 'UPDATE', 'DEACTIVATE', 'DELETE') NOT NULL;

-- Backfill NULL discount_amount before making it required
UPDATE `booking` SET `discount_amount` = 0 WHERE `discount_amount` IS NULL;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `checkin_at`,
    DROP COLUMN `checkin_note`,
    DROP COLUMN `checkout_at`,
    DROP COLUMN `extra_charges`,
    DROP COLUMN `extra_total`,
    MODIFY `check_in_date` DATE NOT NULL,
    MODIFY `check_out_date` DATE NOT NULL,
    MODIFY `special_requests` VARCHAR(500) NULL,
    MODIFY `discount_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    MODIFY `promo_code` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `booking_room` DROP COLUMN `price_at_booking`,
    ADD COLUMN `checkin_at` DATETIME(3) NOT NULL,
    ADD COLUMN `checkin_note` TEXT NULL,
    ADD COLUMN `checkout_at` DATETIME(3) NULL,
    ADD COLUMN `extra_charges` JSON NULL,
    ADD COLUMN `id_number` VARCHAR(20) NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `status` ENUM('pending', 'success', 'failed', 'pending_refund', 'refunded') NOT NULL DEFAULT 'pending',
    MODIFY `fee_type` ENUM('booking', 'penalty', 'refund') NOT NULL DEFAULT 'booking';

-- AlterTable
ALTER TABLE `promotion` DROP COLUMN `description`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `type` VARCHAR(20) NOT NULL,
    MODIFY `value` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `current_price`;

-- AlterTable
ALTER TABLE `user` MODIFY `reset_token` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `BOOKING_ROOM_TYPE` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NOT NULL,
    `room_type_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price_at_booking` DECIMAL(12, 2) NOT NULL,

    INDEX `BOOKING_ROOM_TYPE_booking_id_idx`(`booking_id`),
    INDEX `BOOKING_ROOM_TYPE_room_type_id_idx`(`room_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BOOKING` ADD CONSTRAINT `BOOKING_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `USER`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BOOKING_ROOM_TYPE` ADD CONSTRAINT `BOOKING_ROOM_TYPE_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `BOOKING`(`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BOOKING_ROOM_TYPE` ADD CONSTRAINT `BOOKING_ROOM_TYPE_room_type_id_fkey` FOREIGN KEY (`room_type_id`) REFERENCES `ROOM_TYPE`(`room_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;