import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ChallengeList from "./ChallengeList";

const ChallengesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-background py-(--space-xl) overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-(--space-lg)">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-(--space-xl)"
        >
          <h2 className=" text-h2 mb-(--space-md) font-semibold">
            We understand the challenges you face
          </h2>
          <motion.p
            className="text-(--text-normal) max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            The postpartum period is beautiful, but it comes with unique
            challenges. You're not alone in feeling overwhelmed.
          </motion.p>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="origin-left"
        ></motion.div>

        {/* Challenges Grid */}
        <ChallengeList />
      </div>
    </section>
  );
};

export default ChallengesSection;
