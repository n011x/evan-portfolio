import { chromium } from "playwright";
import { readdir, rename } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: ".motion/luma-section", size: { width: 1440, height: 900 } },
});
const page = await ctx.newPage();
await page.goto("http://localhost:3112", { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
const y = await page.$eval("[aria-labelledby='project-luma-english']", (el) => el.getBoundingClientRect().top + window.scrollY);
await page.evaluate((v) => window.scrollTo(0, v - 56), y);
await page.waitForFunction(() => {
  const img = document.querySelector("[aria-labelledby='project-luma-english'] img");
  return Boolean(img && img.complete && img.naturalWidth > 0);
}, null, { timeout: 15000 });
await page.waitForTimeout(1800);
const c = await page.$eval("[aria-labelledby='project-luma-english'] .media-states", (el) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
});
await page.mouse.move(c.x, c.y, { steps: 14 });
await page.waitForTimeout(1800);
await page.mouse.move(40, 40, { steps: 10 });
await page.waitForTimeout(1400);
await ctx.close();
const files = await readdir(".motion/luma-section");
const webm = files.find((f) => f.endsWith(".webm"));
if (webm) await rename(`.motion/luma-section/${webm}`, ".motion/luma-section.webm");
console.log("captured luma-section");
await browser.close();
