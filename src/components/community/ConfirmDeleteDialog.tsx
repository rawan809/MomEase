import { useState } from "react";
import { toast } from "sonner";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  title?: string;
  description?: string;
  successMessage?: string;
}

function ConfirmDeleteDialog({
  open,
  onClose,
  onDelete,
  title = "Delete?",
  description = "This action cannot be undone.",
  successMessage = "Deleted successfully",
}: ConfirmDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onDelete();
      toast.success(successMessage);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-sm rounded-xl p-6 border-none shadow-xl bg-white gap-5"
      >
        <DialogHeader className="flex flex-col items-center gap-3 p-0 m-0">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <FaRegTrashCan size={24} className="text-red-500" />
          </div>

          <DialogTitle className="text-center text-lg font-bold text-gray-900">
            {title}
          </DialogTitle>

          <p className="text-center text-sm text-gray-500 leading-relaxed">
            {description}
          </p>
        </DialogHeader>

        <DialogFooter className="flex flex-row gap-3 p-0 m-0 border-none bg-transparent -mx-0 -mb-0 rounded-none">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
