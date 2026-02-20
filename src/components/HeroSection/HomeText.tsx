import { motion } from "framer-motion";
const HeroText = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 space-y-(--space-lg)"
    >
      <h1 className="font-(--font-brand) text-h1 leading-tight">
        Welcome again, <span className="text-primary">Rana!.</span>
      </h1>

      <p className=" text-muted max-w-xl">How can we help you today?</p>
      <div className="flex gap-(--space-md)">
        <button
          className="
            border-2 border-primary
            text-primary
            px-(--space-lg)
            py-(--space-sm)
            rounded-lg
            transition-(--transition-fast)
            hover:bg-primary
            hover:text-white
          "
        >
          Join Our Community{" "}
        </button>
      </div>
    </motion.div>
  );
};

export default HeroText;
