import OpenAI from "openai";

export const gptClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generatePrompts = async (content: string) => {
    console.log("send message to gpt: " + content)
    const chatCompletion = await gptClient.chat.completions.create({
        messages: [{ role: 'user', content: content }],
        model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion.choices[0])
    console.log(chatCompletion.usage)
    const answer = chatCompletion.choices[0].message.content?.split("\n")
        .filter((line: string) => line.trim() !== '')
        .map((line: string) => line.replace(/^\d+\. /, ''));
    return answer;
}

export const promptToGpt = (theme: string, nog: number): string => {
    const imageCount = `generate ${nog} prompts for midjourney images.`;
    const formatInstructions = "only answer with the prompts and seperate them with a new line.";
    const themeType = theme === "any" ? "The Images shouldnt have any theme" : `This is the theme: ${theme}`;
    return `${imageCount} ${formatInstructions} ${themeType}`
}