import React from "react";
import articleImg from "../../assets/images/articleImg.jpg";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";

interface ArticleCardProps {
  saved: boolean;
  onToggleSave?: () => void;
}

function ArticleCard({ saved, onToggleSave }: ArticleCardProps) {
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
        <p className="absolute bottom-4 left-4 text-white z-20">14 mins</p>
      </div>

      <div className="relative z-20 p-4 bg-white">
        <p className="font-semibold">
          Your Healing Journey After Birth: A Gentle Guide for New Mothers
        </p>
        <div className="mt-2 flex justify-end">
          <button onClick={onToggleSave}>
            {saved ? (
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
