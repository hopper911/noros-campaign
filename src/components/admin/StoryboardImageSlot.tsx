"use client";

import { StoryboardCropModal } from "@/components/admin/StoryboardCropModal";
import { useRef, useState } from "react";

export function StoryboardImageSlot({
  label,
  src,
  kind,
  uploading,
  onUpload,
}: {
  label: string;
  src: string;
  kind: string;
  uploading: string | null;
  onUpload: (kind: string, file: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  function onFileChosen(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    setCropSrc(url);
  }

  async function cropExisting() {
    if (!src) return;
    try {
      const res = await fetch(src, { credentials: "same-origin" });
      if (!res.ok) throw new Error("Could not load image");
      const blob = await res.blob();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      const url = URL.createObjectURL(blob);
      setObjectUrl(url);
      setCropSrc(url);
    } catch {
      setCropSrc(src);
    }
  }

  function closeCrop() {
    setCropSrc(null);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
  }

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">{label}</p>
      <div className="group relative mt-2 block aspect-video overflow-hidden border border-white/10">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-white/[0.03]" />
        )}
        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
        <button
          type="button"
          className="absolute inset-x-3 bottom-3 rounded-full bg-black/80 px-3 py-1.5 text-center font-mono text-[10px] tracking-[0.08em] text-mint uppercase"
          disabled={!!uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading === kind ? "Uploading…" : "Upload / replace media"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
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
          disabled={!!uploading || !src}
          onClick={cropExisting}
        >
          Crop
        </button>
      </div>

      {cropSrc ? (
        <StoryboardCropModal
          imageSrc={cropSrc}
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
