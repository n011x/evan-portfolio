/**
 * Evidence boundary check.
 *
 *   SANITIZE MAY CROP. LAYOUT MUST NOT CROP REAL OUTPUT.
 *
 * This asserts the second half at every breakpoint: that nothing in the page takes a
 * pixel off a real capture, stretches it, or renders it larger than the file that exists.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3112";
const ROUTES = ["/work/lead-radar", "/work/hermes"];
const WIDTHS = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];

const browser = await chromium.launch({ channel: "chrome" });
const failures = [];
let checked = 0;

for (const route of ROUTES) {
  for (const w of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: ".band { content-visibility: visible !important; }" });
    await page.evaluate(() => { for (const i of document.images) i.loading = "eager"; });
    await page.evaluate(async () => {
      const step = innerHeight * 0.7;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
    });
    await page.waitForTimeout(1200);

    const rows = await page.$$eval(".evidence-window img", (els) =>
      els.map((el) => {
        const box = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        // is any ancestor clipping the painted image?
        let clipped = null;
        let n = el.parentElement;
        while (n && n !== document.body) {
          const s = getComputedStyle(n);
          if (s.overflow !== "visible" || s.clipPath !== "none") {
            const b = n.getBoundingClientRect();
            if (box.left < b.left - 0.5 || box.right > b.right + 0.5 ||
                box.top < b.top - 0.5 || box.bottom > b.bottom + 0.5) {
              clipped = n.tagName + "." + String(n.className).slice(0, 24);
            }
          }
          n = n.parentElement;
        }
        const fig = el.closest(".evidence-window");
        return {
          sourceWidth: Number(fig?.getAttribute("data-source-width")) || 0,
          sourceHeight: Number(fig?.getAttribute("data-source-height")) || 0,
          src: decodeURIComponent((el.currentSrc.split("url=")[1] ?? "").split("&")[0]) || el.currentSrc.slice(-30),
          natW: el.naturalWidth, natH: el.naturalHeight,
          boxW: box.width, boxH: box.height,
          fit: cs.objectFit, clipped,
        };
      }),
    );

    for (const r of rows) {
      checked++;
      const where = `${route} @${w} ${r.src}`;
      if (r.fit !== "contain") failures.push(`${where}: object-fit is "${r.fit}", must be contain`);
      const srcAr = r.sourceWidth / r.sourceHeight, boxAr = r.boxW / r.boxH;
      if (Math.abs(srcAr - boxAr) / srcAr > 0.01) {
        failures.push(`${where}: box ratio ${boxAr.toFixed(3)} vs source ${srcAr.toFixed(3)} — the capture would be letterboxed or cropped`);
      }
      // next/image may serve a narrower variant, so compare against the real source file
      if (!r.sourceWidth) failures.push(`${where}: no declared source size`);
      const sourceWidth = r.sourceWidth;
      if (r.boxW > sourceWidth + 1) failures.push(`${where}: rendered ${Math.round(r.boxW)}px wide from a ${sourceWidth}px source — upscaled`);
      if (r.clipped) failures.push(`${where}: clipped by ${r.clipped}`);
    }
    await page.close();
  }
}

await browser.close();
console.log(`evidence images checked: ${checked}`);
console.log(failures.length ? "FAILURES:\n  " + failures.join("\n  ") : "NO LAYOUT CROP · NO UPSCALE · NO DEFORMATION");
process.exit(failures.length ? 1 : 0);
