import { CATALOG_PRODUCTS, type CatalogProduct } from "@/lib/catalog";

export type ShopProduct = CatalogProduct;

async function fromDb(): Promise<ShopProduct[] | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const { prisma } = await import("@/lib/prisma");
    const rows = await prisma.product.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    if (!rows.length) return null;
    return rows.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline ?? "",
      description: p.description,
      notesTop: p.notesTop ?? "",
      notesHeart: p.notesHeart ?? "",
      notesBase: p.notesBase ?? "",
      character: p.character ?? "",
      bpom: p.bpom ?? "",
      volumeMl: p.volumeMl,
      priceIdr: p.priceIdr,
      stock: p.stock,
      imageFront: p.imageFront,
      imageTilt: p.imageTilt ?? "",
      active: p.active,
      sortOrder: p.sortOrder,
    }));
  } catch {
    return null;
  }
}

export async function listShopProducts(): Promise<ShopProduct[]> {
  return (await fromDb()) ?? CATALOG_PRODUCTS;
}

export async function getShopProduct(slug: string): Promise<ShopProduct | null> {
  const fromDatabase = await fromDb();
  const list = fromDatabase ?? CATALOG_PRODUCTS;
  return list.find((p) => p.slug === slug && p.active) ?? null;
}
