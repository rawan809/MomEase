import AuthLayout from "../../src/components/auth/AuthLayout";
import AuthForm from "../../src/components/auth/AuthForm";
import SocialLogin from "../../src/components/auth/SocialLogin";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { validationSchema } from "./Validation";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
    validationSchema: validationSchema,
  });
  return (
    <AuthLayout>
      <AuthForm
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
            <p className="text-right text-primary text-sm cursor-pointer">
              Forgot Password?
            </p>
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
