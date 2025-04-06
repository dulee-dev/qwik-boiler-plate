import { User } from '@shared/domains/user/user.entity';
import { api } from '../../libs/api';
import { ResponseBody } from '../../libs/main.type';
import { UserInfo } from '@shared/domains/user-info/user-info.entity';
import { UserInfoProto } from '@shared/domains/user-info/user-info.type';

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

  async signUp(
    body: {
      email: string;
      pw: string;
      signUpCodeId: string;
    } & Omit<UserInfoProto, 'userId'>
  ) {
    return api.post<
      | ResponseBody<
          {
            user: User & { userInfo: UserInfo };
          },
          201000
        >
      | ResponseBody<void, 400000, 'invalid sign-up-code'>
      | ResponseBody<void, 400001, 'sign-up-code is expired'>
      | ResponseBody<void, 400002, 'email duplicated'>
      | ResponseBody<void, 400003, 'company size not found'>
      | ResponseBody<void, 400004, 'user-info-role not found'>
      | ResponseBody<void, 400005, 'user-info-goal not found'>
    >({
      relativePath: '/users',
      body,
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
