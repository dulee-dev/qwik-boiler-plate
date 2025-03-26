import { test, expect } from '@__tests__/playwright/test-base';

test('homepage has title and links to flower page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Qwik/);
});
