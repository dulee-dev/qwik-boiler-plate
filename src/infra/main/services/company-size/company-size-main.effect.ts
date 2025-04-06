import { CompanySize } from '@shared/domains/user-info/company-size.entity';
import { api } from '../../libs/api';
import { ResponseBody } from '../../libs/main.type';

export const companySizeMain = {
  async findAll() {
    return await api.get<ResponseBody<{ companySizes: CompanySize[] }>>({
      relativePath: '/company-size',
    });
  },
};
