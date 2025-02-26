// ! Přístupy do pmtool:
/*
Username: playwright_jaro24
Password: Playwright!2024
URL: https://tredgate.com/pmtool/
*/
import { test } from "@playwright/test";

test("První test", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool/");
  await page.locator("#username").fill("playwright_jaro24");
  await page.locator("#password").fill("Playwright!2024");
});

/*
Cvičení (⌛3:00)
V souboru first_tests.spec.ts vyplň heslo. Selektor použij #password
*/
