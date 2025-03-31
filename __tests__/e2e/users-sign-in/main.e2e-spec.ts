import { test, expect } from '@__tests__/playwright/test-base';
import { Helper } from './main.helper';
import { resetPlaywright } from '@__tests__/playwright/reset';
import { guardTest } from '@__tests__/playwright/test-bundle.e2e-spec';
import { gen } from '@shared/generator/generator';
import { userBotFixtures } from '@shared/fixtures/db/user.fixture';

test.describe('guard', async () => {
  guardTest.public('/users/sign-in/');
});

test.describe('validation', () => {
  test.describe('email', () => {
    test('if not email, show email invalid error', async ({
      page,
      context,
    }) => {
      const email = gen.string();

      const helper = new Helper(page, context);

      await helper.gotoTargetPage();
      await helper.getEmailInput.fill(email);

      await expect(
        page.getByText('Please enter a valid email address.')
      ).toBeVisible();
    });
  });
});

test.describe('submit', () => {
  test('if fail', async ({ page, context }) => {
    const user = userBotFixtures[0];
    const pw = 'aaaa123123!';

    const helper = new Helper(page, context);

    await helper.gotoTargetPage();
    await helper.getEmailInput.fill(user.email);
    await helper.getPwInput.fill(pw);
    await helper.getSubmit.click();

    await expect(page.getByText('Incorrect email or password.')).toBeVisible();
  });

  test('if ok', async ({ page, context }) => {
    const user = userBotFixtures[0];
    const pw = '123123aa!';

    const helper = new Helper(page, context);

    await helper.gotoTargetPage();
    await helper.getEmailInput.fill(user.email);
    await helper.getPwInput.fill(pw);
    await helper.getSubmit.click();

    await expect(page).toHaveURL('/console/?msg=welcome');
    await expect(page.getByText('Welcome!')).toBeVisible();

    await resetPlaywright();
  });
});
