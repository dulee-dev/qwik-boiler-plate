import { api } from '../../libs/api';
import { ResponseBody } from '../../libs/main.type';

export const resetPwCodeMain = {
  async createOneByMe(
    accessToken: string,
    {
      pw,
    }: {
      pw: string;
    }
  ) {
    return await api.post<
      ResponseBody<{
        code: string;
      }>
    >({
      relativePath: '/reset-pw-codes',
      headers: {
        authorization: accessToken,
      },
      body: { pw },
    });
  },

  async createOneByEmail(email: string, lang?: string) {
    return await api.post<ResponseBody<void, 201000>>({
      relativePath: '/reset-pw-codes/create-by-email',
      ...(lang ? { additionalPath: `?lang=${lang}` } : {}),
      body: { email },
    });
  },

  async verifyOne(code: string) {
    return await api.get<ResponseBody>({
      relativePath: '/reset-pw-codes',
      additionalPath: `/${code}`,
    });
  },
};
