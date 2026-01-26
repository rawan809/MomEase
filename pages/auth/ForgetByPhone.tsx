// ForgetByPhone.tsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import { phoneSchema } from "./Validation";
import ForgetPasswordLayout from "../../src/components/ForgetPassword/ForgetPasswordLayout";
import { Link } from "react-router-dom";

const ForgetByPhone = () => {

  return (
    <ForgetPasswordLayout>
      <p className="text-muted text-sm mb-4">
        Please enter your phone number to receive a verification code
      </p>

      <Formik
        initialValues={{ phone: "" }}
        validationSchema={phoneSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form className="space-y-4">
          <Field name="phone" placeholder="Phone number" className="input" />
          <ErrorMessage
            name="phone"
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
        to={"/forgetByEmail"}
        className="text-primary text-sm mt-4 cursor-pointer underline"
      >
        Try another way
      </Link>
    </ForgetPasswordLayout>
  );
};

export default ForgetByPhone;
