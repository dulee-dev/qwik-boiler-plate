import { BaseEntity } from '@shared/domains/base-entity';
import { Email } from '@shared/types/extended-types';

export interface RefreshTokenPayload
  extends Pick<BaseEntity, 'id' | 'createdAt' | 'deletedAt'> {
  email: Email;
  expiredAt: Date;
}
