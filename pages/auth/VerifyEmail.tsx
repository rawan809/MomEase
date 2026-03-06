import { Link, useNavigate } from "react-router-dom";
import Verifyimg from "../../src/assets/images/verify.png";
import { useState, useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import Success from "../../src/components/UI/Success";
import { verifyEmail, resendOtp } from "../../services/auth";

function VerifyEmail() {
  const navigate = useNavigate();

  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);

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

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // resend OTP
  const handleResend = async () => {
    try {
      await resendOtp(email);

      setResendTimer(60);
      setIsResending(true);
    } catch (error) {
      console.log("Resend error", error);
    }
  };

  // input change
  const handleChange = (index: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;

    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    if (val && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  // verify email
  const handleVerify = async () => {
    const otp = code.join("");

    if (otp.length !== 4) {
      setIsWrong(true);
      return;
    }

    try {
      await verifyEmail(email, otp);

      setIsVerified(true);

      localStorage.removeItem("verifyEmail");

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      setIsWrong(true);
    }
  };

  if (isVerified)
    return (
      <div className="p-10 flex-col justify-center">
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

  return (
    <div className="p-10 flex flex-col justify-center">
      <h1 className="mb-10">
        <Link to={"/"} className="text-3xl font-brand text-primary">
          MamEase
        </Link>
      </h1>

      <div className="flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl text-center w-full max-w-md min-h-130 p-6 sm:p-8">
          <h2 className="text-lg font-semibold mb-4">Verify Your Email</h2>

          <div className="w-25 h-25 bg-blue-100 rounded-full mx-auto mb-4">
            <img src={Verifyimg} alt="" className="w-full" />
          </div>

          <p className="text-muted text-[12px]">
            Please enter the code we sent to {maskContetnt(email)}
          </p>

          {/* OTP inputs */}
          <div className="py-5 flex justify-between">
            {code.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(i, e.target.value)}
                className={`border border-gray-300 rounded-full w-17 h-17 text-center text-small
                focus:border-primary focus:outline-none
                ${digit ? "border-primary" : ""}
                ${isWrong ? "border-red-500" : ""}`}
              />
            ))}
          </div>

          {/* error */}
          {isWrong ? (
            <div className="flex items-center justify-center gap-1 px-2 text-[12px] h-4.5 rounded-full bg-red-100 text-red-500">
              <RiErrorWarningLine />
              Invalid Code. Please try again
            </div>
          ) : (
            <div className="h-4.5"></div>
          )}

          {/* resend */}
          <p
            className="p-3 cursor-pointer text-[12px] text-primary opacity-50 underline font-bold"
            onClick={handleResend}
          >
            Re-send Code
          </p>

          {/* verify button */}
          <button
            type="button"
            className="w-full bg-accent text-black py-2 mb-3 rounded-full cursor-pointer"
            onClick={handleVerify}
          >
            Verify Email
          </button>

          {/* timer */}
          {isResending ? (
            <p className="text-muted text-[12px] h-4.5">
              <span className="font-bold text-black">00:{resendTimer}</span>{" "}
              Resend Verification Code
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
