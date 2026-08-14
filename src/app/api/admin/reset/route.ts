import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { resetSiteContent } from "@/lib/get-site-content";

export const runtime = "nodejs";

export async function POST() {
  try {
    const document = await resetSiteContent();
    revalidatePath("/", "layout");
    return NextResponse.json(document);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Reset failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
