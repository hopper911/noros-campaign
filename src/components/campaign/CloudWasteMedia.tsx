import type { CloudWasteMediaAsset } from "@/lib/site-content";
import type { ReactNode } from "react";

export function CloudWasteMedia({
  asset,
  className = "",
  alt = "",
  children,
  controls = false,
}: {
  asset: CloudWasteMediaAsset | null;
  className?: string;
  alt?: string;
  children?: ReactNode;
  controls?: boolean;
}) {
  if (!asset) return <>{children}</>;
  if (asset.mediaType === "video") {
    return (
      <video
        src={asset.url}
        className={className}
        autoPlay={!controls}
        loop={!controls}
        muted
        playsInline
        controls={controls}
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        aria-label={alt || "Campaign video"}
        aria-hidden={!controls && !alt ? true : undefined}
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset.url} alt={alt} className={className} draggable={false} />;
}
