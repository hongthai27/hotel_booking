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
