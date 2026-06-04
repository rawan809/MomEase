import { useState, useRef, useEffect } from "react";
import { CirclePlus, ImagePlus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Post } from "./PostCard";
import { useTranslation } from "react-i18next";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CreateMode {
  mode: "create";
  onSubmit: (data: { text: string; mediaFiles: File[] }) => Promise<void>;
}
export interface PostMedia {
  mediaId: number;
  mediaUrl: string;
  mediaType: "Photo" | "Video";
  order: number;
}

interface EditMode {
  mode: "edit";
  post: Post;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    text: string;
    mediaFiles: File[];
    mediaIdsToDelete: number[];
  }) => Promise<void>;
}

type PostFormDialogProps = CreateMode | EditMode;

// ─── Component ───────────────────────────────────────────────────────────────

function PostFormDialog(props: PostFormDialogProps) {
  const { t } = useTranslation();
  const isEdit = props.mode === "edit";

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaIdsToDelete, setMediaIdsToDelete] = useState<number[]>([]);
  const [existingMedia, setExistingMedia] = useState<PostMedia[]>([]);

  // In edit mode: sync open state and pre-fill existing text
  useEffect(() => {
    if (isEdit) {
      const editProps = props as EditMode;
      if (editProps.open) {
        setText(editProps.post.text ?? "");
        setExistingMedia(editProps.post.media || []);
        setMediaFiles([]);
        setPreviewUrls([]);
        setMediaIdsToDelete([]);
      }
    }
  }, [isEdit ? (props as EditMode).open : null]);

  const dialogOpen = isEdit ? (props as EditMode).open : open;

  const handleOpenChange = (value: boolean) => {
    if (isEdit) {
      if (!value) (props as EditMode).onClose();
    } else {
      setOpen(value);
    }
  };

  // ─── File Handlers ──────────────────────────────────────────────────────

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...filesArray]);
    setPreviewUrls((prev) => [
      ...prev,
      ...filesArray.map((f) => URL.createObjectURL(f)),
    ]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      const urls = [...prev];
      URL.revokeObjectURL(urls[index]);
      urls.splice(index, 1);
      return urls;
    });
  };

  // ─── Submit ─────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!text.trim() && mediaFiles.length === 0 && existingMedia.length === 0)
      return;

    try {
      setIsSubmitting(true);
      await props.onSubmit({
        text,
        mediaFiles,
        mediaIdsToDelete,
      });
      toast.success(isEdit ? t("Post updated") : t("Post created"));
      // reset
      setText("");
      setMediaFiles([]);
      setPreviewUrls([]);
      handleOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || t("Something went wrong"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── UI ─────────────────────────────────────────────────────────────────

  const dialogContent = (
    <DialogContent className="sm:max-w-md rounded-xl p-6 border-none shadow-xl bg-white gap-6 [&>button]:hidden">
      <DialogHeader className="flex flex-row items-center relative border-b-0 space-y-0 p-0 m-0">
        <DialogTitle className="text-center flex-1 text-xl font-bold text-black m-0">
          {isEdit ? t("Edit Post") : t("Create Post")}
        </DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-4 mt-2">
        {/* File Upload Area */}
        <div
          className="border-2 border-dashed border-primary/40 bg-[#fff5f8] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#ffeef3] transition-colors min-h-40"
          onClick={() => fileInputRef.current?.click()}
        >
          {existingMedia.length > 0 || previewUrls.length > 0 ? (
            <div
              className="grid grid-cols-3 gap-2 w-full mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* الصور القديمة */}
              {existingMedia.map((media) => (
                <div
                  key={media.mediaId}
                  className="relative aspect-square rounded-xl overflow-hidden group border"
                >
                  <img
                    src={media.mediaUrl}
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMediaIdsToDelete((prev) => [...prev, media.mediaId]);
                      setExistingMedia((prev) =>
                        prev.filter((m) => m.mediaId !== media.mediaId),
                      );
                    }}
                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded opacity-0 group-hover:opacity-100"
                  >
                    <X size={12}/>
                  </button>
                </div>
              ))}

              {/* الصور الجديدة */}
              {previewUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden group border"
                >
                  <img src={url} className="w-full h-full object-cover" />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded opacity-0 group-hover:opacity-100"
                  >
                    <X size={12}/>
                  </button>
                </div>
              ))}

              {/* زرار add more */}
              <div
                className="aspect-square border-2 border-dashed flex flex-col gap-1 items-center justify-center cursor-pointer border-primary/50 rounded-xl text-primary hover:bg-primary/10 "
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus size={30} />
                <span>{t("Add More")}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                <ImagePlus className="text-primary stroke-2" size={28} />
              </div>
              <span className="font-semibold text-black text-base">
                {t("Add a Photo")}
              </span>
            </div>
          )}
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Text Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("Share your story or your thoughts...")}
          className="w-full min-h-30 p-4 rounded-xl border border-primary/20 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 resize-none text-[15px]"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={(!text.trim() && mediaFiles.length === 0 && existingMedia.length === 0) || isSubmitting}
          className="w-full bg-primary/90 hover:bg-primary text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-base mt-2 cursor-pointer"
        >
          {isSubmitting
            ? isEdit
              ? t("Saving...")
              : t("Posting...")
            : isEdit
              ? t("Save Changes")
              : t("Post")}
        </button>

        {/* Cancel Button (edit mode only) */}
        {isEdit && (
          <button
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 rounded-xl transition-colors text-base cursor-pointer"
          >
            {t("Cancel")}
          </button>
        )}

        {!isEdit && (
          <p className="text-center text-xs text-gray-400 font-medium">
            {t("Share your moment with community")}
          </p>
        )}
      </div>
    </DialogContent>
  );

  // Edit mode: controlled dialog (no trigger button)
  if (isEdit) {
    return (
      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        {dialogContent}
      </Dialog>
    );
  }

  // Create mode: dialog with trigger button
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <div className="bg-primary/80 rounded-xl text-white py-2 cursor-pointer hover:bg-primary transition-all w-full flex items-center justify-center gap-1">
          <CirclePlus size={20} />
          <span>{t("Create post")}</span>
        </div>
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}

export default PostFormDialog;