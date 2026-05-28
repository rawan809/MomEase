import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

const SupportItem = ({ title, description, image, reverse }: Props) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-12`}
    >
      <div className="flex-1 flex justify-center">
        <img src={image} alt={title} className="max-w-sm w-full" />
      </div>

      <div className="w-1 h-30 bg-primary hidden md:block" />

      <div className=" items-start gap-4">
        <h3 className="text-normal font-semibold leading-tight">{t(title)}</h3>

        <p className="text-muted max-w-md ">{t(description)}</p>
      </div>
    </motion.div>
  );
};

export default SupportItem;
