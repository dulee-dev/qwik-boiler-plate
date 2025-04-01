import { describe, test, expect } from 'vitest';
import { userMain } from './user-main.effect';
import { userBotFixtures } from '@shared/fixtures/db/user.fixture';
import { gen } from '@shared/generator/generator';
import { accessTokenFixtures } from '@shared/fixtures/access-token.fixture';
import { reset } from '@__tests__/libs/teardown';
import { signUpCodeFixtures } from '@shared/fixtures/db/sign-up-code.fixture';

describe('userMain', () => {
  describe('findAllUsers', () => {
    test('if ok, [200000]', async () => {
      const user = userBotFixtures[0];
      const response = await userMain.findAllUsers({ email: user.email });

      expect(response).toHaveCode(200000);
    });
  });

  describe('signUp', () => {
    test('if ok, [201000]', async () => {
      const signUpCode = signUpCodeFixtures[0];
      const email = signUpCode.email;
      const pw = '123123aa!';
      const signUpCodeId = signUpCode.id;
      const marketing = true;
      const response = await userMain.signUp({
        email,
        pw,
        signUpCodeId,
        marketing,
      });

      expect(response).toHaveCode(201000);
      await reset();
    });
  });

  describe('signIn', () => {
    test('if ok, [201000]', async () => {
      const req = {
        email: userBotFixtures[0].email,
        pw: '123123aa!',
      };
      const response = await userMain.signIn(req);

      expect(response).toHaveCode(201000);

      await reset();
    });
  });

  describe('findMe', () => {
    test('if sign-in and ok, [200000]', async () => {
      const accessToken = accessTokenFixtures[0];

      const response = await userMain.findMe(accessToken);
      expect(response).toHaveCode(200000);
    });
  });

  describe('updatePw', () => {
    test('if invalid code, validation error in "code"', async () => {
      const code = gen.string({ charset: ['en', '123'] });
      const pw = '123123aa!';
      const response = await userMain.updatePw({ code, pw });

      expect(response).toBeValidationErrorIn('code');
    });
  });

  describe('signOut', () => {
    test('if ok, [201000]', async () => {
      const accessToken = accessTokenFixtures[0];

      const response = await userMain.signOut(accessToken);

      expect(response).toHaveCode(201000);

      await reset();
    });
  });

  describe('deleteMe', () => {
    test('if pw is not matched, [400001]', async () => {
      const user = userBotFixtures[0];
      const pw = '123123aa!';
      const wrongPw = gen.user.pw();

      const {
        body: {
          data: { accessToken },
        },
      } = await userMain.signIn({ email: user.email, pw });

      const response = await userMain.deleteMe(accessToken, wrongPw);

      expect(response).toHaveCode(400001);
    });
  });

  describe('findOneById', () => {
    test('if exist user, [200000] get user', async () => {
      const user = userBotFixtures[0];

      const response = await userMain.findOneById(user.id);

      expect(response).toHaveCode(200000);
      expect(response.body.data.user).toEqual(user);
    });
  });
});
