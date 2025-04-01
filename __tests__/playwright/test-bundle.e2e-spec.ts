import { BaseHelper } from './base-helper';
import { test, expect } from '@playwright/test';
import { accessTokenFixtures } from '@shared/fixtures/access-token.fixture';
import { userBotFixtures } from '@shared/fixtures/db/user.fixture';

export const guardTest = {
  public(goto: string, url = /^http:\/\/localhost:5173\/console\/$/) {
    test(`if sign-in user, redirect to ${url}`, async ({ page, context }) => {
      const accessToken = accessTokenFixtures[0];

      const helper = new BaseHelper(page, context);
      await helper.signInWithAccessToken(accessToken);

      await page.goto(goto);

      await expect(page).toHaveURL(url);
    });

    test(`if not sign-in user, can access to public page`, async ({ page }) => {
      await page.goto(goto);

      await expect(page).toHaveURL(goto);
    });
  },

  private(
    goto: string,
    url = /^http:\/\/localhost:5173\/users\/sign-in\/\?msg=unauthorized\/?$/
  ) {
    test(`if sign-in user, can access to private page`, async ({
      page,
      context,
    }) => {
      const accessToken = accessTokenFixtures[0];

      const helper = new BaseHelper(page, context);
      await helper.signInWithAccessToken(accessToken);

      await page.goto(goto);

      await expect(page).toHaveURL(goto);
    });

    test(`if not sign-in user, redirect to ${url}`, async ({ page }) => {
      await page.goto(goto);

      await expect(page).toHaveURL(url);
    });
  },

  all(goto: string, menu = true) {
    test(
      `if not sign-in user, can access to open page` + menu
        ? ' and "sign-in" link'
        : '',
      async ({ page }) => {
        await page.goto(goto);

        await expect(page).toHaveURL(goto);
        if (menu)
          await expect(
            page.getByRole('link', { name: 'sign-in' })
          ).toBeVisible();
      }
    );

    test(
      `if sign-in user, can access to open page` + menu
        ? ' and find user.email'
        : '',
      async ({ page, context }) => {
        const accessToken = accessTokenFixtures[0];
        const user = userBotFixtures[0];

        const helper = new BaseHelper(page, context);
        await helper.signInWithAccessToken(accessToken);

        await page.goto(goto);

        await expect(page).toHaveURL(goto);
        if (menu)
          await expect(
            page.getByRole('link', { name: user.email })
          ).toBeVisible();
      }
    );
  },
};
