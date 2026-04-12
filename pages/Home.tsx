import React from "react";
import HomeSection from "../src/components/HeroSection/HomeSection";
import ArticalSection from "../src/components/Articles/ArticalSection";
import { useAuth } from "./auth/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const firstName = user?.firstName ?? undefined;

  return (
    <>
      <HomeSection firstName={firstName} />
      <ArticalSection />
    </>
  );
}
