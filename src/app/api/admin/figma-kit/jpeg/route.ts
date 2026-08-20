import { NextResponse } from "next/server";
import {
  jpegNameFromSvg,
  parseJpegVariant,
  safeKitSvgName,
  svgToJpeg,
} from "@/lib/figma-kit-raster";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const file = url.searchParams.get("file") ?? "";
  const variant = parseJpegVariant(url.searchParams.get("variant"));
  const name = safeKitSvgName(file);
  if (!name) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  try {
    const jpeg = await svgToJpeg(name, variant);
    return new NextResponse(new Uint8Array(jpeg), {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${jpegNameFromSvg(name, variant)}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
