import { test, expect } from '@__tests__/playwright/test-base';
import { Helper } from './main.helper';
import { resetPlaywright } from '@__tests__/playwright/reset';
import { guardTest } from '@__tests__/playwright/test-bundle.e2e-spec';
import { gen } from '@shared/generator/generator';
import { userBotFixtures } from '@shared/fixtures/db/user.fixture';

test.describe('guard', () => {
  guardTest.public('/users/find-pw/');
});

test.describe('validation', () => {
  test('email', async ({ page, context }) => {
    const invalidEmail = gen.string();

    const helper = new Helper(page, context);
    await helper.gotoTargetPage();

    await helper.getEmailInput.fill(invalidEmail);
    await expect(
      page.getByText('Please enter a valid email address.')
    ).toBeVisible();
  });
});

test.describe('submit', () => {
  test('if not exist email', async ({ page, context }) => {
    const email = gen.email();

    const helper = new Helper(page, context);
    await helper.gotoTargetPage();
    await helper.getEmailInput.fill(email);
    await helper.getSubmit.click();
    await expect(
      page.getByText('We couldn`t find an account with that email.')
    ).toBeVisible();
  });

  test('if ok', async ({ page, context }) => {
    const user = userBotFixtures[0];

    const helper = new Helper(page, context);
    await helper.gotoTargetPage();
    await helper.getEmailInput.fill(user.email);
    await helper.getSubmit.click();
    await expect(page).toHaveURL(
      `/users/find-pw/success/?email=${user.email}/`
    );

    await resetPlaywright();
  });
});
