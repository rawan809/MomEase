import { Link, useParams } from "react-router-dom";
import InputSearch from "../../src/components/Articles/InputSearch";
import ArticleCard from "../../src/components/Articles/ArticleCard";
import { useState, useEffect } from "react";
import {
  CategoryInfo,
  ArticlesAPI,
  AddSavedArticle,
  DeleteSavedArticle,
} from "../../services/articles";
import LoadingState from "../../src/components/ui/LoadingState";
import EmptyResponse from "../../src/components/ui/EmptyResponse";


interface Category {
  name: string;
  description: string;
  [key: string]: any;
}
interface Article {
  articleId: number;
  isSaved: boolean;
  title: string;
  imageUrl: string;
  shortDescription: string;
  readingTimeMinutes: number;
}

function Articles() {
  const params = useParams();
  let idstring = params.categoryID;
  let id = Number(idstring?.slice(1));
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // filter on search item
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // api cals
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const catRes = await CategoryInfo(id);
        setCategory(catRes.data);

        const artRes = await ArticlesAPI(id);
        console.log(artRes);
        setArticles(artRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // save & unsave
  const toggleSaveArticle = async (articleId: number, isSaved: boolean) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.articleId === articleId
          ? { ...article, isSaved: !isSaved }
          : article,
      ),
    );

    try {
      if (isSaved) {
        await DeleteSavedArticle(articleId);
      } else {
        await AddSavedArticle(articleId);
      }
    } catch (error) {
      setArticles((prev) =>
        prev.map((article) =>
          article.articleId === articleId
            ? { ...article, isSaved: isSaved }
            : article,
        ),
      );
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-(--space-lg) flex flex-col items-center ">
        {loading ? (
          <div className="h-[70vh]">
            <LoadingState />
          </div>
        ) : category === null ? (
          <div className="h-[80vh]">
            <EmptyResponse title="No Category Found" />
          </div>
        ) : (
          <div className="mt-5 w-full">
            <div className="mb-5">
              <p className="text-primary font-semibold">
                <Link to={"/ExploreArticles"} className="text-muted">
                  Categories/{" "}
                </Link>
                {category?.name}
              </p>
            </div>
            <div className=" pb-5">
              <h1 className="md:text-h2 text-3xl font-semibold pb-(--space-sm)">
                {category?.name}
              </h1>
              <p className="text-muted text-small lg:w-1/2">
                {category?.description}
              </p>
            </div>
            <InputSearch value={searchTerm} onChange={setSearchTerm} />
            {articles.length === 0 || filteredArticles.length === 0 ? (
              <div className="h-[50vh]">
                <EmptyResponse title="No Articles Found" />
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2  gap-(--space-lg)">
                {filteredArticles.map((article) => (
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
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Articles;
