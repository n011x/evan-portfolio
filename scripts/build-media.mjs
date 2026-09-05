import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/media", { recursive: true });

const jobs = [
  [".assets/01-clean.png", "luma-clean", 1600],
  [".assets/03-dither.png", "luma-processed", 1600],
  [".assets/06-crop-180.png", "luma-crop180", 1800],
  [".assets/07-split.png", "luma-split", 1600],
  [".assets/h1-clean.png", "hermes-clean", 1400],
  [".assets/h2-dither.png", "hermes-processed", 1400],
];

for (const [src, name, width] of jobs) {
  const img = sharp(src).resize({ width, withoutEnlargement: true });
  await img.clone().webp({ quality: 86 }).toFile(`public/media/${name}.webp`);
  const meta = await sharp(`public/media/${name}.webp`).metadata();
  console.log(name, meta.width + "×" + meta.height);
}
