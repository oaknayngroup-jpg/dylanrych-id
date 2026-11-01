import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "../../product-form";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  return { title: product ? `Edit ${product.name}` : "Edit produk" };
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <>
      <h1>Edit {product.name}</h1>
      <p className="muted" style={{ marginBottom: "1.5rem" }}>
        /{product.slug}
      </p>
      <ProductForm
        productId={product.id}
        initial={{
          name: product.name,
          slug: product.slug,
          tagline: product.tagline ?? "",
          description: product.description,
          notesTop: product.notesTop ?? "",
          notesHeart: product.notesHeart ?? "",
          notesBase: product.notesBase ?? "",
          character: product.character ?? "",
          bpom: product.bpom ?? "",
          volumeMl: product.volumeMl,
          priceIdr: product.priceIdr,
          stock: product.stock,
          imageFront: product.imageFront,
          imageTilt: product.imageTilt ?? "",
          active: product.active,
          sortOrder: product.sortOrder,
        }}
      />
    </>
  );
}
