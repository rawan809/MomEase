import { House, Bookmark, SquarePen } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Explore() {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white rounded-xl p-2 ">
      <div className="border-b-2 ">
        <p className="font-semibold mb-1">{t("Explore")}</p>
      </div>
      <div className="mt-2 space-y-2">
        <NavLink
          to="/community"
          end
          className={({ isActive }) =>
            `${isActive ? "bg-accent/60 text-primary font-medium" : "text-foreground"} px-2 py-1 rounded cursor-pointer hover:text-primary transition-all flex items-center gap-1`
          }
        >
          <House size={18} />
          <span>{t("feed")}</span>
        </NavLink>
        <NavLink
          to="/community/saved"
          className={({ isActive }) =>
            `${isActive ? "bg-accent/60 text-primary font-medium" : "text-foreground"} px-2 py-1 rounded cursor-pointer hover:text-primary transition-all flex items-center gap-1`
          }
        >
          <Bookmark size={18}/>
          <span>{t("saved")}</span>
        </NavLink>
        <NavLink
          to="/community/my-posts"
          className={({ isActive }) =>
            `${isActive ? "bg-accent/60 text-primary font-medium" : "text-foreground"} px-2 py-1 rounded cursor-pointer hover:text-primary transition-all flex items-center gap-1`
          }
        >
          <SquarePen size={18} />
          <span>{t("my posts")}</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Explore;