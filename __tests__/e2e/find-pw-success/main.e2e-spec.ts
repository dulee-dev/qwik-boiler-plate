import { test, expect } from '@__tests__/playwright/test-base';
import { Helper } from './main.helper';
import { guardTest } from '@__tests__/playwright/test-bundle.e2e-spec';
import { userBotFixtures } from '@shared/fixtures/db/user.fixture';

test.describe('guard', () => {
  guardTest.public('/users/find-pw/success/');
});

test('get email by query', async ({ page, context }) => {
  const user = userBotFixtures[0];

  const helper = new Helper(page, context);

  await helper.gotoTargetPage(user.email);

  await expect(page.getByText(user.email)).toBeVisible();
});
