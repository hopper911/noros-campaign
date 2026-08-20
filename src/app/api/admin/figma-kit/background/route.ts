import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSiteContent, insertMedia, saveSiteContent } from "@/lib/get-site-content";
import { figmaKitBackgroundKind, mergeSiteContent } from "@/lib/site-content";
import { safeKitSvgName } from "@/lib/figma-kit-raster";

export const runtime = "nodejs";

const MAX_BYTES = 20 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

function matchesMagic(mime: string, bytes: Buffer): boolean {
  if (mime === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (mime === "image/png") {
    const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    return bytes.length >= 8 && bytes.slice(0, 8).equals(sig);
  }
  if (mime === "image/webp") {
    const riff = bytes.toString("ascii", 0, 4);
    const webp = bytes.toString("ascii", 8, 12);
    return riff === "RIFF" && webp === "WEBP";
  }
  return false;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const frame = String(form.get("frame") ?? "");
    const safeFrame = safeKitSvgName(frame);
    if (!safeFrame) {
      return NextResponse.json({ error: "Invalid frame" }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: "Use JPEG, PNG, or WebP" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image must be under 20MB" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    if (!matchesMagic(file.type, bytes)) {
      return NextResponse.json(
        { error: "File signature does not match declared media type" },
        { status: 400 },
      );
    }

    const kind = figmaKitBackgroundKind(safeFrame);
    const id = await insertMedia(kind, file.type, bytes);
    const url = `/api/media/${id}`;
    const current = await getSiteContent();
    const next = mergeSiteContent({
      ...current,
      figmaKit: {
        backgrounds: {
          ...current.figmaKit.backgrounds,
          [safeFrame]: url,
        },
      },
    });
    await saveSiteContent(next);
    revalidatePath("/", "layout");
    return NextResponse.json({ url, backgrounds: next.figmaKit.backgrounds });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const frame = new URL(req.url).searchParams.get("frame") ?? "";
    const safeFrame = safeKitSvgName(frame);
    if (!safeFrame) {
      return NextResponse.json({ error: "Invalid frame" }, { status: 400 });
    }

    const current = await getSiteContent();
    const backgrounds = { ...current.figmaKit.backgrounds };
    delete backgrounds[safeFrame];
    const next = mergeSiteContent({
      ...current,
      figmaKit: { backgrounds },
    });
    await saveSiteContent(next);
    revalidatePath("/", "layout");
    return NextResponse.json({ backgrounds: next.figmaKit.backgrounds });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Clear failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
