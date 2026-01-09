interface AuthFormProps {
  title: string;
  subtitle: string;
  fields: React.ReactNode;
  buttonText: string;
  footer: React.ReactNode;
}

const AuthForm = ({
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

      <form className="space-y-4">
        {fields}

        <button className="w-full bg-accent py-2 rounded-full font-semibold">
          {buttonText}
        </button>
      </form>

      {footer}
    </div>
  );
};

export default AuthForm;
