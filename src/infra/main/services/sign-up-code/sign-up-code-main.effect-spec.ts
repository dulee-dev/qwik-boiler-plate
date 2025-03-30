import { describe, test, expect } from 'vitest';
import { signUpCodeMain } from './sign-up-code-main.effect';
import { gen } from '@shared/generator/generator';
import { signUpCodeFixtures } from '@shared/fixtures/db/sign-up-code.fixture';

describe('signUpCodeMain', () => {
  describe('createOne', () => {
    test('if ok, [201000]', async () => {
      const email = gen.string({ charset: ['en', '123'] }) + '@duleelab.com';
      const response = await signUpCodeMain.createOne(email);

      expect(response).toHaveCode(201000);
    });
  });

  describe('findOneById', () => {
    test('if ok, [200000]', async () => {
      const signUpCode = signUpCodeFixtures[0];

      const response = await signUpCodeMain.findOneById(signUpCode.id);

      expect(response).toHaveCode(200000);
    });
  });
});
