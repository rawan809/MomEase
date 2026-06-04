import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MdError } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface ReportPostProps {
  open: boolean;
  onClose: () => void;
  report: (postId: number, reason: string) => Promise<void>;
  postId: number;
}

function ReportPost({ open, onClose, report, postId }: ReportPostProps) {
  const { t } = useTranslation();
  const [reason, setReason] = useState("");
  const [isReporting, setIsReporting] = useState(false);

  const handleSubmet = async () => {
    if (!reason.trim()) return;
    try {
      setIsReporting(true);
      await report(postId, reason);
      toast.success(t("Post reported successfully"));
      onClose();
    } catch (err: any) {
      toast.error(err.message || t("Failed to report post"));
    } finally {
      setIsReporting(false);
    }
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <div className="flex flex-col items-center gap-4">
          <div>
            <MdError size={100} />
          </div>
          <div>
            <p className="font-semibold text-xl">
              {t("Why are you reporting this ?")}
            </p>
          </div>
          <div>
            <textarea
              className="border-2 rounded-xl px-3 py-2 w-70 h-20 sm:max-w-106.25"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              className="border-2 rounded-xl px-3 py-2  hover:border-primary transition-all cursor-pointer"
              onClick={onClose}
            >
              {t("Cancel")}
            </button>
            <button
              className="bg-primary/80 rounded-xl px-3 py-2 text-white hover:bg-primary transition-all cursor-pointer"
              onClick={handleSubmet}
              disabled={isReporting || !reason.trim()}
            >
              {isReporting ? t("Sending...") : t("Send")}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReportPost;