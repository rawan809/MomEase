import AuthLayout from "../../src/components/auth/AuthLayout";
import AuthForm from "../../src/components/auth/AuthForm";
import SocialLogin from "../../src/components/auth/SocialLogin";
const Login = () => {
  return (
    <AuthLayout>
      <AuthForm
        title="Welcome Back"
        subtitle="Login to continue your journey!"
        buttonText="Login"
        fields={
          <>
            <input className="input" placeholder="Email / Phone" />
            <input className="input" type="password" placeholder="Password" />
            <p className="text-right text-primary text-sm cursor-pointer">
              Forgot Password?
            </p>
          </>
        }
        footer={
          <>
            <SocialLogin />
            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <span className="text-primary cursor-pointer">Sign Up</span>
            </p>
          </>
        }
      />
    </AuthLayout>
  );
};

export default Login;
