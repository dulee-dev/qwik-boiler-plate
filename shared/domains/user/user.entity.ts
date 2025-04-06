import { Email } from '@shared/types/extended-types';
import { BaseEntity } from '../base-entity';
import { AuthProvider } from './types';

export interface User extends BaseEntity {
  email: Email;
  provider: AuthProvider;
}
