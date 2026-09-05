import { chromium } from "playwright";
import { readdir, rename } from "node:fs/promises";

const BASE = "http://localhost:3112";
const browser = await chromium.launch({ channel: "chrome" });

async function capture(name, fn, { width = 1440, height = 900 } = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    recordVideo: { dir: `.motion/${name}`, size: { width, height } },
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  await fn(page);
  await ctx.close();
  const files = await readdir(`.motion/${name}`);
  const webm = files.find((f) => f.endsWith(".webm"));
  if (webm) await rename(`.motion/${name}/${webm}`, `.motion/${name}.webm`);
  console.log("captured", name);
}

// HERO — the field drifting behind a static composition
await capture("hero-field", async (page) => {
  await page.waitForTimeout(9000);
});

// LUMA — processed → clean wipe on hover
await capture("luma-states", async (page) => {
  const y = await page.$eval("[aria-labelledby='project-luma-english']", (el) => el.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((v) => window.scrollTo(0, v - 40), y);
  await page.waitForTimeout(1400);
  const box = await page.$eval("[aria-labelledby='project-luma-english'] .media-states", (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  await page.mouse.move(box.x, box.y, { steps: 12 });
  await page.waitForTimeout(1600);
  await page.mouse.move(30, 30, { steps: 8 });
  await page.waitForTimeout(1400);
});

// transition into CONTACT — the field going dark, statement staying still
await capture("statement-contact", async (page) => {
  const statement = await page.$eval("section[aria-label='Statement']", (el) => el.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y - 200), statement);
  await page.waitForTimeout(1500);
  const contact = await page.$eval("#contact", (el) => el.getBoundingClientRect().top + window.scrollY);
  for (let i = 0; i <= 30; i++) {
    await page.evaluate(({ from, to, i }) => window.scrollTo(0, from + ((to - from) * i) / 30), { from: statement - 200, to: contact, i });
    await page.waitForTimeout(70);
  }
  await page.waitForTimeout(2200);
});

await browser.close();
