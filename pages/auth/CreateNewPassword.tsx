import NewPass from "../../src/assets/images/newPass.png";
import { useFormik } from "formik";
import { validationSchema } from "./Validation";
import { Link } from "react-router-dom";
import { useState } from "react";
import Success from "../../src/components/UI/Success";

const CreateNewPassword = () => {
  const [succsess, setSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema.pick(["password", "confirmPassword"]),
    onSubmit: (values) => {
      console.log(values);
      // API call here
    },
  });

  if (succsess) {
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
              title="Password reset successful!"
              description="Your password has been changed successfully."
              btnText="Go to login"
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
          <div className="text-center">
            {/* <Link to="/login" className="text-xl font-bold">
              ←
            </Link> */}
            <h2 className="text-xl font-semibold text-center mb-2">
              Create New Password
            </h2>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-25 h-25 rounded-full flex items-center justify-center">
              <img src={NewPass} alt="reset password" className="w-full" />
            </div>
          </div>

          <p className="text-center text-muted text-sm mb-6">
            Your new password must be different from previously used password
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                name="password"
                placeholder="New Password"
                className="input"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-400 text-xs mt-1 font-semibold">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                className="input"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
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
              onClick={() => {
                setSuccess(true);
              }}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
