import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page } from '@playwright/test';

export class Helper extends BaseHelper {
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  async gotoTargetPage(msg?: string) {
    let url = '/console';
    if (msg) url += `/?msg=${msg}`;
    await this.page.goto(url);
  }
}
