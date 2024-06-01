-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "progress" TEXT NOT NULL DEFAULT '0%',
    "image_url" TEXT,
    "hash" TEXT,
    "prompt" TEXT,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);
