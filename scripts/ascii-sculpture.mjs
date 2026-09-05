import { writeFile } from "node:fs/promises";

/**
 * Hero ASCII sculpture — an irregular shaded mass, not a sphere and not noise.
 * A metaball field defines the body; the field's own gradient lights it, so the
 * object reads as volume at distance and as characters up close. The right and
 * lower edges dissolve into sparse dots so the fog layer can take over.
 */
const COLS = 208;
const ROWS = 78;
const RAMP = "@%#*+=~-:.·"; // dense → sparse
const ASPECT = 0.55;       // character cell is taller than wide

const blobs = [
  { x: 0.30, y: 0.46, r: 0.26, w: 1.00 },
  { x: 0.45, y: 0.34, r: 0.17, w: 0.72 },
  { x: 0.40, y: 0.64, r: 0.19, w: 0.66 },
  { x: 0.58, y: 0.52, r: 0.15, w: 0.52 },
  { x: 0.66, y: 0.38, r: 0.10, w: 0.30 },
  { x: 0.20, y: 0.62, r: 0.11, w: 0.34 },
];

const field = (u, v) => {
  let d = 0;
  for (const b of blobs) {
    const dx = u - b.x, dy = (v - b.y) * ASPECT;
    d += b.w * Math.exp(-(dx * dx + dy * dy) / (2 * b.r * b.r * 0.30));
  }
  return d;
};

const hash = (i, j) => ((Math.sin(i * 12.9898 + j * 78.233) * 43758.5453) % 1 + 1) % 1;
const EPS = 0.004;
const LIGHT = { x: -0.62, y: -0.70, z: 0.35 };
const LN = Math.hypot(LIGHT.x, LIGHT.y, LIGHT.z);

const lines = [];
for (let j = 0; j < ROWS; j++) {
  let line = "";
  for (let i = 0; i < COLS; i++) {
    const u = i / COLS, v = j / ROWS;
    const f = field(u, v);

    // surface gradient → normal → lambert shading
    const gx = (field(u + EPS, v) - field(u - EPS, v)) / (2 * EPS);
    const gy = (field(u, v + EPS) - field(u, v - EPS)) / (2 * EPS);
    const nz = 1.6;
    const nl = Math.hypot(gx, gy, nz) || 1;
    const lambert = ((-gx * LIGHT.x - gy * LIGHT.y + nz * LIGHT.z) / (nl * LN) + 1) / 2;

    // body mask with a soft, uneven falloff
    const edge = 0.30 + 0.05 * Math.sin(u * 9 + v * 6);
    let body = (f - edge) / 0.55;
    body -= 0.55 * Math.pow(Math.max(0, u - 0.55), 1.4) * 2.4;   // dissolves right
    body -= 0.40 * Math.pow(Math.max(0, v - 0.55), 1.6) * 1.9;   // dissolves down
    body = Math.max(0, Math.min(1, body));

    // one scan artefact crossing the volume
    const scan = (j === 34 || j === 35) ? 0.14 : 0;

    let t = body * (0.34 + 0.78 * lambert) + scan;
    t += 0.045 * Math.sin(u * 30 + v * 11);           // internal banding
    t += (hash(i, j) - 0.5) * 0.10;                    // grain
    t = Math.max(0, Math.min(1, t));

    // outside the body: sparse residue that thins with distance
    if (body <= 0.001) {
      const residue = Math.max(0, f - 0.12) * 1.8 + 0.04;
      line += hash(i * 3, j * 7) < residue ? (hash(i, j) < 0.5 ? "·" : ".") : " ";
      continue;
    }
    line += RAMP[Math.max(0, Math.min(RAMP.length - 1, Math.round((1 - t) * (RAMP.length - 1))))];
  }
  lines.push(line.replace(/\s+$/, ""));
}

const out = lines.join("\n");
await writeFile(".assets/ascii-sculpture.txt", out);
console.log("cols", COLS, "rows", ROWS, "chars", out.length);
console.log(lines.slice(10, 56).map((l) => l.slice(0, 132)).join("\n"));
