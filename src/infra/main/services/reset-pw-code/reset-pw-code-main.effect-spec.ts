import { expect, test, describe } from 'vitest';
import { resetPwCodeMain } from './reset-pw-code-main.effect';
import { v4 } from 'uuid';
import { accessTokenFixtures } from '@shared/fixtures/access-token.fixture';
import { gen } from '@shared/generator/generator';
import { resetPwCodeFixtures } from '@shared/fixtures/db/reset-pw-code.fixture';
import { reset } from '@__tests__/libs/teardown';

describe('resetPwCodeMain', () => {
  describe('createOneByMe', () => {
    test('auth error, statusCode 401', async () => {
      const response = await resetPwCodeMain.createOneByMe('', {
        pw: '123123aa!',
      });

      expect(response).toHaveCode(401000);
    });

    test('if pw not matched, statusCode 400', async () => {
      const accessToken = accessTokenFixtures[0];

      const response = await resetPwCodeMain.createOneByMe(accessToken, {
        pw: '!aa123123',
      });

      expect(response).toHaveCode(400001);
    });

    test('if pw matched, statusCode 201 & return code', async () => {
      const accessToken = accessTokenFixtures[0];

      const response = await resetPwCodeMain.createOneByMe(accessToken, {
        pw: '123123aa!',
      });

      expect(response).toHaveCode(201000);

      await reset();
    });
  });

  describe('createOneByEmail', () => {
    const validEmail = 'dulee.dev@gmail.com';

    test('if user not found with email, statusCode 400', async () => {
      const email = gen.email();

      const response = await resetPwCodeMain.createOneByEmail(email);

      expect(response).toHaveCode(400001);
    });

    test('if user found with email, statusCode 201 return undefined', async () => {
      const response = await resetPwCodeMain.createOneByEmail(validEmail);

      expect(response).toHaveCode(201000);
      await reset();
    });

    test.skip(`you should check your email ${validEmail}`, () => {});
  });

  describe('verifyOne', () => {
    test('if not exist id, return statusCode 404', async () => {
      const code = v4();
      const response = await resetPwCodeMain.verifyOne(code);

      expect(response).toHaveCode(404000);
    });

    test('if expired , return statusCode 404', async () => {
      const code = resetPwCodeFixtures[2].id;
      const response = await resetPwCodeMain.verifyOne(code);

      expect(response).toHaveCode(404001);
    });

    test('if used code, return statusCode 404', async () => {
      const code = resetPwCodeFixtures[1].id;
      const response = await resetPwCodeMain.verifyOne(code);

      expect(response).toHaveCode(404000);
    });

    test('if valid code, return void, statusCode 200', async () => {
      const code = resetPwCodeFixtures[0].id;
      const response = await resetPwCodeMain.verifyOne(code);

      expect(response).toHaveCode(200000);
      await reset();
    });
  });
});
