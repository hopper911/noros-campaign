import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Kit zip exports are disabled — assets are view-only. */
export async function GET() {
  return NextResponse.json(
    { error: "Downloads are disabled. Assets are view-only." },
    { status: 403 },
  );
}
