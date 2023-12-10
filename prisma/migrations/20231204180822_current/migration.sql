/*
  Warnings:

  - The primary key for the `Discount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `colors` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Product` table. All the data in the column will be lost.
  - The `discountId` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `description` on the `ProductCategory` table. All the data in the column will be lost.
  - The primary key for the `ProductInventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `quantity` on the `ProductInventory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the `OrderItems` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `ShoppingSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Discount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CollectionSeason" AS ENUM ('SPRING', 'SUMMER', 'FALL', 'WINTER');

-- AlterEnum
ALTER TYPE "CategoryType" ADD VALUE 'KIDS';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProductColor" ADD VALUE 'YELLOW';
ALTER TYPE "ProductColor" ADD VALUE 'GRAY';
ALTER TYPE "ProductColor" ADD VALUE 'BEIGE';

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetails" DROP CONSTRAINT "OrderDetails_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_discountId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_inventoryId_fkey";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "color" "ProductColor" NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "size" "ProductSize" NOT NULL;

-- AlterTable
ALTER TABLE "Discount" DROP CONSTRAINT "Discount_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Discount_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OrderDetails" ALTER COLUMN "paymentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "colors",
DROP COLUMN "sizes",
ADD COLUMN     "collectionId" INTEGER,
DROP COLUMN "discountId",
ADD COLUMN     "discountId" INTEGER,
ALTER COLUMN "inventoryId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "ProductInventory" DROP CONSTRAINT "ProductInventory_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "quantity" SET DATA TYPE INTEGER,
ADD CONSTRAINT "ProductInventory_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "OrderItems";

-- CreateTable
CREATE TABLE "UserReview" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,

    CONSTRAINT "UserReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "color" "ProductColor" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "season" "CollectionSeason" NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorDetails" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "color" "ProductColor" NOT NULL,

    CONSTRAINT "ColorDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SizeDetails" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "size" "ProductSize" NOT NULL,

    CONSTRAINT "SizeDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "color" "ProductColor" NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategorySEO" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "CategoryType" NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "metaOGImage" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "CategorySEO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeSEO" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "CategoryType" NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "metaOGImage" TEXT,

    CONSTRAINT "TypeSEO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductColorInventory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "inventoryId" TEXT NOT NULL,

    CONSTRAINT "ProductColorInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSizeInventory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "colorInventoryId" TEXT NOT NULL,

    CONSTRAINT "ProductSizeInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "color" "ProductColor" NOT NULL,
    "size" "ProductSize" NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProductHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "historyId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "HistoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSizeDetails" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ColorDetailsToProduct" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ColorDetails_name_key" ON "ColorDetails"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ColorDetails_color_key" ON "ColorDetails"("color");

-- CreateIndex
CREATE UNIQUE INDEX "SizeDetails_name_key" ON "SizeDetails"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SizeDetails_size_key" ON "SizeDetails"("size");

-- CreateIndex
CREATE UNIQUE INDEX "TypeSEO_type_key" ON "TypeSEO"("type");

-- CreateIndex
CREATE UNIQUE INDEX "ProductHistory_userId_key" ON "ProductHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSizeDetails_AB_unique" ON "_ProductToSizeDetails"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSizeDetails_B_index" ON "_ProductToSizeDetails"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ColorDetailsToProduct_AB_unique" ON "_ColorDetailsToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ColorDetailsToProduct_B_index" ON "_ColorDetailsToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_slug_key" ON "ProductCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingSession_userId_key" ON "ShoppingSession"("userId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "Discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "ProductInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReview" ADD CONSTRAINT "UserReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategorySEO" ADD CONSTRAINT "CategorySEO_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductColorInventory" ADD CONSTRAINT "ProductColorInventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "ProductInventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSizeInventory" ADD CONSTRAINT "ProductSizeInventory_colorInventoryId_fkey" FOREIGN KEY ("colorInventoryId") REFERENCES "ProductColorInventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "PaymentDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "OrderDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ShoppingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryItem" ADD CONSTRAINT "HistoryItem_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "ProductHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryItem" ADD CONSTRAINT "HistoryItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSizeDetails" ADD CONSTRAINT "_ProductToSizeDetails_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSizeDetails" ADD CONSTRAINT "_ProductToSizeDetails_B_fkey" FOREIGN KEY ("B") REFERENCES "SizeDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColorDetailsToProduct" ADD CONSTRAINT "_ColorDetailsToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "ColorDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColorDetailsToProduct" ADD CONSTRAINT "_ColorDetailsToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
