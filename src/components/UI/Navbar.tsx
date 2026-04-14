import React from "react";
import Mineuicon from "./Mineuicon";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import botIcon from "../../assets/images/ChatIcon.svg";
import { BsFillPersonFill } from "react-icons/bs";
import NotificationDropDown from "../notifications/NotificationDropDown";

function Navbar() {
  const [isMenuOpen, setIsMenueOpen] = useState(false);
  const authtoken = localStorage.getItem("userToken");
  const authtoken2 = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(!!authtoken || !!authtoken2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 830) {
        setIsMenueOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);
  return (
    <div className="">
      <div className=" px-(--space-lg) z-50 fixed w-full bg-white">
        <div className="max-w-7xl flex justify-between mx-auto items-center h-20">
          <Mineuicon isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenueOpen} />
          <div>
            <Link
              to={"/"}
              className="text-primary font-brand  text-h2 font-bold outline-none"
            >
              MomEase
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex gap-5 font-medium ">
              <NavLink
                to="/home"
                className={({ isActive, isPending }) =>
                  isPending ? "text-gray-400" : isActive ? "text-primary" : ""
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/depression"
                className={({ isActive, isPending }) =>
                  isPending ? "text-gray-400" : isActive ? "text-primary" : ""
                }
              >
                Depression{" "}
              </NavLink>
              <NavLink to="">Crying analysis</NavLink>
              <NavLink to="">Baby tracking</NavLink>
              <NavLink to="">Community</NavLink>
            </div>
          </div>
          <div>
            {loggedIn ? (
              <div className="flex gap-2 items-center">
                <div className="text-xl text-primary aspect-square w-7 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all cursor-pointer">
                  <NotificationDropDown />
                </div>
                <Link
                  to={"/chatbot"}
                  className="hidden aspect-square w-7 rounded-full hover:bg-gray-200 transition-all md:block"
                >
                  <img src={botIcon} alt="" className="rounded-full" />
                </Link>
                <div className="hidden text-xl text-primary bg-[#FFC8DD] aspect-square w-7 rounded-full md:flex items-center justify-center">
                  <BsFillPersonFill />
                </div>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="bg-accent px-5 py-2 rounded-lg cursor-pointer"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <div
          className={`border-t border-t-accent p-4 overflow-hidden transition-all duration-500 bg-white absolute w-full top-20 left-0
                  ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-full opacity-0"
                  }`}
        >
          {/* menu */}
          <div className="">
            <div className="flex flex-col gap-3 font-medium">
              {[
                { to: "/home", label: "Home", isNav: true },
                { to: "/depression", label: "Depression", isNav: true },
                { to: "", label: "Crying analysis", isNav: false },
                { to: "", label: "Baby tracking", isNav: false },
                { to: "", label: "Community", isNav: false },
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
              <NavLink
                to={"/profile"}
                className={({ isActive, isPending }) =>
                  `${isPending ? "text-gray-400" : isActive ? "text-primary" : ""} font-bold transform transition-all duration-300 hover:bg-accent rounded p-1 ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"} border-t-2 border-t-accent mt-2 pt-2 flex items-center gap-2`
                }
              >
                <BsFillPersonFill className="w-7 text-primary" size={25} />{" "}
                Profile
              </NavLink>
              <NavLink
                to={"/chatbot"}
                className={({ isActive, isPending }) =>
                  `${isPending ? "text-gray-400" : isActive ? "text-primary" : ""} font-bold transform transition-all duration-300 hover:bg-accent rounded p-1 ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"} pt-2 flex items-center gap-2`
                }
              >
                <img src={botIcon} alt="" className="w-7 " />
                Chat bot
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/*  overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 z-40 ${
          isMenuOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenueOpen(false)}
      ></div>
    </div>
  );
}

export default Navbar;
