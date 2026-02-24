import React from "react";
import articleImg from "../../assets/images/articleImg.jpg";
import { Link } from "react-router-dom";

function CatigoryCards() {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg group">
      <div
        className="relative bg-cover bg-center h-64"
        style={{
          backgroundImage: `
        linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(255,102,161,0.25)),
        url(${articleImg})
      `,
        }}
      >
        <p className="absolute bottom-4 left-4 text-white z-20">24 Article</p>
      </div>

      <div className="relative z-20 p-4 bg-white">
        <Link to={"/Articles"} className="font-semibold group-hover:text-primary transition-colors duration-300">
          Postpartum Recovery
        </Link>
        <p>
          Find supportive articles, expert guidance, and caring resources for
          every stage of your motherhood journey
        </p>
      </div>
    </div>
  );
}

export default CatigoryCards;
