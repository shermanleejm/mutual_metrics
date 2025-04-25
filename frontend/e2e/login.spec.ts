import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("able to register", async ({ page }) => {
  const email = faker.internet.email();
  const password = faker.internet.password({
    length: 10,
    pattern: /[a-zA-Z0-9]/,
  });

  await page.goto("http://localhost:3000/login");
  await page.click("text=New user? Register");
  await page.fill('input[id="email"]', email);
  await page.fill('input[id="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForSelector(".success-msg", { timeout: 5000 });
  await expect(page.locator(".success-msg")).toHaveText(
    "Registration successful. Please log in."
  );
  await page.click('button[type="submit"]');
  await expect(page.locator("body")).toContainText("Welcome to Mutual Metrics");
});

test("able to logout", async ({ page }) => {
  const email = "test@email.com";
  const password = "password123";

  await page.goto("http://localhost:3000/login");
  await page.fill('input[id="email"]', email);
  await page.fill('input[id="password"]', password);
  await page.click('button[type="submit"]');
  await page.click(".logout-button");
  await expect(page.locator("body")).toContainText("Login");
});
