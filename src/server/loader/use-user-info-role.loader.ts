import { routeLoader$ } from '@builder.io/qwik-city';
import { userInfoRoleMain } from '~/infra/main/services/user-info-role/user-info-role-main.effect';

export const useUserInfoRole = routeLoader$(async ({ query, redirect }) => {
  try {
    const response = await userInfoRoleMain.findDefaultAll()

    if(response.body.code === 200000) {
      return response.body.data.userInfoRoles
    }
    return []
  } catch(err) {
    return []
  }
});
