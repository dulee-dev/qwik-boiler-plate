import { Email } from '@shared/types/extended-types';
import { BaseEntity } from '../base-entity';

export interface EmailLead extends Pick<BaseEntity, 'id' | 'createdAt'> {
  email: Email;
}
