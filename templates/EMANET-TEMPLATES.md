# Emanet — Reliable Project Templates

A curated stable of **battle-tested, permissively-licensed starter templates** so we
build new client work fast without reinventing the base. Every pick below was
verified live against the GitHub API on **2026-06-30**: license, star count, and
last-commit date are real, not from memory.

**Rule:** the only thing that matters is **can we sell it in a closed, paid
product?** All picks below can — they're **permissive** (MIT / Apache-2.0 / BSD).

**License cheat-sheet (the only call that matters when selling):**

| Color | Licenses | What it means for selling |
|-------|----------|---------------------------|
| 🟢 **Ship it** | MIT, Apache-2.0, BSD, ISC, MPL-2.0 | Sell closed-source, no source disclosure, no attribution headaches. Use freely. |
| 🟡 **Careful** | GPL | You *can* sell, but **distributing** the binary forces you to hand over source. SaaS-only (no distribution) escapes it. Fine for internal/SaaS, risky for code you ship to a client. |
| 🔴 **Avoid for paid products** | AGPL, SSPL, BSL, Commons-Clause | AGPL forces source disclosure **even for SaaS users**. BSL/SSPL/Commons-Clause restrict or forbid commercial resale outright. Only touch these if you buy their commercial license. |

Everything in this catalog is 🟢. The "rejected" section flags the 🔴 ones so you
don't grab one by accident.

> How to read "Last commit": anything within the last ~2 months is actively
> maintained. Stale-but-stable picks are noted.

---

## TL;DR — pick by what the client needs

| Client asks for…                  | Grab this                                      | License |
|-----------------------------------|------------------------------------------------|---------|
| Online shop / webshop             | `medusajs/medusa` + `nextjs-starter-medusa`    | MIT     |
| Simple storefront on any backend  | `vercel/commerce`                              | MIT     |
| All-in-one shop, no custom code   | `bagisto/bagisto`                              | MIT     |
| SaaS (login + billing + tenants)  | `ixartz/SaaS-Boilerplate`                      | MIT     |
| General typesafe web app          | `t3-oss/create-t3-app`                          | MIT     |
| Admin / internal dashboard        | `satnaing/shadcn-admin`                        | MIT     |
| Marketing / landing site (fast)   | `arthelokyo/astrowind` (Astro)                 | MIT     |
| Blog / content site               | `timlrx/tailwind-nextjs-starter-blog`          | MIT     |
| AI chatbot / assistant            | `vercel/ai-chatbot`                            | Apache-2.0 |
| Python API + full-stack backend   | `fastapi/full-stack-fastapi-template`          | MIT     |
| Cross-platform mobile             | `obytes/react-native-template-obytes` (Expo)   | MIT     |
| Native Android (Kotlin/Compose)   | `android/nowinandroid` (reference)             | Apache-2.0 |

Maps onto our five nodes: Node 02 (Software) → web/SaaS/shop/dashboard/landing/mobile,
Node 01 (AI) → AI chatbot, Node 03 (Data) → FastAPI backend.

---

## 1. Webshop / E-commerce

| Pick | Repo | License | Stars | Last commit | Stack |
|------|------|---------|-------|-------------|-------|
| **Headless commerce (recommended)** | `medusajs/medusa` | MIT | 34.8k | 2026-06-30 | Node/TS backend, modular, plugins |
| ↳ storefront for it | `medusajs/nextjs-starter-medusa` | MIT | 2.8k | 2026-04-23 | Next.js |
| Lightweight storefront | `vercel/commerce` | MIT | 14.1k | 2026-06-10 | Next.js, swap any commerce backend |
| All-in-one (admin+shop) | `bagisto/bagisto` | MIT | 27.6k | 2026-06-30 | Laravel/PHP, full ERP-ish |

- **Default:** Medusa backend + the Next.js storefront — most flexible, TS, matches our stack.
- `vercel/commerce` when the client already has a commerce backend (Shopify, etc.) and just needs a fast modern front.
- `bagisto` when they want everything out of the box and don't care about JS.

```bash
# Medusa (backend + storefront)
npx create-medusa-app@latest my-shop
# or just the storefront
npx degit medusajs/nextjs-starter-medusa my-storefront

# Vercel Commerce storefront
npx degit vercel/commerce my-shop
```

## 2. SaaS app (auth, billing, multi-tenant)

| Pick | Repo | License | Stars | Last commit | Stack |
|------|------|---------|-------|-------------|-------|
| **Recommended** | `ixartz/SaaS-Boilerplate` | MIT | 7.2k | 2026-06-30 | Next.js, Tailwind, Shadcn, Drizzle, auth, Stripe, i18n |
| Multi-tenant focus | `nextacular/nextacular` | MIT | 1.4k | 2026-05-30 | Next.js, Prisma, Stripe, workspaces |

> Note: the old `vercel/nextjs-subscription-payments` (Supabase+Stripe) is **archived** — don't start new work on it. Use the above.

```bash
npx degit ixartz/SaaS-Boilerplate my-saas
```

## 3. General full-stack web app (typesafe starter)

| Pick | Repo | License | Stars | Last commit | Stack |
|------|------|---------|-------|-------------|-------|
| **Recommended** | `t3-oss/create-t3-app` | MIT | 29.0k | 2025-12-13 | Next.js + tRPC + Prisma + Tailwind + Auth (pick-your-pieces) |
| Boilerplate | `ixartz/Next-js-Boilerplate` | MIT | 13.0k | 2026-06-01 | Next.js App Router, testing, CI baked in |
| Enterprise-grade | `Blazity/next-enterprise` | MIT | 7.4k | 2026-06-27 | Next.js, strict tooling, Storybook, e2e |

```bash
npm create t3-app@latest my-app          # interactive, choose tRPC/Prisma/auth
# or
npx degit ixartz/Next-js-Boilerplate my-app
```

## 4. Admin / internal dashboard

| Pick | Repo | License | Stars | Last commit | Stack |
|------|------|---------|-------|-------------|-------|
| **Recommended** | `satnaing/shadcn-admin` | MIT | 12.5k | 2026-06-16 | Vite + React + Shadcn, very clean |
| Next.js version | `TailAdmin/free-nextjs-admin-dashboard` | MIT | 2.5k | 2026-04-28 | Next.js + Tailwind |
| With DB + auth wired | `vercel/nextjs-postgres-nextauth-tailwindcss-template` | MIT | 1.6k | 2026-01-15 | Next.js + Postgres + NextAuth |

```bash
npx degit satnaing/shadcn-admin my-dashboard
```

## 5. Marketing / landing site

| Pick | Repo | License | Stars | Last commit | Stack |
|------|------|---------|-------|-------------|-------|
| **Fast static (recommended)** | `arthelokyo/astrowind` | MIT | 5.8k | 2026-06-04 | Astro v6 + Tailwind v4 — ships near-zero JS |
| Next.js portfolio/agency | `magicuidesign/portfolio` | MIT | 1.4k | 2026-01-13 | Next.js + Shadcn + Magic UI |
| Clean Next.js base | `heroui-inc/next-app-template` | MIT | 0.4k | 2026-06-17 | Next.js 16 + HeroUI + Tailwind |

- Astro is the lazy win for marketing pages — same "fast static" approach as our MoStay build, better Lighthouse than Next for content-only sites.

```bash
npm create astro@latest -- --template arthelokyo/astrowind my-site
```

## 6. Blog / content site

| Pick | Repo | License | Stars | Last commit | Stack |
|------|------|---------|-------|-------------|-------|
| **Recommended** | `timlrx/tailwind-nextjs-starter-blog` | MIT | 10.5k | 2026-02-08 | Next.js + Tailwind + MDX, RSS/SEO/analytics done |

```bash
npx degit timlrx/tailwind-nextjs-starter-blog my-blog
```

## 7. AI app / chatbot  (Node 01)

| Pick | Repo | License | Stars | Last commit | Stack |
|------|------|---------|-------|-------------|-------|
| **Recommended** | `vercel/ai-chatbot` | **Apache-2.0** | 20.6k | 2026-05-18 | Next.js + Vercel AI SDK, streaming, tools, auth, persistence |

- Apache-2.0 — 🟢 sell closed-source freely (Apache just asks you keep the LICENSE/NOTICE file in the repo). The one everyone forks; no reason to look elsewhere.
- Built on the **Vercel AI SDK** (`vercel/ai`) — swap models via the AI Gateway (`"provider/model"` strings) instead of provider-locked packages.

```bash
npx degit vercel/ai-chatbot my-ai-app
```

## 8. Python API + full-stack backend  (Node 03 / data)

| Pick | Repo | License | Stars | Last commit | Stack |
|------|------|---------|-------|-------------|-------|
| **Recommended** | `fastapi/full-stack-fastapi-template` | MIT | 44.0k | 2026-06-30 | FastAPI + SQLModel + Postgres + React + Docker + JWT auth |

- The reference full-stack Python setup. Maintained by the FastAPI author. Great for data/AI backends where we want Python, not a JS server.

```bash
npx degit fastapi/full-stack-fastapi-template my-api
# (or "Use this template" on GitHub — it's a template repo)
```

## 9. Mobile

| Pick | Repo | License | Stars | Last commit | Stack |
|------|------|---------|-------|-------------|-------|
| **Cross-platform (recommended)** | `obytes/react-native-template-obytes` | MIT | 4.2k | 2026-06-02 | Expo + TS + Tailwind(nativewind) + forms + i18n + tests |
| Native Android reference | `android/nowinandroid` | **Apache-2.0** | 21.4k | 2026-06-26 | Kotlin + Jetpack Compose, Google's reference architecture |

- For most client apps, **Expo** (one codebase → iOS+Android) beats native — start from obytes.
- When it must be **native Android** (our Classroom 2.0 stack: Kotlin/Compose), use `nowinandroid` as the architecture reference. Apache-2.0 (🟢 sellable). It's a reference app, not a fill-in template — copy the structure, not the whole repo.

```bash
# Cross-platform
npx create-expo-app@latest my-app -e with-router   # or clone the obytes template:
git clone https://github.com/obytes/react-native-template-obytes my-app
```

---

## Extra options now in play (you don't care about MIT specifically)

🟢 Permissive, fully sellable — were only skipped earlier for not being MIT:

| Repo | License | Stars | What |
|------|---------|-------|------|
| `Saleor/saleor` | BSD-3 | 23.0k | Headless commerce API (Python/GraphQL) — heavyweight alt to Medusa |
| `spree/spree` | BSD-3 | 15.5k | Ruby on Rails e-commerce, B2B/marketplace |

## 🔴 Still avoid for paid products

You *can technically* sell these, but the license forces source disclosure or
restricts resale — only worth it if you buy their commercial license:

| Repo | License | Why it bites |
|------|---------|--------------|
| `calcom/cal.com` | AGPL-3.0 | SaaS users can demand your source. Has a paid commercial license if you need it. |
| `documenso/documenso` | AGPL-3.0 | Same AGPL trap. |
| `nextcloud/server` | AGPL-3.0 | Same. |

## Dropped for staleness / archive (not license)

| Repo | Reason |
|------|--------|
| `vercel/nextjs-subscription-payments` | **archived** Jan 2025 |
| `mickasmt/next-saas-stripe-starter` | stale (2024-08) — `ixartz/SaaS-Boilerplate` is the live equivalent |
| `horizon-ui`, `steven-tey/precedent`, `Buuntu/fastapi-react` | stale / low maintenance |

---

## Scaffold helper

`emanet-new.sh` (in this folder) clones any pick by short key into a fresh dir
with git history stripped:

```bash
./emanet-new.sh saas my-client-app     # → SaaS-Boilerplate
./emanet-new.sh shop my-client-shop    # → Medusa storefront
./emanet-new.sh ./emanet-new.sh        # no args → prints all keys
```

*Catalog verified 2026-06-30. Re-check star/commit freshness in ~6 months — run the
verify script in `outputs/check.sh` against the same repo list.*
