import { server$, type Cookie } from '@builder.io/qwik-city';
import { userMain } from '~/infra/main/services/user/user-main.effect';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const accessTokenHandler = {
  setCookie(cookie: Cookie, token: string) {
    cookie.set(ACCESS_TOKEN_KEY, token, {
      maxAge: [2, 'hours'],
      path: '/',
    });
  },

  getCookie(cookie: Cookie) {
    return cookie.get(ACCESS_TOKEN_KEY)?.value;
  },

  deleteCookie(cookie: Cookie) {
    cookie.delete(ACCESS_TOKEN_KEY, { path: '/' });
    return;
  },
};

export const refreshTokenHandler = {
  setCookie(cookie: Cookie, token: string) {
    cookie.set(REFRESH_TOKEN_KEY, token, {
      maxAge: [14, 'days'],
      path: '/',
    });
  },

  getCookie(cookie: Cookie) {
    return cookie.get(REFRESH_TOKEN_KEY)?.value;
  },

  deleteCookie(cookie: Cookie) {
    cookie.delete(REFRESH_TOKEN_KEY, { path: '/' });
    return;
  },
};

export const signIn = server$(async function ({
  email,
  pw,
}: {
  email: string;
  pw: string;
}) {
  const { cookie } = this;
  const response = await userMain.signIn({
    email,
    pw,
  });
  const { accessToken, refreshToken } = response.body.data;
  accessTokenHandler.setCookie(cookie, accessToken);
  refreshTokenHandler.setCookie(cookie, refreshToken);
  return;
});

export const signOut = server$(async function () {
  const { cookie } = this;
  const accessToken = accessTokenHandler.getCookie(cookie);
  if (accessToken) {
    await userMain.signOut(accessToken);
  }

  accessTokenHandler.deleteCookie(cookie);
  refreshTokenHandler.deleteCookie(cookie);
});