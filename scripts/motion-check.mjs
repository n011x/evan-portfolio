import { chromium } from "playwright";
const BASE = "http://localhost:3112";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
await page.goto(BASE, { waitUntil: "networkidle" });

// 1 — animations are running and are compositor-friendly
const anim = await page.evaluate(() => {
  const list = document.getAnimations().map((a) => ({
    name: a.animationName ?? "css",
    state: a.playState,
    duration: a.effect?.getTiming?.().duration,
  }));
  return { count: list.length, sample: list.slice(0, 6) };
});
console.log("animations:", JSON.stringify(anim));

// 2 — motion gate reacts to visibility
await page.evaluate(() => Object.defineProperty(document, "hidden", { value: true, configurable: true }));
await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
await page.waitForTimeout(120);
const gated = await page.evaluate(() => document.documentElement.dataset.motion);
console.log("motion when hidden:", gated);
await page.evaluate(() => Object.defineProperty(document, "hidden", { value: false, configurable: true }));
await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
await page.waitForTimeout(120);
console.log("motion when visible:", await page.evaluate(() => document.documentElement.dataset.motion));

// 3 — reveals actually fire
await page.evaluate(() => window.scrollTo(0, 2600));
await page.waitForTimeout(900);
const revealed = await page.$$eval("[data-reveal]", (els) => ({
  total: els.length,
  shown: els.filter((e) => e.dataset.revealed === "true").length,
}));
console.log("reveals:", JSON.stringify(revealed));

// 4 — layout must not shift while the field animates
const shift = await page.evaluate(async () => {
  const first = document.querySelector("h1").getBoundingClientRect().top;
  await new Promise((r) => setTimeout(r, 1500));
  const second = document.querySelector("h1").getBoundingClientRect().top;
  return Math.abs(first - second);
});
console.log("h1 drift during animation (px):", shift);

// 5 — reduced motion renders a complete static page
const rm = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await rm.goto(BASE, { waitUntil: "networkidle" });
await rm.waitForTimeout(400);
const rmState = await rm.evaluate(() => ({
  motion: document.documentElement.dataset.motion,
  running: document.getAnimations().filter((a) => a.playState === "running").length,
  hiddenReveals: [...document.querySelectorAll("[data-reveal]")]
    .filter((e) => getComputedStyle(e).opacity !== "1").length,
}));
console.log("reduced motion:", JSON.stringify(rmState));
await rm.screenshot({ path: ".screens/reduced-motion.png" });

console.log("errors:", errors.length ? errors : "none");
await browser.close();
