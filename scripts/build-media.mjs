import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/media", { recursive: true });

/**
 * Evidence panels come from `.private-assets/evidence/` — sanitized crops of real
 * Telegram interfaces, produced by `scripts/sanitize-evidence.mjs`. The raw captures are
 * private chat content and are never committed, so these jobs only run on a machine that
 * holds them; the derivatives in `public/media` are what ships.
 *
 * Evidence is CLEAN only. It is proof, and the media treatment must not make it harder
 * to read.
 */
const jobs = [
  [".assets/01-clean.png", "luma-clean", 1600],
  [".assets/03-dither.png", "luma-processed", 1600],
  [".assets/06-crop-180.png", "luma-crop180", 1800],
  [".assets/07-split.png", "luma-split", 1600],
  [".assets/h1-clean.png", "hermes-clean", 1400],
  [".assets/h2-dither.png", "hermes-processed", 1400],
  [".assets/yasno-hero.png", "yasno-clean", 1600],
  // evidence ships at its native width — never resized up or down here
  [".private-assets/evidence/lr-01-brief.png", "lr-01-brief", 518],
  [".private-assets/evidence/lr-02-risk.png", "lr-02-risk", 518],
  [".private-assets/evidence/lr-03-decide.png", "lr-03-decide", 518],
  [".private-assets/evidence/lr-04-rank.png", "lr-04-rank", 518],
  [".private-assets/evidence/hx-01-request.png", "hx-01-request", 522],
  [".private-assets/evidence/hx-02-answer.png", "hx-02-answer", 518],
  [".private-assets/evidence/hx-03-workspace.png", "hx-03-workspace", 518],
  [".private-assets/evidence/hx-04-replyrate.png", "hx-04-replyrate", 518],
];

import { existsSync } from "node:fs";

for (const [src, name, width] of jobs) {
  if (!existsSync(src)) {
    console.log(`${name}: source not present locally, skipping`);
    continue;
  }
  const img = sharp(src).resize({ width, withoutEnlargement: true });
  await img.clone().webp({ quality: 86 }).toFile(`public/media/${name}.webp`);
  const meta = await sharp(`public/media/${name}.webp`).metadata();
  console.log(name, meta.width + "×" + meta.height);
}
