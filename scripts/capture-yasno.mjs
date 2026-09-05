/**
 * Captures the live ЯсноДом landing for the WEB EXAMPLES band.
 * Real production page, no reconstruction: fonts settled, no loading state, no browser
 * chrome, no overlay. Desktop hero plus a mobile frame.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const URL = "https://ysnohousereffwebsite.vercel.app";
await mkdir(".assets", { recursive: true });
const b = await chromium.launch({ channel: "chrome" });

for (const [name, vp, dsf] of [
  ["yasno-hero", { width: 1440, height: 900 }, 2],
  ["yasno-mobile", { width: 390, height: 844 }, 2],
]) {
  const p = await b.newPage({ viewport: vp, deviceScaleFactor: dsf });
  await p.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await p.evaluate(() => document.fonts.ready);
  // let any entrance animation settle, then make sure nothing is still mid-reveal
  await p.evaluate(async () => {
    for (let y = 0; y < 1200; y += 200) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    scrollTo(0, 0);
    document.getAnimations().forEach(a => a.finish());
  });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `.assets/${name}.png` });
  console.log(name, `${vp.width}×${vp.height} @${dsf}x`);
  await p.close();
}
await b.close();
