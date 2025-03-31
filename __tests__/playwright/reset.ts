import { ResponseBody } from '~/infra/main/libs/main.type';

export const resetPlaywright = async () => {
  const url = process.env.PUBLIC_MAIN_BASE_URL + '/tests/fixtures/reset';

  const response = await fetch(url, {
    method: 'POST',
  });
  const text = await response.text();

  const resBody = JSON.parse(text) as ResponseBody;

  const statusCode = response.status;
  return {
    body: resBody,
    statusCode,
  };
};
