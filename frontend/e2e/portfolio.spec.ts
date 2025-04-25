import { expect, test } from "@playwright/test";

test.describe("Portfolio Page", () => {
  test.beforeEach(async ({ page }) => {
    const email = "test@email.com";
    const password = "password123";

    await page.goto("http://localhost:3000/login");
    await page.fill('input[id="email"]', email);
    await page.fill('input[id="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page.locator(".success-msg")).toHaveText("Login successful");
    await page.locator("span", { hasText: "Portfolio" }).click();
    await expect(page.url()).toContain("portfolio");
  });

  test("able to view portfolio", async ({ page }) => {
    await expect(page.locator("body")).toContainText(
      "Nikko AM Global Umbrella Trust"
    );
  });

  test("able to switch currency", async ({ page }) => {
    await page.click(".currency-toggle");
    await page.click(".USD");
    await expect(page.locator("body")).toContainText("US$9,894.60");

    await page.click(".currency-toggle");
    await page.click(".JPY");
    await expect(page.locator("body")).toContainText("¥1,434,000.00");

    await page.click(".currency-toggle");
    await page.click(".SGD");
    await expect(page.locator("body")).toContainText("S$13,049.40");

    await page.click(".currency-toggle");
    await page.click(".quantity");
    await expect(page.locator("body")).toContainText("1,000");
  });

  test("able to view chart", async ({ page }) => {
    await expect(page.locator("body")).toContainText(
      "Fidelity Nikko Glbl Sel Japan AdvtgA Inc"
    );
    await expect(page.locator("body")).toContainText(": 16.4 %");
  });
});
