"use client";
import Message, { MessageType } from "@/components/Message";
import { getMessages } from "@/lib/messages";
import { useEffect, useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([] as MessageType[]);

  useEffect(() => {
    const fetchData = async () => {
      setMessages(await getMessages());
    };

    const interval = setInterval(() => {
      fetchData();
    }, 2500);

    return () => clearInterval(interval);
  }, [])

  return (
    <div className="flex-grow overflow-auto p-0">
      <ul>
        {messages.map((msg, index) => (
          <li key={msg.id}>
            <Message message={msg} />
          </li>
        ))}
      </ul>
    </div>
  );
}
