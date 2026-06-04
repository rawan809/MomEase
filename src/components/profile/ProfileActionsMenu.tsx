import { FiEdit, FiUser, FiLock } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

type ProfileActionsMenuProps = {
  onEditProfile: () => void;
  onChangePassword: () => void;
};

function ProfileActionsMenu({
  onEditProfile,
  onChangePassword,
}: ProfileActionsMenuProps) {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="bg-white rounded-xl items-center gap-1 px-3 py-1 cursor-pointer hover:bg-gray-100 transition-all flex ">
          <FiEdit />
          <span>{t("edit")}</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={onEditProfile} className="cursor-pointer">
          <FiUser className="mr-2 h-4 w-4" />
          {t("editProfile")}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onChangePassword} className="cursor-pointer">
          <FiLock className="mr-2 h-4 w-4" />
          {t("changePassword")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileActionsMenu;
