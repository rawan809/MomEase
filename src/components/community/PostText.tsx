import { useState } from "react";

type PostTextProps = {
  text: string | null;
};

function PostText({ text }: PostTextProps) {
  // read more
  const [isExpanded, setIsExpanded] = useState(false);
  const TEXT_LIMIT = 150;
  const toggleReadMore = () => setIsExpanded(!isExpanded);
  //   lang
  const isArabic = (text: string): boolean => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  };
  return text ? (
    <div className="mb-3 px-1">
      <p
        dir="auto"
        className="text-gray-700 text-start leading-relaxed overflow-hidden"
      >
        {isExpanded || text.length <= TEXT_LIMIT
          ? text
          : `${text.substring(0, TEXT_LIMIT)}...`}

        {text.length > TEXT_LIMIT && (
          <button
            onClick={toggleReadMore}
            className="text-pink-500 font-bold mr-1 hover:underline focus:outline-none transition-all text-sm cursor-pointer"
          >
            {isExpanded
              ? isArabic(text)
                ? "عرض أقل"
                : "Show less"
              : isArabic(text)
                ? "عرض المزيد"
                : "Read more"}
          </button>
        )}
      </p>
    </div>
  ) : null;
}

export default PostText;
