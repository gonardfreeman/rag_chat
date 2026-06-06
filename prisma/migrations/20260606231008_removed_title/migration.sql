/*
  Warnings:

  - The primary key for the `Document` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `title` on the `Document` table. All the data in the column will be lost.
  - Changed the type of `id` on the `Document` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Document" DROP CONSTRAINT "Document_pkey",
DROP COLUMN "title",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Document_pkey" PRIMARY KEY ("id");
