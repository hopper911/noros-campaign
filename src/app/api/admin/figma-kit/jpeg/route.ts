import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Kit exports are view-only — downloads disabled. */
export async function GET() {
  return NextResponse.json(
    { error: "Downloads are disabled. Assets are view-only." },
    { status: 403 },
  );
}
