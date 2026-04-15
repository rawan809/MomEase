import React from "react";
import Heading from "../ui/Heading";
import { LockIcon, CheckIcon, HeartIcon } from "../../assets/icons/icons";
import { motion } from "framer-motion";

function NextStepSection() {
  return (
    <section className="py-(--space-xl)">
      <div className="px-(--space-lg) max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border border-primary rounded-lg p-(--space-lg) bg-[linear-gradient(177.77deg,#FFFFFF_43.99%,rgba(255,200,221,0.8)_144.45%)]"
        >
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heading
              title="Ready to feel supported in your motherhood journey?"
              discription="Join thousands of mothers who are navigating postpartum with confidence, clarity, and care."
            />
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex gap-(--space-md) items-center justify-center pb-(--space-lg) md:text-normal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button className="bg-white border border-primary text-primary px-(--space-lg) py-(--space-sm) rounded-lg transition-(--transition-fast) hover:bg-primary hover:text-white cursor-pointer">
              Download the app
            </button>

            <button className="border text-white bg-primary px-(--space-lg) py-(--space-sm) rounded-lg transition-(--transition-fast) hover:bg-white hover:text-primary cursor-pointer">
              Learn More
            </button>
          </motion.div>

          {/* Features */}
          <motion.div
            className="text-primary flex md:gap-(--space-lg) md:justify-center items-center font-medium flex-wrap gap-(--space-md)"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {[
              { icon: <LockIcon />, text: "4.5/5 Rating" },
              { icon: <HeartIcon />, text: "Privacy Protected" },
              { icon: <CheckIcon />, text: "Evidence-based" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-(--space-sm)"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
                <p>{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default NextStepSection;
