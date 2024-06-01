"use server";
import { addMessage } from "./messages";

export async function sendPrompt (formData: FormData) {
    const prompt = formData.get('prompt') as string;
    addMessage(prompt);
  }