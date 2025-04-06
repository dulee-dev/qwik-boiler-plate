import { test, describe, expect } from 'vitest';
import { googleOAuth } from './oauth-main.effect';
import { gen } from '@shared/generator/generator';

describe('googleOAuth', () => {
  test('certify', async () => {
    const token = gen.string({ charset: ['en'], len: 30 });
    const response = await googleOAuth.certify(token);

    expect(response).toHaveCode(400001);
  });
});
