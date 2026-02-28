import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import botIcon from "../../assets/images/ChatIcon.svg";

function Loader() {
  return (
    <div className="flex items-center gap-5 ">
      <div className="bg-[#FFC8DD] aspect-square w-10 rounded-full mb-2">
        <img src={botIcon} alt="" className="rounded-full" />
      </div>

      <PulseLoader color="#ff3381" size={10} />
    </div>
  );
}

export default Loader;
