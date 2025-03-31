import { Email } from '@shared/types/extended-types';
import { BaseEntity } from '../base-entity';

export interface User extends BaseEntity {
  email: Email;
}
