import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page } from '@playwright/test';

export class Helper extends BaseHelper {
  readonly getEmailInput: Locator;
  readonly getPwInput: Locator;
  readonly getPwConfirmInput: Locator;
  readonly getCompanyName: Locator;
  readonly getCompanyUrl: Locator;
  readonly getMarketingInput: Locator;
  readonly getSubmit: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.getEmailInput = this.page.getByLabel('email', { exact: true });
    this.getPwInput = this.page.getByLabel('password', { exact: true });
    this.getPwConfirmInput = this.page.getByLabel('pwConfirm');
    this.getCompanyName = this.page.getByLabel('company name');
    this.getCompanyUrl = this.page.getByLabel('company url');
    this.getMarketingInput = this.page.getByLabel('promotional emails');
    this.getSubmit = this.page.getByRole('button', { name: 'Create Account' });
  }

  async gotoTargetPage(code: string) {
    await this.page.goto(`/users/sign-up/profile/?code=${code}`);
  }
}
