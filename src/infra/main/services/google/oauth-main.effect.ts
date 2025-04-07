import { AuthProvider } from '@shared/domains/user/types';
import { api } from '../../libs/api';
import { ResponseBody } from '../../libs/main.type';
import { GoogleOAuthPayload } from '@shared/domains/google-oauth/google-oauth.type';
import { UserInfoProto } from '@shared/domains/user-info/user-info.type';
import { User } from '@shared/domains/user/user.entity';
import { UserInfo } from '@shared/domains/user-info/user-info.entity';

export const googleOAuthMain = {
  async certify(idToken: string) {
    const res = await api.post<
      | ResponseBody<
          | { provider: AuthProvider | null }
          | { accessToken: string; refreshToken: string },
          201000
        >
      | ResponseBody<void, 401000>
    >({
      relativePath: '/users/oauth/google',
      body: {
        idToken,
      },
    });

    return res;
  },

  async verify(idToken: string) {
    const res = await api.post<
      | ResponseBody<{ payload: GoogleOAuthPayload }, 201000>
      | ResponseBody<void, 401000, 'invalid google idToken'>
    >({
      relativePath: '/users/oauth/google/verify',
      body: {
        idToken,
      },
    });

    return res;
  },

  async signUp(
    body: {
      email: string;
      idToken: string;
    } & Omit<UserInfoProto, 'userId'>
  ) {
    return api.post<
      | ResponseBody<
          {
            user: User & { userInfo: UserInfo };
          },
          201000
        >
      | ResponseBody<void, 401000, 'google idToken invalid'>
      | ResponseBody<void, 400001, 'idToken duplicated'>
      | ResponseBody<void, 400002, 'email duplicated'>
      | ResponseBody<void, 400003, 'company size not found'>
      | ResponseBody<void, 400004, 'user-info-role not found'>
      | ResponseBody<void, 400005, 'user-info-goal not found'>
    >({
      relativePath: '/users/oauth/google/sign-up',
      body,
    });
  },
};
