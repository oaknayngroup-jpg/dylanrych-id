import Image from "next/image";
import Link from "next/link";
import { formatIdr } from "@/lib/format";

type ProductCardProps = {
  slug: string;
  name: string;
  tagline?: string | null;
  priceIdr: number;
  imageFront: string;
};

export function ProductCard({
  slug,
  name,
  tagline,
  priceIdr,
  imageFront,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <Link href={`/products/${slug}`} className="product-card__media">
        <Image
          src={imageFront}
          alt={name}
          width={640}
          height={800}
          className="product-card__image"
        />
      </Link>
      <div className="product-card__body">
        <h2>
          <Link href={`/products/${slug}`}>{name}</Link>
        </h2>
        {tagline ? <p className="muted">{tagline}</p> : null}
        <p className="price">{formatIdr(priceIdr)}</p>
        <p className="tester-note">Termasuk 1 tester</p>
      </div>
    </article>
  );
}
