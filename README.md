# Trailblazer

Trailblazer is a Next.js travel and itinerary planner featuring collaborative planning, budgets, maps, and offline-friendly experiences.

## Getting started

Trailblazer uses [pnpm](https://pnpm.io) via Node's Corepack. If you do not
already have it available, run `corepack enable` (bundled with recent Node
releases) or install it manually with `npm install -g pnpm`. You can also use
`npm` or `yarn` in a pinch—the scripts are cross-compatible.

```bash
# install dependencies (choose one)
corepack prepare pnpm@8.15.4 --activate && pnpm install
# or
npm install

# prepare the database
pnpm prisma generate
pnpm prisma db push
pnpm run seed

# start the app
pnpm dev
```

If you opted for `npm` or `yarn`, swap the `pnpm <command>` entries above for
`npm run <command>` / `yarn <command>` respectively.

```bash
pnpm install
pnpm prisma generate
pnpm prisma db push
pnpm run seed
pnpm dev
```

Create a `.env` file based on `.env.example`.

## Quick visual preview

If you just want to glimpse the landing experience without setting up the toolchain, open `public/preview.html` in any
modern browser. It mirrors the hero and feature highlights defined in `app/page.tsx`, making it easy to share a static
peek of Trailblazer directly from the repo.

## Feature overview

- Landing page with parallax hero and Framer Motion animations
- Auth with NextAuth (credentials + Google OAuth)
- Trips dashboard with weather snapshot, budgets, and saved places
- Itinerary board with drag-and-drop activities using dnd-kit
- Budget, places, packing, and docs tabs per trip
- Prisma ORM with SQLite (dev) and Postgres-ready schema
- Tailwind CSS + shadcn/ui inspired design system
- Weather, FX, and Mapbox integrations with graceful fallbacks when keys are missing
- Vitest unit tests for budgeting, itinerary reorder, and packing suggestions
- PWA manifest and offline-friendly layout stubs

## Scripts

- `pnpm dev` – run the development server
- `pnpm build` – build for production
- `pnpm start` – start production build
- `pnpm lint` – run Next.js lint rules
- `pnpm test` – run unit tests with Vitest
- `pnpm e2e` – placeholder for Playwright tests
- `pnpm typecheck` – TypeScript type checking
- `pnpm seed` – seed the database with demo trips

## Feature flags

Toggle optional features via environment variables:

- `NEXT_PUBLIC_AI_DESIGNER` – enable AI trip designer controls
- `NEXT_PUBLIC_WEATHER` – disable weather fetching when set to `false`
- `NEXT_PUBLIC_FX` – disable currency fetching when set to `false`
- `NEXT_PUBLIC_OCR` – enable document OCR actions

## Testing

```bash
pnpm test
```

Playwright scaffolding is ready via `pnpm e2e`.

## PWA

A basic PWA manifest is included. Configure service worker caching before production launch.
