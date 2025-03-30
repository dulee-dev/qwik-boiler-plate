import { UserPrivacy } from '@shared/domains/user-privacy/user-privacy.entity';
import { User } from '@shared/domains/user/user.entity';
import { tags } from 'typia';

export interface UserEditable
  extends Partial<Pick<User, 'nickname' | 'bio' | 'imgUrl' | 'introduction'>> {}

export interface UserQuery extends Partial<Pick<User, 'nickname' | 'email'>> {}

export interface UserWithPrivacy extends User {
  userPrivacy: UserPrivacy;
}

export interface UserPrototype
  extends Pick<
    User,
    | 'id'
    | 'nickname'
    | 'email'
    | 'imgUrl'
    | 'bio'
    | 'introduction'
    | 'createdAt'
  > {}

export type UserPw = string &
  tags.Pattern<`^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%#?&^*\\_\\-])[A-Za-z\\d@$!%#?&^*\\_\\-]{8,20}$`>;
