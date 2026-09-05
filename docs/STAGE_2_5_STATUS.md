# STAGE 2.5 — FIGMA ART DIRECTION · COMPLETE

**Historical record — read with this warning.** Stage 2.5 closed and Stages 3–6 shipped
from it. A read-only recheck at Stage 6.1 found that the Figma file now holds **only the
`00_SYSTEM` page**: the hero, statement, project, motion and archive boards described below
are **not in the file**. This document records the decisions that were taken, not artwork
that still exists. Production and [`CANONICAL_STATE.md`](CANONICAL_STATE.md) are the source
of truth for composition — see [§8b](CANONICAL_STATE.md).

## FINAL PASS (2026-09-04, later)

- **Murmuration removed from the production direction** and archived on the Figma page
  `ZZ_ARCHIVE — REJECTED` (morphology, states, storyboard, intensity map, canvas spec).
  Nothing from it goes to Stage 3.
- **One motion motif: ANIMATED DISTORTION / FOG FIELD** — the existing fog material, now
  specified as motion. New board `DISTORTION FIELD / MOTION` with seven states, each
  carrying position, scale, opacity, blur, mask, raster presence, grid and text
  relationship, and behind / beside / outside content.
- **HERO_BASE is the only production hero.** `HERO_A`, `HERO_C` and `STATEMENT_B` moved to
  the archive page.
- **Hero copy fixed:** «Собираю системы, веб и автоматизации — от разбора контекста до
  работающего продукта.» Classification column changed to `AI AGENTS / WEB / AUTOMATION`;
  the rail wordmark follows.
- **AUTOMATION headline is now completely clean** — the scan window was removed from the
  hero; distortion lives in the background field instead.
- **ROUTE calmed once more** — the material strip is 120px at 42% (was 150px at 55%).
- **STATEMENT_A is production**: pure void, no fog spot, no glass, no accent, no distortion.
- **Registration Red unchanged**: `#CC2E24` / `#FF6B5E`, one hue, bound to the
  `accent/signal` variable with two modes.

**File:** EVAN PORTFOLIO — ART DIRECTION 01
the working Figma file (key kept out of this repository)

Native editable Figma nodes throughout — frames, text, vectors, boolean unions, masks,
layer/background blur, image fills. Nothing flattened into a picture of a design.

**Figma typography proxy: Inter. Production: Inter Tight.** Inter Tight is not in Figma's
font list; production typography is unchanged and no replacement display font was sought.

## PAGES AND SECTIONS

Three pages (the file was created on Starter, which capped pages at 3; the requested
five-part structure lives as named sections):

| page | sections | contents |
|---|---|---|
| `00_SYSTEM + 03_EXPERIMENTS` | `00_SYSTEM` | SYS / COLOR · SYS / ACCENT (base) · **SYS / ACCENT v2** · SYS / TYPOGRAPHY (incl. 3 dot-matrix specimens) · SYS / INDEX · SYS / MEDIA TREATMENT (7 slots, now filled with real media) |
| | `03_EXPERIMENTS` | FOG_A / FOG_B / FOG_C · FOG_FIELD · DISTORTION — SPECIMENS |
| `01_DESKTOP + 02_MOBILE` | `01_DESKTOP` | HERO_A/B/C · LEAD_A/B · HERMES_A/B · ROUTE_REFINED · LUMA_PROCESSED / _CLEAN / _EDITORIAL · TRANSITION · STATEMENT_A/B · WHAT I BUILD · APPROACH · STACK · ABOUT · CONTACT_REFINED · MATERIAL & DISTORTION MICROTESTS |
| | `02_MOBILE` | MOBILE_HERO · MOBILE_HERMES · MOBILE_ROUTE · MOBILE_STACK · MOBILE_CONTACT |
| `REVIEW_01 + 04_REFERENCE_MAPPING` | `REVIEW_01` | 27 half-scale clones in review order, labelled |
| | `04_REFERENCE_MAPPING` | R1–R13 → device → layer → where it lives, plus the deliberate rejections |

## REAL MEDIA IN THE FILE

Captured from the live sites and processed at build quality by `scripts/treat-media.mjs`:

- LUMA English — clean, grayscale, ordered dither (Bayer 8×8), halftone, editorial crop,
  180% crop, processed→clean split with a hard seam
- Hermes presentation site — clean + ordered dither

No invented screens anywhere. ROUTE's five screens remain honest empty slots.

## FILE ORGANISATION (after the plan upgrade)

Seven pages, one per purpose: `00_SYSTEM` · `01_DESKTOP` · `02_MOBILE` · `03_EXPERIMENTS` ·
`04_REFERENCE_MAPPING` · `05_MOTION` · `REVIEW_01`. The legacy combined pages were emptied
and deleted.

Dev-ready foundations added — used, not decorative:
- **Variables** — collection `EVAN / TOKENS` with two modes (*Light surface* / *Dark
  surface*): `accent/signal`, `surface/paper`, `text/ink`, `text/graphite`, `text/micro`.
  The accent pair is one variable with two mode values, which is exactly how the tonal
  pair behaves in production.
- **11 paint styles** (surfaces, text, both accent surfaces, three hairline levels).
- **9 text styles** matching the production scale (display 232 / 108 / 62, metric 248,
  lead 18, body 15, micro 11, nano 10 / 9).

## AUDIT BEFORE STAGE 3

A dedicated board on `REVIEW_01` records the four checks: **A readability** (every key word,
its treatment and verdict — all pass), **B planes / edges** (each plane's edge type is
deliberate: hard by grid, or dissolving by mask), **C typographic consistency** (one scale
everywhere; 232 belongs to the name alone; project names always 108; the 248 metric is
Hermes' role, not an effect), **D aggression budget** (HERO 85 · SELECTED WORK 60 ·
TRANSITION 100 · STATEMENT 4 · WHAT I BUILD 20 · APPROACH 45 · STACK 12 · ABOUT 12 ·
CONTACT 55 · FOOTER 5 — average ≈40%, three loud moments, the rest quiet).

## FINAL REVISION (2026-09-04)

- **Accent → REGISTRATION RED.** `#CC2E24` on paper (4.67:1), `#FF6B5E` on the dark band
  (6.80:1) — one hue, two tonal values. Ultramarine demoted to an exploration; all frames
  were swapped programmatically (27 paints).
- **Typography distortion → material, not metrics.** Every per-letter treatment removed:
  `EVAN` is whole in all three heroes and on mobile, `ROUTE` is one clean giant word,
  `GITHUB` is whole in Contact. The new primitive is the **SCAN WINDOW** — a clipped
  duplicate masked by the same text, so glyph geometry never moves. Six specimens on the
  microtest board: dot matrix, ordered dither, ASCII, raster, ghost, broad vertical strip.
- **Budget → 3–5 typography events per homepage** (was 4–7).
- **LEAD_B simplified** — contour field and pixel mass removed (42 nodes); one primary
  atmospheric trace (fog) + one secondary artifact (dot sampling) + accent node + plate.
- **HERMES_B, LUMA editorial, Contact** confirmed as selected directions.
- **New system: DIGITAL MURMURATION FIELD** — storyboard board with T0/T1/T2 phases,
  light-paper / dissolution / dark-contact states, motion rules, signal-cell rule,
  per-section intensity map and the fog relationship.
- **REVIEW_01 rebuilt** — 26 items in decision order from the revised frames, plus the audit board.
- **Murmuration re-conceived** — it was reading as a local fog-like mass; it is now an
  elongated page-spanning organism with spine / core / body / tail / wing, three states,
  a six-frame storyboard along the page, an intensity map and a motion spec.
- **HERO_BASE** — the field now runs across the whole frame as a background organism,
  separated from fog; the odd local ASCII insert was removed and the scan window on
  `AUTOMATION` was softened so the word reads first.
- **ROUTE calmed** — the processing strip narrowed to 150px at 55% and its ticks removed;
  the word is monolithic.
- **Distortion board** — each specimen now carries host-section / priority / aggressiveness
  / allowed use, and a red *what not to do* row (broken letter, collapsing word, unreadable
  crop, decorative gimmick).

## ACCENT STATE

**REGISTRATION RED is selected.** Earlier candidates stay documented in the accent
boards (measured against paper `#F2F1EE` and night `#101012`):

| | paper value | on paper | dark value | on night |
|---|---|---|---|---|
| **REGISTRATION RED (selected)** | `#CC2E24` | 4.67 | `#FF6B5E` | 6.80 |
| ULTRAMARINE (exploration) | `#2C2BE8` | 7.10 | `#7C7BFF` | 5.55 |
| SIGNAL CHARTREUSE | `#6B8400` | 3.77 | `#A8C400` | 9.56 |
| INDUSTRIAL AMBER | `#C25E0A` | 3.79 | `#E8912E` | 7.71 |
| DIGITAL MAGENTA | `#C2007A` | 5.20 | `#FF4FA8` | 6.28 |

Cold Cyan remains only in the system history board.

## THE REACT BUILD WAS NOT TOUCHED

Stage 2 production stays frozen. Nothing from this stage has been ported.
