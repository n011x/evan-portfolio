/**
 * Stage 6 — responsive proof sheet.
 * Capture notes: `content-visibility` skips offscreen painting and the header is sticky,
 * both of which corrupt a full-page capture — for the capture only, both are neutralised
 * (geometry untouched, so the sheet still shows real layout). And a capture taller than
 * ~16k device pixels falls back to a scroll-and-stitch path that duplicates bands, so the
 * device scale factor drops to 1 on the long routes.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE ?? "http://localhost:3112";
const CAPTURE_CSS = `
  .band { content-visibility: visible !important; }
  header { position: static !important; }
  /* the sheet documents the settled state, not mid-reveal frames */
  [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
`;
const jobs = [
  ["home", "/", [320, 390, 768, 1024, 1440, 1920]],
  ["work", "/work", [390, 768, 1440]],
  ["case", "/work/lead-radar", [320, 390, 768, 1440]],
];

await mkdir("shots/stage6", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

for (const [name, route, widths] of jobs) {
  for (const w of widths) {
    const measure = await browser.newPage({ viewport: { width: w, height: 900 } });
    await measure.goto(BASE + route, { waitUntil: "networkidle" });
    await measure.addStyleTag({ content: CAPTURE_CSS });
    await measure.waitForTimeout(400);
    const tall = await measure.evaluate(() => document.documentElement.scrollHeight);
    await measure.close();
    const dpr = tall * 2 > 16000 ? 1 : 2;

    const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: dpr });
    await page.goto(BASE + route, { waitUntil: "networkidle" });

    await page.addStyleTag({ content: CAPTURE_CSS });
    // a proof sheet shows the whole page at once, so nothing may stay lazy
    await page.evaluate(() => {
      for (const img of document.images) {
        img.loading = "eager";
        img.setAttribute("fetchpriority", "high");
      }
    });
    // walk once so every reveal has fired
    await page.evaluate(async () => {
      const step = innerHeight * 0.75;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    // lazy images below the fold must finish before the sheet is captured — but a lazy
    // image that never enters the viewport never fires, so the wait is bounded
    await page.evaluate(async () => {
      const settle = (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((r) => {
              img.addEventListener("load", r, { once: true });
              img.addEventListener("error", r, { once: true });
            });
      await Promise.race([
        Promise.all([...document.images].map(settle)),
        new Promise((r) => setTimeout(r, 8000)),
      ]);
    });
    await page.waitForTimeout(600);

    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: `shots/stage6/${name}-${w}.png`, fullPage: true });
    console.log("captured", name, w, `${w}×${H} @${dpr}x`);
  }
}
await browser.close();
