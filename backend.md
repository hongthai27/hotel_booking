This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.gitignore
nodemon.json
package.json
prisma/migrations/20260424104702_init/migration.sql
prisma/migrations/20260425114711_remove_current_price_from_room/migration.sql
prisma/migrations/20260426023707_add_delete_to_audit_action/migration.sql
prisma/migrations/20260514114143_add_reset_token_to_user/migration.sql
prisma/migrations/20260516072203_add_payment_fee_type/migration.sql
prisma/migrations/20260516080836_add_paid_at_to_booking/migration.sql
prisma/migrations/20260519061849_add_version_optimistic_lock/migration.sql
prisma/migrations/20260519092928_add_pending_refund_status/migration.sql
prisma/migrations/20260521092919_add_avatar_to_user/migration.sql
prisma/migrations/20260521103627_add_checkin_checkout_fields/migration.sql
prisma/migrations/20260521113351_add_special_requests_to_booking/migration.sql
prisma/migrations/20260522090515_add_promo_code_to_booking/migration.sql
prisma/migrations/20260705100019_add_booking_room_table/migration.sql
prisma/migrations/20260705161108_update_for_multi_room_booking/migration.sql
prisma/migrations/20260731154937_checkin_time_room_assignment/migration.sql
prisma/migrations/20260731155120_abooking/migration.sql
prisma/migrations/20260808023141_add_payment_allocation/migration.sql
prisma/migrations/migration_lock.toml
prisma/schema.prisma
prisma/seed.ts
src/app.ts
src/config/cloudinary.config.ts
src/config/database.config.ts
src/config/env.config.ts
src/config/socket.config.ts
src/controllers/admin.controller.ts
src/controllers/auth.controller.ts
src/controllers/booking.controller.ts
src/controllers/hotel.controller.ts
src/controllers/payment.controller.ts
src/controllers/promotion.controller.ts
src/controllers/report.controller.ts
src/jobs/cancel-expired-bookings.job.ts
src/middlewares/auth.middleware.ts
src/middlewares/error.middleware.ts
src/middlewares/validate.middleware.ts
src/routes/admin.routes.ts
src/routes/auth.route.ts
src/routes/booking.route.ts
src/routes/hotel.route.ts
src/routes/index.ts
src/routes/payment.route.ts
src/routes/promotion.route.ts
src/server.ts
src/services/auth.service.ts
src/services/booking.service.ts
src/services/cron.service.ts
src/services/hotel.service.ts
src/services/payment.service.ts
src/services/report.service.ts
src/types/express.d.ts
src/utils/app-error.util.ts
src/utils/audit-log.util.ts
src/utils/catch-async.util.ts
src/utils/cloudinary.util.ts
src/utils/email.util.ts
src/utils/jwt.util.ts
src/utils/logger.util.ts
src/utils/prisma.util.ts
src/utils/response.util.ts
src/utils/socket.util.ts
src/validations/auth.schema.ts
src/validations/booking.schema.ts
src/validations/hotel.schema.ts
src/validations/payment.schema.ts
src/validations/promotion.schema.ts
tsconfig.json
tsconfig.seed.json
uploads/avatar-1779381717246-Screenshot 2026-05-20 211033.png
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path=".gitignore">
node_modules
# Keep environment variables out of version control
.env
</file>

<file path="nodemon.json">
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["*.spec.ts"],
  "exec": "ts-node -r tsconfig-paths/register src/server.ts"
}
</file>

<file path="package.json">
{
  "name": "@hotel-booking/backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "nodemon",
    "build": "tsc",
    "start": "node dist/server.js",
    "seed": "ts-node --project tsconfig.seed.json prisma/seed.ts"
  },
  "prisma": {
    "seed": "ts-node --project tsconfig.seed.json prisma/seed.ts"
  },
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "bcrypt": "^5.1.1",
    "cloudinary": "^2.3.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "node-cron": "^3.0.3",
    "nodemailer": "^6.9.14",
    "prisma": "^5.22.0",
    "socket.io": "^4.8.3",
    "uuid": "^8.3.2",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/multer": "^1.4.11",
    "@types/node": "^20.14.9",
    "@types/node-cron": "^3.0.11",
    "@types/nodemailer": "^6.4.15",
    "@types/socket.io": "^3.0.1",
    "@types/uuid": "^10.0.0",
    "nodemon": "^3.1.14",
    "ts-node": "^10.9.2",
    "ts-node-dev": "^2.0.0",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.4.5"
  }
}
</file>

<file path="prisma/migrations/20260424104702_init/migration.sql">
-- CreateTable
CREATE TABLE `USER` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('customer', 'receptionist', 'admin') NOT NULL DEFAULT 'customer',
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `USER_email_key`(`email`),
    UNIQUE INDEX `USER_phone_number_key`(`phone_number`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ROOM_TYPE` (
    `room_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `max_capacity` INTEGER NOT NULL,
    `base_price` DECIMAL(12, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ROOM_TYPE_type_name_key`(`type_name`),
    PRIMARY KEY (`room_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ROOM` (
    `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_type_id` INTEGER NOT NULL,
    `room_number` VARCHAR(20) NOT NULL,
    `floor` INTEGER NULL,
    `status` ENUM('available', 'occupied', 'maintenance', 'cleaning') NOT NULL DEFAULT 'available',
    `current_price` DECIMAL(12, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ROOM_room_number_key`(`room_number`),
    INDEX `ROOM_room_type_id_idx`(`room_type_id`),
    INDEX `ROOM_status_idx`(`status`),
    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AMENITY` (
    `amenity_id` INTEGER NOT NULL AUTO_INCREMENT,
    `amenity_name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,

    UNIQUE INDEX `AMENITY_amenity_name_key`(`amenity_name`),
    PRIMARY KEY (`amenity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ROOM_TYPE_AMENITY` (
    `room_type_id` INTEGER NOT NULL,
    `amenity_id` INTEGER NOT NULL,

    INDEX `ROOM_TYPE_AMENITY_amenity_id_idx`(`amenity_id`),
    PRIMARY KEY (`room_type_id`, `amenity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ROOM_IMAGE` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_type_id` INTEGER NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ROOM_IMAGE_room_type_id_idx`(`room_type_id`),
    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BOOKING` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,
    `created_by` INTEGER NULL,
    `check_in_date` DATE NOT NULL,
    `check_out_date` DATE NOT NULL,
    `guest_count` INTEGER NOT NULL,
    `total_amount` DECIMAL(12, 2) NOT NULL,
    `source` ENUM('online', 'offline') NOT NULL DEFAULT 'online',
    `status` ENUM('pending_payment', 'confirmed', 'checked_in', 'checked_out', 'cancelled') NOT NULL DEFAULT 'pending_payment',
    `cancelled_at` DATETIME(3) NULL,
    `cancel_reason` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `BOOKING_user_id_idx`(`user_id`),
    INDEX `BOOKING_room_id_idx`(`room_id`),
    INDEX `BOOKING_created_by_idx`(`created_by`),
    INDEX `BOOKING_check_in_date_check_out_date_idx`(`check_in_date`, `check_out_date`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PAYMENT` (
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `method` ENUM('qr_code', 'cash', 'card') NOT NULL,
    `status` ENUM('pending', 'success', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
    `transaction_ref` VARCHAR(255) NULL,
    `paid_at` DATETIME(3) NULL,
    `refunded_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PAYMENT_transaction_ref_key`(`transaction_ref`),
    INDEX `PAYMENT_booking_id_idx`(`booking_id`),
    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `REVIEW` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `rating` TINYINT NOT NULL,
    `comment` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `REVIEW_booking_id_key`(`booking_id`),
    INDEX `REVIEW_user_id_idx`(`user_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AUDIT_LOG` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `actor_id` INTEGER NOT NULL,
    `target_table` VARCHAR(50) NOT NULL,
    `target_id` INTEGER NOT NULL,
    `action` ENUM('CREATE', 'UPDATE', 'DEACTIVATE') NOT NULL,
    `old_value` TEXT NULL,
    `new_value` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AUDIT_LOG_actor_id_idx`(`actor_id`),
    INDEX `AUDIT_LOG_target_table_target_id_idx`(`target_table`, `target_id`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ROOM` ADD CONSTRAINT `ROOM_room_type_id_fkey` FOREIGN KEY (`room_type_id`) REFERENCES `ROOM_TYPE`(`room_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ROOM_TYPE_AMENITY` ADD CONSTRAINT `ROOM_TYPE_AMENITY_room_type_id_fkey` FOREIGN KEY (`room_type_id`) REFERENCES `ROOM_TYPE`(`room_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ROOM_TYPE_AMENITY` ADD CONSTRAINT `ROOM_TYPE_AMENITY_amenity_id_fkey` FOREIGN KEY (`amenity_id`) REFERENCES `AMENITY`(`amenity_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ROOM_IMAGE` ADD CONSTRAINT `ROOM_IMAGE_room_type_id_fkey` FOREIGN KEY (`room_type_id`) REFERENCES `ROOM_TYPE`(`room_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BOOKING` ADD CONSTRAINT `BOOKING_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `USER`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BOOKING` ADD CONSTRAINT `BOOKING_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `USER`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BOOKING` ADD CONSTRAINT `BOOKING_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `ROOM`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PAYMENT` ADD CONSTRAINT `PAYMENT_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `BOOKING`(`booking_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `REVIEW` ADD CONSTRAINT `REVIEW_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `BOOKING`(`booking_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `REVIEW` ADD CONSTRAINT `REVIEW_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `USER`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AUDIT_LOG` ADD CONSTRAINT `AUDIT_LOG_actor_id_fkey` FOREIGN KEY (`actor_id`) REFERENCES `USER`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
</file>

<file path="prisma/migrations/20260425114711_remove_current_price_from_room/migration.sql">
/*
  Warnings:

  - You are about to drop the column `current_price` on the `room` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `ROOM_status_idx` ON `room`;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `current_price`;
</file>

<file path="prisma/migrations/20260426023707_add_delete_to_audit_action/migration.sql">
-- AlterTable
ALTER TABLE `audit_log` MODIFY `action` ENUM('CREATE', 'UPDATE', 'DEACTIVATE', 'DELETE') NOT NULL;
</file>

<file path="prisma/migrations/20260514114143_add_reset_token_to_user/migration.sql">
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
</file>

<file path="prisma/migrations/20260516072203_add_payment_fee_type/migration.sql">
-- AlterTable
ALTER TABLE `payment` ADD COLUMN `fee_type` ENUM('booking', 'penalty', 'refund') NOT NULL DEFAULT 'booking';
</file>

<file path="prisma/migrations/20260516080836_add_paid_at_to_booking/migration.sql">
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `paid_at` DATETIME(3) NULL;
</file>

<file path="prisma/migrations/20260519061849_add_version_optimistic_lock/migration.sql">
-- AlterTable
ALTER TABLE `room` ADD COLUMN `version` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `room_type` ADD COLUMN `version` INTEGER NOT NULL DEFAULT 0;
</file>

<file path="prisma/migrations/20260519092928_add_pending_refund_status/migration.sql">
-- AlterTable
ALTER TABLE `payment` MODIFY `status` ENUM('pending', 'success', 'failed', 'pending_refund', 'refunded') NOT NULL DEFAULT 'pending';
</file>

<file path="prisma/migrations/20260521092919_add_avatar_to_user/migration.sql">
-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar_url` VARCHAR(255) NULL;
</file>

<file path="prisma/migrations/20260521103627_add_checkin_checkout_fields/migration.sql">
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `checkin_note` VARCHAR(500) NULL,
    ADD COLUMN `extra_charges` JSON NULL,
    ADD COLUMN `extra_total` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `id_number` VARCHAR(20) NULL;
</file>

<file path="prisma/migrations/20260521113351_add_special_requests_to_booking/migration.sql">
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `special_requests` VARCHAR(500) NULL;
</file>

<file path="prisma/migrations/20260522090515_add_promo_code_to_booking/migration.sql">
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `discount_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `promo_code` VARCHAR(50) NULL;
</file>

<file path="prisma/migrations/20260705100019_add_booking_room_table/migration.sql">
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
</file>

<file path="prisma/migrations/20260705161108_update_for_multi_room_booking/migration.sql">
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
</file>

<file path="prisma/migrations/20260731154937_checkin_time_room_assignment/migration.sql">
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
</file>

<file path="prisma/migrations/20260731155120_abooking/migration.sql">
-- AlterTable
ALTER TABLE `promotion` ALTER COLUMN `updated_at` DROP DEFAULT;
</file>

<file path="prisma/migrations/20260808023141_add_payment_allocation/migration.sql">
-- CreateTable
CREATE TABLE `PAYMENT_ALLOCATION` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_id` INTEGER NOT NULL,
    `room_type_id` INTEGER NOT NULL,
    `room_type_name` VARCHAR(100) NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `PAYMENT_ALLOCATION_payment_id_idx`(`payment_id`),
    INDEX `PAYMENT_ALLOCATION_room_type_id_idx`(`room_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PAYMENT_ALLOCATION` ADD CONSTRAINT `PAYMENT_ALLOCATION_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `PAYMENT`(`payment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PAYMENT_ALLOCATION` ADD CONSTRAINT `PAYMENT_ALLOCATION_room_type_id_fkey` FOREIGN KEY (`room_type_id`) REFERENCES `ROOM_TYPE`(`room_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
</file>

<file path="prisma/migrations/migration_lock.toml">
# Please do not edit this file manually
# It should be added in your version-control system (i.e. Git)
provider = "mysql"
</file>

<file path="prisma/schema.prisma">
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ─── Enums ────────────────────────────────────────────────────────────────────

enum UserRole {
  customer
  receptionist
  admin
}

enum UserStatus {
  active
  inactive
}

enum RoomStatus {
  available
  occupied
  maintenance
  cleaning
  out_of_order
  outoforder
}

enum BookingSource {
  online
  offline
}

enum BookingStatus {
  pending_payment
  confirmed
  checked_in
  checked_out
  cancelled
}

enum PaymentMethod {
  qr_code
  cash
  card
}

enum PaymentStatus {
  pending
  success
  failed
  pending_refund
  refunded
}

enum AuditAction {
  CREATE
  UPDATE
  DEACTIVATE
  DELETE
}

enum PaymentFeeType {
  booking
  penalty
  refund
}

// ─── Models ───────────────────────────────────────────────────────────────────

model User {
  id               Int        @id @default(autoincrement()) @map("user_id")
  fullName         String     @map("full_name") @db.VarChar(100)
  avatarUrl        String?    @map("avatar_url") @db.VarChar(255)
  email            String     @unique @map("email") @db.VarChar(150)
  phoneNumber      String     @unique @map("phone_number") @db.VarChar(20)
  passwordHash     String     @map("password_hash") @db.VarChar(255)
  resetToken       String?    @map("reset_token") @db.VarChar(255)
  resetTokenExpiry DateTime?  @map("reset_token_expiry")
  idNumber         String?    @map("id_number") @db.VarChar(20)
  role             UserRole   @default(customer) @map("role")
  status           UserStatus @default(active) @map("status")
  createdAt        DateTime   @default(now()) @map("created_at")
  updatedAt        DateTime   @updatedAt @map("updated_at")

  // relations
  bookings        Booking[]  @relation("BookingCustomer")
  createdBookings Booking[]  @relation("BookingCreatedBy")
  reviews         Review[]
  auditLogs       AuditLog[]

  @@map("USER")
}

model RoomType {
  id          Int      @id @default(autoincrement()) @map("room_type_id")
  typeName    String   @unique @map("type_name") @db.VarChar(100)
  description String?  @map("description") @db.Text
  maxCapacity Int      @map("max_capacity")
  basePrice   Decimal  @map("base_price") @db.Decimal(12, 2)
  version     Int      @default(0) @map("version")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // relations
  rooms        Room[]
  images       RoomImage[]
  amenities    RoomTypeAmenity[]
  bookingLines BookingRoomType[]
  paymentAllocations PaymentAllocation[]

  @@map("ROOM_TYPE")
}

model Room {
  id           Int        @id @default(autoincrement()) @map("room_id")
  roomTypeId   Int        @map("room_type_id")
  roomNumber   String     @unique @map("room_number") @db.VarChar(20)
  floor        Int?       @map("floor")
  status       RoomStatus @default(available) @map("status")
  version      Int        @default(0) @map("version")
  createdAt    DateTime   @default(now()) @map("created_at")
  updatedAt    DateTime   @updatedAt @map("updated_at")

  // relations
  roomType     RoomType      @relation(fields: [roomTypeId], references: [id], onDelete: Restrict)
  bookingRooms BookingRoom[]

  @@index([roomTypeId])
  @@index([status])
  @@map("ROOM")
}

model Amenity {
  id          Int     @id @default(autoincrement()) @map("amenity_id")
  amenityName String  @unique @map("amenity_name") @db.VarChar(100)
  description String? @map("description") @db.VarChar(255)

  // relations
  roomTypes RoomTypeAmenity[]

  @@map("AMENITY")
}

model RoomTypeAmenity {
  roomTypeId Int @map("room_type_id")
  amenityId  Int @map("amenity_id")

  // relations
  roomType RoomType @relation(fields: [roomTypeId], references: [id], onDelete: Cascade)
  amenity  Amenity  @relation(fields: [amenityId], references: [id], onDelete: Cascade)

  @@id([roomTypeId, amenityId])
  @@index([amenityId])
  @@map("ROOM_TYPE_AMENITY")
}

model RoomImage {
  id           Int      @id @default(autoincrement()) @map("image_id")
  roomTypeId   Int      @map("room_type_id")
  imageUrl     String   @map("image_url") @db.VarChar(255)
  displayOrder Int      @default(0) @map("display_order")
  createdAt    DateTime @default(now()) @map("created_at")

  // relations
  roomType RoomType @relation(fields: [roomTypeId], references: [id], onDelete: Cascade)

  @@index([roomTypeId])
  @@map("ROOM_IMAGE")
}

model Booking {
  id             Int           @id @default(autoincrement()) @map("booking_id")
  userId         Int           @map("user_id")
  createdBy      Int?          @map("created_by")
  checkInDate    DateTime      @map("check_in_date") @db.Date
  checkOutDate   DateTime      @map("check_out_date") @db.Date
  guestCount     Int           @map("guest_count")
  totalAmount    Decimal       @map("total_amount") @db.Decimal(12, 2)
  source         BookingSource @default(online) @map("source")
  status         BookingStatus @default(pending_payment) @map("status")
  paidAt         DateTime?     @map("paid_at")
  cancelledAt    DateTime?     @map("cancelled_at")
  cancelReason   String?       @map("cancel_reason") @db.VarChar(255)
  createdAt      DateTime      @default(now()) @map("created_at")
  updatedAt      DateTime      @updatedAt @map("updated_at")
  specialRequests String?      @map("special_requests") @db.VarChar(500)
  promoCode      String?       @map("promo_code") @db.VarChar(50)
  discountAmount Decimal       @default(0) @map("discount_amount") @db.Decimal(12, 2)
  promotionId    Int?          @map("promotion_id")

  // relations
  customer       User              @relation("BookingCustomer", fields: [userId], references: [id], onDelete: Restrict)
  createdByStaff User?             @relation("BookingCreatedBy", fields: [createdBy], references: [id], onDelete: Restrict)
  promotion      Promotion?        @relation(fields: [promotionId], references: [id])
  payments       Payment[]
  review         Review?
  roomTypeLines  BookingRoomType[]
  assignedRooms  BookingRoom[]

  @@index([userId])
  @@index([createdBy])
  @@index([checkInDate, checkOutDate])
  @@map("BOOKING")
}

model BookingRoomType {
  id             Int     @id @default(autoincrement())
  bookingId      Int     @map("booking_id")
  roomTypeId     Int     @map("room_type_id")
  quantity       Int
  priceAtBooking Decimal @map("price_at_booking") @db.Decimal(12, 2)

  // relations
  booking  Booking  @relation(fields: [bookingId], references: [id], onDelete: Cascade)
  roomType RoomType @relation(fields: [roomTypeId], references: [id], onDelete: Restrict)

  @@index([bookingId])
  @@index([roomTypeId])
  @@map("BOOKING_ROOM_TYPE")
}

model BookingRoom {
  id           Int       @id @default(autoincrement())
  bookingId    Int       @map("booking_id")
  roomId       Int       @map("room_id")
  checkinAt    DateTime  @map("checkin_at")
  checkoutAt   DateTime? @map("checkout_at")
  idNumber     String?   @map("id_number") @db.VarChar(20)
  checkinNote  String?   @map("checkin_note") @db.Text
  extraCharges Json?     @map("extra_charges")

  // relations
  booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)
  room    Room    @relation(fields: [roomId], references: [id], onDelete: Restrict)

  @@index([bookingId])
  @@index([roomId])
  @@map("BOOKING_ROOM")
}

model Payment {
  id             Int            @id @default(autoincrement()) @map("payment_id")
  bookingId      Int            @map("booking_id")
  amount         Decimal        @map("amount") @db.Decimal(12, 2)
  method         PaymentMethod  @map("method")
  status         PaymentStatus  @default(pending) @map("status")
  feeType        PaymentFeeType @default(booking) @map("fee_type")
  transactionRef String?        @unique @map("transaction_ref") @db.VarChar(255)
  paidAt         DateTime?      @map("paid_at")
  refundedAt     DateTime?      @map("refunded_at")
  createdAt      DateTime       @default(now()) @map("created_at")

  // relations
  booking Booking @relation(fields: [bookingId], references: [id], onDelete: Restrict)
  allocations PaymentAllocation[]

  @@index([bookingId])
  @@map("PAYMENT")
}

model Review {
  id        Int      @id @default(autoincrement()) @map("review_id")
  bookingId Int      @unique @map("booking_id")
  userId    Int      @map("user_id")
  rating    Int      @map("rating") @db.TinyInt
  comment   String?  @map("comment") @db.Text
  createdAt DateTime @default(now()) @map("created_at")

  // relations
  booking Booking @relation(fields: [bookingId], references: [id], onDelete: Restrict)
  user    User    @relation(fields: [userId], references: [id], onDelete: Restrict)

  @@index([userId])
  @@map("REVIEW")
}

model AuditLog {
  id          Int         @id @default(autoincrement()) @map("log_id")
  actorId     Int         @map("actor_id")
  targetTable String      @map("target_table") @db.VarChar(50)
  targetId    Int         @map("target_id")
  action      AuditAction @map("action")
  oldValue    String?     @map("old_value") @db.Text
  newValue    String?     @map("new_value") @db.Text
  createdAt   DateTime    @default(now()) @map("created_at")

  // relations
  actor User @relation(fields: [actorId], references: [id], onDelete: Restrict)

  @@index([actorId])
  @@index([targetTable, targetId])
  @@map("AUDIT_LOG")
}

model Promotion {
  id         Int       @id @default(autoincrement()) @map("promotion_id")
  code       String    @unique @map("code") @db.VarChar(50)
  type       String    @map("type") @db.VarChar(20)
  value      Float     @map("value")
  minNights  Int?      @map("min_nights")
  usageLimit Int?      @map("usage_limit")
  usedCount  Int       @default(0) @map("used_count")
  startDate  DateTime  @map("start_date")
  endDate    DateTime  @map("end_date")
  isActive   Boolean   @default(true) @map("is_active")
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime  @updatedAt @map("updated_at")

  bookings Booking[]

  @@map("PROMOTION")
  }

  model PaymentAllocation {
  id           Int      @id @default(autoincrement())
  paymentId    Int      @map("payment_id")
  roomTypeId   Int      @map("room_type_id")
  roomTypeName String   @map("room_type_name") @db.VarChar(100)
  amount       Decimal  @db.Decimal(12, 2)
  createdAt    DateTime @default(now()) @map("created_at")

  payment   Payment  @relation(fields: [paymentId], references: [id], onDelete: Cascade)
  roomType  RoomType @relation(fields: [roomTypeId], references: [id], onDelete: Restrict)

  @@index([paymentId])
  @@index([roomTypeId])
  @@map("PAYMENT_ALLOCATION")
  }
</file>

<file path="prisma/seed.ts">
import { PrismaClient, Room } from '@prisma/client'
import bcrypt from 'bcrypt'
import { createBooking, checkIn, checkOut } from '../src/services/booking.service'

const prisma = new PrismaClient()
const hash = (pw: string) => bcrypt.hash(pw, 10)

// Tạo Date offset ngày từ hôm nay
const d = (offsetDays: number, hour = 14): Date => {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)
  date.setHours(hour, 0, 0, 0)
  return date
}

// Tạo Date cách đây N tháng + offset ngày
const m = (monthsAgo: number, offsetDays = 0, hour = 14): Date => {
  const date = new Date()
  date.setMonth(date.getMonth() - monthsAgo)
  date.setDate(date.getDate() + offsetDays)
  date.setHours(hour, 0, 0, 0)
  return date
}

// ─── ẢNH ────────────────────────────────────────
const IMGS = {
  std: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941749/hotel-booking/ig6tytjn2kzhefp7egju.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941746/hotel-booking/csrfrarfwosrumfgjnm8.jpg',
  ],
  dlx: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941384/hotel-booking/txpbg5oznpcqjx4cn66n.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941383/hotel-booking/xuwf8vcbtxcc1plfd9cv.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941390/hotel-booking/zvd2mughq1t6zrctsxki.jpg',
  ] ,
  prm: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779942028/hotel-booking/x7rkjmoxu9sfdyuitt8w.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779942007/hotel-booking/d471zjmwrvc3iqwsgffs.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779942046/hotel-booking/irjmftdvkggfdugm7ojg.png',
  ] ,
  ste: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941266/hotel-booking/oagkvrcbocgk4joymwjp.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941264/hotel-booking/b25an2xiz5mutwmvsi87.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941264/hotel-booking/abi6agcrhhyglllnwoid.jpg',
  ] ,
  fam: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941539/hotel-booking/a5d5ftln2g0bdltjegk0.png',
'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941521/hotel-booking/sedi48yxqmvx3xiftjps.png',
  ] ,
  sgl: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941307/hotel-booking/ua0tvxvjdyzjrjr3vubf.png',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941428/hotel-booking/mn2j0xefxjeh2m19hzaf.jpg',
  ] ,
  twn: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941574/hotel-booking/jp2ghcskvalitkh045h4.png',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941596/hotel-booking/bbdp11zqlz4e0rucwlb4.jpg',
  ] ,
  stu: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941341/hotel-booking/jfq0smcvsyz56vb0tdgo.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941342/hotel-booking/cdtjw4c4f35yxhwubfyh.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941460/hotel-booking/r7kktchnu9jgiympjoof.jpg',
  ] ,
  exe: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941794/hotel-booking/lweehyoiqs3vzlpgjsr9.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941794/hotel-booking/g0qra01j1wodiuvacvle.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779941794/hotel-booking/bf1e5mz8osd1c0n5cjyo.jpg',
  ] ,
  prs: ['https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779942175/hotel-booking/snkoaxyuaoske3sdqrnf.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779942177/hotel-booking/apkcqk1smfzuy06rj1q1.jpg',
    'https://res.cloudinary.com/dwizzxfjb/image/upload/f_auto,q_auto,w_1200,c_limit/v1779942173/hotel-booking/c2l0vzw5hlk7gysgloro.jpg',
  ] 
}

// ─── MAIN ────────────────────────────────────────
async function main() {
  console.log(`Bat dau seed...\nXoa du lieu cu...`)

  await prisma.auditLog.deleteMany()
  await prisma.review.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.bookingRoom.deleteMany()
  await prisma.bookingRoomType.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.room.deleteMany()
  await prisma.roomTypeAmenity.deleteMany()
  await prisma.roomImage.deleteMany()
  await prisma.roomType.deleteMany()
  await prisma.promotion.deleteMany()
  await prisma.amenity.deleteMany()
  await prisma.user.deleteMany()

  // ════════════════════════════════════════════
  // 1. USERS: 1 admin · 3 lễ tân · 12 khách
  // ════════════════════════════════════════════
  console.log('Tao 16 users...')

  const admin = await prisma.user.create({ data: {
    fullName: 'Quản Trị Viên', email: 'admin@hotel.com',
    phoneNumber: '0900000001', passwordHash: await hash('Admin@123'),
    role: 'admin', status: 'active',
  }})

  const [r1, r2, r3] = await Promise.all([
    prisma.user.create({ data: { fullName: 'Nguyễn Thị Lễ Tân', email: 'receptionist@hotel.com',
      phoneNumber: '0900000002', passwordHash: await hash('Recep@123'),
      role: 'receptionist', status: 'active' }}),
    prisma.user.create({ data: { fullName: 'Trần Văn Lộc', email: 'loc.tran@hotel.com',
      phoneNumber: '0900000003', passwordHash: await hash('Recep@123'),
      role: 'receptionist', status: 'active' }}),
    prisma.user.create({ data: { fullName: 'Lê Thị Mai', email: 'mai.le@hotel.com',
      phoneNumber: '0900000004', passwordHash: await hash('Recep@123'),
      role: 'receptionist', status: 'active' }}),
  ])

  const customers = await Promise.all([
    // c[0]
    prisma.user.create({ data: { fullName: 'Trần Văn Khách', email: 'customer@hotel.com',
      phoneNumber: '0901000001', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[1]
    prisma.user.create({ data: { fullName: 'Lê Thị Hoa', email: 'hoa.le@gmail.com',
      phoneNumber: '0901000002', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[2]
    prisma.user.create({ data: { fullName: 'Phạm Minh Tuấn', email: 'tuan.pham@gmail.com',
      phoneNumber: '0901000003', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[3]
    prisma.user.create({ data: { fullName: 'Nguyễn Văn Nam', email: 'nam.nguyen@gmail.com',
      phoneNumber: '0901000004', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[4]
    prisma.user.create({ data: { fullName: 'Đỗ Thị Bình', email: 'binh.do@gmail.com',
      phoneNumber: '0901000005', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[5]
    prisma.user.create({ data: { fullName: 'Hoàng Văn Đức', email: 'duc.hoang@gmail.com',
      phoneNumber: '0901000006', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[6]
    prisma.user.create({ data: { fullName: 'Vũ Thị Lan', email: 'lan.vu@gmail.com',
      phoneNumber: '0901000007', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[7]
    prisma.user.create({ data: { fullName: 'Bùi Quốc Hùng', email: 'hung.bui@gmail.com',
      phoneNumber: '0901000008', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[8]
    prisma.user.create({ data: { fullName: 'Đinh Thị Thu', email: 'thu.dinh@gmail.com',
      phoneNumber: '0901000009', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[9]
    prisma.user.create({ data: { fullName: 'Lý Minh Khoa', email: 'khoa.ly@gmail.com',
      phoneNumber: '0901000010', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[10]
    prisma.user.create({ data: { fullName: 'Trương Thị Ngân', email: 'ngan.truong@gmail.com',
      phoneNumber: '0901000011', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
    // c[11]
    prisma.user.create({ data: { fullName: 'Mai Văn Phúc', email: 'phuc.mai@gmail.com',
      phoneNumber: '0901000012', passwordHash: await hash('Customer@123'),
      role: 'customer', status: 'active' }}),
  ])
  const [c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11] = customers
  console.log('Xong: 16 users (1 admin, 3 le tan, 12 khach)')

  // ════════════════════════════════════════════
  // 2. AMENITIES
  // ════════════════════════════════════════════
  console.log('Tao tien ich...')
  const [wifi, ac, tv, minibar, bathtub, balcony, safe, roomSvc, breakfast, pool] =
    await Promise.all([
      prisma.amenity.create({ data: { amenityName: 'WiFi miễn phí', description: 'Tốc độ cao 100Mbps' }}),
      prisma.amenity.create({ data: { amenityName: 'Điều hòa', description: 'Inverter Daikin 2 chiều' }}),
      prisma.amenity.create({ data: { amenityName: 'TV màn hình phẳng', description: 'Smart TV 4K 55 inch' }}),
      prisma.amenity.create({ data: { amenityName: 'Minibar', description: 'Đồ uống & snack hàng ngày' }}),
      prisma.amenity.create({ data: { amenityName: 'Bồn tắm Jacuzzi', description: 'Bồn tắm sục cao cấp' }}),
      prisma.amenity.create({ data: { amenityName: 'Ban công riêng', description: 'View thành phố / hồ bơi' }}),
      prisma.amenity.create({ data: { amenityName: 'Két an toàn', description: 'Két điện tử trong phòng' }}),
      prisma.amenity.create({ data: { amenityName: 'Dịch vụ phòng 24/7', description: 'Phục vụ tận phòng' }}),
      prisma.amenity.create({ data: { amenityName: 'Bữa sáng miễn phí', description: 'Buffet sáng tại nhà hàng' }}),
      prisma.amenity.create({ data: { amenityName: 'Hồ bơi riêng', description: 'Hồ bơi riêng trên sân thượng' }}),
    ])
  console.log('Xong: 10 tien ich')

  // ════════════════════════════════════════════
  // 3. ROOM TYPES + IMAGES + AMENITIES
  // ════════════════════════════════════════════
  console.log('Tao 10 hang phong...')

  const mkType = async (name: string, desc: string, cap: number, price: number,
    imgs: string[], ams: {id:number}[]) => {
    const rt = await prisma.roomType.create({
      data: { typeName: name, description: desc, maxCapacity: cap, basePrice: price, version: 0 },
    })
    const validImgs = imgs.filter(Boolean)
    if (validImgs.length > 0) {
      await prisma.roomImage.createMany({ data: validImgs.map((url,i) => ({ roomTypeId: rt.id, imageUrl: url, displayOrder: i })) })
    }
    await prisma.roomTypeAmenity.createMany({ data: ams.map(a => ({ roomTypeId: rt.id, amenityId: a.id })) })
    return rt
  }

  const [rtStd, rtDlx, rtPrm, rtSte, rtFam, rtSgl, rtTwn, rtStu, rtExe, rtPrs] = await Promise.all([
    mkType('Phòng Standard',
      'Phòng tiêu chuẩn thoải mái, đầy đủ tiện nghi cơ bản. Lý tưởng cho khách công tác ngắn ngày hoặc cặp đôi.',
      2, 899000, IMGS.std, [wifi, ac, tv, safe]),

    mkType('Phòng Deluxe',
      'Phòng cao cấp rộng rãi với ban công view thành phố. Không gian sang trọng, thích hợp cho kỳ nghỉ đặc biệt.',
      3, 1599000, IMGS.dlx, [wifi, ac, tv, minibar, balcony, safe, breakfast]),

    mkType('Phòng Premium',
      'Phòng hạng sang với nội thất cao cấp, bồn tắm đứng và hồ bơi riêng trên sân thượng tầng 5.',
      3, 5899000, IMGS.prm, [wifi, ac, tv, minibar, bathtub, balcony, safe, breakfast, pool]),

    mkType('Phòng Suite',
      'Suite 5 sao với phòng khách riêng biệt, bồn tắm Jacuzzi và view panorama toàn thành phố từ tầng cao nhất.',
      4, 4999000, IMGS.ste, [wifi, ac, tv, minibar, bathtub, balcony, safe, roomSvc, breakfast, pool]),

    mkType('Phòng Family',
      'Thiết kế đặc biệt cho gia đình với 2 phòng ngủ liên thông, góc vui chơi và khu vực sinh hoạt rộng rãi.',
      5, 3299000, IMGS.fam, [wifi, ac, tv, minibar, safe, roomSvc, breakfast]),
      
    mkType('Phòng Single',
      'Phòng nhỏ gọn tiện lợi dành cho 1 người, phù hợp khách đi công tác tiết kiệm.',
      1, 599000, IMGS.sgl, [wifi, ac, tv]),
      
    mkType('Phòng Twin',
      'Phòng 2 giường đơn rộng rãi, thích hợp cho bạn bè hoặc đồng nghiệp đi chung.',
      2, 999000, IMGS.twn, [wifi, ac, tv, safe]),
      
    mkType('Phòng Studio',
      'Phòng Studio có bếp nhỏ và khu vực ăn uống, thích hợp lưu trú dài ngày.',
      2, 1399000, IMGS.stu, [wifi, ac, tv, minibar]),
      
    mkType('Phòng Executive',
      'Phòng làm việc cao cấp, được trang bị bàn làm việc lớn, máy pha cafe, view trung tâm.',
      2, 3499000, IMGS.exe, [wifi, ac, tv, minibar, balcony, roomSvc]),
      
    mkType('Phòng President',
      'Phòng Tổng thống siêu sang, bao trọn 1 tầng, dịch vụ quản gia 24/7 và hồ bơi vô cực riêng.',
      6, 12000000, IMGS.prs, [wifi, ac, tv, minibar, bathtub, balcony, safe, roomSvc, breakfast, pool]),
  ])
  console.log('Xong: 10 hang phong voi nhieu anh Unsplash')

  // ════════════════════════════════════════════
  // 4. ROOMS — 29 phòng, mệnh giá đa dạng
  // ════════════════════════════════════════════
  console.log('Tao 29 phong...')

  const mkRoom = (typeId: number, num: string, floor: number, status = 'available') =>
    prisma.room.create({ data: { roomTypeId: typeId, roomNumber: num, floor, status: status as any, version: 0 }})

  const [
    // Tầng 1 — Standard (giá thấp nhất)
    r101, r102, r103, r104,
    // Tầng 2 — Standard + Deluxe
    r201, r202, r203, r204,
    // Tầng 3 — Deluxe
    r301, r302, r303, r304,
    // Tầng 4 — Premium
    r401, r402, r403, r404,
    // Tầng 5 — Premium cao cấp hơn
    r501, r502,
    // Tầng 6 — Suite
    r601, r602,
    // Tầng 7 — Suite penthouse
    r701,
    // Tầng 8 — Family
    r801, r802, r803,
    // Tầng 9 — Mới
    r901, r902, r903, r904, r905,
  ] = await Promise.all([
    // Tầng 1 — Standard
    mkRoom(rtStd.id, '101', 1),
    mkRoom(rtStd.id, '102', 1),
    mkRoom(rtStd.id, '103', 1, 'cleaning'),
    mkRoom(rtStd.id, '104', 1),

    // Tầng 2 — Standard + Deluxe
    mkRoom(rtStd.id, '201', 2),
    mkRoom(rtStd.id, '202', 2),
    mkRoom(rtDlx.id, '203', 2, 'occupied'),
    mkRoom(rtDlx.id, '204', 2),

    // Tầng 3 — Deluxe
    mkRoom(rtDlx.id, '301', 3),
    mkRoom(rtDlx.id, '302', 3),
    mkRoom(rtDlx.id, '303', 3),
    mkRoom(rtDlx.id, '304', 3, 'maintenance'),

    // Tầng 4 — Premium
    mkRoom(rtPrm.id, '401', 4),
    mkRoom(rtPrm.id, '402', 4),
    mkRoom(rtPrm.id, '403', 4, 'occupied'),
    mkRoom(rtPrm.id, '404', 4),

    // Tầng 5 — Premium view cao
    mkRoom(rtPrm.id, '501', 5),
    mkRoom(rtPrm.id, '502', 5),

    // Tầng 6 — Suite
    mkRoom(rtSte.id, '601', 6),
    mkRoom(rtSte.id, '602', 6),

    // Tầng 7 — Suite Penthouse
    mkRoom(rtSte.id, '701', 7),

    // Tầng 8 — Family
    mkRoom(rtFam.id, '801', 8),
    mkRoom(rtFam.id, '802', 8),
    mkRoom(rtFam.id, '803', 8),
    
    mkRoom(rtSgl.id, '901', 9),
    mkRoom(rtTwn.id, '902', 9),
    mkRoom(rtStu.id, '903', 9),
    mkRoom(rtExe.id, '904', 9),
    mkRoom(rtPrs.id, '905', 9),
  ])
  console.log('Xong: 29 phong')

  // ════════════════════════════════════════════
  // 5. PROMOTIONS
  // ════════════════════════════════════════════
  console.log('Tao 10 ma khuyen mai...')
  const [promo1, promo2, promo3, promo4, promo5, promo6, promo7, promo8, promo9, promo10] = await Promise.all([
    prisma.promotion.create({ data: { code: 'SUMMER2026', type: 'percentage', value: 10, startDate: m(1), endDate: d(30), usageLimit: 100 }}),
    prisma.promotion.create({ data: { code: 'WELCOME', type: 'fixed', value: 200000, startDate: m(6), endDate: d(365), usageLimit: 500 }}),
    prisma.promotion.create({ data: { code: 'STAY3', type: 'free_night', value: 1, minNights: 3, startDate: m(2), endDate: d(60) }}),
    prisma.promotion.create({ data: { code: 'VIP15', type: 'percentage', value: 15, startDate: m(3), endDate: d(90) }}),
    prisma.promotion.create({ data: { code: 'FLASH500K', type: 'fixed', value: 500000, minNights: 2, startDate: m(1), endDate: d(10), usageLimit: 50 }}),
    prisma.promotion.create({ data: { code: 'TET2026', type: 'percentage', value: 20, startDate: m(5), endDate: m(4), isActive: false }}),
    prisma.promotion.create({ data: { code: 'WEEKEND', type: 'percentage', value: 5, startDate: m(6), endDate: d(180) }}),
    prisma.promotion.create({ data: { code: 'FAMILY', type: 'fixed', value: 300000, minNights: 2, startDate: m(4), endDate: d(120) }}),
    prisma.promotion.create({ data: { code: 'LUCKY', type: 'percentage', value: 50, usageLimit: 10, usedCount: 10, startDate: m(1), endDate: d(30) }}),
    prisma.promotion.create({ data: { code: 'EARLYBIRD', type: 'percentage', value: 10, startDate: m(6), endDate: d(300) }}),
  ])

  // ════════════════════════════════════════════
  // 6. BOOKINGS — qua đúng luồng thật (createBooking/checkIn/checkOut/cancelBooking)
  // ════════════════════════════════════════════
  console.log('Tao bookings qua luong that...')

  const mkPay = (bookingId: number, amount: number, method: string,
    status: string, feeType: string, paidAt?: Date, refundedAt?: Date, ref?: string) =>
    prisma.payment.create({ data: {
      bookingId, amount, method: method as any, status: status as any,
      feeType: feeType as any,
      ...(paidAt && { paidAt }),
      ...(refundedAt && { refundedAt }),
      transactionRef: ref ?? `TXN-${bookingId}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
    }})

  type SeedTarget = 'pending_payment' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'

  const seedBooking = async (opts: {
    userId: number
    items: { roomTypeId: number; quantity: number }[]
    checkIn: Date
    checkOut: Date
    guestCount: number
    target: SeedTarget
    createdBy?: number
    specialRequests?: string
    promoCode?: string
    method?: 'cash' | 'card' | 'qr_code'
    cancelReason?: string
    idNumber?: string
    checkinNote?: string
    extra?: { label: string; amount: number }[]
  }) => {
    const booking = await createBooking(
      {
        items: opts.items,
        checkInDate: opts.checkIn.toISOString(),
        checkOutDate: opts.checkOut.toISOString(),
        guestCount: opts.guestCount,
        specialRequests: opts.specialRequests,
        promoCode: opts.promoCode,
      } as any,
      opts.userId
    )

    if (opts.createdBy) {
      await prisma.booking.update({ where: { id: booking.id }, data: { createdBy: opts.createdBy, source: 'offline' } })
    }

    if (opts.target === 'pending_payment') return booking

    await mkPay(booking.id, Number(booking.totalAmount), opts.method ?? 'qr_code', 'success', 'booking', opts.checkIn)
    await prisma.booking.update({ where: { id: booking.id }, data: { status: 'confirmed', paidAt: opts.checkIn } })

    if (opts.target === 'confirmed') return booking

    if (opts.target === 'cancelled') {
      const daysUntil = Math.ceil((opts.checkIn.getTime() - Date.now()) / 86400000)
      const refundAmount = daysUntil >= 3 ? Number(booking.totalAmount) : Number(booking.totalAmount) * 0.5
      const penalty = Number(booking.totalAmount) - refundAmount
      await prisma.booking.update({
        where: { id: booking.id },
        data: { status: 'cancelled', cancelledAt: new Date(), cancelReason: opts.cancelReason ?? 'Khách hàng hủy' },
      })
      const successPay = await prisma.payment.findFirst({ where: { bookingId: booking.id, status: 'success', feeType: 'booking' } })
      if (successPay) {
        await prisma.payment.update({ where: { id: successPay.id }, data: { status: 'pending_refund' } })
        if (refundAmount > 0) await mkPay(booking.id, refundAmount, 'qr_code', 'pending_refund', 'refund')
        if (penalty > 0) await mkPay(booking.id, penalty, 'qr_code', 'success', 'penalty', new Date())
      }
      return booking
    }

    const lines = await prisma.bookingRoomType.findMany({ where: { bookingId: booking.id } })
    const bookingRoomIds: number[] = []
    for (const line of lines) {
      for (let n = 0; n < line.quantity; n++) {
        const br = await checkIn(booking.id, opts.createdBy ?? 1, {
          bookingRoomTypeId: line.id,
          idNumber: opts.idNumber,
          checkinNote: opts.checkinNote,
        })
        bookingRoomIds.push(br.id)
      }
    }

    if (opts.target === 'checked_in') return booking

    for (const brId of bookingRoomIds) {
      await checkOut(booking.id, opts.createdBy ?? 1, brId, opts.extra ?? [], opts.method ?? 'cash')
      const br = await prisma.bookingRoom.findUnique({ where: { id: brId } })
      if (br) await prisma.room.update({ where: { id: br.roomId }, data: { status: 'available' } }) // seed: mô phỏng "đã dọn xong"
    }

    return booking
  }

  // ── HIỆN TẠI (demo trực tiếp) ──
  console.log('Tao 10 bookings demo hien tai...')

  const b01 = await seedBooking({
    userId: c0.id, items: [{ roomTypeId: rtDlx.id, quantity: 1 }],
    checkIn: d(-1), checkOut: d(2), guestCount: 2, target: 'checked_in',
    idNumber: '001099001234', checkinNote: 'Khách đến nhận phòng sớm 30 phút.',
  })

  const b02 = await seedBooking({
    userId: c1.id, items: [{ roomTypeId: rtDlx.id, quantity: 1 }],
    checkIn: d(1), checkOut: d(3), guestCount: 2, target: 'confirmed',
    specialRequests: 'Tầng cao, view đẹp, Giường đôi (Double bed)',
  })

  const b03 = await seedBooking({
    userId: c2.id, items: [{ roomTypeId: rtPrm.id, quantity: 1 }],
    checkIn: d(5), checkOut: d(7), guestCount: 2, target: 'pending_payment',
    specialRequests: 'Đến muộn sau 22h, Gần thang máy',
  })

  const b04 = await seedBooking({
    userId: c3.id, items: [{ roomTypeId: rtFam.id, quantity: 1 }],
    checkIn: d(3), checkOut: d(7), guestCount: 4, target: 'confirmed',
    createdBy: r1.id, method: 'cash',
  })

  const b05 = await seedBooking({
    userId: c4.id, items: [{ roomTypeId: rtDlx.id, quantity: 1 }],
    checkIn: d(2), checkOut: d(4), guestCount: 2, target: 'cancelled',
    cancelReason: 'Thay đổi kế hoạch',
  })

  const b06 = await seedBooking({
    userId: c0.id, items: [{ roomTypeId: rtSte.id, quantity: 1 }],
    checkIn: d(14), checkOut: d(17), guestCount: 2, target: 'confirmed',
  })

  const b07 = await seedBooking({
    userId: c5.id, items: [{ roomTypeId: rtPrm.id, quantity: 1 }],
    checkIn: d(10), checkOut: d(13), guestCount: 2, target: 'confirmed',
    createdBy: r2.id, method: 'card',
  })

  const b08 = await seedBooking({
    userId: c6.id, items: [{ roomTypeId: rtStd.id, quantity: 1 }],
    checkIn: d(20), checkOut: d(22), guestCount: 2, target: 'cancelled',
    cancelReason: 'Đổi địa điểm đi chơi',
  })

  const b09 = await seedBooking({
    userId: c7.id, items: [{ roomTypeId: rtFam.id, quantity: 1 }],
    checkIn: d(30), checkOut: d(35), guestCount: 5, target: 'confirmed',
  })

  // B10: MỚI — demo đúng tính năng giỏ hàng nhiều phòng
  const b10 = await seedBooking({
    userId: c8.id,
    items: [{ roomTypeId: rtDlx.id, quantity: 2 }, { roomTypeId: rtStd.id, quantity: 1 }],
    checkIn: d(8), checkOut: d(10), guestCount: 6, target: 'confirmed',
    specialRequests: 'Đặt cho nhóm bạn 6 người, muốn phòng gần nhau',
  })

  console.log('Xong: 10 bookings demo hien tai (B01-B10)')

  // ── QUÁ KHỨ (6 tháng, đơn giản hoá so với bản cũ để chạy qua service thật) ──
  console.log('Tao du lieu qua khu (6 thang)...')

  const roomTypeIds = [rtStd.id, rtDlx.id, rtPrm.id, rtSte.id, rtFam.id, rtSgl.id, rtTwn.id, rtStu.id, rtExe.id, rtPrs.id]

  let pastBookingCount = 0
  let pastReviewCount = 0

  const comments = [
    'Kỳ nghỉ tuyệt vời. Rất hài lòng!',
    'Phòng sạch sẽ, nhân viên nhiệt tình. Sẽ quay lại.',
    'Không gian sang trọng, đáng đồng tiền bát gạo.',
    'View đẹp, bữa sáng ngon. Trải nghiệm rất tốt.',
    'Tiện nghi đầy đủ, giường ngủ rất thoải mái.',
    'Dịch vụ xuất sắc, quá trình check-in/out nhanh chóng.',
  ]

  for (let monthAgo = 6; monthAgo >= 1; monthAgo--) {
    for (let i = 0; i < 18; i++) {
      const customer = customers[(monthAgo * 18 + i) % customers.length]
      const roomTypeId = roomTypeIds[i % roomTypeIds.length]
      const offsetStart = -28 + i
      const nights = (i % 3) + 1

      const b = await seedBooking({
        userId: customer.id,
        items: [{ roomTypeId, quantity: 1 }],
        checkIn: m(monthAgo, offsetStart),
        checkOut: m(monthAgo, offsetStart + nights),
        guestCount: 2,
        target: 'checked_out',
        createdBy: i % 4 === 0 ? r1.id : undefined,
        method: i % 3 === 0 ? 'cash' : 'qr_code',
        promoCode: i % 4 === 0 && nights >= 2 ? 'WELCOME' : undefined,
        extra: i % 5 === 0 ? [{ label: 'Nước suối minibar', amount: 50000 }, { label: 'Phí giặt ủi', amount: 100000 }] : undefined,
      })

      await prisma.review.create({
        data: {
          bookingId: b.id, userId: customer.id,
          rating: 4 + Math.floor(Math.random() * 2),
          comment: comments[Math.floor(Math.random() * comments.length)],
        },
      })
      pastBookingCount++
      pastReviewCount++
    }

    for (let i = 0; i < 3; i++) {
      const customer = customers[(monthAgo * 3 + i) % customers.length]
      const roomTypeId = roomTypeIds[(i + monthAgo) % roomTypeIds.length]
      const offsetStart = -20 + i * 5

      await seedBooking({
        userId: customer.id,
        items: [{ roomTypeId, quantity: 1 }],
        checkIn: m(monthAgo, offsetStart),
        checkOut: m(monthAgo, offsetStart + 2),
        guestCount: 2,
        target: 'cancelled',
        cancelReason: 'Thay đổi lịch trình',
      })
      pastBookingCount++
    }

    console.log(`   Thang -${monthAgo}: xong`)
  }

  console.log(`Xong: ${pastBookingCount} bookings qua khu + ${pastReviewCount} danh gia`)

  // ════════════════════════════════════════════
  // 7. AUDIT LOGS
  // ════════════════════════════════════════════
  console.log('Tao audit logs...')
  await prisma.auditLog.createMany({ data: [
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtStd.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Standard', basePrice: 899000 }) },
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtDlx.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Deluxe', basePrice: 1599000 }) },
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtPrm.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Premium', basePrice: 5899000 }) },
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtSte.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Suite', basePrice: 4999000 }) },
    { actorId: admin.id, targetTable: 'RoomType', targetId: rtFam.id,
      action: 'CREATE', newValue: JSON.stringify({ typeName: 'Phòng Family', basePrice: 3299000 }) },
    { actorId: admin.id, targetTable: 'Room', targetId: r304.id,
      action: 'UPDATE',
      oldValue: JSON.stringify({ status: 'available' }),
      newValue: JSON.stringify({ status: 'maintenance' }) },
    { actorId: r1.id, targetTable: 'Booking', targetId: b01.id,
      action: 'UPDATE',
      oldValue: JSON.stringify({ status: 'confirmed' }),
      newValue: JSON.stringify({ status: 'checked_in' }) },
    { actorId: r1.id, targetTable: 'Booking', targetId: b04.id,
      action: 'CREATE', newValue: JSON.stringify({ source: 'offline', totalAmount: 13196000 }) },
    { actorId: r2.id, targetTable: 'Booking', targetId: b07.id,
      action: 'CREATE', newValue: JSON.stringify({ source: 'offline', totalAmount: 19497000 }) },
    { actorId: admin.id, targetTable: 'User', targetId: c7.id,
      action: 'UPDATE',
      oldValue: JSON.stringify({ status: 'active' }),
      newValue: JSON.stringify({ status: 'active', note: 'Verified VIP customer' }) },
    { actorId: admin.id, targetTable: 'Promotion', targetId: promo1.id, action: 'CREATE', newValue: JSON.stringify({ code: 'SUMMER2026' }) },
    { actorId: admin.id, targetTable: 'Promotion', targetId: promo2.id, action: 'CREATE', newValue: JSON.stringify({ code: 'WELCOME' }) },
    { actorId: admin.id, targetTable: 'Promotion', targetId: promo3.id, action: 'CREATE', newValue: JSON.stringify({ code: 'STAY3' }) },
    { actorId: admin.id, targetTable: 'Promotion', targetId: promo4.id, action: 'CREATE', newValue: JSON.stringify({ code: 'VIP15' }) },
  ]})
  console.log('Xong: > 15 audit log entries')

  // ════════════════════════════════════════════
  // TỔNG KẾT
  // ════════════════════════════════════════════
  const revenueAgg = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: 'success', feeType: { in: ['booking', 'penalty'] } },
  })
  const totalRevenue = Number(revenueAgg._sum.amount ?? 0)

  console.log(`\nSEED HOAN TAT!\n` + '━'.repeat(58))
  console.log('TONG KET:')
  console.log(`   Users:      16 (1 admin, 3 le tan, 12 khach hang)`)
  console.log(`   Amenities:  10 tien ich`)
  console.log(`   RoomTypes:  10 hang phong (da dang gia tien)`)
  console.log(`   Rooms:      29 phong`)
  console.log(`   Promotions: 10 ma khuyen mai`)
  console.log(`   Bookings:   ~${pastBookingCount + 10} (trai dai 6 thang)`)
  console.log(`   Reviews:    ~${pastReviewCount} danh gia (4-5 sao)`)
  console.log(`   AuditLogs:  ~15 entries`)
  console.log(`   Tong DT:    ${(totalRevenue / 1000000).toFixed(1)}M VND (6 thang)`)
  console.log('━'.repeat(58))

  console.log(`\nTAI KHOAN:`)
  console.log('   Admin:   admin@hotel.com        / Admin@123')
  console.log('   Le tan:  receptionist@hotel.com / Recep@123 (+ 2 le tan khac)')
  console.log('   Khach:   customer@hotel.com     / Customer@123 (+ 11 khach khac)')

  console.log(`\nDEMO NGAY SAU SEED:`)
  console.log('   B01 -- Da check-in                -&gt; demo Check-out')
  console.log('   B02 -- Confirmed, chua gan phong cu the (gan luc check-in) -&gt; demo Check-in')
  console.log('   B03 -- Cho thanh toan             -&gt; demo QR + Simulate')
  console.log('   B04 -- Don quay, confirmed         -&gt; demo Huy offline')
  console.log('   B05 -- Huy 50% + PENDING REFUND    -&gt; demo Xac nhan hoan tien')
  console.log('   B06 -- Suite, xa ngay              -&gt; demo Huy truoc 3 ngay (hoan 100%)')
  console.log('   B10 -- Nhieu phong (2 Deluxe + 1 Standard) -&gt; demo tinh nang gio hang')
  console.log(`   Reviews -- Da tu dong tao ~${pastReviewCount} danh gia tu cac khach hang cu`)
  console.log('   Bao cao:   6 thang du lieu san sang')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
</file>

<file path="src/app.ts">
import express from 'express';
import cors from 'cors';
import { Application, Request, Response, NextFunction } from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { router } from './routes';
import { AppError } from './utils/app-error.util';

const app: Application = express();

app.set('json replacer', (_key: string, value: unknown) => {
  if (
    value !== null &&
    typeof value === 'object' &&
    value.constructor?.name === 'Decimal'
  ) {
    return Number(value);
  }
  return value;
});

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

// PHẦN 4: JSON 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint không tồn tại',
  });
});

app.use(errorMiddleware);

export default app;
</file>

<file path="src/config/cloudinary.config.ts">
import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.config';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
</file>

<file path="src/config/database.config.ts">
import { prisma } from '../utils/prisma.util';

export const testDatabaseConnection = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
</file>

<file path="src/config/env.config.ts">
import dotenv from 'dotenv';
import { z } from 'zod';

// Nạp biến môi trường từ file .env vào process.env trước khi validate
dotenv.config();

// Schema validate toàn bộ biến môi trường
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  PORT: z
    .string()
    .regex(/^\d+$/, 'PORT phải là số nguyên dương')
    .transform(Number)
    .default('3000'),

  // Database
  DATABASE_URL: z
    .string({ required_error: 'DATABASE_URL là bắt buộc' })
    .min(1, 'DATABASE_URL không được để trống'),

  // JWT
  JWT_SECRET: z
    .string({ required_error: 'JWT_SECRET là bắt buộc' })
    .min(32, 'JWT_SECRET phải có ít nhất 32 ký tự'),

  JWT_EXPIRES_IN: z
    .string()
    .default('7d'),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z
    .string({ required_error: 'CLOUDINARY_CLOUD_NAME là bắt buộc' })
    .min(1, 'CLOUDINARY_CLOUD_NAME không được để trống'),

  CLOUDINARY_API_KEY: z
    .string({ required_error: 'CLOUDINARY_API_KEY là bắt buộc' })
    .min(1, 'CLOUDINARY_API_KEY không được để trống'),

  CLOUDINARY_API_SECRET: z
    .string({ required_error: 'CLOUDINARY_API_SECRET là bắt buộc' })
    .min(1, 'CLOUDINARY_API_SECRET không được để trống'),

  EMAIL_HOST: z
    .string({ required_error: 'EMAIL_HOST là bắt buộc' })
    .min(1, 'EMAIL_HOST không được để trống'),

  EMAIL_PORT: z
    .string()
    .regex(/^\d+$/, 'EMAIL_PORT phải là số nguyên dương')
    .transform(Number)
    .default('587'),

  EMAIL_USER: z
    .string({ required_error: 'EMAIL_USER là bắt buộc' })
    .email('EMAIL_USER phải là địa chỉ email hợp lệ'),

  EMAIL_PASS: z
    .string({ required_error: 'EMAIL_PASS là bắt buộc' })
    .min(1, 'EMAIL_PASS không được để trống'),

  WEBHOOK_SECRET: z
    .string({ required_error: 'WEBHOOK_SECRET là bắt buộc' })
    .min(16, 'WEBHOOK_SECRET phải có ít nhất 16 ký tự'),

  FRONTEND_URL: z
    .string({ required_error: 'FRONTEND_URL là bắt buộc' })
    .url('FRONTEND_URL phải là URL hợp lệ')
    .default('http://localhost:5173'),
  });


const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Environment validation failed:');

  parsed.error.errors.forEach((err) => {
    console.error(`  [${err.path.join('.')}]: ${err.message}`);
  });

  console.error('Check your .env file and try again.');

  process.exit(1);
}

export const env = parsed.data;

export type Env = typeof env;
</file>

<file path="src/config/socket.config.ts">
import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { env } from '../config/env.config';

let io: SocketServer | null = null;

export const initSocket = (httpServer: HttpServer): SocketServer => {
  io = new SocketServer(httpServer, {
    cors: {
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;
    if (token) {
      try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: number; role: string };
        socket.data.userId = decoded.userId;
        socket.data.role = decoded.role;
      } catch {
        // token sai → coi như khách vãng lai, không có role
      }
    }
    next();
  });

  io.on('connection', (socket: Socket) => {
    socket.on('join:role', (role: string) => {
      // CHỈ join đúng phòng khớp với role đã xác thực từ token
      if (socket.data.role && socket.data.role === role) {
        socket.join(`role:${role}`);
      }
    });

    socket.on('join:booking', (bookingId: number) => {
      socket.join(`booking:${bookingId}`);
    });

    socket.on('disconnect', () => {

    });
  });

  return io;
};

export const getIO = (): SocketServer => {
  if (!io) {
    throw new Error('Socket.IO chưa được khởi tạo. Gọi initSocket trước.');
  }
  return io;
};
</file>

<file path="src/controllers/admin.controller.ts">
import { Request, Response } from 'express';
import { prisma } from '../utils/prisma.util';
import { successResponse } from '../utils/response.util';
import { catchAsync } from '../utils/catch-async.util';

export const searchUsers = catchAsync(async (req: Request, res: Response) => {
  const { keyword } = req.query;

  const users = await prisma.user.findMany({
    where: {
      role: 'customer', 
      OR: [
        { fullName: { contains: String(keyword) } },
        { email: { contains: String(keyword) } },
        { phoneNumber: { contains: String(keyword) } },
      ],
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
    },
    take: 10, 
  });

  successResponse(res, users, 'Tìm kiếm khách hàng thành công');
});
</file>

<file path="src/controllers/auth.controller.ts">
import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { successResponse } from '../utils/response.util';
import { catchAsync } from '../utils/catch-async.util';
import { AppError } from '../utils/app-error.util';
import { prisma } from '../utils/prisma.util';
import { uploadImage } from '../utils/cloudinary.util';

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  successResponse(res, user, 'Đăng ký thành công', 201);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  successResponse(res, result, 'Đăng nhập thành công');
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.getMe(req.user!.userId);
  successResponse(res, user, 'Lấy thông tin người dùng thành công');
});

export const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const keyword = (req.query.keyword as string) || '';

    if (keyword.trim().length < 2) {
      return successResponse(res, [], 'Từ khóa phải có ít nhất 2 ký tự');
    }

    const users = await authService.searchUsers(keyword.trim());
    return successResponse(res, users, 'Tìm kiếm người dùng thành công');
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { role, status, search } = req.query as {
    role?: string;
    status?: string;
    search?: string;
  };

  const users = await authService.getAllUsers({ role, status, search });
  successResponse(res, users, 'Lấy danh sách người dùng thành công');
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const updated = await authService.updateUser(
    Number(req.params.id),
    req.body,
    req.user!.userId
  );
  successResponse(res, updated, 'Cập nhật tài khoản thành công');
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body.email);
  successResponse(
    res,
    null,
    'Nếu email tồn tại, chúng tôi đã gửi link đặt lại mật khẩu'
  );
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body.token, req.body.password);
  successResponse(
    res,
    null,
    'Đặt lại mật khẩu thành công. Vui lòng đăng nhập.'
  );
});

// ─── HANDLER MỚI ─────────────────────────────────────────────────────────────

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const updated = await authService.updateProfile(req.user!.userId, req.body);
  successResponse(res, updated, 'Cập nhật thông tin thành công');
});

export const uploadAvatar = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) throw new AppError(400, 'Vui lòng chọn file ảnh');
  const updated = await authService.uploadAvatar(req.user!.userId, req.file);
  successResponse(res, updated, 'Cập nhật ảnh đại diện thành công');
});

export const changePassword = catchAsync(async (req: Request, res: Response) => {
  await authService.changePassword(
    req.user!.userId,
    req.body.currentPassword,
    req.body.newPassword
  );
  successResponse(res, null, 'Đổi mật khẩu thành công');
});
</file>

<file path="src/controllers/booking.controller.ts">
import { Request, Response } from 'express';
import * as bookingService from '../services/booking.service';
import { successResponse } from '../utils/response.util';
import { catchAsync } from '../utils/catch-async.util';
import { BookingStatus, BookingSource } from '@prisma/client';
import { emitBookingUpdate } from '../utils/socket.util';
import * as paymentService from '../services/payment.service';

export const createBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = await bookingService.createBooking(req.body, req.user!.userId);
  emitBookingUpdate(booking.id, { status: booking.status });
  successResponse(res, booking, 'Đặt phòng thành công', 201);
});

export const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const filter = {
    ...(req.query.status && { status: req.query.status as BookingStatus }),
  };

  const bookings = await bookingService.getMyBookings(req.user!.userId, filter);
  successResponse(res, bookings, 'Lấy danh sách đặt phòng thành công');
});

export const getBookingById = catchAsync(async (req: Request, res: Response) => {
  const booking = await bookingService.getBookingById(
    Number(req.params.id),
    req.user!.userId,
    req.user!.role
  );
  successResponse(res, booking, 'Lấy thông tin đặt phòng thành công');
});

export const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const filter = {
    ...(req.query.status && { status: req.query.status as BookingStatus }),
    ...(req.query.source && { source: req.query.source as BookingSource }),
    ...(req.query.checkInDate && { checkInDate: new Date(req.query.checkInDate as string) }),
    ...(req.query.page && { page: Number(req.query.page) }),
    ...(req.query.limit && { limit: Number(req.query.limit) }),
    ...(req.query.search && { search: req.query.search as string }),
    ...(req.query.keyword && { keyword: req.query.keyword as string }),
  };

  const result = await bookingService.getAllBookings(filter);

  successResponse(res, {
    bookings: result.bookings,
    pagination: {
      page: result.page,
      limit: filter.limit ?? 20,
      total: result.total,
      totalPages: result.totalPages,
    }
  }, 'Lấy danh sách đặt phòng thành công');
});

export const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingId = Number(req.params.id);
  
  const result = await bookingService.cancelBooking(
    bookingId,
    req.user!.userId,
    req.user!.role,
    req.body.reason
  );

  emitBookingUpdate(bookingId, { status: 'cancelled' });

  successResponse(res, result, 'Hủy đặt phòng thành công');
});

export const getRefundPreview = catchAsync(async (req: Request, res: Response) => {
  const data = await bookingService.getRefundPreview(
    Number(req.params.id),
    req.user!.userId
  );
  successResponse(res, data, 'Xem trước chính sách hoàn tiền');
});

export const checkInMultiple = catchAsync(async (req: Request, res: Response) => {
  // 1. Controller chỉ làm nhiệm vụ bóc tách Request
  const bookingId = Number(req.params.id);
  const staffId = req.user!.userId; // Lấy ID của lễ tân đang đăng nhập
  
  // 2. Chuyển toàn bộ Payload (req.body) xuống cho Service xử lý
  const result = await bookingService.checkInMultiple(
    bookingId,
    staffId,
    {
      assignments: req.body.assignments, // Mảng các phòng cần gán
      idNumber: req.body.idNumber,
      checkinNote: req.body.checkinNote,
    }
  );

  // 3. Định dạng Response trả về cho Frontend
  successResponse(res, result, 'Check-in thành công cho tất cả các phòng');
});

export const checkOut = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.checkOut(
    Number(req.params.id),
    req.user!.userId,
    Number(req.params.bookingRoomId),
    req.body.extraCharges ?? [],
    req.body.paymentMethod
  );
  successResponse(res, result, 'Check-out thành công');
});

export const createOfflineBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.createOfflineBooking(
    req.body,
    req.user!.userId
  );
  if ((result as any).id) {
    emitBookingUpdate((result as any).id, { status: (result as any).status });
  }
  successResponse(res, result, 'Tạo đơn tại quầy thành công', 201);
});

export const updateOfflineBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.updateOfflineBooking(
    Number(req.params.id),
    req.body,
    req.user!.userId
  );
  successResponse(res, result, 'Cập nhật đơn tại quầy thành công');
});

export const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = await bookingService.createReview(
    +req.params.id,
    req.user!.userId,
    req.body
  );

  successResponse(res, review, 'Gửi đánh giá thành công', 201);
});

export const getReviewsByRoomType = catchAsync(async (req: Request, res: Response) => {
  const reviews = await bookingService.getReviewsByRoomType(
    +req.params.roomTypeId,
    req.query.page ? +req.query.page : 1,
    req.query.limit ? +req.query.limit : 10
  );

  successResponse(res, reviews, 'Lấy danh sách đánh giá thành công');
});

export const confirmRefund = catchAsync(async (req: Request, res: Response) => {

  const result = await paymentService.confirmRefund(Number(req.params.id), req.user!.userId);
  
  if (result && result.bookingId) {
    emitBookingUpdate(result.bookingId, { 
      status: 'cancelled', 
      paymentStatus: 'refunded' 
    });
  }

  successResponse(res, result, 'Xác nhận hoàn tiền thành công');
});
</file>

<file path="src/controllers/hotel.controller.ts">
import { Request, Response } from 'express';
import * as hotelService from '../services/hotel.service';
import { successResponse } from '../utils/response.util';
import { catchAsync } from '../utils/catch-async.util';
import { RoomStatus } from '@prisma/client';
import { SearchAvailableDto } from '../validations/hotel.schema';
import { AppError } from '../utils/app-error.util';

// RoomType

export const getAllRoomTypes = catchAsync(async (req: Request, res: Response) => {
  const roomTypes = await hotelService.getAllRoomTypes();
  successResponse(res, roomTypes, 'Lấy danh sách loại phòng thành công');
});

export const getAllRoomTypesPublic = catchAsync(async (_req: Request, res: Response) => {
  const data = await hotelService.getAllRoomTypesPublic();
  successResponse(res, data, 'Lay danh sach hang phong thanh cong');
});

export const getRoomTypeById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.roomTypeId);

  if (isNaN(id) || id <= 0) {
    res.status(400).json({ message: 'ID loại phòng không hợp lệ' });
    return;
  }

  const roomType = await hotelService.getRoomTypeById(id);
  successResponse(res, roomType, 'Lấy thông tin loại phòng thành công');
});

export const createRoomType = catchAsync(async (req: Request, res: Response) => {
  const { amenityIds, ...data } = req.body;
  
  const parsedAmenityIds: number[] = typeof amenityIds === 'string'
    ? JSON.parse(amenityIds)
    : (Array.isArray(amenityIds) ? amenityIds.map(Number) : []);

  let files: Express.Multer.File[] = [];
  if (Array.isArray(req.files)) {
    files = req.files;
  } else if (req.files && typeof req.files === 'object') {
    files = Object.values(req.files).flat() as Express.Multer.File[];
  }
  if (req.file) {
    files.push(req.file);
  }

  const roomType = await hotelService.createRoomType(
    { ...data,
      basePrice: data.basePrice !== undefined ? Number(data.basePrice) : undefined,
      maxCapacity: data.maxCapacity !== undefined ? Number(data.maxCapacity) : undefined,
      amenityIds: parsedAmenityIds } as any,
    files,
    req.user!.userId
  );

  successResponse(res, roomType, 'Tạo loại phòng thành công', 201);
});

export const updateRoomType = catchAsync(async (req: Request, res: Response) => {
  const { version, deleteImageIds, amenityIds, ...data } = req.body;

  if (version === undefined) {
    throw new AppError(400, 'Thiếu thông tin version để kiểm tra xung đột');
  }

  const parsedDeleteImageIds: number[] = typeof deleteImageIds === 'string'
    ? JSON.parse(deleteImageIds)
    : (Array.isArray(deleteImageIds) ? deleteImageIds.map(Number) : []);

  const parsedAmenityIds: number[] = typeof amenityIds === 'string'
    ? JSON.parse(amenityIds)
    : (Array.isArray(amenityIds) ? amenityIds.map(Number) : []);

  let files: Express.Multer.File[] = [];
  if (Array.isArray(req.files)) {
    files = req.files;
  } else if (req.files && typeof req.files === 'object') {
    files = Object.values(req.files).flat() as Express.Multer.File[];
  }
  if (req.file) {
    files.push(req.file);
  }

  const updated = await hotelService.updateRoomType(
    Number(req.params.id),
    {
      ...data,
      basePrice: data.basePrice !== undefined ? Number(data.basePrice) : undefined,
      maxCapacity: data.maxCapacity !== undefined ? Number(data.maxCapacity) : undefined,
      version: Number(version),
      deleteImageIds: parsedDeleteImageIds,
      amenityIds: parsedAmenityIds,
    } as any,
    files,
    req.user!.userId
  );

  successResponse(res, updated, 'Cập nhật hạng phòng thành công');
});

export const deleteRoomType = catchAsync(async (req: Request, res: Response) => {
  await hotelService.deleteRoomType(Number(req.params.id), req.user!.userId);
  successResponse(res, null, 'Xóa loại phòng thành công');
});

//Room 

export const getRooms = catchAsync(async (req: Request, res: Response) => {
  const floor = Number(req.query.floor);
  const roomTypeId = Number(req.query.roomTypeId);

  const filter = {
    ...(req.query.status && { status: req.query.status as RoomStatus }),
    ...(req.query.floor != null && !isNaN(floor) && { floor }),
    ...(req.query.roomTypeId != null && !isNaN(roomTypeId) && { roomTypeId }),
  };
  
  const rooms = await hotelService.getRooms(filter);
  successResponse(res, rooms, 'Lấy danh sách phòng thành công');
});

export const createRoom = catchAsync(async (req: Request, res: Response) => {
  const room = await hotelService.createRoom(req.body, req.user!.userId);
  successResponse(res, room, 'Tạo phòng thành công', 201);
});

export const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const room = await hotelService.updateRoom(
    Number(req.params.id),
    req.body,
    req.user!.userId
  );
  successResponse(res, room, 'Cập nhật phòng thành công');
});

export const updateRoomStatus = catchAsync(async (req: Request, res: Response) => {
  const { status, version } = req.body;
  
  if (version === undefined) {
    throw new AppError(400, 'Thiếu version');
  }
  
  const updated = await hotelService.updateRoomStatus(
    Number(req.params.id),
    status,
    Number(version),
    req.user!.userId
  );
  
  successResponse(res, updated, 'Cập nhật trạng thái phòng thành công');
});

export const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  await hotelService.deleteRoom(Number(req.params.id), req.user!.userId);
  successResponse(res, null, 'Xóa phòng thành công');
});

//Search

export const searchAvailable = catchAsync(async (req: Request, res: Response) => {
  const results = await hotelService.searchAvailable(
    req.query as unknown as SearchAvailableDto
  );

  if (results.length === 0) {
    successResponse(res, [], 'Rất tiếc, không có phòng nào phù hợp với tìm kiếm của bạn');
    return;
  }

  successResponse(res, results, 'Tìm kiếm phòng thành công');
});

//Amenity 

export const getAmenities = catchAsync(async (req: Request, res: Response) => {
  const amenities = await hotelService.getAmenities();
  successResponse(res, amenities, 'Lấy danh sách tiện ích thành công');
});

export const createAmenity = catchAsync(async (req: Request, res: Response) => {
  const amenity = await hotelService.createAmenity(req.body, req.user!.userId);
  successResponse(res, amenity, 'Tạo tiện ích thành công', 201);
});

export const updateAmenity = catchAsync(async (req: Request, res: Response) => {
  const amenity = await hotelService.updateAmenity(
    Number(req.params.id),
    req.body,
    req.user!.userId
  );
  successResponse(res, amenity, 'Cập nhật tiện ích thành công');
});

export const deleteAmenity = catchAsync(async (req: Request, res: Response) => {
  await hotelService.deleteAmenity(Number(req.params.id), req.user!.userId);
  successResponse(res, null, 'Xóa tiện ích thành công');
});

// Dashboard / Sơ đồ phòng 
export const getRoomOverview = catchAsync(async (req: Request, res: Response) => {
  const rooms = await hotelService.getRoomOverview();
  successResponse(res, rooms, 'Lấy sơ đồ phòng tổng quan thành công');
});
</file>

<file path="src/controllers/payment.controller.ts">
import { Request, Response } from 'express';
import * as paymentService from '../services/payment.service';
import { successResponse } from '../utils/response.util';
import { AppError } from '../utils/app-error.util';
import { catchAsync } from '../utils/catch-async.util';
import { env } from '../config/env.config';

export const initiatePayment = catchAsync(async (req: Request, res: Response) => {
  const data = await paymentService.initiatePayment(
    req.body.bookingId,
    req.user!.userId
  );
  successResponse(res, data, 'Khởi tạo thanh toán thành công');
});

export const getPaymentStatus = catchAsync(async (req: Request, res: Response) => {
  const data = await paymentService.getPaymentStatus(
    Number(req.params.bookingId),
    req.user!.userId
  );
  successResponse(res, data, 'Lấy trạng thái thanh toán thành công');
});

export const simulateSuccess = catchAsync(async (req: Request, res: Response) => {
  // Chỉ cho phép giả lập thanh toán ở môi trường development
  if (env.NODE_ENV === 'production') {
    throw new AppError(403, 'Không cho phép trong môi trường production');
  }

  const data = await paymentService.simulateSuccess(req.body.transactionRef);
  successResponse(res, data, 'Giả lập thanh toán thành công');
});

export const simulateFailure = catchAsync(async (req: Request, res: Response) => {
  // Chỉ cho phép giả lập thanh toán ở môi trường development
  if (env.NODE_ENV === 'production') {
    throw new AppError(403, 'Không cho phép trong môi trường production');
  }

  const data = await paymentService.simulateFailure(req.body.transactionRef);
  successResponse(res, data, 'Giả lập thanh toán thất bại');
});
</file>

<file path="src/controllers/promotion.controller.ts">
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { catchAsync } from '../utils/catch-async.util';
import { successResponse } from '../utils/response.util';
import { env } from '../config/env.config';
import { BookingStatus } from '@prisma/client';

export const validatePromotion = catchAsync(async (req: Request, res: Response) => {
  const code = (req.query.code as string)?.toUpperCase().trim();
  
  // Lấy userId nếu có token truyền lên (hỗ trợ cả khách chưa đăng nhập)
  let userId: number | undefined;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as any;
      userId = decoded.userId;
    } catch (e) {
      // Bỏ qua nếu token không hợp lệ (người dùng chưa đăng nhập)
    }
  }

  if (!code) throw new AppError(400, 'Vui lòng nhập mã ưu đãi');

  const promo = await prisma.promotion.findUnique({ where: { code } });

  if (!promo || !promo.isActive) {
    throw new AppError(400, 'Mã ưu đãi không hợp lệ hoặc đã bị khóa.');
  }

  const now = new Date();
  if (now < promo.startDate || now > promo.endDate) {
    throw new AppError(400, 'Mã ưu đãi đã hết hạn hoặc chưa đến thời gian áp dụng.');
  }

  if (promo.usageLimit !== null && promo.usedCount >= promo.usageLimit) {
    throw new AppError(400, 'Mã ưu đãi đã hết lượt sử dụng.');
  }

  if (userId) {
    const hasUsed = await prisma.booking.findFirst({
      where: { userId, promotionId: promo.id, status: { notIn: ['cancelled'] as BookingStatus[] } },
    });
    if (hasUsed) throw new AppError(400, 'Bạn đã sử dụng mã ưu đãi này trước đó rồi.');
  }

  successResponse(res, promo, 'Mã ưu đãi hợp lệ');
});

export const getAllPromotions = catchAsync(async (req: Request, res: Response) => {
  const promotions = await prisma.promotion.findMany({
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, promotions, 'Lấy danh sách ưu đãi thành công');
});

export const getPublicPromotions = catchAsync(async (req: Request, res: Response) => {
  const promotions = await prisma.promotion.findMany({
    where: {
      isActive: true,
      endDate: { gte: new Date() }, // Chỉ lấy các mã chưa quá hạn
    },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, promotions, 'Lấy danh sách ưu đãi công khai thành công');
});

export const createPromotion = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  
  if (!data || !data.code || typeof data.code !== 'string') {
    throw new AppError(400, 'Vui lòng nhập mã ưu đãi hợp lệ');
  }

  const code = data.code.toUpperCase().trim();
  const existing = await prisma.promotion.findUnique({ where: { code } });
  if (existing) throw new AppError(400, 'Mã ưu đãi này đã tồn tại');

  const promotion = await prisma.promotion.create({
    data: {
      code,
      type: data.type,
      value: data.value,
      minNights: data.minNights,
      usageLimit: data.usageLimit,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      isActive: data.isActive ?? true,
    },
  });

  successResponse(res, promotion, 'Tạo mã ưu đãi thành công', 201);
});

export const updatePromotion = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;

  const existing = await prisma.promotion.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Không tìm thấy mã ưu đãi');

  if (data.code && typeof data.code === 'string' && data.code.toUpperCase().trim() !== existing.code) {
    const code = data.code.toUpperCase().trim();
    const codeExists = await prisma.promotion.findUnique({ where: { code } });
    if (codeExists) throw new AppError(400, 'Mã ưu đãi này đã tồn tại');
  }

  const promotion = await prisma.promotion.update({
    where: { id },
    data: {
      ...(data.code && typeof data.code === 'string' && { code: data.code.toUpperCase().trim() }),
      ...(data.type && { type: data.type }),
      ...(data.value !== undefined && { value: data.value }),
      ...(data.minNights !== undefined && { minNights: data.minNights }),
      ...(data.usageLimit !== undefined && { usageLimit: data.usageLimit }),
      ...(data.startDate && { startDate: new Date(data.startDate) }),
      ...(data.endDate && { endDate: new Date(data.endDate) }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
    },
  });

  successResponse(res, promotion, 'Cập nhật mã ưu đãi thành công');
});

export const togglePromotion = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const existing = await prisma.promotion.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Không tìm thấy mã ưu đãi');

  const promotion = await prisma.promotion.update({
    where: { id },
    data: { isActive: !existing.isActive },
  });

  successResponse(res, promotion, `${promotion.isActive ? 'Khóa' : 'Mở khóa'} mã ưu đãi thành công`);
});

export const deletePromotion = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const existing = await prisma.promotion.findUnique({ 
    where: { id },
    include: { _count: { select: { bookings: true } } }
  });

  if (!existing) throw new AppError(404, 'Không tìm thấy mã ưu đãi');

  if (existing._count.bookings > 0) {
    throw new AppError(400, 'Không thể xóa mã ưu đãi đã có lượt sử dụng. Vui lòng chọn Khóa mã thay vì xóa.');
  }

  await prisma.promotion.delete({ where: { id } });

  successResponse(res, null, 'Xóa mã ưu đãi thành công');
});
</file>

<file path="src/controllers/report.controller.ts">
import { Request, Response } from 'express';
import * as reportService from '../services/report.service';
import { successResponse } from '../utils/response.util';
import { AppError } from '../utils/app-error.util';
import { catchAsync } from '../utils/catch-async.util';

export const getRevenueReport = catchAsync(async (req: Request, res: Response) => {
  const { from, to } = req.query as { from?: string; to?: string };

  if (!from || !to) {
    throw new AppError(400, 'Vui lòng cung cấp from và to');
  }

  const data = await reportService.getRevenueReport(from, to);
  successResponse(res, data, 'Lấy báo cáo doanh thu thành công');
});

export const getRefundList = catchAsync(async (_req: Request, res: Response) => {
  const data = await reportService.getRefundList();
  successResponse(res, data, 'Lay danh sach hoan tien thanh cong');
});
</file>

<file path="src/jobs/cancel-expired-bookings.job.ts">
import * as cron from 'node-cron';
import { prisma } from '../utils/prisma.util';
import { createAuditLog } from '../utils/audit-log.util';
import { logger } from '../utils/logger.util';
import { emitBookingUpdate } from '../utils/socket.util';

const PAYMENT_EXPIRY_MINUTES = 15;
const CANCEL_REASON = 'Hết thời gian thanh toán';
const SYSTEM_ACTOR_ID = 0; 

const cancelExpiredBookings = async (): Promise<void> => {
  const expiryThreshold = new Date(
    Date.now() - PAYMENT_EXPIRY_MINUTES * 60 * 1000
  );

  const expiredBookings = await prisma.booking.findMany({
    where: {
      status: 'pending_payment',
      createdAt: { lt: expiryThreshold },
    },
  });

  if (expiredBookings.length === 0) return;

  const now = new Date();
  let cancelledCount = 0;

  for (const booking of expiredBookings) {
    try {
      let updatedBooking; 

      await prisma.$transaction(async (tx) => {
        updatedBooking = await tx.booking.update({
          where: { id: booking.id },
          data: {
            status: 'cancelled',
            cancelledAt: now,
            cancelReason: CANCEL_REASON,
          },
        });

       
        await createAuditLog({
          tx,
          actorId: 1,
          targetTable: 'Booking',
          targetId: booking.id,
          action: 'UPDATE',
          oldValue: booking,
          newValue: updatedBooking,
        });
      });

      if (updatedBooking) {
        emitBookingUpdate(booking.id, {
          status: 'cancelled',
        });
      }

      cancelledCount++;
    } catch (error) {
      logger.error(`Lỗi hủy booking #${booking.id}:`, error);
    }
  }

  logger.info(`Đã tự động hủy ${cancelledCount} booking hết hạn thanh toán`);
};

export const startCancelExpiredBookingsJob = (): void => {
  cron.schedule('* * * * *', async () => {
    try {
      await cancelExpiredBookings();
    } catch (error) {
      logger.error('Lỗi khi chạy job hủy booking hết hạn:', error);
    }
  });

  logger.info('Cronjob: Cancel expired bookings đã được khởi động');
};
</file>

<file path="src/middlewares/auth.middleware.ts">
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { env } from '../config/env.config';
import { AppError } from '../utils/app-error.util';

interface JwtPayload {
  userId: number;
  role: string;
}

export const authenticateJWT = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(401, 'Không tìm thấy token xác thực');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch {
    throw new AppError(401, 'Token không hợp lệ hoặc đã hết hạn');
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError(403, 'Bạn không có quyền thực hiện thao tác này');
    }
    next();
  };
};
</file>

<file path="src/middlewares/error.middleware.ts">
import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { AppError } from '../utils/app-error.util';
import { logger } from '../utils/logger.util';
import { env } from '../config/env.config';

const isDevelopment = env.NODE_ENV === 'development';

const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError): { statusCode: number; message: string } => {
  switch (err.code) {
    case 'P2002':
      return { statusCode: 409, message: 'Dữ liệu đã tồn tại' };
    case 'P2025':
      return { statusCode: 404, message: 'Không tìm thấy dữ liệu' };
    default:
      return { statusCode: 400, message: 'Lỗi truy vấn dữ liệu' };
  }
};

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    // Lỗi nghiệp vụ có kiểm soát, chỉ warn không error
    logger.warn(`[${err.statusCode}] ${err.message}`);
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(isDevelopment && { stack: err.stack }),
    });
    return;
  }

  if (err instanceof ZodError) {
    // Lỗi validation đầu vào, mức độ thấp nhất
    logger.warn(`[400] Zod validation failed`);
    res.status(400).json({
      success: false,
      message: 'Dữ liệu đầu vào không hợp lệ',
      errors: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const { statusCode, message } = handlePrismaError(err);
    logger.warn(`[${statusCode}] Prisma error code: ${err.code}`);
    res.status(statusCode).json({
      success: false,
      message,
      ...(isDevelopment && { prismaCode: err.code, stack: err.stack }),
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    logger.warn('[422] Prisma validation error');
    res.status(422).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      ...(isDevelopment && { stack: err.stack }),
    });
    return;
  }

  // Lỗi không xác định, log ở mọi môi trường để không bị mất dấu vết trên production
  logger.error('[500] Unexpected error:', err);
  res.status(500).json({
    success: false,
    message: 'Lỗi hệ thống',
    ...(isDevelopment && {
      stack: err instanceof Error ? err.stack : String(err),
    }),
  });
};
</file>

<file path="src/middlewares/validate.middleware.ts">
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

const validate = (schema: ZodSchema, source: 'body' | 'query' | 'params') => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      req[source] = await schema.parseAsync(req[source]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('--- ZOD ERROR DETAILS ---');
        console.log(JSON.stringify(error.errors, null, 2));
      }
      next(error);
    }
  };
};

export const validateBody = (schema: ZodSchema) => validate(schema, 'body');
export const validateQuery = (schema: ZodSchema) => validate(schema, 'query');
export const validateParams = (schema: ZodSchema) => validate(schema, 'params');
</file>

<file path="src/routes/admin.routes.ts">
import { Router } from 'express';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import * as adminController from '../controllers/admin.controller';

const router = Router();

router.get(
  '/users',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  adminController.searchUsers
);



export default router;
</file>

<file path="src/routes/auth.route.ts">
import { Router } from 'express';
import multer from 'multer';
import * as authController from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import { 
  registerSchema, 
  loginSchema,
  forgotPasswordSchema, 
  resetPasswordSchema,
  updateProfileSchema,
  changePasswordSchema,
} from '../validations/auth.schema';
import path from 'path';
import fs from 'fs';

const router = Router();
const uploadDir = path.join(__dirname, '../../uploads'); 

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const uploadAvatar = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    file.mimetype.startsWith('image/')
      ? cb(null, true)
      : cb(new Error('Chỉ chấp nhận file ảnh'));
  },
}).single('avatar');

router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.get('/me', authenticateJWT, authController.getMe);

router.get(
  '/admin/users',
  authenticateJWT,
  authorizeRole(['admin']),
  authController.getAllUsers
);

router.get(
  '/admin/users/search',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  authController.searchUsers
);

router.patch(
  '/admin/users/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  authController.updateUser
);

//Forgot & Reset Password 

router.post(
  '/forgot-password',
  validateBody(forgotPasswordSchema), 
  authController.forgotPassword
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema), 
  authController.resetPassword
);

//Profile Routes

router.put(
  '/profile',
  authenticateJWT,
  validateBody(updateProfileSchema),
  authController.updateProfile
);

router.post(
  '/profile/avatar',
  authenticateJWT,
  uploadAvatar,
  authController.uploadAvatar
);

router.put(
  '/profile/password',
  authenticateJWT,
  validateBody(changePasswordSchema),
  authController.changePassword
);

export default router;
</file>

<file path="src/routes/booking.route.ts">
import { Router } from 'express';
import * as bookingController from '../controllers/booking.controller';
import * as reportController from '../controllers/report.controller';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import { validateBody, validateQuery } from '../middlewares/validate.middleware';
import {
  createBookingSchema,
  createOfflineBookingSchema,
  updateOfflineBookingSchema,
  getAllBookingsQuerySchema,
  createReviewSchema,
  checkInMultipleSchema,
  checkOutRoomSchema,
} from '../validations/booking.schema';

const router = Router();

//Hotels: Public Reviews

router.get(
  '/hotels/:roomTypeId/reviews',
  bookingController.getReviewsByRoomType
);

// Customer: Bookings & Reviews 

router.get('/bookings/my', authenticateJWT, bookingController.getMyBookings);

router.post(
  '/bookings',
  authenticateJWT,
  authorizeRole(['customer']),
  validateBody(createBookingSchema),
  bookingController.createBooking
);

router.get(
  '/bookings/:id/refund-preview',
  authenticateJWT,
  authorizeRole(['customer']),
  bookingController.getRefundPreview
);

router.get('/bookings/:id', authenticateJWT, bookingController.getBookingById);

router.patch(
  '/bookings/:id/cancel',
  authenticateJWT,
  bookingController.cancelBooking
);

router.post(
  '/bookings/:id/review',
  authenticateJWT,
  authorizeRole(['customer']),
  validateBody(createReviewSchema),
  bookingController.createReview
);

//Admin: Bookings 

router.get(
  '/admin/bookings',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  validateQuery(getAllBookingsQuerySchema),
  bookingController.getAllBookings
);

router.post(
  '/admin/bookings',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  validateBody(createOfflineBookingSchema),
  bookingController.createOfflineBooking
);

router.patch(
  '/admin/bookings/:id',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  validateBody(updateOfflineBookingSchema),
  bookingController.updateOfflineBooking
);

router.patch(
  '/admin/bookings/:id/checkin',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  validateBody(checkInMultipleSchema),
  bookingController.checkInMultiple
);

router.patch(
  '/admin/bookings/:id/rooms/:bookingRoomId/checkout',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  validateBody(checkOutRoomSchema),
  bookingController.checkOut
);

router.patch(
  '/admin/bookings/:id/cancel',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  bookingController.cancelBooking
);

router.get(
  '/admin/bookings/:id',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  bookingController.getBookingById
);

// Admin: Refunds & Reports

router.get(
  '/admin/refunds',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  reportController.getRefundList
);

router.get(
  '/admin/reports/revenue',
  authenticateJWT,
  authorizeRole(['admin']),
  reportController.getRevenueReport
);

router.patch(
  '/admin/payments/:id/confirm-refund',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  bookingController.confirmRefund
);

export default router;
</file>

<file path="src/routes/hotel.route.ts">
import { Router } from 'express';
import multer from 'multer';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import { validateBody, validateQuery } from '../middlewares/validate.middleware';
import {
  roomTypeSchema,
  roomSchema,
  amenitySchema,
  searchAvailableSchema,
  updateRoomStatusSchema,
} from '../validations/hotel.schema';
import * as hotelController from '../controllers/hotel.controller';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file jpeg, png, webp'), false);
    }
  },
}) as any;

//  Public Routes 

router.get(
  '/hotels/available',
  validateQuery(searchAvailableSchema),
  hotelController.searchAvailable
);

router.get('/hotels/room-types', hotelController.getAllRoomTypesPublic);

router.get('/hotels/:roomTypeId', hotelController.getRoomTypeById);

router.get('/hotels', hotelController.getAllRoomTypes);

//Admin - Room Types

router.get(
  '/admin/room-types',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  hotelController.getAllRoomTypes
);

router.post(
  '/admin/room-types',
  authenticateJWT,
  authorizeRole(['admin']),
  upload.array('images', 10),
  validateBody(roomTypeSchema),
  hotelController.createRoomType
);

router.put(
  '/admin/room-types/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  upload.array('images', 10),
  validateBody(roomTypeSchema),
  hotelController.updateRoomType
);

router.delete(
  '/admin/room-types/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  hotelController.deleteRoomType
);

//Admin - Rooms (QUẢN LÝ PHÒNG)

router.get(
  '/admin/rooms',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  hotelController.getRooms
);
 // ROUTE SƠ ĐỒ PHÒNG (DASHBOARD)
router.get(
  '/admin/rooms/overview',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  hotelController.getRoomOverview
);

router.post(
  '/admin/rooms',
  authenticateJWT,
  authorizeRole(['admin']),
  validateBody(roomSchema),
  hotelController.createRoom
);

router.put(
  '/admin/rooms/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  validateBody(roomSchema),
  hotelController.updateRoom
);

router.patch(
  '/admin/rooms/:id/status',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  validateBody(updateRoomStatusSchema),
  hotelController.updateRoomStatus
);

router.delete(
  '/admin/rooms/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  hotelController.deleteRoom
);

//Admin - Amenities (TIỆN ÍCH) 

router.get(
  '/admin/amenities',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  hotelController.getAmenities
);

router.post(
  '/admin/amenities',
  authenticateJWT,
  authorizeRole(['admin']),
  validateBody(amenitySchema),
  hotelController.createAmenity
);

router.delete(
  '/admin/amenities/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  hotelController.deleteAmenity
);

export default router;
</file>

<file path="src/routes/index.ts">

</file>

<file path="src/routes/payment.route.ts">
import { Router } from 'express';
import * as paymentController from '../controllers/payment.controller';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { initiatePaymentSchema, simulatePaymentSchema } from '../validations/payment.schema';

const router = Router();

router.post(
  '/payments/initiate',
  authenticateJWT,
  authorizeRole(['customer']),
  validateBody(initiatePaymentSchema),
  paymentController.initiatePayment
);

router.get(
  '/payments/:bookingId/status',
  authenticateJWT,
  paymentController.getPaymentStatus
);

router.post(
  '/payments/simulate-success',
  validateBody(simulatePaymentSchema),
  paymentController.simulateSuccess
);

router.post(
  '/payments/simulate-failure',
  validateBody(simulatePaymentSchema), 
  paymentController.simulateFailure
);

export default router;
</file>

<file path="src/routes/promotion.route.ts">
import { Router } from 'express';
import * as promotionController from '../controllers/promotion.controller';
import { authenticateJWT, authorizeRole } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { createPromotionSchema, updatePromotionSchema } from '../validations/promotion.schema';

const router = Router();

router.get('/public', promotionController.getPublicPromotions);

router.get('/validate', promotionController.validatePromotion);

//Admin Routes
router.get(
  '/',
  authenticateJWT,
  authorizeRole(['admin', 'receptionist']),
  promotionController.getAllPromotions
);

router.post(
  '/',
  authenticateJWT,
  authorizeRole(['admin']),
  validateBody(createPromotionSchema),
  promotionController.createPromotion
);

router.put(
  '/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  validateBody(updatePromotionSchema),
  promotionController.updatePromotion
);

router.patch(
  '/:id/toggle',
  authenticateJWT,
  authorizeRole(['admin']),
  promotionController.togglePromotion
);

router.delete(
  '/:id',
  authenticateJWT,
  authorizeRole(['admin']),
  promotionController.deletePromotion
);

export default router;
</file>

<file path="src/server.ts">
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
</file>

<file path="src/services/auth.service.ts">
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { UserRole, UserStatus } from '@prisma/client';
import { generateToken } from '../utils/jwt.util';
import { RegisterDto, LoginDto } from '../validations/auth.schema';
import { createAuditLog } from '../utils/audit-log.util';
import { sendResetPasswordEmail } from '../utils/email.util';
import { env } from '../config/env.config';

const SALT_ROUNDS = 10;

const excludePassword = (user: { passwordHash: string; [key: string]: unknown }) => {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

export const register = async (data: RegisterDto) => {
  const email = data.email.toLowerCase();

  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phoneNumber: data.phoneNumber }],
    },
  });

  if (existing) {
    throw new AppError(409, 'Email hoặc số điện thoại này đã được đăng ký');
  }

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email,
      phoneNumber: data.phoneNumber,
      passwordHash,
      role: 'customer',
    },
  });

  return excludePassword(user);
};

export const login = async (data: LoginDto) => {
  const { identifier, password } = data;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier.toLowerCase() },
        { phoneNumber: identifier },
      ],
    },
  });

  if (!user) {
    throw new AppError(404, 'Tài khoản không tồn tại trong hệ thống');
  }

  if (user.status === 'inactive') {
    throw new AppError(403, 'Tài khoản của bạn hiện đang bị khóa');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError(401, 'Mật khẩu không chính xác');
  }

  const token = generateToken({ userId: user.id, role: user.role });

  return {
    token,
    user: excludePassword(user),
  };
};

export const getMe = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(404, 'Không tìm thấy người dùng');
  }

  return excludePassword(user);
};

export const searchUsers = async (keyword: string) => {
  return prisma.user.findMany({
    where: {
      role: 'customer',
      status: 'active',
      OR: [
        { fullName: { contains: keyword } },
        { email: { contains: keyword } },
        { phoneNumber: { contains: keyword } },
      ],
    },
    take: 10,
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
    },
  });
};

export const getAllUsers = async (filter?: {
  role?: string;
  status?: string;
  search?: string;
}) => {
  const validRole = filter?.role && Object.values(UserRole).includes(filter.role as UserRole) ? (filter.role as UserRole) : undefined;
  const validStatus = filter?.status && Object.values(UserStatus).includes(filter.status as UserStatus) ? (filter.status as UserStatus) : undefined;

  return prisma.user.findMany({
    where: {
      ...(validRole && { role: validRole }),
      ...(validStatus && { status: validStatus }),
      ...(filter?.search && {
        OR: [
          { fullName: { contains: filter.search } },
          { email: { contains: filter.search } },
          { phoneNumber: { contains: filter.search } },
        ],
      }),
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const updateUser = async (
  userId: number,
  data: { role?: string; status?: string },
  actorId: number
) => {
  if (data.role && !Object.values(UserRole).includes(data.role as UserRole)) {
    throw new AppError(400, 'Vai trò không hợp lệ');
  }
  if (data.status && !Object.values(UserStatus).includes(data.status as UserStatus)) {
    throw new AppError(400, 'Trạng thái không hợp lệ');
  }

  const existing = await prisma.user.findUnique({ where: { id: userId } });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy người dùng');
  }

  if (userId === actorId) {
    throw new AppError(400, 'Không thể chỉnh sửa tài khoản của chính mình');
  }

  return prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({
      where: { id: userId },
      data: {
        ...(data.role && { role: data.role as UserRole }),
        ...(data.status && { status: data.status as UserStatus }),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'User',
      targetId: userId,
      action: 'UPDATE',
      oldValue: { role: existing.role, status: existing.status },
      newValue: { role: updated.role, status: updated.status },
    });

    return updated;
  });
};

export const forgotPassword = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) return; // Bảo mật: Không báo lỗi nếu email không tồn tại để chống dò quét email

  // 1. Tạo Token gốc (Gửi cho user)
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // 2. Tạo Hashed Token (Lưu vào DB)
  // Giải thích dòng này: Dùng thuật toán sha256 -> đưa resetToken vào -> xuất ra chuỗi dạng hex
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
  const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 phút

  // 3. Lưu chuỗi ĐÃ BĂM vào database
  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: hashedToken, resetTokenExpiry: expiry },
  });

  // 4. Gửi URL chứa chuỗi GỐC (resetToken) cho User qua email
  const resetLink = `${env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
  await sendResetPasswordEmail(user.email, user.fullName, resetLink);
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await prisma.user.findFirst({
    where: {
      resetToken: hashedToken,
      resetTokenExpiry: { gt: new Date() },
    },
  });

  if (!user) throw new AppError(400, 'Token không hợp lệ hoặc đã hết hạn');

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });
};

//CÁC HÀM CẬP NHẬT PROFILE 

export const updateProfile = async (
  userId: number,
  data: { fullName?: string; phoneNumber?: string }
) => {
  if (data.phoneNumber) {
    const exists = await prisma.user.findFirst({
      where: { phoneNumber: data.phoneNumber, id: { not: userId } },
    });
    if (exists) {
      throw new AppError(409, 'Số điện thoại đã được dùng bởi tài khoản khác');
    }
  }

  return prisma.user.update({
    where: { id: userId },
    data: { ...data },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      role: true,
      status: true,
      avatarUrl: true,
    },
  });
};

export const uploadAvatar = async (
  userId: number,
  file: Express.Multer.File
) => {
  const b64 = Buffer.from(file.buffer).toString('base64');
  const dataURI = "data:" + file.mimetype + ";base64," + b64;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: 'hotel-booking/avatars',
    transformation: [
      { width: 200, height: 200, crop: 'fill', gravity: 'face' },
    ],
  });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.avatarUrl) {
    const publicId = user.avatarUrl.split('/').pop()?.split('.')[0];
    if (publicId) {
      await cloudinary.uploader
        .destroy(`hotel-booking/avatars/${publicId}`)
        .catch(() => {});
    }
  }

  return prisma.user.update({
    where: { id: userId },
    data: { avatarUrl: result.secure_url },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      role: true,
      status: true,
      avatarUrl: true,
    },
  });
};

export const changePassword = async (
  userId: number,
  currentPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(404, 'Không tìm thấy người dùng');

  const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isMatch) throw new AppError(400, 'Mật khẩu hiện tại không đúng');

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: await bcrypt.hash(newPassword, 10) },
  });
};
</file>

<file path="src/services/booking.service.ts">
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { createAuditLog } from '../utils/audit-log.util';
import { Prisma, BookingStatus, BookingSource, RoomStatus } from '@prisma/client';
import { sendCancellationEmail } from '../utils/email.util';
import { CreateBookingDto, CreateOfflineBookingDto, CheckInMultipleDto } from '../validations/booking.schema';
import { emitBookingUpdate } from '../utils/socket.util';

const PAYMENT_EXPIRY_MINUTES = 15;
const MS_PER_DAY = 86400000;

// Thêm ngay dưới HOTEL_TZ_OFFSET, dùng chung cho cả file
const toDateOnly = (value: string) => value.split('T')[0];

export const createBooking = async (data: CreateBookingDto, userId: number) => {
  // Sửa lỗi Timezone: Áp cứng múi giờ GMT+7
  const HOTEL_TZ_OFFSET = '+07:00'; 
  const checkInDate = new Date(`${toDateOnly(data.checkInDate)}T14:00:00${HOTEL_TZ_OFFSET}`);
  const checkOutDate = new Date(`${toDateOnly(data.checkOutDate)}T12:00:00${HOTEL_TZ_OFFSET}`);

  const excludedRoomStatuses = Object.values(RoomStatus).filter((s) =>
    ['maintenance', 'out_of_order', 'outoforder'].includes(s.toLowerCase())
  );

  const excludedBookingStatuses = Object.values(BookingStatus).filter((s) =>
    s.toLowerCase() === 'cancelled'
  );

  const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / MS_PER_DAY);

  return prisma.$transaction(async (tx) => {
    const sortedItems = [...data.items].sort((a, b) => a.roomTypeId - b.roomTypeId);

    let totalAmount = 0;
    const roomTypeLinesData: { roomTypeId: number; quantity: number; priceAtBooking: number }[] = [];

    for (const item of sortedItems) {
      const roomType = await tx.roomType.findUnique({ where: { id: item.roomTypeId } });
      if (!roomType) {
        throw new AppError(404, `Không tìm thấy loại phòng #${item.roomTypeId}`);
      }

      await tx.$executeRaw`SELECT room_type_id FROM ROOM_TYPE WHERE room_type_id = ${item.roomTypeId} FOR UPDATE`;

      const totalRooms = await tx.room.count({
        where: { roomTypeId: item.roomTypeId, status: { notIn: excludedRoomStatuses as any } },
      });

      const reserved = await tx.bookingRoomType.aggregate({
        _sum: { quantity: true },
        where: {
          roomTypeId: item.roomTypeId,
          booking: {
            status: { notIn: excludedBookingStatuses as any },
            checkInDate: { lt: checkOutDate },
            checkOutDate: { gt: checkInDate },
          },
        },
      });

      const available = totalRooms - (reserved._sum.quantity ?? 0);
      if (available < item.quantity) {
        throw new AppError(
          409,
          `Loại phòng "${roomType.typeName}" chỉ còn ${Math.max(0, available)} phòng trống cho khoảng ngày này`
        );
      }

      const basePrice = Number(roomType.basePrice);
      totalAmount += basePrice * nights * item.quantity;
      roomTypeLinesData.push({ roomTypeId: item.roomTypeId, quantity: item.quantity, priceAtBooking: basePrice });
    }

    let discountAmount = 0;
    let appliedPromotionId: number | null = null;

    if (data.promoCode) {
      const code = data.promoCode.toUpperCase().trim();
      const promo = await tx.promotion.findUnique({ where: { code } });

      if (!promo || !promo.isActive) throw new AppError(400, 'Mã ưu đãi không hợp lệ hoặc đã bị khóa.');
      const now = new Date();
      if (now < promo.startDate || now > promo.endDate) throw new AppError(400, 'Mã ưu đãi đã hết hạn.');
      if (promo.usageLimit !== null && promo.usedCount >= promo.usageLimit) throw new AppError(400, 'Mã ưu đãi đã hết lượt.');
      if (promo.minNights && nights < promo.minNights) throw new AppError(400, `Cần đặt tối thiểu ${promo.minNights} đêm.`);

      const hasUsed = await tx.booking.findFirst({
        where: { userId, promotionId: promo.id, status: { notIn: excludedBookingStatuses as any } },
      });
      if (hasUsed) throw new AppError(400, 'Bạn đã sử dụng mã ưu đãi này trước đó rồi.');

      if (promo.type === 'percentage') discountAmount = (totalAmount * promo.value) / 100;
      else if (promo.type === 'free_night') {
        const maxPrice = Math.max(...roomTypeLinesData.map((l) => l.priceAtBooking));
        discountAmount = maxPrice * promo.value;
      } else if (promo.type === 'fixed') discountAmount = promo.value;

      totalAmount = Math.max(0, totalAmount - discountAmount);
      appliedPromotionId = promo.id;

      await tx.promotion.update({
        where: { id: promo.id },
        data: { usedCount: { increment: 1 } },
      });
    }

    const booking = await tx.booking.create({
      data: {
        userId,
        checkInDate,
        checkOutDate,
        guestCount: data.guestCount,
        totalAmount,
        source: 'online',
        status: 'pending_payment',
        specialRequests: data.specialRequests,
        promoCode: data.promoCode ? data.promoCode.toUpperCase().trim() : null,
        discountAmount,
        promotionId: appliedPromotionId,
        roomTypeLines: { create: roomTypeLinesData },
      },
      include: { roomTypeLines: { include: { roomType: true } } },
    });

    await createAuditLog({
      tx, actorId: userId, targetTable: 'Booking', targetId: booking.id,
      action: 'CREATE', oldValue: null, newValue: booking,
    });

    const expiredAt = new Date(booking.createdAt.getTime() + PAYMENT_EXPIRY_MINUTES * 60 * 1000);
    emitBookingUpdate(booking.id, { status: booking.status });
    return { ...booking, expiredAt };
  });
};

interface GetMyBookingsFilter { status?: BookingStatus; }

export const getMyBookings = async (userId: number, filter?: GetMyBookingsFilter) => {
  return prisma.booking.findMany({
    where: { userId, ...(filter?.status && { status: filter.status }) },
    orderBy: { createdAt: 'desc' },
    include: {
      roomTypeLines: { include: { roomType: { include: { images: { take: 1, orderBy: { displayOrder: 'asc' } } } } } },
      assignedRooms: { include: { room: { include: { roomType: true } } } },
      payments: { select: { status: true, method: true, feeType: true, amount: true } },
      review: true,
    },
  });
};

export const getBookingById = async (bookingId: number, requesterId: number, requesterRole: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      roomTypeLines: { include: { roomType: { include: { images: { take: 1, orderBy: { displayOrder: 'asc' } } } } } },
      assignedRooms: { include: { room: { include: { roomType: true } } } },
      payments: true, review: true, customer: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
    },
  });

  if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  if (requesterRole === 'customer' && booking.userId !== requesterId) throw new AppError(403, 'Bạn không có quyền xem đơn này');

  const nights = Math.round((new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / 86400000);
  const lastPayment = booking.payments[0] || null;

  return {
    ...booking, totalPrice: Number(booking.totalAmount), totalNights: nights || 1,
    paymentStatus: lastPayment?.status || 'pending', paymentMethod: lastPayment?.method || 'cash',
  };
};

export const getAllBookings = async (filter?: any) => {
  const page = Number(filter?.page) || 1;
  const limit = Number(filter?.limit) || 20;
  const skip = (page - 1) * limit;
  const searchKey = filter?.search || filter?.keyword || filter?.q;

  const where: Prisma.BookingWhereInput = {
    ...(filter?.status && { status: filter.status }),
    ...(filter?.source && { source: filter.source }),
    ...(filter?.checkInDate && { checkInDate: { gte: new Date(filter.checkInDate) } }),
  };

  if (searchKey) {
    const isPureNumber = /^\d+$/.test(String(searchKey));
    if (isPureNumber) {
      where.OR = [{ id: parseInt(String(searchKey)) }, { customer: { phoneNumber: { contains: String(searchKey) } } }];
    } else {
      where.OR = [{ customer: { OR: [{ fullName: { contains: String(searchKey) } }, { email: { contains: String(searchKey) } }] } }];
    }
  }

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where, skip, take: limit, orderBy: { createdAt: 'desc' },
      include: {
        customer: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
        roomTypeLines: { include: { roomType: { include: { images: { take: 1, orderBy: { displayOrder: 'asc' } } } } } },
        assignedRooms: { include: { room: { include: { roomType: true } } } },
        payments: { select: { status: true, method: true, feeType: true } },
      },
    }),
    prisma.booking.count({ where }),
  ]);

  return { bookings, total, page, totalPages: Math.ceil(total / limit) };
};

export const cancelBooking = async (bookingId: number, actorId: number, actorRole: string, reason?: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { customer: true, payments: { where: { status: 'success' }, take: 1 } },
  });

  if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');

  if (actorRole === 'customer') {
    if (booking.userId !== actorId) throw new AppError(403, 'Bạn không có quyền hủy đơn này');
    if (booking.source !== 'online') throw new AppError(403, 'Không thể hủy đơn tại quầy qua ứng dụng');
  }

  if (['checked_in', 'checked_out', 'cancelled'].includes(booking.status)) {
    throw new AppError(400, `Không thể hủy đơn ở trạng thái ${booking.status}`);
  }

  const daysUntilCheckIn = Math.ceil((booking.checkInDate.getTime() - Date.now()) / 86400000);
  if (daysUntilCheckIn < 0) {
    throw new AppError(400, 'Không thể hủy sau ngày nhận phòng');
  }
  const successPayment = booking.payments[0] ?? null;

  const refundAmount = successPayment ? (daysUntilCheckIn >= 3 ? Number(booking.totalAmount) : Number(booking.totalAmount) * 0.5) : 0;

  await prisma.$transaction(async (tx) => {
    const updatedBooking = await tx.booking.update({
      where: { id: bookingId },
      data: { status: 'cancelled', cancelledAt: new Date(), cancelReason: reason ?? 'Khách hàng hủy' },
    });

    if (successPayment) {
      const penaltyAmount = Number(booking.totalAmount) - refundAmount;
      await tx.payment.update({
        where: { id: successPayment.id },
        data: { status: refundAmount > 0 ? 'pending_refund' : 'success' },
      });

      if (refundAmount > 0) {
        await tx.payment.create({
          data: { bookingId, amount: refundAmount, method: successPayment.method, status: 'pending_refund', feeType: 'refund', transactionRef: `REFUND-${booking.id}` },
        });
      }
      if (penaltyAmount > 0) {
        await tx.payment.create({
          data: { bookingId, amount: penaltyAmount, method: successPayment.method, status: 'success', feeType: 'penalty', paidAt: new Date(), transactionRef: `PENALTY-${booking.id}` },
        });
      }
    }

    await createAuditLog({ tx, actorId, targetTable: 'Booking', targetId: bookingId, action: 'UPDATE', oldValue: booking, newValue: updatedBooking });
  });
  
  emitBookingUpdate(bookingId, { status: 'cancelled' });
  return { refundAmount };
};

export const getRefundPreview = async (bookingId: number, userId: number) => {
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, userId },
    include: { payments: { where: { status: 'success', feeType: 'booking' }, take: 1 } },
  });

  if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  if (!['confirmed', 'pending_payment'].includes(booking.status)) throw new AppError(400, 'Đơn không thể hủy');

  const totalAmount = Number(booking.totalAmount);
  const isPaid = booking.payments.length > 0;
  const daysUntilCheckIn = Math.ceil((booking.checkInDate.getTime() - Date.now()) / 86400000);

  let refundAmount = 0, penaltyAmount = 0, refundPolicy = '';

  if (!isPaid) refundPolicy = 'Đơn chưa thanh toán. Hủy ngay mà không mất phí.';
  else if (daysUntilCheckIn >= 3) { refundAmount = totalAmount; refundPolicy = 'Hủy trước 3 ngày — hoàn 100% tiền phòng.'; }
  else if (daysUntilCheckIn >= 0) { refundAmount = totalAmount * 0.5; penaltyAmount = totalAmount * 0.5; refundPolicy = `Hủy trong vòng 3 ngày trước nhận phòng — hoàn 50%`; }
  else throw new AppError(400, 'Không thể hủy sau ngày nhận phòng');

  return { bookingId, totalAmount, isPaid, refundAmount, penaltyAmount, refundPolicy, checkInDate: booking.checkInDate, checkOutDate: booking.checkOutDate };
};

// ==========================================
// HÀM MỚI: Check-in Nhiều Phòng Cùng Lúc
// ==========================================
export const checkInMultiple = async (
  bookingId: number,
  staffId: number,
  data: CheckInMultipleDto
) => {
  return prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
      include: { roomTypeLines: true },
    });

    if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
    if (!['confirmed', 'checked_in'].includes(booking.status)) throw new AppError(400, `Đơn ở trạng thái "${booking.status}", không thể check-in`);

    const totalQuantityInBooking = booking.roomTypeLines.reduce((sum, line) => sum + line.quantity, 0);
    if (data.assignments.length !== totalQuantityInBooking) throw new AppError(400, 'Số lượng phòng gán không khớp với số lượng phòng trong đơn hàng.');
    
    const roomIds = data.assignments.map(a => a.roomId);
    if (new Set(roomIds).size !== roomIds.length) throw new AppError(400, 'Không thể gán một phòng cho nhiều khách trong cùng một đơn.');

    const sortedAssignments = [...data.assignments].sort((a, b) => a.roomId - b.roomId);

    for (const assignment of sortedAssignments) {
      const line = booking.roomTypeLines.find(l => l.id === assignment.bookingRoomTypeId);
      if (!line) throw new AppError(404, `Không tìm thấy dòng hạng phòng ID ${assignment.bookingRoomTypeId}`);

      await tx.$executeRaw`SELECT room_id FROM ROOM WHERE room_id = ${assignment.roomId} FOR UPDATE`;
      
      const room = await tx.room.findUnique({ where: { id: assignment.roomId } });

      if (!room) throw new AppError(404, `Phòng ID ${assignment.roomId} không tồn tại.`);
      if (room.roomTypeId !== line.roomTypeId) throw new AppError(400, `Phòng ${room.roomNumber} không thuộc hạng phòng đã đặt.`);
      if (room.status !== 'available') throw new AppError(409, `Phòng ${room.roomNumber} không ở trạng thái "sẵn sàng".`);

      await tx.bookingRoom.create({
        data: { bookingId, roomId: assignment.roomId, checkinAt: new Date(), idNumber: data.idNumber, checkinNote: data.checkinNote },
      });

      await tx.room.update({ where: { id: assignment.roomId }, data: { status: 'occupied' } });
    }

    if (booking.status !== 'checked_in') {
      await tx.booking.update({ where: { id: bookingId }, data: { status: 'checked_in' } });
    }

    await createAuditLog({ tx, actorId: staffId, targetTable: 'Booking', targetId: bookingId, action: 'UPDATE', oldValue: { status: booking.status }, newValue: { status: 'checked_in', assignments: data.assignments } });
    
    emitBookingUpdate(bookingId, { status: 'checked_in' });

    return { message: 'Check-in thành công cho tất cả các phòng.' };
  });
};

export const checkOut = async (
  bookingId: number, staffId: number, bookingRoomId: number,
  extraCharges: { label: string; amount: number }[] = [], paymentMethod: 'cash' | 'card' | 'qr_code' = 'cash'
) => {
  return prisma.$transaction(async (tx) => {
    const bookingRoom = await tx.bookingRoom.findUnique({
      where: { id: bookingRoomId },
      include: { room: { include: { roomType: true } }, booking: true },
    });

    if (!bookingRoom || bookingRoom.bookingId !== bookingId) throw new AppError(404, 'Không tìm thấy phòng này trong đơn');
    if (bookingRoom.checkoutAt) throw new AppError(400, 'Phòng này đã check-out rồi');

    const now = new Date();
    const finalExtraCharges = [...extraCharges];
    const extraTotal = finalExtraCharges.reduce((sum, c) => sum + c.amount, 0);

    await tx.bookingRoom.update({
      where: { id: bookingRoomId },
      data: { checkoutAt: now, extraCharges: finalExtraCharges.length > 0 ? finalExtraCharges : undefined },
    });

    await tx.room.update({ where: { id: bookingRoom.roomId }, data: { status: 'cleaning' } });

    if (extraTotal > 0) {
      await tx.payment.create({
        data: { bookingId, amount: extraTotal, method: paymentMethod, status: 'success', feeType: 'penalty', paidAt: now, transactionRef: `EXTRA-${bookingRoomId}-${Date.now()}` },
      });
    }

    const remaining = await tx.bookingRoom.count({ where: { bookingId, checkoutAt: null } });

    if (remaining === 0) await tx.booking.update({ where: { id: bookingId }, data: { status: 'checked_out' } });

    await createAuditLog({ tx, actorId: staffId, targetTable: 'Booking', targetId: bookingId, action: 'UPDATE', oldValue: null, newValue: { checkedOutRoomId: bookingRoom.roomId, extraTotal } });
    emitBookingUpdate(bookingId, { status: remaining === 0 ? 'checked_out' : bookingRoom.booking.status });

    return { message: 'Check-out thành công', extraTotal, allRoomsCheckedOut: remaining === 0 };
  });
};

export const createOfflineBooking = async (data: CreateOfflineBookingDto, staffId: number) => {
  const HOTEL_TZ_OFFSET = '+07:00'; 
  const checkInDate = new Date(`${toDateOnly(data.checkInDate)}T14:00:00${HOTEL_TZ_OFFSET}`);
  const checkOutDate = new Date(`${toDateOnly(data.checkOutDate)}T12:00:00${HOTEL_TZ_OFFSET}`);
  const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / 86400000);

  return prisma.$transaction(async (tx) => {
    let finalUserId = data.userId;

    if (data.newCustomer) {
      const existingUser = await tx.user.findFirst({ where: { phoneNumber: data.newCustomer.phoneNumber } });
      if (existingUser) finalUserId = existingUser.id;
      else {
        const newUser = await tx.user.create({
          data: { fullName: data.newCustomer.fullName, phoneNumber: data.newCustomer.phoneNumber, email: `khach_${Date.now()}@hotel.local`, passwordHash: 'OFFLINE_NO_LOGIN', role: 'customer' }
        });
        finalUserId = newUser.id;
      }
    }

    if (!finalUserId) throw new AppError(400, 'Không xác định được thông tin khách hàng');

    let totalAmount = 0;
    const roomTypeLinesData: { roomTypeId: number; quantity: number; priceAtBooking: number }[] = [];

    for (const item of data.items) {
      const roomType = await tx.roomType.findUnique({ where: { id: item.roomTypeId } });
      if (!roomType) throw new AppError(404, `Không tìm loại phòng #${item.roomTypeId}`);

      await tx.$executeRaw`SELECT room_type_id FROM ROOM_TYPE WHERE room_type_id = ${item.roomTypeId} FOR UPDATE`;

      const totalRooms = await tx.room.count({ where: { roomTypeId: item.roomTypeId, status: { notIn: ['maintenance', 'out_of_order', 'outoforder'] as any } } });
      const reserved = await tx.bookingRoomType.aggregate({
        _sum: { quantity: true },
        where: { roomTypeId: item.roomTypeId, booking: { status: { notIn: ['cancelled'] as any }, checkInDate: { lt: checkOutDate }, checkOutDate: { gt: checkInDate } } },
      });

      const available = totalRooms - (reserved._sum.quantity ?? 0);
      if (available < item.quantity) throw new AppError(409, `Hạng phòng "${roomType.typeName}" hiện chỉ còn ${Math.max(0, available)} phòng trống.`);

      const basePrice = Number(roomType.basePrice);
      totalAmount += basePrice * nights * item.quantity;
      roomTypeLinesData.push({ roomTypeId: item.roomTypeId, quantity: item.quantity, priceAtBooking: basePrice });
    }

    const booking = await tx.booking.create({
      data: {
        userId: finalUserId, createdBy: staffId, checkInDate, checkOutDate, guestCount: data.guestCount, totalAmount, source: 'offline', status: 'confirmed', paidAt: new Date(),
        roomTypeLines: { create: roomTypeLinesData },
      },
      include: { roomTypeLines: { include: { roomType: true } } },
    });

    const payment = await tx.payment.create({
      data: { bookingId: booking.id, amount: totalAmount, method: data.paymentMethod, status: 'success', feeType: 'booking', paidAt: new Date(), transactionRef: `OFFLINE-${booking.id}-${Date.now()}` }
    });

    const allocations = roomTypeLinesData.map(line => {
      const roomType = booking.roomTypeLines.find(l => l.roomTypeId === line.roomTypeId)?.roomType;
      return { paymentId: payment.id, roomTypeId: line.roomTypeId, roomTypeName: roomType?.typeName ?? 'Unknown', amount: line.priceAtBooking * line.quantity * nights };
    });
    await tx.paymentAllocation.createMany({ data: allocations });

    await createAuditLog({ tx, actorId: staffId, targetTable: 'Booking', targetId: booking.id, action: 'CREATE', oldValue: null, newValue: { ...booking, note: 'Tạo đơn tại quầy' } });
    return booking;
  });
};

export const updateOfflineBooking = async (bookingId: number, data: Partial<CreateOfflineBookingDto>, staffId: number): Promise<never> => {
  throw new AppError(501, 'Sửa đơn tại quầy đang được cập nhật lại.');
};

export const createReview = async (bookingId: number, userId: number, data: { rating: number; comment?: string }) => {
  const booking = await prisma.booking.findFirst({ where: { id: bookingId, userId } });
  if (!booking) throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  if (booking.status !== 'checked_out') throw new AppError(400, 'Chỉ có thể đánh giá sau khi đã trả phòng');
  const existingReview = await prisma.review.findUnique({ where: { bookingId } });
  if (existingReview) throw new AppError(409, 'Bạn đã đánh giá đơn đặt phòng này rồi');
  return prisma.review.create({ data: { bookingId, userId, rating: data.rating, comment: data.comment } });
};

export const getReviewsByRoomType = async (roomTypeId: number, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const where = { booking: { roomTypeLines: { some: { roomTypeId } } } };
  const [reviews, total] = await Promise.all([
    prisma.review.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { user: { select: { id: true, fullName: true } } } }),
    prisma.review.count({ where }),
  ]);
  return { reviews, total, page, totalPages: Math.ceil(total / limit) };
};

export const getBookingPreview = async (params: any) => { return {}; };
</file>

<file path="src/services/cron.service.ts">

</file>

<file path="src/services/hotel.service.ts">
import { Prisma, RoomStatus, BookingStatus } from '@prisma/client';
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { createAuditLog } from '../utils/audit-log.util';
import { uploadImage, deleteCloudinaryImage } from '../utils/cloudinary.util';
import { RoomTypeDto, RoomDto, AmenityDto, UpdateAmenityDto, SearchAvailableDto } from '../validations/hotel.schema';

interface RoomFilter {
  status?: RoomStatus;
  floor?: number;
  roomTypeId?: number;
}

// RoomType 

export const getAllRoomTypes = async () => {
  return prisma.roomType.findMany({
    include: {
      images: {
        orderBy: { displayOrder: 'asc' },
      },
      rooms: true,
      amenities: {
        include: {
          amenity: true,
        },
      },
      _count: {
        select: { rooms: true },
      },
    },
  });
};

export const getRoomTypeById = async (id: number) => {
  const roomType = await prisma.roomType.findUnique({
    where: { id },
    include: {
      images: true,
      amenities: {
        include: {
          amenity: true
        }
      }
    }
  });

  if (!roomType) {
    throw new AppError(404, 'Không tìm thấy loại phòng');
  }

  const formattedRoomType = {
    ...roomType,
    amenities: roomType.amenities.map((item: any) => item.amenity)
  };

  return formattedRoomType;
};

export const createRoomType = async (data: RoomTypeDto, files: Express.Multer.File[], actorId: number) => {
  let imageUrls: string[] = [];
  if (files && files.length > 0) {
    const uploadPromises = files.map(async (file) => {
      let dataURI = '';
      if (file.buffer) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        dataURI = "data:" + file.mimetype + ";base64," + b64;
      } else if (file.path) {
        dataURI = file.path;
      }
      if (!dataURI) return null;
      const res = await uploadImage(dataURI);
      let url = typeof res === 'string' ? res : (res as any).secure_url;
      if (url && url.includes('/upload/')) {
        url = url.replace('/upload/', '/upload/f_auto,q_auto,w_1200,c_limit/');
      }

      console.log('Đã tải ảnh lên Cloudinary:', url);
      return url;
    });
    const results = await Promise.all(uploadPromises);
    imageUrls = results.filter((url): url is string => Boolean(url));
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const newRoomType = await tx.roomType.create({
        data: {
          typeName: data.typeName,
          description: data.description,
          maxCapacity: data.maxCapacity,
          basePrice: data.basePrice,
          amenities: {
            create: data.amenityIds.map((amenityId) => ({ amenityId })),
          },
          images: {
            create: imageUrls.map((url, index) => ({
              imageUrl: url,
              displayOrder: index,
            })),
          },
        },
      });

      await createAuditLog({
        tx,
        actorId,
        targetTable: 'RoomType',
        targetId: newRoomType.id,
        action: 'CREATE',
        oldValue: null,
        newValue: newRoomType,
      });

      return newRoomType;
    });
  } catch (error) {
    if (imageUrls.length > 0) {
      Promise.allSettled(imageUrls.map((url) => deleteCloudinaryImage(url))).catch(console.error);
    }
    throw error;
  }
};

export const updateRoomType = async (
  id: number,
  data: RoomTypeDto & {
    version: number;
    deleteImageIds?: number[];
    amenityIds?: number[];
  },
  files: Express.Multer.File[],
  actorId: number
) => {
  const old = await prisma.roomType.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!old) {
    throw new AppError(404, 'Không tìm thấy hạng phòng');
  }

  if (old.version !== data.version) {
    throw new AppError(
      409,
      'Dữ liệu đã bị thay đổi bởi người khác. Vui lòng tải lại trang và thử lại.'
    );
  }

  let newImageUrls: string[] = [];
  if (files && files.length > 0) {
    const uploadPromises = files.map(async (file) => {
      let dataURI = '';
      if (file.buffer) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        dataURI = "data:" + file.mimetype + ";base64," + b64;
      } else if (file.path) {
        dataURI = file.path;
      }
      if (!dataURI) return null;
      const res = await uploadImage(dataURI);
      const url = typeof res === 'string' ? res : (res as any).secure_url;
      console.log('Đã tải ảnh lên Cloudinary:', url);
      return url;
    });
    const results = await Promise.all(uploadPromises);
    newImageUrls = results.filter((url): url is string => Boolean(url));
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      if (data.deleteImageIds && data.deleteImageIds.length > 0) {
      await tx.roomImage.deleteMany({
        where: {
          id: { in: data.deleteImageIds },
          roomTypeId: id,
        },
      });
    }

    if (newImageUrls.length > 0) {
      const remainingImages = await tx.roomImage.findMany({
        where: { roomTypeId: id },
        orderBy: { displayOrder: 'desc' },
        take: 1,
      });

      const startOrder =
        remainingImages.length > 0
          ? remainingImages[0].displayOrder + 1
          : 0;

      await tx.roomImage.createMany({
        data: newImageUrls.map((url, index) => ({
          roomTypeId: id,
          imageUrl: url,
          displayOrder: startOrder + index,
        })),
      });
    }

    const updateResult = await tx.roomType.updateMany({
      where: {
        id,
        version: data.version,
      },
      data: {
        ...(data.typeName && { typeName: data.typeName }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.basePrice !== undefined && { basePrice: data.basePrice }),
        ...(data.maxCapacity && { maxCapacity: data.maxCapacity }),
        version: { increment: 1 },
      },
    });

    if (updateResult.count === 0) {
      throw new AppError(
        409,
        'Dữ liệu đã bị thay đổi bởi người khác. Vui lòng tải lại trang và thử lại.'
      );
    }

    const updated = await tx.roomType.findUniqueOrThrow({ where: { id } });

    if (data.amenityIds !== undefined) {
      await tx.roomTypeAmenity.deleteMany({
        where: { roomTypeId: id },
      });

      if (data.amenityIds.length > 0) {
        await tx.roomTypeAmenity.createMany({
          data: data.amenityIds.map((amenityId: number) => ({
            roomTypeId: id,
            amenityId,
          })),
        });
      }
    }

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'RoomType',
      targetId: id,
      action: 'UPDATE',
      oldValue: {
        typeName: old.typeName,
        description: old.description,
        basePrice: old.basePrice,
        maxCapacity: old.maxCapacity,
        version: old.version,
        imageCount: old.images.length,
      },
      newValue: {
        typeName: updated.typeName,
        description: updated.description,
        basePrice: updated.basePrice,
        maxCapacity: updated.maxCapacity,
        version: updated.version,
        deletedImageIds: data.deleteImageIds ?? [],
        newImagesUploaded: newImageUrls.length,
      },
    });

    return tx.roomType.findUnique({
      where: { id },
      include: {
        images: { orderBy: { displayOrder: 'asc' } },
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    });
  });

    if (data.deleteImageIds && data.deleteImageIds.length > 0) {
      const imagesToDelete = old.images.filter((img) =>
        data.deleteImageIds!.includes(img.id)
      );
      Promise.allSettled(
        imagesToDelete.map((img) => deleteCloudinaryImage(img.imageUrl))
      ).catch(console.error);
    }

    return result;
  } catch (error) {
    if (newImageUrls.length > 0) {
      Promise.allSettled(newImageUrls.map((url) => deleteCloudinaryImage(url))).catch(console.error);
    }
    throw error;
  }
};

export const deleteRoomType = async (id: number, actorId: number) => {
  const existing = await prisma.roomType.findUnique({
    where: { id },
    include: {
      _count: { select: { rooms: true } },
      images: true,
    },
  });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy loại phòng');
  }

  if (existing._count.rooms > 0) {
    throw new AppError(400, 'Không thể xóa loại phòng đang có phòng sử dụng');
  }

  await prisma.$transaction(async (tx) => {
    await tx.roomImage.deleteMany({ where: { roomTypeId: id } });
    await tx.roomTypeAmenity.deleteMany({ where: { roomTypeId: id } });

    await tx.roomType.delete({ where: { id } });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'RoomType',
      targetId: id,
      action: 'DELETE',
      oldValue: existing,
      newValue: null,
    });
  });

  if (existing.images.length > 0) {
      Promise.allSettled(existing.images.map((img) => deleteCloudinaryImage(img.imageUrl))).catch(console.error);
  }
};

export const searchAvailable = async (data: SearchAvailableDto) => {
  const checkInDate = new Date(data.checkIn);
  checkInDate.setHours(14, 0, 0, 0);
  const checkOutDate = new Date(data.checkOut);
  checkOutDate.setHours(12, 0, 0, 0);

  const priceFilter = data.minPrice != null || data.maxPrice != null
    ? {
        basePrice: {
          ...(data.minPrice != null ? { gte: data.minPrice } : {}),
          ...(data.maxPrice != null ? { lte: data.maxPrice } : {}),
        },
      }
    : {};

  const excludedRoomStatuses = Object.values(RoomStatus).filter((s) =>
    ['maintenance', 'out_of_order', 'outoforder'].includes(s.toLowerCase())
  );

  const excludedBookingStatuses = Object.values(BookingStatus).filter((s) =>
    s.toLowerCase() === 'cancelled'
  );

  // Đếm theo loại phòng — không còn khoá/kiểm tra từng phòng vật lý cụ thể nữa
  const reservedByType = await prisma.bookingRoomType.groupBy({
    by: ['roomTypeId'],
    _sum: { quantity: true },
    where: {
      booking: {
        status: { notIn: excludedBookingStatuses },
        checkInDate: { lt: checkOutDate },
        checkOutDate: { gt: checkInDate },
      },
    },
  });
  const reservedMap = new Map(reservedByType.map((r) => [r.roomTypeId, r._sum.quantity ?? 0]));

  const results = await prisma.roomType.findMany({
    where: {
      maxCapacity: { gte: data.guests },
      ...priceFilter,
    },
    include: {
      amenities: {
        include: { amenity: true },
      },
      images: {
        orderBy: { displayOrder: 'asc' },
      },
      _count: {
        select: {
          rooms: { where: { status: { notIn: excludedRoomStatuses } } },
        },
      },
    },
  });

  return results
    .map((rt) => ({
      id: rt.id,
      typeName: rt.typeName,
      description: rt.description,
      maxCapacity: rt.maxCapacity,
      basePrice: Number(rt.basePrice),
      amenities: rt.amenities,
      images: rt.images,
      availableRoomCount: rt._count.rooms - (reservedMap.get(rt.id) ?? 0),
      lowestPrice: Number(rt.basePrice),
    }))
    .filter((rt) => rt.availableRoomCount > 0)
    .sort((a, b) => a.lowestPrice - b.lowestPrice);
};

//Room

export const getRooms = async (filter: RoomFilter) => {
  return prisma.room.findMany({
    where: filter,
    include: {
      roomType: {
        include: {
          images: { take: 1, orderBy: { displayOrder: 'asc' } },
        },
      },
    },
  });
};

export const createRoom = async (data: RoomDto, actorId: number) => {
  return prisma.$transaction(async (tx) => {
    const roomType = await tx.roomType.findUnique({
      where: { id: data.roomTypeId }
    });

    if (!roomType) {
      throw new AppError(404, 'Không tìm thấy loại phòng');
    }

    const existingRoom = await tx.room.findFirst({
      where: { roomNumber: data.roomNumber }
    });

    if (existingRoom) {
      throw new AppError(409, 'Số phòng này đã tồn tại trong hệ thống');
    }

    const room = await tx.room.create({
      data: {
        roomNumber: data.roomNumber,
        floor: data.floor,
        status: data.status as RoomStatus,

        roomType: {
          connect: { id: data.roomTypeId }
        }
      },
    });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Room',
      targetId: room.id,
      action: 'CREATE',
      oldValue: null,
      newValue: room,
    });

    return room;
  });
};

export const updateRoom = async (id: number, data: Partial<RoomDto>, actorId: number) => {
  const existing = await prisma.room.findUnique({ where: { id } });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy phòng');
  }

  const { status, ...safeData } = data;

  return prisma.$transaction(async (tx) => {
    const updated = await tx.room.update({
      where: { id },
      data: safeData,
    });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Room',
      targetId: id,
      action: 'UPDATE',
      oldValue: existing,
      newValue: updated,
    });

    return updated;
  });
};

export const deleteRoom = async (id: number, actorId: number) => {
  const existing = await prisma.room.findUnique({
    where: { id },
    include: {
      _count: { select: { bookingRooms: true } },
    },
  });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy phòng');
  }

  if (existing._count.bookingRooms > 0) {
    throw new AppError(400, 'Không thể xóa phòng đã từng có lịch sử đặt phòng. Hãy đổi trạng thái sang Bảo trì hoặc Ngừng hoạt động.');
  }

  return prisma.$transaction(async (tx) => {
    await tx.room.delete({ where: { id } });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Room',
      targetId: id,
      action: 'DELETE',
      oldValue: existing,
      newValue: null,
    });
  });
};

export const updateRoomStatus = async (
  roomId: number,
  newStatus: string,
  currentVersion: number,
  actorId: number
) => {
  return prisma.$transaction(async (tx) => {
    const room = await tx.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      throw new AppError(404, 'Không tìm thấy phòng');
    }

    if (room.version !== currentVersion) {
      throw new AppError(
        409,
        'Trạng thái phòng vừa được thay đổi bởi nhân viên khác. Vui lòng tải lại.'
      );
    }
    if (['maintenance', 'cleaning', 'out_of_order'].includes(newStatus)) {
      const activeAssignment = await tx.bookingRoom.findFirst({
        where: { roomId, checkoutAt: null },
      });

      if (activeAssignment) {
        throw new AppError(
          400,
          'Không thể vô hiệu hóa phòng đang có đơn đặt phòng'
        );
      }
    }

    const updateResult = await tx.room.updateMany({
      where: { 
        id: roomId,
        version: currentVersion
      },
      data: {
        status: newStatus as RoomStatus,
        version: { increment: 1 },
      },
    });

    if (updateResult.count === 0) {
      throw new AppError(
        409,
        'Trạng thái phòng vừa được thay đổi bởi nhân viên khác. Vui lòng tải lại.'
      );
    }

    const updated = await tx.room.findUniqueOrThrow({ where: { id: roomId } });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Room',
      targetId: roomId,
      action: 'UPDATE',
      oldValue: { status: room.status, version: room.version },
      newValue: { status: newStatus, version: updated.version },
    });

    return updated;
  });
};

export const getAmenities = async () => {
  return prisma.amenity.findMany();
};

export const createAmenity = async (data: AmenityDto, actorId: number) => {
  return prisma.$transaction(async (tx) => {
    const existingAmenity = await tx.amenity.findFirst({
      where: { amenityName: data.amenityName }
    });

    if (existingAmenity) {
      throw new AppError(409, 'Tên tiện ích đã tồn tại');
    }

    const amenity = await tx.amenity.create({
      data: {
        amenityName: data.amenityName,
        description: data.description,
      },
    });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Amenity',
      targetId: amenity.id,
      action: 'CREATE',
      oldValue: null,
      newValue: amenity,
    });

    return amenity;
  });
};

export const updateAmenity = async (id: number, data: UpdateAmenityDto, actorId: number) => {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.amenity.findUnique({ where: { id } });

    if (!existing) {
      throw new AppError(404, 'Không tìm thấy tiện ích');
    }

    if (data.amenityName && data.amenityName !== existing.amenityName) {
      const nameExists = await tx.amenity.findFirst({
        where: { amenityName: data.amenityName }
      });
      if (nameExists) {
        throw new AppError(409, 'Tên tiện ích đã tồn tại');
      }
    }

    const updated = await tx.amenity.update({
      where: { id },
      data: {
        ...(data.amenityName && { amenityName: data.amenityName }),
        ...(data.description !== undefined && { description: data.description }),
      },
    });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Amenity',
      targetId: id,
      action: 'UPDATE',
      oldValue: existing,
      newValue: updated,
    });

    return updated;
  });
};

export const deleteAmenity = async (id: number, actorId: number) => {
  const existing = await prisma.amenity.findUnique({
    where: { id },
    include: {
      _count: { select: { roomTypes: true } },
    },
  });

  if (!existing) {
    throw new AppError(404, 'Không tìm thấy tiện ích');
  }

  if (existing._count.roomTypes > 0) {
    throw new AppError(400, 'Không thể xóa tiện ích đang được sử dụng bởi loại phòng');
  }

  return prisma.$transaction(async (tx) => {
    await tx.amenity.delete({ where: { id } });

    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Amenity',
      targetId: id,
      action: 'DELETE',
      oldValue: existing,
      newValue: null,
    });
  });
};

// ── Room Dashboard (Sơ đồ phòng) ─────────────────────────────────────────────

// Danh sách trạng thái booking được coi là đang sử dụng phòng
const ACTIVE_BOOKING_STATUSES: BookingStatus[] = ['confirmed', 'checked_in'];

export interface RoomGuestOverview {
  bookingId: number;
  guestName: string;
  guestPhone: string;
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
  isUpcoming?: boolean;
  isOverdue?: boolean;
}

export interface RoomOverview {
  roomId: number;
  roomNumber: string;
  floor: number;
  status: RoomStatus | 'reserved';
  currentPrice: number;
  typeName: string;
  maxCapacity: number;
  currentGuest: RoomGuestOverview | null;
  version: number;
}

export const getRoomOverview = async (): Promise<RoomOverview[]> => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        roomType: {
          select: { typeName: true, maxCapacity: true, basePrice: true },
        },
        bookingRooms: {
          where: { checkoutAt: null },
          select: {
            bookingId: true,
            booking: {
              select: {
                checkInDate: true,
                checkOutDate: true,
                guestCount: true,
                customer: { select: { fullName: true, phoneNumber: true } },
              },
            },
          },
        },
      },
      orderBy: [{ floor: 'asc' }, { roomNumber: 'asc' }],
    });

    return rooms.map((room) => {
      let finalStatus: RoomStatus | 'reserved' = room.status;
      let guestInfo: RoomGuestOverview | null = null;

      const activeAssignment = room.bookingRooms[0];

      if (activeAssignment) {
        finalStatus = 'occupied';
        const isOverdue = new Date() > new Date(activeAssignment.booking.checkOutDate);

        guestInfo = {
          bookingId: activeAssignment.bookingId,
          guestName: activeAssignment.booking.customer?.fullName ?? 'Khách',
          guestPhone: activeAssignment.booking.customer?.phoneNumber ?? '—',
          checkInDate: activeAssignment.booking.checkInDate,
          checkOutDate: activeAssignment.booking.checkOutDate,
          guestCount: activeAssignment.booking.guestCount,
          isUpcoming: false,
          isOverdue,
        };
      } else if (room.status === 'occupied') {
        finalStatus = 'cleaning';
      }
      // Bỏ phần "sắp có khách / reserved": phòng vật lý giờ chỉ gắn với booking cụ thể lúc check-in,
      // nên không còn cách biết trước "booking nào sẽ dùng đúng phòng này". Muốn xem nhu cầu sắp tới
      // thì cần màn hình riêng theo LOẠI phòng (dùng searchAvailable), không phải theo từng phòng.

      return {
        roomId: room.id,
        roomNumber: room.roomNumber,
        floor: room.floor ?? 1,
        status: finalStatus,
        currentPrice: Number(room.roomType.basePrice),
        typeName: room.roomType.typeName,
        maxCapacity: room.roomType.maxCapacity,
        currentGuest: guestInfo,
        version: room.version,
      };
    });
  } catch (error: any) {
    throw new AppError(500, `Lỗi khi lấy sơ đồ phòng: ${error.message}`);
  }
};

export const getAllRoomTypesPublic = async () => {
  return prisma.roomType.findMany({
    include: {
      images: {
        orderBy: { displayOrder: 'asc' },
      },
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });
};
</file>

<file path="src/services/payment.service.ts">
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { createAuditLog } from '../utils/audit-log.util';
import { sendBookingConfirmationEmail } from '../utils/email.util';
import { emitPaymentConfirmed, emitBookingUpdate, emitNewBooking } from '../utils/socket.util';

const buildQrPayload = (
  transactionRef: string,
  amount: number,
  bookingId: number
): string => {
  return JSON.stringify({
    app: 'Hotel Booking',
    transactionRef,
    amount,
    note: `Thanh toán đơn đặt phòng #${bookingId}`,
    timestamp: new Date().toISOString(),
  });
};

export const initiatePayment = async (bookingId: number, userId: number) => {
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, userId },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  }

  if (booking.status !== 'pending_payment') {
    throw new AppError(400, 'Đơn đặt phòng không ở trạng thái chờ thanh toán');
  }

  const expiredAt = new Date(booking.createdAt.getTime() + 15 * 60 * 1000);

  if (new Date() > expiredAt) {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'cancelled', cancelReason: 'Hệ thống tự động hủy do quá hạn thanh toán 15 phút' }
    });
    throw new AppError(400, 'Đơn đặt phòng đã quá 15 phút. Hệ thống tự động hủy đơn, vui lòng đặt phòng mới.');
  }

  const existingPayment = await prisma.payment.findFirst({
    where: { bookingId, status: 'pending' },
  });

  const payment = existingPayment ?? await prisma.payment.create({
    data: {
      bookingId,
      amount: booking.totalAmount,
      method: 'qr_code',
      status: 'pending',
      feeType: 'booking',
      transactionRef: uuidv4(),
    },
  });

  return {
    paymentId: payment.id,
    transactionRef: payment.transactionRef,
    amount: Number(payment.amount),
    qrPayload: buildQrPayload(
      payment.transactionRef!,
      Number(payment.amount),
      bookingId
    ),
    expiredAt,
  };
};

export const getPaymentStatus = async (bookingId: number, userId: number) => {
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, userId },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng');
  }

  const payment = await prisma.payment.findFirst({
    where: { bookingId },
    orderBy: { createdAt: 'desc' },
  });

  return {
    bookingStatus: booking.status,
    paymentStatus: payment?.status ?? null,
    transactionRef: payment?.transactionRef ?? null,
  };
};

export const simulateSuccess = async (transactionRef: string) => {
  const payment = await prisma.payment.findUnique({
    where: { transactionRef },
  });

  if (!payment) {
    throw new AppError(404, 'Không tìm thấy giao dịch');
  }

  const booking = await prisma.booking.findUnique({
    where: { id: payment.bookingId },
    include: {
      customer: true,
      roomTypeLines: {
        include: {
          roomType: true,
        },
      },
    },
  });

  if (!booking) {
    throw new AppError(404, 'Không tìm thấy đơn đặt phòng liên quan');
  }

  const result = await prisma.$transaction(async (tx) => {
    const oldPayment = { ...payment };

    const updateResult = await tx.payment.updateMany({
      where: { 
        transactionRef,
        status: 'pending'
      },
      data: {
        status: 'success',
        paidAt: new Date(),
      },
    });

    if (updateResult.count === 0) {
      const current = await tx.payment.findUnique({ where: { transactionRef } });
      return { processed: true, message: 'Giao dịch đã được xử lý trước đó', status: current?.status };
    }

    const updatedPayment = await tx.payment.findUniqueOrThrow({ where: { transactionRef } });

    await tx.booking.update({
      where: { id: payment.bookingId },
      data: { status: 'confirmed', paidAt: new Date() },
    });

    // Step 3.2: Create Payment Allocations
    if (booking.roomTypeLines.length > 0) {
      const lines = booking.roomTypeLines;
      const paymentAmount = Number(payment.amount);
      let totalOriginalValue = 0;
      for (const line of lines) {
        totalOriginalValue += Number(line.priceAtBooking) * line.quantity;
      }

      const allocations: {
        paymentId: number;
        roomTypeId: number;
        roomTypeName: string;
        amount: number;
      }[] = [];

      if (totalOriginalValue === 0) {
        const splitAmount = paymentAmount / lines.length;
        for (const line of lines) {
          allocations.push({
            paymentId: payment.id,
            roomTypeId: line.roomTypeId,
            roomTypeName: line.roomType.typeName,
            amount: splitAmount,
          });
        }
      } else {
        let allocatedTotal = 0;
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          let allocatedAmount = 0;
          if (i === lines.length - 1) {
            allocatedAmount = paymentAmount - allocatedTotal;
          } else {
            const lineValue = Number(line.priceAtBooking) * line.quantity;
            const ratio = lineValue / totalOriginalValue;
            allocatedAmount = paymentAmount * ratio;
            allocatedTotal += allocatedAmount;
          }
          allocations.push({
            paymentId: payment.id,
            roomTypeId: line.roomTypeId,
            roomTypeName: line.roomType.typeName,
            amount: allocatedAmount,
          });
        }
      }
      await tx.paymentAllocation.createMany({
        data: allocations,
      });
    }

    await createAuditLog({
      tx,
      actorId: booking.userId, 
      targetTable: 'Payment',
      targetId: payment.id,
      action: 'UPDATE',
      oldValue: oldPayment,
      newValue: updatedPayment,
    });
    
    return { processed: false };
  });

  if (result.processed) {
    return {
      message: result.message,
      status: result.status,
    };
  }

  emitPaymentConfirmed(payment.bookingId);
  emitBookingUpdate(payment.bookingId, { status: 'confirmed' });

  if (booking?.customer && booking.roomTypeLines.length > 0) {
    emitNewBooking({
      bookingId: booking.id,
      roomTypeName: booking.roomTypeLines[0].roomType.typeName,
      guestName: booking.customer.fullName,
      checkInDate: booking.checkInDate,
    });

    void sendBookingConfirmationEmail(
      {
        ...booking,
        roomName: booking.roomTypeLines[0].roomType.typeName,
        roomTypeName: booking.roomTypeLines[0].roomType.typeName,
        roomNumber: 'N/A',
        totalAmount: Number(booking.totalAmount),
      } as never,
      booking.customer
    ).catch(() => {});
  }

  return {
    message: 'Giả lập thanh toán thành công',
    status: 'success',
  };
};

export const confirmRefund = async (paymentId: number, actorId: number) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      // We need the original payment that was successful to find allocations
      booking: {
        include: {
          payments: {
            where: { status: 'success', feeType: 'booking' },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      },
    },
  });

  if (!payment || payment.status !== 'pending_refund') {
    throw new AppError(400, 'Giao dịch không tồn tại hoặc không ở trạng thái chờ hoàn tiền');
  }

  return prisma.$transaction(async (tx) => {
    // 1. Update payment status to 'refunded'
    const updateResult = await tx.payment.updateMany({
      where: { id: paymentId, status: 'pending_refund' },
      data: { status: 'refunded', refundedAt: new Date() },
    });

    if (updateResult.count === 0) {
      throw new AppError(400, 'Giao dịch đã được xử lý hoặc không còn ở trạng thái chờ hoàn tiền');
    }

    const updated = await tx.payment.findUniqueOrThrow({ where: { id: paymentId } });

    // 2. Create reversal (negative) allocations
    // Find the original successful payment for this booking
    const originalPayment = payment.booking.payments[0];

    if (originalPayment) {
      // Find the allocations of the original payment
      const originalAllocations = await tx.paymentAllocation.findMany({
        where: { paymentId: originalPayment.id },
      });

      if (originalAllocations.length > 0) {
        const reversalAllocations = originalAllocations.map(alloc => ({
          paymentId: updated.id, // Link to the current *refund* payment record
          roomTypeId: alloc.roomTypeId,
          roomTypeName: alloc.roomTypeName,
          amount: -Number(alloc.amount), // Negate the amount
        }));

        await tx.paymentAllocation.createMany({
          data: reversalAllocations,
        });
      }
    }


    // 3. Create audit log
    await createAuditLog({
      tx,
      actorId,
      targetTable: 'Payment',
      targetId: paymentId,
      action: 'UPDATE',
      oldValue: { status: 'pending_refund' },
      newValue: { status: 'refunded' },
    });

    return updated;
  });
};

export const simulateFailure = async (transactionRef: string) => {
  const payment = await prisma.payment.findUnique({
    where: { transactionRef },
  });

  if (!payment) {
    throw new AppError(404, 'Không tìm thấy giao dịch');
  }

  const updateResult = await prisma.payment.updateMany({
    where: { 
      transactionRef,
      status: 'pending'
    },
    data: { status: 'failed' },
  });

  if (updateResult.count === 0) {
    const current = await prisma.payment.findUnique({ where: { transactionRef } });
    return {
      message: 'Giao dịch đã được xử lý trước đó',
      status: current?.status,
    };
  }

  return {
    message: 'Giả lập thanh toán thất bại',
    status: 'failed',
  };
};
</file>

<file path="src/services/report.service.ts">
import { prisma } from '../utils/prisma.util';
import { AppError } from '../utils/app-error.util';
import { BookingStatus } from '@prisma/client';

export const getRevenueReport = async (from: string, to: string) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    throw new AppError(400, 'Ngày không hợp lệ');
  }

  if (fromDate >= toDate) {
    throw new AppError(400, 'Ngày bắt đầu phải trước ngày kết thúc');
  }

  const monthly = await prisma.$queryRaw<Array<{
    month: string;
    revenue: number;
    bookingCount: bigint;
    bookingRevenue: number;
    penaltyRevenue: number;
  }>>`
    SELECT
      DATE_FORMAT(p.paid_at, '%Y-%m') AS month,
      SUM(p.amount) AS revenue,
      COUNT(DISTINCT b.booking_id) AS bookingCount,
      SUM(
        CASE
          WHEN p.fee_type = 'booking'
          THEN p.amount
          ELSE 0
        END
      ) AS bookingRevenue,
      SUM(
        CASE
          WHEN p.fee_type = 'penalty'
          THEN p.amount
          ELSE 0
        END
      ) AS penaltyRevenue
    FROM PAYMENT p
    INNER JOIN BOOKING b ON b.booking_id = p.booking_id
    WHERE p.status = 'success'
      AND p.paid_at BETWEEN ${fromDate} AND ${toDate}
    GROUP BY month
    ORDER BY month ASC
  `;

  const totalRevenue = monthly.reduce((sum, item) => sum + Number(item.revenue), 0);
  const totalBookings = monthly.reduce((sum, item) => sum + Number(item.bookingCount), 0);
  const totalBookingRevenue = monthly.reduce((sum, item) => sum + Number(item.bookingRevenue), 0);
  const totalPenaltyRevenue = monthly.reduce((sum, item) => sum + Number(item.penaltyRevenue), 0);

  const totalRooms = await prisma.room.count();
  const totalDays = Math.ceil((toDate.getTime() - fromDate.getTime()) / 86400000);

  const checkedBookings = await prisma.booking.findMany({
    where: {
      status: { in: ['checked_in', 'checked_out'] as BookingStatus[] },
      checkInDate: { lt: toDate },
      checkOutDate: { gt: fromDate },
    },
    select: { checkInDate: true, checkOutDate: true },
  });

  const usedNights = checkedBookings.reduce((sum, booking) => {
    const effectiveCheckIn = booking.checkInDate < fromDate ? fromDate : booking.checkInDate;
    const effectiveCheckOut = booking.checkOutDate > toDate ? toDate : booking.checkOutDate;
    const nights = Math.ceil(
      (effectiveCheckOut.getTime() - effectiveCheckIn.getTime()) / 86400000
    );
    return sum + nights;
  }, 0);

  const avgOccupancyRate =
    totalRooms * totalDays > 0
      ? Math.round((usedNights / (totalRooms * totalDays)) * 10000) / 100
      : 0;

  const byRoomTypeRaw = await prisma.paymentAllocation.groupBy({
    by: ['roomTypeName'],
    _sum: {
      amount: true,
    },
    where: {
      payment: {
        OR: [
          {
            status: 'success',
            paidAt: {
              gte: fromDate,
              lte: toDate,
            },
          },
          {
            status: 'refunded',
            refundedAt: {
              gte: fromDate,
              lte: toDate,
            },
          },
        ],
      },
    },
    orderBy: {
      _sum: {
        amount: 'desc',
      },
    },
  });

  const byRoomType = byRoomTypeRaw.map((item) => ({
    name: item.roomTypeName,
    revenue: Number(item._sum.amount),
  }));

  return {
    summary: {
      totalRevenue,
      totalBookingRevenue,
      totalPenaltyRevenue,
      totalBookings,
      avgOccupancyRate,
    },
    monthly: monthly.map((item) => ({
      month: item.month,
      revenue: Number(item.revenue),
      bookingRevenue: Number(item.bookingRevenue),
      penaltyRevenue: Number(item.penaltyRevenue),
      bookingCount: Number(item.bookingCount),
    })),
    byRoomType,
  };
};

export const getRefundList = async () => {
  return prisma.payment.findMany({
    where: {
      feeType: 'refund',
    },
    include: {
      booking: {
        include: {
          customer: {
            select: {
              fullName: true,
              email: true,
              phoneNumber: true,
            },
          },
          roomTypeLines: {
            include: {
              roomType: {
                select: { typeName: true },
              },
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};
</file>

<file path="src/types/express.d.ts">
export interface UserPayload {
  userId: number;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
</file>

<file path="src/utils/app-error.util.ts">
export class AppError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean = true;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}
</file>

<file path="src/utils/audit-log.util.ts">
import { Prisma, AuditAction } from '@prisma/client';

type TransactionClient = Prisma.TransactionClient;

interface AuditLogParams {
  tx: TransactionClient;
  actorId: number;
  targetTable: string;
  targetId: number;
  action: AuditAction;
  oldValue?: object | null;
  newValue?: object | null;
}

const serializeValue = (value?: object | null): string | null => {
  if (value === undefined || value === null) return null;
  return JSON.stringify(value);
};

export const createAuditLog = async ({
  tx,
  actorId,
  targetTable,
  targetId,
  action,
  oldValue,
  newValue,
}: AuditLogParams): Promise<void> => {
  await tx.auditLog.create({
    data: {
      actorId,
      targetTable,
      targetId,
      action,
      oldValue: serializeValue(oldValue),
      newValue: serializeValue(newValue),
    },
  });
};
</file>

<file path="src/utils/catch-async.util.ts">
import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync = (fn: AsyncRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
</file>

<file path="src/utils/cloudinary.util.ts">
import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env.config';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath: string): Promise<string> => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'hotel-booking',
  });
  return result.secure_url;
};

export const deleteImage = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};

export const deleteCloudinaryImage = async (imageUrl: string): Promise<void> => {
  try {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) return;

    const urlParts = imageUrl.split('/upload/');
    if (urlParts.length === 2) {
      const afterUpload = urlParts[1]; 
      const pathWithoutVersion = afterUpload.replace(/^v\d+\//, ''); 
      const publicId = pathWithoutVersion.substring(0, pathWithoutVersion.lastIndexOf('.')); 
      
      await cloudinary.uploader.destroy(publicId);
      console.log(`[Cloudinary] Đã xóa ảnh rác: ${publicId}`);
    }
  } catch (err) {
    console.error('[Cloudinary] Xóa ảnh thất bại:', err);
  }
};
</file>

<file path="src/utils/email.util.ts">
import nodemailer from 'nodemailer';
import { env } from '../config/env.config';
import { logger } from './logger.util';

export interface BookingEmailData {
  id: number;
  checkInDate: Date;
  checkOutDate: Date;
  totalAmount: number;
  roomId: number;
}

export interface UserEmailData {
  fullName: string;
  email: string;
}

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    logger.error('[Email] Kết nối thất bại:', err);
  } else {
    logger.info('[Email] Email server sẵn sàng');
  }
});

export const sendBookingConfirmationEmail = async (
  booking: any,
  user: any
): Promise<void> => {
  try {
    console.log(`[Email] Gửi xác nhận đặt phòng #${booking.id} → ${user.email}`);

    const roomName = booking.room?.roomType?.typeName ?? 'Phòng đã đặt';
    const roomNumber = booking.room?.roomNumber ?? '—';
    const checkIn = booking.checkInDate
      ? new Date(booking.checkInDate).toLocaleDateString('vi-VN')
      : '—';
    const checkOut = booking.checkOutDate
      ? new Date(booking.checkOutDate).toLocaleDateString('vi-VN')
      : '—';
    const totalAmount = booking.totalAmount
      ? Number(booking.totalAmount).toLocaleString('vi-VN') + ' ₫'
      : '—';

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: user.email,
      subject: `[Hotel Booking] Xác nhận đặt phòng #${booking.id}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#1a1a1a">

          <div style="background:#0f4c81;padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;font-size:18px;margin:0;font-weight:500">
              Xác nhận đặt phòng thành công
            </h1>
          </div>

          <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none">
            <p style="margin:0 0 16px">Xin chào <strong>${user.fullName}</strong>,</p>
            <p style="margin:0 0 20px;color:#6b7280;font-size:14px">
              Đơn đặt phòng của bạn đã được xác nhận thành công. Dưới đây là thông tin chi tiết:
            </p>

            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Mã đơn</td>
                <td style="padding:10px 14px;font-weight:500;border-bottom:1px solid #f3f4f6">#${booking.id}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Hạng phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${roomName}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Số phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${roomNumber}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Ngày nhận phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${checkIn}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Ngày trả phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${checkOut}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Số khách</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${booking.guestCount} khách</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;font-weight:500">Tổng tiền</td>
                <td style="padding:10px 14px;color:#0f4c81;font-weight:600;font-size:16px">${totalAmount}</td>
              </tr>
            </table>

            <div style="background:#f0f7ff;border-radius:8px;padding:14px;margin-top:20px;font-size:13px;color:#1a56db">
              Vui lòng mang theo CCCD/Hộ chiếu khi nhận phòng.
            </div>
          </div>

          <div style="background:#f9fafb;padding:16px 24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center">
              Hotel Booking System · Mọi thắc mắc liên hệ qua email này
            </p>
          </div>

        </div>
      `,
    });

    console.log(`[Email] Gửi xác nhận thành công → ${user.email}`);
  } catch (err: any) {
    console.error(`[Email] Gửi xác nhận thất bại:`, err.message);
  }
};

export const sendCancellationEmail = async (
  booking: any,
  user: any,
  refundAmount: number = 0
): Promise<void> => {
  try {
    console.log(`[Email] Gửi thông báo hủy đơn #${booking.id} → ${user.email}`);

    const roomName = booking.room?.roomType?.typeName ?? 'Phòng đã đặt';
    const checkIn = booking.checkInDate
      ? new Date(booking.checkInDate).toLocaleDateString('vi-VN')
      : '—';
    const checkOut = booking.checkOutDate
      ? new Date(booking.checkOutDate).toLocaleDateString('vi-VN')
      : '—';
    const cancelledAt = booking.cancelledAt
      ? new Date(booking.cancelledAt).toLocaleDateString('vi-VN')
      : new Date().toLocaleDateString('vi-VN');

    const refundText =
      refundAmount > 0
        ? `<div style="background:#f0fdf4;border-radius:8px;padding:14px;margin-top:20px;font-size:13px;color:#16a34a">
             Số tiền hoàn lại: <strong>${Number(refundAmount).toLocaleString('vi-VN')} ₫</strong><br>
             <span style="color:#6b7280">Dự kiến xử lý trong 3-5 ngày làm việc</span>
           </div>`
        : `<div style="background:#fef9c3;border-radius:8px;padding:14px;margin-top:20px;font-size:13px;color:#854d0e">
             Không hoàn tiền theo chính sách hủy phòng.
           </div>`;

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: user.email,
      subject: `[Hotel Booking] Xác nhận hủy đặt phòng #${booking.id}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;color:#1a1a1a">

          <div style="background:#dc2626;padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;font-size:18px;margin:0;font-weight:500">
              Xác nhận hủy đặt phòng
            </h1>
          </div>

          <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none">
            <p style="margin:0 0 16px">Xin chào <strong>${user.fullName}</strong>,</p>
            <p style="margin:0 0 20px;color:#6b7280;font-size:14px">
              Đơn đặt phòng của bạn đã được hủy. Dưới đây là thông tin chi tiết:
            </p>

            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Mã đơn đã hủy</td>
                <td style="padding:10px 14px;font-weight:500;border-bottom:1px solid #f3f4f6">#${booking.id}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Hạng phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${roomName}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Ngày nhận phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${checkIn}</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;color:#6b7280;border-bottom:1px solid #f3f4f6">Ngày trả phòng</td>
                <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6">${checkOut}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#6b7280">Thời điểm hủy</td>
                <td style="padding:10px 14px">${cancelledAt}</td>
              </tr>
            </table>

            ${refundText}
          </div>

          <div style="background:#f9fafb;padding:16px 24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center">
              Hotel Booking System · Mọi thắc mắc liên hệ qua email này
            </p>
          </div>

        </div>
      `,
    });

    console.log(`[Email] Gửi thông báo hủy thành công → ${user.email}`);
  } catch (err: any) {
    console.error(`[Email] Gửi thông báo hủy thất bại:`, err.message);
  }
};

export const sendResetPasswordEmail = async (
  email: string,
  fullName: string,
  resetLink: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: email,
      subject: '[Hotel Booking] Đặt lại mật khẩu',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto">
          <h2>Xin chào ${fullName},</h2>
          <p>
            Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.
          </p>
          <p>
            Nhấn vào nút bên dưới để đặt mật khẩu mới.
            Link có hiệu lực trong <strong>15 phút</strong>.
          </p>
          
          <a href="${resetLink}"
            style="display:inline-block;margin:16px 0;padding:12px 24px;background:#0f4c81;color:#fff;border-radius:8px;text-decoration:none;font-weight:500;"
          >
            Đặt lại mật khẩu
          </a>

          <p style="color:#888;font-size:12px">
            Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.
          </p>
        </div>
      `,
    }).catch((err) => {
      console.error('[Email] sendResetPasswordEmail error:', err);
    });
  } catch (err) {
    console.error('[Email] sendResetPasswordEmail error:', err);
  }
};
</file>

<file path="src/utils/jwt.util.ts">
import * as jwt from 'jsonwebtoken';
import { env } from '../config/env.config';

interface JwtPayload {
  userId: number;
  role: string;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};
</file>

<file path="src/utils/logger.util.ts">
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
</file>

<file path="src/utils/prisma.util.ts">
import { PrismaClient } from '@prisma/client';
import { env } from '../config/env.config';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
</file>

<file path="src/utils/response.util.ts">
import { Response } from 'express';

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface SuccessPayload<T> {
  success: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Thành công',
  statusCode: number = 200,
  meta?: PaginationMeta
): Response<SuccessPayload<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta && { meta }),
  });
};
</file>

<file path="src/utils/socket.util.ts">
import { getIO } from '../config/socket.config';

export const SOCKET_EVENTS = {
  BOOKING_UPDATED: 'booking:updated',
  ROOM_UPDATED: 'room:updated',
  PAYMENT_CONFIRMED: 'payment:confirmed',
  BOOKING_NEW: 'booking:new',
} as const;

export const emitBookingUpdate = (bookingId: number, data: unknown): void => {
  try {
    const io = getIO();
    io.to(`booking:${bookingId}`).emit(SOCKET_EVENTS.BOOKING_UPDATED, data);
    io.to('role:receptionist').emit(SOCKET_EVENTS.BOOKING_UPDATED, data);
    io.to('role:admin').emit(SOCKET_EVENTS.BOOKING_UPDATED, data);
  } catch (error) {
    console.error('Lỗi emit booking update:', error);
  }
};

export const emitPaymentConfirmed = (bookingId: number): void => {
  try {
    const io = getIO();
    io.to(`booking:${bookingId}`).emit(SOCKET_EVENTS.PAYMENT_CONFIRMED);
  } catch (error) {
    console.error('Lỗi emit payment confirmed:', error);
  }
};

export const emitNewBooking = (booking: {
  bookingId: number;
  roomTypeName: string;
  guestName: string;
  checkInDate: Date;
}): void => {
  try {
    const io = getIO();
    io.to('role:receptionist').emit(SOCKET_EVENTS.BOOKING_NEW, booking);
    io.to('role:admin').emit(SOCKET_EVENTS.BOOKING_NEW, booking);
  } catch (err) {
    console.error('[Socket] emitNewBooking error:', err);
  }
};
</file>

<file path="src/validations/auth.schema.ts">
import { z } from 'zod';

const fullNameSchema = z
  .string({ required_error: 'Họ tên là bắt buộc' })
  .trim()
  .min(2, 'Họ tên phải có ít nhất 2 ký tự');

const emailSchema = z
  .string({ required_error: 'Email là bắt buộc' })
  .trim()
  .email('Email không đúng định dạng');

const phoneNumberSchema = z
  .string({ required_error: 'Số điện thoại là bắt buộc' })
  .trim()
  .regex(/^\d{10,11}$/, 'Số điện thoại phải có 10 đến 11 chữ số');

const passwordSchema = z
  .string({ required_error: 'Mật khẩu là bắt buộc' })
  .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
  .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái viết thường')
  .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa')
  .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 số')
  .regex(/[\W_]/, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt');

export const registerSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  identifier: z
    .string({ required_error: 'Email hoặc số điện thoại là bắt buộc' })
    .trim()
    .min(1, 'Vui lòng không để trống email hoặc số điện thoại'),
  password: passwordSchema,
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema, 
});

export const resetPasswordSchema = z.object({
  token: z.string({ required_error: 'Token là bắt buộc' }).min(1, 'Token không hợp lệ'),
  password: passwordSchema, 
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Họ tên tối thiểu 2 ký tự').optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10,11}$/, 'Số điện thoại không hợp lệ')
    .optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Nhập mật khẩu hiện tại'),
  newPassword: z.string().min(6, 'Mật khẩu mới tối thiểu 6 ký tự'),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
</file>

<file path="src/validations/booking.schema.ts">
import { z } from 'zod';

const MAX_STAY_DAYS = 30;
const MAX_GUESTS = 10;

const checkInDateSchema = z
  .string({ required_error: 'Ngày nhận phòng là bắt buộc' })
  .refine((d) => !isNaN(Date.parse(d)), 'Ngày nhận phòng không hợp lệ')
  .refine(
    (d) => new Date(d) >= new Date(new Date().toDateString()),
    'Ngày nhận phòng phải từ hôm nay trở đi'
  );

const checkOutDateSchema = z
  .string({ required_error: 'Ngày trả phòng là bắt buộc' })
  .refine((d) => !isNaN(Date.parse(d)), 'Ngày trả phòng không hợp lệ');

const guestCountSchema = z
  .number({ required_error: 'Số lượng khách là bắt buộc' })
  .int('Số lượng khách phải là số nguyên')
  .min(1, 'Số lượng khách phải ít nhất là 1')
  .max(MAX_GUESTS, `Số lượng khách tối đa là ${MAX_GUESTS} người`);

const checkDateRange = (d: { checkInDate: string; checkOutDate: string }) => {
  const diffMs = new Date(d.checkOutDate).getTime() - new Date(d.checkInDate).getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= MAX_STAY_DAYS;
};

const bookingItemSchema = z.object({
  roomTypeId: z.coerce.number().int().min(1, 'Loại phòng không hợp lệ'),
  quantity: z.coerce.number().int().min(1, 'Số lượng phải ít nhất là 1').max(10, 'Tối đa 10 phòng mỗi loại'),
});

export const createBookingSchema = z
  .object({
    items: z.array(bookingItemSchema).min(1, 'Giỏ hàng trống, chọn ít nhất 1 phòng'),
    checkInDate: z.string().min(1, 'Vui lòng chọn ngày nhận phòng'),
    checkOutDate: z.string().min(1, 'Vui lòng chọn ngày trả phòng'),
    guestCount: z.coerce.number().int().min(1).max(MAX_GUESTS),
    specialRequests: z.string().max(500).optional(),
    promoCode: z.string().optional(),
  })
  .refine(
    (d) => new Date(d.checkOutDate) > new Date(d.checkInDate),
    {
      message: 'Ngày trả phòng phải sau ngày nhận phòng',
      path: ['checkOutDate'],
    }
  )
  .refine(checkDateRange, {
    message: `Thời gian lưu trú tối đa là ${MAX_STAY_DAYS} ngày`,
    path: ['checkOutDate'],
  });

export const createOfflineBookingSchema = z
  .object({
    userId: z
      .number()
      .int('Mã người dùng phải là số nguyên')
      .min(1, 'Mã người dùng không hợp lệ')
      .optional()
      .nullable(),
    newCustomer: z
      .object({
        fullName: z.string({ required_error: 'Tên khách hàng là bắt buộc' }),
        phoneNumber: z.string({ required_error: 'Số điện thoại là bắt buộc' }),
      })
      .optional(),
    items: z.array(bookingItemSchema).min(1, 'Giỏ hàng trống, chọn ít nhất 1 phòng'),
    checkInDate: checkInDateSchema,
    checkOutDate: checkOutDateSchema,
    guestCount: guestCountSchema,
    paymentMethod: z.enum(['cash', 'card', 'qr_code'], {
      required_error: 'Phương thức thanh toán là bắt buộc',
      invalid_type_error: 'Phương thức thanh toán không hợp lệ',
    }),
    promoCode: z.string().optional(),
  })
  .refine(
    (d) => new Date(d.checkOutDate) > new Date(d.checkInDate),
    {
      message: 'Ngày trả phòng phải sau ngày nhận phòng',
      path: ['checkOutDate'],
    }
  )
  .refine(checkDateRange, {
    message: `Thời gian lưu trú tối đa là ${MAX_STAY_DAYS} ngày`,
    path: ['checkOutDate'],
  });
  
export const getAllBookingsQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive('Trang phải là số nguyên dương')
    .optional(),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100, 'Không thể lấy quá 100 đơn mỗi lần')
    .optional(),
  status: z.enum(
    ['pending_payment', 'confirmed', 'checked_in', 'checked_out', 'cancelled'],
    { invalid_type_error: 'Trạng thái không hợp lệ' }
  ).optional(),
  source: z.enum(['online', 'offline']).optional(),
  checkInDate: z
    .string()
    .refine((d) => !isNaN(Date.parse(d)), 'Ngày không hợp lệ')
    .optional(),
  search: z.string().optional(),
  keyword: z.string().optional(),
});

export const updateOfflineBookingSchema = z.object({
  userId: z.coerce.number().int().min(1).optional(),
  roomId: z.coerce.number().int().min(1).optional(),
  checkInDate: z
    .string()
    .refine((d) => !isNaN(Date.parse(d)), 'Ngày nhận phòng không hợp lệ')
    .optional(),
  checkOutDate: z
    .string()
    .refine((d) => !isNaN(Date.parse(d)), 'Ngày trả phòng không hợp lệ')
    .optional(),
  guestCount: z.coerce.number().int().min(1).max(MAX_GUESTS).optional(),
  paymentMethod: z.enum(['cash', 'card']).optional(),
});

export type UpdateOfflineBookingDto = z.infer<typeof updateOfflineBookingSchema>;
export type CreateBookingDto = z.infer<typeof createBookingSchema>;
export type CreateOfflineBookingDto = z.infer<typeof createOfflineBookingSchema>;
export type GetAllBookingsQueryDto = z.infer<typeof getAllBookingsQuerySchema>;

export const createReviewSchema = z.object({
  rating: z
    .number({ required_error: 'Đánh giá là bắt buộc' })
    .int('Đánh giá phải là số nguyên')
    .min(1, 'Đánh giá thấp nhất là 1')
    .max(5, 'Đánh giá cao nhất là 5'),
  comment: z
    .string()
    .max(500, 'Bình luận không được vượt quá 500 ký tự')
    .optional(),
});

export type CreateReviewDto = z.infer<typeof createReviewSchema>;

export const checkInSingleRoomSchema = z.object({
  bookingRoomTypeId: z.coerce.number().int().min(1, 'Thiếu thông tin loại phòng cần check-in'),
  roomId: z.coerce.number().int().min(1, 'Vui lòng chọn phòng để check-in'),
  idNumber: z.string().optional(),
  checkinNote: z.string().optional(),
});

export const checkOutRoomSchema = z.object({
  extraCharges: z
    .array(z.object({ label: z.string(), amount: z.coerce.number().min(0) }))
    .optional(),
  paymentMethod: z.enum(['cash', 'card', 'qr_code']).optional(),
});

export type CheckInSingleRoomDto = z.infer<typeof checkInSingleRoomSchema>;
export type CheckOutRoomDto = z.infer<typeof checkOutRoomSchema>;

export const checkInMultipleSchema = z.object({
  idNumber: z.string().optional(),
  checkinNote: z.string().optional(),
  assignments: z.array(z.object({
    bookingRoomTypeId: z.coerce.number().int().min(1),
    roomId: z.coerce.number().int().min(1),
  })).min(1, 'Phải có ít nhất một phòng được gán'),
});

export type CheckInMultipleDto = z.infer<typeof checkInMultipleSchema>;
</file>

<file path="src/validations/hotel.schema.ts">
import { z } from 'zod';

export const roomTypeSchema = z.object({
  typeName: z
    .string({ required_error: 'Tên loại phòng là bắt buộc' })
    .min(1, 'Tên loại phòng không được để trống'),
  description: z.string().optional(),
  maxCapacity: z.coerce
    .number({ required_error: 'Sức chứa là bắt buộc' })
    .int()
    .positive('Sức chứa phải lớn hơn 0'),
  basePrice: z.coerce
    .number({ required_error: 'Giá cơ bản là bắt buộc' })
    .nonnegative('Giá cơ bản không được âm'),
  amenityIds: z
    .any()
    .transform((val) => {
      if (Array.isArray(val)) return val.map(Number);
      if (typeof val === 'string') {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) return parsed.map(Number);
          return [Number(parsed)];
        } catch {
          return [Number(val)];
        }
      }
      return [];
    }),
  version: z.coerce.number().int().nonnegative().optional(),
  deleteImageIds: z.union([z.string(), z.array(z.coerce.number().int().positive())]).optional(),
});

export const roomSchema = z.object({
  roomNumber: z
    .string({ required_error: 'Số phòng là bắt buộc' })
    .min(1, 'Số phòng không được để trống'),
  // Thêm z.coerce vào roomTypeId và floor
  roomTypeId: z.coerce
    .number({ required_error: 'Loại phòng là bắt buộc' })
    .int()
    .positive('roomTypeId không hợp lệ'),
  floor: z.coerce
    .number().int().positive('Tầng phải lớn hơn 0')
    .optional(),
  status: z.enum(['available', 'occupied', 'maintenance', 'cleaning', 'out_of_order'], {
    required_error: 'Trạng thái phòng là bắt buộc',
    invalid_type_error: 'Trạng thái phòng không hợp lệ',
  }),
});

export const amenitySchema = z.object({
  amenityName: z
    .string({ required_error: 'Tên tiện ích là bắt buộc' })
    .min(1, 'Tên tiện ích không được để trống'),
  description: z.string().optional(),
});

export const updateAmenitySchema = z.object({
  amenityName: z.string().min(1, 'Tên tiện ích không được để trống').optional(),
  description: z.string().optional(),
});

// Thêm schema mới cho PATCH /admin/rooms/:id/status
export const updateRoomStatusSchema = z.object({
  status: z.enum(['available', 'occupied', 'maintenance', 'cleaning', 'out_of_order'], {
    required_error: 'Trạng thái phòng là bắt buộc',
    invalid_type_error: 'Trạng thái phòng không hợp lệ',
  }),
  version: z.number({ required_error: 'Version là bắt buộc' }).int().nonnegative('Version không hợp lệ'),
});

export const searchAvailableSchema = z.object({
  checkIn: z.string().refine((d) => !isNaN(Date.parse(d)), 'checkIn không hợp lệ'),
  checkOut: z.string().refine((d) => !isNaN(Date.parse(d)), 'checkOut không hợp lệ'),
  guests: z.coerce.number().int().min(1).max(10, 'Số lượng khách quá lớn'),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
})
  .refine(
    (d) => new Date(d.checkIn) >= new Date(new Date().toDateString()),
    'checkIn phải từ hôm nay trở đi'
  )
  .refine(
    (d) => new Date(d.checkOut) > new Date(d.checkIn),
    'checkOut phải sau checkIn'
  )
  .refine(
    (d) => {
      const diffMs = new Date(d.checkOut).getTime() - new Date(d.checkIn).getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      return diffDays <= 30;
    },
    'Thời gian đặt phòng tối đa là 30 ngày'
  );

export type RoomTypeDto = z.infer<typeof roomTypeSchema>;
export type RoomDto = z.infer<typeof roomSchema>;
export type AmenityDto = z.infer<typeof amenitySchema>;
export type UpdateAmenityDto = z.infer<typeof updateAmenitySchema>;
export type UpdateRoomStatusDto = z.infer<typeof updateRoomStatusSchema>;
export type SearchAvailableDto = z.infer<typeof searchAvailableSchema>;
</file>

<file path="src/validations/payment.schema.ts">
import { z } from 'zod';

export const initiatePaymentSchema = z.object({
  bookingId: z
    .number({ required_error: 'Mã đặt phòng là bắt buộc' })
    .int('Mã đặt phòng phải là số nguyên')
    .min(1, 'Mã đặt phòng không hợp lệ'),
});

export const simulatePaymentSchema = z.object({
  transactionRef: z
    .string({ required_error: 'Mã giao dịch là bắt buộc' })
    .min(1, 'Mã giao dịch không được để trống'),
});

export type InitiatePaymentDTO = z.infer<typeof initiatePaymentSchema>;
export type SimulatePaymentDTO = z.infer<typeof simulatePaymentSchema>;
</file>

<file path="src/validations/promotion.schema.ts">
import { z } from 'zod';

export const createPromotionSchema = z.object({
  code: z.string({ required_error: 'Mã ưu đãi là bắt buộc' })
    .min(1, 'Mã ưu đãi không được để trống'),
  type: z.enum(['percentage', 'fixed', 'free_night'], { 
    required_error: 'Loại ưu đãi là bắt buộc',
    invalid_type_error: 'Loại ưu đãi không hợp lệ'
  }),
  value: z.number({ required_error: 'Giá trị ưu đãi là bắt buộc' })
    .positive('Giá trị ưu đãi phải lớn hơn 0'),
  minNights: z.number().int().positive('Số đêm tối thiểu phải lớn hơn 0').optional().nullable(),
  usageLimit: z.number().int().positive('Giới hạn lượt sử dụng phải lớn hơn 0').optional().nullable(),
  startDate: z.string({ required_error: 'Ngày bắt đầu là bắt buộc' })
    .refine((d) => !isNaN(Date.parse(d)), 'Ngày bắt đầu không hợp lệ'),
  endDate: z.string({ required_error: 'Ngày kết thúc là bắt buộc' })
    .refine((d) => !isNaN(Date.parse(d)), 'Ngày kết thúc không hợp lệ'),
  isActive: z.boolean().optional(),
}).refine(
  (d) => new Date(d.endDate) >= new Date(d.startDate),
  { message: 'Ngày kết thúc phải từ ngày bắt đầu trở đi', path: ['endDate'] }
);

export const updatePromotionSchema = z.object({
  code: z.string().min(1, 'Mã ưu đãi không được để trống').optional(),
  type: z.enum(['percentage', 'fixed', 'free_night']).optional(),
  value: z.number().positive('Giá trị ưu đãi phải lớn hơn 0').optional(),
  minNights: z.number().int().positive('Số đêm tối thiểu phải lớn hơn 0').optional().nullable(),
  usageLimit: z.number().int().positive('Giới hạn lượt sử dụng phải lớn hơn 0').optional().nullable(),
  startDate: z.string().refine((d) => !isNaN(Date.parse(d)), 'Ngày bắt đầu không hợp lệ').optional(),
  endDate: z.string().refine((d) => !isNaN(Date.parse(d)), 'Ngày kết thúc không hợp lệ').optional(),
  isActive: z.boolean().optional(),
}).refine(
  (d) => {
    if (d.startDate && d.endDate) {
      return new Date(d.endDate) >= new Date(d.startDate);
    }
    return true;
  },
  { message: 'Ngày kết thúc phải từ ngày bắt đầu trở đi', path: ['endDate'] }
);
</file>

<file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "typeRoots": ["./node_modules/@types", "./src/types"],
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "ts-node": {
    "files": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
</file>

<file path="tsconfig.seed.json">
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "typeRoots": ["./node_modules/@types", "./src/types"],
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "prisma/seed.ts"],
  "exclude": ["node_modules", "dist"]
}
</file>

</files>
