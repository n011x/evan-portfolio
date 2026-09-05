# EVAN — Portfolio

Personal portfolio for systems, web and automation work.

**Live: [evancartex.com](https://evancartex.com)**

## About

«Собираю системы, веб и автоматизации — от разбора контекста до работающего продукта.»

RU prose, EN system labels. Every fact on the site is sourced; nothing is invented.
Where material is missing the page says so (`VISUAL PENDING`) instead of filling the gap.

## Projects

- **Lead Radar** — Telegram lead-search service (sources registry → dedup → model
  qualification → twice-daily digest)
- **Hermes** — AI agent, running in production
- **ROUTE** — interface mockup, in progress
- **LUMA English** — landing page for an online English school
- **ЯсноДом** — landing page

Case studies live at `/work/<slug>`; content is in `src/content/cases.ts`.

## Stack

| | |
|---|---|
| Framework | Next.js 16.3 (App Router, Turbopack), fully prerendered |
| Runtime | React 19.2 |
| Language | TypeScript 5.9, `strict` + `noUncheckedIndexedAccess` |
| Styling | Tailwind CSS 4.3 (`@theme inline`) over design tokens in `src/styles/tokens.css` |
| Images | `sharp` at build time (ordered dither, halftone, crops) |
| Package manager | pnpm 10.20 via corepack |
| QA | Playwright + system Chrome, axe-core, Lighthouse |

No animation library, no WebGL, no canvas, no runtime data fetching.

## Design system

- editorial information design — an index, not a landing page
- Registration Red as the single accent, one hue on two surfaces
- static typography: type is geometry, it is never distorted or animated
- animated distortion / fog field as the one large motion material
- restrained matte glass, 1–3% of surface
- responsive 320→1920, WCAG 2.2 AA, full `prefers-reduced-motion` fallback

[`docs/CANONICAL_STATE.md`](docs/CANONICAL_STATE.md) is the authoritative snapshot of the
project as it stands — current decisions, what is implemented, what is rejected, what is
still open. The reasoning behind it lives in
[`docs/VISUAL_LANGUAGE.md`](docs/VISUAL_LANGUAGE.md),
[`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) and
[`docs/INFORMATION_ARCHITECTURE.md`](docs/INFORMATION_ARCHITECTURE.md).

## Development

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
```

QA scripts run against a production server (`pnpm start --port 3112`), `BASE` overrides
the origin:

| script | proves |
|---|---|
| `scripts/stage6-responsive.mjs` | zero horizontal overflow, no console errors, 320→1920 |
| `scripts/stage6-a11y.mjs` | axe-core WCAG 2.2 A/AA, keyboard order, focus rings, target sizes |
| `scripts/stage6-reveal-check.mjs` | every `[data-reveal]` fires at human scroll speed |
| `scripts/stage6-fieldmetrics.mjs` | measured LCP / CLS / INP under real throttling |
| `scripts/motion-check.mjs` | motion pauses when hidden, reduced-motion kills it, 0px drift |
| `scripts/link-check.mjs` | every internal link resolves |

## Configuration

One build-time variable, because every route is prerendered:

```
NEXT_PUBLIC_SITE_URL=https://your-domain
```

It drives canonical URLs, Open Graph URLs, `sitemap.xml` and `robots.txt`. Without it the
build falls back to `http://localhost:3000`. See `.env.example`.

## Production

`next.config.ts` sets `output: "standalone"`.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain pnpm build
cp -R public .next/standalone/public
cp -R .next/static .next/standalone/.next/static
node .next/standalone/server.js
```

Or with Docker — non-root user, healthcheck, published to `127.0.0.1` only, so put a
TLS-terminating reverse proxy in front:

```bash
docker compose build --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain
docker compose up -d
```

Security headers are set for every route in `next.config.ts`: CSP, HSTS, `Referrer-Policy`,
`X-Content-Type-Options`, `X-Frame-Options: DENY`, COOP/CORP and a deny-all
`Permissions-Policy`; `poweredByHeader` is off. `script-src` allows `'unsafe-inline'`
because the site is static and a nonce policy would force per-request rendering — there is
no third-party script, no remote font and no `eval`. No secrets reach the frontend: the one
environment variable is a public URL.

## Deployment

Production runs on a VPS as a systemd service behind Caddy, which terminates TLS and
reverse-proxies to the application on loopback:

```
Caddy :80/:443  →  reverse_proxy 127.0.0.1:3000  →  evan-portfolio.service (Next.js standalone)
```

`www` redirects permanently to the apex. The application never listens publicly. Releases
are immutable `releases/<sha>` directories with a `current` symlink, so a rollback is
repointing the symlink and restarting.

Verify a deployment against its public origin:

```bash
node scripts/launch-gate.mjs https://evancartex.com
```

It checks TLS, the plain-HTTP redirect, every route, the security headers on the real
response, and that no `localhost` leaked into the build — the failure mode that is
invisible until someone reads the page source.

The Docker path in this repository still works and is kept as an alternative; production
uses systemd because that is the convention the host already runs.

## Status

Released. `docs/CANONICAL_STATE.md` is the authoritative snapshot.
