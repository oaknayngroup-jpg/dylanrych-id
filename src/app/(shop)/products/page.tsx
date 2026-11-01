import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Koleksi" };

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="page-shell">
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="section__head">
          <h2>Koleksi 4 aroma</h2>
          <p className="muted">
            Semua Extrait 35 ml · Rp179.900 · termasuk 1 tester per botol
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
  );
}
