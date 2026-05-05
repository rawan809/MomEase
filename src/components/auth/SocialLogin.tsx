import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../../services/auth";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { facebookLogin } from "../../../services/auth";
import GoogleIcon from "../../assets/icons/Google";
import FacebookIcon from "../../assets/icons/Facebook";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../pages/auth/AuthContext";

const SocialLogin = () => {
  const navigate = useNavigate();
  const { setUserData } = useAuth();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse?.credential;
      const data = await googleLogin(idToken);

      console.log("FULL DATA:", data);

      if (data?.success && data?.data?.accessToken) {
        setUserData({
          token: data.data.accessToken,
          firstName: data.data.firstName,
          role: data.data.role,
          userId: data.data.userId.toString(),
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
  const handleFacebookSuccess = async (response: any) => {
    try {
      const accessToken = response.accessToken;
      const data = await facebookLogin(accessToken);
      console.log("FACEBOOK RESPONSE:", data);

      if (data?.success && data?.data?.accessToken) {
        setUserData({
          token: data.data.accessToken,
          firstName: data.data.firstName,
          role: data.data.role,
          userId: data.data.userId.toString(),
        });
        if (data.data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };
  return (
    <div className="mt-6">
      <div className="flex items-center gap-4 mb-6 w-64 mx-auto">
        <div className="flex-1 h-px bg-muted" />
        <span className="text-small text-muted">or</span>
        <div className="flex-1 h-px bg-muted" />
      </div>

      <div style={{ display: "none" }}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Google Login Failed")}
        />
      </div>

      <div className="flex gap-6 justify-center">
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

        {/* <div className="cursor-pointer hover:scale-110 transition">
          <FacebookIcon />
        </div> */}
        <div style={{ display: "none" }}>
          <FacebookLogin
            appId="847227575059401"
            onSuccess={handleFacebookSuccess}
            onFail={(error) => console.error("Facebook login failed:", error)}
            render={({ onClick }) => (
              <div id="facebook-login-btn" onClick={onClick} />
            )}
          />
        </div>

        <div
          onClick={() => {
            const facebookButton = document.getElementById(
              "facebook-login-btn",
            ) as HTMLElement;
            facebookButton?.click();
          }}
          className="cursor-pointer hover:scale-110 transition"
        >
          <FacebookIcon />
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
