import React from "react";
import botIcon from "../../assets/images/ChatIcon.svg";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function BotResponse({ text, createdAt }: { text: string; createdAt: string }) {
  const fallbackText = `I'm here for you 🤍 Tell me more so I can support you better.`;

  return (
    <div className=" gap-3 items-start mb-4">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-[#FFC8DD] shrink-0">
        <img src={botIcon} alt="bot" className="w-full h-full object-cover" />
      </div>

      {/* Message Content */}
      <div className="flex items-start flex-col ml-5 self-start">
        {/* Bubble */}
        <div className="p-3 bg-accent rounded-3xl md:max-w-[70%]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold mb-2">{children}</h2>
              ),
              p: ({ children }) => (
                <p className="mb-2 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc ml-5 mb-2 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal ml-5 mb-2 space-y-1">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
            }}
          >
            {text || fallbackText}
          </ReactMarkdown>
        </div>

        {/* Time */}
        <span className="text-[11px] text-gray-400 mt-1 ml-1">{createdAt}</span>
      </div>
    </div>
  );
}

export default BotResponse;
