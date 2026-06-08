"use client";
import NewPass from "@/assets/images/newPass.png";
import { useFormik } from "formik";
import { resetPasswordSchema } from "./Validation";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Success from "@/components/ui/Success";
import { resetPassword } from "../../services/auth";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PuffLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const CreateNewPassword = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const params = useParams();
  const email = params.email?.slice(1) || undefined;
  const [isSuccess, setIsSuccess] = useState(false);
  let navigate = useNavigate();

  const handleSubmet = async (values: {
    otpCode: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      if (!email) return;
      const res = await resetPassword(email, values.otpCode, values.password);
      if (res?.message) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      otpCode: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema.pick([
      "password",
      "confirmPassword",
      "otpCode",
    ]),
    onSubmit: handleSubmet,
  });

  if (isSuccess) {
    return (
      <div className="p-10 flex-col justify-center">
        <h1 className="mb-10">
          <Link to={"/"} className="text-3xl font-brand text-primary">
            MamEase
          </Link>
        </h1>
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl text-center w-full max-w-md min-h-130 p-6 sm:p-8 flex items-center justify-center">
            <Success
              title={t("Password reset successful!")}
              description={t("Your password has been changed successfully.")}
              btnText={t("Go to login")}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 flex-col justify-center">
      <h1 className="mb-10">
        {" "}
        <Link to={"/"} className="text-3xl font-brand text-primary">
          MamEase
        </Link>
      </h1>
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl text-center w-full max-w-md min-h-130 p-6 sm:p-8">
          <div className="relative flex items-center justify-center mb-2">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="absolute left-0 text-3xl font-bold text-primary cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft />
            </button>

            <h2 className="text-xl font-semibold text-center">
              {t("Create New Password")}
            </h2>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-25 h-25 rounded-full flex items-center justify-center">
              <img src={NewPass} alt="reset password" className="w-full" />
            </div>
          </div>

          <p className="text-center text-muted text-sm mb-6">
            {t(
              "Your new password must be different from previously used password",
            )}
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-4" dir="ltr">
            <div>
              <input
                type="text"
                name="otpCode"
                maxLength={4}
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder={t("Enter Verification Code")}
                className="input"
                value={formik.values.otpCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  formik.setFieldValue("otpCode", value);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.otpCode && formik.errors.otpCode && (
                <p className="text-red-400 text-xs mt-1 font-semibold">
                  {formik.errors.otpCode}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input"
                placeholder={t("New Password")}
                id="password-toggle"
                type={showPassword ? "text" : "password"}
              />
              <Button
                className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                size="icon"
                type="button"
                variant="ghost"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-400 text-xs mt-1 font-semibold">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                name="confirmPassword"
                className="input"
                placeholder={t("Confirm New Password")}
                id="password-toggle"
                type={showPassword ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Button
                className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                size="icon"
                type="button"
                variant="ghost"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>

            <div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1 font-semibold">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-black py-3 rounded-full font-semibold mt-2 transition hover:opacity-90 cursor-pointer"
              disabled={loading}
            >
              {loading ? <PuffLoader size={22} color="#ff3381" /> : t("Save")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
