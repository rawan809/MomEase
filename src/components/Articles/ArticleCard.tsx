import React from "react";
import articleImg from "../../assets/images/articleImg.jpg";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";

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
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:-translate-y-1.25 transition-transform duration-300">
      <div
        className="relative bg-cover bg-center h-64"
        style={{
          backgroundImage: `
        linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(255,102,161,0.25)),
        url(${articleImg})
      `,
        }}
      >
        <p className="absolute bottom-4 left-4 text-white z-20">
          {readingTimeMinutes} mins
        </p>
      </div>

      <div className="relative z-20 p-4 bg-white">
        <p className="font-semibold">{title}</p>

        {savedArticlesPage ? (
          <>
            {" "}
            <p className="text-muted mt-1">
              category:{" "}
              <span className="bg-accent w-fit px-2 py-1 rounded-lg text-black">
                {categoryName}
              </span>
            </p>
            <p className="text-muted mt-1">
              Saved at:{" "}
              {savedAt ? new Date(savedAt).toLocaleDateString() : "N/A"}
            </p>
          </>
        ) : null}

        <p className="text-muted">{shortDescription}</p>
        <div className="mt-2 flex justify-end">
          <button
            className="cursor-pointer"
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
