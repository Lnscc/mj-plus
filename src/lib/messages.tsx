"use server";
import { MessageType } from "@/components/Message";
import { Imagine } from "@/lib/midjourney";
import { checkAuth } from "@/utils/checkAuth";

let messages: MessageType[] = [
  // { id: -1, prompt: "Testing", image_url: "", progress: "0%" }
];
let id = 0;

export async function addMessage(message: string, onProgress: (uri: string, progress: string) => void) {
  const { permissions } = await checkAuth();
  if (!permissions.createImage) return;
  
  console.log("Adding message: ", message);

  const currId = id++;
  messages.push({ id: currId, prompt: message, image_url: "", progress: "0%" });
  console.log("Messages: ", messages);
  onProgress("", "0%");
  await Imagine(message, async (uri, progress) => {
    const msg = await getMessage(currId);
    if (msg) {
      msg.image_url = uri;
      msg.progress = progress;
      onProgress(uri, progress);
    }
  }).then(async (message) => {
    const msg = await getMessage(currId);
    if (msg) {
      msg.hash = message!.hash;
      msg.progress = "100%";
      msg.image_url = message!.proxy_url ?? "";
      onProgress(msg.image_url, msg.progress);
    }
  });
}

export async function getMessages() {
  return messages;
}

export async function getMessage(id: number): Promise<MessageType | undefined> {
  return messages.find((msg) => msg.id === id);
}
