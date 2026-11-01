import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Lightweight probe — avoids Prisma so anonymous preview stays diagnosable. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    hasDb: Boolean(process.env.DATABASE_URL),
    hasAuth: Boolean(process.env.AUTH_SECRET),
    node: process.version,
  });
}
