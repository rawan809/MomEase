import { FaRegClock } from "react-icons/fa";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { ImageOff } from "lucide-react";
import { useState } from "react";

interface Props {
  articleId: number;
  title: string;
  imageUrl: string;
  shortDescription: string;
  readingTimeMinutes: number;
  isSaved: boolean;
}

function ArticleSearchCard({
  articleId,
  title,
  imageUrl,
  shortDescription,
  readingTimeMinutes,
  isSaved,
}: Props) {
  const [isError, setIsError] = useState(false);

  return (
    <div className="flex gap-3 p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer">
      {/* image */}
      {!isError ? (
        <img
          key={imageUrl}
          src={imageUrl}
          className="w-20 h-20 object-cover rounded-md shrink-0"
          onError={() => setIsError(true)}
        />
      ) : (
        <div className="w-20 h-20 rounded-md shrink-0 bg-slate-200 flex flex-col items-center justify-center text-slate-400 relative overflow-hidden">
          <ImageOff size={20} />
        </div>
      )}

      {/* content */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        {/* title */}
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {title}
        </h3>

        {/* description */}
        <p className="text-xs text-muted line-clamp-2">{shortDescription}</p>

        {/* footer */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1 text-xs text-muted">
            <FaRegClock />
            <span>{readingTimeMinutes} min</span>
          </div>

          <button className="text-primary">
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleSearchCard;
