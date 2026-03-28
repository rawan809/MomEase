import React from "react";

function UserMessage({ text, createdAt }: { text: string; createdAt: string }) {
  return (
    <div className="flex items-end flex-col">
      <p className="p-3 bg-[#FF66A1] text-white rounded-3xl md:max-w-[70%]">
        {text}
      </p>
      <p className="text-[11px] pt-1 pr-3">{createdAt}</p>
    </div>
  );
}

export default UserMessage;
