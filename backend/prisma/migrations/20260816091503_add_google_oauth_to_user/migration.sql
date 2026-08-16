/*
  Warnings:

  - A unique constraint covering the columns `[google_id]` on the table `USER` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `google_id` VARCHAR(255) NULL,
    MODIFY `phone_number` VARCHAR(20) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `USER_google_id_key` ON `USER`(`google_id`);
