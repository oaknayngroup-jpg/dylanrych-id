import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { CATALOG_PRODUCTS } from "@/lib/catalog";

export default function HomePage() {
  const products = CATALOG_PRODUCTS;

  return (
    <>
      <section className="hero" aria-label="Dylanrych hero">
        <div className="hero__media">
          <Image
            src="/products/venome-fatal-kiss-pair.png"
            alt="Dylanrych Extrait de Parfum"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero__veil" aria-hidden />
        </div>
        <div className="hero__content">
          <p className="hero__brand">
            Dylanrych<span>.id</span>
          </p>
          <h1 className="hero__headline">Empat aroma. Satu karakter.</h1>
          <p className="hero__support">
            Extrait de Parfum 35 ml — Rp179.900/pcs, sudah termasuk 1 tester.
          </p>
          <div className="hero__cta">
            <Link href="/products" className="btn btn-gold">
              Lihat koleksi
            </Link>
            <Link href="/products/the-lier" className="btn btn-outline">
              Mulai dari The Lier
            </Link>
          </div>
        </div>
      </section>

      <div className="page-shell">
        <section className="section">
          <div className="section__head">
            <h2>Koleksi aroma</h2>
            <p className="muted">
              The Lier · Aura Déjà · Fatal Kiss · Vénomé — ketahanan ~8–12 jam.
            </p>
          </div>
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                tagline={p.tagline}
                priceIdr={p.priceIdr}
                imageFront={p.imageFront}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
