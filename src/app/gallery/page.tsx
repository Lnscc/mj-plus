"use client";
import { MessageType } from "@/components/Message";
import { getMessages } from "@/lib/messages";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

export default function Page() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const width = 200;

    useEffect(() => {
        async function init() {
            setMessages((await getMessages()).reverse());
        }
        init();
    }, []);

    return (
        <div className="flex flex-wrap">
            {messages.filter((message) => message.progress === "100%").map((message) => (
                <div key={message.id} className="p-0">
                    {
                        Array.from({ length: 4 }).map((_, index) => (
                            <Image
                                key={index}
                                src={`https://mj-plus-bucket.s3.eu-north-1.amazonaws.com/images/${message.hash}_${index}.png`}
                                alt={message.prompt}
                                width={width}
                                height={width}
                            />
                        ))
                    }
                </div>
            ))}
        </div>
    );
}
