import React from "react";
import botIcon from "../../assets/images/ChatIcon.svg";

function BotResponse({ text, createdAt }: { text: string; createdAt: string }) {


  return (
    <div>
      <div className="bg-[#FFC8DD] aspect-square w-10 rounded-full mb-2">
        <img src={botIcon} alt="" className="rounded-full" />
      </div>
      <div className="flex items-start flex-col ml-5 self-start">
        <p className="p-3 bg-accent text-gray-700 rounded-3xl max-w-[70%] relative ">
          {text
            ? text
            : `Thank you for sharing that with me. I'm here to support you. Could you tell me a bit more about what you're experiencing so I can provide the best guidance`}
        </p>
        <p className=" text-[11px] pt-1 pl-3">{createdAt}</p>
      </div>
    </div>
  );
}

export default BotResponse;
