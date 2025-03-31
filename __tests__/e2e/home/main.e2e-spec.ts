import { test, expect } from '@__tests__/playwright/test-base';
import { Helper } from './main.helper';
import { resetPlaywright } from '@__tests__/playwright/reset';
import { guardTest } from '@__tests__/playwright/test-bundle.e2e-spec';

test.describe('guard', () => {
  guardTest.all('/');
});

test.describe('', () => {});
