type SocialIconProps = {
  icon: React.ReactNode;
  label: string;
};

const SocialIcon = ({ icon, label }: SocialIconProps) => {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition"
    >
      {icon}
    </a>
  );
};
export default SocialIcon;
