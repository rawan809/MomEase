import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { MdOutlineTableChart } from "react-icons/md";
import { LuMilk } from "react-icons/lu";
import { GrLineChart } from "react-icons/gr";
import { TbVaccine } from "react-icons/tb";
import { IoCloudyNightOutline } from "react-icons/io5";

export function AppSidebar({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}) {
  return (
    <Sidebar className="top-20 h-full ">
      <SidebarContent className="bg-white border px-(--space-lg) py-5">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveTab("overview")}
              isActive={activeTab === "overview"}
            >
              <MdOutlineTableChart />
              Overview
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveTab("feeding")}
              isActive={activeTab === "feeding"}
            >
              <LuMilk />
              Feeding
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveTab("growth")}
              isActive={activeTab === "growth"}
            >
              <GrLineChart />
              Growth
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveTab("sleep")}
              isActive={activeTab === "sleep"}
            >
              <IoCloudyNightOutline />
              Sleep
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveTab("vaccinations")}
              isActive={activeTab === "vaccinations"}
            >
              <TbVaccine />
              Vaccinations
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton> Username</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  );
}
