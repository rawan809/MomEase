import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="flex h-screen flex-col justify-center items-center gap-4">
      <p className="text-xl"><span className="text-primary text-h2 pr-1 font-bold">404</span>Page Not Found</p>
      <p className="text-muted">The page you're looking for doesn't exist or has been moved.</p>
      <Link className="bg-accent rounded-lg p-3 shadow-md" to={"/"}>Go Home</Link>
    </div>
  );
}

export default Notfound;
