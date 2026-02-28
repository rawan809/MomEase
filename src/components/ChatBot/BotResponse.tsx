import React from "react";
import botIcon from "../../assets/images/ChatIcon.svg";

function BotResponse({text}:{text:string}) {
  const date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  const h = hour;
  const m = min;

  return (
    <div>
      <div className="bg-[#FFC8DD] aspect-square w-10 rounded-full mb-2">
        <img
          src={botIcon}
          alt=""
          className="rounded-full"
        />
      </div>
      <div className="flex items-start flex-col ml-5 self-start">
        <p className="p-3 bg-accent text-gray-700 rounded-3xl max-w-[70%] relative ">
          {text
            ? text
            : `Thank you for sharing that with me. I'm here to support you. Could you tell me a bit more about what you're experiencing so I can provide the best guidance`}
        </p>
        <p className=" text-[11px] pt-1 pl-3">
          {h === 0 ? 12 : h > 12 ? h - 12 : h}:{m.toString().padStart(2, "0")}{" "}
          {h >= 12 ? "PM" : "AM"}
        </p>
      </div>
    </div>
  );
}

export default BotResponse;
