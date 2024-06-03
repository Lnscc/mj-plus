/*
  Warnings:

  - You are about to drop the `Gallery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Gallery";

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL DEFAULT '',
    "progress" TEXT NOT NULL DEFAULT '0%',
    "image_url" TEXT,
    "image_upscale_urls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "hash" TEXT,
    "aspect_ratio_x" INTEGER NOT NULL DEFAULT 1,
    "aspect_ratio_y" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);
