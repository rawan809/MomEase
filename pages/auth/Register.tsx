import AuthLayout from "../../src/components/auth/AuthLayout";
import AuthForm from "../../src/components/auth/AuthForm";
import SocialLogin from "../../src/components/auth/SocialLogin";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <AuthLayout>
      <AuthForm
        title="Create an account"
        subtitle="Join us to start your journey"
        buttonText="Sign Up"
        fields={
          <>
            <input className="input" placeholder="Email" />
            <input className="input" type="password" placeholder="Password" />
            <input
              className="input"
              type="password"
              placeholder="Confirm Password"
            />
          </>
        }
        footer={
          <>
            <SocialLogin />
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to={'/login'} className="text-primary cursor-pointer">Login</Link>
            </p>
          </>
        }
      />
    </AuthLayout>
  );
};

export default Register;
