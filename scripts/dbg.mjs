import { chromium } from "playwright";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:3111", { waitUntil: "networkidle" });
const info = await page.evaluate(() => {
  const hero = document.querySelector("#top");
  const kids = [...hero.querySelectorAll(".wrap > *")].map((el) => {
    const r = el.getBoundingClientRect();
    return { cls: el.className.slice(0, 40), top: Math.round(r.top), h: Math.round(r.height), w: Math.round(r.width) };
  });
  const h1 = document.querySelector("h1").getBoundingClientRect();
  const cs = getComputedStyle(document.querySelector("h1"));
  return { hero: hero.getBoundingClientRect().height, kids, h1: { top: Math.round(h1.top), h: Math.round(h1.height), w: Math.round(h1.width) }, fs: cs.fontSize, ff: cs.fontFamily, color: cs.color };
});
console.log(JSON.stringify(info, null, 1));
await page.screenshot({ path: ".screens/dbg-mobile.png" });
await browser.close();
