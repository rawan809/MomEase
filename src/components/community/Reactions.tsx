import React, { useState, useRef } from "react";
import { Heart, ThumbsUp, HandFist, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReactions } from "@/hooks/useReactions";

const REACTION_TYPES = [
  { type: "LIKE", emoji: <ThumbsUp size={18} />, label: "Like"},
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const { currentReaction, count, react, remove } = useReactions(
    postId,
    initialCount,
    myReaction
  );

  const activeReaction = REACTION_TYPES.find((r) => r.type === currentReaction);

  const handleReactionClick = async (type: string) => {
    await react(type);
    setIsMenuOpen(false);
  };

  // --- لوجيك الضغط السريع العادي (Click) ---
  const handleMainButtonClick = () => {
    // إذا فتحت القائمة عن طريق الضغط المطول، لا تفعل شيء عند الرفع
    if (isLongPress.current) return;

    if (currentReaction) {
      remove();
    } else {
      react("LIKE");
    }
  };

  // --- لوجيك الشاشات اللمس (Mobile Long Press) ---
  const handleTouchStart = () => {
    isLongPress.current = false;
    
    // بدء العداد (مثلاً 450 مللي ثانية ليصبح سريعاً ومستجيباً)
    timerRef.current = setTimeout(() => {
      setIsMenuOpen(true);
      isLongPress.current = true; // نؤكد أنه ضغط مطول
      
      // هز الهاتف اهتزازة خفيفة لو الموبايل يدعمها (مثل فيسبوك)
      if (navigator.vibrate) navigator.vibrate(50); 
    }, 450);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // تنظيف العداد فوراً عند رفع الإصبع
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // إذا كان ضغطاً مطولاً، نمنع حدوث الـ Click العادي الافتراضي للمتصفح
    if (isLongPress.current) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="relative w-full"
      // الـ Hover يعمل فقط على الكمبيوتر (الأجهزة التي تدعم ماوس)
      onMouseEnter={() => {
        // فحص تقني للتأكد أن الجهاز ليس شاشة لمس لمنع التداخل
        if (window.matchMedia("(hover: hover)").matches) {
          setIsMenuOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          setIsMenuOpen(false);
        }
      }}
    >
      {/* Floating Icons Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -50, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute left-0 right-0 mx-auto w-fit bg-white shadow-xl border border-gray-100 rounded-full p-2 flex gap-3 z-50"
          >
            {REACTION_TYPES.map((reactItem) => (
              <motion.button
                key={reactItem.type}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleReactionClick(reactItem.type)}
                className="hover:drop-shadow-md transition-all cursor-pointer text-pink-500 p-1"
                title={reactItem.label}
              >
                {reactItem.emoji}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Reaction Button */}
      <button
        onClick={handleMainButtonClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        // منع ظهور قائمة الموبايل الافتراضية عند الضغط المطول (مهم جداً)
        onContextMenu={(e) => {
          if (isLongPress.current) e.preventDefault();
        }}
        className={`flex items-center justify-center gap-2 py-2 rounded-xl transition w-full text-pink-600 select-none ${
          currentReaction
            ? "bg-pink-200 shadow-sm"
            : "bg-pink-50 hover:bg-pink-100"
        }`}
      >
        <div className={currentReaction ? "fill-current" : ""}>
          {activeReaction ? activeReaction.emoji : <Heart size={18} />}
        </div>

        <span className="font-medium text-sm sm:inline-block hidden">
          {currentReaction ? currentReaction : count}
        </span>
      </button>
    </div>
  );
};

export default Reactions;