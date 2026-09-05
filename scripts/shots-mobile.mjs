import { chromium } from "playwright";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3111", { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
const targets = [
  ["mobile-work-01", "#work"],
  ["mobile-work-03", "[aria-labelledby='project-route']"],
  ["mobile-approach", "#approach"],
  ["mobile-stack", "#stack"],
  ["mobile-contact", "#contact"],
];
for (const [name, sel] of targets) {
  const y = await page.$eval(sel, (el) => el.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(150);
  await page.screenshot({ path: `.screens/${name}.png` });
  console.log(name, Math.round(y));
}
await browser.close();
