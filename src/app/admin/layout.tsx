import { AdminNav } from "@/components/admin-nav";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // /admin/login is public (middleware allowlist). Render bare children when logged out.
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="admin-shell">
      <AdminNav email={session.email} />
      <div className="admin-shell__content">
        <div>{children}</div>
      </div>
    </div>
  );
}
