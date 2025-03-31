import { test, expect } from '@__tests__/playwright/test-base';
import { Helper } from './__name__.helper';
import { resetPlaywright } from '@__tests__/playwright/reset';
import { guardTest } from '@__tests__/playwright/test-bundle.e2e-spec';

test.describe('guard', () => {
  guardTest.public('url');
});

test.describe('', () => {});
