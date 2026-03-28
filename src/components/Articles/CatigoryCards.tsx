import React from "react";
import articleImg from "../../assets/images/articleImg.jpg";
import { Link } from "react-router-dom";

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
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg group hover:-translate-y-1 transition-transform duration-300">
      <Link to={`/Articles/:${id}`}>
        <div
          className="relative bg-cover bg-center h-64"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(255,102,161,0.25)),
              url(${imageUrl || articleImg})
            `,
          }}
        >
          <p className="absolute bottom-4 left-4 text-white z-20">
            {articlesCount} Articles
          </p>
        </div>
      </Link>

      <div className="p-4 bg-white">
        <h3 className="font-semibold text-lg">{name}</h3>

        <p className="text-sm text-gray-600 mt-1">
          {description ||
            "Find supportive articles, expert guidance, and caring resources for every stage of your motherhood journey"}
        </p>

        <Link
          to={`/Articles/:${id}`}
          className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
        >
          View Articles →
        </Link>
      </div>
    </div>
  );
}

export default CatigoryCards;
