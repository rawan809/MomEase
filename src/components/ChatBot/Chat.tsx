import React from "react";
import BotResponse from "./BotResponse";
import UserMessage from "./UserMessage";
import Loader from "./Loader";
import { formatDate } from "@/utils/formatDate";

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

  return (
    <div className="flex flex-col gap-5 items-between">
      {messages.map((message, index) => {
        return message.sender == "User" ? (
          <UserMessage
            key={index}
            text={message.message}
            createdAt={formatDate(message.createdAt)}
          />
        ) : (
          <BotResponse
            key={index}
            text={message.message}
            createdAt={formatDate(message.createdAt)}
          />
        );
      })}
      {loading ? <Loader /> : null}
    </div>
  );
}

export default Chat;
