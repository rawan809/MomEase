import React from "react";
import { House, Bookmark, SquarePen } from "lucide-react";

function Explore({
  activeTap,
  setActiveTap,
}: {
  activeTap: string;
  setActiveTap: any;
}) {
  return (
    <div className="w-full bg-white rounded-xl p-2 ">
      <div className="border-b-2 ">
        <p className="font-semibold mb-1">Explore</p>
      </div>
      <div className="mt-2 space-y-2">
        <div
          className={`${activeTap === "feed" ? "bg-accent/60 text-primary" : null} px-2 py-1 rounded cursor-pointer  hover:text-primary transition-all flex items-center gap-1`}
          onClick={() => {
            setActiveTap("feed");
          }}
        >
          <House size={18} />
          <span>feed</span>
        </div>
        <div
          className={`${activeTap === "saved" ? "bg-accent/60 text-primary" : null} px-2 py-1 rounded cursor-pointer hover:text-primary transition-all flex items-center gap-1 `}
          onClick={() => {
            setActiveTap("saved");
          }}
        >
          <Bookmark size={18}/>
          <span>saved</span>
        </div>
        <div
          className={`${activeTap === "myPosts" ? "bg-accent/60 text-primary" : null} px-2 py-1 rounded cursor-pointer   hover:text-primary transition-all flex items-center gap-1`}
          onClick={() => {
            setActiveTap("myPosts");
          }}
        >
          <SquarePen size={18} />
          <span>my posts</span>
        </div>
      </div>
    </div>
  );
}

export default Explore;
