import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const route of ["/", "/work", "/work/lead-radar", "/work/hermes", "/work/route"]) {
  await p.goto("http://localhost:3000" + route, { waitUntil: "load" });
  await p.waitForTimeout(500);
  const res = await p.evaluate(async () => {
    const H = innerHeight, step = 90, bad = [];
    const max = Math.max(0, document.body.scrollHeight - H);
    for (let y = 0; y <= max + step; y += step) {
      window.scrollTo(0, Math.min(y, max));
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      for (const el of document.querySelectorAll("[data-reveal]")) {
        const r = el.getBoundingClientRect();
        if (r.height === 0 || r.top < 0 || r.bottom > H - 160) continue;
        const cs = getComputedStyle(el);
        if (parseFloat(cs.opacity) < 0.99) bad.push(`y=${Math.min(y,max)} op=${(+cs.opacity).toFixed(2)} "${el.textContent.trim().slice(0,24)}"`);
      }
    }
    // and the violent throw
    window.scrollTo(0, max); await new Promise(r => requestAnimationFrame(r));
    const inView = [...document.querySelectorAll("[data-reveal]")].filter(e => { const r = e.getBoundingClientRect(); return r.bottom > 0 && r.top < H && r.height > 0; });
    const dim = inView.filter(e => parseFloat(getComputedStyle(e).opacity) < 0.99).map(e => `"${e.textContent.trim().slice(0,24)}" op=${(+getComputedStyle(e).opacity).toFixed(2)}`);
    return { bad: [...new Set(bad)].slice(0,6), throwDim: dim };
  });
  console.log(route.padEnd(18), res.bad.length ? "MID-FADE: " + res.bad.join(" | ") : "clean", res.throwDim.length ? "| bottom-throw dim: " + res.throwDim.join(", ") : "| bottom clean");
}
await b.close();
