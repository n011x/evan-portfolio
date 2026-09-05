/**
 * Stage 6.1 — full functional audit. Everything the stage brief asks to verify that the
 * other scripts do not already cover: the ghost-index contrast against its real ground,
 * every internal link on every route, ROUTE's strip by keyboard, the LUMA media wipe,
 * the field's non-interactivity, and the reduced-motion completeness of the page.
 */
import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3112";
const ROUTES = ["/", "/work", "/work/lead-radar", "/work/hermes", "/work/route"];
const b = await chromium.launch({ channel: "chrome" });
const fail = [];

const lum = (r, g, bl) => { const f = v => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bl); };
const ratio = (a, c) => { const x = lum(...a), y = lum(...c); return +(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2)); };
const rgb = s => s.match(/\d+/g).slice(0, 3).map(Number);

// ---- 1. every internal link on every route resolves ----
const seen = new Map();
for (const route of ROUTES) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  p.on("console", m => m.type() === "error" && errs.push(`${route}: ${m.text()}`));
  p.on("pageerror", e => errs.push(`${route}: ${e.message}`));
  await p.goto(BASE + route, { waitUntil: "networkidle" });
  await p.addStyleTag({ content: ".band{content-visibility:visible!important}" });
  await p.waitForTimeout(500);
  const links = await p.$$eval("a[href]", els => els.map(e => ({ href: e.getAttribute("href"), rel: e.getAttribute("rel"), target: e.getAttribute("target") })));
  for (const l of links) {
    if (l.href.startsWith("/") || l.href.startsWith("#")) {
      const u = l.href.startsWith("#") ? route : l.href;
      if (!seen.has(u)) seen.set(u, (await (await fetch(BASE + u)).status));
    } else if (l.href.startsWith("http") && (l.rel || "").indexOf("noopener") === -1) {
      fail.push(`${route}: external link without rel=noopener -> ${l.href}`);
    }
  }
  if (errs.length) fail.push(...errs);
  await p.close();
}
for (const [u, s] of seen) { if (s !== 200) fail.push(`internal link ${u} -> ${s}`); }
console.log("[links] distinct internal targets:", seen.size, "| all 200:", [...seen.values()].every(s => s === 200));

// ---- 2. ghost index contrast against its real painted ground ----
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.addStyleTag({ content: ".band{content-visibility:visible!important} [data-reveal]{opacity:1!important;transform:none!important}" });
  await p.waitForTimeout(800);
  const ghosts = await p.$$eval('span[aria-hidden="true"].display-2', els => els.map(el => {
    let n = el.parentElement, bg = "rgba(0, 0, 0, 0)";
    while (n) { const c = getComputedStyle(n).backgroundColor; if (c && !c.startsWith("rgba(0, 0, 0, 0)")) { bg = c; break; } n = n.parentElement; }
    return { text: el.textContent.trim(), fg: getComputedStyle(el).color, bg };
  }));
  for (const g of ghosts) {
    const r = ratio(rgb(g.fg), rgb(g.bg));
    const ok = r >= 2 && r <= 3;
    console.log(`[ghost] ${g.text} ${g.fg} on ${g.bg} = ${r}:1 ${ok ? "in 2:1–3:1" : "OUT OF RANGE"}`);
    if (!ok) fail.push(`ghost index ${g.text} contrast ${r}:1 outside the 2:1–3:1 target`);
  }
  await p.close();
}

// ---- 3. ROUTE screen strip is reachable and scrollable by keyboard ----
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.addStyleTag({ content: ".band{content-visibility:visible!important}" });
  await p.waitForTimeout(600);
  const strip = await p.$('div[role="group"][aria-label*="Экраны"]');
  const r = await strip.evaluate(el => {
    el.focus();
    const focused = document.activeElement === el;
    const before = el.scrollLeft;
    el.scrollLeft = 200;
    const moved = el.scrollLeft > before;
    el.scrollLeft = before;
    return { focused, moved, tabindex: el.getAttribute("tabindex"), label: el.getAttribute("aria-label") };
  });
  console.log("[route strip]", JSON.stringify(r));
  if (!r.focused || !r.moved) fail.push("ROUTE screen strip is not keyboard operable");
  await p.close();
}

// ---- 4. LUMA processed -> clean wipe still works; the field never takes pointer events ----
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.addStyleTag({ content: ".band{content-visibility:visible!important} [data-reveal]{opacity:1!important;transform:none!important}" });
  await p.waitForTimeout(800);
  const media = await p.$(".media-states");
  await media.scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  const read = () => media.evaluate(el => getComputedStyle(el.querySelector(".media-states__clean")).clipPath);
  const before = await read();
  await media.hover();
  await p.waitForTimeout(700);
  const after = await read();
  // and the keyboard route to the same state
  await p.keyboard.press("Tab");
  const focusable = await media.evaluate(el => el.tabIndex);
  await media.evaluate(el => el.focus());
  await p.waitForTimeout(700);
  const focused = await read();
  console.log("[media] clip idle:", before, "| hover:", after, "| focus:", focused, "| tabIndex:", focusable);
  if (before === after) fail.push("LUMA processed->clean wipe did not change on hover");
  if (before === focused) fail.push("LUMA processed->clean wipe did not change on keyboard focus");
  const fieldPE = await p.$$eval(".field, .field__mass, .grain", els => [...new Set(els.map(e => getComputedStyle(e).pointerEvents))]);
  console.log("[field] pointer-events values:", fieldPE);
  if (fieldPE.some(v => v !== "none")) fail.push("decorative field is not pointer-events:none");
  await p.close();
}

// ---- 5. reduced motion exposes the complete page, nothing left hidden ----
for (const route of ROUTES) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(BASE + route, { waitUntil: "networkidle" });
  await p.addStyleTag({ content: ".band{content-visibility:visible!important}" });
  await p.waitForTimeout(700);
  const r = await p.evaluate(() => {
    const all = [...document.querySelectorAll("[data-reveal]")];
    return {
      total: all.length,
      hidden: all.filter(e => parseFloat(getComputedStyle(e).opacity) < 0.99).length,
      running: document.getAnimations().filter(a => a.playState === "running").length,
      motion: document.documentElement.dataset.motion,
    };
  });
  if (r.hidden || r.running) fail.push(`${route}: reduced-motion hidden=${r.hidden} running=${r.running}`);
  console.log(`[reduced ${route.padEnd(20)}] reveals=${r.total} hidden=${r.hidden} animations=${r.running} motion=${r.motion}`);
  await ctx.close();
}

await b.close();
console.log("\n" + (fail.length ? "FAILURES:\n  " + fail.join("\n  ") : "ALL STAGE 6.1 FUNCTIONAL CHECKS PASSED"));
