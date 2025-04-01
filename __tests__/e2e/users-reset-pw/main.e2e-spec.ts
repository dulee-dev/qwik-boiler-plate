import { test, expect } from '@__tests__/playwright/test-base';
import { Helper } from './main.helper';
import { resetPlaywright } from '@__tests__/playwright/reset';
import { guardTest } from '@__tests__/playwright/test-bundle.e2e-spec';
import { v4 } from 'uuid';
import { resetPwCodeFixtures } from '@shared/fixtures/db/reset-pw-code.fixture';

test.describe('guard', () => {
  guardTest.public('/users/reset-pw/');
});

test.describe('validation', () => {
  test('pw', async ({ page, context }) => {
    const code = v4();
    const pw = '123';

    const helper = new Helper(page, context);
    await helper.gotoTargetPage(code);
    await helper.getPw.fill(pw);

    await expect(
      page.getByText('Include a letter, number, and symbol.')
    ).toBeVisible();
    await expect(
      page.getByText('Password must be 8-20 characters long.')
    ).toBeVisible();
    await expect(page.getByText('Passwords do not match.')).toBeVisible();
  });
});

test.describe('submit', () => {
  test('invalid code', async ({ page, context }) => {
    const code = v4();
    const pw = '123123aa!';

    const helper = new Helper(page, context);
    await helper.gotoTargetPage(code);
    await helper.getPw.fill(pw);
    await helper.getPwConfirm.fill(pw);

    await helper.getSubmit.click();
    await expect(page.getByText('Invalid access.')).toBeVisible();
  });

  test('ok', async ({ page, context }) => {
    const resetPwCode = resetPwCodeFixtures[0];
    const pw = '123123aa!';

    const helper = new Helper(page, context);
    await helper.gotoTargetPage(resetPwCode.id);
    await helper.getPw.fill(pw);
    await helper.getPwConfirm.fill(pw);

    await helper.getSubmit.click();
    await expect(page).toHaveURL('/users/sign-in/?msg=reset-pw');
    await expect(
      page.getByText('You can now sign in with your new password.')
    ).toBeVisible();

    await resetPlaywright();
  });
});
