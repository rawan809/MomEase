import { PuffLoader } from "react-spinners";

interface AuthFormProps {
  loading: boolean;
  title: string;
  subtitle: string;
  fields: React.ReactNode;
  buttonText: string;
  footer: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthForm = ({
  loading,
  onSubmit,
  title,
  subtitle,
  fields,
  buttonText,
  footer,
}: AuthFormProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="text-muted">{subtitle}</p>

      <form className="space-y-4" onSubmit={onSubmit} dir="ltr">
        {fields}

        <button
          type="submit"
          className={`w-full bg-accent py-2 rounded-full font-semibold ${loading ? "" : "cursor-pointer"} flex items-center justify-center gap-2`}
          disabled={loading}
        >
          {loading ? <PuffLoader size={22} color="#ff3381" /> : buttonText}
        </button>
      </form>

      {footer}
    </div>
  );
};

export default AuthForm;
