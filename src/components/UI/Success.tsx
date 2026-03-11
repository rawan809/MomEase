import React from "react";
import { IoCheckmark } from "react-icons/io5";
import { Link } from "react-router-dom";

interface SuccessProps {
  title: string;
  description: string;
  btnText: string;
}

function Success({ title, description, btnText }: SuccessProps) {
  return (
    <div className="flex flex-col gap-4 justify-center p-5 items-center">
      <h2 className="text-small font-bold">{title}</h2>
      <p className="text-[12px] text-muted">{description}</p>

      <div className="text-8xl border-5 flex justify-center items-center border-[#31B042]  text-[#31B042] rounded-full w-30 h-30 m-2">
        <IoCheckmark />
      </div>
      <Link
        to={"/login"}
        className="w-full bg-accent text-black py-2 mb-3 rounded-full cursor-pointer"
      >
        {btnText}
      </Link>
    </div>
  );
}

export default Success;
