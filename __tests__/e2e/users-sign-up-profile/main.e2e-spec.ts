import { test, expect } from '@__tests__/playwright/test-base';
import { Helper } from './helper';
import { resetPlaywright } from '@__tests__/playwright/reset';
import { guardTest } from '@__tests__/playwright/test-bundle.e2e-spec';
import { signUpCodeFixtures } from '@shared/fixtures/db/sign-up-code.fixture';
import { gen } from '@shared/generator/generator';

test.describe('guard', () => {
  const signUpCode = signUpCodeFixtures[0];
  const url = `/users/sign-up/profile/?code=${signUpCode.id}`;
  guardTest.public(url);
});

test.describe('users-sign-up', () => {
  test.describe('validation', () => {
    test('if pw invalid', async ({ page, context }) => {
      const signUpCode = signUpCodeFixtures[0];

      const helper = new Helper(page, context);
      await helper.gotoTargetPage(signUpCode.id);
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
    const signUpCode = signUpCodeFixtures[0];
    const pw = '123123aa!';
    const companyName = gen.string({ charset: ['en'] });
    const companyUrl = gen.string({ charset: ['en'] });

    const helper = new Helper(page, context);
    await helper.gotoTargetPage(signUpCode.id);
    await expect(helper.getEmailInput).toHaveValue(signUpCode.email);
    await helper.getPwInput.fill(pw);
    await helper.getPwConfirmInput.fill(pw);
    await helper.getCompanyName.fill(companyName);
    await helper.getCompanyUrl.fill(companyUrl);
    await page.getByLabel('2 ~ 10').click();
    await page.getByLabel('founder').click();
    await page.getByLabel('faq').click();
    await helper.getMarketingInput.click();

    await helper.getSubmit.click();

    await expect(page).toHaveURL('/console/?msg=welcome');

    await resetPlaywright();
  });
});
