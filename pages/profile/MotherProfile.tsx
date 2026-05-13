import { FiEdit } from "react-icons/fi";
import Children from "@/components/profile/Children";


function MotherProfile() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-(--space-lg)">
        <div className="space-y-10">
          <div>
            <div className="mb-5">
              <p className="text-2xl font-bold text-gray-800">My Profile</p>
              <p className="text-sm text-gray-500 font-medium">
                Manage your account and baby information
              </p>
            </div>
            <div className=" rounded-xl shadow-xl flex items-center gap-5 p-5 bg-[#ffd6e4]">
              <div>
                <p className="bg-white border-2 border-primary rounded-full w-15  flex items-center justify-center aspect-square">
                  img
                </p>
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold">Rawan</p>
                  <button className="bg-white rounded-xl flex items-center gap-1 px-3 py-1 cursor-pointer hover:bg-gray-100 transition-all">
                    <FiEdit />
                    <span>edit</span>
                  </button>
                </div>
                <p className="mb-2">email</p>
                <p className=" text-sm  text-primary">babynum</p>
              </div>
            </div>
          </div>

          <div className="">
            <Children />
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
}

export default MotherProfile;
