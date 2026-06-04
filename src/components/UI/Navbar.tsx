import Mineuicon from "./Mineuicon";
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import botIcon from "../../assets/images/ChatIcon.svg";
import { BsFillPersonFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import NotificationDropDown from "../notifications/NotificationDropDown";
import ProfileDropDown from "./ProfileDropDown";
import { useAuth } from "@/contexts/AuthContext";
import { LanguageButton, LanguageToggleMobile } from "./LanguageSwitcher";
import { HealthTools } from "./HealthTools";
import { useTranslation } from "react-i18next";

function Navbar() {
  const [isMenuOpen, setIsMenueOpen] = useState(false);
  const location = useLocation();
  const authtoken = localStorage.getItem("userToken");
  const authtoken2 = localStorage.getItem("token");
  const [loggedIn] = useState(!!authtoken || !!authtoken2);
  const { logout } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 830) setIsMenueOpen(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMenueOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div className="">
      <div className="px-(--space-lg) z-50 fixed w-full bg-white">
        <div className="max-w-7xl flex justify-between mx-auto items-center h-20">
          {/* Hamburger */}
          <Mineuicon isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenueOpen} />

          {/* Logo */}
          <Link
            to="/"
            className="text-primary font-brand text-h2 font-bold outline-none"
          >
            MomEase
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:block w-140">
            <div className="flex gap-5 font-medium justify-center">
              {[
                { to: "/home", label: t("Home") },
                { to: "/babytracking", label: t("Baby tracking") },
                { to: "/community", label: t("Community") },
              ].map(({ to, label }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive, isPending }) =>
                    isPending ? "text-gray-400" : isActive ? "text-primary" : ""
                  }
                >
                  {label}
                </NavLink>
              ))}
              <HealthTools />
            </div>
          </div>

          {/* Desktop right cluster */}
          <div className="flex items-center gap-2">
            {loggedIn ? (
              <>
                {/* Notifications */}
                <div className="hidden md:block">
                  <LanguageButton />
                </div>
                <div className="text-xl text-primary aspect-square w-7 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all cursor-pointer">
                  <NotificationDropDown />
                </div>

                {/* Chatbot */}
                <Link
                  to="/chatbot"
                  className="hidden aspect-square w-7 rounded-full hover:bg-gray-200 transition-all md:block"
                >
                  <img src={botIcon} alt="chatbot" className="rounded-full" />
                </Link>

                {/* Profile */}
                <div className="hidden text-xl text-primary aspect-square w-7 rounded-full md:flex items-center justify-center hover:bg-gray-200 transition-all cursor-pointer">
                  <ProfileDropDown />
                </div>
              </>
            ) : (
              <>
                {/* Language button */}
                <div className="hidden md:block">
                  <LanguageButton />
                </div>

                <Link
                  to="/login"
                  className="bg-accent px-5 py-2 rounded-lg cursor-pointer"
                >
                  {t("Login")}
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`border-t border-t-accent p-4 transition-all duration-500 bg-white absolute w-full top-20 left-0
    ${
      isMenuOpen
        ? "translate-x-0 opacity-100 max-h-[calc(100vh-5rem)] overflow-y-auto"
        : "-translate-x-full opacity-0 max-h-0 overflow-hidden"
    }`}
        >
          <div className="flex flex-col gap-3 font-medium">
            {[
              { to: "/home", label: t("Home"), isNav: true },
              { to: "/depression", label: t("Depression"), isNav: true },
              { to: "/cryAnalysis", label: t("Crying Analysis"), isNav: true },
              { to: "/babytracking", label: t("Baby tracking"), isNav: true },
              { to: "/community", label: t("Community"), isNav: true },
              { to: "/skindiagnoses", label: t("Skin Analysis"), isNav: true },
            ].map((item, index) =>
              item.isNav ? (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive, isPending }) =>
                    `${isPending ? "text-gray-400" : isActive ? "text-primary" : ""} font-bold transform transition-all duration-300 hover:bg-accent rounded p-1 ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`
                  }
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </NavLink>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`font-bold transform transition-all duration-300 hover:bg-accent rounded p-1
                    ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </Link>
              ),
            )}

            <div className="border-t-2 border-t-accent "></div>

            {loggedIn && (
              <NavLink
                to="/myprofile"
                className={({ isActive, isPending }) =>
                  `${isPending ? "text-gray-400" : isActive ? "text-primary" : ""} font-bold transform transition-all duration-300 hover:bg-accent rounded p-1 ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"} mt-2 pt-2 flex items-center gap-2`
                }
              >
                <BsFillPersonFill className="w-7 text-primary" size={25} />
                {t("Profile")}
              </NavLink>
            )}

            {/* Chatbot */}
            <NavLink
              to="/chatbot"
              className={({ isActive, isPending }) =>
                `${isPending ? "text-gray-400" : isActive ? "text-primary" : ""} font-bold transform transition-all duration-300 hover:bg-accent rounded p-1 ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"} pt-2 flex items-center gap-2`
              }
            >
              <img src={botIcon} alt="" className="w-7" />
              {t("Chat bot")}
            </NavLink>

            {/* Mobile language toggle */}
            <div
              className={`border-t-2 border-t-accent pt-2 transform transition-all duration-300
                ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
              style={{ transitionDelay: "600ms" }}
            >
              <LanguageToggleMobile />
            </div>

            {/* Logout */}
            {loggedIn && (
              <div
                className="text-red-600 font-semibold text-[12px] hover:bg-gray-100 transition-all rounded-xl px-2 flex items-center gap-1 cursor-pointer pt-2"
                onClick={logout}
              >
                <CiLogout size={20} />
                {t("Log Out")}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 z-40 ${
          isMenuOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenueOpen(false)}
      />
    </div>
  );
}

export default Navbar;
