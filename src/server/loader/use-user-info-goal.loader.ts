import { routeLoader$ } from '@builder.io/qwik-city';
import { userInfoGoalMain } from '~/infra/main/services/user-info-goal/user-info-goal-main.effect';

export const useUserInfoGoal = routeLoader$(async ({ query, redirect }) => {
  try {
    const response = await userInfoGoalMain.findDefaultAll()

    if(response.body.code === 200000) {
      return response.body.data.userInfoGoals
    }
    return []
  } catch(err) {
    return []
  }
});
