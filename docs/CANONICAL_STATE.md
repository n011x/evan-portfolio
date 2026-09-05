# CANONICAL STATE

**The single authoritative snapshot of this project as it exists now.**

Last synchronised: 2026-09-05, after Stage 6 and the public GitHub baseline.

This file describes what **is**, not what is planned. Where any other document in `docs/`
disagrees with this one, this one wins and the other document is wrong and must be fixed.
Anything listed under §9 REJECTED is closed and may not return without a new decision.

---

## 1. WHERE THE PROJECT STANDS

A personal portfolio, fully prerendered, self-hostable. Seven routes, five projects, five
case studies, no runtime data fetching, no animation library, no WebGL, no canvas.

| | |
|---|---|
| Stages complete | 1, 2, 2.5, 3, 4, 5, 6 |
| Stage in scope next | 6.1 (see §10) — **not started, awaiting approval of this file** |
| Repository | `n011x/evan-portfolio`, public |
| Branch | `main` |
| Baseline commit | `6a9e09e feat: establish portfolio production baseline` |
| Blocking for launch | production domain (`NEXT_PUBLIC_SITE_URL`) |

### What each completed stage actually produced

| stage | outcome |
|---|---|
| 1 | Concept INDEX & FOG, information architecture, content sourcing rules, the no-invention rule |
| 2 | Design tokens, 12-column grid, type roles, structural homepage in paper/ink/graphite/gray only |
| 2.5 | Art direction resolved in Figma: Registration Red, scan-window distortion primitive, fog-field motion, HERO_B and STATEMENT_A selected. Figma is closed; the code is now the source of truth |
| 3 | Full visual pass: fog field, ASCII sculpture, dot-matrix numerals, halftone/dither media pipeline, matte glass, grain, registration marks |
| 4 | Motion: CSS keyframes on transform/opacity only, `MotionGate` (visibility + reduced-motion), `Reveal` (IntersectionObserver), media processed→clean wipe |
| 5 | `/work` archive and `/work/[slug]` case template, five case studies, `caseRoutesEnabled = true` |
| 6 | Responsive 320→1920, WCAG 2.2 AA, performance, SEO/OG/sitemap/JSON-LD, security headers, standalone + Docker production path |

---

## 2. CANONICAL VISUAL DECISIONS

These are settled. They are implemented in code and must not be reopened casually.

### Concept

**INDEX & FOG.** INDEX (~70%) carries 100% of the information: hairline rules, a visible
column grid, section IDs, key/value metadata, counters, status strings, registration
marks, node diagrams. FOG (~20%) carries zero information and can be removed without
losing a fact. DISTORTION (~10%) is the rare computational moment.

Character, after the Stage 2.5 amendment: **DIGITAL NEWSPAPER × EDITORIAL INDEX ×
ATMOSPHERIC FOG × CONTROLLED DISTORTION × VERY LIMITED MATTE GLASS.**

70/20/10 is a **global** ratio measured across the whole site, never a per-section budget.
Density comes from alternation between dense and near-empty bands, never from averaging.

### Accent — REGISTRATION RED

One hue, two surface values. This replaced Ultramarine `#2C2BE8` at Stage 2.5.

| surface | token | value | contrast |
|---|---|---|---|
| light | `--accent` | `#CC2E24` | 4.67:1 on `--paper` |
| dark | `--accent-on-dark` | `#FF6B5E` | 6.80:1 on `--night` |
| selection | `--accent-mark` | `rgba(204,46,36,0.14)` | — |

Red is rare: a diagram node, a project marker, a 1px rule, a status signal, a registration
mark, the focus ring, text selection. Never a large fill, a red heading, a gradient or a
glow. Never a second accent.

### Typography is static geometry

**DISTORTION CHANGES THE MATERIAL OF TYPOGRAPHY, NEVER ITS METRICS.** Baseline, kerning,
glyph positions, word width and silhouette stay exactly as set.

Forbidden, permanently: per-letter displacement, character distortion, animated tracking,
baseline shifts, scale or stretch animation, kinetic typography. No letter ever falls out
of line. Body copy is never distorted.

Permitted: a whole word rendered as a different material (dot matrix, ordered dither,
halftone), or a **SCAN WINDOW** — a soft-edged rectangle crossing a clean word, changing
only the rendering inside it, implemented as a clipped duplicate masked by the same text.

Homepage budget: 3–5 distortion events on the whole page. The largest display typography
stays predominantly clean.

Type set: **Inter Tight** (display + text, Cyrillic) + **IBM Plex Mono** (micro, Cyrillic),
both self-hosted via `next/font`, `display: swap`, latin + cyrillic subsets. Pixel type is
a CSS dot-matrix mask (`.pixel`), script-independent — no bitmap font.

### Distortion / fog field — the one large motion motif

`DistortionField`, six variants, each two masked masses that cross-fade plus a light
volume. CSS radial gradients inside an irregular `mask-image`, blurred. Not a new object:
it is the same fog material, moving.

| variant | tone | blur | used by |
|---|---|---|---|
| `hero` | 0.20 | 110px | hero — the intensity ceiling for the whole site |
| `work` | 0.11 | 100px | selected-work bands |
| `route` | 0.13 | 90px | ROUTE |
| `media` | 0.09 | 90px | media bands |
| `calm` | 0.07 | 100px | about / case heads |
| `contact` | 0.09 | 120px | dark contact band |

Cycles run 22–40s. The field never sits at full strength under a headline or a body
column. `pointer-events: none`, `aria-hidden`, removable without information loss.
Mobile degradation order under load: **glass backdrop-filter → field complexity → motion
frequency. Typography and layout are never touched.**

Motion discipline: PRIMARY is this field. SECONDARY is hover/link/media micro-motion at
180–420ms with no spring and no bounce. Reveals are opacity + a 14px translate, or a
`scaleX` hairline wipe. No further large motion systems are introduced.
`prefers-reduced-motion` freezes the field and makes micro-motion instant. Motion pauses
when `document.hidden`. There is no render loop and no scroll listener.

### Matte glass — 1–3% of the page

A flat translucent rectangle, frosted backdrop, hairline edge, almost no shadow. Ceiling:
**3–5 meaningful glass accents on the whole homepage.** Never large glass cards, rounded
SaaS panels, glow, heavy shadows, nested glass, glass behind body copy, or two glass
elements in one viewport. `@supports` fallback to a flat tint where `backdrop-filter` is
unavailable.

Currently: hero plate, ProjectDiagram, ProjectMetrics, ProjectWide, Contact.

### Media treatment

**ART DIRECTION MUST NOT HIDE EVIDENCE.** Only the owner's own product screenshots. The
build-time pipeline emits **two** derivatives per source and never destroys the original:
`CLEAN` (cropped, optimised) and `PROCESSED` (grayscale → Bayer 8×8 ordered dither).
Halftone is a *state*, never the only state.

| context | default | how clean is reached |
|---|---|---|
| `/` preview | PROCESSED | pointer hover wipes to CLEAN; coarse pointers settle CLEAN ~420ms after the reveal |
| `/work` thumbnail | PROCESSED | hover / tap |
| case hero | PROCESSED | scrolling past is enough |
| **case gallery / system shots** | **CLEAN** | inside a case the interface is the evidence |

The processed→clean transition is a hard-seam `clip-path` wipe: no scale, no deformation.
A missing asset stays visibly missing (`VISUAL PENDING`) — never a fabricated screen,
never AI-generated UI, never a device mockup.

### ROUTE

ROUTE carries **no typographic distortion at all**. The wordmark reads as one monolithic
black mass, word first, material second. Its aggression comes from scale and the frame
crop, not from treatment. Its five screens are placeholders labelled `VISUAL PENDING`.

### Statement

STATEMENT_A. One line, split across two lines with an indent, in a near-empty band. Void
is part of the composition. The field is at `none` here — the statement is the calmest
moment on the page.

Text: «Идея вечером — рабочая ссылка утром.»

### Hero copy and classification — current, canonical

| | |
|---|---|
| name | `EVAN` (display) · `EVAN CARTEX` only as the vertical rail wordmark |
| classification | `AI AGENTS` / `WEB` / `AUTOMATION` — three oversized lines |
| statement | «Собираю системы, веб и автоматизации — от разбора контекста до работающего продукта.» |
| proof | `05 PROJECTS · 03 LIVE LINKS · 2+ MO · HERMES UPTIME` |
| closing line | «Идея вечером — рабочая ссылка утром.» |
| availability | `STATUS: OPEN TO WORK` + `REMOTE`, rendered as system metadata beside BUILD / YEAR — never a badge or a button |

OUTPUT FIRST, TOOLS SECOND: the hero states what gets built, not how. Claude Code, Codex
and prompt-based development surface later, in APPROACH / STACK / cases, as evidence of
method. No greeting formula, no "Hi, I'm", no self-adjectives.

Language: **RU prose + EN system labels**, everywhere.

### Colour scale — actual tokens

`--paper #F2F1EE` · `--paper-2 #E9E8E4` · `--paper-3 #DEDCD7` · `--ink #0B0B0C` ·
`--graphite #3A3B3E` · `--gray #65666B` · `--gray-2 #C7C7C4` · `--night #101012`.
Rules `--rule` 14% · `--rule-soft` 7% · `--rule-strong` 32%.
Field `--field-tone` · `--field-light` · `--field-blur` · `--field-strength` · `--grain`.

`--gray` was darkened from `#7D7E83` at Stage 6: the old value read 3.58:1 and failed AA
on every micro/metadata label. On the dark band `--gray` becomes `#8B8C91` (5.66:1).

Focus ring: `2px solid var(--accent)`, `outline-offset: 3px`, on every control.

---

## 3. ROUTING AND THE CASE SYSTEM

| route | render |
|---|---|
| `/` | static |
| `/work` | static — editorial index + contact sheet, **no filter UI** |
| `/work/lead-radar` · `/hermes` · `/route` · `/luma-english` · `/yasno-house` | `generateStaticParams`, static |
| `/sitemap.xml` · `/robots.txt` · `/opengraph-image` · `/icon.svg` | generated at build time |

`caseRoutesEnabled = true` in `src/lib/routes.ts`; no link on the site is inert.
`/about` is deliberately not a route — the homepage About band carries it.
404 is Next's default `_not-found`; there is **no** custom in-identity 404 page.

Case template, one band per idea: `01 CONTEXT · 02 PROBLEM · 03 APPROACH ·
04 SYSTEM / ARCHITECTURE · 05 IMPLEMENTATION (+ TECHNICAL EVIDENCE) · 06 RESULT ·
GALLERY · pending notes · NEXT PROJECT`. Bands renumber when a project has no system
band. The case runs a slower rhythm than the homepage; it adds no new visual system.

Four project archetypes on the homepage: `01 SYSTEM` (diagram-first), `02 RUNNING PRODUCT`
(metrics-first), `03 INTERFACE` (oversized type), `04 WEB / MEDIA`.

Metadata layer rules: `ROLE` = contribution, `STACK` = technology, `APPROACH` = method.
They are never mixed. ROLE never lists prompts or tools.

### Assets genuinely still pending

| project | missing | how the page handles it |
|---|---|---|
| ROUTE | 5 screens | filmstrip of labelled placeholders, `05 SCREENS · VISUAL PENDING` |
| ЯсноДом | site capture | archive row without an image, case states the gap |
| Lead Radar | a sanitized digest card | the architecture diagram carries the case instead |

Captured and shipped: LUMA and Hermes (`public/media/*.webp`, clean + processed each).
The favicon is a neutral grid mark, not a logo. The OG image is generated from
`content/profile.ts`, not photographed.

---

## 4. CONTENT RULES

Nothing is invented. No fake clients, results, metrics, projects, stacks, dates,
screenshots or AI imagery. Missing material is recorded in `CONTENT_TODO.md` (local, not
in the public repository) and stated openly on the page as `VISUAL PENDING`.

**The interface does not explain its own design process.** No design-notes copy in the UI,
no repeated facts, no filler microcopy in whitespace.

Confirmed facts live in `src/content/*.ts`, traceable to the `myresume` sibling repository
and the real project repositories. Lead Radar's RESULT band is owner-confirmed (stable
operation without constant manual restarts; regularly 6–10 relevant opportunities, with no
period claimed because none was given; one real order already closed through a lead the
system found). The `758 tests on Python 3.12` figure is technical evidence about code
coverage, rendered at nano size, and is never presented as a service or business metric.

---

## 5. ACCESSIBILITY — STAGE 6 STATE

- axe-core WCAG 2.2 A/AA + best-practice: **0 violations** across all 7 routes, in both
  `prefers-reduced-motion` modes.
- Keyboard: 26 focus stops, visible ring on every one, order matches visual order.
- Target size (2.5.8): every link's effective hit area ≥ 24×24 CSS px. `.link-arrow` keeps
  its 18px baseline rule and grows the target with a transparent `::after`.
- Contrast: all text ≥ 4.5:1. The decorative layer is `aria-hidden`, non-interactive and
  removable without information loss.
- Reduced motion: the field freezes, reveals become instant, micro-motion is removed.

**One known, accepted exception.** The oversized ghost project index `(01)` in
`ProjectHead` is `--paper-3` on `--paper` = **1.21:1**. It is decorative typography,
`aria-hidden`, and duplicates no information; WCAG treats incidental text as exempt, axe
cannot know that. Reaching 3:1 would need roughly `#8E8F8C`, which turns a whisper into a
numeral competing with the project name. **Left as-is by decision; costs 4 Lighthouse
accessibility points on `/`.** Reopen only with an explicit art-direction decision.

Note: in a default axe run this element is often offscreen inside a `content-visibility`
band and the violation appears to vanish. It has not. It is confirmed with all bands
force-rendered.

---

## 6. PERFORMANCE — STAGE 6 STATE

Lighthouse (all four categories ≥ 95 everywhere):

| page | perf | a11y | best | seo |
|---|---|---|---|---|
| `/` desktop / mobile | 100 / 95 | 96 / 96 | 100 / 96 | 100 / 100 |
| `/work` desktop / mobile | 100 / 96 | 100 | 100 | 100 |
| `/work/lead-radar` desktop / mobile | 100 / 95 | 100 | 100 | 100 |

Measured on real Chrome under 4× CPU + slow 4G, which is what the browser actually does
rather than what Lighthouse's Lantern model estimates:

| | LCP | CLS | INP | longest task |
|---|---|---|---|---|
| mobile 390, `/` | 960 ms | 0.000 | 56 ms | 77 ms |
| mobile 390, case | 780 ms | 0.000 | 72 ms | 74 ms |
| desktop 1440 | 88–152 ms | 0.000 | 32–72 ms | 0 ms |

Lighthouse's simulated mobile LCP reads 2.9 s for the same pages; the LCP element is the
decorative ASCII `<pre>`.

Key mechanism: `.band:not(.band--eager)` carries `content-visibility: auto` with
`contain-intrinsic-size: auto 980px`. The hero and the first band of each subpage opt out.
This cut mobile total blocking time from **702 ms to 10 ms**. A print override restores
full rendering; the QA capture script lifts it explicitly.

Responsive: 7 routes × 9 widths (320/375/390/430/768/1024/1280/1440/1920) — zero
horizontal overflow, zero console errors, everywhere.

Lighthouse's `font-size` audit fails on mobile `/` because the ASCII sculpture is counted
as illegible text. It is an `aria-hidden` graphic made of characters. Accepted; costs
4 best-practices points.

---

## 7. SEO / METADATA STATE

`metadataBase` from `NEXT_PUBLIC_SITE_URL`; per-page canonical on `/`, `/work` and every
case; Open Graph and Twitter cards; `sitemap.ts` listing all 7 pages; `robots.ts`;
JSON-LD `Person` + `hasPart` `CreativeWork` per project; `app/opengraph-image.tsx`
rendering a 1200×630 card from `content/profile.ts` at build time. One `h1` per page;
project names are `h2` on `/` and `h1` on their case.

Page title: `EVAN — системы, веб, автоматизации`.

Until a real domain is set, all absolute URLs fall back to `http://localhost:3000`.

---

## 8. TECH AND SECURITY STATE

Next.js 16.3.4 (App Router, Turbopack), React 19.2.8, TypeScript 5.9.3 `strict` +
`noUncheckedIndexedAccess`, Tailwind CSS 4.3.3, pnpm 10.20.0, sharp for build-time media,
Playwright + axe-core + Lighthouse for QA.

All components are Server Components **except three**: `MotionGate`, `Reveal` and
`MediaStates`. There is no other client JS in the page tree.

`output: "standalone"`; Dockerfile runs non-root with a healthcheck and publishes to
`127.0.0.1` only. Headers on every route: CSP, HSTS, `Referrer-Policy`,
`X-Content-Type-Options`, `X-Frame-Options: DENY`, COOP/CORP, deny-all
`Permissions-Policy`; `poweredByHeader` off. `script-src` allows `'unsafe-inline'` because
the site is fully static and a nonce policy would force per-request rendering — there is
no third-party script, no remote font, no external stylesheet and no `eval`.
`pnpm audit`: no known vulnerabilities. No secrets reach the frontend.

Public repository contents exclude: `.screens/`, `.figma/`, `.motion/`, `shots/`,
`.claude/`, build output, and `docs/CONTENT_TODO.md` (internal working notes). `.assets/`
**is** committed — it is the input `scripts/build-media.mjs` and `scripts/treat-media.mjs`
read to produce `public/media`.

---

## 9. REJECTED AND ARCHIVED — DO NOT RESURRECT

Each of these was explored and closed. None returns without a new, explicit decision.

| direction | why it was closed |
|---|---|
| **Murmuration field** | demanded a second visual language and read as a concept on top of the concept. Archived in the Figma page `ZZ_ARCHIVE — REJECTED` |
| **Ultramarine `#2C2BE8`** as accent | superseded by Registration Red at Stage 2.5 |
| Signal Chartreuse · Industrial Amber · Digital Magenta · Cold Cyan | documented explorations only; never selected |
| **Per-letter typographic distortion** | rejected explicitly: distortion changes material, never metrics |
| Kinetic typography, animated tracking, baseline shift, type scale/stretch animation | same rule |
| `CloudField` as a named 3-layer system | superseded by `DistortionField` with six tuned variants |
| `PixelIndex` · `PixelType` · `PixelReveal` · `DitherStrip` · `DotGrid` · `PixelMass` | Stage-1 component names that were never built; the shipped primitive is the `.pixel` CSS dot-matrix mask plus the build-time media pipeline |
| Reveal with `blur(6px) → 0` | replaced by opacity + 14px translate; blur was too expensive and read as softness, not as system |
| Media `PixelReveal` (pixelated → sharp in steps) and scan-smear on entry | replaced by the hard-seam processed→clean `clip-path` wipe |
| Hover 2px displacement on projects | conflicts with static typography geometry |
| Clip-path hairline reveal | caused a genuine deadlock — a self-clipped element reports an empty intersection rect, so its observer never fired and every band separator stayed invisible. Replaced by `scaleX` |
| Filter UI on `/work` | five projects do not need one; `type` and `tags` stay in the data model |
| A custom in-identity 404 with the ASCII field | specified at Stage 1, never built; Next's default is in place |
| `UTC+3` in the hero system metadata | specified at Stage 1, never built |
| Motion / GSAP / Lenis / Three.js / WebGL / canvas | never needed; the motion layer is CSS plus two small client components |
| Fake pages built only to avoid a 404 | forbidden by decision |

---

## 10. OPEN — CURRENT ONLY

Everything resolved has been removed from this list.

| # | item | kind |
|---|---|---|
| O1 | **Production domain.** `NEXT_PUBLIC_SITE_URL` is read at build time; canonical, OG, sitemap and robots point at `localhost:3000` until it is set | blocking for launch |
| O2 | **ROUTE — 5 screens.** The only project whose primary evidence is missing | asset, owner-supplied |
| O3 | **ЯсноДом — site capture** for the archive row and its case | asset, capturable |
| O4 | **Lead Radar — sanitized digest card** | asset, owner-supplied |
| O5 | **Ghost project index contrast** (§5). Left as-is by decision; reopen only as art direction | decision, deferred |
| O6 | **Hermes uptime** is written as "2+ months". A date-stamped value would make it durable | fact |
| O7 | **ROLE strings** for all five projects were derived from source descriptions and still carry a confirmation marker in `src/content/projects.ts` | fact, needs owner confirmation |
| O8 | **AI VISUAL** has no project among the five, so its proof cell in WHAT I BUILD is empty | content gap |
| O9 | The `myresume` HTML/PDF documents still say «четыре проекта»; `content.json` and `content.md` were synced to five, the rendered documents were not rebuilt | external, owner action |

---

## 11. STAGE 6.1 — SCOPE

Derived from what Stage 6 actually left open. **Proposed; not started; awaiting approval
of this file.** Nothing outside this list is in scope.

**In scope**

1. Decide O5 — the ghost project index. Either accept it permanently and record it as a
   standing exception, or set a tone that satisfies 3:1 without turning the whisper into a
   numeral. One decision, one token, no composition change.
2. Decide the ASCII `font-size` audit the same way — accept as a decorative graphic, or
   change how it is represented. No change to the artwork itself.
3. Wire the production domain end to end once it exists: build with it, then re-verify
   canonical, OG, sitemap and robots on the built output.
4. Final security posture check against the real origin: CSP with no console violations,
   HSTS, and the external-link `rel` audit.
5. Reconcile the remaining factual markers — O6 and O7 — or leave them explicitly as they
   are, with the reason recorded.

**Out of scope**

Composition, layout, type scale, colour beyond the single O5 token, motion behaviour, the
case template, new sections, new routes, new visual systems, and any change to project
content that is not owner-confirmed.

---

## 12. HOW TO USE THIS FILE

`CANONICAL_STATE.md` is the arbiter. `VISUAL_LANGUAGE.md` holds the reasoning and the
reference DNA behind the decisions; `INFORMATION_ARCHITECTURE.md` holds the structure and
the content contract; `DESIGN_SYSTEM.md` holds the tokens and the component inventory.
Those three explain **why** and **how**; this one states **what is true now**.

When they disagree, fix them — do not add a second version of the truth.
