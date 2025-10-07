/*
  Warnings:

  - Added the required column `updated_at` to the `activity_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ai_recommendations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `campaign_documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `certificates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `donation_receipts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `login_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `news_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `payment_methods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `report_photos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `report_verifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `soil_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tree_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `verification_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity_logs` ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `ai_recommendations` ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `campaign_documents` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `campaign_progress` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `campaigns` ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `certificates` ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `donation_receipts` ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `donations` ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `locations` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `login_logs` ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `news_posts` ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `payment_methods` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `report_photos` ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `report_verifications` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `reports` ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `roles` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `soil_types` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `suppliers` ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `system_settings` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `tree_types` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_by` INTEGER NULL;

-- AlterTable
ALTER TABLE `verification_logs` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_by` INTEGER NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_by` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` INTEGER NULL;
