// import AuthLayout from "../../src/components/auth/AuthLayout";
// import AuthForm from "../../src/components/auth/AuthForm";
// import SocialLogin from "../../src/components/auth/SocialLogin";
// import { Link } from "react-router-dom";
// import { useFormik } from "formik";
// import { validationSchema } from "./Validation";

// const Register = () => {
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     onSubmit: () => {},
//     validationSchema: validationSchema,
//   });
//   return (
//     <AuthLayout>
//       <AuthForm
//         onSubmit={formik.handleSubmit}
//         title="Create an account"
//         subtitle="Join us to start your journey"
//         buttonText="Sign Up"
//         fields={
//           <>
//             <input
//               name="email"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//               className="input"
//               placeholder="Email"
//             />
//             {formik.touched.email && formik.errors.email ? (
//               <div className="text-red-400 text-[12px] font-semibold">
//                 {formik.errors.email}
//               </div>
//             ) : null}
//             <input
//               name="password"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.password}
//               className="input"
//               type="password"
//               placeholder="Password"
//             />
//             {formik.touched.password && formik.errors.password ? (
//               <div className="text-red-400 text-[12px] font-semibold">
//                 {formik.errors.password}
//               </div>
//             ) : null}
//             <input
//               name="confirmPassword"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.confirmPassword}
//               className="input"
//               type="password"
//               placeholder="Confirm Password"
//             />
//             {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
//               <div className="text-red-400 text-[12px] font-semibold">
//                 {formik.errors.confirmPassword}
//               </div>
//             ) : null}
//           </>
//         }
//         footer={
//           <>
//             <SocialLogin />
//             <p className="text-sm text-center">
//               Already have an account?{" "}
//               <Link to={"/login"} className="text-primary cursor-pointer">
//                 Login
//               </Link>
//             </p>
//           </>
//         }
//       />
//     </AuthLayout>
//   );
// };

// export default Register;
import AuthLayout from "../../src/components/auth/AuthLayout";
import AuthForm from "../../src/components/auth/AuthForm";
import SocialLogin from "../../src/components/auth/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validationSchema } from "./Validation";
import { registerUser, resendOtp } from "../../services/auth";
import axios from "axios";
import { useState } from "react";

const Register = () => {
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
      }finally{
        setLoading(false);
      }
    },
  });

  return (
    <AuthLayout>
      <AuthForm
        loading={loading}
        onSubmit={formik.handleSubmit}
        title="Create an account"
        subtitle="Join us to start your journey"
        buttonText="Sign Up"
        fields={
          <>
            {/* First Name */}
            <input
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input"
              placeholder="First Name"
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
              placeholder="Last Name"
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
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-400 text-[12px] font-semibold">
                {formik.errors.email}
              </div>
            )}

            {/* Password */}
            <input
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input"
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-400 text-[12px] font-semibold">
                {formik.errors.password}
              </div>
            )}

            {/* Confirm Password */}
            <input
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input"
              placeholder="Confirm Password"
            />
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
              Already have an account?{" "}
              <Link to="/login" className="text-primary cursor-pointer">
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
