import Link from "next/link";
import { formatIdr } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireAdminPage } from "@/lib/require-admin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin" };

export default async function AdminDashboardPage() {
  await requireAdminPage();
  const [productCount, orderCount, promoCount, paidAgg] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.promo.count(),
    prisma.order.aggregate({
      where: { paymentStatus: "SETTLEMENT" },
      _sum: { totalIdr: true },
    }),
  ]);

  return (
    <>
      <h1>Dashboard</h1>
      <p className="muted">Super admin · Dylanrych.id</p>

      <div className="stat-grid">
        <div className="panel">
          <span className="muted">Produk</span>
          <strong>{productCount}</strong>
        </div>
        <div className="panel">
          <span className="muted">Pesanan</span>
          <strong>{orderCount}</strong>
        </div>
        <div className="panel">
          <span className="muted">Promo</span>
          <strong>{promoCount}</strong>
        </div>
        <div className="panel">
          <span className="muted">Omzet (settlement)</span>
          <strong>{formatIdr(paidAgg._sum.totalIdr ?? 0)}</strong>
        </div>
      </div>

      <div className="panel">
        <p style={{ marginTop: 0 }}>Mulai dari:</p>
        <div className="form-actions">
          <Link href="/admin/products" className="btn btn-gold">
            Kelola produk
          </Link>
          <Link href="/admin/orders" className="btn btn-outline">
            Lihat pesanan
          </Link>
        </div>
      </div>
    </>
  );
}
