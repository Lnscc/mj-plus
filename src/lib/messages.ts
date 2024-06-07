"use server";
import { Imagine, initMjClient } from "@/lib/midjourney";
import { checkAuth } from "@/utils/checkAuth";
import prisma from "@/lib/prisma";
import { downloadMjImages } from "@/lib/downloader";
import PQueue from 'p-queue';
import { handleDelay } from "@/utils/delay";

const queue = new PQueue({ concurrency: 3 });

async function hasCreateImagePermission() {
  const { permissions } = await checkAuth();
  return permissions.createImage;
}

const getAspectRatio = (params?: string) => {
  if (!params) return;
  const ar = params.match(/--ar (\d+):(\d+)/);
  if (ar) return { x: parseInt(ar[1]), y: parseInt(ar[2]) }
}

async function addNewMessage(prompt: string, params?: string): Promise<number> {
  const ar = getAspectRatio(params);
  const res = await prisma.messages.create({
    data: {
      prompt: prompt,
      params: params,
      aspect_ratio_x: ar?.x,
      aspect_ratio_y: ar?.y
    },
  });
  return res.id;
}

export async function addMessage(prompt: string, params?: string) {
  if (!await hasCreateImagePermission()) return;

  const message = (prompt + " " + params).trim();
  console.log("Adding message: ", message);

  const currId = await addNewMessage(prompt, params);
  
  await initMjClient();

  queue.add(async () => {
    console.log("add to queue");
    try {
      await handleDelay(3000);
      await Imagine(message, async (uri, progress) => {
        await setMessage(currId, { image_url: uri, progress: progress });
      }).then(async (message) => {
        if (message) {
          await setMessage(currId, { hash: message.hash, progress: "100%", image_url: message.proxy_url });
          await downloadMjImages(message.hash!);
        }
      });
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }).catch(error => {
    console.error("Queue task timed out or failed:", error);
  });
}

export async function getMessages() {
  return await prisma.messages.findMany({ orderBy: { id: 'asc' } });
}

export async function getMessage(id: number) {
  return await prisma.messages.findFirst({
    where: {
      id: id,
    },
  });
}

export async function setMessage(
  id: number,
  data: { progress?: string, image_url?: string, hash?: string, prompt?: string }
) {
  return await prisma.messages.update({
    where: { id },
    data,
  });
}

export async function addImageToMessage(hash: string, image_upscale_url: string) {
  const message = await prisma.messages.update({
    where: { hash },
    data: {
      image_upscale_urls: {
        push: image_upscale_url,
      },
    },
  });
  return message;
}

export async function deleteMessage(id: number) {
  return await prisma.messages.delete({ where: { id } });
}

function getQueueStatus() {
  return {
    pending: queue.pending,
    active: queue.size,
  };
}

queue.on('add', () => {
  console.log('Task added to the queue. Current queue status:', getQueueStatus());
});

queue.on('idle', () => {
  console.log('Queue is now idle. Current queue status:', getQueueStatus());
});
