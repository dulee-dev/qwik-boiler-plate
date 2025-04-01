import { routeLoader$ } from '@builder.io/qwik-city';
import { User } from '@shared/domains/user/user.entity';
import { USER_KEY } from '~/server/constants';

export const useAuthUser = routeLoader$(async ({ sharedMap }) => {
  const user: User | undefined = sharedMap.get(USER_KEY);
  return user;
});
