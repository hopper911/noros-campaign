import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/get-site-content";
import { mergeSiteContent } from "@/lib/site-content";

export const runtime = "nodejs";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const document = mergeSiteContent(body);
    await saveSiteContent(document);
    revalidatePath("/", "layout");
    return NextResponse.json(document);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
