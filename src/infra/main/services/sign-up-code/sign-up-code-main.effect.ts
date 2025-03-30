import { SignUpCode } from '@shared/domains/sign-up-code/sign-up-code.entity';
import { ResponseBody } from '../../libs/main.type';

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
    const responseBody = (await response.json()) as ResponseBody<{
      signUpCode: SignUpCode;
    }>;
    return {
      body: responseBody,
      statusCode,
    };
  },

  async findOneById(id: string) {
    const response = await fetch(
      `${import.meta.env.PUBLIC_MAIN_BASE_URL}/sign-up-codes/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
    );
    const statusCode = response.status;
    const responseBody = (await response.json()) as ResponseBody<{
      signUpCode: SignUpCode;
    }>;
    return {
      body: responseBody,
      statusCode,
    };
  },
};
