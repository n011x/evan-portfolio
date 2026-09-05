import { chromium } from "playwright";
const BASE = "http://localhost:3112";
const browser = await chromium.launch({ channel: "chrome" });
const targets = [
  ["work-index", "/work", 0],
  ["work-sheet", "/work", 1400],
  ["case-lead-radar-head", "/work/lead-radar", 0],
  ["case-lead-radar-system", "/work/lead-radar", 1700],
  ["case-lead-radar-impl", "/work/lead-radar", 3400],
  ["case-hermes", "/work/hermes", 0],
  ["case-hermes-gallery", "/work/hermes", 2600],
  ["case-route", "/work/route", 0],
  ["case-luma-gallery", "/work/luma-english", 2400],
];
for (const [name, path, y] of targets) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  if (y) await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `.screens/${name}.png` });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(name, "overflowX:", overflow, errs.length ? "ERRORS: " + errs.join(" | ") : "");
  await page.close();
}
// mobile check of the archive + one case
for (const [name, path] of [["mobile-work", "/work"], ["mobile-case-lead", "/work/lead-radar"]]) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `.screens/${name}.png`, fullPage: false });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(name, "overflowX:", overflow);
  await page.close();
}
await browser.close();
