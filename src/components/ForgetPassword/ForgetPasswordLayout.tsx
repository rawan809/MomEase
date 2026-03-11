import type { ReactNode } from "react";
import ForgetPassword from "../../assets/images/forgetPassword.png";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import { Link } from "react-router-dom";
type Props = {
  children: ReactNode;
};

const ForgetPasswordLayout = ({ children }: Props) => {
  return (
    <div className="p-10 flex-col justify-center">
      <h1 className="mb-10">
        <Link to={"/"} className="text-3xl font-brand text-primary">
          MamEase
        </Link>
      </h1>
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl text-center w-full max-w-md min-h-130 p-6 sm:p-8">
          <div className="relative flex items-center justify-center mb-4">
            <Link
              to={"/login"}
              className="absolute left-0 text-3xl font-bold text-primary cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft />
            </Link>

            <h2 className="text-xl font-semibold text-center">
              Forget Password
            </h2>
          </div>

          <div className="w-25 h-25 bg-blue-100 rounded-full mx-auto mb-4">
            <img src={ForgetPassword} alt="" className="w-full" />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordLayout;
