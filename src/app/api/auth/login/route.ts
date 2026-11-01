import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateAdmin, createAdminSession } from "@/lib/auth";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Email/password tidak valid" }, { status: 400 });
    }

    const admin = await authenticateAdmin(parsed.data.email, parsed.data.password);
    if (!admin) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
    }

    await createAdminSession({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[auth/login]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
