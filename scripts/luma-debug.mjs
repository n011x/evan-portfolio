import { chromium } from "playwright";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("response", (r) => { if (r.status() >= 400) console.log("HTTP", r.status(), r.url()); });
await page.goto("http://localhost:3112", { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
const y = await page.$eval("[aria-labelledby='project-luma-english']", (el) => el.getBoundingClientRect().top + window.scrollY);
await page.evaluate((v) => window.scrollTo(0, v - 56), y);
await page.waitForTimeout(2500);
const info = await page.evaluate(() => {
  const art = document.querySelector("[aria-labelledby='project-luma-english']");
  const fig = art.querySelector("figure");
  const ms = art.querySelector(".media-states");
  const imgs = [...art.querySelectorAll("img")];
  const r = (el) => { const b = el?.getBoundingClientRect(); return b ? { w: Math.round(b.width), h: Math.round(b.height) } : null; };
  return {
    figure: r(fig),
    figurePos: fig ? getComputedStyle(fig).position : null,
    mediaStates: r(ms),
    msPos: ms ? getComputedStyle(ms).position : null,
    imgCount: imgs.length,
    imgs: imgs.map((i) => ({ src: i.getAttribute("src")?.slice(0, 60), complete: i.complete, nat: i.naturalWidth, box: r(i) })),
  };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
