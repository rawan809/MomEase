import React from "react";
import { Link } from "react-router-dom";
import InputSearch from "../src/components/Articles/InputSearch";
import ArticleCard from "../src/components/Articles/ArticleCard";
import { useState } from "react";

function Articles() {
  const [articles, setArticles] = useState([
    { id: 1, saved: false },
    { id: 2, saved: true },
    { id: 3, saved: false },
    { id: 4, saved: false },
    { id: 5, saved: false },
    { id: 6, saved: false },
    { id: 7, saved: false },
  ]);

  const toggleSave = (id: number) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, saved: !article.saved } : article,
      ),
    );
  };
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-(--space-lg) flex flex-col items-center ">
        <div className="mt-5">
          <div className="mb-5">
            <p className="text-primary font-semibold">
              <Link to={"/ExploreArticles"} className="text-muted">
                Categories/{" "}
              </Link>
              PostPartum Recovery
            </p>
          </div>
          <div className=" pb-5">
            <h1 className="md:text-h2 text-3xl font-semibold pb-(--space-sm)">
              Postpartum Recovery
            </h1>
            <p className="text-muted text-small lg:w-1/2">
              Supportive articles and expert guidance to help you navigate this
              important aspect of your motherhood journey
            </p>
          </div>
          <InputSearch />

          <div className="mt-10 grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2  gap-(--space-lg)">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                saved={article.saved}
                onToggleSave={() => toggleSave(article.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Articles;
