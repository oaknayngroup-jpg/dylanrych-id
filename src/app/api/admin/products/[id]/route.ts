import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  tagline: z.string().optional().nullable(),
  description: z.string().min(1),
  notesTop: z.string().optional().nullable(),
  notesHeart: z.string().optional().nullable(),
  notesBase: z.string().optional().nullable(),
  character: z.string().optional().nullable(),
  bpom: z.string().optional().nullable(),
  volumeMl: z.number().int().positive(),
  priceIdr: z.number().int().positive(),
  stock: z.number().int().min(0),
  imageFront: z.string().min(1),
  imageTilt: z.string().optional().nullable(),
  active: z.boolean(),
  sortOrder: z.number().int(),
});

type Ctx = { params: Promise<{ id: string }> };

function normalize(data: z.infer<typeof productSchema>) {
  return {
    name: data.name.trim(),
    slug: data.slug.trim(),
    tagline: data.tagline?.trim() || null,
    description: data.description.trim(),
    notesTop: data.notesTop?.trim() || null,
    notesHeart: data.notesHeart?.trim() || null,
    notesBase: data.notesBase?.trim() || null,
    character: data.character?.trim() || null,
    bpom: data.bpom?.trim() || null,
    volumeMl: data.volumeMl,
    priceIdr: data.priceIdr,
    stock: data.stock,
    imageFront: data.imageFront.trim(),
    imageTilt: data.imageTilt?.trim() || null,
    active: data.active,
    sortOrder: data.sortOrder,
  };
}

export async function PUT(request: Request, context: Ctx) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const json = await request.json();
  const parsed = productSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Data produk tidak valid", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const product = await prisma.product.update({
      where: { id },
      data: normalize(parsed.data),
    });
    return NextResponse.json(product);
  } catch (err) {
    console.error("[admin/products PUT]", err);
    return NextResponse.json({ error: "Gagal memperbarui produk" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: Ctx) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/products DELETE]", err);
    return NextResponse.json(
      { error: "Gagal menghapus (produk mungkin sudah ada di pesanan)" },
      { status: 400 },
    );
  }
}
