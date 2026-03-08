import React from "react";
import { useLocation } from "react-router-dom";
import HomeSection from "../src/components/HeroSection/HomeSection";
import ArticalSection from "../src/components/Articles/ArticalSection";

export default function Home() {
  const location = useLocation();
  const firstName = location.state?.firstName;

  return (
    <>
      <HomeSection firstName={firstName} />
      <ArticalSection />
    </>
  );
}
