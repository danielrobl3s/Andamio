-- CreateEnum
CREATE TYPE "ExpenseKind" AS ENUM ('labor', 'indirect');

-- AlterTable
ALTER TABLE "labor" ALTER COLUMN "worker_lastname" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "has_insurance" SET DEFAULT false,
ALTER COLUMN "working_since" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "kind" "ExpenseKind" NOT NULL DEFAULT 'indirect';

-- Backfill: expenses already tied to a registered worker are labor payments
UPDATE "expenses" SET "kind" = 'labor' WHERE "worker_id" IS NOT NULL;
