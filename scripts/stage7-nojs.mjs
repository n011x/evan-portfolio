/** With JavaScript disabled the whole page must still be readable. */
import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3112";
const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
const bad = [];
for (const route of ["/", "/work", "/work/lead-radar", "/work/hermes", "/work/route"]) {
  const p = await ctx.newPage();
  await p.goto(BASE + route, { waitUntil: "domcontentloaded" });
  const r = await p.evaluate(() => {
    const reveals = [...document.querySelectorAll("[data-reveal]")];
    const hidden = reveals.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99).length;
    const text = document.body.innerText.replace(/\s+/g, " ").trim();
    return { reveals: reveals.length, hidden, chars: text.length, links: document.querySelectorAll("a[href]").length };
  });
  if (r.hidden) bad.push(`${route}: ${r.hidden}/${r.reveals} reveals invisible without JS`);
  if (r.chars < 400) bad.push(`${route}: only ${r.chars} characters rendered without JS`);
  console.log(`  ${route.padEnd(20)} reveals=${r.reveals} hidden=${r.hidden} text=${r.chars} links=${r.links}`);
  await p.close();
}
await b.close();
console.log(bad.length ? "FAILURES:\n  " + bad.join("\n  ") : "the whole site reads with JavaScript disabled");
