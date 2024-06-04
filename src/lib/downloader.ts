import { chromium } from 'playwright';
import { uploadFile } from './uploader';
import { addImageToMessage } from './messages';

const defaultPath = "C:/Users/Linus/Documents/Projekte/mj-plus/images";

const downloadImageBuffer = async (url: string): Promise<Buffer> => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });
    const page = await context.newPage();

    const response = await page.goto(url);

    if (!response || response.status() !== 200) {
        await browser.close();
        throw new Error(`Failed to fetch image from ${url}: ${response?.status()} ${response?.statusText()}`);
    }

    const buffer = await response.body();
    await browser.close();
    return buffer;
};

export const downloadImage = async (url: string, name: string, toPath = defaultPath): Promise<void> => {
    try {
        const buffer = await downloadImageBuffer(url);
        const s3Upload = await uploadFile(buffer, name)
        const hash = name.match(/^([a-f0-9-]+)_\d+\.\w+$/)?.[1]
        if(hash) addImageToMessage(hash, s3Upload.location)
    } catch (error) {
        console.error(`Error downloading ${url}:`, error);
    }
};

export const downloadMjImages = async (hash: string, toPath = defaultPath): Promise<void> => {
    for (let i = 0; i < 4; i++) {
        const url = `https://cdn.midjourney.com/${hash}/0_${i}.png`
        await downloadImage(url, `${hash}_${i}.png`, toPath)
    }
}