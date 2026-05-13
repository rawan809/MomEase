import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CommentEditDialogProps {
  open: boolean;
  initialText: string;
  onClose: () => void;
  onSubmit: (text: string) => Promise<void>;
}

function CommentEditDialog({
  open,
  initialText,
  onClose,
  onSubmit,
}: CommentEditDialogProps) {
  const [text, setText] = useState(initialText);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync text when dialog opens
  useEffect(() => {
    if (open) setText(initialText);
  }, [open, initialText]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    try {
      setIsSubmitting(true);
      await onSubmit(text);
      toast.success("Comment updated");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to update comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md rounded-xl p-6 border-none shadow-xl bg-white gap-6 [&>button]:hidden">
        <DialogHeader className="flex flex-row items-center relative border-b-0 space-y-0 p-0 m-0">
          <DialogTitle className="text-center flex-1 text-xl font-bold text-black m-0">
            Edit Comment
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your comment..."
            className="w-full min-h-28 p-4 rounded-xl border border-primary/20 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 resize-none text-[15px]"
            autoFocus
          />

          <button
            onClick={handleSubmit}
            disabled={!text.trim() || isSubmitting}
            className="w-full bg-primary/90 hover:bg-primary text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-base mt-2 cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 rounded-xl transition-colors text-base cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CommentEditDialog;
