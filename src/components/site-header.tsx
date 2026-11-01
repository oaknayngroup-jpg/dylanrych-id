"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-store";

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand-mark">
          <span className="brand-mark__name">Dylanrych</span>
          <span className="brand-mark__tld">.id</span>
        </Link>
        <nav className="site-nav" aria-label="Utama">
          <Link href="/products">Koleksi</Link>
          <Link href="/cart" className="cart-link">
            Keranjang{count > 0 ? <span className="cart-count">{count}</span> : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}
