import React, { useState } from "react";
import { Heart, ThumbsUp, HandFist, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReactions } from "@/hooks/useReactions";

// الأشكال المتاحة بناءً على الـ API
const REACTION_TYPES = [
  { type: "LIKE", emoji: <ThumbsUp size={18} />, label: "Like" },
  { type: "LOVE", emoji: <Heart size={18} />, label: "Love" },
  { type: "SUPPORT", emoji: <HandFist size={18} />, label: "Support" },
  { type: "HELPFUL", emoji: <Lightbulb size={18} />, label: "Helpful" },
];

interface ReactionsProps {
  postId: number;
  initialCount: number;
  myReaction: string | null;
}

const Reactions: React.FC<ReactionsProps> = ({
  postId,
  initialCount,
  myReaction,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const { currentReaction, count, react, remove } = useReactions(
    postId,
    initialCount,
    myReaction,
  );

  const activeReaction = REACTION_TYPES.find((r) => r.type === currentReaction);

  const handleReactionClick = async (type: string) => {
    await react(type);
    setIsHovered(false);
  };

  const removeReaction = async () => {
    await remove();
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Icons Menu */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -50, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute left-0 right-0 mx-auto w-fit bg-white shadow-xl border border-gray-100 rounded-full p-2 flex gap-3 z-50"
          >
            {REACTION_TYPES.map((react) => (
              <motion.button
                key={react.type}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleReactionClick(react.type)}
                className="hover:drop-shadow-md transition-all cursor-pointer text-pink-500 p-1"
                title={react.label}
              >
                {react.emoji}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Reaction Button */}
      <button
        onClick={() =>
          currentReaction ? removeReaction() : handleReactionClick("LIKE")
        }
        className={`flex items-center justify-center gap-2 py-2 rounded-xl transition w-full text-pink-600 ${
          currentReaction
            ? "bg-pink-200  shadow-sm"
            : "bg-pink-50  hover:bg-pink-100"
        }`}
      >
        <div className={currentReaction ? "fill-current" : ""}>
          {activeReaction ? activeReaction.emoji : <Heart size={18} />}
        </div>

        <span className="font-medium text-sm">
          {currentReaction ? currentReaction : count}
        </span>
      </button>
    </div>
  );
};

export default Reactions;
