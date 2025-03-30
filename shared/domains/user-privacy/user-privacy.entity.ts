import { BaseEntity } from '@shared/domains/base-entity';
import { Uuid } from '@shared/types/extended-types';

export interface UserPrivacy extends BaseEntity {
  userId: Uuid;
  pwHashed: string;
  pwSalt: string;
}
