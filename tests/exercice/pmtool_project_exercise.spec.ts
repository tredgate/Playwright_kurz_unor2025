import { test } from "@playwright/test";
import { testData } from "../../data/test_data";

test("Otevři projekty v PMTool", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  await page.locator("#username").fill("playwright_jaro24");
  await page.locator("#password").fill("Playwright!2024");
  await page.locator(".btn").click();
  await page.locator("#Projects").click();
});
