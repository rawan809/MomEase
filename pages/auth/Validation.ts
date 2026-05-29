import * as Yup from "yup";
import i18next from "i18next";

const email = Yup.string()
  .required(() => i18next.t("Required"))
  .test(
    "email-or-phone",
    () => i18next.t("Enter valid email or phone"),
    (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "") || // email
      /^01[0-2,5]{1}[0-9]{8}$/.test(value || ""), // egypt phone
  );

const password = Yup.string()
  .min(8, () => i18next.t("Password must be at least 8 characters"))
  .matches(/[a-z]/, () => i18next.t("Password must contain at least one lowercase letter"))
  .matches(/[0-9]/, () => i18next.t("Password must contain at least one number"))
  .matches(/[A-Z]/, () => i18next.t("Password must contain at least one uppercase letter"))
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    () => i18next.t("Password must contain at least one special character"),
  )
  .required(() => i18next.t("Required"));

export const validationSchema = Yup.object({
  email,
  password,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], () => i18next.t("passwords must match"))
    .required(() => i18next.t("Required")),
});

export const resetPasswordSchema = Yup.object({
  otpCode: Yup.string()
    .required(() => i18next.t("Required"))
    .matches(/^[0-9]{4}$/, () => i18next.t("Code must be 4 digits")),

  password,

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], () => i18next.t("passwords must match"))
    .required(() => i18next.t("Required")),
});

export const emailSchema = Yup.object({
  email: Yup.string()
    .required(() => i18next.t("Required"))
    .email(() => i18next.t("Enter a valid email"))
    .test("Enter valid email", (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || ""),
    ),
});

export const phoneSchema = Yup.object({
  phone: Yup.string()
    .required(() => i18next.t("Required"))
    .matches(/^01[0-2,5]{1}[0-9]{8}$/, () => i18next.t("Enter valid Egyptian phone number")),
});

export const loginSchema = Yup.object({
  email,
  password: Yup.string().required(() => i18next.t("Required")),
});