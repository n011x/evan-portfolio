/**
 * Turns the raw Telegram captures into publishable evidence assets.
 *
 * TWO RULES GOVERN THIS FILE
 *
 *   SANITIZE MAY CROP.  Removing Telegram chrome and masking private detail happens
 *   here, once, and the result is the canonical evidence asset.
 *
 *   LAYOUT MUST NOT CROP.  Nothing downstream may take a pixel off these files. Every
 *   crop below therefore lands on a real boundary of the message it comes from — the
 *   bubble's own edge, or a complete block inside it — never mid-sentence and never
 *   mid-card. Where one message needs two windows, they are cut between blocks and the
 *   case marks the second as a continuation.
 *
 * The raw files live in `.private-assets/telegram-raw/` and are NEVER committed: they are
 * real chat content. Sources are 591×1280 (Telegram's own re-compression of the phone
 * capture — no higher-resolution original exists), so the windows are ~518px wide and are
 * rendered at most 1:1 in CSS pixels.
 *
 *   node scripts/sanitize-evidence.mjs   → .private-assets/evidence/*.png
 *   node scripts/build-media.mjs         → public/media/*.webp
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const RAW = ".private-assets/telegram-raw";
const OUT = ".private-assets/evidence";
await mkdir(OUT, { recursive: true });

/** a flat bar over private detail — reads as a deliberate redaction, not a gap */
const bar = (x, y, w, h, colour = "#4a4a4c") => ({
  input: { create: { width: Math.round(w), height: Math.round(h), channels: 3, background: colour } },
  left: Math.round(x),
  top: Math.round(y),
});

const jobs = [
  // ---------------------------------------------------------------- LEAD RADAR
  {
    // window 01 of the qualified card: from the bubble's top edge through the whole
    // "why it fits" block. Ends between blocks, inside one message.
    name: "lr-01-brief",
    src: "raw-02",
    crop: { left: 14, top: 156, width: 518, height: 812 },
    ops: [],
  },
  {
    // window 02 of the same card: the risks, the fit score, and the card's own bottom
    // edge. The channel handle is masked — it is a third party and proves nothing.
    name: "lr-02-risk",
    src: "raw-01",
    crop: { left: 14, top: 570, width: 518, height: 374 },
    ops: [{ t: "bar", x: 136, y: 285, w: 290, h: 38 }],
  },
  {
    // the decision row, both buttons complete including their rounded edges
    name: "lr-03-decide",
    src: "raw-01",
    crop: { left: 14, top: 932, width: 518, height: 140 },
    ops: [],
  },
  {
    // a second card at a lower tier, from its top edge through its fit score
    name: "lr-04-rank",
    src: "raw-06",
    crop: { left: 14, top: 156, width: 518, height: 990 },
    // Telegram's scroll-to-bottom affordance sits over the card's right edge; painted
    // out in the two colours it covers, sampled from the image itself
    ops: [
      { t: "bar", x: 474, y: 924, w: 42, h: 66, c: "#303030" },
      { t: "bar", x: 500, y: 924, w: 18, h: 66, c: "#b7b7b7" },
    ],
  },

  // ---------------------------------------------------------------- HERMES
  {
    // the owner's own request, one complete bubble. Places are masked.
    name: "hx-01-request",
    src: "raw-12",
    crop: { left: 62, top: 282, width: 522, height: 332 },
    ops: [
      { t: "bar", x: 228, y: 85, w: 110, h: 32 },
      { t: "bar", x: 92, y: 115, w: 206, h: 32 },
      { t: "bar", x: 230, y: 216, w: 126, h: 34 },
    ],
  },
  {
    // the reply, from its own top edge through the recommendation paragraph
    name: "hx-02-answer",
    src: "raw-12",
    crop: { left: 14, top: 672, width: 518, height: 276 },
    ops: [
      { t: "bar", x: 127, y: 120, w: 300, h: 32 },
      { t: "bar", x: 17, y: 152, w: 120, h: 32 },
      { t: "bar", x: 241, y: 189, w: 175, h: 32 },
    ],
  },
  {
    // the workspace report, from its top edge through the 30-day figures. The assistant's
    // own first line states it only read — that is the honest guardrail, kept in frame.
    name: "hx-03-workspace",
    src: "raw-08",
    crop: { left: 14, top: 254, width: 518, height: 620 },
    // the floating date pill is Telegram chrome, not part of the message
    ops: [{ t: "bar", x: 196, y: 0, w: 152, h: 26, c: "#ededed" }],
  },
  {
    // continuation of the same report: reply rate and the caveat that the sample is too
    // small to mean anything. Cut between blocks.
    name: "hx-04-replyrate",
    src: "raw-07",
    crop: { left: 14, top: 400, width: 518, height: 462 },
    ops: [],
  },
];

for (const job of jobs) {
  const base = sharp(`${RAW}/${job.src}.jpeg`).extract(job.crop);
  const composites = job.ops.map((o) => bar(o.x, o.y, o.w, o.h, o.c));
  const out = composites.length ? base.composite(composites) : base;
  await out.png().toFile(`${OUT}/${job.name}.png`);
  console.log(job.name.padEnd(18), `${job.crop.width}×${job.crop.height}`, `masks=${job.ops.length}`);
}
