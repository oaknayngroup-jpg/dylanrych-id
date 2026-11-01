import { formatIdr } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Laporan · Admin" };

export default async function AdminReportsPage() {
  const [paidOrders, topItems] = await Promise.all([
    prisma.order.findMany({
      where: { paymentStatus: "SETTLEMENT" },
      select: { totalIdr: true, createdAt: true },
    }),
    prisma.orderItem.groupBy({
      by: ["productName"],
      _sum: { quantity: true, lineTotalIdr: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    }),
  ]);

  const omzet = paidOrders.reduce((n, o) => n + o.totalIdr, 0);

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Laporan penjualan</h1>
          <p className="muted">
            Placeholder ringkas — filter tanggal & export CSV menyusul setelah checkout hidup.
          </p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="panel">
          <span className="muted">Order settlement</span>
          <strong>{paidOrders.length}</strong>
        </div>
        <div className="panel">
          <span className="muted">Omzet</span>
          <strong>{formatIdr(omzet)}</strong>
        </div>
      </div>

      <div className="panel">
        <h2
          style={{
            fontFamily: "var(--font-display), serif",
            fontSize: "1.4rem",
            fontWeight: 500,
            marginTop: 0,
          }}
        >
          Produk terlaris
        </h2>
        {topItems.length === 0 ? (
          <p className="muted" style={{ marginBottom: 0 }}>
            Belum ada data penjualan.
          </p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Qty</th>
                <th>Omzet</th>
              </tr>
            </thead>
            <tbody>
              {topItems.map((row) => (
                <tr key={row.productName}>
                  <td>{row.productName}</td>
                  <td>{row._sum.quantity ?? 0}</td>
                  <td>{formatIdr(row._sum.lineTotalIdr ?? 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
