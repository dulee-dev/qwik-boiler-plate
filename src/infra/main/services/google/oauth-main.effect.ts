import { AuthProvider } from '@shared/domains/user/types';
import { api } from '../../libs/api';
import { ResponseBody } from '../../libs/main.type';
import { GoogleOAuthPayload } from '@shared/domains/google-oauth/google-oauth.type';

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
};
