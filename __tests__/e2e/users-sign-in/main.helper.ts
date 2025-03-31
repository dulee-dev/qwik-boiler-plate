import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page } from '@playwright/test';

export class Helper extends BaseHelper {
  readonly getEmailInput: Locator;
  readonly getPwInput: Locator;
  readonly getSubmit: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.getEmailInput = this.page.getByLabel('email');
    this.getPwInput = this.page.getByLabel('password');
    this.getSubmit = this.page.getByRole('button', {
      name: 'Sign in',
      exact: true,
    });
  }

  async gotoTargetPage() {
    await this.page.goto('/users/sign-in');
  }
}
