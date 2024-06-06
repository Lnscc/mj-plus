"use server";
import { addMessage } from "@/lib/messages";
import { generatePrompts, promptToGpt } from "@/lib/generatePrompts";

interface FormDataObject {
  theme: string | undefined;
  themeOptions: string | undefined;
  params: string | undefined;
  numberInput: string | undefined;
  gpt: boolean;
  prompt: string | undefined;
}

export async function sendPrompt(formData: FormData) {
  const data = {
    theme: formData.get('theme')?.toString().trim(),
    themeOptions: formData.get('themeOptions')?.toString().trim(),
    params: formData.get('params')?.toString().trim(),
    nog: parseInt(formData.get('nog')?.toString() ?? "1"),
    gpt: formData.get('gpt') === 'on',
    prompt: formData.get('prompt')!.toString().trim()
  };

  console.log(data)
  if(!data.gpt) return addMessage(data.prompt, data.params); 
  const prompts = await generatePrompts(promptToGpt(data.prompt, data.nog))
  prompts?.forEach(prompt => addMessage(prompt, data.params))
}