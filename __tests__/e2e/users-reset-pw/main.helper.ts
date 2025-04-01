import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page } from '@playwright/test';

export class Helper extends BaseHelper {
  readonly getPw: Locator;
  readonly getPwConfirm: Locator;
  readonly getSubmit: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.getPw = this.page.getByLabel('new password');
    this.getPwConfirm = this.page.getByLabel('pwConfirm');
    this.getSubmit = this.page.getByRole('button', {
      name: 'Set New Password',
    });
  }

  async gotoTargetPage(code: string) {
    await this.page.goto(`/users/reset-pw/?code=${code}`);
  }
}
