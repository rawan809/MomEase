import { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/UI/dialog";
import { toRelativeUrl } from "@/utils/imgBaseURL";

interface PostMedia {
  mediaId: number;
  mediaUrl: string;
  mediaType: "Photo" | "Video";
  order: number;
}

interface PostImagesProps {
  media: PostMedia[];
}

function PostImages({ media }: PostImagesProps) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = useMemo(
    () =>
      media
        .filter((item) => item.mediaType === "Photo")
        .sort((a, b) => a.order - b.order),
    [media],
  );

  if (!images.length) return null;

  const openPreview = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const count = images.length;

  return (
    <>
      {/*  GRID VIEW  */}
      <div className="mt-3 mb-3 rounded-2xl overflow-hidden">
        {/* صورة واحدة */}
        {count === 1 && (
          <img
            src={toRelativeUrl(images[0].mediaUrl)}
            onClick={() => openPreview(0)}
            className="w-full max-h-125 object-cover cursor-pointer hover:scale-[1.01] transition"
          />
        )}

        {/* صورتين */}
        {count === 2 && (
          <div className="grid grid-cols-2 gap-1">
            {images.map((img, index) => (
              <img
                key={img.mediaId}
                src={toRelativeUrl(img.mediaUrl)}
                onClick={() => openPreview(index)}
                className="h-80 w-full object-cover cursor-pointer hover:opacity-90 transition"
              />
            ))}
          </div>
        )}

        {/* 3 صور */}
        {count === 3 && (
          <div className="grid grid-cols-2 gap-1">
            <img
              src={toRelativeUrl(images[0].mediaUrl)}
              onClick={() => openPreview(0)}
              className="h-100 w-full object-cover cursor-pointer"
            />

            <div className="grid grid-rows-2 gap-1">
              {images.slice(1).map((img, index) => (
                <img
                  key={img.mediaId}
                  src={toRelativeUrl(img.mediaUrl)}
                  onClick={() => openPreview(index + 1)}
                  className="h-49.75 w-full object-cover cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}

        {/* 4 صور */}
        {count === 4 && (
          <div className="grid grid-cols-2 gap-1">
            {images.map((img, index) => (
              <img
                key={img.mediaId}
                src={toRelativeUrl(img.mediaUrl)}
                onClick={() => openPreview(index)}
                className="h-55 w-full object-cover cursor-pointer"
              />
            ))}
          </div>
        )}

        {/* 5 أو أكثر */}
        {count >= 5 && (
          <div className="grid grid-cols-2 gap-1">
            {images.slice(0, 4).map((img, index) => (
              <div key={img.mediaId} className="relative">
                <img
                  src={toRelativeUrl(img.mediaUrl)}
                  onClick={() => openPreview(index)}
                  className="h-40 w-full object-cover cursor-pointer"
                />

                {/* آخر صورة يظهر فوقها +X */}
                {index === 3 && count > 4 && (
                  <button
                    onClick={() => openPreview(index)}
                    className="absolute inset-0 bg-black/55 text-white text-3xl font-bold"
                  >
                    +{count - 4}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/*  PREVIEW  */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden  border-none">
          <div className="relative flex items-center justify-center">
            <img
              src={toRelativeUrl(images[selectedIndex]?.mediaUrl)}
              className="max-h-[90vh] w-full object-contain"
            />

            {/* السابق */}
            {selectedIndex > 0 && (
              <button
                onClick={() => setSelectedIndex((prev) => prev - 1)}
                className="absolute left-4 bg-white/80 px-3 py-2 rounded-full text-xl"
              >
                ‹
              </button>
            )}

            {/* التالي */}
            {selectedIndex < count - 1 && (
              <button
                onClick={() => setSelectedIndex((prev) => prev + 1)}
                className="absolute right-4 bg-white/80 px-3 py-2 rounded-full text-xl"
              >
                ›
              </button>
            )}

            {/* رقم الصورة */}
            <div className="absolute bottom-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {selectedIndex + 1} / {count}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PostImages;
