import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import BabyDropDown from "./BabyDropDown";

export default function TrackingSideBarLayout({
  children,
  setActiveTab,
  activeTab,
}: {
  children: React.ReactNode;
  setActiveTab: (tab: string) => void;
  activeTab: string;
}) {
  return (
    <SidebarProvider>
      <AppSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="w-full ">
        <div className="px-(--space-lg) md:px-2">
          <SidebarTrigger />
          <BabyDropDown />
        </div>

        {children}
      </div>
    </SidebarProvider>
  );
}
