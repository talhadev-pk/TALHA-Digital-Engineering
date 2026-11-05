import { chromium } from "playwright";

const BASE = "http://localhost:4173";
const results = [];
const errors = [];

function ok(name, pass, extra = "") {
  results.push(`${pass ? "PASS" : "FAIL"}  ${name}${extra ? " — " + extra : ""}`);
  if (!pass) process.exitCode = 1;
}

const browser = await chromium.launch();

async function noOverflow(page, label) {
  const m = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    iw: window.innerWidth,
  }));
  ok(`no horizontal overflow [${label}]`, m.sw <= m.iw + 1, `scrollWidth=${m.sw} inner=${m.iw}`);
}

/* ---------- desktop pass ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("console: " + m.text());
  });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2300); // loader out

  ok("hero headline renders", await page.getByText(/Engineering/i).first().isVisible());

  // system map opens commerceos modal
  await page.getByRole("button", { name: /Open CommerceOS project details/i }).click();
  await page.waitForTimeout(700);
  ok("system map opens modal + hash", page.url().includes("#/project/commerceos"));

  // real screenshot loads inside modal
  const img = page.locator('[role="dialog"] img').first();
  await img.waitFor({ state: "visible" });
  const nat = await img.evaluate((el) => ({ w: el.naturalWidth, c: el.complete }));
  await page.waitForTimeout(1200);
  const nat2 = await img.evaluate((el) => el.naturalWidth);
  ok("real screenshot loads", (nat.w > 0 || nat2 > 0) && nat.c, `naturalWidth=${nat2}`);

  // next project
  await page.getByRole("button", { name: "Next project" }).first().click();
  await page.waitForTimeout(500);
  ok("modal next → proseq-ai", page.url().includes("#/project/proseq-ai"));

  // escape closes
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  ok("escape closes modal", !page.url().includes("#/project/"));

  // search filter
  await page.getByLabel("Search projects").fill("dexie");
  await page.waitForTimeout(1100);
  const count = await page.locator("#project-grid article").count();
  ok("search 'dexie' → 1 result", count === 1, `count=${count}`);
  await page.getByRole("button", { name: /Reset filters/i }).click().catch(() => {});
  await page.getByLabel("Search projects").fill("");

  // category filter
  await page.getByRole("button", { name: "Automation" }).click();
  await page.waitForTimeout(1100);
  ok("filter Automation → 1", (await page.locator("#project-grid article").count()) === 1);
  await page.getByRole("button", { name: "All" }).click();

  // artwork projects labelled + load
  await page.getByRole("button", { name: /Open details for RestaurantOS/i }).first().click();
  await page.waitForTimeout(900);
  ok(
    "restaurantos artwork note shown",
    await page.getByText(/identity artwork|Portfolio artwork/i).first().isVisible()
  );
  const artImg = page.locator('[role="dialog"] img').first();
  ok("artwork image loads", (await artImg.evaluate((el) => el.naturalWidth)) > 0);
  ok("no live demo link for restaurantos", (await page.locator('[role="dialog"]').getByText("Open live demo").count()) === 0);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  // theme toggle persists
  await page.getByRole("button", { name: /Switch to light theme/i }).click();
  await page.waitForTimeout(300);
  const isLight = await page.evaluate(() => !document.documentElement.classList.contains("dark"));
  ok("theme switches to light", isLight);
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  const stillLight = await page.evaluate(() => !document.documentElement.classList.contains("dark"));
  ok("theme persists after reload", stillLight);
  await page.screenshot({ path: "qa-light-hero.png" });
  await page.getByRole("button", { name: /Switch to dark theme/i }).click();

  // settings persistence
  await page.getByRole("button", { name: "Open portfolio settings" }).click();
  await page.locator("#set-displayName").fill("Talha Q.");
  await page.locator("#set-email").fill("talha.sagheer.work@gmail.com");
  await page.getByRole("button", { name: /Save changes/i }).click();
  await page.waitForTimeout(400);
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  ok("edited name persists", await page.getByText(/Talha Q\./).first().isVisible());
  // reset
  await page.getByRole("button", { name: "Open portfolio settings" }).click();
  await page.getByRole("button", { name: /Reset defaults/i }).click();
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  ok("reset restores name", await page.getByText(/Talha — Software Engineer/i).first().isVisible());

  // copy email → toast
  await page.getByRole("button", { name: /Copy email address/i }).click().catch(() => {});
  await page.waitForTimeout(400);

  // footer credit
  ok("footer credit", await page.getByText(/Made with/i).last().isVisible());

  // contact channels
  ok(
    "permanent email displayed",
    await page.getByText("talha.sagheer.work@gmail.com").first().isVisible()
  );
  const wa = await page.locator('a[href^="https://wa.me/"]').first().getAttribute("href");
  ok("whatsapp card links to wa.me", !!wa && wa.startsWith("https://wa.me/923077251905"), wa ?? "none");

  // deep link into modal directly
  await page.goto(BASE + "/#/project/nexacore", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  ok("deep link opens nexacore modal", await page.locator('[role="dialog"]').isVisible());

  // 404
  await page.goto(BASE + "/#/banana", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  ok("custom 404 renders", await page.getByText("This page drifted off the map.").isVisible());
  await page.getByRole("link", { name: /Back to portfolio/i }).click();
  await page.waitForTimeout(600);
  ok("404 → home", await page.getByText(/Engineering/i).first().isVisible());

  await noOverflow(page, "desktop home");
  await page.screenshot({ path: "qa-dark-hero.png" });
  await ctx.close();
}

/* ---------- mobile pass ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("mobile console: " + m.text());
  });
  page.on("pageerror", (e) => errors.push("mobile pageerror: " + e.message));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2300);
  await noOverflow(page, "mobile home");
  await page.getByRole("button", { name: /Open TrackSphere project details/i }).click();
  await page.waitForTimeout(700);
  await noOverflow(page, "mobile modal");
  await page.screenshot({ path: "qa-mobile-modal.png" });
  await page.keyboard.press("Escape");
  // mobile menu
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(500);
  ok("mobile menu opens", await page.getByRole("dialog", { name: "Menu" }).isVisible());
  await page.screenshot({ path: "qa-mobile-menu.png" });
  await page.getByRole("button", { name: "Close menu" }).click();
  await page.screenshot({ path: "qa-mobile-hero.png" });
  await ctx.close();
}

console.log("\n" + results.join("\n"));
console.log("\nConsole/page errors: " + (errors.length ? "\n" + errors.join("\n") : "none"));
if (errors.length) process.exitCode = 1;
await browser.close();
