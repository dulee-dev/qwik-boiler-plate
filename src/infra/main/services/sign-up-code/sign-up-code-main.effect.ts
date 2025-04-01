import { SignUpCode } from '@shared/domains/sign-up-code/sign-up-code.entity';
import { ResponseBody, ResponseNotFound } from '../../libs/main.type';
import { api } from '../../libs/api';

export const signUpCodeMain = {
  async createOne(email: string) {
    const body = JSON.stringify({ email });
    const response = await fetch(
      `${import.meta.env.PUBLIC_MAIN_BASE_URL}/sign-up-codes`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }
    );
    const statusCode = response.status;
    const responseBody = (await response.json()) as ResponseBody<
      {
        signUpCode: SignUpCode;
      },
      201000
    >;
    return {
      body: responseBody,
      statusCode,
    };
  },

  async findOneById(id: string) {
    return await api.get<
      | ResponseBody<{
          signUpCode: SignUpCode;
        }>
      | ResponseNotFound
      | ResponseBody<void, 404001, 'expired'>
    >({
      relativePath: '/sign-up-codes',
      additionalPath: `/${id}`,
    });
  },
};
