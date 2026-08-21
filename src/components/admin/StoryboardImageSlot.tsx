"use client";

import { CroppableImageSlot } from "@/components/admin/CroppableImageSlot";

/** 16:9 storyboard still with crop-on-upload. */
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
  return (
    <CroppableImageSlot
      label={label}
      src={src}
      kind={kind}
      uploading={uploading}
      onUpload={onUpload}
      aspectClass="aspect-video"
      aspect={16 / 9}
      outputWidth={1920}
      cropTitle="Storyboard · Crop"
      cropHint="Drag to reposition. Zoom to frame the 16:9 beat still."
      filePrefix="storyboard-crop"
    />
  );
}
