import { useEffect } from "react";
import {
  ArticleAPI,
  AddSavedArticle,
  DeleteSavedArticle,
  ArticlesAPI,
} from "../../services/articles";
import { useState } from "react";
import LoadingState from "@/components/ui/LoadingState";
import { useParams, Link } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { GoLinkExternal } from "react-icons/go";
import EmptyResponse from "@/components/ui/EmptyResponse";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import ArticleCard from "@/components/Articles/ArticleCard";
import { ImageOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

interface ArticleType {
  articleId: number;
  shortDescription: string;
  title: string;
  content: string;
  categoryName: string;
  categoryId: number;
  imageUrl: string;
  readingTimeMinutes: number;
  publishedDate: string;
  sourceUrl: string;
  sourceName: string;
  isSaved: boolean;
}

function Article() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const params = useParams();
  let idString = params.articleID;
  let id = Number(idString?.slice(1));
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState<ArticleType | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const [relatedArticles, setRelatedArticles] = useState<ArticleType[]>([]);
  const [isError, setIsError] = useState(false);

  //    formate time
  const formatDate = (createdAt: string) => {
    const date = new Date(createdAt);

    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // api cals
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      setIsError(false);

      try {
        const articleRes = await ArticleAPI(id);

        setArticleData(articleRes.data);
        setSaved(articleRes.data.isSaved);

        console.log(articleRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(id)) fetchData();
  }, [id, language]); // أعد الـ fetch لما اللغة تتغير
  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const relatedArticlesRes = await ArticlesAPI(articleData?.categoryId!);
        setRelatedArticles(
          relatedArticlesRes.data
            .filter((a: ArticleType) => a.title !== articleData?.title)
            .slice(0, 4),
        );
        console.log(relatedArticlesRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (articleData) fetchRelatedArticles();
  }, [articleData]);

  // save & unsave
  const toggleSaveArticle = async (articleId: number) => {
    const prev = saved;
    setSaved(!prev); // يغير فورًا

    try {
      if (prev) {
        await DeleteSavedArticle(articleId);
      } else {
        await AddSavedArticle(articleId);
      }
    } catch (error) {
      setSaved(prev); // يرجع زي ما كان لو فشل
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-(--space-lg)">
        {loading ? (
          <div className="h-[70vh]">
            <LoadingState />
          </div>
        ) : articleData === null ? (
          <div className="h-[80vh]">
            <EmptyResponse title={t("No Article Found")} />
          </div>
        ) : (
          <div className="mt-5 w-full">
            <div className="mb-5">
              <p className="text-primary font-semibold">
                <Link to={"/ExploreArticles"} className="text-muted">
                  {t("Categories")}/{" "}
                </Link>
                <Link
                  to={`/Articles/:${articleData?.categoryId}`}
                  className="text-muted"
                >
                  {articleData?.categoryName}/{" "}
                </Link>
                {articleData?.title}
              </p>
            </div>
            <div className="w-full h-75 md:h-100 lg:h-120 overflow-hidden rounded-xl mb-5">
              {!isError ? (
                <img
                  src={articleData?.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={() => setIsError(true)}
                />
              ) : (
                <>
                  <div className="bg-slate-200 w-full h-full flex flex-col items-center justify-center  text-slate-400 relative">
                    <ImageOff size={45} />
                    <span className="text-xs font-medium">
                      {t("No image available")}
                    </span>
                    <div className="absolute w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(255,102,161,0.25)_100%)]"></div>
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-between mb-5 md:items-center items-end">
              <h1 className="md:text-h2 text-2xl">{articleData?.title}</h1>
              <button
                className="md:text-2xl cursor-pointer"
                onClick={() => {
                  toggleSaveArticle(id);
                }}
              >
                {" "}
                {saved ? (
                  <FaBookmark className="text-primary" />
                ) : (
                  <FaRegBookmark className="text-primary" />
                )}
              </button>
            </div>
            <div className="flex text-muted gap-3 mb-5 flex-wrap">
              <div className="flex gap-1 items-center">
                <FaRegClock />
                <p>
                  {articleData?.readingTimeMinutes} {t("min read")}
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <MdOutlineDateRange />
                <p>
                  {articleData?.publishedDate
                    ? formatDate(articleData.publishedDate)
                    : ""}
                </p>
              </div>
              <a
                href={articleData?.sourceUrl}
                target="blank"
                className="flex gap-1 items-center hover:text-primary transition-all duration-300 cursor-pointer"
              >
                <GoLinkExternal />
                <p>{articleData?.sourceName}</p>
              </a>
            </div>
            <div className="rounded-xl border border-gray-300 md:p-10 p-5 mb-10">
              {" "}
              {articleData.content
                .split(". ")
                .reduce((acc: string[], sentence: string, index: number) => {
                  if (index % 2 === 0) {
                    acc.push(sentence);
                  } else {
                    acc[acc.length - 1] += ". " + sentence;
                  }
                  return acc;
                }, [])
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-base leading-8 text-gray-700 ${
                      index === 0 ? "text-lg font-medium" : ""
                    } mb-4`}
                  >
                    {paragraph}.
                  </p>
                ))}
            </div>
            <div>
              <p className="font-semibold text-xl mb-5">
                {t("Related Articles")}
              </p>
              <div className="mt-10 grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2  gap-(--space-lg)">
                {relatedArticles.map((article) => (
                  <ArticleCard
                    key={article.articleId}
                    savedArticlesPage={false}
                    articleId={article.articleId}
                    isSaved={article.isSaved}
                    title={article.title}
                    imageUrl={article.imageUrl}
                    shortDescription={article.shortDescription}
                    readingTimeMinutes={article.readingTimeMinutes}
                    onToggleSave={toggleSaveArticle}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Article;
