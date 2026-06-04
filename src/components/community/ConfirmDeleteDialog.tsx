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
import { useTranslation } from "react-i18next";

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
  title,
  description,
  successMessage,
}: ConfirmDeleteDialogProps) {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = useState(false);

  // Fallback defaults using t() inside the component logic
  const displayTitle = title || t("Delete?");
  const displayDescription = description || t("This action cannot be undone.");
  const displaySuccessMessage = successMessage || t("Deleted successfully");

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onDelete();
      toast.success(displaySuccessMessage);
      onClose();
    } catch (err: any) {
      toast.error(err.message || t("Failed to delete"));
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
            {displayTitle}
          </DialogTitle>

          <p className="text-center text-sm text-gray-500 leading-relaxed">
            {displayDescription}
          </p>
        </DialogHeader>

        <DialogFooter className="flex flex-row gap-3 p-0 m-0 border-none bg-transparent mx-0 mb-0 rounded-none">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {t("Cancel")}
          </button>

          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isDeleting ? t("Deleting...") : t("Delete")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
