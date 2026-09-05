/**
 * Stage 6 — accessibility pass.
 * Runs axe-core (WCAG 2.2 A/AA) over every route in both motion modes,
 * then checks keyboard reachability, focus visibility and touch-target size.
 */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3112";
const AXE = readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const ROUTES = ["/", "/work", "/work/lead-radar", "/work/hermes", "/work/route", "/work/luma-english", "/work/yasno-house"];

const browser = await chromium.launch({ channel: "chrome" });
let violations = 0;

for (const reducedMotion of ["no-preference", "reduce"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);
    await page.addScriptTag({ content: AXE });
    const res = await page.evaluate(async () =>
      await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
      }),
    );
    const v = res.violations.filter((x) => x.impact !== "minor" || true);
    violations += v.length;
    console.log(
      `[axe ${reducedMotion}] ${route.padEnd(20)} passes=${res.passes.length} violations=${v.length}` +
        (v.length ? "\n  " + v.map((x) => `${x.impact}/${x.id}: ${x.nodes.length}× ${x.nodes[0].target}`).join("\n  ") : ""),
    );
    await page.close();
  }
  await ctx.close();
}

// keyboard + focus visibility + target size, mobile
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
const page = await ctx.newPage();
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(600);

const order = [];
for (let i = 0; i < 40; i++) {
  await page.keyboard.press("Tab");
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const inView = r.top >= -1 && r.bottom <= innerHeight + 1;
    return {
      tag: el.tagName,
      text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 26),
      w: Math.round(r.width),
      h: Math.round(r.height),
      outline: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0,
      inView,
    };
  });
  if (!info) break;
  order.push(info);
}
console.log("\n[keyboard] focusable stops:", order.length);
const noRing = order.filter((o) => !o.outline);
console.log("[keyboard] stops without a visible focus ring:", noRing.length, noRing.slice(0, 5));
const small = order.filter((o) => o.h < 24 || o.w < 24);
console.log("[targets] box under 24×24 CSS px:", small.length);

// real hit area: a ::after overlay extends the target beyond its border box
const hit = await page.evaluate(() => {
  const bad = [];
  for (const el of document.querySelectorAll("a[href], button")) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const a = getComputedStyle(el, "::after");
    let grow = { x: 0, y: 0 };
    if (a.content && a.content !== "none" && a.position === "absolute") {
      const px = (v) => (v.endsWith("px") ? -parseFloat(v) : 0);
      grow = {
        y: Math.max(0, px(a.top)) + Math.max(0, px(a.bottom)),
        x: Math.max(0, px(a.left)) + Math.max(0, px(a.right)),
      };
    }
    const h = r.height + grow.y;
    const w = r.width + grow.x;
    if (h < 24 || w < 24) {
      bad.push({ text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 24), w: Math.round(w), h: Math.round(h) });
    }
  }
  return bad;
});
console.log("[targets] effective hit area under 24×24:", hit.length, hit.slice(0, 8));

await browser.close();
console.log("\nTOTAL AXE VIOLATIONS:", violations);
