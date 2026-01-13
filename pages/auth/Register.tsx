import AuthLayout from "../../src/components/auth/AuthLayout";
import AuthForm from "../../src/components/auth/AuthForm";
import SocialLogin from "../../src/components/auth/SocialLogin";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { validationSchema } from "./Validation";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: () => {},
    validationSchema: validationSchema,
  });
  return (
    <AuthLayout>
      <AuthForm
        onSubmit={formik.handleSubmit}
        title="Create an account"
        subtitle="Join us to start your journey"
        buttonText="Sign Up"
        fields={
          <>
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="input"
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-400 text-[12px] font-semibold">
                {formik.errors.email}
              </div>
            ) : null}
            <input
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="input"
              type="password"
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-400 text-[12px] font-semibold">
                {formik.errors.password}
              </div>
            ) : null}
            <input
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="input"
              type="password"
              placeholder="Confirm Password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-400 text-[12px] font-semibold">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </>
        }
        footer={
          <>
            <SocialLogin />
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to={"/login"} className="text-primary cursor-pointer">
                Login
              </Link>
            </p>
          </>
        }
      />
    </AuthLayout>
  );
};

export default Register;
