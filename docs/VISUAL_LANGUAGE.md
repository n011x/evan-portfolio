# VISUAL LANGUAGE

**Status: implemented.** This document holds the reasoning and the reference DNA behind the
identity. For what is true in the running site, [`CANONICAL_STATE.md`](CANONICAL_STATE.md)
is the arbiter — where the two disagree, that file wins.

Type set: **Inter Tight** (display/text) + **IBM Plex Mono** (micro), pixel type via a
**CSS dot-matrix mask** (no bitmap font, Cyrillic-safe). RU prose + EN system labels.

---

## 1. CONCEPT

**INDEX & FOG**

Two systems occupy the same page and never merge.

**INDEX** (the system half — ~70%)
A measuring instrument. Hairline rules, a visible column grid, section IDs, key/value
metadata tables, coordinates, counters (`03/05`), status strings, registration marks,
node diagrams. Everything is labelled, numbered, addressable. This layer carries
100% of the information.

**FOG** (the flow half — ~20%)
Large, amorphous, almost colourless volumes of diffuse light and graphite that drift
slowly behind and between the index. Grain over everything. Type that sits on fog
loses a little of its edge. This layer carries zero information and can be removed
without losing a single fact.

**DISTORTION** (the computational half — ~10%)
The moment where the machine shows through: dot-matrix numerals, ASCII/character
rendering, ordered dithering and halftone on every project image, one-frame scan
displacement, pixel dissolve on reveal. Rare, sharp, signature.

The tension is deliberate: **a cold technical document that is slowly being weathered
by atmosphere.**

### 70 / 20 / 10 IS A GLOBAL RULE, NOT A PER-SECTION QUOTA

The ratio describes the **whole site**, measured across the page. It is explicitly **not**
a budget each section has to spend. A single band may be 95% INDEX, or almost entirely
FOG, or exist only to be one rare DISTORTION moment.

**DENSITY THROUGH ALTERNATION, NOT THROUGH AVERAGING.**

Homepage rhythm target:

```
DENSE INDEX   hero
     ↓
VISUAL        project 01
     ↓
DENSE INDEX   project 02 meta
     ↓
VOID          statement band
     ↓
ATMOSPHERE    what i build (one fog column)
     ↓
DIAGRAM       approach
     ↓
EXTREME DENSITY  stack
     ↓
VOID          about
     ↓
DARK          contact
```

A layout where every screen contains a little of everything is a template. FOG is a
global spatial language and crosses band boundaries, but it does not have to be visible
in every band. DISTORTION stays rare — when it appears, it must be felt.

**One-line test for every element added from here on:**
does it belong to INDEX, FOG, or DISTORTION — and does it push its band further towards
its extreme, or towards the middle? Only the first is allowed.

---

## 1b. THE INTERFACE DOES NOT EXPLAIN ITS OWN DESIGN

No copy on the site may justify a design decision, explain why a section is named the
way it is, restate the internal brief, or point out what was deliberately left out.
Documentation copy lives in `docs/`; the page carries information only.

Every system label must answer at least one of: **WHAT · WHERE · WHEN · STATUS ·
SOURCE · POSITION**. A label that only answers "why the designer did this" is deleted,
and the space it occupied stays empty — removed lines are never replaced with new filler.

INDEX language is not a comment beside every element. Useful annotations (TYPE, YEAR,
ROLE, STATUS, STACK, BUILD, REMOTE, section and project IDs, real metadata) stay;
annotations that exist to demonstrate how conceptual the system is do not.

## 1c. AMENDMENT — DIGITAL NEWSPAPER (2026-09-04)

The identity gets bolder without getting heavier. Boldness comes from **contrast
between calm and expressive moments**, never from adding elements everywhere.

**Character:** DIGITAL NEWSPAPER × EDITORIAL INDEX × ATMOSPHERIC FOG ×
CONTROLLED DISTORTION × VERY LIGHT MATTE GLASS. A contemporary publication about
digital systems — not a dashboard, not a terminal, and not retro print cosplay
(no beige nostalgia, no serif revival, no fake ink, no "BREAKING NEWS" props).

Editorial devices to strengthen: folio-like section numbering, project index rows,
datelines, issue/build metadata, column rules, narrow caption columns, project decks,
footnote-style sources, archive counts, crop marks, baseline fragments. Used
selectively, never all at once.

### Aggression budget

| level | sections |
|---|---|
| HIGH | HERO · ROUTE · the transition into STATEMENT · CONTACT |
| MEDIUM | LEAD RADAR · HERMES · LUMA media · APPROACH |
| LOW | WHAT I BUILD · STACK · ABOUT · FOOTER |

Target scroll wave: HERO high → LEAD medium → HERMES medium → ROUTE high →
LUMA medium → transition (short high event) → STATEMENT void → WHAT I BUILD low →
APPROACH medium → STACK low/dense → ABOUT low → CONTACT high → FOOTER very low.

### The grid breathes

Visible in INDEX sections · partially occluded under MEDIA · dissolving inside FOG ·
almost gone in STATEMENT · nearly absent in CONTACT · locally fragmenting into dots
where DISTORTION appears. Alignment never changes — only the grid's visibility does.
The grid is infrastructure; it does not have to announce itself.

### FOG becomes a physical object

Large irregular atmospheric masses, 50–80% of a frame, allowed to leave the viewport,
pass behind typography, occlude grid lines, carry grain, keep **one slightly harder
masked edge** and dissolve completely elsewhere. Light, smoke, graphite, optical glass —
never a UI gradient blob, and never dark enough to make the page heavy.

### Matte glass — 1–3% of the page

A small piece of optical material laid on the page, not a design system. Flat translucent
rectangle + frosted backdrop + hairline edge, almost no shadow, low saturation.
Allowed: one compact metadata plate, a small floating system label, a tiny status
overlay, one hero overlay element, one caption over project media, an occasional
transition artefact. Never: large glass cards, rounded SaaS panels, glow, heavy shadows,
nested glass, glass behind body copy, or two glass elements in one viewport.
**3–5 meaningful glass accents on the whole homepage is the ceiling.**

### Typographic distortion — the material changes, the metrics do not

**DISTORTION CHANGES THE MATERIAL OF TYPOGRAPHY, NEVER ITS METRICS.** Baseline, kerning,
glyph positions, word width and silhouette stay exactly as set. No letter ever falls out
of line, shifts independently, or degrades on its own — that reads as damage, not as a
machine.

Distortion applies to **whole words** or to **one large contiguous region**:

- solid word → dot-matrix word
- solid word → ordered-dither word
- solid word → halftone / raster word
- a wide **SCAN WINDOW** crosses the word and changes only the rendering inside it

**SCAN WINDOW is the primary primitive.** A rectangular, soft-edged region passes over a
clean word. Outside it: vector type. Inside it: the same glyphs rendered as dots, dither,
ASCII or raster. The geometry underneath never moves, so the sequence
`VECTOR → DOT MATRIX → VECTOR` reads as *a digital sensor scanning a printed word* —
implemented as a clipped duplicate masked by the same text, never as a second typesetting.

Homepage budget — **3–5 events on the whole page**, and the largest display typography stays predominantly clean: HERO 1 · LEAD/HERMES/ROUTE/LUMA 2
total · APPROACH 0–1 · CONTACT 1 · STATEMENT 0 · STACK 0 · ABOUT 0 · FOOTER 0. Body copy
is never distorted. Fewer is better.

### ASCII becomes a signature sculpture

One very large computational object: form and volume at distance, characters up close.
It may pass behind fog, blur, degrade into dot matrix, break a grid line and fade to
nothing. No terminal chrome around it.

### Controlled grid violations

At most two structural violations besides ROUTE — preferably HERO and the transition
into STATEMENT. The editorial system must be intact enough that the violation reads as
deliberate.

### Media: composition before filter

Treatment and placement work together: 160–220% crops, partial UI fragments, one
processed fragment against one clean proof fragment, asymmetric clipping, media crossing
grid columns, a clean area transitioning into a raster area, a small frosted caption
plate over one region. The real interface always stays understandable.

### Accent — REGISTRATION RED (selected)

**REGISTRATION RED is the accent family.** It means editorial registration, print signal,
technical mark, system warning — a notification that owes nothing to SaaS aesthetics.

One hue, two tonal values (a tonal pair is still one accent system):

| surface | token | contrast |
|---|---|---|
| light paper | `#CC2E24` | 4.67 : 1 on `--paper` |
| dark contact | `#FF6B5E` | 6.80 : 1 on `--night` |

Ultramarine `#2C2BE8`, Signal Chartreuse, Industrial Amber, Digital Magenta, Cold Cyan
remain documented explorations only.

Red is rare: one diagram node, a project marker, a 1px rule, the scan-window indicator,
a status signal, a registration mark, a glass edge, a data indicator, a signal cell inside
the murmuration. Never a large fill, a big red heading, a gradient or a glow.

### ANIMATED DISTORTION / FOG FIELD — the only large motion motif

**The murmuration exploration is rejected and archived.** It demanded a second visual
language of its own and read as a concept sitting on top of the concept. It lives in the
Figma page `ZZ_ARCHIVE — REJECTED` as history and is not part of the implementation spec.

The site's one large motion motif is the **fog / distortion material that already exists**,
brought to life. It is not a new object and not a new style — it is the same material,
moving.

**Character.** A large, soft, amorphous digital mass. No fixed geometry. It drifts along
the page, changes scale, position, density and shape, sometimes leaves the viewport,
sometimes almost disappears. It may cross the grid and pass behind large typography.
It is never a spotlight, a glow, a blob-UI shape or a particle swarm.

**Tempo.** One drift / morph cycle takes **15–30s**. Scroll may shift its position and
phase slightly; the cursor does not participate. No sharp parallax, no mouse-following.

**Rules.**
1. Body text always stays readable; key metadata, links and metrics never lose contrast.
2. The field may pass through empty space, across the grid, beside a headline, partly
   under large type, or along the edge of media.
3. It must not sit permanently under the main copy — where it crosses a text area, its
   intensity drops to a minimum.
4. Its loudest states belong to HERO, the transition, selected project compositions and
   CONTACT. STACK, ABOUT and long body zones stay nearly clean.

**Seven documented states** (board `DISTORTION FIELD / MOTION`), each specified by
position, scale, opacity, blur, mask shape, raster presence, relationship with the grid
and with the text, and whether it sits behind / beside / outside content:
HERO (20% · blur 110 · behind the headline) · SELECTED WORK (12% · 100) ·
ROUTE / TRANSITION (24% · 70, densest, briefly shows dot matrix at the edge) ·
LUMA / MEDIA (9% · 90, along the media edge) · **STATEMENT (3% · 120, practically
absent)** · CALM / ABOUT (7% · 100, outside the text column) ·
CONTACT (9% of a light tone on the dark band, rising from the bottom edge).

**Mobile.** Smaller area, less blur, lower opacity, smaller movement amplitude, never
crossing the main body. Degradation order under load: disable the glass backdrop-filter →
simplify the field → reduce motion frequency. Typography and layout are never touched.

**Motion discipline.** PRIMARY: this field. SECONDARY: hover / link / button / media-state
micro-motion at 180–420ms. No further large motion systems are introduced.
`prefers-reduced-motion` freezes the field in a composed position and makes micro-motion
instant.

### Four tests before anything is approved

1. **Airiness** — zoomed out, is the page still predominantly light, white, editorial, airy? Effects sit inside the whitespace; they never replace it.
2. **Digital newspaper** — with every effect disabled, does it still read as a strong editorial publication? If not, the base is too effect-dependent.
3. **Controlled distortion** — do the artefacts read as rare machine moments, or does the site look damaged? If damaged, cut by half.
4. **Matte glass** — more than 3–5 meaningful glass accents means too many.

## 2. WHAT THIS IS NOT

- not a dark hacker terminal — the site is off-white, light, printed, quiet
- not glitch-core — displacement appears three or four times on the whole site
- not brutalism with borders on everything — hairlines, not boxes
- not a bento grid — no rounded equal cards anywhere
- not a SaaS landing — no feature trio with icons, no gradient buttons, no testimonials strip
- not colourful — one accent, used as a highlighter, nowhere else
- not a Behance case in a browser — the site is the interface, not a scrolling image
- no 3D sphere, no WebGL blob, no MacBook mockups, no floating iPhone hero
- no design commentary in the UI, no repeated facts, no filler microcopy in whitespace

---

## 3. REFERENCE-BY-REFERENCE DNA EXTRACTION

Every supplied reference is decomposed. Column 4 is where it lands on the site.
Nothing is used at 1:1 — each device is re-cut to the single identity.

### R1 — CYBR_ "Cyber Brutalism" (system UI site)
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| `/01 /02 /03` section numbers | the page is an indexed document | `PixelIndex` — dot-matrix section IDs on the left edge of every section header | all sections |
| `SYS.TIME`, `UTC+0`, `SCN_0007` | machine self-report | one live UTC clock + build string in the header, one status line in the footer bar | header, footer |
| coordinate readout box (`X_36.17 / Y_-86.76`) | the object has a position in space | `MetaBlock` — small bordered readout attached to the hero visual and to project 01 | hero, work |
| `> RENDERING 83%` label | process is visible | reveal progress label on the hero ASCII while it composes (once, then it stays) | hero |
| tiny `+` marks in outer margins | print/layout marks | margin cross field on the section-rule grid | all sections |
| rotated vertical side text | edges are usable surface | vertical wordmark on the left rail, vertical section name on long sections | global rail |
| bottom persistent status bar | the site is a running instrument | thin footer bar: `AVAILABLE · REMOTE · UTC+3` + contact | footer |
| purple/lime pair | — | **rejected**. Two neons break the off-white base. | — |

### R2 — Glow-up (airy editorial product page)
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| enormous top whitespace, centred light display type | confidence through emptiness | one intentionally near-empty statement band between Work and Approach | statement band |
| tiny uppercase pill label above headline | the page states its own topic first | `SectionTag` pill (mono, 10px, letter-spaced) | all sections |
| hairline-bordered equal cards | quiet enumeration | hairline-ruled columns for `WHAT I BUILD` — rules only, no card backgrounds | what i build |
| one card filled with a soft blurred gradient | one element in a rational grid is atmospheric | exactly one column in that grid carries a fog fill (rotates on hover/touch) | what i build |
| citation micro text pinned to card bottom | a claim carries its source | source/link micro line pinned to the bottom of each project block | work |
| tab filter row | — | **rejected for v1.** Five projects do not need a filter (YAGNI); `type`/`tags` stay in the data model so it can be added when the archive grows. | — |

### R3 — Health Lab (soft white sculptural)
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| rotated wordmark on both edges | the frame is branded, not the middle | left rail vertical `EVAN CARTEX — {classification}`, derived from `profile.roleLines`; built on the left only | global |
| giant centred statement between sections | the site takes a breath and asserts | the statement band (see R2), one line, oversized, half on fog | statement band |
| soft white sculptural volumes with real shadow | fog can have volume, not just blur | `CloudField` layer 3: a single large soft-edged light body with a diffuse shadow | hero, contact |
| circular `Go ↗` affordances | small, precise, mechanical controls | 28px circular arrow buttons on project rows and next-project link | work, case |
| fanned/stacked repeated shapes | process as accumulation | stacked hairline strata behind the approach diagram | approach |
| metric card cluster over an image | interface fragments as illustration | project 01/02 visuals: real UI fragments, halftoned, over-labelled | work |

### R4 — PlayerZero (dot matrix + node pipeline)
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| dot-matrix display headline | the type is rendered by a machine | `PixelType` — the hero's single pixel word + all large numerals | hero, metrics |
| labelled pill nodes + connector paths + dot joints | thinking is a pipeline | **the APPROACH diagram** — 5 labelled nodes, drawn connectors, dot joints | approach |
| big dot-matrix metrics (`3x`, `90%`) | evidence rendered in machine type | project result numbers (`105 / mo`, `2+ mo uptime`) in pixel numerals | work, case |
| dotted continent field | dot matrix as territory | footer `REMOTE` dot-map — very low contrast, decorative, aria-hidden | footer |
| warm off-white ground, dark pill CTA with icon badge | quiet page, heavy control | base `--paper` + a single solid black primary control style | global |

### R5 — POINT / Ikeda-style editorial poster
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| dense multi-column micro type next to void | density is a texture, whitespace is a room | `CAPABILITIES / STACK` as a dense 4-column hairline index against a wide empty margin | stack |
| giant thin type cropped at the frame edge | type as architecture, not as a message | project names break the container and clip at the viewport edge | work |
| hairline table rules, key/value rows | information as a specimen label | `MetaTable` (ROLE / YEAR / TYPE / STACK / STATUS) under every project name | work, case |
| fractions and decimals (`1/3`, `0.13`) | precise counting | project counters `01/05`, case counters `06/09`, scroll position readout | work, case |
| inverted black label bars | hierarchy by inversion, not by size | inverted micro labels for `STATUS: LIVE`, `SELECTED`, section IDs on dark bands | work |
| barcode | — | **rejected** as literal. Replaced by the calibration wedge from R6. | — |
| JP/EN mixed secondary text | two registers coexist | RU prose + EN system labels (confirmed) | global |

### R6 — ARC'TERYX SOCIALRUN (photocopy poster)
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| corner registration crosshairs | print alignment, calibration | `RegMark` in the four corners of the hero frame and each case hero | hero, case |
| grayscale step-wedge bars | the page declares its own tonal range | calibration wedge in the footer + at the top of `/work` | footer, /work |
| mono bullet spec list | facts as a checklist | project fact list, one line per fact, `·` bullets | work |
| oversized parenthesised numbers `(05/04)` | the number is the poster | `(01) … (05)` oversized parenthetical index behind each project | work |
| asterisk / starburst glyphs | small punctuation as accent | `✳` divider trio between major bands | dividers |
| ghosted large wordmark behind content | the name is present but recessed | ghost `EVAN` behind the contact block at 4% | contact |
| dither strip at the frame edge | raster is a material | 1-D dither strip on section boundaries | dividers |

### R7 — HEAVENLY / ASCII poster
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| a whole object rendered in ASCII characters | the machine draws with language | **THE HERO VISUAL** — an ASCII/character field forming a soft volume | hero |
| coded header strip (`27-06-25 … +88 T.8`) | a document with a code, not a title | hero top strip: date · build · location · availability | hero |
| bold headline overlaid across the ASCII | index over distortion, hard over soft | `EVAN` / role lines sit across the ASCII field, fully opaque, fully legible | hero |
| corner-anchored micro labels (`I.6`, `AEOLUS`, `2347`) | the frame is annotated | four hero corner labels: index, role, year, status | hero |
| side columns of small body text | the artefact explains itself in the margin | hero supporting text as a narrow left column, not centred | hero |
| `✳ ✳ ✳` bottom mark | closing mark | end-of-page mark before the footer | footer |

### R8 — "incomprehensible memories" (computational graphic)
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| horizontal motion-blur smear rasters | data in transit | scan-smear transition on project image reveal (one pass, 400ms) | work |
| contour / topographic line clusters | a computed surface | contour line cluster behind the approach diagram and in the case hero | approach, case |
| black bitmap blobs | hard raster mass | small pixel-mass accents anchoring composition corners | work, footer |
| dot-grid fragment block | a sampled region | `dot-grid` fragment blocks at grid intersections | global accents |
| tiny inset gray sample frame with caption | evidence sample | `SAMPLE ##` inset frames in case studies | case |
| lowercase tiny caption in vast space | a whisper next to a shout | lowercase micro captions under oversized type | global |

### R9 — Dharma blur poster
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| one huge diffuse graphite volume on grainy paper | fog with mass and direction | `CloudField` primary body — graphite, irregular, vertical drift | hero → contact |
| words scattered at different sizes across the volume | reading rhythm broken on purpose | statement band: 3–4 word fragments placed off-grid on the fog | statement band |
| letter-spacing stretched to near-dissolution | type dissolving into the field | `--track-dissolve` treatment on one decorative word per band | statement, footer |
| grain over the entire surface | it is a printed thing | global grain overlay (fixed, ~3.5%, aria-hidden) | global |
| near-zero contrast in places | not everything must be readable | decorative-only text may drop to 25% — never informational text | decorative layer |

### R10 — "световой блюр" trend board
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| hand-drawn ellipse ringing a word | human annotation on a machine page | one SVG ellipse annotation, drawn on scroll, around a single key word | hero or about |
| `(04)` parenthetical index | quiet enumeration | shared with R6 parenthetical index | work |
| thumbnail cluster of posters | archive as contact sheet | `/work` archive contact-sheet grid of halftoned thumbnails | /work |
| bottom caption columns | metadata pinned to the bottom edge | bottom-pinned caption columns in case galleries | case |

### R11 — DJ ARKADE poster
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| dark soft cloud rising from the bottom edge | the page ends in atmosphere | footer/contact fog: darker, bottom-anchored, the only heavy area of the site | contact, footer |
| rotated repeated text stack | text as texture | rotated repeated `TELEGRAM · EMAIL · GITHUB` micro-stack on the contact edge | contact |
| huge outlined numeral, rotated | number as structure | rotated outlined year `26` on the contact block | contact |
| layered ghost type at two scales | echo | ghost echo behind section titles at 6% | section headers |

### R12 — VT Air Cloud (product spec minimalism)
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| top-edge label pair (`001 AIR` / `UV PROTECTOR`) | a page addressed at its corners | every section header: ID left, type right, on one hairline | all sections |
| `SHIELD / FORMULA / CONTROL` key-value rows | capability as specification | `WHAT I BUILD` rows and `STACK` groups use exactly this row form | what i build, stack |
| tiny line diagrams (circles, arrows, flow ticks) | a diagram can be a glyph | `micro-diagram` glyphs beside each capability row | what i build |
| huge soft sphere edge as a light gradient | fog as a horizon, not a blob | horizon fog: a single soft arc rising into the Stack and About bands | stack, about |
| wordmark alone at the bottom-left | end mark | wordmark placement in the footer | footer |

### R13 — val.lerria board (browser windows / highlight)
| Device | Reading | Adopted as | Location |
|---|---|---|---|
| **text-selection highlight behind key phrases** | the accent is a reading tool, not decoration | **THE accent device** — `Mark` component: accent tint block behind one phrase per section, max 6 on the page | global |
| floating browser window frames | real product, real chrome | project UI fragments framed in a minimal window chrome (3 dots, url micro text) | work, case |
| numbered `01 / 02 / 03` value lists | ordered reasoning | approach steps and case sections | approach, case |
| page counters `5/18`, `6/18` | position inside a document | scroll/section counter in the left rail, case section counter | rail, case |
| grid overlay lines across media | media measured by the grid | grid overlay on project media on hover/touch | work |
| dark panel next to light panel | contrast between registers | exactly one dark band on the homepage (Contact), rest paper | contact |
| photographic mountain/iris/x-ray imagery | — | **rejected** — no stock photography anywhere. Structure and raster only. | — |

---

## 4. VISUAL INTEGRATION MATRIX (required checklist)

Every principle A–N from the brief must be present. `INTENSITY` is how loud it is
allowed to be. STATUS reflects the running site as of Stage 6.

| # | PRINCIPLE (brief) | IMPLEMENTATION | SITE LOCATION | INTENSITY | STATUS |
|---|---|---|---|---|---|
| A | Editorial / Swiss grid | 12-col editorial grid, asymmetric offsets, visible hairline column rules, baseline rhythm, section IDs, wide margins | entire site | high | built |
| B | System / interface language | `SectionTag`, `MetaTable`, `MetaBlock` coordinates, status strings, footer status bar, build string, `↗ ↓` arrows, reg marks | header, hero, work, footer, case | high | built — no UTC clock (§CANONICAL_STATE §9) |
| C | Pixel / dot matrix | `.pixel` CSS dot-matrix mask on section IDs and the contact index; pixel numerals for metrics | section headers, contact, metrics | high (signature) | built — the named `Pixel*` components were not (§11) |
| D | ASCII / text graphics | hero character-field artwork (one strong computational composition), monospace structures in stack, ASCII rule dividers | hero, stack, dividers | high (one hero moment) | built |
| E | Halftone / raster | build-time Bayer 8×8 ordered dither producing a **processed asset alongside a clean one**; processed is the default on `/` previews and archive thumbnails, clean is the default in case galleries; dither strips on boundaries | work, /work, case | high | built |
| F | Soft cloud / blur | `DistortionField` — six tuned variants, two masked masses that cross-fade plus a light volume, drifting | hero, work, route, media, calm, contact | high | built — as `DistortionField`, not `CloudField` (§10) |
| G | Soft-focus typography | **not built.** Blur-to-sharp on type conflicts with static typography geometry. Softness lives in the fog behind the type instead, and in the `--paper-3` ghost index | — | — | rejected (§9, CANONICAL_STATE §9) |
| H | Glitch / scan / displacement | hard-seam `clip-path` wipe from processed to clean media; the SCAN WINDOW primitive on type. Scan-smear and 2px hover displacement were rejected | work, case | low (accent only) | built — in the reduced form (§9) |
| I | Oversized typography | project names clipped at the viewport edge, oversized parenthetical numbers, hero name at display scale | hero, work, statement | high | built |
| J | Micro typography | 10–11px mono labels: year, role, stack, status, section ID, coordinates, counters, captions | everywhere | high | built |
| K | Diagram language | 5-node approach pipeline with drawn connectors and dot joints, Lead Radar architecture diagram, stacked strata, micro-diagram glyphs | approach, case 01, what i build | high | built |
| L | Print / poster texture | global grain overlay, registration marks, calibration step wedge, raster imperfection on media edges | global, footer, /work | medium | built |
| M | Extreme whitespace | statement band ~70vh with one line; stack section keeps a 4-column void; hero bottom third empty | statement, stack, hero | high | built |
| N | Minimal black/white UI | paper / ink / graphite / cool-gray scale + exactly one accent used as a highlighter | global | high | built |

Additional identity devices not in A–N but extracted from references, tracked here so
they are not lost: selection-highlight `Mark` (R13), window-chrome frames (R13),
vertical edge wordmark (R3/R11), parenthetical oversized index (R6/R10),
`✳` dividers (R6/R7), calibration wedge (R6), contour lines (R8), dot-map (R4).

---

## 5. CONTRADICTIONS BETWEEN REFERENCES, AND HOW THEY ARE RESOLVED

1. **CYBR_ neon accents vs. the near-colourless refs (R2, R9, R12).**
   Resolved for the quiet side: base is off-white/graphite, exactly one accent, and the
   accent is only ever a reading highlight or a 1px signal — never a fill, never a glow.

2. **Ikeda density (R5) vs. Glow-up emptiness (R2).**
   Resolved by *alternation*, not by averaging: dense bands (Stack, project meta tables)
   are placed directly against near-empty bands (statement, hero bottom). Never
   medium-density everywhere — that is what makes a page look like a template.

3. **Hard raster (R7, R8) vs. soft diffusion (R9, R11, R12).**
   Resolved by layer separation: fog is always *behind*, raster is always *inside media
   and numerals*, index type is always *on top and sharp*. They overlap but never blend.

4. **Poster (one static frame, R5–R11) vs. website (scroll, R1–R4).**
   Resolved by treating each band as a poster with its own corner annotations, and the
   scroll as the movement between posters. Fog is the only element that crosses bands
   continuously — it is what makes the page one space instead of a stack of slides.

5. **Photographic imagery (R13, R3) vs. no-stock rule.**
   Resolved: the only images on the site are the user's own product screenshots,
   rasterised. No photography, no illustration, no AI imagery in the chrome.

6. **Terminal aesthetics (R1) vs. print aesthetics (R5, R6).**
   Resolved in favour of print: the mono type is a drafting/label voice, not a shell
   prompt. No blinking cursors, no fake logs, no `sudo`, no green-on-black.

---

## 6. COLOR

Single scale plus one accent. Tokens are defined once in `styles/tokens.css`.

| token | value | use |
|---|---|---|
| `--paper` | `#F2F1EE` | page ground (warm off-white, as R4/R5) |
| `--paper-2` | `#E9E8E4` | recessed bands, media placeholders |
| `--paper-3` | `#DEDCD7` | the lightest surface tint |
| `--ghost-index` | `#A4A29A` | the oversized decorative project index — read as type, so tuned for contrast (2.26:1 on paper) |
| `--ink` | `#0B0B0C` | primary type, solid controls |
| `--graphite` | `#3A3B3E` | secondary type, diagram strokes |
| `--gray` | `#65666B` | micro labels, metadata — darkened at Stage 6 for AA |
| `--gray-2` | `#C7C7C4` | hairlines at 100%, dither mid-tone |
| `--rule` / `--rule-soft` / `--rule-strong` | 14% / 7% / 32% of ink | hairline rules, column guides |
| `--field-light` | `rgba(255,255,255,0.95)` | fog highlight body |
| `--field-tone` | `rgba(58,59,62,0.2)` | fog graphite body |
| `--night` | `#101012` | the single dark band (Contact) |
| `--accent` | `#CC2E24` **Registration Red** | links, dot joints, 1px signals, focus ring |
| `--accent-on-dark` | `#FF6B5E` | the same hue on `--night` |
| `--accent-mark` | `rgba(204,46,36,0.14)` | text-selection highlight |

Ultramarine `#2C2BE8` was the Stage-2 candidate and is **superseded** — see §1c.

Rules: accent appears at most 6–8 times on the homepage; it is never a background
larger than a line of text; every accent-on-paper pairing is checked ≥ 4.5:1 for text.
Dark band inverts to `--paper` type on `--night`. **Never a second accent.**

The Stage-2 constraint that held the accent to the focus ring is spent: Stage 3 gave
Registration Red its full role.

## 7. TYPOGRAPHY

Three voices, self-hosted, subset, `font-display: swap`, variable where possible.

- **DISPLAY** — tight neo-grotesk, used at 64–200px, uppercase for names, tracking
  negative. Carries oversized headlines and project names.
- **TEXT** — the same family at text sizes for prose; measure 58–68 characters,
  never full-width paragraphs.
- **MONO / MICRO** — technical label voice: 10–12px, uppercase, `+0.08em` tracking, for
  every label, meta row, counter, coordinate and caption.
- **BITMAP / PIXEL** — dot-matrix numerals and one hero word.

**Settled:** the site is RU + EN, so the set is **Inter Tight** (display/text, full
Cyrillic) + **IBM Plex Mono** (mono/micro, full Cyrillic), with pixel type as a **CSS
dot-matrix mask** over the mono face — script-independent, no bitmap font. The EN-only
alternatives (Archivo, Departure Mono, Silkscreen) were never needed.

Type scale (desktop): 200 / 128 / 84 / 56 / 34 / 22 / 17 / 13 / 11 px, fluid via
`clamp()`, snapped to an 8px baseline. Extreme contrast (200px against 11px in the same
composition) is a stated principle, not an accident.

## 8. GRID

- desktop ≥1280: 12 columns, 40–72px margins, 24px gutters, max content 1512px
- 1024–1279: 8 columns, 32px margins
- 768–1023: 6 columns, 28px margins
- <768: 4 columns, 20px margins
- a **left rail** (28–44px) exists on ≥1024 for the vertical wordmark, section counter and
  scroll readout; content starts after it
- grid must support: column offsets, overlap (type crossing media), full-bleed, clipped
  overflow at the viewport edge, and hairline column guides that can be shown at 8%
- vertical rhythm on an 8px baseline; section padding 120/160/200px desktop, 72/96 mobile

## 9. MOTION LANGUAGE (as built in Stage 4)

- field: 22–40s drift/morph loops, transform + opacity only, never layout
- reveal: opacity + a 14px translate, 620ms, custom ease-out
- hairline reveal: `scaleX(0) → scaleX(1)` from the left, 720ms, compositor-only
- media: hard-seam `clip-path` wipe from PROCESSED to CLEAN — no scale, no deformation
- micro-motion: link, button and media states at 180–420ms, no spring, no bounce
- no scroll-jacking, no smooth-scroll library, no pinned sections, no parallax
- motion pauses when `document.hidden`; there is no render loop and no scroll listener
- `prefers-reduced-motion`: the field freezes, reveals become instant, micro-motion is
  removed

Three Stage-1 proposals here were **rejected** rather than built and must not return: the
`blur(6px)→0` reveal, media `PixelReveal` (pixelated → sharp in steps) with a scan-smear
pass, and 2px hover displacement — the last conflicts with static typography geometry.
See [`CANONICAL_STATE.md` §9](CANONICAL_STATE.md).

## 10. FOG SYSTEM — original spec, superseded in build

Shipped as `DistortionField` with six tuned variants (`hero` / `work` / `route` / `media` /
`calm` / `contact`), not as the three-layer `CloudField` described below. The technique
survived; the component name and layer count did not. Kept for the reasoning.

`CloudField` = up to 3 `CloudLayer`s per band. A layer is one element with:
1. 4–6 offset `radial-gradient`s at different radii and opacities (breaks the ellipse),
2. a `mask-image` of 2–3 further radial gradients (cuts irregular bites out),
3. `filter: blur(70–140px)` and `will-change: transform`,
4. independent slow transform loop, and a per-band `--fog-strength`.

Layers: (1) light body — near-white, volume + diffuse shadow (R3/R12); (2) graphite body
— `--fog-dark`, the R9 smudge; (3) horizon arc — a single soft arc for band transitions.
Grain is a separate global overlay, not part of the layers. Canvas is used **only** if
CSS cannot hold the irregularity; default is CSS.

## 11. PIXEL / RASTER SYSTEM — original spec, partially built

Of the names below only the dot-matrix mask and the build-time halftone pipeline exist.
`PixelIndex`, `PixelType`, `PixelReveal`, `DitherStrip`, `DotGrid` and `PixelMass` were
never built: the shipped primitive is the `.pixel` CSS mask plus `scripts/build-media.mjs`
and `scripts/treat-media.mjs`. Kept for the reasoning.


- `PixelIndex` — section IDs and counters in dot-matrix
- `PixelType` — one hero word; dot-matrix via CSS mask so it is script-independent
- `PixelReveal` — staged pixelation on media entry
- `Halftone` — **build-time** Bayer 8×8 ordered dither of every project screenshot via a
  Node/sharp script into WebP/AVIF; the runtime cost is zero and LCP stays fast
- `DitherStrip`, `DotGrid`, `PixelMass` — small static accents
- rule: the real text layer is never pixelated. Pixel treatment applies to numerals,
  one display word, media, and ornament only.

## 12. IMAGE TREATMENT

**ART DIRECTION MUST NOT HIDE EVIDENCE.** A project screenshot is proof of work.
Since Stage 6.2 there is a stricter case: real interface fragments shown as `REAL OUTPUT`
are **CLEAN and untreated, always**. No dither, no halftone, no crop-for-effect, no
distortion — a screenshot the reader cannot read proves nothing.

And since 6.2.2 the rule has a second half: **SANITIZE MAY CROP, LAYOUT MUST NOT.** The
sanitised file is canonical; no responsive wrapper may trim a letter, a bubble edge, a
rounded corner or an action row off it, and it is never displayed larger than the source.
Composition rules live in the Figma board `SYS / REAL OUTPUT — EVIDENCE PLATE`.

Redaction has one form: solid `--graphite`, no blur, no gradient, no texture, no accent,
no light patch. Removing Telegram's own chrome is a different operation and is invisible. The
raster language is identity, but the visitor must always be able to actually look at the
interface. Halftone is therefore a *state*, never the only state.

Only the user's own product screenshots. Build-time pipeline per source asset emits
**two** derivatives and never destroys the original:

1. `CLEAN` — cropped composition, optimised, grayscale or full colour, WebP/AVIF, 2 sizes
2. `PROCESSED` — grayscale → Bayer 8×8 ordered dither → WebP/AVIF, 2 sizes

Runtime picks the representation per context:

| context | default state | how clean is reached |
|---|---|---|
| `/` Selected Work preview | `PROCESSED` (full art direction: grayscale, dither, crop, grid overlay, scan/pixel reveal allowed) | pointer: hover crossfades to `CLEAN`; **touch: the preview settles on `CLEAN` after the reveal, or the composition shows clean + processed fragments side by side** — the project is never unreadable until tapped |
| `/work` archive thumbnail | `PROCESSED` | tap/hover swap to `CLEAN` |
| `/work/[slug]` hero / intro | `PROCESSED` as a poster moment | scrolling past it is enough |
| `/work/[slug]` gallery + system shots | **`CLEAN`** — the case must show the real interface, structure and detail | — |
| case decorative sample / crop / transition | `PROCESSED` | — |

Never: dither over every gallery image, a project hidden behind an effect, device
mockups, perspective, drop-shadowed floating cards, fabricated or AI-generated UI in
place of a missing screenshot. A missing asset stays visibly missing (`VISUAL PENDING`).

## 13. ACCESSIBILITY GUARDRAILS FOR THE DECORATIVE LAYER

Fog, grain, dither strips, dot maps, contour lines, ghost type, reg marks, ASCII field:
all `aria-hidden="true"`, all non-interactive, all removable without information loss
(brief §05 condition 2). Informational text never sits on fog at less than 4.5:1, never
blurs, never pixelates. Focus ring is `2px solid var(--accent)` at `outline-offset: 3px`,
visible on every control.

**Decorative type is still tuned, not abandoned.** `aria-hidden` is not a licence for a
washed-out mark. The ghost project index sits at 2.09–2.26:1 — deliberately below the 3:1
large-text threshold, deliberately above the 1.21:1 it started at, so it reads as an
intended layer rather than an accident. Non-semantic display material is judged by whether
it looks decided, not by whether it clears a text threshold it was never meant to meet.
See [`CANONICAL_STATE.md` §5](CANONICAL_STATE.md).
