-- AlterTable
ALTER TABLE `booking` ADD COLUMN `promotion_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `id_number` VARCHAR(20) NULL;

-- CreateTable
CREATE TABLE `PROMOTION` (
    `promotion_id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(50) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `value` DOUBLE NOT NULL,
    `min_nights` INTEGER NULL,
    `usage_limit` INTEGER NULL,
    `used_count` INTEGER NOT NULL DEFAULT 0,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PROMOTION_code_key`(`code`),
    PRIMARY KEY (`promotion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BOOKING` ADD CONSTRAINT `BOOKING_promotion_id_fkey` FOREIGN KEY (`promotion_id`) REFERENCES `PROMOTION`(`promotion_id`) ON DELETE SET NULL ON UPDATE CASCADE;
