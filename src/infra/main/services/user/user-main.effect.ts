import { User } from '@shared/domains/user/user.entity';
import { api } from '../../libs/api';
import { ResponseBody } from '../../libs/main.type';
import { UserInfo } from '@shared/domains/user-info/user-info.entity';

export const userMain = {
  async findAllUsers({
    email,
    nickname,
  }: {
    email?: string;
    nickname?: string;
  }) {
    return await api.get<
      ResponseBody<{
        users: Omit<User, 'id'>[];
      }>,
      {
        email?: string;
        nickname?: string;
      }
    >({
      relativePath: '/users',
      query: {
        email,
        nickname,
      },
    });
  },

  async signUp({
    email,
    pw,
    signUpCodeId,
    marketing,
  }: {
    email: string;
    pw: string;
    signUpCodeId: string;
    marketing: boolean;
  }) {
    return api.post<
      | ResponseBody<
          {
            user: User & { userInfo: UserInfo };
          },
          201000
        >
      | ResponseBody<void, 400001>
      | ResponseBody<void, 400000>
    >({
      relativePath: '/users',
      body: {
        email,
        pw,
        signUpCodeId,
        marketing,
      },
    });
  },

  async signIn({ email, pw }: { email: string; pw: string }) {
    return api.post<
      ResponseBody<
        {
          accessToken: string;
          refreshToken: string;
        },
        201000
      >
    >({
      relativePath: '/users/sign-in',
      body: {
        email,
        pw,
      },
    });
  },

  async findMe(accessToken: string) {
    return await api.get<
      ResponseBody<{
        user: User;
      }>
    >({
      relativePath: '/users/me',
      headers: {
        authorization: accessToken,
      },
    });
  },

  async updatePw({ code, pw }: { code: string; pw: string }) {
    return await api.patch<ResponseBody>({
      relativePath: '/users/me/pw',
      body: {
        code,
        pw,
      },
    });
  },

  async signOut(accessToken: string) {
    return await api.post<ResponseBody>({
      relativePath: '/users/sign-out',
      headers: {
        authorization: accessToken,
      },
    });
  },

  async deleteMe(accessToken: string, pw: string) {
    return await api.delete<ResponseBody>({
      relativePath: '/users/me',
      headers: {
        authorization: accessToken,
      },
      body: { pw },
    });
  },

  async findOneById(id: string) {
    return await api.get<ResponseBody<{ user: User }>>({
      relativePath: '/users',
      additionalPath: '/' + id,
    });
  },
};
