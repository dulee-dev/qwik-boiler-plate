import { Email, Url } from '@shared/types/extended-types';
import { BaseEntity } from '../base-entity';
import { tags } from 'typia';

export interface User extends BaseEntity {
  email: Email;
  nickname: string &
    tags.Pattern<`^(?=.*[a-zA-Z0-9가-힣._-])[a-zA-Z0-9가-힣._-]{2,16}$`>;
  imgUrl: Url | null;
  bio: string & tags.MaxLength<20>;
  introduction: string & tags.MaxLength<2000>;
}
