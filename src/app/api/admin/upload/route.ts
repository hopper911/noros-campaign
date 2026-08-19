import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSiteContent, insertMedia, saveSiteContent } from "@/lib/get-site-content";
import { applyMediaUrl, MEDIA_KINDS, type MediaKind } from "@/lib/site-content";

export const runtime = "nodejs";

const MAX_BYTES = 20 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

function matchesMagic(mime: string, bytes: Buffer): boolean {
  if (mime === "image/jpeg") {
    // JPEG: FF D8 FF
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (mime === "image/png") {
    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    return bytes.length >= 8 && bytes.slice(0, 8).equals(sig);
  }
  if (mime === "image/gif") {
    // GIF87a / GIF89a
    const head = bytes.toString("ascii", 0, 6);
    return head === "GIF87a" || head === "GIF89a";
  }
  if (mime === "image/webp") {
    // RIFF....WEBP
    const riff = bytes.toString("ascii", 0, 4);
    const webp = bytes.toString("ascii", 8, 12);
    return riff === "RIFF" && webp === "WEBP";
  }
  if (mime === "video/webm") {
    // EBML header: 1A 45 DF A3
    const hdr = Buffer.from([0x1a, 0x45, 0xdf, 0xa3]);
    return bytes.length >= 4 && bytes.slice(0, 4).equals(hdr);
  }
  if (mime === "video/mp4" || mime === "video/quicktime") {
    // MP4/QuickTime: ftyp atom
    // Commonly at offset 4: [size][ftyp]
    const atom = bytes.toString("ascii", 4, 8);
    return atom === "ftyp";
  }
  return false;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const kindRaw = String(form.get("kind") ?? "");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    if (!MEDIA_KINDS.includes(kindRaw as MediaKind)) {
      return NextResponse.json({ error: "Invalid media kind" }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        { error: "Use JPEG, PNG, WebP, GIF, MP4, WebM, or MOV" },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Media must be under 20MB" },
        { status: 400 },
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    if (!matchesMagic(file.type, bytes)) {
      return NextResponse.json(
        { error: "File signature does not match declared media type" },
        { status: 400 },
      );
    }

    const id = await insertMedia(kindRaw as MediaKind, file.type, bytes);
    const url = `/api/media/${id}`;
    const next = applyMediaUrl(await getSiteContent(), kindRaw as MediaKind, url, file.type);
    await saveSiteContent(next);
    revalidatePath("/", "layout");
    return NextResponse.json({ url, content: next });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
