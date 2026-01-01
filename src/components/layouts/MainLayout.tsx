import React from "react";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";

function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
