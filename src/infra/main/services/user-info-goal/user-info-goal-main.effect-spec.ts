import { test, describe, expect } from 'vitest';
import { userInfoGoalMain } from './user-info-goal-main.effect';
import { gen } from '@shared/generator/generator';
import { reset } from '@__tests__/libs/teardown';

describe('userInfoGoalMain', () => {
  test('findDefaultAll', async () => {
    const response = await userInfoGoalMain.findDefaultAll();

    expect(response).toHaveCode(200000);
  });

  test('createOne', async () => {
    const description = gen.string();

    const response = await userInfoGoalMain.createOne({ description });

    expect(response).toHaveCode(201000);

    await reset();
  });
});
