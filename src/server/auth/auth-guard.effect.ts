import { type Cookie } from '@builder.io/qwik-city';
import { type RedirectMessage } from '@builder.io/qwik-city/middleware/request-handler';
import { apiAuth } from '~/infra/main/libs/api-auth';
import { userMain } from '~/infra/main/services/user/user-main.effect';
import { USER_KEY } from '../constants';

type SharedMap = Map<string, any>;
type RedirectCode = 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308;
type Redirect = (statusCode: RedirectCode, url: string) => RedirectMessage;

const userAlreadySignInError = new Error('user already sign-in');
const userNotSignInError = new Error('user not sign-in');

export const authGuard = {
  async all({ cookie, sharedMap }: { cookie: Cookie; sharedMap: SharedMap }) {
    try {
      const response = await apiAuth(cookie, userMain.findMe);
      if (response.statusCode >= 300) {
        return;
      }
      sharedMap.set(USER_KEY, response.body.data.user);
      return;
    } catch {
      return;
    }
  },

  async private({
    cookie,
    sharedMap,
    redirect,
    redirectUrl,
  }: {
    cookie: Cookie;
    sharedMap: SharedMap;
    redirect: Redirect;
    redirectUrl?: string;
  }) {
    try {
      const response = await apiAuth(cookie, userMain.findMe);

      if (response.statusCode >= 300) {
        throw userNotSignInError;
      }
      sharedMap.set(USER_KEY, response.body.data.user);
      return;
    } catch {
      throw redirect(302, redirectUrl ?? '/users/sign-in/?msg=unauthorized');
    }
  },

  async public({
    cookie,
    redirect,
    redirectUrl,
  }: {
    cookie: Cookie;
    redirect: Redirect;
    redirectUrl?: string;
  }) {
    try {
      const response = await apiAuth(cookie, userMain.findMe);

      if (response.statusCode === 200) {
        throw userAlreadySignInError;
      }

      return;
    } catch (err) {
      if (err === userAlreadySignInError) throw redirect(302, redirectUrl ?? '/console');
      return;
    }
  },
};
