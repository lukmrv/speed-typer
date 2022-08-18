/*
  Warnings:

  - You are about to drop the column `errorsTimestsmps` on the `Result` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Result" DROP COLUMN "errorsTimestsmps",
ADD COLUMN     "errorsTimestamps" DOUBLE PRECISION[];
