import { useState, useEffect, useRef } from "react";
import Navbar from "../src/components/UI/Navbar";
import StartScreen from "../src/components/ChatBot/StartScreen";
import Input from "../src/components/ChatBot/Input";
import Chat from "../src/components/ChatBot/Chat";
import { sendMessage, getHistory } from "../services/chatbot";

export type Role = "User" | "Bot";

export interface Message {
  sender: Role;
  message: string;
  createdAt: string;
}

function ChatBot() {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const userIdStr = localStorage.getItem("userId");
  const userId = userIdStr ? Number(userIdStr) : undefined;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);

  // send and reply
  const send = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "User", message: text, createdAt: new Date().toISOString() },
    ]);

    setLoading(true);
    try {
      if (typeof userId === "number" && !isNaN(userId)) {
        const res = await sendMessage(userId, text);
        setMessages((prev) => [
          ...prev,
          {
            sender: "Bot",
            message: res.data.reply,
            createdAt: res.data.createdAt,
          },
        ]);
        // replyAt = res.data.createdAt;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // history
  useEffect(() => {
    const fetchData = async () => {
      setLoadingHistory(true);
      try {
        const res = await getHistory();
        setMessages(res.data.messages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchData();
  }, []);

  // auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loadingHistory]);

  return (
    <div className="flex flex-col">
      <Navbar />

      <div
        className={`mt-20 h-[calc(100vh-5rem)] flex flex-col px-(--space-lg) max-w-7xl mx-auto md:w-[50%] sm:w-[70%] w-full overflow-y-auto hide-scrollbar ${
          messages.length === 0 ? "" : "pb-35"
        }`}
      >
        {messages.length === 0 || loadingHistory ? (
          <StartScreen />
        ) : (
          <>
            <Chat messages={messages} loading={loading} />
            <div ref={bottomRef} />
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-0 flex justify-center w-full px-(--space-lg)">
        <div className="pb-5 bg-white rounded-t-xl mx-auto md:w-[50%] sm:w-[70%] w-full max-w-7xl">
          <Input onSend={send} loading={loading} />
          <p className="text-muted text-center text-[12px]">
            AI can make mistakes. Please double-check responses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
