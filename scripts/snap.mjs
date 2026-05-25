import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// 1) Login screen
await page.goto("http://127.0.0.1:5180", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.screenshot({ path: "scripts/login.png", fullPage: false });

// Enter the app
await page.click("text=Enter Command Center");
await page.waitForTimeout(600);
await page.screenshot({ path: "scripts/board.png", fullPage: false });

// Tight crop of the header
const header = await page.$("header");
if (header) await header.screenshot({ path: "scripts/header.png" });

await browser.close();
console.log("done");
