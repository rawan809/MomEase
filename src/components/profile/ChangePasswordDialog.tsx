import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { FiEye, FiEyeOff } from "react-icons/fi";
import * as Yup from "yup";
import i18next from "i18next";

type ChangePasswordDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChangePassword: (data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => Promise<any>;
};

// Password validation matching login/signup validation
const passwordSchema = Yup.string()
  .min(8, () => i18next.t("Password must be at least 8 characters"))
  .matches(/[a-z]/, () =>
    i18next.t("Password must contain at least one lowercase letter"),
  )
  .matches(/[0-9]/, () =>
    i18next.t("Password must contain at least one number"),
  )
  .matches(/[A-Z]/, () =>
    i18next.t("Password must contain at least one uppercase letter"),
  )
  .matches(/[!@#$%^&*(),.?":{}|<>]/, () =>
    i18next.t("Password must contain at least one special character"),
  )
  .required(() => i18next.t("Required"));

const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required(() => i18next.t("Required")),
  newPassword: passwordSchema,
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], () => i18next.t("passwords must match"))
    .required(() => i18next.t("Required")),
});

function ChangePasswordDialog({
  open,
  onOpenChange,
  onChangePassword,
}: ChangePasswordDialogProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form inputs
      await changePasswordSchema.validate(
        { currentPassword, newPassword, confirmNewPassword },
        { abortEarly: true },
      );

      setLoading(true);
      await onChangePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      toast.success(t("Password changed successfully"));
      // Clear fields and close
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      onOpenChange(false);
    } catch (err: any) {
      if (err.name === "ValidationError") {
        toast.error(err.message);
      } else {
        const errorMsg = err?.message || t("Something went wrong");
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-140 rounded-xl overflow-hidden p-0 bg-white">
        <DialogHeader className="p-5 border-b border-gray-100">
          <DialogTitle className="text-lg font-bold text-gray-800">
            {t("changePassword")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Current Password */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
              {t("Current Password")}
            </label>
            <div className="relative w-full">
              <input
                dir="ltr"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`border border-gray-200 rounded-xl py-3 outline-none focus:border-primary transition-all w-full ${
                  isRtl ? "pl-12 pr-4 text-right" : "pr-12 pl-4 text-left"
                }`}
                placeholder={t("Current Password")}
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all cursor-pointer ${
                  isRtl ? "left-4" : "right-4"
                }`}
              >
                {showCurrentPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
              {t("New Password")}
            </label>
            <div className="relative w-full">
              <input
                dir="ltr"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`border border-gray-200 rounded-xl py-3 outline-none focus:border-primary transition-all w-full ${
                  isRtl ? "pl-12 pr-4 text-right" : "pr-12 pl-4 text-left"
                }`}
                placeholder={t("New Password")}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all cursor-pointer ${
                  isRtl ? "left-4" : "right-4"
                }`}
              >
                {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
              {t("Confirm New Password")}
            </label>
            <div className="relative w-full">
              <input
                dir="ltr"
                type={showConfirmNewPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className={`border border-gray-200 rounded-xl py-3 outline-none focus:border-primary transition-all w-full ${
                  isRtl ? "pl-12 pr-4 text-right" : "pr-12 pl-4 text-left"
                }`}
                placeholder={t("Confirm New Password")}
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all cursor-pointer ${
                  isRtl ? "left-4" : "right-4"
                }`}
              >
                {showConfirmNewPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-3 rounded-xl font-semibold transition-all hover:opacity-90 bg-primary cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? t("Saving...") : t("Save Changes")}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordDialog;
