import React, { useEffect } from "react";
import {
  ArticleAPI,
  AddSavedArticle,
  DeleteSavedArticle,
  ArticlesAPI
} from "../../services/articles";
import { useState } from "react";
import LoadingState from "../../src/components/UI/LoadingState";
import { useParams, Link } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { GoLinkExternal } from "react-icons/go";
import EmptyResponse from "../../src/components/UI/EmptyResponse";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";

interface ArticleType {
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
  const params = useParams();
  let idString = params.articleID;
  let id = Number(idString?.slice(1));
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState<ArticleType | null>(null);
  const [saved, setSaved] = useState<boolean>(false);

  //   formate time
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
  }, [id]);

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
            <EmptyResponse title="No Article Found" />
          </div>
        ) : (
          <div className="mt-5 w-full">
            <div className="mb-5">
              <p className="text-primary font-semibold">
                <Link to={"/ExploreArticles"} className="text-muted">
                  Categories/{" "}
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
              <img
                src={articleData?.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
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
                <p>{articleData?.readingTimeMinutes} min read</p>
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
              <p className="font-semibold text-xl mb-5">Related Articles</p>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Article;
