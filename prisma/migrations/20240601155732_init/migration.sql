/*
  Warnings:

  - Made the column `prompt` on table `Gallery` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Gallery" ALTER COLUMN "prompt" SET NOT NULL,
ALTER COLUMN "prompt" SET DEFAULT '';
