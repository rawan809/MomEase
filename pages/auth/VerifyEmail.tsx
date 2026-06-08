"use client";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Link, useNavigate } from "react-router-dom";
import Verifyimg from "@/assets/images/verify.png";
import { useState, useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import Success from "@/components/ui/Success";
import { verifyEmail, resendOtp } from "../../services/auth";
import { PuffLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

function VerifyEmail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // شادسين بيتعامل مع الـ OTP كـ string مش array
  const [code, setCode] = useState("");

  const email = localStorage.getItem("verifyEmail") || "";

  // mask email
  function maskContetnt(content: string) {
    if (content.includes("@")) {
      const [name, domain] = content.split("@");
      const Namelen = name.length;

      if (Namelen === 1) return "*" + "@" + domain;
      if (Namelen === 2) return name[0] + "*" + "@" + domain;
      if (Namelen === 3)
        return name.slice(0, 1) + "*" + name.slice(-1) + "@" + domain;

      const firstPart = name.slice(0, 3);
      const lastPart = name.slice(-2);

      return firstPart + "*******" + lastPart + "@" + domain;
    } else {
      const last2 = content.slice(-2);
      return "*******" + last2;
    }
  }

  // resend timer

  useEffect(() => {
    if (resendTimer <= 0) {
      setIsResending(false);
      return;
    }

    const timer = setTimeout(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  // resend OTP
  const handleResend = async () => {
    if (resendTimer > 0 || isResending) return;
    try {
      setIsResending(true);
      await resendOtp(email);
      setResendTimer(60);
    } catch (error) {
      console.log("Resend error", error);
      setIsResending(false);
    }
  };

  // Auto verify
  useEffect(() => {
    if (code.length === 4) {
      handleVerify();
    }
  }, [code]);

  // verify email
  const handleVerify = async () => {
    if (loading) return;
    setLoading(true);

    if (code.length !== 4) {
      setIsWrong(true);
      setLoading(false);
      return;
    }

    try {
      await verifyEmail(email, code);
      setIsVerified(true);
      localStorage.removeItem("verifyEmail");

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      setIsWrong(true);
      setCode("");
    } finally {
      setLoading(false);
    }
  };

  if (isVerified)
    return (
      <div className="p-10 flex flex-col justify-center">
        <h1 className="mb-10">
          <Link to={"/"} className="text-3xl font-brand text-primary">
            MamEase
          </Link>
        </h1>

        <div className="flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl text-center w-full max-w-md min-h-130 p-6 sm:p-8 flex">
            <Success
              title="Email Verified!"
              description="Your Email has been successfully verified. Now, you can start your journey!"
              btnText="Continue"
            />
          </div>
        </div>
      </div>
    );

  const slotClassName = `border border-gray-300 rounded-full w-17 h-17 text-center text-small
  focus-within:border-primary focus-within:ring-0
  ${isWrong ? "border-red-500" : ""}`;

  return (
    <div className="p-10 flex flex-col justify-center">
      <h1 className="mb-10">
        <Link to={"/"} className="text-3xl font-brand text-primary">
          MamEase
        </Link>
      </h1>

      <div className="flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl text-center w-full max-w-md min-h-130 p-6 sm:p-8">
          <h2 className="text-lg font-semibold mb-4">
            {t("Verify Your Email")}
          </h2>

          <div className="w-25 h-25 bg-blue-100 rounded-full mx-auto mb-4">
            <img src={Verifyimg} alt="" className="w-full" />
          </div>

          <p className="text-muted text-[12px] mb-6">
            {t("Please enter the code we sent to")} {maskContetnt(email)}
          </p>

          <div className="py-5 flex justify-center" dir="ltr">
            <InputOTP
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              value={code}
              onChange={(val) => {
                setIsWrong(false);
                setCode(val);
              }}
            >
              <InputOTPGroup className="flex justify-between w-full gap-3 shadow-none">
                <InputOTPSlot index={0} className={slotClassName} />
                <InputOTPSlot index={1} className={slotClassName} />
                <InputOTPSlot index={2} className={slotClassName} />
                <InputOTPSlot index={3} className={slotClassName} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* error */}
          {isWrong ? (
            <div className="flex items-center justify-center gap-1 px-2 text-[12px] h-4.5 rounded-full bg-red-100 text-red-500">
              <RiErrorWarningLine />
              {t("Invalid Code. Please try again")}
            </div>
          ) : (
            <div className="h-4.5"></div>
          )}

          {/* resend */}
          <p
            className={`p-3 text-[12px] underline font-bold transition ${
              resendTimer > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary cursor-pointer"
            }`}
            onClick={handleResend}
          >
            {isResending && resendTimer === 0
              ? t("Sending...")
              : t("Re-send Code")}
          </p>

          {/* verify button */}
          <button
            type="button"
            className={`w-full py-2 mb-3 rounded-full flex justify-center items-center h-10 transition bg-accent ${
              loading || code.length !== 4
                ? " cursor-not-allowed"
                : " cursor-pointer "
            }`}
            onClick={handleVerify}
            disabled={loading || code.length !== 4}
          >
            {loading ? (
              <PuffLoader size={22} color="#ff3381" />
            ) : (
              t("Verify Email")
            )}
          </button>

          {/* timer */}
          {isResending ? (
            <p className="text-muted text-[12px] h-4.5">
              <span className="font-bold text-black">
                00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
              </span>{" "}
              {t("Resend Verification Code")}
            </p>
          ) : (
            <div className="h-4.5"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
