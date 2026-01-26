// ForgetByEmail.tsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import { emailSchema } from "./Validation";
import ForgetPasswordLayout from "../../src/components/ForgetPassword/ForgetPasswordLayout";
import { Link } from "react-router-dom";

const ForgetByEmail = () => {
  return (
    <ForgetPasswordLayout>
      <p className="text-muted text-sm mb-4">
        Please enter your Email address to receive a verification code
      </p>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={emailSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form className="space-y-4">
          <Field
            name="email"
            type="input"
            placeholder="Email Address"
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
          >
            Send Code
          </button>
        </Form>
      </Formik>

      <Link
        to={"/forgetByPhone"}
        className="text-primary text-sm mt-4 cursor-pointer underline"
      >
        Try another way
      </Link>
    </ForgetPasswordLayout>
  );
};

export default ForgetByEmail;
