import { BaseEntity } from '../base-entity';

export interface GoogleOAuth extends BaseEntity {
  email: string;
  name: string;
  googleId: string; // '111877287025037959839'
}
