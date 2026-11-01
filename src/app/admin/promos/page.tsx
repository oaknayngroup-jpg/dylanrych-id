import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Promo · Admin" };

export default async function AdminPromosPage() {
  const promos = await prisma.promo.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Promo</h1>
          <p className="muted">
            Placeholder — CRUD kode diskon (% / nominal, masa berlaku, min belanja) di fase
            berikutnya.
          </p>
        </div>
      </div>

      {promos.length === 0 ? (
        <div className="panel">
          <p style={{ margin: 0 }}>
            Belum ada promo. Model <code>Promo</code> sudah siap di database.
          </p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Tipe</th>
              <th>Nilai</th>
              <th>Min belanja</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {promos.map((p) => (
              <tr key={p.id}>
                <td>{p.code}</td>
                <td>{p.discountType}</td>
                <td>{p.discountValue}</td>
                <td>{p.minSpendIdr}</td>
                <td>
                  <span className={p.active ? "badge" : "badge badge--off"}>
                    {p.active ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
