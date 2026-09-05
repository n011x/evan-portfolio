import { chromium } from "playwright";
const BASE = "http://localhost:3112";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: "networkidle" });
const links = await page.$$eval("a[href]", (els) =>
  [...new Set(els.map((e) => e.getAttribute("href")))].filter((h) => h && h.startsWith("/")),
);
console.log("internal links on home:", JSON.stringify(links));
for (const href of links) {
  const res = await page.request.get(BASE + href);
  console.log(res.status(), href);
}
const inert = await page.$$eval("[data-route-pending]", (els) => els.length);
console.log("inert case links remaining:", inert);
await browser.close();
