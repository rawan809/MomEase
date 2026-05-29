"use client";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "../../src/components/auth/AuthLayout";
import AuthForm from "../../src/components/auth/AuthForm";
import SocialLogin from "../../src/components/auth/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validationSchema } from "./Validation";
import { registerUser, resendOtp } from "../../services/auth";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      age: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await registerUser({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          phone: values.phone || "00000000000",
          age: values.age ? Number(values.age) : 18,
        });
        console.log("Registration successful");
        try {
          // نبعت كود جديد
          await resendOtp(values.email);

          localStorage.setItem("verifyEmail", values.email);

          // نروح صفحة الفيريفاي
          navigate("/VerifyEmail");
        } catch (err) {
          console.log("Resend OTP error:", err);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.log("Backend error:", error.response?.data);
        } else {
          console.log("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <AuthLayout>
      <AuthForm
        loading={loading}
        onSubmit={formik.handleSubmit}
        title={t("Create an account")}
        subtitle={t("Join us to start your journey")}
        buttonText={t("Sign Up")}
        fields={
          <>
            {/* First Name */}
            <input
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input"
              placeholder={t("First Name")}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-400 text-[12px] font-semibold">
                {formik.errors.firstName}
              </div>
            )}

            {/* Last Name */}
            <input
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input"
              placeholder={t("Last Name")}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-400 text-[12px] font-semibold">
                {formik.errors.lastName}
              </div>
            )}

            {/* Email */}
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input"
              placeholder={t("Email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-400 text-[12px] font-semibold">
                {formik.errors.email}
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <input
                className="input"
                placeholder={t("Password")}
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
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
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-400 text-[12px] font-semibold">
                {formik.errors.password}
              </div>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <input
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="input"
                placeholder={t("Confirm Password")}
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
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-400 text-[12px] font-semibold">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </>
        }
        footer={
          <>
            <SocialLogin />
            <p className="text-sm text-center">
              {t("Already have an account?")}{" "}
              <Link to="/login" className="text-primary cursor-pointer">
                {t("Login")}
              </Link>
            </p>
          </>
        }
      />
    </AuthLayout>
  );
};

export default Register;