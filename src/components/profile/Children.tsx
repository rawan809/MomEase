import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useChildren } from "../../hooks/useChildren";
import formatBabyAge from "@/utils/formatBabyAge";
import LoadingState from "../UI/LoadingState";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function Children() {
  const { t } = useTranslation();
  const { children, loading, fetchChildren } = useChildren();
  useEffect(() => {
    async () => {
      await fetchChildren();
    };
  });
  return (
    <div>
      <div className="flex justify-between mb-5">
        <p className="text-[25px] font-semibold">{t("My Babies")}</p>
        <Link
          to={"/myprofile/children"}
          className="bg-primary text-white rounded-xl px-3 py-2 cursor-pointer hover:bg-primary transition-all md:text-[16px] text-sm flex items-center gap-1"
        >
          <FiEdit />
          <span>{t("manage")}</span>
        </Link>
      </div>

      <div className=" rounded-xl shadow-xl space-y-5 p-5 bg-white border border-primary/50">
        {loading && (
          <div>
            <LoadingState />
          </div>
        )}
        {children.map((child) => (
          <div
            key={child.childId}
            className="bg-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm"
          >
            <div className="shrink-0">
              {child.photoUrl ? (
                <img
                  src={child.photoUrl}
                  alt={""}
                  className={`w-16 h-16 rounded-full object-cover border-2 ${child.gender === "Boy" ? "border-blue-600" : "border-primary"}`}
                />
              ) : (
                <div
                  className={`w-16 h-16 rounded-full border-2 bg-white flex items-center justify-center text-xl ${child.gender === "Boy" ? "border-blue-600" : "border-primary"}`}
                >
                  {child.fullName.slice(0, 1)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">
                {child.fullName}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span>{t(child.gender)}</span>
                <span>•</span>
                <span>
                  {formatBabyAge({
                    ageInDays: child.ageInDays,
                    ageInMonths: child.ageInMonths,
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Children;
