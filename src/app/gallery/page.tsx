"use client";
import { MessageType } from "@/components/Message";
import { getMessages } from "@/lib/messages";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
    const [messages, setMessages] = useState<MessageType[]>([]);

    useEffect(() => {
        async function init() {
            const msgs = (await getMessages()).reverse();
            setMessages(msgs);
        }
        init();
    }, []);

    return (
        <div className="flex flex-col h-[calc(91vh)]">
            <div className="overflow-auto p-0">
                <div className="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1">
                    {messages.map((message) =>
                        message.image_upscale_urls.map((link, index) => (
                            <div key={`${message.id}-${index}`} className="relative">
                                <Image
                                    src={link}
                                    alt={message.prompt}
                                    layout="responsive"
                                    width={1}
                                    height={1}
                                    objectFit="cover"
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
