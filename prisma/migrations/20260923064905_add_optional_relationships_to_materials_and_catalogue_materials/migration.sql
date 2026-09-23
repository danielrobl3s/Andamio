-- AlterTable
ALTER TABLE "materials" ADD COLUMN     "brand" TEXT,
ADD COLUMN     "material_name" TEXT,
ADD COLUMN     "unitary_price" DECIMAL(10,2),
ADD COLUMN     "vendor_name" TEXT,
ALTER COLUMN "catalogue_material_id" DROP NOT NULL;
