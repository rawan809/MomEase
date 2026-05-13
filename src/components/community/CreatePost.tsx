import { useState, useRef } from "react";
import { CirclePlus, ImagePlus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

function CreatePost({ addPost }: any) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setMediaFiles((prev) => [...prev, ...filesArray]);

      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);

      // Reset input value so the same file can be selected again if needed
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      const newUrls = [...prev];
      URL.revokeObjectURL(newUrls[index]);
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

  const handlePost = async () => {
    if (!text.trim() && mediaFiles.length === 0) return;

    try {
      setIsSubmitting(true);

      await addPost({
        text,
        mediaFiles,
      });
      toast.success("Post Created");
      // reset
      setOpen(false);
      setText("");
      setMediaFiles([]);
      setPreviewUrls([]);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={"w-full"}>
        <div className="bg-primary/80 rounded-xl text-white py-2 cursor-pointer hover:bg-primary transition-all w-full flex items-center justify-center gap-1">
          <CirclePlus size={20} />
          <span>Create post</span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl p-6 border-none shadow-xl bg-white gap-6 [&>button]:hidden">
        <DialogHeader className="flex flex-row items-center relative border-b-0 space-y-0 p-0 m-0">
          <DialogTitle className="text-center flex-1 text-xl font-bold text-black m-0">
            Create Post
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          {/* File Upload Area */}
          <div
            className="border-2 border-dashed border-primary/40 bg-[#fff5f8] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#ffeef3] transition-colors min-h-40"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrls.length > 0 ? (
              <div
                className="grid grid-cols-3 gap-2 w-full mt-2"
                onClick={(e) => e.stopPropagation()}
              >
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden group border border-primary/20 shadow-sm bg-white"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-xl p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {previewUrls.length > 0 && (
                  <div
                    className="aspect-square rounded-xl border-2 border-dashed border-primary/40 bg-white flex flex-col gap-1 items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus className="text-primary" size={24} />
                    <span className="text-[10px] font-medium text-primary">
                      Add More
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <ImagePlus className="text-primary stroke-2" size={28} />
                </div>
                <span className="font-semibold text-black text-base">
                  Add a Photo
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
            placeholder="Share your story or your thoughts..."
            className="w-full min-h-30 p-4 rounded-xl border border-primary/20 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 resize-none text-[15px]"
          />

          {/* Submit Button */}
          <button
            onClick={handlePost}
            disabled={(!text.trim() && mediaFiles.length === 0) || isSubmitting}
            className="w-full bg-primary/90 hover:bg-primary text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-base mt-2 cursor-pointer"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>

          {/* Footer Text */}
          <p className="text-center text-xs text-gray-400 font-medium">
            Share your moment with community
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
