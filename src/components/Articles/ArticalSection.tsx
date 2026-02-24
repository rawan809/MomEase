import articleImg from "../../../src/assets/images/articleImg.jpg";
import { Link } from "react-router-dom";

const articles = [
  { id: 1, title: "7 useful meals for postpartum to...", image: articleImg },
  { id: 2, title: "7 useful meals for postpartum to...", image: articleImg },
  { id: 3, title: "7 useful meals for postpartum to...", image: articleImg },
  { id: 4, title: "7 useful meals for postpartum to...", image: articleImg },
];

const ArticlesSection = () => {
  return (
    <section className="px-(--space-lg) py-(--space-xl)">
      <div className="flex justify-between items-center mb-(--space-lg)">
        <h2 className="text-[25px] font-semibold">Useful articles</h2>

        <Link  to={"/ExploreArticles"}  className="text-primary cursor-pointer transition-all duration-200 hover:opacity-70 text-small">
          View all
        </Link>
      </div>

      <div className="flex gap-(--space-lg) overflow-x-auto hide-scrollbar">
        {articles.map((article) => (
          <div
            key={article.id}
            className="relative h-60 rounded-2xl overflow-hidden shadow-md shrink-0"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(255,102,161,0.25)_100%)]"></div>
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-(--space-lg)">
              <h3 className="text-white font-semibold mb-(--space-md)">
                {article.title}
              </h3>

              <button className="bg-white text-black py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105">
                View full article
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArticlesSection;
