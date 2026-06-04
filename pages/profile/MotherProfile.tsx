import { FiEdit } from "react-icons/fi";
import Children from "@/components/profile/Children";
import { useMotherProfile } from "@/hooks/useMotherProfile";
import { toast } from "sonner";
import ConfirmProfilePhoto from "@/components/profile/ConfirmProfilePhoto";
import ArticlesSection from "@/components/Articles/ArticalSection";
import { getSavedArticlesAPI } from "../../services/articles";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import ProfileActionsMenu from "@/components/profile/ProfileActionsMenu";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import ChangePasswordDialog from "@/components/profile/ChangePasswordDialog";
import ProfileNavTabs from "@/components/profile/ProfileNavTabs";

function MotherProfile() {
  const { t } = useTranslation();

  const [savedArticles, setSavedArticles] = useState<
    Array<{
      articleId: number;
      title: string;
      imageUrl: string;
      readingTimeMinutes: number;
      categoryName: string;
      savedAt: string;
    }>
  >([]);

  const { language } = useLanguage();

  const {
    profileData,
    userProfile,
    uploadPhoto,
    deletePhoto,
    updateUserProfile,
    changePassword,
  } = useMotherProfile();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const savedRes = await getSavedArticlesAPI();
        setSavedArticles(savedRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSaved();
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-(--space-lg)">
        <div className="space-y-10">
          <div>
            <div className="mb-5">
              <p className="text-2xl font-bold text-gray-800">
                {t("My Profile")}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                {t("Manage your account and baby information")}
              </p>
            </div>

            <div className="rounded-xl shadow-xl flex flex-col md:flex-row items-center md:items-center gap-5 p-5 bg-[#ffd6e4]">
              <div className="relative w-fit mx-auto md:mx-0">
                <div className="bg-white border-2 border-primary rounded-full w-15 aspect-square flex items-center justify-center overflow-hidden">
                  {profileData?.profilePictureUrl ? (
                    <img
                      src={profileData.profilePictureUrl}
                      alt={t("profile")}
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
                            toast.success(t("Photo Added successfully"));
                          } catch (err: any) {
                            toast.error(
                              err.message || t("Something went wrong"),
                            );
                          }
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              <div
                className={`w-full text-center ${
                  language === "en" ? "md:text-left" : "md:text-right"
                }`}
              >
                <div className="md:flex items-center justify-between">
                  <p className="text-xl font-semibold">
                    {profileData?.firstName} {profileData?.lastName}
                  </p>

                  <ProfileActionsMenu
                    onEditProfile={() => setIsEditProfileOpen(true)}
                    onChangePassword={() => setIsChangePasswordOpen(true)}
                  />
                </div>

                <p className="mb-2">{profileData?.email}</p>

                <p className="text-sm text-primary font-medium">
                  {profileData?.numberOfChildren === 0
                    ? t("No children added yet")
                    : profileData?.numberOfChildren === 1
                      ? t("Mom of 1 child")
                      : t("Mom of {{count}} children", {
                          count: profileData?.numberOfChildren,
                        })}
                </p>
              </div>
            </div>
          </div>

          <div>
            <ProfileNavTabs />
          </div>

          <div>
            <Children />
          </div>

          <div>
            <ArticlesSection articles={savedArticles} saved />
          </div>
        </div>
      </div>

      <EditProfileDialog
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
        userProfile={userProfile}
        onSave={updateUserProfile}
      />

      <ChangePasswordDialog
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
        onChangePassword={changePassword}
      />
    </section>
  );
}

export default MotherProfile;
