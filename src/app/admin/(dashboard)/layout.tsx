import { AdminNav } from "@/components/admin-nav";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <AdminNav email={session.email} />
      <div className="admin-shell__content">
        <div>{children}</div>
      </div>
    </div>
  );
}
