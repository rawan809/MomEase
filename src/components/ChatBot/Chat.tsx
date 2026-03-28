import React from "react";
import BotResponse from "./BotResponse";
import UserMessage from "./UserMessage";
import Loader from "./Loader";

interface Message {
  sender: "User" | "Bot";
  message: string;
  createdAt: string;
}

interface ChatProps {
  messages: Message[];
  loading: boolean;
}

function Chat({ messages, loading }: ChatProps) {
  // format time
  const formatChatDate = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
    );

    const messageDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    if (messageDay.getTime() === today.getTime()) {
      return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    }

    if (messageDay.getTime() === yesterday.getTime()) {
      return `Yesterday ${date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })}`;
    }

    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };
  return (
    <div className="flex flex-col gap-5 items-between">
      {messages.map((message, index) => {
        return message.sender == "User" ? (
          <UserMessage
            key={index}
            text={message.message}
            createdAt={formatChatDate(message.createdAt)}
          />
        ) : (
          <BotResponse
            key={index}
            text={message.message}
            createdAt={formatChatDate(message.createdAt)}
          />
          
        );
      })}
      {loading ? <Loader /> : null}
    </div>
  );
}

export default Chat;
