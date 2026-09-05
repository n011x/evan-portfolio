/**
 * Stage 6 — measured (not simulated) Core Web Vitals.
 * Lighthouse's mobile numbers come from its Lantern model; this applies real CPU and
 * network throttling to Chrome and reads what the page actually reports.
 */
import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3112";
const b = await chromium.launch({ channel: "chrome" });

for (const [label, vp, cpu, net] of [
  ["mobile 390 · 4× CPU · slow 4G", { width: 390, height: 844 }, 4, true],
  ["desktop 1440 · no throttle", { width: 1440, height: 900 }, 1, false],
]) {
  for (const route of ["/", "/work/lead-radar"]) {
    const ctx = await b.newContext({ viewport: vp });
    const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
    if (net) {
      await cdp.send("Network.enable");
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false, latency: 150,
        downloadThroughput: (1.6 * 1024 * 1024) / 8,
        uploadThroughput: (750 * 1024) / 8,
      });
    }
    await p.addInitScript(() => {
      window.__v = { lcp: 0, cls: 0, inp: 0, longest: 0 };
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__v.lcp = Math.round(e.startTime); })
        .observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__v.cls += e.value; })
        .observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__v.inp = Math.max(window.__v.inp, Math.round(e.duration)); })
        .observe({ type: "event", buffered: true, durationThreshold: 16 });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__v.longest = Math.max(window.__v.longest, Math.round(e.duration)); })
        .observe({ type: "longtask", buffered: true });
    });
    await p.goto(BASE + route, { waitUntil: "load" });
    await p.waitForTimeout(2500);
    // LCP is only meaningful before the page is scrolled: scrolling promotes whatever
    // large element enters the viewport next, on any long document
    const lcp = await p.evaluate(() => window.__v.lcp);

    // exercise the interactions the page actually has
    for (const sel of ["header a", ".link-arrow", ".media-states"]) {
      const el = await p.$(sel);
      if (el) { await el.hover().catch(() => {}); await p.waitForTimeout(200); }
    }
    await p.keyboard.press("Tab");
    await p.keyboard.press("Tab");
    await p.evaluate(async () => { for (let y = 0; y < 3000; y += 150) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } });
    await p.waitForTimeout(800);

    const v = await p.evaluate(() => window.__v);
    console.log(
      `${label.padEnd(32)} ${route.padEnd(18)} LCP ${String(lcp).padStart(5)}ms  CLS ${v.cls.toFixed(3)}  INP ${String(v.inp).padStart(4)}ms  longest task ${v.longest}ms`,
    );
    await ctx.close();
  }
}
await b.close();
