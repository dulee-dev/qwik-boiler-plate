import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page } from '@playwright/test';

export class Helper extends BaseHelper {
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  async gotoTargetPage(email: string) {
    await this.page.goto(`/users/find-pw/success/?email=${email}`);
  }
}
