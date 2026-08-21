import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Background uploads disabled — gallery is view-only. */
export async function POST() {
  return NextResponse.json(
    { error: "Background uploads are disabled. Gallery is view-only." },
    { status: 403 },
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Background uploads are disabled. Gallery is view-only." },
    { status: 403 },
  );
}
