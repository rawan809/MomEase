import TrackingSideBarLayout from "@/components/babyTracking/TrackingSideBarLayout";
import Navbar from "@/components/UI/Navbar";
// import { ChildProvider } from "@/contexts/ChildContext";
import { Outlet } from "react-router-dom";

function BabyTracking() {
  return (
    // <ChildProvider>
      <section className=" ">
        <Navbar />
        <div className="w-full md:max-w-10xl sm:mx-auto  py-24 ">
          <TrackingSideBarLayout>
            <div className=" py-5 px-(--space-lg) ">
              <Outlet />
            </div>
          </TrackingSideBarLayout>
        </div>
      </section>
    // </ChildProvider>
  );
}

export default BabyTracking;
