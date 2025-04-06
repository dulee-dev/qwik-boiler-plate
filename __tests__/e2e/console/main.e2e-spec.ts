import { test, expect } from '@__tests__/playwright/test-base';
import { Helper } from './main.helper';
import { guardTest } from '@__tests__/playwright/test-bundle.e2e-spec';
import { accessTokenFixtures } from '@shared/fixtures/access-token.fixture';

test.describe('guard', () => {
  const url = '/console/';
  guardTest.private(url);
});

test.describe('msg', () => {
  test('welcome', async ({ page, context }) => {
    const msg = 'welcome';
    const accessToken = accessTokenFixtures[0];

    const helper = new Helper(page, context);
    await helper.signInWithAccessToken(accessToken);
    await helper.gotoTargetPage(msg);
    await expect(page.getByText('Welcome!')).toBeVisible();
  });
});
