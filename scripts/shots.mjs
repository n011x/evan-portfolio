import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE ?? "http://localhost:3112";
const OUT = ".screens";
await mkdir(OUT, { recursive: true });

const sections = [
  ["hero", "#top"],
  ["work-01-lead-radar", "[aria-labelledby='project-lead-radar']"],
  ["work-02-hermes", "[aria-labelledby='project-hermes']"],
  ["work-03-route", "[aria-labelledby='project-route']"],
  ["work-04-luma", "[aria-labelledby='project-luma-english']"],
  ["statement", "section[aria-label='Statement']"],
  ["build", "#build"],
  ["approach", "#approach"],
  ["stack", "#stack"],
  ["about", "#about"],
  ["contact", "#contact"],
  ["footer", "footer"],
];

const browser = await chromium.launch({ channel: "chrome" });

for (const [device, width, height, dsf] of [
  ["desktop", 1440, 900, 1],
  ["mobile", 390, 844, 1],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: dsf,
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });

  await page.screenshot({ path: `${OUT}/${device}-full.png`, fullPage: true });

  for (const [name, sel] of sections) {
    const y = await page.$eval(sel, (el) => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate((v) => window.scrollTo(0, Math.max(0, v - 56)), y);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/${device}-${name}.png` });
  }

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  console.log(device, width, "overflowX:", overflow);
  await page.close();
}

await browser.close();
