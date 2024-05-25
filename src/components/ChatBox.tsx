"use client";
import Message, { MessageType } from "@/components/Message";
import { getMessages } from "@/lib/messages";
import { useEffect, useState } from "react";

export default function ChatBox() {
    const [messages, setMessages] = useState([] as MessageType[]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching messages");
            const messages = await getMessages();
            console.log(messages);
            setMessages(messages);
        };

        const interval = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    return (
        <ul>
            {messages.map((msg: MessageType, index) => (
                <li key={msg.id}>
                    <Message message={msg}/>
                </li>
            ))}
        </ul>
    );
}
