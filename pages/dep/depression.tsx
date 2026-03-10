import React from "react";
import Navbar from "../../src/components/UI/Navbar";
import DepSection from "../../src/components/Depression/DepSection";
import DepCards from "../../src/components/Depression/DepCards";
export default function Depression() {
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <DepSection />
        <DepCards />
      </div>
    </>
  );
}
