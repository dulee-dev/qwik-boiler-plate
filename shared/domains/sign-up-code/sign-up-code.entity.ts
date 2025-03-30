import { Email } from '@shared/types/extended-types';
import { BaseEntity } from '../base-entity';

export interface SignUpCode extends Pick<BaseEntity, 'id' | 'createdAt'> {
  email: Email;
  expiredAt: Date;
  usedAt: Date | null;
}
