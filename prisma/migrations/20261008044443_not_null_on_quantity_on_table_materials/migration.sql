/*
  Warnings:

  - Made the column `quantity` on table `materials` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `status` to the `materials` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MaterialStatus" AS ENUM ('shipped_and_paid', 'pending_payment', 'pending_shipment', 'pending_shipment_and_payment', 'returned');

-- AlterTable
ALTER TABLE "materials" ALTER COLUMN "quantity" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "MaterialStatus" NOT NULL;
