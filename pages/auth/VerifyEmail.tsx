import { Link } from "react-router-dom";
import Verifyimg from "../../src/assets/images/verify.png";
import { useState, useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

function VerifyEmail() {
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  let content = "example@gmail.com";

  // mask
  function maskContetnt(content: string) {
    if (content.includes("@")) {
      const [name, domain] = content.split("@");
      const Namelen = name.length;

      if (Namelen === 1) {
        return "*" + "@" + domain;
      }

      if (Namelen === 2) {
        return name[0] + "*" + "@" + domain;
      }

      if (Namelen === 3) {
        return name.slice(0, 1) + "*" + name.slice(-1) + "@" + domain;
      }
      const firstPart = name.slice(0, 3);
      const lastPart = name.slice(-2);
      return firstPart + "*******" + lastPart + "@" + domain;
    } else {
      const last3 = content.slice(-2);
      return "*******" + last3;
    }
  }
  // counter
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
  const handleResend = () => {
    setResendTimer(60);
    setIsResending(true);
  };
  const handleChange = (index: number, val: string) => {
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);
  };
  return (
    <div className="p-10 min-h-screen flex flex-col justify-center">
      <h1 className="mb-10">
        <Link to={"/"} className="text-3xl font-brand text-primary">
          MamEase
        </Link>
      </h1>
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 max-w-md shadow-2xl text-center">
          <h2 className="text-lg font-semibold mb-4">Verify Your Email</h2>

          <div className="w-25 h-25 bg-blue-100 rounded-full mx-auto mb-4">
            <img src={Verifyimg} alt="" className="w-full" />
          </div>
          {/*  */}
          <p className="text-muted text-[12px]">
            Please enter the code we sent to {maskContetnt(content)}
          </p>
          <div className="py-5 flex justify-between">
            {code.map((digit, i) => (
              <input
                key={i}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Tab"
                  ) {
                    e.preventDefault();
                  }
                }}
                className={`border border-gray-300 rounded-full w-15 h-15 text-center text-small 
              focus:border-primary focus:outline-none 
               ${code[i] ? "border-primary" : ""}
               ${isWrong ? "border-red-500" : ""}`}
              />
            ))}
          </div>
          {/* worng */}
          {isWrong ? (
            <div className="flex items-center justify-center gap-1 px-2 text-[12px] h-4.5 rounded-full bg-red-100 text-red-500 ">
              <RiErrorWarningLine />
              Invalid Code. Please try again
            </div>
          ) : (
            <div className="h-4.5"></div>
          )}
          <p
            className="p-3 cursor-pointer text-[12px] text-primary opacity-50 underline font-bold"
            onClick={handleResend}
          >
            Re-send Code
          </p>
          <button
            type="submit"
            className="w-full bg-accent text-black py-2 mb-3 rounded-full cursor-pointer"
          >
            Verify Email
          </button>
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
