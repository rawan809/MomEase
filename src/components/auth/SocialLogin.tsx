import GoogleIcon from "../../assets/icons/Facebook";
import FacebookIcon from "../../assets/icons/Google";

const SocialLogin = () => {
  return (
    <div className="mt-6">
      {/* OR Divider */}
      <div className="flex items-center gap-4 mb-6 w-64 mx-auto">
        <div className="flex-1 h-px bg-muted" />
        <span className="text-small text-muted">or</span>
        <div className="flex-1 h-px bg-muted" />
      </div>

      {/* Icons */}
      <div className="flex gap-6 justify-center">
        <div className="cursor-pointer hover:scale-110 transition">
          <GoogleIcon />
        </div>

        <div className="cursor-pointer hover:scale-110 transition">
          <FacebookIcon />
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
