import { FiEdit } from "react-icons/fi";
import Children from "@/components/profile/Children";
import { useMotherProfile } from "@/hooks/useMotherProfile";
import { toast } from "sonner";
import ConfirmProfilePhoto from "@/components/profile/ConfirmProfilePhoto";

function MotherProfile() {
  const { profileData, uploadPhoto, deletePhoto } = useMotherProfile();

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

            <div className="rounded-xl shadow-xl flex flex-col md:flex-row items-center md:items-center gap-5 p-5 bg-[#ffd6e4]">
              <div className="relative w-fit mx-auto md:mx-0">
                <div className="bg-white border-2 border-primary rounded-full w-15 aspect-square flex items-center justify-center overflow-hidden">
                  {profileData?.profilePictureUrl ? (
                    <img
                      src={profileData.profilePictureUrl}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold">
                      {profileData?.firstName?.[0]}
                    </span>
                  )}
                </div>

                {profileData?.profilePictureUrl ? (
                  <div className="absolute bottom-0 right-0">
                    <ConfirmProfilePhoto
                      onUpload={uploadPhoto}
                      onDelete={deletePhoto}
                    />
                  </div>
                ) : (
                  <label className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full cursor-pointer shadow-md hover:scale-105 transition-all">
                    <FiEdit size={12} />

                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={async (e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          try {
                            await uploadPhoto(file);
                            toast.success("Photo Added successfully");
                          } catch (err: any) {
                            toast.error(
                              err.message || "Something went wrong"
                            );
                          }
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              <div className="w-full text-center md:text-left">
                <div className="md:flex items-center justify-between">
                  <p className="text-xl font-semibold  ">
                    {profileData?.firstName} {profileData?.lastName}
                  </p>

                  <button className="bg-white rounded-xl  items-center gap-1 px-3 py-1 cursor-pointer hover:bg-gray-100 transition-all md:flex hidden">
                    <FiEdit />
                    <span>edit</span>
                  </button>
                </div>

                <p className="mb-2">{profileData?.email}</p>

                <p className="text-sm text-primary font-medium">
                  {profileData?.numberOfChildren === 0
                    ? "No children added yet"
                    : `Mom of ${profileData?.numberOfChildren} ${
                        profileData?.numberOfChildren === 1
                          ? "child"
                          : "children"
                      }`}
                </p>
              </div>
            </div>
          </div>

          <div>
            <Children />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MotherProfile;