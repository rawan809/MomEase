import React from "react";
import BotResponse from "./BotResponse";
import UserMessage from "./UserMessage";
import Loader from "./Loader";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatProps {
  messages: Message[];
  loading: boolean;
}

function Chat({ messages, loading }: ChatProps) {
  console.log(messages);
  return (
    <div className="flex flex-col gap-5 items-between">
      {messages.map((message, index) => {
        return message.role == "user" ? (
          <UserMessage key={index} text={message.content} />
        ) : (
          <BotResponse key={index} text={message.content} />
        );
      })}
      {loading ? <Loader /> : null}
    </div>
  );
}

export default Chat;
