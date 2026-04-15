import React from "react";
import FeatureCard from "./FeatureCard";
import Heading from "../ui/Heading";
import { FeatureData } from "./FeatureData";
import { motion } from "framer-motion";

function FeatureSection() {
  return (
    <section className="py-(--space-xl)">
      <div className="px-(--space-lg) max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading
            title="Everything you need in one place"
            discription="Comprehensive tools designed specifically for your postpartum journey, all working together seamlessly."
          />
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-(--space-lg)">
          {FeatureData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
                delay: index * 0.12,
              }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
