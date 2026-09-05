/**
 * Stage 6 — reveal integrity under content-visibility.
 * Offscreen bands skip rendering, so this checks that every [data-reveal] still fires
 * when the page is scrolled at human speed, and that nothing stays invisible.
 */
import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3112";
const ROUTES = ["/", "/work", "/work/lead-radar", "/work/hermes", "/work/route", "/work/luma-english", "/work/yasno-house"];
const b = await chromium.launch({ channel: "chrome" });
let bad = 0;
for (const w of [390, 1440]) {
  for (const route of ROUTES) {
    const p = await b.newPage({ viewport: { width: w, height: 844 } });
    await p.goto(BASE + route, { waitUntil: "networkidle" });
    await p.evaluate(async () => {
      // ~600 px/s, roughly a deliberate scroll
      for (let y = 0; y < document.documentElement.scrollHeight; y += 120) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 200));
      }
    });
    await p.waitForTimeout(1200);
    const res = await p.evaluate(() => {
      const all = [...document.querySelectorAll("[data-reveal]")];
      const hidden = all.filter((el) => el.getAttribute("data-revealed") !== "true");
      const invisible = all.filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.99);
      return {
        total: all.length,
        notRevealed: hidden.map((el) => el.tagName + "." + String(el.className).slice(0, 24)),
        stillTransparent: invisible.length,
      };
    });
    if (res.notRevealed.length || res.stillTransparent) bad++;
    console.log(
      `${String(w).padEnd(5)} ${route.padEnd(20)} reveals=${res.total} unfired=${res.notRevealed.length} transparent=${res.stillTransparent}`,
      res.notRevealed.length ? res.notRevealed.slice(0, 3) : "",
    );
    await p.close();
  }
}
await b.close();
console.log(bad ? `FAILED on ${bad} page(s)` : "ALL REVEALS FIRED");
