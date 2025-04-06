import { tags } from 'typia';
import { BaseEntity } from '../base-entity';

export interface UserInfoGoal extends BaseEntity {
  tag: string & tags.MaxLength<128> & tags.MinLength<1>;
  description: string & tags.MaxLength<128> & tags.MinLength<1>;
  order: number | null;
}
