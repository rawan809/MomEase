import AuthLayout from "../../src/components/auth/AuthLayout";
import AuthForm from "../../src/components/auth/AuthForm";
import SocialLogin from "../../src/components/auth/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "./Validation";
import { resendOtp } from "../../services/auth";
import axios from "axios";
import { useAuth } from "../../src/contexts/AuthContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log("Form submitted", values);
      setLoading(true);
      try {
        const res = await login(values);

        const role = res?.data?.role;

        if (role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;

          // لو الايميل مش متفعل
          if (message === "Please verify your email before logging in.") {
            try {
              // نبعت كود جديد
              await resendOtp(values.email);

              localStorage.setItem("verifyEmail", values.email);

              // نروح صفحة الفيريفاي
              navigate("/verifyEmail");
            } catch (err) {
              console.log("Resend OTP error:", err);
            }
          } else {
            console.log("Login error:", error.response?.data);
          }
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
        title="Welcome Back"
        subtitle="Login to continue your journey!"
        buttonText="Login"
        fields={
          <>
            <input
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="input"
              placeholder="Email / Phone"
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-400 text-[12px] font-semibold">
                {formik.errors.email}
              </div>
            ) : null}

            <input
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              className="input"
              type="password"
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-400 text-[12px] font-semibold">
                {formik.errors.password}
              </div>
            ) : null}

            <Link to={"/forgetByEmail"}>
              <p className="text-right text-primary text-sm cursor-pointer mb-2">
                Forgot Password?
              </p>
            </Link>
          </>
        }
        footer={
          <>
            <SocialLogin />
            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <Link to={"/signup"} className="text-primary cursor-pointer">
                Sign Up
              </Link>
            </p>
          </>
        }
      />
    </AuthLayout>
  );
};

export default Login;
