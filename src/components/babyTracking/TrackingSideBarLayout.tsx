import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import BabyDropDown from "./BabyDropDown";

export default function TrackingSideBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
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
