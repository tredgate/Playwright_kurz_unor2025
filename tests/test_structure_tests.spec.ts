//test_structure_tests.spec.ts
import { test, expect } from "@playwright/test";
import { testData } from "../data/test_data";

test.describe("Testovací sada", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://tredgate.com/pmtool/");
  });

  test("PMTool login", async ({ page }) => {
    await page.locator("#username").fill(testData.pmtool.username);
    await page.locator("#password").fill(testData.pmtool.password);
    await page.locator("//button[@type='submit']").click();
    await expect(page.locator("//h3[@id='welcome-page-header']")).toBeVisible();
  });

  test("PMtool failed login", async ({ page }) => {
    await page.locator("#username").fill("random string");
    await page.locator("#password").fill("123454");
    await page.locator("//button[@type='submit']").click();
    await expect(
      page.locator("//div[@class='alert alert-danger']")
    ).toBeVisible();
  });
});
