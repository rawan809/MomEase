import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type Props = {
  onUpload: (file: File) => Promise<void>;
  onDelete: () => Promise<void>;
};

function ConfirmProfilePhoto({ onUpload, onDelete }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);
      await onUpload(file);
      toast.success(t("Photo Added successfully"));
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || t("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onDelete();
      toast.success(t("Photo Deleted "));
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || t("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full cursor-pointer shadow-md hover:scale-105 transition-all">
          <FiEdit size={12} />
        </div>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md rounded-2xl"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">{t("Profile Photo")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* upload */}
          <label className="border-2 border-dashed border-pink-200 hover:border-primary transition-all rounded-2xl p-5 flex items-center gap-4 cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-pink-100 text-primary flex items-center justify-center text-2xl group-hover:scale-105 transition-all">
              <MdOutlineAddPhotoAlternate />
            </div>

            <div>
              <p className="font-semibold text-gray-800">
                {t("Upload New Photo")}
              </p>

              <p className="text-sm text-gray-500">
                {t("Choose an image from your device")}
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              hidden
              disabled={loading}
              onChange={handleUpload}
            />
          </label>

          {/* delete */}

          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full border border-red-200 hover:bg-red-50 text-red-500 rounded-2xl p-4 flex items-center gap-4 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-xl">
              <FiTrash2 />
            </div>

            <div className="text-left">
              <p className="font-semibold">{t("Remove Current Photo")}</p>

              <p className="text-sm text-red-400">
                {t("Delete your current profile picture")}
              </p>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmProfilePhoto;
