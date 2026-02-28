import React from "react";

function UserMessage({text}:{text:string}) {
  const date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  const h = hour;
  const m = min;
  return (
    <div className="flex items-end flex-col">
      <p className="p-3 bg-[#FF66A1] text-white rounded-3xl md:max-w-[70%]">
        {text}
      </p>
      <p className="text-[11px] pt-1 pr-3">
        {h === 0 ? 12 : h > 12 ? h - 12 : h}:{m.toString().padStart(2, "0")}{" "}
        {h >= 12 ? "PM" : "AM"}
      </p>
    </div>
  );
}

export default UserMessage;
