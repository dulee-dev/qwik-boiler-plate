import { test, expect } from '@__tests__/playwright/test-base';
import { Helper } from './helper';
import { resetPlaywright } from '@__tests__/playwright/reset';
import { guardTest } from '@__tests__/playwright/test-bundle.e2e-spec';
import { userBotFixtures } from '@shared/fixtures/db/user.fixture';
import { gen } from '@shared/generator/generator';

test.describe('guard', () => {
  guardTest.public('/users/sign-up/');
});

test.describe('users-sign-up', () => {
  test.describe('validation', () => {
    test('if email invalid', async ({ page, context }) => {
      const helper = new Helper(page, context);

      await helper.gotoTargetPage();
      await helper.getEmailInput.fill('asdf');

      await expect(
        page.getByText('Please enter a valid email address.')
      ).toBeVisible();
    });

    test('if email duplicated (case insensitive)', async ({
      page,
      context,
    }) => {
      const user = userBotFixtures[0];

      const helper = new Helper(page, context);

      await helper.gotoTargetPage();
      await helper.getEmailInput.fill(user.email.toUpperCase());

      await expect(
        page.getByText('This email is already in use.')
      ).toBeVisible();
    });
  });

  test('submit', async ({ page, context }) => {
    const email = gen.string({ charset: ['en'] }) + '@duleelab.com';
    const helper = new Helper(page, context);

    await helper.gotoTargetPage();
    await helper.getEmailInput.fill(email);

    await helper.getSubmit.click();

    await expect(page).toHaveURL(`/users/sign-up/check-email/?email=${email}/`);

    await resetPlaywright();
  });
});
