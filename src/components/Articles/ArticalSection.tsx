import { useState } from "react";
import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Article {
  articleId: number;
  title: string;
  imageUrl: string;
}

interface ArticlesSectionProps {
  articles: Article[];
}

const ArticleCard = ({ article }: { article: Article }) => {
  const [isError, setIsError] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="relative h-60 rounded-2xl overflow-hidden shadow-md shrink-0 w-90 bg-slate-100">
      {!isError ? (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={() => setIsError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-slate-400 pb-16">
          <ImageOff size={25} />
          <span className="text-xs font-medium">{t("No image available")}</span>
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(255,102,161,0.25)_100%)]"></div>

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-(--space-lg)">
        <h3 className="text-white font-semibold mb-(--space-md)">
          {article.title}
        </h3>

        <Link
          to={`/Article/${article.articleId}`}
          className="bg-white text-black py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 text-center"
        >
          {t("View full article")}
        </Link>
      </div>
    </div>
  );
};

const ArticlesSection = ({ articles }: ArticlesSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="px-(--space-lg) py-(--space-xl)">
      <div className="flex justify-between items-center mb-(--space-lg)">
        <h2 className="text-[25px] font-semibold">{t("Useful articles")}</h2>

        <Link
          to={"/ExploreArticles"}
          className="text-primary cursor-pointer transition-all duration-200 hover:opacity-70 text-small"
        >
          {t("View all")}
        </Link>
      </div>

      <div className="flex gap-(--space-lg) overflow-x-auto hide-scrollbar ">
        {articles.map((article: Article) => (
          <ArticleCard key={article.articleId} article={article} />
        ))}
      </div>
    </section>
  );
};

export default ArticlesSection;
