import React from "react";
import Heading from "../../src/components/UI/Heading";
import CatigoryCards from "../../src/components/Articles/CatigoryCards";
import { FaBookmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import {
  ArticlesCategories,
  getSavedArticlesAPI,
  DeleteSavedArticle,
} from "../../services/articles";
import ArticleCard from "../../src/components/Articles/ArticleCard";
import LoadingState from "../../src/components/UI/LoadingState";
import EmptyResponse from "../../src/components/UI/EmptyResponse";

function ArticlesCatigories() {
  // loding
  const [loading, setLoading] = useState(false);
  // selected button
  const [SelectedBtn, setSelectedBtn] = useState("Categories");
  // categories State
  const [categories, setCategories] = useState<
    Array<{
      name: string;
      description: string;
      imageUrl: string;
      articlesCount: number;
      categoryId: number;
    }>
  >([]);
  // saved Articles state
  const [savedArticles, setSavedArticles] = useState<
    Array<{
      articleId: number;
      title: string;
      imageUrl: string;
      readingTimeMinutes: number;
      categoryName: string;
      savedAt: string;
    }>
  >([]);

  // call categories
  useEffect(() => {
    const fetchCat = async () => {
      setLoading(true);
      try {
        const catRes = await ArticlesCategories();
        setCategories(catRes.data);
      } catch (error) {
        console.log("categories error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCat();
  }, []);
  // call saved articles
  useEffect(() => {
    if (SelectedBtn === "Saved") {
      const fetchSaved = async () => {
        setLoading(true);
        try {
          const savedRes = await getSavedArticlesAPI();
          setSavedArticles(savedRes.data);
          console.log(savedRes);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchSaved();
    }
  }, [SelectedBtn]);

  // unsave
  const deleteSavedArticle = async (articleId: number) => {
    try {
      await DeleteSavedArticle(articleId);

      setSavedArticles((prev) =>
        prev.filter((article) => article.articleId !== articleId),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-(--space-lg) flex flex-col items-center ">
          <div className="mt-5">
            <Heading
              title="Explore Article Categories"
              discription="Find supportive articles, expert guidance, and caring resources for every stage of your motherhood journey"
            />
          </div>
          <div className="flex items-center justify-center gap-5 mb-10">
            <button
              className={`text-[12px] rounded-lg px-5 py-2 cursor-pointer border border-primary
            ${SelectedBtn === "Categories" ? "bg-primary text-white" : " bg-white text-primary"}
            `}
              onClick={() => {
                setSelectedBtn("Categories");
              }}
            >
              Categories
            </button>
            <button
              className={`flex items-center  text-[12px] border border-primary rounded-lg px-5 py-2 gap-1 cursor-pointer ${SelectedBtn === "Saved" ? "bg-primary text-white" : " bg-white text-primary"}`}
              onClick={() => {
                setSelectedBtn("Saved");
              }}
            >
              <FaBookmark />
              Saved Articles
            </button>
          </div>
          {SelectedBtn === "Saved" &&
            (loading ? (
              <div className="h-[40vh]">
                <LoadingState />
              </div>
            ) : savedArticles.length === 0 ? (
              <div className="h-[40vh]">
                <EmptyResponse title="No saved articles" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-(--space-lg) w-full">
                {savedArticles.map((article) => (
                  <ArticleCard
                    key={article.articleId}
                    articleId={article.articleId}
                    isSaved={true}
                    title={article.title}
                    imageUrl={article.imageUrl}
                    readingTimeMinutes={article.readingTimeMinutes}
                    savedArticlesPage={true}
                    onDeleteSave={deleteSavedArticle}
                    categoryName={article.categoryName}
                    savedAt={article.savedAt}
                  />
                ))}
              </div>
            ))}

          {SelectedBtn === "Categories" ? (
            loading ? (
              <div className="h-[40vh]">
                <LoadingState />
              </div>
            ) : categories.length === 0 ? (
              <div className="h-[40vh]">
                <EmptyResponse title="No category found" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-(--space-lg) w-full">
                {categories.map((cat, i) => (
                  <CatigoryCards
                    key={i}
                    id={cat.categoryId}
                    name={cat.name}
                    description={cat.description}
                    imageUrl={cat.imageUrl}
                    articlesCount={cat.articlesCount}
                  />
                ))}
              </div>
            )
          ) : null}
        </div>
      </section>
    </div>
  );
}

export default ArticlesCatigories;
