"use server";
import { addMessage } from "./messages";

export async function sendPrompt (formData: FormData) {
  const prompt = formData.get('prompt')?.toString().trim();
  const params = formData.get('params')?.toString().trim();
    addMessage(prompt!, params);
  }