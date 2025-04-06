import { BaseEntity } from '@shared/domains/base-entity';
import { Uuid } from '@shared/types/extended-types';
import { tags } from 'typia';

export interface UserInfo extends BaseEntity {
  userId: Uuid;
  marketingApproval: boolean;
  companyName: string & tags.MaxLength<128> & tags.MinLength<1>;
  companyUrl: string & tags.MaxLength<1024> & tags.MinLength<1>;
  companySizeId: Uuid;
  roleId: Uuid;
  goalId: Uuid;
}
