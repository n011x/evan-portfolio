import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = ".assets/luma-hero.png";
const W = 1440;

// 8x8 Bayer matrix, normalised 0..1
const bayer = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
].map((row) => row.map((v) => (v + 0.5) / 64));

const base = sharp(SRC).resize({ width: W });

// 01 clean (colour, optimised)
await base.clone().png({ compressionLevel: 9 }).toFile(".assets/01-clean.png");

// 02 grayscale
await base.clone().grayscale().linear(1.08, -8).png().toFile(".assets/02-grayscale.png");

// 03 ordered dither (Bayer 8x8, 1-bit)
{
  const { data, info } = await base
    .clone()
    .grayscale()
    .linear(1.12, -10)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = y * info.width + x;
      const v = data[i * info.channels] / 255;
      out[i] = v > bayer[y % 8][x % 8] ? 255 : 0;
    }
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png({ colours: 2 })
    .toFile(".assets/03-dither.png");
}

// 04 halftone (rotated dot screen, drawn as SVG circles over the paper)
{
  const cell = 7;
  const small = await base.clone().grayscale().resize({ width: Math.round(W / cell) }).raw().toBuffer({ resolveWithObject: true });
  const { data, info } = small;
  const r = cell / 2;
  let dots = "";
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const v = data[(y * info.width + x) * info.channels] / 255;
      const rad = (1 - v) * r * 1.16;
      if (rad > 0.32) {
        dots += `<circle cx="${(x + 0.5) * cell}" cy="${(y + 0.5) * cell}" r="${rad.toFixed(2)}"/>`;
      }
    }
  }
  const h = info.height * cell;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${info.width * cell}" height="${h}"><rect width="100%" height="100%" fill="#F2F1EE"/><g fill="#0B0B0C">${dots}</g></svg>`;
  await writeFile(".assets/04-halftone.svg", svg);
  await sharp(Buffer.from(svg)).png().toFile(".assets/04-halftone.png");
}

// 05 editorial crop — a tight fragment of the real interface, grayscale
await sharp(SRC)
  .extract({ left: 120, top: 260, width: 1700, height: 700 })
  .resize({ width: 1200 })
  .grayscale()
  .png()
  .toFile(".assets/05-crop.png");

console.log("done");

// ---- amendment: composition-first derivatives -------------------------------
{
  // 06 — 180% editorial crop of a real UI fragment (clean, colour)
  await sharp(SRC)
    .extract({ left: 180, top: 380, width: 1180, height: 520 })
    .resize({ width: 2124 })            // ~180% of its own crop width
    .png()
    .toFile(".assets/06-crop-180.png");

  // 07 — split state: dither on the left, clean on the right, hard editorial seam
  const w = 1440, h = 900, seam = 620;
  const cleanBuf = await sharp(SRC).resize({ width: w }).toBuffer();
  const dithered = sharp(".assets/03-dither.png").resize({ width: w });
  const left = await dithered.clone().extract({ left: 0, top: 0, width: seam, height: h }).toBuffer();
  const right = await sharp(cleanBuf).extract({ left: seam, top: 0, width: w - seam, height: h }).toBuffer();
  await sharp({ create: { width: w, height: h, channels: 3, background: "#F2F1EE" } })
    .composite([
      { input: left, left: 0, top: 0 },
      { input: right, left: seam, top: 0 },
      { input: Buffer.from(`<svg width="${w}" height="${h}"><rect x="${seam - 1}" y="0" width="1" height="${h}" fill="#0B0B0C"/></svg>`), left: 0, top: 0 },
    ])
    .png()
    .toFile(".assets/07-split.png");
}
console.log("amendment derivatives done");
