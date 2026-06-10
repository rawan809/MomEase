import { useEffect } from "react";
import HomeSection from "@/components/HeroSection/HomeSection";
import ArticalSection from "@/components/Articles/ArticalSection";
import { useAuth } from "@/contexts/AuthContext";
import { AllarticlesApi } from "../services/articles";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { user } = useAuth();
  const firstName = user?.firstName;
  const [articles, setArticles] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await AllarticlesApi();
        setArticles(response.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, [language]);

  return (
    <div className="max-w-7xl mx-auto">
      <HomeSection firstName={firstName} />
      <ArticalSection articles={articles} />
    </div>
  );
}
