import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { MdOutlineTableChart } from "react-icons/md";
import { LuMilk } from "react-icons/lu";
import { GrLineChart } from "react-icons/gr";
import { TbVaccine } from "react-icons/tb";
import { IoCloudyNightOutline } from "react-icons/io5";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

export function AppSidebar() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const isTabActive = (tabPath: string) => {
    return location.pathname === tabPath;
  };

  return (
    <Sidebar className="top-20 h-full " side={`${language === "ar" ? "right" : "left"}`}>
      <SidebarContent className="bg-white border px-(--space-lg) py-5">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate("/babytracking/overview")}
              isActive={isTabActive("/babytracking/overview") || location.pathname === "/babytracking"}
            >
              <MdOutlineTableChart />
              {t("Overview")}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate("/babytracking/feeding")}
              isActive={isTabActive("/babytracking/feeding")}
            >
              <LuMilk />
              {t("Feeding")}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate("/babytracking/growth")}
              isActive={isTabActive("/babytracking/growth")}
            >
              <GrLineChart />
              {t("Growth")}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate("/babytracking/sleep")}
              isActive={isTabActive("/babytracking/sleep")}
            >
              <IoCloudyNightOutline />
              {t("Sleep")}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate("/babytracking/vaccinations")}
              isActive={isTabActive("/babytracking/vaccinations")}
            >
              <TbVaccine />
              {t("Vaccinations")}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
}