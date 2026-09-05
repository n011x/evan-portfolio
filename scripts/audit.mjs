import { chromium } from "playwright";
const browser = await chromium.launch({ channel: "chrome" });
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const errors = [];
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`${w}: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`${w}: ${e.message}`));
  await page.goto(process.env.BASE ?? "http://localhost:3112", { waitUntil: "networkidle" });
  const res = await page.evaluate(() => {
    const de = document.documentElement;
    const overflow = de.scrollWidth - de.clientWidth;
    const wide = [...document.querySelectorAll("body *")]
      .filter((el) => el.getBoundingClientRect().right > de.clientWidth + 1)
      .filter((el) => getComputedStyle(el).overflowX !== "auto")
      .slice(0, 4)
      .map((el) => el.tagName + "." + String(el.className).slice(0, 30));
    return { overflow, height: de.scrollHeight, wide };
  });
  console.log(w, JSON.stringify(res));
  await page.close();
}
console.log("CONSOLE ERRORS:", errors.length ? errors : "none");
await browser.close();
