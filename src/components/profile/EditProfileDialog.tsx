import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { PuffLoader } from "react-spinners";
import type { UserProfile } from "@/hooks/useMotherProfile";

type EditProfileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userProfile: UserProfile | undefined;
  onSave: (data: {
    firstName: string;
    lastName: string;
    phone: string;
    age: number;
  }) => Promise<void>;
};

function EditProfileDialog({
  open,
  onOpenChange,
  userProfile,
  onSave,
}: EditProfileDialogProps) {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  // Initialize values when the dialog opens or profile loaded
  useEffect(() => {
    if (open && userProfile) {
      setFirstName(userProfile.firstName || "");
      setLastName(userProfile.lastName || "");
      setPhone(userProfile.phone || "");
      setAge(userProfile.age ?? "");
    }
  }, [open, userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || age === "") {
      toast.error(t("Required"));
      return;
    }

    try {
      setLoading(true);
      await onSave({
        firstName,
        lastName,
        phone,
        age: Number(age),
      });
      toast.success(t("Profile updated successfully"));
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || t("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140 rounded-xl overflow-hidden p-0 bg-white">
        <DialogHeader className="p-5 border-b border-gray-100">
          <DialogTitle className="text-lg font-bold text-gray-800">
            {t("editProfile")}
          </DialogTitle>
        </DialogHeader>

        <div className="p-5">
          {!userProfile ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <PuffLoader size={50} color="#ff3381" />
              <p className="text-sm text-gray-500 font-medium">{t("Loading...")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">{t("First Name")}</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all w-full"
                    placeholder={t("First Name")}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">{t("Last Name")}</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all w-full"
                    placeholder={t("Last Name")}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">{t("Phone")}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all w-full"
                  placeholder={t("Phone")}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">{t("Age")}</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAge(val === "" ? "" : Number(val));
                  }}
                  className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all w-full"
                  placeholder={t("Age")}
                  min={1}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white py-3 rounded-xl font-semibold transition-all hover:opacity-90 bg-primary cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? t("Saving...") : t("Save Changes")}
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileDialog;
