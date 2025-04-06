import { UserPrivacy } from '@shared/domains/user-privacy/user-privacy.entity';
import { User } from '@shared/domains/user/user.entity';
import { tags } from 'typia';
import { UserInfo } from '../user-info/user-info.entity';

export interface UserQuery extends Partial<Pick<User, 'email'>> {}

export interface UserWithPrivacy extends User {
  userPrivacy: UserPrivacy;
}

export interface UserWithInfo extends User {
  userInfo: UserInfo;
}

export interface UserPrototype
  extends Pick<User, 'id' | 'email' | 'createdAt' | 'provider'> {}

export type UserPw = string &
  tags.Pattern<`^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%#?&^*\\_\\-])[A-Za-z\\d@$!%#?&^*\\_\\-]{8,20}$`>;

export type AuthProvider = 'in-house' | 'google';
