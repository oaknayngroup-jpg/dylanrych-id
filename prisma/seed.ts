import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const PRICE = 179_900;

const products = [
  {
    slug: "the-lier",
    name: "The Lier",
    tagline: "Sweet Tobacco · Warm Amber · Vanilla",
    description:
      "Manipulatif, memikat, bermain peran. Extrait de Parfum 35 ml dengan ketahanan ~8–12 jam. Setiap pembelian termasuk 1 tester.",
    notesTop: "Sweet Tobacco",
    notesHeart: "Warm Amber",
    notesBase: "Vanilla, Spicy Leather",
    character: "Manipulatif, memikat, bermain peran",
    bpom: "NA18250604384",
    imageFront: "/products/lier-front.png",
    imageTilt: "/products/lier-tilt.png",
    sortOrder: 1,
  },
  {
    slug: "aura-deja",
    name: "Aura Déjà",
    tagline: "Citrus · Jasmine · Woody Patchouli",
    description:
      "Misterius, diam tapi membekas. Extrait de Parfum 35 ml dengan ketahanan ~8–12 jam. Setiap pembelian termasuk 1 tester.",
    notesTop: "Citrus",
    notesHeart: "Jasmine",
    notesBase: "Woody, Patchouli",
    character: "Misterius, diam tapi membekas",
    bpom: "NA18250604376",
    imageFront: "/products/aura-deja-front.png",
    imageTilt: "/products/aura-deja-tilt.png",
    sortOrder: 2,
  },
  {
    slug: "fatal-kiss",
    name: "Fatal Kiss",
    tagline: "Dark Vanilla · Ambroxan · Tonka",
    description:
      "Sensualitas yang tak terelakkan. Extrait de Parfum 35 ml dengan ketahanan ~8–12 jam. Setiap pembelian termasuk 1 tester.",
    notesTop: "Dark Vanilla",
    notesHeart: "Ambroxan",
    notesBase: "Tonka Bean",
    character: "Sensualitas / sexy",
    bpom: "NA18250604383",
    imageFront: "/products/fatal-kiss-front.png",
    imageTilt: "/products/fatal-kiss-tilt.png",
    sortOrder: 3,
  },
  {
    slug: "venome",
    name: "Vénomé",
    tagline: "Jasmine noir · Honeyed oud · Musk",
    description:
      "Provokatif, sensual tak terkontrol. Extrait de Parfum 35 ml dengan ketahanan ~8–12 jam. Setiap pembelian termasuk 1 tester.",
    notesTop: "Jasmine noir",
    notesHeart: "Honeyed oud",
    notesBase: "Musk sensual",
    character: "Provokatif, sensual tak terkontrol",
    bpom: "NA18250604380",
    imageFront: "/products/venome-front.png",
    imageTilt: "/products/venome-tilt.png",
    sortOrder: 4,
  },
];

async function main() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        ...p,
        priceIdr: PRICE,
        volumeMl: 35,
        active: true,
        stock: 100,
      },
      create: {
        ...p,
        priceIdr: PRICE,
        volumeMl: 35,
        active: true,
        stock: 100,
      },
    });
  }

  const email = process.env.ADMIN_EMAIL ?? "admin@dylanrych.id";
  const password = process.env.ADMIN_PASSWORD ?? "dylanrych-admin-change-me";
  const name = process.env.ADMIN_NAME ?? "Dylanrych Super Admin";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { name, passwordHash, role: "SUPER_ADMIN" },
    create: { email, name, passwordHash, role: "SUPER_ADMIN" },
  });

  console.log(`Seeded ${products.length} products @ Rp${PRICE.toLocaleString("id-ID")}`);
  console.log(`Super admin: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
