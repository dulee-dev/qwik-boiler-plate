import { test, describe, expect } from 'vitest';
import { companySizeMain } from './company-size-main.effect';

describe('companySizeMain', () => {
  test('findAll', async () => {
    const response = await companySizeMain.findAll();

    expect(response).toHaveCode(200000);
  });
});
