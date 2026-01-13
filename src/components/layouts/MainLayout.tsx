import React from "react";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
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
