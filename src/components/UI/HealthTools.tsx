import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, ScanHeart, Droplet, Brain } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function HealthTools() {
  const location = useLocation();
  const { t } = useTranslation();

  const isActiveLink =
    location.pathname.includes("/hg") ||
    location.pathname.toLowerCase().includes("/skindiagnoses") ||
    location.pathname.toLowerCase().includes("/depression");

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={`flex items-center justify-center gap-1 cursor-pointer ${isActiveLink ? "text-primary font-bold" : ""}`}
        >
          {t("Health Tools")} <ChevronDown size={15} />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-fit px-2">
        <div className="grid gap-2">
          <NavLink
            className={({ isActive, isPending }) =>
              `flex items-center gap-2 ${
                isPending
                  ? "text-gray-400"
                  : isActive
                    ? "text-primary font-bold"
                    : ""
              }`
            }
            to="hg"
          >
            <Droplet size={15} /> {t("Cry Analysis")}
          </NavLink>

          <NavLink
            className={({ isActive, isPending }) =>
              `flex items-center gap-2 ${
                isPending
                  ? "text-gray-400"
                  : isActive
                    ? "text-primary font-bold"
                    : ""
              }`
            }
            to="/SkinDiagnoses"
          >
            <ScanHeart size={15} /> {t("Skin Analysis")}
          </NavLink>

          <NavLink
            className={({ isActive, isPending }) =>
              `flex items-center gap-2 ${
                isPending
                  ? "text-gray-400"
                  : isActive
                    ? "text-primary font-bold"
                    : ""
              }`
            }
            to="/depression"
          >
            <Brain size={15} /> {t("Depression Test")}
          </NavLink>
        </div>
      </PopoverContent>
    </Popover>
  );
}
