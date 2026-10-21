-- AlterTable
ALTER TABLE "materials" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Backfill: existing purchases are dated by when they were recorded
UPDATE "materials" SET "date" = "created_at";
