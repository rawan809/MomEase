import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/popover";
import { BsFillPersonFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ProfileDropDown() {
  const { t } = useTranslation();
  const { logout, user } = useAuth();
  const userName = user?.firstName || t("User");
  const userEmail = user?.email || "";
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <div className="hidden text-xl text-primary bg-[#FFC8DD] aspect-square w-7 rounded-full md:flex items-center justify-center">
          <BsFillPersonFill />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit px-3" align="end">
        <div className="space-y-2">
          <div className="border-b-2  pb-2">
            <p className="font-bold">{userName}</p>
            <p className="text-[12px] text-gray-600">{userEmail}</p>
          </div>
          <div className="pb-2 hover:text-primary transition-all">
            <Link to={"/myprofile"}>{t("my profile")}</Link>
          </div>
          <div
            className="text-red-600 font-semibold text-[12px] hover:bg-gray-100 transition-all rounded-xl  flex items-center gap-1 cursor-pointer pb-2"
            onClick={logout}
          >
            <CiLogout size={20} />
            {t("Log Out")}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ProfileDropDown;