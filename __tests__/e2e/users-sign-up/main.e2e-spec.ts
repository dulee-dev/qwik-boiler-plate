import { test, expect } from '@__tests__/playwright/test-base';
import { Helper } from './helper';
import { resetPlaywright } from '@__tests__/playwright/reset';
import { guardTest } from '@__tests__/playwright/test-bundle.e2e-spec';
import { userBotFixtures } from '@shared/fixtures/db/user.fixture';

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

    test('if pw invalid', async ({ page, context }) => {
      const helper = new Helper(page, context);

      await helper.gotoTargetPage();
      await helper.getPwInput.fill('123');

      await expect(
        page.getByText('Include a letter, number, and symbol.')
      ).toBeVisible();
      await expect(
        page.getByText('Password must be 8-20 characters long.')
      ).toBeVisible();
      await expect(page.getByText('Passwords do not match.')).toBeVisible();
    });
  });

  test('submit', async ({ page, context }) => {
    const helper = new Helper(page, context);

    await helper.gotoTargetPage();
    await helper.getEmailInput.fill('asddasf@duleelab.com');
    await helper.getPwInput.fill('123123aa!');
    await helper.getPwConfirmInput.fill('123123aa!');

    await helper.getSubmit.click();

    await expect(page).toHaveURL('/console/?msg=welcome');
    await expect(page.getByText('welcome!')).toBeVisible();

    await resetPlaywright();
  });
});
