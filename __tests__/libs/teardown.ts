import { api } from '~/infra/main/libs/api';
import { ResponseBody } from '~/infra/main/libs/main.type';

export const reset = async () => {
  return await api.post<ResponseBody>({
    relativePath: '/tests/fixtures/reset',
  });
};
