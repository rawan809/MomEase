import SupportItem from "./SupportItem";
import { supportData } from "./supportData";
import { motion } from "framer-motion";

const SupportSection = () => {
  return (
    <section className="py-(--space-xl) bg-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-h2 font-semibold mb-(--space-xl)"
      >
        HOW WE SUPPORT YOU
      </motion.h2>

      <div className="max-w-6xl mx-auto px-6 space-y-(--space-xl)">
        {supportData.map((item, index) => (
          <SupportItem key={index} {...item} reverse={index % 2 !== 0} />
        ))}
      </div>
    </section>
  );
};

export default SupportSection;
