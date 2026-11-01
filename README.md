# Dylanrych.id — toko parfum + super admin

Custom Next.js shop for **Dylanrych.id**: 4 Extrait de Parfum aromas, Midtrans Snap (stub), JNT shipping (stub), and a super-admin panel.

## Stack

- **Next.js 15** (App Router) + TypeScript + Tailwind CSS v4
- **Prisma** + **PostgreSQL** (Neon / Prisma Postgres / Vercel Postgres / Supabase)
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
# Option A — temporary Postgres (no signup, ~24h unless claimed):
npx create-db@latest
# paste the connection string into DATABASE_URL in .env

# Option B — Neon / Supabase / Vercel Postgres connection string in .env

npm install
npx prisma db push
npm run db:seed
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

- `DATABASE_URL` — Postgres connection string (required)
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

### One-time (GitHub → Vercel)

1. Import **oaknayngroup-jpg/dylanrych-id** in [Vercel](https://vercel.com/new) (framework: Next.js).
2. Create Postgres (recommended: [Neon](https://neon.tech) free, or Prisma Postgres / Vercel Postgres).
3. In Vercel → Project → Settings → Environment Variables, set:
   - `DATABASE_URL` = Postgres URL (`?sslmode=require`)
   - `AUTH_SECRET` = long random string
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` (for seed)
   - `NEXT_PUBLIC_SITE_URL` = `https://YOUR-PROJECT.vercel.app` (later `https://dylanrych.id`)
4. Deploy. Then from your machine (with the same `DATABASE_URL`):
   ```bash
   npx prisma db push
   npm run db:seed
   ```
5. **Hostinger DNS** (later, when going live on dylanrych.id):
   - Keep Hostinger for DNS + email only
   - In Vercel → Domains → add `dylanrych.id` + `www`
   - At Hostinger DNS: point A/CNAME records as Vercel instructs
   - Do **not** try to host Next.js on Hostinger Premium shared

### CLI without Vercel account (temporary preview)

```bash
# Needs DATABASE_URL + AUTH_SECRET in env (or .env)
npx vercel deploy --temporary --yes \
  --env DATABASE_URL="$DATABASE_URL" \
  --env AUTH_SECRET="$AUTH_SECRET" \
  --build-env DATABASE_URL="$DATABASE_URL" \
  --build-env AUTH_SECRET="$AUTH_SECRET"
```

Claim the printed claim URL to keep the deployment (otherwise it expires).

## Current scope

- Scaffold + DB models + seed
- Public landing / product list & detail / cart shell
- Admin login + product CRUD + orders/promos/reports placeholders
- Midtrans + JNT stubs with clear TODOs
- Postgres + Vercel deploy path

**Not yet:** live Midtrans checkout, JNT booking after settlement, promo CRUD UI, CSV export.

## Brand / contact

- info@dylanrych.id · WA 6285171172193
- Marketplace: [Tokopedia Dylanrych.Id](https://www.tokopedia.com/dylanrychid)
