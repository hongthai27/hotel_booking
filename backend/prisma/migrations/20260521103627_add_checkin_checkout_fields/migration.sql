-- AlterTable
ALTER TABLE `booking` ADD COLUMN `checkin_note` VARCHAR(500) NULL,
    ADD COLUMN `extra_charges` JSON NULL,
    ADD COLUMN `extra_total` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `id_number` VARCHAR(20) NULL;
