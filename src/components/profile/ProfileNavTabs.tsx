import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { PenLine, Bookmark } from "lucide-react";

function ProfileNavTabs() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      key: "my-posts",
      label: t("My Posts"),
      icon: PenLine,
      path: "/community/my-posts",
    },
    {
      key: "saved",
      label: t("Saved Posts"),
      icon: Bookmark,
      path: "/community/saved",
    },
  ];

  const activeTab = location.search.includes("saved") ? "saved" : "my-posts";

  return (
    <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
      {tabs.map(({ key, label, icon: Icon, path }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            onClick={() => navigate(path)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm
              transition-all duration-300 cursor-pointer select-none
              ${
                isActive
                  ? "bg-primary text-white shadow-[0_4px_15px_rgba(233,30,140,0.35)] scale-[1.03]"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-primary hover:text-primary hover:shadow-[0_2px_10px_rgba(233,30,140,0.12)]"
              }
            `}
          >
            <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
            <span>{label}</span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 ml-0.5" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ProfileNavTabs;