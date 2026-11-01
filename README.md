# Dylanrych.id — toko parfum + super admin

Custom Next.js shop for **Dylanrych.id**: 4 Extrait de Parfum aromas, Midtrans Snap (stub), JNT shipping (stub), and a super-admin panel.

## Stack

- **Next.js 15** (App Router) + TypeScript + Tailwind CSS v4
- **Prisma** + **SQLite** for local demo (Postgres-ready — switch provider for Vercel)
- Admin auth: signed HTTP-only cookie (jose + bcrypt)
- Payments: Midtrans Snap client stub (`src/lib/midtrans.ts`)
- Shipping: JNT ongkir/booking stub (`src/lib/jnt.ts`)

## Catalog (seeded)

| Product     | Price      | Notes                                      |
|-------------|------------|--------------------------------------------|
| The Lier    | Rp179.900  | Sweet Tobacco / Warm Amber / Vanilla       |
| Aura Déjà   | Rp179.900  | Citrus / Jasmine / Woody+Patchouli         |
| Fatal Kiss  | Rp179.900  | Dark Vanilla / Ambroxan / Tonka            |
| Vénomé      | Rp179.900  | Jasmine noir / Honeyed oud / Musk          |

Every purchase includes **1 tester** (not a separate SKU).

## Local setup

```bash
cp .env.example .env
npm install
npm run db:push      # create SQLite schema
npm run db:seed      # 4 products + super admin
npm run dev
```

Open:

- Shop: http://localhost:3000
- Admin: http://localhost:3000/admin  
  Default seed login: `admin@dylanrych.id` / `dylanrych-admin-change-me`

### Useful scripts

| Script            | Purpose                          |
|-------------------|----------------------------------|
| `npm run dev`     | Next.js dev server               |
| `npm run build`   | Production build                 |
| `npm run db:push` | Push Prisma schema (no migrate)  |
| `npm run db:seed` | Seed products + admin            |
| `npm run db:studio` | Prisma Studio                  |

## Environment variables

See `.env.example`. Important:

- `DATABASE_URL` — SQLite file locally; Postgres URL in production
- `AUTH_SECRET` — cookie signing secret
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — used only by seed
- `MIDTRANS_*` — optional for now (stubs return fake Snap tokens)
- `JNT_*` — optional for now (stubs return flat ongkir + fake AWB)

## Project layout

```
src/app/(shop)/     # public landing, products, cart
src/app/admin/      # super admin (protected)
src/app/api/        # auth + product CRUD
src/lib/            # prisma, auth, midtrans, jnt, cart
prisma/             # schema + seed
public/products/    # aroma images
```

## Deploy on Vercel

1. Push this repo and import in Vercel (framework: Next.js).
2. Create a Postgres DB (Neon or Supabase) and set `DATABASE_URL`.
3. In `prisma/schema.prisma`, change `provider = "sqlite"` → `"postgresql"`.
4. Set env vars from `.env.example` (`AUTH_SECRET`, admin seed vars, Midtrans/JNT when ready).
5. Build command can stay default; add a post-build or Vercel deploy hook to run:
   ```bash
   npx prisma db push && npm run db:seed
   ```
   (or use migrations once you lock the schema).
6. Point **dylanrych.id** DNS (Hostinger) to Vercel — Hostinger stays DNS/email only; the app runs on Vercel.

## Current scope (this PR)

- Scaffold + DB models + seed
- Public landing / product list & detail / cart shell
- Admin login + product CRUD + orders/promos/reports placeholders
- Midtrans + JNT stubs with clear TODOs

**Not yet:** live Midtrans checkout, JNT booking after settlement, promo CRUD UI, CSV export.

## Brand / contact

- info@dylanrych.id · WA 6285171172193
- Marketplace: [Tokopedia Dylanrych.Id](https://www.tokopedia.com/dylanrychid)
