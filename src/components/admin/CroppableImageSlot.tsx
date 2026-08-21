"use client";

import { StoryboardCropModal } from "@/components/admin/StoryboardCropModal";
import type { CloudWasteMediaAsset } from "@/lib/site-content";
import { useRef, useState } from "react";

type Props = {
  label: string;
  src: string | CloudWasteMediaAsset | null;
  kind: string;
  uploading: string | null;
  onUpload: (kind: string, file: File) => void;
  /** CSS aspect class, e.g. aspect-video or aspect-[9/16] */
  aspectClass?: string;
  /** Numeric aspect width/height */
  aspect?: number;
  outputWidth?: number;
  cropTitle?: string;
  cropHint?: string;
  filePrefix?: string;
  /** When true, videos upload without crop; images open crop modal */
  allowVideo?: boolean;
};

export function CroppableImageSlot({
  label,
  src,
  kind,
  uploading,
  onUpload,
  aspectClass = "aspect-video",
  aspect = 16 / 9,
  outputWidth = 1920,
  cropTitle = "Crop",
  cropHint = "Drag to reposition. Zoom to frame the crop.",
  filePrefix = "crop",
  allowVideo = false,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const url = typeof src === "string" ? src : src?.url ?? "";
  const isVideo = !!src && typeof src !== "string" && src.mediaType === "video";

  function onFileChosen(file: File | undefined) {
    if (!file) return;
    if (file.type.startsWith("video/")) {
      if (allowVideo) onUpload(kind, file);
      return;
    }
    if (!file.type.startsWith("image/")) return;
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    const next = URL.createObjectURL(file);
    setObjectUrl(next);
    setCropSrc(next);
  }

  async function cropExisting() {
    if (!url || isVideo) return;
    try {
      const res = await fetch(url, { credentials: "same-origin" });
      if (!res.ok) throw new Error("Could not load image");
      const blob = await res.blob();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      const next = URL.createObjectURL(blob);
      setObjectUrl(next);
      setCropSrc(next);
    } catch {
      setCropSrc(url);
    }
  }

  function closeCrop() {
    setCropSrc(null);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
  }

  const accept = allowVideo
    ? "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
    : "image/jpeg,image/png,image/webp,image/gif";

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">{label}</p>
      <div
        className={`group relative mt-2 block overflow-hidden border border-white/25 ${aspectClass}`}
      >
        {url ? (
          isVideo ? (
            <video
              src={url}
              controls
              muted
              playsInline
              controlsList="nodownload noplaybackrate"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt={`${label} preview`}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          )
        ) : (
          <div className="absolute inset-0 bg-white/[0.03]" />
        )}
        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
        <button
          type="button"
          className="absolute inset-x-3 bottom-3 min-h-11 rounded-full bg-black/80 px-3 py-2 text-center font-mono text-[10px] tracking-[0.08em] text-mint uppercase"
          disabled={!!uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading === kind ? "Uploading…" : "Upload / replace media"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          className="hidden"
          disabled={!!uploading}
          onChange={(e) => {
            onFileChosen(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-nav"
          disabled={!!uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading === kind ? "Uploading…" : "Choose file"}
        </button>
        <button
          type="button"
          className="btn-nav"
          disabled={!!uploading || !url || isVideo}
          onClick={() => void cropExisting()}
        >
          Crop
        </button>
      </div>

      {cropSrc ? (
        <StoryboardCropModal
          imageSrc={cropSrc}
          aspect={aspect}
          outputWidth={outputWidth}
          title={cropTitle}
          hint={cropHint}
          frameClassName={aspectClass}
          filePrefix={filePrefix}
          onCancel={closeCrop}
          onCropped={(file) => {
            closeCrop();
            onUpload(kind, file);
          }}
        />
      ) : null}
    </div>
  );
}
