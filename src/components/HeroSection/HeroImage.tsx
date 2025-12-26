import { motion } from "framer-motion";
import heroImg from "../../assets/images/hero.png";
const HeroImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex justify-center"
    >
      <img
        src={heroImg}
        alt="Mother holding baby"
        className="max-w-md w-full"
      />
    </motion.div>
  );
};

export default HeroImage;
