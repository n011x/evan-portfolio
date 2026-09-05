/** Stage 6 — responsive sweep: every route × every required width. */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3112";
const WIDTHS = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const ROUTES = ["/", "/work", "/work/lead-radar", "/work/hermes", "/work/route", "/work/luma-english", "/work/yasno-house"];

const browser = await chromium.launch({ channel: "chrome" });
const problems = [];

for (const route of ROUTES) {
  const row = [];
  for (const w of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    const consoleErrors = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    page.on("pageerror", (e) => consoleErrors.push(e.message));
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const overflow = de.scrollWidth - de.clientWidth;
      const offenders = [...document.querySelectorAll("body *")]
        .filter((el) => {
          const b = el.getBoundingClientRect();
          if (b.right <= de.clientWidth + 1) return false;
          let p = el;
          while (p && p !== document.body) {
            const ox = getComputedStyle(p).overflowX;
            if (ox === "auto" || ox === "scroll" || ox === "hidden") return false;
            p = p.parentElement;
          }
          return true;
        })
        .slice(0, 3)
        .map((el) => el.tagName + "." + String(el.className).slice(0, 34));
      // smallest rendered text
      let min = 99;
      for (const el of document.querySelectorAll("p,span,a,li,dt,dd,h1,h2,h3,td,th")) {
        if (!el.textContent?.trim()) continue;
        if (!el.getClientRects().length) continue;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs < min) min = fs;
      }
      return { overflow, minFont: min, offenders, h: de.scrollHeight };
    });
    if (r.overflow > 0 || r.offenders.length) problems.push(`${route} @${w}: overflow=${r.overflow} ${JSON.stringify(r.offenders)}`);
    if (consoleErrors.length) problems.push(`${route} @${w}: console ${JSON.stringify(consoleErrors.slice(0, 2))}`);
    row.push(`${w}:ovf${r.overflow}/min${r.minFont}px`);
    await page.close();
  }
  console.log(route.padEnd(20), row.join("  "));
}

console.log("\nPROBLEMS:", problems.length ? "\n  " + problems.join("\n  ") : "none");
await browser.close();
