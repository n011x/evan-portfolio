import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
let bad = 0;
for (const [w, label] of [[1440, "desktop"], [390, "mobile"]]) {
  for (const route of ["/work/lead-radar", "/work/hermes"]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto("http://localhost:3112" + route, { waitUntil: "networkidle" });
    await p.addStyleTag({ content: ".band{content-visibility:visible!important}" });
    await p.evaluate(() => { for (const i of document.images) i.loading = "eager"; });
    await p.evaluate(async () => { const s=innerHeight*0.7; for (let y=0;y<document.documentElement.scrollHeight;y+=s){scrollTo(0,y);await new Promise(r=>setTimeout(r,150));} });
    await p.waitForTimeout(2000);
    const rows = await p.$$eval(".evidence-plate img", els => els
      .filter(e => e.offsetParent !== null)
      .map(e => ({ src: decodeURIComponent(e.currentSrc.split("url=")[1]?.split("&")[0] ?? ""), nw: e.naturalWidth,
                   box: Math.round(e.getBoundingClientRect().width),
                   ar: (e.naturalWidth / e.naturalHeight).toFixed(3),
                   boxAr: (e.getBoundingClientRect().width / e.getBoundingClientRect().height).toFixed(3) })));
    for (const r of rows) {
      const up = r.box > 496;                       // source captures are 496–540 px wide
      // next/image serves a resized variant whose rounded height shifts the ratio by
      // well under a pixel on a wide strip; only a real distortion should fail here
      const arOff = Math.abs(+r.ar - +r.boxAr) > 0.03;
      if (up || arOff) { bad++; console.log("  ISSUE", label, r); }
      else console.log(`  ok ${label.padEnd(7)} ${r.src.padEnd(22)} box ${r.box}px  ar ${r.ar}/${r.boxAr}`);
    }
    await p.close();
  }
}
await b.close();
console.log(bad ? `\n${bad} PROBLEM(S)` : "\nno upscaling, aspect ratios preserved");
