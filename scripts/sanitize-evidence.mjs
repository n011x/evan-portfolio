/**
 * Turns the raw Telegram captures into publishable evidence panels.
 *
 * The raw files live in `.private-assets/telegram-raw/` and are NEVER committed: they are
 * real chat content. This script removes Telegram chrome (status bar, bot title, date
 * pills, scroll affordances, composer) and masks the private detail — geolocation, third
 * party handles — with flat bars. Nothing is redrawn, invented or re-typeset: what remains
 * is the real interface.
 *
 *   node scripts/sanitize-evidence.mjs      → .private-assets/evidence/*.png
 *   node scripts/build-media.mjs            → public/media/*.webp
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const RAW = ".private-assets/telegram-raw";
const OUT = ".private-assets/evidence";
await mkdir(OUT, { recursive: true });

/** a flat bar in the bubble's own graphite, one step lighter so the masking is legible */
const bar = (x, y, w, h) => ({
  input: { create: { width: Math.round(w), height: Math.round(h), channels: 3, background: "#4a4a4c" } },
  left: Math.round(x),
  top: Math.round(y),
});
/** a patch in the bubble colour, for removing Telegram's own affordances */
const patch = (x, y, w, h, colour = "#212121") => ({
  input: { create: { width: Math.round(w), height: Math.round(h), channels: 3, background: colour } },
  left: Math.round(x),
  top: Math.round(y),
});

const jobs = [
  {
    // LEAD RADAR — why it fits, the risks, and the score. The channel handle is dropped
    // with the crop rather than masked: it is a third party and proves nothing.
    name: "lr-card",
    src: "raw-01",
    crop: { left: 30, top: 168, width: 496, height: 690 },
    ops: [],
  },
  {
    // LEAD RADAR — the owner's decision row. This is the point of the whole service:
    // the system ranks and explains, the human decides.
    name: "lr-actions",
    src: "raw-01",
    crop: { left: 14, top: 928, width: 540, height: 132 },
    ops: [],
  },
  {
    // LEAD RADAR — a second card at a lower tier, to show that cards are ranked.
    name: "lr-rank",
    src: "raw-06",
    // the crop stops on the score: the channel handle below it is a third party
    crop: { left: 30, top: 168, width: 496, height: 962 },
    // Telegram's scroll-to-bottom affordance clips the corner; painted out in the
    // bubble's own colour, sampled from the image
    ops: [{ t: "patch", x: 446, y: 892, w: 50, h: 70, c: "#313131" }],
  },
  {
    // HERMES — two people, two starting points, one meeting point. Every place name is
    // masked: the structure is the evidence, the geography is private.
    name: "hx-context",
    src: "raw-11",
    crop: { left: 30, top: 318, width: 496, height: 452 },
    ops: [
      { t: "bar", x: 146, y: 102, w: 244, h: 38 }, // "м. …"
      { t: "bar", x: 248, y: 138, w: 236, h: 38 }, // "Парку … /"
      { t: "bar", x: 0, y: 168, w: 302, h: 38 },   // "… набережной"
      { t: "bar", x: 316, y: 238, w: 100, h: 38 },  // the origin, mid-sentence
      { t: "bar", x: 0, y: 268, w: 138, h: 38 },
      { t: "bar", x: 0, y: 410, w: 120, h: 34 },   // origin B
      { t: "bar", x: 136, y: 410, w: 208, h: 34 }, // destination
    ],
  },
  {
    // HERMES — workspace statistics, including the assistant's own caveat that the sample
    // is too small to be meaningful and what it proposes to do next.
    name: "hx-workspace",
    src: "raw-07",
    crop: { left: 30, top: 385, width: 496, height: 500 },
    ops: [],
  },
];

for (const job of jobs) {
  const base = sharp(`${RAW}/${job.src}.jpeg`).extract(job.crop);
  const composites = job.ops.map((o) =>
    o.t === "bar" ? bar(o.x, o.y, o.w, o.h) : patch(o.x, o.y, o.w, o.h, o.c),
  );
  const out = composites.length ? base.composite(composites) : base;
  await out.png().toFile(`${OUT}/${job.name}.png`);
  console.log(job.name, `${job.crop.width}×${job.crop.height}`, `masks=${job.ops.length}`);
}
