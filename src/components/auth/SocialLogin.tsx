import { GoogleLogin } from "@react-oauth/google";
// import FacebookLogin from "@greatsumini/react-facebook-login";

import { googleLogin, facebookLogin } from "../../../services/auth";

import GoogleIcon from "../../assets/icons/Google";
import FacebookIcon from "../../assets/icons/Facebook";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SocialLogin = () => {
  const navigate = useNavigate();

  const { loginWithGoogle, loginWithFacebook } = useAuth();

  // GOOGLE LOGIN
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse?.credential;

      const data = await googleLogin(idToken);

      console.log("GOOGLE RESPONSE:", data);

      if (data?.success && data?.data?.accessToken) {
        loginWithGoogle({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken ?? "",
          user: {
            userId: data.data.userId,
            firstName: data.data.firstName,
            lastName: data.data.lastName ?? "",
            email: data.data.email ?? "",
            role: data.data.role,
          },
        });

        if (data.data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  // FACEBOOK LOGIN
  // const handleFacebookSuccess = async (response: any) => {
  //   try {
  //     const accessToken = response.accessToken;

  //     const data = await facebookLogin(accessToken);

  //     console.log("FACEBOOK RESPONSE:", data);

  //     if (data?.success && data?.data?.accessToken) {
  //       loginWithFacebook({
  //         accessToken: data.data.accessToken,
  //         refreshToken: data.data.refreshToken ?? "",
  //         user: {
  //           userId: data.data.userId,
  //           firstName: data.data.firstName,
  //           lastName: data.data.lastName ?? "",
  //           email: data.data.email ?? "",
  //           role: data.data.role,
  //         },
  //       });

  //       if (data.data.role === "ADMIN") {
  //         navigate("/admin");
  //       } else {
  //         navigate("/home");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Facebook login error:", error);
  //   }
  // };

  return (
    <div className="mt-6">
      <div className="flex items-center gap-4 mb-6 w-64 mx-auto">
        <div className="flex-1 h-px bg-muted" />
        <span className="text-small text-muted">or</span>
        <div className="flex-1 h-px bg-muted" />
      </div>

      {/* GOOGLE BUTTON */}
      <div style={{ display: "none" }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Google Login Failed")}
        />
      </div>

      {/* FACEBOOK BUTTON */}
      {/* <div style={{ display: "none" }}>
        <FacebookLogin
          appId="1004153385630988"
          scope="email,public_profile"
          onSuccess={handleFacebookSuccess}
          onFail={(error) => console.error("Facebook login failed:", error)}
          render={({ onClick }) => (
            <div id="facebook-login-btn" onClick={onClick} />
          )}
        />
      </div> */}

      <div className="flex gap-6 justify-center">
        {/* GOOGLE ICON */}
        <div
          onClick={() => {
            const googleButton = document.querySelector(
              '[role="button"]',
            ) as HTMLElement;

            googleButton?.click();
          }}
          className="cursor-pointer hover:scale-110 transition"
        >
          <GoogleIcon />
        </div>

        {/* FACEBOOK ICON */}
        {/* <div
          onClick={() => {
            const facebookButton = document.getElementById(
              "facebook-login-btn",
            ) as HTMLElement;

            facebookButton?.click();
          }}
          className="cursor-pointer hover:scale-110 transition"
        >
          <FacebookIcon />
        </div> */}
      </div>
    </div>
  );
};

export default SocialLogin;
