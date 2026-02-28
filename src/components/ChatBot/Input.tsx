import React from "react";
import { IoSend } from "react-icons/io5";
import { useState } from "react";

function Input({
  onSend,
  loading,
}: {
  onSend: (text: string) => void;
  loading: boolean;
}) {
  const [text, setText] = useState("");
  const disabled = !text.trim() || loading;

  const handleSend = (e: { key: string; }) => {
    if (e.key && e.key !== "Enter") return;
    if (!text.trim()) return;
    if (disabled) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="relative rounded-xl w-full ">
      <input
        type="text"
        onKeyDown={handleSend}
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Type your message here..."
        className="rounded-xl border-2 border-accent px-5 pr-12 py-2 focus:border-primary outline-none transition-all duration-75 w-full h-20 bg-white"
      />
      <button onClick={handleSend} disabled={disabled}>
        {" "}
        <IoSend
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${disabled ? "text-accent" : "text-primary cursor-pointer"} text-xl `}
        />
      </button>
    </div>
  );
}

export default Input;
