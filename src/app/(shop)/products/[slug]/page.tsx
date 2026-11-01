import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatIdr } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Produk" };
  return { title: product.name, description: product.description };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product || !product.active) notFound();

  return (
    <div className="page-shell">
      <p className="muted" style={{ marginBottom: "1.25rem" }}>
        <Link href="/products">← Koleksi</Link>
      </p>
      <div className="product-detail">
        <div className="product-detail__media">
          <Image
            src={product.imageFront}
            alt={product.name}
            width={900}
            height={1120}
            priority
          />
        </div>
        <div className="product-detail__copy">
          <h1>{product.name}</h1>
          {product.tagline ? <p className="muted">{product.tagline}</p> : null}
          <p className="price" style={{ fontSize: "1.35rem", marginTop: "1rem" }}>
            {formatIdr(product.priceIdr)}
          </p>
          <p className="tester-note">Termasuk 1 tester · {product.volumeMl} ml Extrait</p>
          <p style={{ marginTop: "1.25rem", lineHeight: 1.65 }}>{product.description}</p>
          {product.character ? (
            <p className="muted" style={{ marginTop: "0.75rem" }}>
              Karakter: {product.character}
            </p>
          ) : null}

          <ul className="notes-list">
            {product.notesTop ? (
              <li>
                <strong>Top</strong>
                <span>{product.notesTop}</span>
              </li>
            ) : null}
            {product.notesHeart ? (
              <li>
                <strong>Heart</strong>
                <span>{product.notesHeart}</span>
              </li>
            ) : null}
            {product.notesBase ? (
              <li>
                <strong>Base</strong>
                <span>{product.notesBase}</span>
              </li>
            ) : null}
          </ul>

          {product.bpom ? (
            <p className="muted" style={{ fontSize: "0.85rem" }}>
              BPOM {product.bpom}
            </p>
          ) : null}

          <div style={{ marginTop: "1.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <AddToCartButton
              productId={product.id}
              slug={product.slug}
              name={product.name}
              priceIdr={product.priceIdr}
              imageFront={product.imageFront}
            />
            <Link href="/cart" className="btn btn-outline">
              Lihat keranjang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
