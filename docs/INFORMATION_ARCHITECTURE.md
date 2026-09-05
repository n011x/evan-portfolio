# INFORMATION ARCHITECTURE

**Status: implemented.** This document holds the structure and the content contract. For
what is true in the running site, [`CANONICAL_STATE.md`](CANONICAL_STATE.md) is the
arbiter — where the two disagree, that file wins.

Settled: name `EVAN`; language = RU prose + EN system labels; Lead Radar is project 01
with a repo link.

Content source of truth: the `myresume` sibling repository (`content.md` +
`content.json` (fact registry), plus the real repositories `lead-radar`, `hermes_agent_ai`.
Nothing here may be invented. Material with no confirmed source is recorded as an open
item in [`CANONICAL_STATE.md` §10](CANONICAL_STATE.md) and stated on the page as missing.

---

## 1. THE 5–10 SECOND CONTRACT

Above the fold, in this reading order:

1. **name** — `EVAN` (display scale) — confirmed
2. **what** — `AI AGENTS · WEB · AUTOMATION` (three lines, oversized)
3. **supporting statement (RU)** — «Собираю системы, веб и автоматизации — от разбора
   контекста до работающего продукта.» This is the shipped wording; the meaning may not
   change.
4. **proof marker** — `05 PROJECTS · 03 LIVE LINKS · 2+ MO HERMES UPTIME` (the uptime
   metric names the project it comes from — it is Hermes', not a platform statistic)
5. **primary action** — `VIEW WORK ↓`
6. **secondary actions** — `TELEGRAM ↗ · EMAIL ↗ · GITHUB ↗` (micro type, right edge)
7. **system metadata** — `STATUS: OPEN TO WORK` · `REMOTE` · build string · year
   (no UTC clock — specified here at Stage 1, never built)

### OUTPUT FIRST, TOOLS SECOND

The hero states **what gets built**, not how it gets built. Claude Code, Codex and
prompt-based development are **not** the message of the first screen — they surface
later, in APPROACH, STACK and the project cases, where they are evidence of method
rather than the headline.

`STATUS: OPEN TO WORK` and `REMOTE` are **system metadata**, on the same level as
LOCATION / YEAR / BUILD / UTC — never a badge, never a button, never a hero centrepiece.

No greeting formula. No "Hi, I'm". No adjectives about myself. No "digital experiences"
or comparable abstraction. Contact is present but typographically subordinate to the
work link.

---

## 2. ROUTES

| route | purpose | render |
|---|---|---|
| `/` | full self-contained pitch: identity → work → what → how → stack → about → contact | Server Component, static |
| `/work` | complete archive: **editorial work index + contact sheet**, no filter UI in v1 | static |
| `/work/[slug]` | case study, one per project | `generateStaticParams`, static |
| `/_not-found` | Next's default 404 — the in-identity ASCII version was specified at Stage 1 and **not built** | static |
| later, optional | `/about` — only if the About band outgrows the homepage | — |

`/about` is deliberately **not** a route: the homepage About band carries it.

**`/work` in v1** — one page that shows the whole range at a glance: project index rows
(`INDEX · NAME · TYPE · YEAR · STATUS · one line · LIVE ↗ / CASE ↗`) plus a contact-sheet
grid of processed thumbnails at varying scale, on a strong grid, with calibration and
system details. **No tabs, no filter control** — five projects do not need one, and the
control would be pure UI overhead. `type` and `tags` are carried in the project data
model so filtering can be added later without a data migration.

---

## 3. HOMEPAGE SECTION ORDER AND WEIGHT

| ID | section | job | approx. height | density |
|---|---|---|---|---|
| `00` | NAVIGATION | thin sticky header: wordmark, WORK, ABOUT, CONTACT, UTC clock, availability | 56px | index |
| `01` | HERO | identity + positioning + route to work | 100vh | index over distortion |
| `02` | SELECTED WORK | **the centre of the site** — 4 projects, each with its own composition | 4 × 90–110vh | high, alternating |
| — | STATEMENT BAND | one line on fog, near-empty; resets the eye after the work run | 70vh | fog |
| `03` | WHAT I BUILD | 5–6 capability rows, key/value form, micro-diagram glyphs, one fog column | 80vh | medium |
| `04` | APPROACH | the 5-node pipeline diagram; how I actually work | 90vh | diagram |
| `05` | CAPABILITIES / STACK | dense 4-column technical index against a void | 80vh | very high |
| `06` | ABOUT | short bio, background, the "one person, end to end" fact, fun facts as a micro list | 70vh | low |
| `07` | CONTACT | the single dark band; three links, oversized; availability | 90vh | index on dark fog |
| `08` | FOOTER | status bar, calibration wedge, dot-map, wordmark, build string, © | 40vh | micro |

Total ≈ 9 bands. Work occupies roughly half the page height — that is the hierarchy
statement. The statement band exists so the four projects do not read as a list.

---

## 4. SELECTED WORK — SYSTEM

Same underlying data model and metadata block for every project; four different
compositions so the run never reads as cards.

Per-project fields (all rendered):
`INDEX` · `NAME` · `TYPE` · `YEAR` · `ROLE` · `SUMMARY` (1–2 dry sentences) ·
`STACK` · `RESULT` (only if confirmed) · `STATUS` · `VISUAL` · `VIEW CASE ↗` ·
`LIVE ↗` (only where a real link exists)

**Archetype rule (revised at the Stage 2 review):** the four blocks must stay
compositionally different with images, colour and motion removed.
01 = SYSTEM (the map arrives before the name), 02 = RUNNING PRODUCT (three confirmed
numbers at three scales in three grid zones build the composition; the screenshot is
supporting evidence), 03 = INTERFACE (oversized clipped type + screen filmstrip),
04 = WEB / MEDIA (one large media field, the name crossing its edge).

**Metadata layers must not mix:** `ROLE` = contribution, `STACK` = technology,
`APPROACH` = method. "Prompts" is a method and therefore never appears in a ROLE.
`TYPE` uses a small, honest taxonomy: `AI / AUTOMATION`, `AI AGENT`, `INTERFACE`,
`WEB / LANDING`.

**A fact is stated once.** Numbers live in the fact line / metric block; the summary
says what the project is. A status shown as `INTERFACE MOCKUP` is not repeated as prose.

| # | project | composition | visual asset | confirmed facts available |
|---|---|---|---|---|
| 01 | **LEAD RADAR** | full-bleed, diagram-led: the real ingest→qualify→rank→digest pipeline drawn in our node language | own architecture diagram (no screenshot needed) | production Python service, source registry, SQLite/WAL ledger, deterministic pre-filter, Groq structured qualification, ranking + dedupe, 10:00/16:00 digest windows, max 10 cards/window, owner-only Telegram actions, systemd hardening, sanitized public snapshot |
| 02 | **HERMES PERSONAL AGENT** | split: left oversized name + meta, right halftoned interface fragment; pixel numerals for the metrics | presentation-site capture — **shipped** (`public/media/hermes-{clean,processed}.webp`) | Telegram agent on Ubuntu VDS, Telegram Gateway as a systemd service, Python 3.11, workspace + memory + rules + skills + schedules; ~105 vacancies/month, 20–30/week; 2+ months without a restart; built in ~5 hours; live link |
| 03 | **ROUTE** | oversized typography + cropped mobile screens as a filmstrip; explicitly labelled `INTERFACE MOCKUP — NO CODE` | 5 screens — **still missing** (CANONICAL_STATE §10, O2); filmstrip renders labelled placeholders | 5 screens, 4 stages portfolio→applications→interview→offer, day goal + bottleneck + timeboxed tasks, built in Codex, in progress, not deployed |
| 04 | **LUMA ENGLISH** | large interface fragment, near-full-bleed, clipped name over it | screenshot of the live site (capturable) | demo landing for an online English school, React + Vite + Vercel, local fonts, 7 sections, 3 programmes, 3 tariffs, payment not connected, ~3 hours, live link |
| 05 | **ЯСНОДОМ / YASNO HOUSE** | archive row on `/`, full case on `/work/yasno-house` | screenshot of the live site (capturable) | one-action landing, name+phone → PDF selection, 6 blocks, 2 forms, consent, React + Vite + Vercel + Manrope, numbers/photos/brand are marked placeholders, ~3 hours, live link |

LEAD RADAR additionally carries a project-specific `SOURCE ↗` link to
`github.com/n011x/lead-radar` inside its metadata block and case — separate from the
site-wide GitHub profile link.

Homepage shows 01–04 in full compositions; 05 appears as an index row plus the
`ALL WORK (05) ↗` link. **`ALL WORK` closes SELECTED WORK** — it sits on the section's
closing rule after the archive row, with a clear gap before the statement band, so the
statement is never read as archive navigation.

`/work` and `/work/[slug]` exist from Stage 5: `caseRoutesEnabled` is on, every case link
navigates, and nothing in the composition moved when the flag flipped (`MaybeLink` swaps a
`span` for a `Link` with the same classes). All five projects are prerendered as static
HTML. Rationale: four full compositions is the maximum before the
run loses rhythm, and Yasno is self-declared as a placeholder-content demo.

**Ordering rationale:** engineering depth first (Lead Radar), then the running product
with real numbers (Hermes), then product/interface thinking (ROUTE), then web execution
speed (LUMA). The sequence reads as a claim: *systems → products → interfaces → speed.*

---

## 5. CASE STUDY TEMPLATE (`/work/[slug]`)

Fixed skeleton, per-project art direction inside it:

`INDEX / YEAR / TYPE` → `NAME` → `SUMMARY` → `ROLE · STACK · STATUS` (meta table) →
`HERO VISUAL` → `CONTEXT` → `PROBLEM` → `APPROACH` → `SYSTEM / ARCHITECTURE` (diagram) →
`IMPLEMENTATION` → `RESULT` (omitted entirely when unconfirmed) → `GALLERY` →
`NOTES` (only if real) → `NEXT PROJECT ↗`

Left rail carries a section counter (`04/09`) and the sections as anchors. The case
inherits the homepage's grid and fog, but runs a narrower measure and a slower rhythm —
one idea per band, more whitespace, fewer oversized moments than the homepage.

**Built in Stage 5.** LEAD RADAR is the full case: context, problem, approach, an eight-row
SYSTEM / ARCHITECTURE spec drawn from the repository, implementation, and a RESULT band
carrying the operational facts the owner confirmed — stable running without constant manual
restarts, 6–10 relevant opportunities on a regular basis (no period is invented), and one
real order already closed through a lead the system found. The repository's test count sits
below, at micro size, labelled as technical evidence rather than a result. HERMES carries a RESULT band (the confirmed
metrics) and a two-image gallery. ROUTE, LUMA and ЯСНОДОМ get honest short cases; a band
with no material is dropped, never padded, and the missing visuals are stated in a
`pending` line instead of being faked.

---

## 6. WHAT I BUILD (real, from content.md)

This section answers *«что этот человек способен собрать»*, not *«какими методами он
пользуется»*. Methods live in APPROACH and STACK.

| # | capability | line |
|---|---|---|
| 01 | AI PRODUCTS / AGENTS | Telegram agent that keeps context and runs on a schedule — a **capability row name**, not the hero classification, which is `AI AGENTS` |
| 02 | AUTOMATION | scheduled jobs: morning digest, Monday summary |
| 03 | WEB / LANDINGS | single-page sites with a working form, structure to live link |
| 04 | INTERFACES | screens and transitions designed before any code exists |
| 05 | AI VISUAL | images and video, including node pipelines |

**PROMPT ENGINEERING is removed from this section** — it is a method, not a category of
result. It moves to APPROACH (step 03) and to STACK (AI / AGENTS group).

Decided while building: `DIGITAL SYSTEMS` is the section's **umbrella label**, not a
sixth row — as a row it only repeated 01/02/04. No category is kept for symmetry.
A capability with no confirmed project mapping shows an empty cell, never `→ —`.

Each row: number, name, one line, micro diagram glyph, and the projects that prove it
(`→ 01, 02`).

## 7. APPROACH (real 5 steps, from content.md §7)

`01 PROBLEM IN WORDS` → `02 HOW A PERSON USES IT` → `03 BUILD THE WORKING VERSION` →
`04 TEST ON MYSELF` → `05 FIX WHAT BROKE`

Rendered as the R4 node pipeline: 5 labelled nodes, drawn connectors, dot joints, and a
loop-back edge from 05 to 01 (the real process is a loop, and that edge is the honest
part of the diagram). A one-line note per node, no marketing prose.

Step `03 BUILD THE WORKING VERSION` is where Claude Code / Codex are named — in the
supporting line, as the method. The tool is never the headline noun, here or anywhere.
The diagram is not annotated with an explanation that it is a process.

## 8. STACK (real, from content.md §4)

Technical index, four groups, `●` = daily:

- **AI / AGENTS** — Claude Code ● · Codex ● · prompt engineering ● · ChatGPT · Claude (web) · Cursor · MCP servers · skills / subagents · OpenAI SDK / OAuth
- **WEB** — React · Vite · Vercel · HTML/CSS · JavaScript · (Next.js + TypeScript — added by this site itself)
- **AI VISUAL** — Midjourney · Sora · Kling · Flux · Nano Banana · Higgsfield · Weavy / Figma Weave
- **INFRASTRUCTURE** — Ubuntu VDS · SSH keys · systemd · cron · Telegram Bot API · Google Sheets API · bash · Python 3.11 · SQLite/WAL · Groq API

Footnote kept from the source: server and deploy were set up through Codex, on my
prompts and under my control. No logo wall.

## 9. ABOUT (real)

- since 12.2025 AI visual; since 06.2026 AI products, automation and web
- works alone and remotely, from the problem statement through build, launch and review;
  tests in real use, on himself
- **About adds human context only** — it does not repeat the project count, the live-link
  count or any metric already shown in the hero and in Selected Work, and it does not
  build the identity around prompting. The Codex deploy note belongs to the stack
  footnote / a case, not to the bio.
- background: HoReCa since 2020, ~6 years, bartender → head bartender; music ~6 years (beats, sound design, channel `@casperdecartex`)
- micro list: running · gym · boxing · beats · AI visual experiments
- forbidden words (from the source registry): senior, эксперт, амбициозн, целеустремл, страстно, саморазвитие

## 10. CONTACT

- `TELEGRAM ↗` `@n011x`
- `EMAIL ↗` `kostyuchenko.corp@gmail.com`
- `GITHUB ↗` `github.com/n011x` — the site-wide GitHub link (hero, contact, footer)
  always points at the **profile**, never at a single repository
- availability: `STATUS: OPEN TO WORK` + `REMOTE`, rendered as system metadata, not as a CTA
- tagline from the source, kept as the closing line: *«Идея вечером — рабочая ссылка утром.»*
- no form, no scheduler, no newsletter, no unsourced microcopy
- `STATUS` appears in the header and in Contact. The footer carries the system row
  (wordmark, build, year, calibration, back to top) without repeating the status or the
  statement — the statement exists exactly once, in the statement band.

## 11. NOT ON THE SITE

Never rendered anywhere (from the source's forbidden list): phone number, server IP,
hostname, Yasno placeholder figures, Instagram is optional-only, private repo contents,
memory contents, credentials.

## 12. SEO / METADATA SHAPE

- `<title>` — `EVAN — системы, веб, автоматизации` (shipped)
- one `h1` per page; project names are `h2` on `/`, `h1` on the case
- JSON-LD: `Person` + `hasPart` `CreativeWork` per project
- OG image: generated from the hero ASCII field at build time (`next/og`)
- `sitemap.ts`, `robots.ts`, per-page canonical URLs — **shipped**; absolute URLs fall back
  to `http://localhost:3000` until `NEXT_PUBLIC_SITE_URL` is set (CANONICAL_STATE §10, O1)
