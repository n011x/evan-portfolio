# DESIGN SYSTEM — STAGE 2 → STAGE 6.2.2

Tokens, grid, type roles and the component inventory, stage by stage. Everything here is
implemented and visible in the running site. For what is true overall,
[`CANONICAL_STATE.md`](CANONICAL_STATE.md) is the arbiter — where the two disagree, that
file wins.

## 1. STACK

| layer | choice | why |
|---|---|---|
| framework | Next.js 16.3.4, App Router, Turbopack | current stable; static export of every route |
| runtime | React 19.2.8 | matches Next 16 peer range |
| language | TypeScript 5.9.3, `strict` + `noUncheckedIndexedAccess` | 7.0.2 is the newest release but `typescript-eslint@8` still peers `<6.1.0`; 5.9.3 is the newest version the whole toolchain supports |
| styling | Tailwind CSS 4.3.3 (`@theme inline`) + hand-written token/CSS layer | utilities for layout, real CSS for the type and grid system |
| lint | ESLint 9.39.5 + `eslint-config-next` 16.3.4 flat config | `FlatCompat` fails against this version; the package's own flat exports are used |
| package manager | pnpm 10.20.0 via corepack | lockfile committed |
| screenshots | Playwright 1.62.1 driving the installed Chrome (`channel: "chrome"`, no browser download) | review artifacts, and the base for Stage 6 tests |

No Motion/GSAP/Lenis/Three — Stage 4 shipped without them and they are now closed
(CANONICAL_STATE §9). Every component is a Server Component **except three**:
`MotionGate`, `Reveal` and `MediaStates`. There is no other client JS in the page tree.

## 2. TOKENS — `src/styles/tokens.css`

Surfaces `--paper #F2F1EE`, `--paper-2 #E9E8E4`, `--paper-3`, `--night #101012`.
Ink `--ink #0B0B0C`, `--graphite`, `--gray`, `--gray-2`.
Rules `--rule` 14%, `--rule-soft` 7%, `--rule-strong` 32%.
Accent `--accent #CC2E24` (Registration Red) + `--accent-on-dark #FF6B5E` +
`--accent-mark`. Ultramarine `#2C2BE8` was the Stage-2 candidate and is superseded.
`--gray` was darkened to `#65666B` at Stage 6 for WCAG AA.
`--ghost-index #A4A29A` (Stage 6.1) is the oversized decorative project index: its own
token rather than the `--paper-3` surface tint, because it is read as type.
Motion tokens (`--ease-out`, three durations) and the field tokens are in use.

Type: `--fs-display … --fs-nano`, all `clamp()`; tracking, leading and an 8px baseline
step. Grid: `--rail`, `--margin`, `--gutter`, `--maxw 1512px`, `--band`, `--band-lg`,
re-declared at 768 / 1024 / 1440.

## 3. GRID

`.page` = `[rail][content]`. The rail is 44px from 1024 up and 0 below; the content
column is pinned with `.page-main { grid-column: 2 }` so it never collapses when the
rail is `display:none`.

`.wrap` = max 1512px, centred, `--margin` inline padding.
`.grid12` = 12 columns ≥1024, 6 columns 768–1023, 4 columns <768, gutter `--gutter`.

Supported moves: column offsets (`lg:col-start-*`), overlap (negative margins between
rows), right-edge bleed (`margin-right: calc(var(--margin) * -1)`), viewport clipping
(`.band { overflow-x: clip }`), full-bleed media, and visible column guides.

`GridGuides` draws the live column rules as a fixed overlay at ~5.5% with
`mix-blend-mode: multiply`, so the structure stays visible over paper, over recessed
bands and over media, and disappears on the dark band.

## 4. TYPE ROLES

`.display` (hero name, 92–256px) · `.display-2` (positioning lines) · `.h1` (project
names) · `.h2` (statement, metrics) · `.h3` · `.h4` (capability names) · `.lead`
(supporting prose, 34ch) · `.body` (46ch, graphite) · `.micro` (11px mono, labels) ·
`.nano` (10px mono, metadata). `.num` switches to tabular figures.

Contrast rule in force: 256px against 10px inside one composition.

Families: **Inter Tight** (display + text, Cyrillic) and **IBM Plex Mono** (micro),
both self-hosted through `next/font/google` with `display: swap`.

## 5. PIXEL PRIMITIVE

`.pixel` renders live text as a dot matrix: a `radial-gradient` tile clipped to the
glyphs (`background-clip: text`). Script-independent, so it works with Cyrillic where a
bitmap font would not. Tuned to `--pixel-size: 3px` at weight 800; **legibility floor is
~32px** — below that the matrix eats the strokes, so smaller numerals stay solid.
Used for: section IDs `/01…/07`. Everything else pixel-related is Stage 3.

## 6. COMPONENTS BUILT

layout — `Rail`, `SiteHeader` (44px touch targets), `SiteFooter`
ui — `SectionHeader`, `MetaTable`, `MetaRow`, `ArrowLink`, `RegMarks`, `StatementBand`,
`MaybeLink` (gated by `caseRoutesEnabled` in `src/lib/routes.ts`; since Stage 5 that flag is on, so it always renders a real link)
graphics — `GridGuides`, `MediaSlot`, `AsciiFieldSlot`, `SystemMap`
work — `SelectedWork`, `ProjectDiagram` (system-first), `ProjectMetrics` (metrics-first),
`ProjectTypographic`, `ProjectWide`, `ProjectHead` (index / links / stack line / fact list)
capabilities — `WhatIBuild`, `MicroGlyph`, `Stack`
approach — `Approach`, `ApproachDiagram`
about — `About` · contact — `Contact`

## 7. CONTENT LAYER

`src/content/profile.ts`, `projects.ts`, `capabilities.ts` — typed, presentation-free.
`Project` already carries `type` + `tags` so `/work` can add filtering later without a
data migration, and `visual` describes the asset that is still missing rather than
faking one.

## 7b. TWO DETAILS WORTH KNOWING

`SystemMap` draws the Lead Radar flow from percentage coordinates. The connector path is
purely orthogonal (`H`/`V` segments only), so the SVG can be stretched by
`preserveAspectRatio="none"` without distorting the geometry; `vector-effect` keeps the
hairline at 1px. Node labels are capped at 11.5ch so neighbours never collide.

`.statement-void` sets the statement band to ~46vh on mobile and ~52vh from 1024 up.
Stack entries sit at 11px mono with daily items in ink — the readability floor for that
section is "legible at 1440 without zoom", not "as dense as possible".

## 7c. STAGE 3 — WHAT THE VISUAL PASS ADDED

| piece | file | note |
|---|---|---|
| Registration Red accent pair | `styles/tokens.css` | `--accent #CC2E24`, `--accent-on-dark #FF6B5E`; `.band-dark` swaps the hue's light tonal value in, so the signal stays legible on the dark band |
| Distortion / fog field | `components/graphics/DistortionField.tsx` | six per-band variants (hero · work · route · media · calm · contact). Layered radial gradients inside an irregular mask + blur — never an ellipse. Absolute, behind content, `aria-hidden`, non-interactive. Mobile drops opacity to 0.6 and blur to 60px |
| Grain | `components/graphics/Grain.tsx` | fixed 3px dot pattern at 3.5% |
| ASCII sculpture | `scripts/gen-ascii.mjs` → `content/ascii.ts` → `components/graphics/AsciiSculpture.tsx` | metaball field lit by its own gradient, pre-computed at build time. One `<pre>`, ~8KB desktop / ~1.3KB mobile, masked at the edges so it dissolves instead of ending on a cut |
| Matte glass | `components/ui/GlassPlate.tsx` + `.glass` | flat, matte, `backdrop-filter: blur(18px)`, 1px edge, no shadow, with a solid fallback via `@supports`. Three on the page: hero, Hermes, LUMA, plus the contact calibration plate |
| Real project media | `scripts/build-media.mjs` → `public/media/*.webp` + `components/graphics/ProjectMedia.tsx` | both derivatives per asset. Hermes: processed + clean proof. LUMA: the processed→clean split as the homepage state |
| Signal accent | `.signal`, `.signal-dot`, `.mark` | one node in the system map (QUALIFY), the ROUTE status, the contact status, focus rings |

Field intensity per band follows the approved storyboard: HERO high · LEAD/ROUTE medium ·
HERMES/LUMA/WHAT I BUILD/APPROACH low · STACK/ABOUT minimal · STATEMENT none · CONTACT
dark variant. The quiet sections are genuinely quiet.

## 7d. STAGE 4 — MOTION

**PRIMARY — the distortion / fog field.** One continuous material, not a set of effects.
Each band renders three mass nodes: two carry different masks and cross-fade on a long
cycle (that is the silhouette morph — no expensive property is animated), the third is the
light volume. Drift is `transform: translate3d + scale` at 28 / 34 / 40s, cross-fade at
22 / 26 / 30s, light layer at 46s. Nothing but `transform` and `opacity` animates, so the
compositor does the work and text never reflows — measured drift of the `h1` during a
1.5s animation window: **0px**.

Placement rule enforced in `DistortionField.tsx`: the mass sits beside or behind a
composition, never washing a headline. ROUTE's field was moved out of the wordmark band
entirely; LEAD RADAR's sits top-right so the project name keeps full ink density.

**SECONDARY — reveals and micro-interactions.**
- `Reveal` (`components/motion/Reveal.tsx`): one `IntersectionObserver` per node, no scroll
  listener, no per-frame JS. Two kinds — `block` (opacity + 14px translate, 620ms) and
  `rule` (a hairline wipe via `clip-path`, 720ms). **Geometry after a reveal is identical
  to the static composition** — nothing scales, tracks, shifts baselines or breaks letters.
- Links, buttons, nav and metadata: colour/border transitions at 200–220ms, no spring.
- `MediaStates` (`components/graphics/MediaStates.tsx`): the processed → clean wipe. A
  `clip-path` inset with a hard editorial seam, 420ms. The image is never scaled or
  deformed — it is the same file underneath. Pointer devices wipe on hover/focus; coarse
  pointers settle on clean by themselves once the block has been seen, so nothing is hidden
  behind a tap.

**Motion budget.** HERO field · SELECTED WORK field + reveals · TRANSITION field ·
STATEMENT nothing at all · WHAT I BUILD / STACK / ABOUT reveals only · CONTACT field, very
quiet. No kinetic typography anywhere.

**Guarantees.** `MotionGate` (one `visibilitychange` + one media-query listener, zero
render loop) sets `data-motion="off"` on the document while the tab is hidden or when the
user prefers reduced motion; the CSS pauses every field animation on that flag.
`prefers-reduced-motion` additionally disables all keyframes and shows every reveal in its
final state — the page is complete and static. Background material stays
`pointer-events: none` and `aria-hidden`. No WebGL, no canvas, no library: the whole motion
layer is CSS plus two tiny client components.

**Mobile degradation order:** glass backdrop-filter → field complexity (opacity 0.55,
blur 56px, longer cycles) → motion frequency. Typography and layout are never touched.

## 7e. STAGE 5 — PROJECT SYSTEM

| piece | file |
|---|---|
| archive | `app/work/page.tsx` — editorial index (index row + summary + stack per project) and a contact sheet of processed thumbnails, plus the calibration wedge. No filter UI in v1 |
| case template | `app/work/[slug]/page.tsx` — head (index/type/year, name, deck, ROLE·STACK·STATUS, live links), hero visual, then CONTEXT · PROBLEM · APPROACH · SYSTEM/ARCHITECTURE · IMPLEMENTATION · RESULT · GALLERY · pending notes · NEXT PROJECT |
| bands | `components/case/CaseBand.tsx` — one idea per band, index + title + a 52ch measure, slower rhythm than the homepage |
| gallery | `components/case/CaseGallery.tsx` — **clean by default**: inside a case the interface is the evidence |
| content | `content/cases.ts` — every line traceable to the repository README, the résumé source or the live site |

The case pages reuse the homepage system unchanged: same grid, rail, type scale, field
variants (`calm` / `work`), reveals and Registration Red. No new visual system was added.
`generateStaticParams` prerenders all five cases; each has its own `<title>` and description.

## 7f. STAGE 6 — RESPONSIVE · ACCESSIBILITY · TECH

Stage 6 changed no composition. Four things moved, each for a measured reason.

**Tertiary gray darkened.** `--gray` `#7d7e83` → `#65666b`. The old value read 3.58:1 on
`--paper` and failed WCAG 1.4.3 on every `.micro` and `.nano` label on the site — the
metadata layer is where most of the type lives, so this was not a corner case. The new
value reads 5.07:1 on `--paper` and 4.67:1 on `--paper-2`. `--graphite` (9.92:1) still sits
clearly above it, so the three-step ink hierarchy is intact. The night-surface gray
`#8b8c91` already passed at 5.66:1 and is unchanged.

**Target size.** WCAG 2.2 SC 2.5.8 wants 24×24 CSS px. `.link-arrow` is 18px tall by
design — the rule sits on the baseline of the label and moving it would change the mark.
So the rule stays where it is and a transparent `::after` extends the target to 24px.
No visual change, no layout change. The footer's BACK TO TOP gets `min-height` instead.

**Offscreen bands are not rendered.** `.band:not(.band--eager)` carries
`content-visibility: auto` with `contain-intrinsic-size: auto 980px`. The homepage is
roughly ten screens of fog fields, masks and diagrams; rendering all of it at load cost
702 ms of blocking time on a throttled phone. Deferring it costs nothing visually and
brings that to 10 ms. The hero and the first band of each subpage opt out via
`band--eager`. A print override restores full rendering.

**The hairline reveal no longer uses `clip-path`.** `[data-reveal="rule"]` clipped itself
to zero width, which made its intersection rect empty, which meant the observer that was
supposed to reveal it never fired: every band separator on every case page was invisible.
It is now a `scaleX(0) → scaleX(1)` wipe from the left — same gesture, compositor-only,
and the observed geometry no longer depends on the effect.

Everything else in this stage is outside the composition: metadata, canonical URLs,
Open Graph (`app/opengraph-image.tsx` renders the hero's own logic at 1200×630),
`sitemap.ts`, `robots.ts`, Person + CreativeWork JSON-LD, security headers,
`output: "standalone"`, and the Docker/README production path.

## 7g. STAGE 6.1 — FACTUAL CLEANUP

No composition changed. Three things moved in the code.

**`--ghost-index`.** The oversized `(01)…(04)` behind each project head was `--paper-3`
on `--paper` at 1.21:1 — quiet to the point of looking like a printing accident. It now
has its own token at `#A4A29A`: 2.26:1 on `--paper`, 2.09:1 on `--paper-2`. That is
deliberately short of the 3:1 large-text threshold — the brief was 2:1–3:1, because this is
non-semantic display material and it must not compete with the project name. Separate
token, so the `--paper-3` surface tint keeps its own meaning.

**The left rail.** It hardcoded `AI PRODUCTS · WEB · AUTOMATION` while the hero said
`AI AGENTS`. It now renders `profile.roleLines`, so the two cannot drift again.

**LEAD RADAR's ROLE.** `PRODUCT · BUILD · REVIEW` → `PRODUCT · SETUP · REVIEW`. Nothing in
the case, the repository or the résumé supports code authorship; the résumé says plainly
that the models write the code. See [`CANONICAL_STATE.md` §3](CANONICAL_STATE.md).

## 7h. STAGE 6.2 — HIERARCHY AND EVIDENCE

**Two tiers, one source.** `tier` on each project decides everything: `core` gets a case
page and a homepage archetype, `web` gets a row in the WEB / LANDING band. Nothing else in
the code asks "is this featured?" any more — `featured` is gone.

| piece | file |
|---|---|
| web band | `components/work/WebExamples.tsx` — preview, name, type, one line, stack, `VIEW LIVE ↗`. Deliberately carries none of the case grammar |
| evidence plate | `components/case/EvidencePlate.tsx` — evidence window + system readout in one editorial object. The window is built from the capture's own pixel size, `object-fit: contain`, safe inset, never enlarged. See [`CANONICAL_STATE.md` §3](CANONICAL_STATE.md) |
| boundary check | `scripts/evidence-boundary-check.mjs` — asserts at nine widths that no layout crops, stretches or enlarges a capture |
| sanitizer | `scripts/sanitize-evidence.mjs` — crops the raw captures, strips Telegram chrome, masks private detail. Raw sources stay in `.private-assets/`, never committed |
| ЯсноДом capture | `scripts/capture-yasno.mjs` — the live page at 1440 and 390, fonts settled, no chrome |

`ProjectWide` (archetype D, WEB / MEDIA) is retired: no project uses it now.

## 8. WHAT THE SITE STILL DOES NOT HAVE

The Stage-2 exclusion list is spent: animated fog, the ASCII artwork, dithering, halftone
assets, scroll reveals, hover treatments, line drawing, grain and the calibration graphics
all shipped in Stage 3/4, and `/work` + `/work/[slug]` shipped in Stage 5 — no link on the
site is inert.

What is still absent, by decision rather than by schedule: page transitions, scan smear,
media pixel reveal, glitch as a hover state, a custom 404, and a UTC clock in the hero
metadata. See [`CANONICAL_STATE.md` §9](CANONICAL_STATE.md) for why each is closed.

Review screenshots are captured from `pnpm build` + `pnpm start` (production render), so
no dev indicator or toolbar can appear in them.
