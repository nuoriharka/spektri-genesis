import { test, expect } from "@playwright/test";

test("landing renders hero, problems, and end cta", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sinulla on idea');
  await expect(page.getByText('Ei luottokorttia, ei sitoumuksia.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Katso 60 sekunnin demo' })).toBeVisible();
  // Problems section: check at least one 'Ratkaistu.' badge exists
  const solvedBadges = page.getByText('Ratkaistu.', { exact: true });
  await expect(solvedBadges.first()).toBeVisible();
  // End CTA present
  await expect(page.getByRole('button', { name: 'Katso 60s demo' })).toBeVisible();
});
