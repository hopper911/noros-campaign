"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  imageSrc: string;
  onCancel: () => void;
  onCropped: (file: File) => void;
  /** Width / height, e.g. 16/9 or 9/16 */
  aspect?: number;
  outputWidth?: number;
  title?: string;
  hint?: string;
  frameClassName?: string;
  filePrefix?: string;
};

export function StoryboardCropModal({
  imageSrc,
  onCancel,
  onCropped,
  aspect = 16 / 9,
  outputWidth = 1920,
  title = "Crop",
  hint = "Drag to reposition. Zoom to frame the crop.",
  frameClassName = "aspect-video",
  filePrefix = "crop",
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [frame, setFrame] = useState({ w: 0, h: 0 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel, busy]);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const root = dialogRef.current;
    const focusables = () =>
      root?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [];
    const list = focusables();
    list[0]?.focus();
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onTab);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onTab);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setFrame({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cover = useCallback(
    (z: number) => {
      if (!natural.w || !frame.w) return { w: 0, h: 0, scale: 1 };
      const scale = Math.max(frame.w / natural.w, frame.h / natural.h) * z;
      return { w: natural.w * scale, h: natural.h * scale, scale };
    },
    [natural, frame],
  );

  const clampOffset = useCallback(
    (nx: number, ny: number, z: number) => {
      const { w, h } = cover(z);
      if (!frame.w || !w) return { x: 0, y: 0 };
      const minX = Math.min(0, frame.w - w);
      const minY = Math.min(0, frame.h - h);
      return {
        x: Math.max(minX, Math.min(0, nx)),
        y: Math.max(minY, Math.min(0, ny)),
      };
    },
    [cover, frame],
  );

  function onImageLoad(img: HTMLImageElement) {
    setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }

  function setZoomClamped(next: number) {
    setZoom(next);
    setOffset((prev) => clampOffset(prev.x, prev.y, next));
  }

  async function applyCrop() {
    if (!natural.w || !frame.w) return;
    setBusy(true);
    setError("");
    try {
      const img = imgRef.current;
      if (!img) throw new Error("Image not ready");

      const { w: drawW, h: drawH } = cover(zoom);
      const { x, y } = clampOffset(offset.x, offset.y, zoom);

      const scaleX = natural.w / drawW;
      const scaleY = natural.h / drawH;
      const sx = -x * scaleX;
      const sy = -y * scaleY;
      const sw = frame.w * scaleX;
      const sh = frame.h * scaleY;

      const outH = Math.round(outputWidth / aspect);
      const canvas = document.createElement("canvas");
      canvas.width = outputWidth;
      canvas.height = outH;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable");
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outputWidth, outH);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Crop failed"))),
          "image/jpeg",
          0.92,
        );
      });
      onCropped(
        new File([blob], `${filePrefix}-${Date.now()}.jpg`, { type: "image/jpeg" }),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Crop failed");
      setBusy(false);
    }
  }

  const { w: drawW, h: drawH } = cover(zoom);
  const pos = clampOffset(offset.x, offset.y, zoom);

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
    >
      <div className="w-full max-w-3xl border border-white/15 bg-[#0a0b0c] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
              {title}
            </p>
            <p className="mt-1 text-sm text-neue">{hint}</p>
          </div>
          <button type="button" className="btn-nav" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        </div>

        <div
          ref={frameRef}
          className={`relative mt-5 w-full max-h-[min(70vh,36rem)] cursor-grab overflow-hidden border border-white/25 active:cursor-grabbing ${frameClassName}`}
          tabIndex={0}
          role="img"
          aria-label="Drag to reposition crop. Use zoom slider below."
          onKeyDown={(e) => {
            const step = e.shiftKey ? 24 : 12;
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              setOffset((o) => clampOffset(o.x + step, o.y, zoom));
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              setOffset((o) => clampOffset(o.x - step, o.y, zoom));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setOffset((o) => clampOffset(o.x, o.y + step, zoom));
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              setOffset((o) => clampOffset(o.x, o.y - step, zoom));
            }
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setDragging(true);
            dragStart.current = {
              x: e.clientX,
              y: e.clientY,
              ox: offset.x,
              oy: offset.y,
            };
          }}
          onMouseMove={(e) => {
            if (!dragging) return;
            const nx = dragStart.current.ox + (e.clientX - dragStart.current.x);
            const ny = dragStart.current.oy + (e.clientY - dragStart.current.y);
            setOffset(clampOffset(nx, ny, zoom));
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={imageSrc}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute max-w-none select-none"
            style={
              natural.w
                ? {
                    width: drawW,
                    height: drawH,
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                  }
                : { inset: 0, width: "100%", height: "100%", objectFit: "cover" }
            }
            onLoad={(e) => onImageLoad(e.currentTarget)}
            crossOrigin="anonymous"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-mint/35" />
        </div>

        <label className="mt-5 block font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
          Zoom
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoomClamped(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--mint)]"
          />
        </label>

        {error ? (
          <p className="mt-3 text-sm text-red" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-trial"
            onClick={applyCrop}
            disabled={busy || !natural.w}
          >
            {busy ? "Applying…" : "Apply crop & upload"}
          </button>
          <button type="button" className="btn-nav" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
