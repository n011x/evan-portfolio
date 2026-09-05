import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3112";
const ROUTES = ["/", "/work", "/work/lead-radar", "/work/hermes", "/work/route"];
const b = await chromium.launch({ channel: "chrome" });
const internal = new Map(), external = new Map(), problems = [];
for (const route of ROUTES) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on("console", (m) => m.type() === "error" && problems.push(`console ${route}: ${m.text()}`));
  p.on("pageerror", (e) => problems.push(`pageerror ${route}: ${e.message}`));
  await p.goto(BASE + route, { waitUntil: "networkidle" });
  await p.addStyleTag({ content: ".band{content-visibility:visible!important}" });
  await p.waitForTimeout(400);
  const links = await p.$$eval("a[href]", (els) => els.map((e) => ({
    href: e.getAttribute("href"), rel: e.getAttribute("rel") ?? "", target: e.getAttribute("target") ?? "",
    text: (e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 34),
    w: Math.round(e.getBoundingClientRect().width), h: Math.round(e.getBoundingClientRect().height),
  })));
  for (const l of links) {
    if (!l.text) problems.push(`${route}: link with no accessible name -> ${l.href}`);
    if (l.href.startsWith("http")) {
      if (!l.rel.includes("noopener") || !l.rel.includes("noreferrer")) problems.push(`${route}: external without rel -> ${l.href}`);
      external.set(l.href, l.text);
    } else if (l.href.startsWith("/") || l.href.startsWith("#")) {
      internal.set(l.href.startsWith("#") ? route + l.href : l.href, l.text);
    } else if (l.href.startsWith("mailto:") || l.href.startsWith("tel:")) {
      external.set(l.href, l.text);
    }
  }
  await p.close();
}
console.log("internal targets:");
for (const [u, t] of internal) {
  const clean = u.split("#")[0] || "/";
  const r = await fetch(BASE + clean, { redirect: "manual" });
  const ok = r.status === 200 || r.status === 308;
  console.log(`  ${String(r.status).padEnd(4)} ${clean.padEnd(24)} ${t}`);
  if (!ok) problems.push(`internal ${clean} -> ${r.status}`);
}
console.log("\nexternal targets (not fetched):");
for (const [u, t] of external) console.log(`  ${u.padEnd(46)} ${t}`);
await b.close();
console.log("\n" + (problems.length ? "PROBLEMS:\n  " + problems.join("\n  ") : "no link, rel, naming or console problems"));
