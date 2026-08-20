import { cache } from "react";
import { eq } from "drizzle-orm";
import { ensureSchema } from "@/db";
import { media, siteContent } from "@/db/schema";
import {
  defaultSiteContent,
  mergeSiteContent,
  type MediaKind,
  type SiteContent,
} from "@/lib/site-content";

const CONTENT_ID = "default";

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  try {
    const db = await ensureSchema();
    if (!db) return defaultSiteContent();

    const rows = await db.select().from(siteContent).where(eq(siteContent.id, CONTENT_ID)).limit(1);
    if (rows[0]) return mergeSiteContent(rows[0].document);

    const seeded = defaultSiteContent();
    await db
      .insert(siteContent)
      .values({
        id: CONTENT_ID,
        document: seeded,
        updatedAt: new Date(),
      })
      .onConflictDoNothing();
    const again = await db.select().from(siteContent).where(eq(siteContent.id, CONTENT_ID)).limit(1);
    return again[0] ? mergeSiteContent(again[0].document) : seeded;
  } catch (err) {
    console.error("getSiteContent failed; using defaults", err);
    return defaultSiteContent();
  }
});

export async function saveSiteContent(document: SiteContent) {
  const db = await ensureSchema();
  if (!db) {
    throw new Error("DATABASE_URL is not set");
  }
  await db
    .insert(siteContent)
    .values({
      id: CONTENT_ID,
      document,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: siteContent.id,
      set: { document, updatedAt: new Date() },
    });
}

export async function resetSiteContent() {
  const seeded = defaultSiteContent();
  await saveSiteContent(seeded);
  return seeded;
}

export async function insertMedia(kind: string, mime: string, bytes: Buffer) {
  const db = await ensureSchema();
  if (!db) throw new Error("DATABASE_URL is not set");
  await db.delete(media).where(eq(media.kind, kind));
  const [row] = await db
    .insert(media)
    .values({ kind, mime, bytes })
    .returning({ id: media.id });
  if (!row) throw new Error("Failed to store media");
  return row.id;
}

export async function getMedia(id: string) {
  const db = await ensureSchema();
  if (!db) return null;
  const rows = await db.select().from(media).where(eq(media.id, id)).limit(1);
  return rows[0] ?? null;
}
