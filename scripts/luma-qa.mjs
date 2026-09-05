import { chromium } from "playwright";
const BASE = "http://localhost:3112";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
const y = await page.$eval("[aria-labelledby='project-luma-english']", (el) => el.getBoundingClientRect().top + window.scrollY);
await page.evaluate((v) => window.scrollTo(0, v - 56), y);
await page.waitForTimeout(2500);
await page.waitForFunction(() => {
  const img = document.querySelector("[aria-labelledby='project-luma-english'] img");
  return Boolean(img && img.complete && img.naturalWidth > 0);
}, null, { timeout: 15000 });

const box = await page.$eval("[aria-labelledby='project-luma-english'] .media-states", (el) => {
  const r = el.getBoundingClientRect();
  return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) };
});
const imgs = await page.$$eval("[aria-labelledby='project-luma-english'] img", (els) =>
  els.map((i) => ({ src: i.currentSrc.split("/").pop().split("?")[0], w: i.naturalWidth, h: i.naturalHeight, rendered: Math.round(i.getBoundingClientRect().width) })));
console.log("media-states box:", JSON.stringify(box));
console.log("images:", JSON.stringify(imgs));
await page.screenshot({ path: ".screens/luma-processed.png" });

// hover → clean
const c = await page.$eval("[aria-labelledby='project-luma-english'] .media-states", (el) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
});
await page.mouse.move(c.x, c.y, { steps: 10 });
await page.waitForFunction(() => {
  const imgs = [...document.querySelectorAll("[aria-labelledby='project-luma-english'] img")];
  return imgs.length > 1 && imgs[1].complete && imgs[1].naturalWidth > 0;
}, null, { timeout: 15000 });
await page.waitForTimeout(900);
await page.screenshot({ path: ".screens/luma-clean.png" });
const clipped = await page.$eval("[aria-labelledby='project-luma-english'] .media-states__clean", (el) => getComputedStyle(el).clipPath);
console.log("clean clip after hover:", clipped);
await browser.close();
