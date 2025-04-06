import { UserInfo } from '@shared/domains/user-info/user-info.entity';

export interface UserInfoProto
  extends Pick<
    UserInfo,
    | 'userId'
    | 'marketingApproval'
    | 'companyName'
    | 'companyUrl'
    | 'companySizeId'
    | 'roleId'
    | 'goalId'
  > {}
