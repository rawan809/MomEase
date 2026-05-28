import { useEffect } from "react";
import HomeSection from "../src/components/HeroSection/HomeSection";
import ArticalSection from "../src/components/Articles/ArticalSection";
import { useAuth } from "../src/contexts/AuthContext";
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
    <>
      <HomeSection firstName={firstName} />
      <ArticalSection articles={articles} />
    </>
  );
}
