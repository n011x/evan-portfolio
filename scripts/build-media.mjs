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
  [".private-assets/evidence/lr-card.png", "lr-card", 992],
  [".private-assets/evidence/lr-rank.png", "lr-rank", 992],
  [".private-assets/evidence/lr-actions.png", "lr-actions", 1080],
  [".private-assets/evidence/hx-context.png", "hx-context", 992],
  [".private-assets/evidence/hx-workspace.png", "hx-workspace", 992],
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
