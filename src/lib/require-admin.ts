import { redirect } from "next/navigation";
import { getAdminSession, type AdminSession } from "@/lib/auth";

export async function requireAdminPage(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
