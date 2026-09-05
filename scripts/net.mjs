import { chromium } from "playwright";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("response", (r) => { if (r.status() >= 400) console.log(r.status(), r.url()); });
await page.goto("http://localhost:3111", { waitUntil: "networkidle" });
await browser.close();
