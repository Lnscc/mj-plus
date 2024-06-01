"use client";
import Message, { MessageType } from "@/components/Message";
import { getMessages } from "@/lib/messages";
import { useEffect, useState, useRef } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([] as MessageType[]);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMessages = await getMessages();
      setMessages(fetchedMessages);
    };

    const interval = setInterval(() => {
      fetchData();
    }, 3 * 1000);

    fetchData();

    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };
  
  return (
    <>
      <div className="flex-grow overflow-auto p-0" ref={chatBoxRef}>
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              <Message message={msg} />
            </li>
          ))}
        </ul>
      </div>
      <button onClick={scrollToBottom}>Scroll</button>
    </>
  );
}
