import { type Cookie } from '@builder.io/qwik-city';
import type { ResponseBody } from './main.type';
import { api } from './api';
import {
  accessTokenHandler,
  refreshTokenHandler,
} from '~/server/auth/auth.effect';

interface ResponseBase<
  T = void,
  K extends number = number,
  L extends string = string,
> {
  body: ResponseBody<T, K, L>;
  statusCode: number;
}

export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Authorization Error';
  }
}

export async function apiAuth<T extends ResponseBase>(
  cookie: Cookie,
  targetApi: (accessToken: string) => Promise<T>
): Promise<T>;

export async function apiAuth<T extends ResponseBase, M = void>(
  cookie: Cookie,
  targetApi: (accessToken: string, props: M) => Promise<T>,
  props: M
): Promise<T>;

export async function apiAuth<T extends ResponseBase, M = void>(
  cookie: Cookie,
  targetApi: (accessToken: string, props?: M) => Promise<T>,
  props?: M
): Promise<T | ResponseBase<void, 401000>> {
  if (!props) {
    const accessToken = accessTokenHandler.getCookie(cookie);

    if (accessToken) {
      const result = await targetApi(accessToken);
      if (result.body.code !== 401000) {
        return result;
      } else {
        accessTokenHandler.deleteCookie(cookie);
      }
    }

    const refreshToken = refreshTokenHandler.getCookie(cookie);
    if (refreshToken) {
      const refreshResponse = await api.post<
        | ResponseBody<
            {
              accessToken: string;
              refreshToken: string;
            },
            201000
          >
        | ResponseBody<void, 401000>
      >({
        relativePath: '/users/refresh-tokens',
        headers: {
          refreshtoken: refreshToken,
        },
      });
      if (refreshResponse.body.code !== 201000) {
        refreshTokenHandler.deleteCookie(cookie);
        throw new AuthorizationError('refresh token is invalid');
      }

      accessTokenHandler.setCookie(
        cookie,
        refreshResponse.body.data.accessToken
      );
      refreshTokenHandler.setCookie(
        cookie,
        refreshResponse.body.data.refreshToken
      );

      return await targetApi(refreshResponse.body.data.accessToken);
    }

    throw new AuthorizationError('no both tokens');
  }
  const accessToken = accessTokenHandler.getCookie(cookie);

  if (accessToken) {
    const result = await targetApi(accessToken, props);

    if (result.body.code !== 401000) {
      return result;
    } else {
      accessTokenHandler.deleteCookie(cookie);
    }
  }

  const refreshToken = refreshTokenHandler.getCookie(cookie);
  if (refreshToken) {
    const refreshResponse = await api.post<
      ResponseBody<{
        accessToken: string;
        refreshToken: string;
      }>
    >({
      relativePath: '/users/refresh-tokens',
      headers: {
        refreshtoken: refreshToken,
      },
    });
    if (refreshResponse.statusCode !== 201) {
      refreshTokenHandler.deleteCookie(cookie);
      throw new AuthorizationError('refresh token is invalid');
    }

    accessTokenHandler.setCookie(cookie, refreshResponse.body.data.accessToken);
    refreshTokenHandler.setCookie(
      cookie,
      refreshResponse.body.data.refreshToken
    );

    return await targetApi(refreshResponse.body.data.accessToken, props);
  }

  throw new AuthorizationError('no both tokens');
}

export async function apiOptionalAuth<K extends ResponseBase>(
  cookie: Cookie,
  targetApi: (accessToken?: string) => Promise<K>
): Promise<K>;

export async function apiOptionalAuth<K extends ResponseBase, T = void>(
  cookie: Cookie,
  targetApi: (props: T, accessToken?: string) => Promise<K>,
  props: T
): Promise<K>;

export async function apiOptionalAuth<K extends ResponseBase, T = void>(
  cookie: Cookie,
  targetApi: any,
  props?: T
): Promise<K> {
  if (!props) {
    try {
      const accessToken = accessTokenHandler.getCookie(cookie);

      if (accessToken) {
        const result = await targetApi(accessToken);
        if (result.statusCode !== 401) {
          return result;
        } else {
          accessTokenHandler.deleteCookie(cookie);
        }
      }

      const refreshToken = refreshTokenHandler.getCookie(cookie);
      if (refreshToken) {
        const refreshResponse = await api.post<
          ResponseBody<{
            accessToken: string;
            refreshToken: string;
          }>
        >({
          relativePath: '/users/refresh-tokens',
          headers: {
            refreshtoken: refreshToken,
          },
        });
        if (refreshResponse.statusCode !== 201) {
          refreshTokenHandler.deleteCookie(cookie);
          throw new AuthorizationError('refresh token is invalid');
        }

        accessTokenHandler.setCookie(
          cookie,
          refreshResponse.body.data.accessToken
        );
        refreshTokenHandler.setCookie(
          cookie,
          refreshResponse.body.data.refreshToken
        );

        return await targetApi(refreshResponse.body.data.accessToken);
      }

      throw new AuthorizationError('no both tokens');
    } catch (err) {
      return await targetApi();
    }
  }

  try {
    const accessToken = accessTokenHandler.getCookie(cookie);

    if (accessToken) {
      const result = await targetApi(props, accessToken);
      if (result.statusCode !== 401) {
        return result;
      } else {
        accessTokenHandler.deleteCookie(cookie);
      }
    }

    const refreshToken = refreshTokenHandler.getCookie(cookie);
    if (refreshToken) {
      const refreshResponse = await api.post<
        ResponseBody<{
          accessToken: string;
          refreshToken: string;
        }>
      >({
        relativePath: '/users/refresh-tokens',
        headers: {
          refreshtoken: refreshToken,
        },
      });
      if (refreshResponse.statusCode !== 201) {
        refreshTokenHandler.deleteCookie(cookie);
        throw new AuthorizationError('refresh token is invalid');
      }

      accessTokenHandler.setCookie(
        cookie,
        refreshResponse.body.data.accessToken
      );
      refreshTokenHandler.setCookie(
        cookie,
        refreshResponse.body.data.refreshToken
      );

      return await targetApi(props, refreshResponse.body.data.accessToken);
    }

    throw new AuthorizationError('no both tokens');
  } catch (err) {
    return await targetApi(props);
  }
}
