import { test, expect } from "@playwright/test";

test("logo cloud renders", async ({ page }) => {
  await page.goto("/");
  const section = page.getByTestId('logo-cloud');
  await expect(section).toBeVisible();
  const logos = section.locator('svg[role="img"]');
  await expect(logos.first()).toBeVisible();
  const count = await logos.count();
  expect(count).toBeGreaterThanOrEqual(9);
  await expect(section.getByLabel('Stripe')).toBeVisible();
});
