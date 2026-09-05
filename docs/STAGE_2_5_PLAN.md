# STAGE 2.5 — FIGMA EXECUTION QUEUE

**Historical record.** The queue is spent; see
[`CANONICAL_STATE.md`](CANONICAL_STATE.md) for the current state.

Written while the Figma MCP connector is rate-limited, so that when quota returns not a
single call is spent improvising. File key is kept out of this repository.
Rules in force: [VISUAL_LANGUAGE.md §1c amendment](VISUAL_LANGUAGE.md).

Starter-plan constraints that shape the plan: **3 pages max** (the five requested pages
live as named sections) and a **hard cap on MCP calls** — so no call goes to another
documentation board. Everything below is a composition.

## PRIORITY ORDER (one call per line unless noted)

| # | call | content, already specified |
|---|---|---|
| 1 | **ACCENT BOARD v2** | Four columns in the identical specimen: ULTRAMARINE `#2C2BE8` marked `SELECTED / CURRENT`, SIGNAL CHARTREUSE `#6B8400`, INDUSTRIAL AMBER `#C25E0A`, DIGITAL MAGENTA `#C2007A`. Specimen gains two rows over the existing one: **matte-glass microplate edge** and **one distorted word**. Old board is kept as `SYS / ACCENT — HISTORY` (Registration Red, Cold Cyan). |
| 2 | **HERO_A — ASCII DOMINANT** | 1440×900. The sculpture from `scripts/ascii-sculpture.mjs` (generator embedded in the call, not the 15KB payload) at ~8px/8px line height, crossing the right margin. Fog secondary, one low light volume behind the name. Distortion budget: 1 — the `N` of EVAN sampled into dot matrix. Glass: none. |
| 3 | **HERO_B — FOG DOMINANT** | Same content, same grid. A large graphite mass occupying ~65% of the frame, leaving the viewport top-right, passing behind the positioning lines, occluding two column rules. ASCII visible only inside one sampled rectangle at the fog's harder edge. Distortion budget: 1. Glass: the `STATUS / BUILD` plate. |
| 4 | **HERO_C — HYBRID** | INDEX sharp, fog builds the volume, ASCII appears where the fog is "sampled" — a diagonal band of characters emerging from and dissolving back into the mass. One grid violation: the computational field crosses the rail boundary. Distortion budget: 2. Glass: one metadata plate. |
| 5 | **FOG — PHYSICAL OBJECT STUDIES** | Three studies at 1440×620: (a) mass leaving frame + one hard masked edge; (b) mass behind typography with grid occlusion; (c) mass dissolving into dot matrix into void — the STATEMENT transition. |
| 6 | **TYPOGRAPHY DISTORTION MICROTESTS** | One board, seven word-level tests on the same word set (EVAN · AUTOMATION · ROUTE · DIGEST · SIGNAL): partial dot matrix, single-word dither, 12% scan displacement, edge pixel sampling, ghost duplicate, local ASCII substitution, contour crossing. Each labelled with its method tier and its intended host section. |
| 7 | **MATTE GLASS — MATERIAL SPECIMEN** | One board: the plate over paper, over fog, over project media, over the dark band. Frosted backdrop, hairline edge, no shadow. Includes the "too much" counter-example marked `✗`. |
| 8 | **LEAD_A / LEAD_B** | Both keep the approved system map. A: pure index, extreme precision, zero atmosphere. B: same map + dot sampling on two nodes, one contour fragment, a restrained fog interruption behind the spine, one accent node. |
| 9 | **HERMES_A / HERMES_B** | A: metrics almost alone — `105` dominant, media at very low weight. B: metrics primary + the real interface fragment with a frosted `PROJECT 02 / LIVE / 2026` plate over one corner. |
| 10 | **ROUTE_REFINED** | Giant clipped `ROUTE`, filmstrip, `INTERFACE MOCKUP`. Adds: raster treatment at screen edges, one accent marker, ghost parenthetical index, fog behind the strip, and the image-treatment spec for the real screens when they arrive. |
| 11 | **LUMA — MEDIA TREATMENT IN COMPOSITION** | Uses the prepared assets: `07-split.png` (dither → clean seam) as the homepage state, `06-crop-180.png` as the editorial crop, `01-clean.png` as the case state, plus a frosted `CLEAN / PROCESSED` plate. |
| 12 | **STATEMENT TRANSITION + STATEMENT** | Two frames: the transition (grid → dot matrix → local distortion → dissolution → void) and the statement itself, clean, no glass, no accent, no distortion. |
| 13 | **CONTACT_REFINED** | Dark band, three links dominant and perfectly legible. **One** background device only — dark fog. One short distortion on a single ID. One small frosted calibration/status plate. |
| 14 | **MOBILE_HERO · MOBILE_HERMES · MOBILE_ROUTE · MOBILE_STACK · MOBILE_CONTACT** | 390px. Effects substantially reduced: ASCII cropped to a sampled band, fog at half strength, one distortion moment on the whole page, no glass except one status plate. |
| 15 | **04_REFERENCE_MAPPING** | R1–R13 → device → where it lives in this Figma file. Sourced from VISUAL_LANGUAGE §3. |
| 16 | **REVIEW_01** | Comparison board in the order the brief lists. Built last, from clones, only if calls remain. |

## ASSETS PREPARED LOCALLY (no Figma quota needed)

| file | use |
|---|---|
| `.assets/01-clean.png` | case default / clean proof |
| `.assets/02-grayscale.png` | archive, hover |
| `.assets/03-dither.png` | homepage default (Bayer 8×8, interface stays recognisable) |
| `.assets/04-halftone.png` | case intro / poster moment |
| `.assets/05-crop.png` | editorial crop, grayscale |
| `.assets/06-crop-180.png` | 180% fragment — composition-first crop |
| `.assets/07-split.png` | processed → clean split with a hard seam |
| `.assets/ascii-sculpture.txt` | reference render of the hero sculpture (the generator is re-run inside Figma) |
| `scripts/treat-media.mjs` | build-time pipeline, both derivatives, original untouched |
| `scripts/ascii-sculpture.mjs` | metaball field + gradient lighting, deterministic |
| `scripts/accent-check.mjs` | contrast for every accent candidate on paper and night |

## UPLOAD BATCH (one `upload_assets` call, 8 targets)

`01-clean` · `02-grayscale` · `03-dither` · `04-halftone` · `05-crop` · `06-crop-180` ·
`07-split` → the seven media slots; plus `03-dither` again → the halftone slot on the
distortion board (`14:21`). Existing empty slot ids: `16:9 16:12 16:15 16:18 16:21 16:24 16:27`.

## NOT IN THIS STAGE

No React changes. No Stage 3 implementation. No new documentation boards.
