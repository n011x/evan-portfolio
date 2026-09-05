import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3112";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(BASE, { waitUntil: "networkidle" });
const nav = await page.$$eval("header a", (els) =>
  els.map((el) => {
    const r = el.getBoundingClientRect();
    return { text: el.textContent.trim(), w: Math.round(r.width), h: Math.round(r.height) };
  }),
);
console.log("mobile header targets:", JSON.stringify(nav));
const overlap = await page.evaluate(() => {
  const rects = [...document.querySelectorAll("header a")].map((el) => el.getBoundingClientRect());
  let hit = 0;
  for (let i = 0; i < rects.length; i++)
    for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i], b = rects[j];
      if (a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom) hit++;
    }
  return hit;
});
console.log("overlapping header targets:", overlap);
const headings = await page.$$eval("h1,h2,h3", (els) =>
  els.map((el) => el.tagName + ": " + el.textContent.trim().slice(0, 28)),
);
console.log("headings:", JSON.stringify(headings, null, 0));
const pending = await page.$$eval("[data-route-pending]", (els) => els.length);
console.log("inert case links:", pending);
await browser.close();
