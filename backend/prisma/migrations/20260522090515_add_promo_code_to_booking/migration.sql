-- AlterTable
ALTER TABLE `booking` ADD COLUMN `discount_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `promo_code` VARCHAR(50) NULL;
