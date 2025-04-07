import { test, describe, expect } from 'vitest';
import { googleOAuthMain } from './oauth-main.effect';
import { gen } from '@shared/generator/generator';
import { companySizeFixtures } from '@shared/fixtures/db/company-size.fixture';
import { userInfoRoleFixtures } from '@shared/fixtures/db/user-info-role.fixture';
import { userInfoGoalFixtures } from '@shared/fixtures/db/user-info-goal.fixture';

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

  describe('signUp', () => {
    test('if ok, [201000]', async () => {
      const email = gen.email();
      const idToken = gen.string({ charset: ['en'] });
      const marketingApproval = true;
      const companyName = 'companyName';
      const companyUrl = 'companyUrl';
      const companySizeId = companySizeFixtures[0].id;
      const roleId = userInfoRoleFixtures[0].id;
      const goalId = userInfoGoalFixtures[0].id;
      const response = await googleOAuthMain.signUp({
        email,
        idToken,
        marketingApproval,
        companyName,
        companyUrl,
        companySizeId,
        roleId,
        goalId,
      });

      expect(response).toHaveCode(401000);
    });
  });
});
