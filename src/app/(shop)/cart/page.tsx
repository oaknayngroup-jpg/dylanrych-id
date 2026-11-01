"use client";

import Image from "next/image";
import Link from "next/link";
import { formatIdr } from "@/lib/format";
import { useCart } from "@/lib/cart-store";

export default function CartPage() {
  const { items, setQuantity, removeItem, subtotalIdr, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="page-shell cart-empty">
        <h1
          style={{
            fontFamily: "var(--font-display), serif",
            fontSize: "2.4rem",
            fontWeight: 500,
            marginBottom: "0.75rem",
          }}
        >
          Keranjang kosong
        </h1>
        <p className="muted" style={{ marginBottom: "1.5rem" }}>
          Pilih aroma dari koleksi untuk mulai.
        </p>
        <Link href="/products" className="btn btn-gold">
          Lihat koleksi
        </Link>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="admin-toolbar">
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "2.4rem",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Keranjang
          </h1>
          <p className="muted">Checkout Midtrans & ongkir JNT menyusul di fase berikutnya.</p>
        </div>
        <button type="button" className="btn btn-ghost" onClick={clear}>
          Kosongkan
        </button>
      </div>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Produk</th>
            <th>Harga</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.productId}>
              <td>
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
                  <Image
                    src={item.imageFront}
                    alt={item.name}
                    width={64}
                    height={80}
                    style={{ objectFit: "cover", border: "1px solid var(--line)" }}
                  />
                  <div>
                    <Link href={`/products/${item.slug}`}>{item.name}</Link>
                    <p className="tester-note" style={{ margin: "0.25rem 0 0" }}>
                      + 1 tester
                    </p>
                  </div>
                </div>
              </td>
              <td>{formatIdr(item.priceIdr)}</td>
              <td>
                <input
                  className="qty-input"
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    setQuantity(item.productId, Number(e.target.value) || 1)
                  }
                />
              </td>
              <td>{formatIdr(item.priceIdr * item.quantity)}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => removeItem(item.productId)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "1.75rem",
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <p>
          Subtotal <strong className="price">{formatIdr(subtotalIdr)}</strong>
        </p>
        <button type="button" className="btn btn-gold" disabled title="Checkout fase berikutnya">
          Checkout (segera)
        </button>
      </div>
    </div>
  );
}
