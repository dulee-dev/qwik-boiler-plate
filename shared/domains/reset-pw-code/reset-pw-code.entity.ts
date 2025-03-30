import { Uuid } from '@shared/types/extended-types';
import { BaseEntity } from '../base-entity';

export interface ResetPwCode extends Pick<BaseEntity, 'id' | 'createdAt'> {
  expiredAt: Date;
  usedAt: Date | null;
  userId: Uuid;
}
