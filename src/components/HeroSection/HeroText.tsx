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
        You’re not alone. We’re here to support you after{" "}
        <span className="text-primary">childbirth.</span>
      </h1>

      <p className=" text-muted max-w-xl">
        From health tracking to emotional check-ins everything you need to feel
        safe, supported, and in control.
      </p>
      <div className="flex gap-(--space-md)">
        <button
          className="
            bg-accent
            px-(--space-lg)
            py-(--space-sm)
            rounded-lg
            shadow-(--shadow-md)
            transition-(--transition-fast)
            hover:scale-105
          "
        >
          Start now
        </button>

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
          Download the app
        </button>
      </div>
    </motion.div>
  );
};

export default HeroText;
