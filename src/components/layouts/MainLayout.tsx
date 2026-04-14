import React from "react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
