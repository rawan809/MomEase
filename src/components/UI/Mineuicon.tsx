import React, { useState } from "react";

function Mineuicon({isMenuOpen,setIsMenuOpen}) {
  const toggleOpen = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="space-y-1.5 md:hidden cursor-pointer" onClick={toggleOpen}>
      <span
        className={`block h-0.5 w-6 bg-black rounded transform transition duration-300 ${
          isMenuOpen ? "rotate-45 translate-y-2" : ""
        }`}
      ></span>
      <span
        className={`block h-0.5 w-6 bg-black rounded transition duration-300 ${
          isMenuOpen ? "opacity-0" : "opacity-100"
        }`}
      ></span>
      <span
        className={`block h-0.5 w-6 bg-black rounded transform transition duration-300 ${
          isMenuOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      ></span>
    </div>
  );
}

export default Mineuicon;
