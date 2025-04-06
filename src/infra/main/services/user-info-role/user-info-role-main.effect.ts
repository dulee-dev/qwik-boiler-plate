import { UserInfoRoleProto } from '@shared/domains/user-info/user-info-role.type';
import { api } from '../../libs/api';
import { ResponseBody } from '../../libs/main.type';
import { UserInfoRole } from '@shared/domains/user-info/user-info-role.entity';

export const userInfoRoleMain = {
  async findDefaultAll() {
    return await api.get<ResponseBody<{ userInfoRoles: UserInfoRole[] }>>({
      relativePath: '/user-info-role/default',
    });
  },

  async createOne(body: UserInfoRoleProto) {
    return await api.post<ResponseBody<{ userInfoRole: UserInfoRole }, 201000>>(
      {
        relativePath: '/user-info-role',
        body,
      }
    );
  },
};
