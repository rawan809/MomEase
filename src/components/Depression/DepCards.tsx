import { motion } from "framer-motion";
import ShieldCheck from "../../assets/icons/shieldCheck";
import Lock from "../../assets/icons/lock";
import Timer from "../../assets/icons/timer";

const cards = [
  {
    icon: <ShieldCheck />,
    title: "Completely Private",
    desc: "Your responses are confidential and never shared",
  },
  {
    icon: <Lock />,
    title: "No Judgment",
    desc: "This is guidance, not diagnosis. You're safe here",
  },
  {
    icon: <Timer />,
    title: "Quick",
    desc: "It takes about 2 minutes and includes 5 gentle questions",
  },
];

const DepCards = () => {
  return (
    <section
      className="py-(--space-xl) px-(--space-lg)"
      style={{ background: "var(--color-background)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {cards.slice(0, 2).map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-(--space-lg) flex items-center gap-(--space-md)"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <div
                className="flex items-center justify-center rounded-full shrink-0"
                style={{ width: 50, height: 50, background: "#ffe5ef" }}
              >
                {card.icon}
              </div>
              <div>
                <h3 className="font-bold text-(--text-normal) mb-1">
                  {card.title}
                </h3>
                <p className="text-muted">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-(--space-lg) flex items-center gap-(--space-md) w-full md:w-1/2"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: 50, height: 50, background: "#ffe5ef" }}
            >
              {cards[2].icon}
            </div>
            <div>
              <h3 className="font-bold text-(--text-normal) mb-1">
                {cards[2].title}
              </h3>
              <p className="text-muted">{cards[2].desc}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DepCards;
