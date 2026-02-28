import React from "react";
import chatbotimg from "../../assets/images/chatbot.svg";

function StartScreen() {
  return (
    <div className="flex flex-col items-center text-center justify-center">
      <div>
        <img src={chatbotimg} alt="" className="w-65"/>
      </div>
      <div>
        <p className="font-semibold text-h2">
          Hi,
          <span className="font-brand text-primary">Mama!</span>
        </p>
        <p className="text-muted text-normal">What can I help you with?</p>
      </div>
    </div>
  );
}

export default StartScreen;
