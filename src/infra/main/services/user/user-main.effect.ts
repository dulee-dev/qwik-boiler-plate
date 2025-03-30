import { User } from '@shared/domains/user/user.entity';
import { api } from '../../libs/api';
import { ResponseBody } from '../../libs/main.type';
import { UserEditable } from '@shared/domains/user/types';

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
    imgUrl,
    email,
    nickname,
    pw,
    bio,
    introduction,
    signUpCodeId,
  }: {
    imgUrl: string | null;
    email: string;
    nickname: string;
    pw: string;
    bio: string;
    introduction: string;
    signUpCodeId: string;
  }) {
    return api.post<
      ResponseBody<
        {
          user: User;
        },
        201000
      >
    >({
      relativePath: '/users',
      body: {
        imgUrl,
        email,
        nickname,
        pw,
        bio,
        introduction,
        signUpCodeId,
      },
    });
  },

  async signIn({ email, pw }: { email: string; pw: string }) {
    return api.post<
      ResponseBody<{
        accessToken: string;
        refreshToken: string;
      }>
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

  async updateMe(accessToken: string, partial: UserEditable) {
    return await api.patch<
      ResponseBody<{
        user: User;
      }>
    >({
      relativePath: '/users/me',
      headers: {
        authorization: accessToken,
      },
      body: partial,
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
