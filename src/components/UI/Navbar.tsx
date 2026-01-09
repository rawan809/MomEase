import React from "react";
import Mineuicon from "./Mineuicon";
import { useState, useEffect } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenueOpen] = useState(false);
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
            <a href="" className="text-primary font-brand  text-h2 font-bold">
              MomEase
            </a>
          </div>
          <div className="hidden md:block">
            <div className="flex gap-5 font-medium ">
              <a href="">Home</a>
              <a href="">Depression </a>
              <a href="">Crying analysis</a>
              <a href="">Baby tracking</a>
              <a href="">Community</a>
            </div>
          </div>
          <div>
            <button className="bg-accent px-5 py-2 rounded-lg cursor-pointer">
              Login
            </button>
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
          <div className="flex flex-col gap-3 font-medium">
            {[
              "Home",
              "Depression",
              "Crying analysis",
              "Baby tracking",
              "Community",
            ].map((link, index) => (
              <div
                className={`font-bold transform transition-all duration-300 
                  ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-10 opacity-0"
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <a key={link} href="" className="hover:bg-accent rounded p-1">
                  {link}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*  overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 ${
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
