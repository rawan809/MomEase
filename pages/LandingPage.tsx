import React from "react";
import HeroSection from "../src/components/HeroSection/HeroSection";
import ChallengesSection from "../src/components/ChallengesSection/ChallengesSection";
import SupportSection from "../src/components/SupportSection/SupportSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ChallengesSection />
      <SupportSection />
    </>
  );
}
