import { NextResponse } from "next/server";
import JSZip from "jszip";
import {
  jpegNameFromSvg,
  listKitSvgNames,
  parseJpegVariant,
  svgToJpeg,
} from "@/lib/figma-kit-raster";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(req: Request) {
  const variant = parseJpegVariant(new URL(req.url).searchParams.get("variant"));
  const zipName = variant === "plain" ? "figma-kit-backgrounds.zip" : "figma-kit-jpegs.zip";

  try {
    const names = await listKitSvgNames();
    const zip = new JSZip();
    for (const name of names) {
      zip.file(jpegNameFromSvg(name, variant), await svgToJpeg(name, variant));
    }
    const body = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });
    return new NextResponse(new Uint8Array(body), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${zipName}"`,
        "Cache-Control": "private, max-age=0",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Zip failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
