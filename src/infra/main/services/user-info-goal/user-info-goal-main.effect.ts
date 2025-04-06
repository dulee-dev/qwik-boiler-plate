import { UserInfoGoal } from '@shared/domains/user-info/user-info-goal.entity';
import { api } from '../../libs/api';
import { ResponseBody } from '../../libs/main.type';
import { UserInfoGoalProto } from '@shared/domains/user-info/user-info-goal.type';

export const userInfoGoalMain = {
  async findDefaultAll() {
    return await api.get<ResponseBody<{ userInfoGoals: UserInfoGoal[] }>>({
      relativePath: '/user-info-goal/default',
    });
  },

  async createOne(body: UserInfoGoalProto) {
    return await api.post<ResponseBody<{ userInfoGoal: UserInfoGoal }, 201000>>(
      {
        relativePath: '/user-info-goal',
        body,
      }
    );
  },
};
