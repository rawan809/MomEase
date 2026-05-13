import { useState } from "react";
import { addReact, updateReact, deleteReact } from "../../services/community";

export function useReactions(postId: number, initialCount: number, myReaction: string | null) {
  const [currentReaction, setCurrentReaction] = useState<string | null>(myReaction);
  const [count, setCount] = useState(initialCount);

  //  add أو update
  const react = async (type: string) => {
    try {
      if (!currentReaction) {
        // ADD
        setCount((prev) => prev + 1);
        await addReact(postId, type);
      } else {
        // UPDATE
        await updateReact(postId, type);
      }

      setCurrentReaction(type);
    } catch (err) {
      console.error(err);
    }
  };

  //  remove
  const remove = async () => {
    try {
      await deleteReact(postId);
      setCurrentReaction(null);
      setCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  return {
    currentReaction,
    count,
    react,
    remove,
  };
}