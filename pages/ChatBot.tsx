import React, { useState } from "react";
import Navbar from "../src/components/UI/Navbar";
import StartScreen from "../src/components/ChatBot/StartScreen";
import Input from "../src/components/ChatBot/Input";
import Chat from "../src/components/ChatBot/Chat";

export type Role = "user" | "bot";

export interface Message {
  role: Role;
  content: string;
}

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    // { role: "bot", content: "Hello! How can I assist you today?" },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = (text: string): void => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
    ]);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "" },
      ]);
    }, 2000);
  };

  return (
    <div className="flex flex-col">
      <Navbar />

      <div
        className={`mt-20 h-[calc(100vh-5rem)] flex flex-col px-(--space-lg) max-w-7xl mx-auto md:w-[50%] sm:w-[70%] w-full overflow-y-auto hide-scrollbar ${
          messages.length === 0 ? "" : "pb-35"
        }`}
      >
        {messages.length === 0 ? (
          <StartScreen />
        ) : (
          <Chat messages={messages} loading={loading} />
        )}
      </div>

      <div className="fixed bottom-0 left-0 flex justify-center w-full px-(--space-lg)">
        <div className="pb-5 bg-white rounded-t-xl mx-auto md:w-[50%] sm:w-[70%] w-full max-w-7xl">
          <Input onSend={sendMessage} loading={loading} />
          <p className="text-muted text-center text-[12px]">
            AI can make mistakes. Please double-check responses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;