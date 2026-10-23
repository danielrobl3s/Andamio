-- AlterTable
ALTER TABLE "client_logs" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "notes" TEXT,
ALTER COLUMN "payment_type" DROP NOT NULL;

-- Backfill: existing payments are dated by when they were recorded
UPDATE "client_logs" SET "date" = "created_at";
