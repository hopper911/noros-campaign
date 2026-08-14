import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSiteContent, insertMedia, saveSiteContent } from "@/lib/get-site-content";
import { applyMediaUrl, MEDIA_KINDS, type MediaKind } from "@/lib/site-content";

export const runtime = "nodejs";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

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
      return NextResponse.json({ error: "Use JPEG, PNG, WebP, or GIF" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image must be under 4MB" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const id = await insertMedia(kindRaw as MediaKind, file.type, bytes);
    const url = `/api/media/${id}`;
    const next = applyMediaUrl(await getSiteContent(), kindRaw as MediaKind, url);
    await saveSiteContent(next);
    revalidatePath("/", "layout");
    return NextResponse.json({ url, content: next });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
