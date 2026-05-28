import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ArticleCardProps {
  articleId: number;
  isSaved: boolean;
  onToggleSave?: (id: number, isSaved: boolean) => void;
  onDeleteSave?: (id: number) => void;
  title: string;
  imageUrl: string;
  shortDescription?: string;
  readingTimeMinutes: number;
  savedArticleId?: string;
  savedArticlesPage: boolean;
  savedAt?: string;
  categoryName?: string;
}

function ArticleCard({
  articleId,
  isSaved,
  title,
  imageUrl,
  onDeleteSave,
  shortDescription,
  readingTimeMinutes,
  onToggleSave,
  savedArticlesPage,
  savedAt,
  categoryName,
}: ArticleCardProps) {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setImageError(true);
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onerror = () => {
      setImageError(true);
    };
    img.onload = () => {
      setImageError(false);
    };
  }, [imageUrl]);

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:-translate-y-1.25 transition-transform duration-300 group cursor-auto flex flex-col h-full">
      <Link to={`/Article/:${articleId}`} className="block shrink-0">
        {!imageError ? (
          <div
            className="relative bg-cover bg-center h-64"
            style={{
              backgroundImage: `
        linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(255,102,161,0.25)),
        url(${imageUrl})
      `,
            }}
          >
            <p className="absolute bottom-4 left-4 text-white z-20">
              {readingTimeMinutes} {t("mins")}
            </p>
          </div>
        ) : (
          <div
            className="relative h-64 bg-slate-100 flex flex-col items-center justify-center text-slate-400 border-b border-slate-100"
            style={{
              backgroundImage: `
        linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(255,102,161,0.25)),
      `,
            }}
          >
            <ImageOff size={45} />
            <p className="absolute bottom-4 left-4 text-white z-20">
              {readingTimeMinutes} {t("mins")}
            </p>
          </div>
        )}
      </Link>

      {/* الحاوية الأساسية للمحتوى تم تحويلها لـ Flexbox لتوزيع العناصر عمودياً */}
      <div className="relative z-20 p-4 bg-white flex flex-col justify-between flex-1 gap-4">
        
        {/* حاوية فرعية علوية لتجميع النصوص وحمايتها من التباعد */}
        <div>
          <Link
            to={`/Article/:${articleId}`}
            className="font-semibold group-hover:text-primary transition-all duration-300 block mb-1"
          >
            {title}
          </Link>

          {savedArticlesPage ? (
            <div className="mb-2">
              <p className="text-muted mt-1">
                {t("category:")}{" "}
                <span className="bg-accent w-fit px-2 py-1 rounded-lg text-black inline-block">
                  {categoryName}
                </span>
              </p>
              <p className="text-muted mt-1">
                {t("Saved at:")}{" "}
                {savedAt ? new Date(savedAt).toLocaleDateString() : t("N/A")}
              </p>
            </div>
          ) : null}

          <p className="text-muted text-sm">{shortDescription}</p>
        </div>

        {/* حاوية زر الحفظ ستثبت في الأسفل تماماً دائماً */}
        <div className="flex justify-end pt-2 border-t border-gray-50">
          <button
            className="cursor-pointer p-1 hover:scale-110 transition-transform"
            onClick={() => {
              if (savedArticlesPage) {
                onDeleteSave?.(articleId);
              } else {
                onToggleSave?.(articleId, isSaved);
              }
            }}
          >
            {isSaved ? (
              <FaBookmark className="text-primary" />
            ) : (
              <FaRegBookmark className="text-primary" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;