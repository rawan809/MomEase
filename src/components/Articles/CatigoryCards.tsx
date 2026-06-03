import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CatigoryCardsProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  articlesCount: number;
}

function CatigoryCards({
  id,
  name,
  description,
  imageUrl,
  articlesCount,
}: CatigoryCardsProps) {
  const [imageError, setImageError] = useState(false);
  const { t } = useTranslation();

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
    <div className="relative overflow-hidden rounded-2xl shadow-lg group hover:-translate-y-1 transition-transform duration-300">
      <Link to={`/Articles/:${id}`}>
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
            <p className="absolute bottom-4 left-4 text-white z-20 font-medium">
              {articlesCount} {t("Articles")}
            </p>
          </div>
        ) : (
          <div
            className="relative h-64 bg-slate-100 flex flex-col items-center justify-center text-slate-400 border-b border-slate-100"
            style={{
              backgroundImage: `
                linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(255,102,161,0.25))
              `,
            }}
          >
            <ImageOff size={45} />

            <p className="absolute bottom-4 left-4 text-white z-20 font-medium">
              {articlesCount} {t("Articles")}
            </p>
          </div>
        )}
      </Link>

      <div className="p-4 bg-white">
        <h3 className="font-semibold text-lg">{name}</h3>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {description ||
            t(
              "Find supportive articles, expert guidance, and caring resources for every stage of your motherhood journey",
            )}
        </p>

        <Link
          to={`/Articles/:${id}`}
          className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
        >
          {t("View Articles")} →
        </Link>
      </div>
    </div>
  );
}

export default CatigoryCards;
