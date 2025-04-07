import { test, describe, expect } from 'vitest';
import { googleOAuthMain } from './oauth-main.effect';
import { gen } from '@shared/generator/generator';

describe('googleOAuthMain', () => {
  test('certify', async () => {
    const token = gen.string({ charset: ['en'], len: 30 });
    const response = await googleOAuthMain.certify(token);

    expect(response).toHaveCode(401000);
  });

  test('verify', async () => {
    const token = gen.string({ charset: ['en'], len: 30 });
    const response = await googleOAuthMain.verify(token);

    expect(response).toHaveCode(401000);
  });
});
