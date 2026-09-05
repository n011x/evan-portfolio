# CANONICAL STATE

**The single authoritative snapshot of this project as it exists now.**

Last synchronised: 2026-09-06, after Stage 8 — **the site is live at https://evancartex.com**.

Every statement below carries one of these labels where its status is not obvious:
**SHIPPED** · **VERIFIED FACT** · **PENDING REAL ASSET** · **NEEDS USER FACT** ·
**LAUNCH BLOCKER** · **DEFERRED** · **REJECTED**.

This file describes what **is**, not what is planned. Where any other document in `docs/`
disagrees with this one, this one wins and the other document is wrong and must be fixed.
Anything listed under §9 REJECTED is closed and may not return without a new decision.

---

## 1. WHERE THE PROJECT STANDS

A personal portfolio, fully prerendered, self-hostable. Five routes, **three core systems
with case studies** and **two landing examples**, no runtime data fetching, no animation
library, no WebGL, no canvas.

| | |
|---|---|
| Stages complete | 1, 2, 2.5, 3, 4, 5, 6, 6.1, 6.2, 6.2.1, 6.2.2, 7, 8 |
| Stage in scope next | none — released |
| Production | **https://evancartex.com** — released 2026-09-06 |
| Repository | `n011x/evan-portfolio`, public |
| Branch | `main` |
| Baseline commit | `6a9e09e feat: establish portfolio production baseline` |
| Blocking for launch | nothing |

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
| 8 | Deployed to production: VPS + systemd + Caddy, apex canonical with `www` redirecting to it, the app bound to loopback only, and the launch gate run against the public origin |
| 7 | Whole-site product review: the surviving `UPTIME 2+ MO` claim removed from the Hermes glass plate, the Hermes date metric reset into the numeral slot, capability rows and the contact sheet stopped numbering the landings as peers of the core three, and ROUTE given a stage map so its case reads as deliberately pending rather than unfinished |
| 6.2.2 | EvidencePlate v2: evidence designed in Figma first, every capture re-cut on real message boundaries, the window built from the capture's own geometry, and a layout-crop check that runs at every breakpoint |
| 6.2.1 | EvidencePlate: real captures presented as states of the system rather than screenshots attached to a case, tied to the pipeline by id; Hermes date metric reworded; Figma typography board's residual drift fixed |
| 6.2 | Portfolio hierarchy: three core systems with case studies, landings demoted to web examples; real sanitized Telegram evidence integrated into LEAD RADAR and HERMES; the unprovable uptime claim removed; résumé resynced and rebuilt |
| 6.1 | Factual cleanup: ghost-index contrast resolved, ROLE strings audited, left-rail classification drift fixed, résumé project count synced and rebuilt, Figma rechecked read-only and its stale copy corrected |

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

### HERMES — what the project is

Not a vacancy bot. A **contextual personal and operational assistant in Telegram** that
holds a working context and a workspace, runs scheduled work, continues tasks across days,
and handles everyday requests. Career HR — ~105 vacancies a month, 20–30 a week — is one
scenario inside it, and the metric label says so.

The workspace relationship goes both ways: the assistant reads statistics and writes
changes back. **The shipped evidence only proves reading** — the report in `hx-workspace`
states in its own words that it made no changes that time. Capability and evidence are
kept apart deliberately.

**No uptime claim.** `2+ MO · HERMES UPTIME` is gone from the hero and
`2+ МЕС БЕЗ ПЕРЕЗАПУСКА` from the metric block. A continuous window cannot be proven —
nothing records the last restart. What is provable is the start: the Codex kit is stamped
2026-06-07 and the staging tree 2026-06-10, so the metric reads `06.2026 · LIVE SINCE`
and the case says «работает с июня 2026». The same correction was applied to the résumé.

Stage 7 found the claim had survived in one more place — the glass plate over the Hermes
media still read `UPTIME · 2+ MO`. It now reads `SINCE · 06.2026`. The date also moved out
of the display slot into the numeral slot: `SINCE 06.2026` wrapped onto two lines and
competed with the 105 next to it, and a date is not a hero metric.

### Hero copy and classification — current, canonical

| | |
|---|---|
| name | `EVAN` (display) · `EVAN CARTEX` only as the vertical rail wordmark |
| classification | `AI AGENTS` / `WEB` / `AUTOMATION` — three oversized lines |
| statement | «Собираю системы, веб и автоматизации — от разбора контекста до работающего продукта.» |
| proof | `03 CORE BUILDS · 02 WEB EXAMPLES · 03 LIVE LINKS` |
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
`--ghost-index #A4A29A` — the oversized decorative project index, tuned as type (§5).

`--gray` was darkened from `#7D7E83` at Stage 6: the old value read 3.58:1 and failed AA
on every micro/metadata label. On the dark band `--gray` becomes `#8B8C91` (5.66:1).

Focus ring: `2px solid var(--accent)`, `outline-offset: 3px`, on every control.

---

## 3. PORTFOLIO HIERARCHY, ROUTING AND THE CASE SYSTEM

**The portfolio is not five equal projects.** It is three systems that carry real cases,
plus landing work shown as a range of execution. Set at Stage 6.2, and the single source
of that split is `tier` on each project in `src/content/projects.ts`.

| tier | projects | treatment |
|---|---|---|
| `core` | LEAD RADAR · HERMES · ROUTE | full case study, own route, own archetype composition, evidence bands |
| `web` | LUMA ENGLISH · ЯСНОДОМ | one preview, one line, one live link, inside the WEB / LANDING band. No case page, no ROLE, no RESULT, no system map, no pagination |

A landing is an execution example, not a product achievement. Nothing in the copy, the
counters or the composition may put the two tiers on one level again.

| route | render |
|---|---|
| `/` | static — HERO · CORE WORK (3) · STATEMENT · WHAT I BUILD · APPROACH · STACK · WEB / LANDING · ABOUT · CONTACT |
| `/work` | static — the three core systems as an index, then the WEB / LANDING band, then the contact sheet. **No filter UI** |
| `/work/lead-radar` · `/hermes` · `/route` | `generateStaticParams`, static |
| `/work/luma-english` · `/work/yasno-house` | **308 → `/work#web`**, permanent redirect in `next.config.ts`. These URLs existed, so they are never allowed to 404 |
| `/sitemap.xml` · `/robots.txt` · `/opengraph-image` · `/icon.svg` | generated at build time |

`caseRoutesEnabled = true` in `src/lib/routes.ts`; no link on the site is inert.
`/about` is deliberately not a route — the homepage About band carries it.
404 is Next's default `_not-found`; there is **no** custom in-identity 404 page.

Case template, one band per idea: `01 CONTEXT · 02 PROBLEM · 03 APPROACH ·
04 SYSTEM / ARCHITECTURE · 05 REAL OUTPUT · 06 IMPLEMENTATION (+ TECHNICAL EVIDENCE) ·
07 RESULT · GALLERY · pending notes · NEXT PROJECT`. Bands renumber when a project has no
system band or no evidence band. The case runs a slower rhythm than the homepage and adds
no new visual system.

Three project archetypes on the homepage: `01 SYSTEM` (diagram-first), `02 RUNNING PRODUCT`
(metrics-first), `03 INTERFACE` (oversized type). The fourth archetype, `WEB / MEDIA`, is
retired with the demotion — `ProjectWide` is no longer used.

### Counters

No counter may imply five equal projects, and **no numbering may run across the two
tiers**. The hero proof row reads `03 CORE BUILDS · 02 WEB EXAMPLES · 03 LIVE LINKS`; the
CORE WORK header reads `03 SYSTEMS`; `/work` reads `03 CORE · 02 WEB · 03 LIVE LINKS`; the
Figma index board reads `03 CORE · 02 WEB`. The résumé says «три системы» plus web work.

The contact sheet labels core tiles `(01)…(03)` and landing tiles `WEB · NAME` rather than
continuing to `(04)(05)`. WHAT I BUILD points its web row at `WEB`, not at project numbers.
A tile only says `VISUAL PENDING` when something is actually missing: Lead Radar's tile
says `SYSTEM MAP`, because its visual is a diagram and nothing is pending for it.

### Real evidence, and what is still missing

Integrated at Stage 6.2 from real Telegram captures:

| project | evidence | what it proves |
|---|---|---|
| LEAD RADAR | `lr-card` · `lr-rank` · `lr-actions` | a card is qualified and explained — why it fits, what is risky, a fit score — ranked across tiers, and the owner decides |
| HERMES | `hx-context` · `hx-workspace` | one assistant across two task types: a long everyday request resolved into a route for two people, and workspace statistics reported with the assistant's own caveat and a proposed next step |

**LEAD RADAR — system map answers *how it works*, evidence answers *what it produces*.**
The map stays; the plates do not replace it. Their sequence is QUALIFY → RANK → DECIDE,
carrying the map's own node numbers.

**HERMES — the evidence demonstrates contextual use and workspace reading, not the whole
capability surface.** The workspace relationship goes both ways in the copy because that is
an owner-confirmed fact; the shipped capture proves reading only, and its metadata says so
in as many words: `ЭТОТ СНИМОК — ЧТЕНИЕ, НЕ ЗАПИСЬ`.

#### EvidencePlate — the presentation rule

Two rules govern every real capture on this site:

> **SANITIZE MAY CROP. LAYOUT MUST NOT CROP REAL OUTPUT.**
>
> **REAL OUTPUT MUST REMAIN REAL. ART DIRECTION MAY STRUCTURE, FRAME, INDEX AND INTERPRET
> EVIDENCE, BUT MUST NOT RECONSTRUCT, DEFORM OR OBSCURE IT.**

Sanitisation happens once, in `scripts/sanitize-evidence.mjs`, and its output is the
canonical evidence asset. Every crop lands on a real boundary — the message bubble's own
edge, or a complete block inside one message — never mid-sentence, never mid-card. Where a
message needs two windows they are cut between blocks and the case marks the second as a
continuation. After that, **nothing in the page may take a pixel off the file.**

A plate is not a card, a phone mockup, a gallery tile or a floating image. It is an
editorial object in the case's own column grid, and the capture is one layer of it:

```
SYSTEM ID  ·  TITLE                              ← PROVENANCE NODE
────────────────────────────────────────────────────────────────
[ REAL EVIDENCE WINDOW ]          SYSTEM READOUT
  capture, clean, contain,          EXTRACTED SIGNAL / OBSERVED OUTPUT
  safe inset, reg marks             key · value rows in the site's own mono
                                    continuation and sanitisation notes
```

| part | rule |
|---|---|
| the capture | **CLEAN and untreated.** No dither, halftone, distortion, blur, overlay or redraw |
| geometry | the box carries the capture's own aspect ratio; the image is `object-fit: contain`. **Never `cover`, never `clip-path`, never a transform** |
| size | **SOURCE = 591 px · WINDOW ≤ SOURCE · DEFAULT WINDOW = 518 px.** Source width and rendering width are different numbers and are never conflated: 591px is what Telegram delivered, 518px is the default window, and an asset with a different source width carries it in its own metadata (`hx-01-request` is 522px). Every plate declares its real file size in `data-source-width` / `data-source-height` |
| safe inset | 10px between capture and frame, so the hairline never sits on content |
| id | echoes the system map — `05 QUALIFY` produces `05.A`, `07 DIGEST` produces `07.A`. One Registration Red signal per band, on the plate whose node carries it in the map |
| provenance | `← 05 QUALIFY`. No connector lines are drawn across the page: the link is id, label, grid position and one shared metadata grammar |
| readout | the interpretation layer, set in the site's own mono under `EXTRACTED SIGNAL` / `OBSERVED OUTPUT` / `SYSTEM READOUT`. It sits beside the window on desktop and under it on mobile, **never over it**, and never imitates the source interface |
| mobile | the same plate stacked, capture first and readout under it — not a shrunk desktop frame, and not a tighter re-crop that would cut a message |

**Redaction is one canonical treatment.** Private detail is covered with a solid
`--graphite #3A3B3E` bar — never blurred, never a gradient, never textured, never
Registration Red, never a light patch that reads as a sticker, and never replaced with
invented content. It stays visibly a redaction and stays quieter than the evidence.

**Chrome removal is a different operation** and is invisible by design: Telegram's own
furniture — date pills, scroll affordances — is painted out in a colour sampled from the
image itself. It is only ever applied to pixels Telegram's overlay already covered, so no
message content is lost. Where chrome cannot be removed without touching the message, the
window is cut to a boundary that excludes it instead.

**Source resolution is 591×1280.** That is what Telegram delivered; no higher-resolution
original exists on the machine. Sharper evidence would need the phone-native files.

`scripts/evidence-boundary-check.mjs` asserts all of this against the running site at
320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920: object-fit, aspect ratio against
the declared source size, no upscale, and no clipping by any ancestor.

**Designed in Figma before code.** `SYS / REAL OUTPUT — EVIDENCE PLATE` (node `104:2`)
holds the rules and the anatomy; the `REVIEW — EVIDENCE COMPOSITIONS` section holds four
real compositions built from the real assets: `107:2` Lead Radar desktop, `108:127` Lead
Radar mobile, `108:2` Hermes desktop, `108:211` Hermes mobile. `SYS / MEDIA TREATMENT`
remains the source of processing rules; this board is the source of composition rules.

**Scores are not product metrics.** `92/100` and `78/100` are the fit scores of two
specific leads. They are labelled `FIT / ЭТОТ ЛИД` and must never be presented as accuracy,
success rate or result.

| project | still missing | how the page handles it |
|---|---|---|
| ROUTE | 5 screens | filmstrip of labelled placeholders on the homepage, `05 SCREENS · VISUAL PENDING`; the case draws a **stage map** of its documented four-stage path in the same node language the pipeline uses |

**A pending case still has a shape.** ROUTE's screens do not exist, and nothing is drawn in
their place — but the product's structure is documented, so the case states it: four
stages, five screens, what was designed, what has not been shot. The absence is a labelled
fact rather than an empty page. Nothing about the interface is reconstructed.

Captured and shipped: LUMA, Hermes and — since Stage 6.2 — ЯсноДом, taken from the live
site at 1440 and 390 with fonts settled and no browser chrome. The favicon is a neutral
grid mark, not a logo. The OG image is generated from `content/profile.ts`.

## 4. CONTENT RULES## 4. CONTENT RULES

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

**One deliberate exception — resolved at Stage 6.1.** The oversized ghost project index
`(01)…(04)` in `ProjectHead` was `--paper-3` on `--paper` = **1.21:1**, which read as a
washed-out accident rather than a decision. It now has its own token, `--ghost-index
#A4A29A`, measured in the running page at **2.26:1 on `--paper` and 2.09:1 on `--paper-2`**
(project 01 sits on the recessed band).

The target was 2:1–3:1, not 4.5:1: this is non-semantic display material, `aria-hidden`,
duplicating no information, and WCAG treats incidental text as exempt. The point was to
make it legible as an intentional layer while keeping it clearly subordinate — it sits at
about 44% of the metadata gray's contrast (5.07:1) and 13% of the ink's (17.42:1), so it
still cannot compete with the project name. It is a separate token rather than a changed
`--paper-3`, so the surface tint keeps its own meaning.

axe and Lighthouse still flag it, because 2.26:1 is below their 3:1 large-text threshold.
**That is the recorded decision, not an oversight; it costs 4 Lighthouse accessibility
points on `/`.** Reopen only as an art-direction decision.

Note: in a default axe run this element is often offscreen inside a `content-visibility`
band and the violation appears to vanish. It has not. It is confirmed with all bands
force-rendered.

**Matte glass on the dark band.** Composited for real (9% white over `--night`, effective
`#262627`), the plate reads `--ink` at 13.39:1, `--graphite` at 7.81:1 and `--gray` at
**4.51:1** — the last clears AA with little margin. The no-`backdrop-filter` fallback is
`rgba(16,16,18,0.86)`, giving 16.83:1 and 5.66:1. Tooling that treats the translucent
plate as an opaque background reports false failures here; the composited figures above
are the real ones.

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
| mobile 390, `/` | 980 ms | 0.000 | 64 ms | 72 ms |
| mobile 390, case | 732 ms | 0.000 | 64 ms | 70 ms |
| desktop 1440 | 56–128 ms | 0.000 | 40–48 ms | 0 ms |

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

## 8b. FIGMA — WHAT THE FILE ACTUALLY CONTAINS

Rechecked read-only at Stage 6.1. **The design file is not a mirror of production and must
not be treated as one.**

It holds **one page, `00_SYSTEM`**, with a single section and seven frames:
`SYS / COLOR` · `SYS / ACCENT CANDIDATES — SUPERSEDED BY v3` · `SYS / TYPOGRAPHY` ·
`SYS / INDEX` · `SYS / MEDIA TREATMENT` · `SYS / ACCENT v2 — SUPERSEDED BY v3` ·
`SYS / ACCENT v3 — REGISTRATION RED (SELECTED)`. 42 frames, 344 text nodes in total.

**There are no composition boards in the file.** No `HERO_BASE`, no `STATEMENT_A`, no
LEAD RADAR / HERMES / ROUTE / LUMA compositions, no `DISTORTION FIELD / MOTION` board, no
mobile compositions, and no `ZZ_ARCHIVE — REJECTED` page. `STAGE_2_5_STATUS.md` describes
all of those as existing; they are not in the file. That document is a record of the
decisions taken, not an index of surviving artwork.

Consequence: **production and this document are the only source of truth for composition.**
Figma is a system specimen sheet — colour, type, index language, media treatment and the
accent decision — and nothing more. The murmuration cannot "return from Figma" because
no board of it exists there.

The accent decision in `SYS / ACCENT v3` matches production exactly: `#CC2E24` at 4.67:1
on paper, `#FF6B5E` at 6.80:1 on night, one hue, no second accent.

Stale factual copy found inside the **active** frames was corrected in place at Stage 6.1
so the design source no longer contradicts this document: `--gray` `#7D7E83` → `#65666B`;
`AI PRODUCTS` → `AI AGENTS`; the old hero statement → the current one; two `PRODUCT ·
BUILD · REVIEW` labels → `PRODUCT · SETUP · REVIEW`; the rail specimen → `AI AGENTS`;
`REMOTE · UTC` → `REMOTE` (no UTC clock was ever built); Ultramarine's "ТЕКУЩИЙ ТОКЕН"
and "CURRENT" status labels → superseded. The two earlier accent boards were renamed
`— SUPERSEDED BY v3` rather than deleted: they are documented explorations.

No board, variant or component was created. No approved visual decision was reopened.

## 8c. PRODUCTION

Live at **https://evancartex.com** since 2026-09-06.

```
Internet → DNS → Caddy :80/:443 (TLS, Let's Encrypt)
                   ├─ www.evancartex.com  → 301 → https://evancartex.com{uri}
                   └─ evancartex.com      → reverse_proxy 127.0.0.1:3000
                                              └─ evan-portfolio.service
                                                   Next.js standalone, Node 22
```

| | |
|---|---|
| Model | VPS + **systemd**, matching the convention the owner's other services already use. **No Docker** — the repository's Dockerfile stays as an alternative path, but adding a container runtime for one service would have introduced a layer the machine did not have |
| Runtime | Node 22 LTS, installed for this deployment; the standalone bundle needs a Node runtime and nothing else |
| Service | `evan-portfolio.service` — unprivileged dedicated user, `Restart=on-failure`, enabled at boot, `NoNewPrivileges`, `ProtectSystem=strict`, `ProtectHome`, journald logging |
| Binding | **`127.0.0.1:3000` only.** The application is not reachable from outside; Caddy is the sole public listener and port 3000 is not opened in the firewall |
| Releases | Immutable `releases/<sha>` directories with a `current` symlink, so a rollback is repointing the symlink and restarting |
| Config | `NEXT_PUBLIC_SITE_URL=https://evancartex.com`, set at build time — the single canonical source, verified to reach canonical tags, Open Graph, sitemap, robots and JSON-LD with no `localhost` left anywhere |
| Coexistence | Two Hermes services and Lead Radar run on the same machine under their own users and directories. None was stopped, modified or exposed; the portfolio adds one loopback port and shares only Caddy |

**One deployment defect was found and fixed by the QA, not by systemd.** `ProtectSystem=strict`
left the release tree read-only, so Next could not create `.next/cache` and every
`/_next/image` request re-optimised and then failed to cache — the responses were still
200, so the service looked healthy while two image requests never settled in a browser.
`<release>/.next/cache` now symlinks to a shared writable directory. This is why a green
`systemctl is-active` is not a launch verdict.

**Launch gate, run against the public origin:** 31/31 — TLS, the plain-HTTP 308, all five
routes 200, both landing redirects 308, all eight security headers on the real response,
no `x-powered-by`, no localhost or example.com leakage on any route, and absolute
production URLs in canonical, sitemap, robots and JSON-LD.

**Measured on the live origin** (real Chrome, 4× CPU + slow 4G): LCP 1252 ms home /
1076 ms case, **CLS 0.000**. Lighthouse mobile 97 / 99 / 98 across home, `/work` and the
case — *better* than the pre-launch local baseline, because Caddy compresses and serves
over real HTTP/2.

The operational runbook — host, deploy, rollback, neighbour inventory — is kept out of
this public repository in `docs/DEPLOYMENT.local.md`.

## 9. REJECTED AND ARCHIVED — DO NOT RESURRECT

Each of these was explored and closed. None returns without a new, explicit decision.

| direction | why it was closed |
|---|---|
| **Murmuration field** | demanded a second visual language and read as a concept on top of the concept. No board of it survives in the Figma file (§8b), so it exists only as this record |
| **Ultramarine `#2C2BE8`** as accent | superseded by Registration Red at Stage 2.5; the two Figma boards that still labelled it `CURRENT` were renamed `— SUPERSEDED BY v3` at 6.1 |
| Signal Chartreuse · Industrial Amber · Digital Magenta · Cold Cyan | documented explorations only; never selected |
| **Per-letter typographic distortion** | rejected explicitly: distortion changes material, never metrics |
| Kinetic typography, animated tracking, baseline shift, type scale/stretch animation | same rule |
| `CloudField` as a named 3-layer system | superseded by `DistortionField` with six tuned variants |
| `PRODUCT · BUILD · REVIEW` as LEAD RADAR's role | removed at 6.1 — no source supports code authorship (§3) |
| `PixelIndex` · `PixelType` · `PixelReveal` · `DitherStrip` · `DotGrid` · `PixelMass` | Stage-1 component names that were never built; the shipped primitive is the `.pixel` CSS dot-matrix mask plus the build-time media pipeline |
| Reveal with `blur(6px) → 0` | replaced by opacity + 14px translate; blur was too expensive and read as softness, not as system |
| Media `PixelReveal` (pixelated → sharp in steps) and scan-smear on entry | replaced by the hard-seam processed→clean `clip-path` wipe |
| Hover 2px displacement on projects | conflicts with static typography geometry |
| Clip-path hairline reveal | caused a genuine deadlock — a self-clipped element reports an empty intersection rect, so its observer never fired and every band separator stayed invisible. Replaced by `scaleX` |
| Filter UI on `/work` | three cases do not need one; `type` and `tags` stay in the data model |
| A custom in-identity 404 with the ASCII field | specified at Stage 1, never built; Next's default is in place |
| `UTC+3` in the hero system metadata | specified at Stage 1, never built; the Figma specimen that still showed `REMOTE · UTC` was corrected at 6.1 |
| Motion / GSAP / Lenis / Three.js / WebGL / canvas | never needed; the motion layer is CSS plus two small client components |
| Fake pages built only to avoid a 404 | forbidden by decision |

---

## 10. OPEN — CURRENT ONLY

Re-audited at Stage 6.2. Nothing here is called a user blocker if the work can close it.

### Real external dependencies

O1, the production domain, is **closed**: the site is live at https://evancartex.com (§8c).

| # | item | status |
|---|---|---|
| O2 | **ROUTE — 5 screens.** ROUTE is a mockup that was never deployed, so there is no running version to capture from: the files have to come from the owner. The homepage filmstrip renders labelled placeholders, and since Stage 7 the case carries a stage map of its documented path, so the project reads as deliberately pending rather than unfinished. **This does not block launch.** | **PENDING REAL ASSET** |

### Closed at Stage 6.2

| # | item | outcome |
|---|---|---|
| O3 | ЯсноДом capture | **SHIPPED** — captured from the live site at 1440 and 390, fonts settled, no chrome, no loading state. It was never a user blocker, only an unshot page. |
| O4 | Lead Radar digest card | **SHIPPED** — three sanitized panels from the real bot: the qualified card with its reasoning and 92/100, a second card at 78/100, and the decision row. |
| O6 | Hermes uptime provenance | **SHIPPED** — resolved by removing the claim rather than by asking for a fact. The metric now states the provable start month. |
| O9 · O10 | Résumé count and enumeration | **SHIPPED** — five documents now say «три системы» plus web work, matching the portfolio. The registry fact changed with them, and all five PDFs were rebuilt inside the page-fit constraints. |
| O11 | `index-bold` missing «20–30 в неделю» | **SHIPPED** — the figure was already in `content.json` and `content.md`; the document was simply out of step. `sync.py` now reports **no discrepancies at all**, for the first time. |

### Standing decisions, not blockers

| # | item | status |
|---|---|---|
| O5 | Ghost project index at 2.09–2.26:1 (§5) | **SHIPPED** at 6.1; below the 3:1 tool threshold by decision |
| O8 | **AI VISUAL has no project.** Re-audited again: nothing in the repositories is a publishable AI-visual deliverable — the résumé records it as a capability with tools and no named output. The capability stays in WHAT I BUILD, STACK and ABOUT because it is factually correct there. A deliberate absence. | **INTENTIONALLY NO PROJECT / FUTURE REAL ASSET** |
| O12 | Lighthouse `font-size` on mobile `/` — the ASCII sculpture counted as illegible text | **DEFERRED** |

---

## 11. STAGE 6.2 — WHAT IT DID

Completed 2026-09-05. The portfolio did not get bigger; it got more accurate.

1. **Hierarchy.** `tier` on every project. Three core systems keep their cases; the two
   landings became a WEB / LANDING band with one preview, one line and one live link each.
   `ProjectWide` retired, old case URLs 308 to `/work#web`.
2. **Counters.** Every "five projects" reading replaced across production, Figma and the
   résumé with three systems plus web work.
3. **Real evidence.** Five sanitized panels from real Telegram interfaces, integrated as
   `REAL OUTPUT` bands inside the two case studies that had them.
4. **HERMES repositioned** from vacancy bot to contextual operational assistant, and the
   unprovable uptime claim removed everywhere it appeared.
5. **ЯсноДом captured** from the live site.
6. **Figma** archive cleanup: the superseded Ultramarine specimen no longer calls itself
   current or selected, and the index board carries the new counts.
7. **Résumé** resynced and rebuilt; its own fact checker passes clean.

---

## 12. HOW TO USE THIS FILE

`CANONICAL_STATE.md` is the arbiter. `VISUAL_LANGUAGE.md` holds the reasoning and the
reference DNA behind the decisions; `INFORMATION_ARCHITECTURE.md` holds the structure and
the content contract; `DESIGN_SYSTEM.md` holds the tokens and the component inventory.
Those three explain **why** and **how**; this one states **what is true now**.

When they disagree, fix them — do not add a second version of the truth.
