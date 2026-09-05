/** Stage 7 — production proof sheets for the whole user path. */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
const BASE = process.env.BASE ?? "http://localhost:3112";
const CAPTURE_CSS = `
  .band { content-visibility: visible !important; }
  header { position: static !important; }
  [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
`;
const ROUTES = [
  ["home", "/"], ["work", "/work"],
  ["lead-radar", "/work/lead-radar"], ["hermes", "/work/hermes"], ["route", "/work/route"],
];
await mkdir("shots/stage7", { recursive: true });
const b = await chromium.launch({ channel: "chrome" });
for (const [name, route] of ROUTES) {
  for (const w of [1440, 390]) {
    const measure = await b.newPage({ viewport: { width: w, height: 900 } });
    await measure.goto(BASE + route, { waitUntil: "networkidle" });
    await measure.addStyleTag({ content: CAPTURE_CSS });
    await measure.waitForTimeout(400);
    const tall = await measure.evaluate(() => document.documentElement.scrollHeight);
    await measure.close();
    const dpr = tall * 2 > 16000 ? 1 : 2;

    const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr });
    await p.goto(BASE + route, { waitUntil: "networkidle" });
    await p.addStyleTag({ content: CAPTURE_CSS });
    await p.evaluate(() => { for (const i of document.images) i.loading = "eager"; });
    await p.evaluate(async () => {
      const step = innerHeight * 0.75;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo(0, y); await new Promise((r) => setTimeout(r, 90));
      }
      scrollTo(0, 0);
    });
    await p.waitForTimeout(1200);
    await p.evaluate(async () => {
      const settle = (i) => i.complete ? Promise.resolve() : new Promise((r) => { i.addEventListener("load", r, { once: true }); i.addEventListener("error", r, { once: true }); });
      await Promise.race([Promise.all([...document.images].map(settle)), new Promise((r) => setTimeout(r, 8000))]);
    });
    await p.waitForTimeout(600);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.screenshot({ path: `shots/stage7/${name}-${w}.png`, fullPage: true });
    console.log(`${name} ${w} — ${w}×${H} @${dpr}x`);
    await p.close();
  }
}
await b.close();
