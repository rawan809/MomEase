// ForgetByEmail.tsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import { emailSchema } from "./Validation";
import ForgetPasswordLayout from "../../src/components/ForgetPassword/ForgetPasswordLayout";
// import { Link } from "react-router-dom";
import { useState } from "react";
import { forgetPassword } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const ForgetByEmail = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (
    values: { email: string },
    { setFieldError }: any,
  ) => {
    setLoading(true);
    try {
      const res = await forgetPassword(values.email);
      navigate(`/createNewPassword/:${values.email}`);
      console.log(res);
    } catch (error: any) {
      setFieldError("email", `${error?.response?.data?.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ForgetPasswordLayout>
      <p className="text-muted text-sm mb-4">
        {t("Please enter your Email address to receive a verification code")}
      </p>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={emailSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <Field
            dir="ltr"
            name="email"
            type="input"
            placeholder={t("Email Address")}
            className="input"
          />

          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-xs"
          />

          <button
            type="submit"
            className="w-full bg-accent text-black py-2 rounded-full cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <PuffLoader size={22} color="#ff3381" />
            ) : (
              t("Send Code")
            )}
          </button>
        </Form>
      </Formik>

      {/* <Link
        to={"/forgetByPhone"}
        className="text-primary text-sm mt-4 cursor-pointer underline"
      >
        Try another way
      </Link> */}
    </ForgetPasswordLayout>
  );
};

export default ForgetByEmail;
