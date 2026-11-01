import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "dylanrych_admin_session";
const SESSION_DAYS = 7;

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export type AdminSession = {
  sub: string;
  email: string;
  name: string;
  role: string;
};

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createAdminSession(admin: {
  id: string;
  email: string;
  name: string;
  role: string;
}) {
  const token = await new SignJWT({
    email: admin.email,
    name: admin.name,
    role: admin.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(admin.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecret());

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroyAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.sub || typeof payload.email !== "string") return null;
    return {
      sub: payload.sub,
      email: payload.email,
      name: typeof payload.name === "string" ? payload.name : "",
      role: typeof payload.role === "string" ? payload.role : "SUPER_ADMIN",
    };
  } catch {
    return null;
  }
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export async function authenticateAdmin(email: string, password: string) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) return null;
  const ok = await verifyPassword(password, admin.passwordHash);
  if (!ok) return null;
  return admin;
}
