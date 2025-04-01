import { test, expect } from '@__tests__/playwright/test-base';
import { Helper } from './main.helper';
import { guardTest } from '@__tests__/playwright/test-bundle.e2e-spec';
import { gen } from '@shared/generator/generator';

test.describe('guard', () => {
  const email = gen.email();
  const url = `/users/sign-up/check-email/?email=${email}/`;
  guardTest.public(url);
});

test('check email', async ({ page, context }) => {
  const email = gen.email();

  const helper = new Helper(page, context);
  await helper.gotoTargetPage(email);
  await expect(page.getByText(email)).toBeVisible();
});
