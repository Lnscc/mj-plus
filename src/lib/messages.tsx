"use server";
import { Imagine } from "@/lib/midjourney";
import { checkAuth } from "@/utils/checkAuth";
import prisma from "@/lib/prisma";
import { downloadMjImages } from "@/lib/downloader";

async function hasCreateImagePermission() {
  const { permissions } = await checkAuth();
  return permissions.createImage;
}

async function addNewMessage(message: string): Promise<number> {
  const res = await prisma.gallery.create({
    data: {
      prompt: message
    },
  });
  return res.id;
}

export async function addMessage(message: string) {
  if (!await hasCreateImagePermission()) return;
  
  console.log("Adding message: ", message);

  const currId = await addNewMessage(message);

  await Imagine(message, async (uri, progress) => {
    await setMessage(currId, {image_url: uri, progress: progress})
  }).then(async (message) => {
    await setMessage(currId, { hash: message?.hash, progress: "100%", image_url: message?.proxy_url })
    await downloadMjImages(message?.hash!)
  });
}


export async function getMessages() {
  return await prisma.gallery.findMany({ orderBy: { id: 'asc' } });
}

export async function getMessage(id: number) {
  return await prisma.gallery.findFirst({
    where: {
      id: id,
    },
  });
}

export async function setMessage(
  id: number, 
  data: { progress?: string, image_url?: string, hash?: string, prompt?: string }
) {
  return await prisma.gallery.update({
    where: { id },
    data,
  });
}

export async function deleteMessage(id: number) {
  return await prisma.gallery.delete({where: { id }});
}