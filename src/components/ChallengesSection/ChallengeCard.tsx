import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ChallengeCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const ChallengeCard = ({
  title,
  description,
  icon,
  index,
}: ChallengeCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
      }}
      className="flex flex-col items-center text-center px-(--space-md)"
    >
      {/* Icon Placeholder */}
      <motion.div className="w-20 h-20 rounded-full bg-gray-200 mb-(--space-lg) flex items-center justify-center">
        <img src={icon} alt="" />
      </motion.div>

      <h3 className=" font-semibold mb-(--space-sm) text-normal">{title}</h3>

      <p className=" text-muted">{description}</p>
    </motion.div>
  );
};

export default ChallengeCard;
