import React from "react";
import HeroSection from "../src/components/HeroSection/HeroSection";
import ChallengesSection from "../src/components/ChallengesSection/ChallengesSection";
import SupportSection from "../src/components/SupportSection/SupportSection";
import FeatureSection from "../src/components/FeaturesSection/FeatureSection";
import NextStepSection from "../src/components/NextStepSection/NextStepSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ChallengesSection />
      <SupportSection />
      <FeatureSection/>
      <NextStepSection/>
    </>
  );
}
