'use server';
import { Midjourney } from "midjourney";

let mjClient: Midjourney;
let results: { [key: string]: { uri: string; progress: string } } = {};

export async function initMjClient() {
    if(mjClient) return;
    mjClient = new Midjourney({
        SalaiToken: process.env.SALAI_TOKEN!,
        ChannelId: process.env.CHANNEL_ID!,
        ServerId: process.env.SERVER_ID!,
        Debug: false,
        Ws: true,
    });

    await mjClient.init();
    return mjClient;
}

export async function Imagine(prompt: string, loading: (uri: string, progress: string) => void) {
    const response = await mjClient.Imagine(prompt, loading);
    return response;
}

export async function currentResults() {
    return results;
}