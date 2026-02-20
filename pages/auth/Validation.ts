import * as Yup from "yup";

const email = Yup.string()
  .required("Required")
  .test(
    "email-or-phone",
    "Enter valid email or phone",
    (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || // email
      /^01[0-2,5]{1}[0-9]{8}$/.test(value), // egypt phone
  );

const password = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character",
  )
  .required("Required");

export const validationSchema = Yup.object({
  email,
  password,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "passwords must match")
    .required("Required"),
});
export const emailSchema = Yup.object({
  email: Yup.string()
    .required("Required")
    .email("Enter a valid email")
    .test("Enter valid email", (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    ),
});

export const phoneSchema = Yup.object({
  phone: Yup.string()
    .required("Required")
    .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Enter valid Egyptian phone number"),
});

export const loginSchema = Yup.object({
  email,
  password: Yup.string().required("Required"),
});
