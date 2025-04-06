import { AuthProvider } from '@shared/domains/user/types';
import { api } from '../../libs/api';
import { ResponseBody } from '../../libs/main.type';

export const googleOAuth = {
  async certify(idToken: string) {
    const res = await api.post<
      | ResponseBody<
          | { provider: AuthProvider | undefined }
          | { accessToken: string; refreshToken: string },
          201000
        >
      | ResponseBody<void, 400001>
    >({
      relativePath: '/users/oauth/google',
      body: {
        idToken,
      },
    });

    return res;
  },
};
