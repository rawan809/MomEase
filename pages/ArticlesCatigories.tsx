import React from "react";
import Heading from "../src/components/UI/Heading";
import CatigoryCards from "../src/components/Articles/CatigoryCards";
import { FaBookmark } from "react-icons/fa6";
import { useState } from "react";

function ArticlesCatigories() {
  // selected button
  const [SelectedBtn, setSelectedBtn] = useState("Categories");

  return (
    <div>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-(--space-lg) flex flex-col items-center ">
          <div className="mt-5">
            <Heading
              title="Explore Article Categories"
              discription="Find supportive articles, expert guidance, and caring resources for every stage of your motherhood journey"
            />
          </div>
          <div className="flex items-center justify-center gap-5 mb-10">
            <button
              className={`text-[12px] rounded-lg px-5 py-2 cursor-pointer border border-primary
            ${SelectedBtn === "Categories" ? "bg-primary text-white" : " bg-white text-primary"}
            `}
              onClick={() => {
                setSelectedBtn("Categories");
              }}
            >
              Categories
            </button>
            <button
              className={`flex items-center  text-[12px] border border-primary rounded-lg px-5 py-2 gap-1 cursor-pointer ${SelectedBtn === "Saved" ? "bg-primary text-white" : " bg-white text-primary"}`}
              onClick={() => {
                setSelectedBtn("Saved");
              }}
            >
              <FaBookmark />
              Saved Articles
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-(--space-lg)">
            <CatigoryCards />
            <CatigoryCards />
            <CatigoryCards />
            <CatigoryCards />
            <CatigoryCards />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlesCatigories;
