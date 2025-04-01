import { BaseEntity } from '@shared/domains/base-entity';
import { Uuid } from '@shared/types/extended-types';

export interface UserInfo extends BaseEntity {
  userId: Uuid;
  marketingApproval: boolean;
}
