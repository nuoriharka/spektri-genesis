import { test, expect } from "@playwright/test";

test("logo marquee renders and has many items", async ({ page }) => {
  await page.goto("/");
  const section = page.getByRole('region', { name: 'Luotettu kumppaneiden toimesta' });
  await expect(section).toBeVisible();
  const items = section.locator('a[rel="noreferrer"]');
  await expect(items.first()).toBeVisible();
  const count = await items.count();
  expect(count).toBeGreaterThanOrEqual(10);
});
