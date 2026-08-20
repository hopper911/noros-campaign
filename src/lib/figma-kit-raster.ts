import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { getMedia } from "@/lib/get-site-content";

const KIT_DIR = path.join(process.cwd(), "public", "figma-kit");

export type JpegVariant = "full" | "plain";

export function safeKitSvgName(raw: string): string | null {
  const name = path.basename(raw);
  if (!/^[a-z0-9][a-z0-9._-]*\.svg$/i.test(name)) return null;
  return name;
}

export function parseJpegVariant(raw: string | null): JpegVariant {
  return raw === "plain" ? "plain" : "full";
}

export function jpegNameFromSvg(svgName: string, variant: JpegVariant = "full") {
  const base = svgName.replace(/\.svg$/i, "");
  return variant === "plain" ? `${base}-bg.jpg` : `${base}.jpg`;
}

export async function listKitSvgNames(): Promise<string[]> {
  const raw = await readFile(path.join(KIT_DIR, "manifest.json"), "utf8");
  const manifest = JSON.parse(raw) as unknown;
  if (!Array.isArray(manifest)) return [];
  return manifest
    .map((row) => (Array.isArray(row) && typeof row[0] === "string" ? row[0] : null))
    .filter((name): name is string => !!safeKitSvgName(name ?? ""));
}

function stripSvgText(svg: string) {
  return svg
    .replace(/<text\b[^>]*>[\s\S]*?<\/text>/gi, "")
    .replace(/<tspan\b[^>]*>[\s\S]*?<\/tspan>/gi, "");
}

async function loadCustomBackground(url: string | null | undefined): Promise<Buffer | undefined> {
  if (!url?.startsWith("/api/media/")) return undefined;
  const id = url.slice("/api/media/".length);
  const row = await getMedia(id);
  return row?.bytes;
}

async function bytesToJpeg(bytes: Buffer): Promise<Buffer> {
  return sharp(bytes).jpeg({ quality: 92, mozjpeg: true }).toBuffer();
}

export async function svgToJpeg(
  svgName: string,
  variant: JpegVariant = "full",
  customBackgroundUrl?: string | null,
): Promise<Buffer> {
  const safe = safeKitSvgName(svgName);
  if (!safe) throw new Error("Invalid file");

  if (variant === "plain") {
    const custom = await loadCustomBackground(customBackgroundUrl);
    if (custom) return bytesToJpeg(custom);
  }

  let svg = await readFile(path.join(KIT_DIR, safe), "utf8");
  if (variant === "plain") svg = stripSvgText(svg);
  return sharp(Buffer.from(svg), { density: 72 })
    .flatten({ background: "#121314" })
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
}
