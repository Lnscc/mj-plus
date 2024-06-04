"use client";
import { MessageType } from "@/components/Message";
import { getMessages } from "@/lib/messages";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const width = 200;

    useEffect(() => {
        async function init() {
            const msgs = (await getMessages()).reverse()
            setMessages(msgs);
        }
        init();
    }, []);

    return (
        <div className="flex flex-col h-[calc(91vh)]">
            <div className="overflow-auto p-0">
                <div className="flex flex-wrap">
                    {messages.map((message) => (
                        message.image_upscale_urls.map((link, index) => (
                            <div key={`${message.id}-${index}`} className="mb-1 mr-1" style={{ width: width, height: width, overflow: 'hidden' }}>
                                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                    <Image
                                        src={link}
                                        alt={message.prompt}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
}
