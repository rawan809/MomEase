import type { ReactNode } from "react";
import ForgetPassword from "../../assets/images/forgetPassword.png";
import { Link } from "react-router-dom";
type Props = {
  children: ReactNode;
};

const ForgetPasswordLayout = ({ children }: Props) => {
  return (
    <>
      <h1 className="absolute z-0 top-10 left-40">
        <Link to={"/"} className="text-3xl font-brand text-primary">
          MamEase
        </Link>
      </h1>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 max-w-md shadow-2xl text-center">
          <h2 className="text-lg font-semibold mb-4">Forget Password</h2>

          <div className="w-25 h-25 bg-blue-100 rounded-full mx-auto mb-4">
            <img src={ForgetPassword} alt="" className="w-full" />
          </div>

          {children}
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordLayout;
