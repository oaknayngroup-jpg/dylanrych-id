import Image from "next/image";
import Link from "next/link";
import { formatIdr } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { DeleteProductButton } from "./delete-button";

export const dynamic = "force-dynamic";
export const metadata = { title: "Produk · Admin" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Produk</h1>
          <p className="muted">CRUD katalog · harga default Rp179.900 termasuk tester</p>
        </div>
        <Link href="/admin/products/new" className="btn btn-gold">
          Tambah produk
        </Link>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Produk</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <Image
                    src={p.imageFront}
                    alt={p.name}
                    width={48}
                    height={60}
                    style={{ objectFit: "cover", border: "1px solid var(--line)" }}
                  />
                  <div>
                    <div>{p.name}</div>
                    <div className="muted" style={{ fontSize: "0.8rem" }}>
                      /{p.slug}
                    </div>
                  </div>
                </div>
              </td>
              <td>{formatIdr(p.priceIdr)}</td>
              <td>{p.stock}</td>
              <td>
                <span className={p.active ? "badge" : "badge badge--off"}>
                  {p.active ? "Aktif" : "Nonaktif"}
                </span>
              </td>
              <td>
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                  <Link href={`/admin/products/${p.id}/edit`} className="btn btn-ghost">
                    Edit
                  </Link>
                  <DeleteProductButton id={p.id} name={p.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
