import type { Locator, Page, BrowserContext } from '@playwright/test';
import { expect } from '@playwright/test';

export const mapAccessTokenToCookie = (accessToken: string) => ({
  name: 'accessToken',
  value: accessToken,
  path: '/',
  domain: 'localhost',
});

export const getUuidsFromUrl = (url: string): string[] => {
  const uuidRegexpGlobal =
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;

  const ids = [...url.matchAll(uuidRegexpGlobal)].map((c) => c[0]);

  return ids;
};

export class BaseHelper {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly baseUrl = process.env.PUBLIC_WEB_BASE_URL;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  async signInWithAccessToken(accessToken: string) {
    await this.context.addCookies([mapAccessTokenToCookie(accessToken)]);
  }

  getUuidsFromUrl() {
    const url = this.page.url();
    return getUuidsFromUrl(url);
  }

  async haveStrictUrl(url: string) {
    const reg = new RegExp(`^${this.baseUrl}${url}$`);

    await expect(this.page).toHaveURL(reg);
  }

  async retryAssertion(
    fn: () => Promise<void>,
    options?: { timeout?: number }
  ) {
    const timeout = options?.timeout ?? 5000;

    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      try {
        await fn();
        return;
      } catch (error) {}
    }
  }

  async retryAssertionWithKeyboardEvent(
    locator: Locator,
    assertionFn: () => Promise<void>,
    options?: { timeout?: number; key?: string }
  ) {
    const key = 'Shift';
    const assertionOptions = {
      timeout: options?.timeout,
    };

    const fn = async () => {
      await locator.press(key);
      await assertionFn();
    };
    await this.retryAssertion(fn, assertionOptions);
  }
}
