import Navbar from "../src/components/ui/Navbar";
import PostFormDialog from "../src/components/community/PostFormDialog";
import Explore from "../src/components/community/Explore";
import { useRef } from "react";
import { useCommunityPosts } from "../src/hooks/useCommunity";
import { FaArrowUp } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Community() {
  const { t } = useTranslation();
  const communityData = useCommunityPosts();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <button
        onClick={() =>
          scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        }
        aria-label={t("Scroll to top")}
        className="fixed bottom-5 right-5 z-50 bg-primary text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all"
      >
        <FaArrowUp />
      </button>
      <section
        ref={scrollRef}
        className="bg-accent/50 overflow-auto hide-scrollbar"
      >
        <Navbar />
        <div className="w-full md:max-w-7xl sm:mx-auto py-20 px-(--space-lg) ">
          <div className="h-[calc(100vh-10rem)]  ">
            {/* DESKTOP SIDEBAR */}
            <div className="fixed top-20 right-[max(2rem,calc((100vw-80rem)/2))] h-[calc(100vh-5rem)] lg:w-50 md:w-40 hidden md:flex pt-5 justify-start items-center flex-col gap-5">
              <PostFormDialog mode="create" onSubmit={communityData.addPost} />
              <Explore />
            </div>

            {/* MOBILE VERSION */}
            <div className="md:hidden flex flex-col gap-4 mb-4">
              <PostFormDialog mode="create" onSubmit={communityData.addPost} />
              <Explore />
            </div>

            <div className="text-center flex justify-center flex-col md:items-center gap-4 pt-5 ">
              <Outlet context={communityData} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Community;