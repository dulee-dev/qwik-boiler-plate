import { test, describe, expect } from 'vitest';
import { userInfoRoleMain } from './user-info-role-main.effect';
import { gen } from '@shared/generator/generator';
import { reset } from '@__tests__/libs/teardown';

describe('userInfoRoleMain', () => {
  test('findDefaultAll', async () => {
    const response = await userInfoRoleMain.findDefaultAll();

    expect(response).toHaveCode(200000);
  });

  test('createOne', async () => {
    const description = gen.string();

    const response = await userInfoRoleMain.createOne({ description });

    expect(response).toHaveCode(201000);

    await reset();
  });
});
