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
            console.log(msgs)
            setMessages(msgs);
        }
        init();
    }, []);

    return (
        <div className="flex flex-col h-[calc(91vh)]">
            <div className="overflow-auto p-0">
                <div className="columns-8 gap-1">
                    {messages.map((message) => (
                        message.image_upscale_urls.map((link, index) => (
                            <div key={`${message.id}-${index}`} className="mb-1">
                                <Image
                                    src={`https://mj-plus-bucket.s3.eu-north-1.amazonaws.com/images/${message.hash}_${index}.png`}
                                    alt={message.prompt}
                                    width={width}
                                    height={width}
                                    className="w-full"
                                />
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
}
