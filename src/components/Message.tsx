import Image from "next/image";
import { TailSpin } from 'react-loader-spinner';

export default function Message({message}: {message: MessageType}) {
    return (
        <div>
            {message.prompt} {message.hash}
            <div style={{ width: '500px', height: '500px', position: 'relative' }} className="bg-gray-200">
            {message.image_url === "" ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    <TailSpin
                        height="80"
                        width="80"
                        color="#00BFFF"
                        ariaLabel="loading"
                    />
                </div>
            ) : (
                <Image 
                    src={message.image_url} 
                    alt={message.prompt}
                    width={500}
                    height={500}
                />
            )}
        </div>
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