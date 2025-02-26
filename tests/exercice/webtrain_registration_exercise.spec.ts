import { test } from "@playwright/test";
test("Select tests", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");

  await page.locator("#gender").selectOption("female");
  await page.locator("#name").fill("Petr");
  await page.locator("#datepicker").fill("2003-12-31");
  await page.locator("#email").fill("petr@example.com");
  await page.locator("#password").fill("123456");
  await page.locator("#confirm-password").fill("123456");
  await page.locator("#premium").check();
  await page.locator("#age").fill("24");
  await page.locator("#address").fill("Nedám");
  await page.locator("#interests-music").check();
  await page.locator("#newsletter").check();
  await page.locator("#gender").selectOption("female");
  await page.locator('[type="submit"]').click();
});
