import Image from "next/image";

export default function Message({message}: {message: MessageType}) {
    return (
        <div>
            {message.prompt} {message.hash}
            <Image 
                src={message.image_url} 
                alt={message.prompt} 
                width={500}
                height={500}
            />
        </div>
    );
}

export type MessageType = {
    id: number,
    prompt: string, 
    image_url: string, 
    progress: string,
    hash?: string
};