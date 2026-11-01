/** Seed catalog — fallback when DB is unavailable (e.g. preview without env). */
export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  notesTop: string;
  notesHeart: string;
  notesBase: string;
  character: string;
  bpom: string;
  volumeMl: number;
  priceIdr: number;
  stock: number;
  imageFront: string;
  imageTilt: string;
  active: boolean;
  sortOrder: number;
};

export const CATALOG_PRICE_IDR = 179_900;

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: "catalog-the-lier",
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
    volumeMl: 35,
    priceIdr: CATALOG_PRICE_IDR,
    stock: 100,
    imageFront: "/products/lier-front.png",
    imageTilt: "/products/lier-tilt.png",
    active: true,
    sortOrder: 1,
  },
  {
    id: "catalog-aura-deja",
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
    volumeMl: 35,
    priceIdr: CATALOG_PRICE_IDR,
    stock: 100,
    imageFront: "/products/aura-deja-front.png",
    imageTilt: "/products/aura-deja-tilt.png",
    active: true,
    sortOrder: 2,
  },
  {
    id: "catalog-fatal-kiss",
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
    volumeMl: 35,
    priceIdr: CATALOG_PRICE_IDR,
    stock: 100,
    imageFront: "/products/fatal-kiss-front.png",
    imageTilt: "/products/fatal-kiss-tilt.png",
    active: true,
    sortOrder: 3,
  },
  {
    id: "catalog-venome",
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
    volumeMl: 35,
    priceIdr: CATALOG_PRICE_IDR,
    stock: 100,
    imageFront: "/products/venome-front.png",
    imageTilt: "/products/venome-tilt.png",
    active: true,
    sortOrder: 4,
  },
];
