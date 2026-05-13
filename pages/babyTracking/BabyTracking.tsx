import TrackingSideBarLayout from "../../src/components/babyTracking/TrackingSideBarLayout";
import Navbar from "@/components/ui/Navbar";
import { useState } from "react";
import Overview from "@/components/babyTracking/overview/Overview";
import Feeding from "@/components/babyTracking/feeding/Feeding";
import Growth from "@/components/babyTracking/growth/Growth";
import Sleep from "@/components/babyTracking/sleep/Sleep";
import Vaccination from "@/components/babyTracking/vaccinations/Vaccination";
import { ChildProvider } from "@/contexts/ChildContext";

function BabyTracking() {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <ChildProvider>
      <section className=" ">
        <Navbar />
        <div className="w-full md:max-w-7xl sm:mx-auto  py-20 ">
          <TrackingSideBarLayout
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          >
            <div className=" py-5 px-(--space-lg) ">
              {activeTab === "overview" && <Overview />}
              {activeTab === "feeding" && <Feeding />}
              {activeTab === "growth" && <Growth />}
              {activeTab === "sleep" && <Sleep />}
              {activeTab === "vaccinations" && <Vaccination />}
            </div>
          </TrackingSideBarLayout>
        </div>
      </section>
    </ChildProvider>
  );
}

export default BabyTracking;
