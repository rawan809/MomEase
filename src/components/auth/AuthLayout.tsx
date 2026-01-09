import heroImg from "../../assets/images/auth-hero.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[90%] max-w-6xl  rounded-xl grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <div className="space-y-8">
          {/* 🔴 Brand Title */}
          <h1 className="text-3xl font-brand text-primary">MamEase</h1>

          {children}
        </div>
        <div className="hidden md:flex justify-center items-center">
          <img src={heroImg} alt="Mother & baby" className="max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
