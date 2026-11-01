"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Produk" },
  { href: "/admin/orders", label: "Pesanan" },
  { href: "/admin/promos", label: "Promo" },
  { href: "/admin/reports", label: "Laporan" },
];

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="admin-nav">
      <div className="admin-nav__brand">
        <Link href="/admin">Dylanrych Admin</Link>
        <p className="muted">{email}</p>
      </div>
      <nav>
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={active ? "active" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="admin-nav__footer">
        <Link href="/">← Lihat toko</Link>
        <button type="button" onClick={logout} className="btn btn-ghost">
          Keluar
        </button>
      </div>
    </aside>
  );
}
