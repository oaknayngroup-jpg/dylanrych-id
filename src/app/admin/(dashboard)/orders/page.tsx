import { formatIdr } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireAdminPage } from "@/lib/require-admin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pesanan · Admin" };

export default async function AdminOrdersPage() {
  await requireAdminPage();
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { items: true },
  });

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Pesanan</h1>
          <p className="muted">
            Placeholder daftar — checkout Midtrans & booking JNT menyusul di fase toko.
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="panel">
          <p style={{ margin: 0 }}>
            Belum ada pesanan. Setelah checkout hidup, status bayar/kirim dan resi JNT
            akan tampil di sini.
          </p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Pelanggan</th>
              <th>Total</th>
              <th>Bayar</th>
              <th>Kirim</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>
                  <div>{o.orderNumber}</div>
                  <div className="muted" style={{ fontSize: "0.8rem" }}>
                    {o.items.length} item
                  </div>
                </td>
                <td>
                  <div>{o.customerName}</div>
                  <div className="muted" style={{ fontSize: "0.8rem" }}>
                    {o.customerEmail}
                  </div>
                </td>
                <td>{formatIdr(o.totalIdr)}</td>
                <td>{o.paymentStatus}</td>
                <td>{o.trackingNumber ?? "—"}</td>
                <td>
                  <span className="badge">{o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
