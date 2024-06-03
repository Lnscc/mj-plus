/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Messages` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "gptPrompt" TEXT,
ADD COLUMN     "params" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Messages_hash_key" ON "Messages"("hash");
