import NewPass from "../../src/assets/images/newPass.png";
import { useFormik } from "formik";
import { validationSchema } from "./Validation";
import { Link } from "react-router-dom";

const CreateNewPassword = () => {
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

  return (
    <>
      <h1 className="absolute z-0 top-10 left-40">
        {" "}
        <Link to={"/"} className="text-3xl font-brand text-primary">
          MamEase
        </Link>
      </h1>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 mx-auto">
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
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewPassword;
