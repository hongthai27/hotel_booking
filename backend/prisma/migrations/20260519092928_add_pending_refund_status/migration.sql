-- AlterTable
ALTER TABLE `payment` MODIFY `status` ENUM('pending', 'success', 'failed', 'pending_refund', 'refunded') NOT NULL DEFAULT 'pending';
