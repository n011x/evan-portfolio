import { chromium } from "playwright";
const [sel, name, w = "1440"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: Number(w), height: 900 }, deviceScaleFactor: 2 });
await page.goto("http://localhost:3112", { waitUntil: "networkidle" });
await page.locator(sel).first().screenshot({ path: `.screens/${name}.png` });
console.log("saved", name);
await browser.close();
