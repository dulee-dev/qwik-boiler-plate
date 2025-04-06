import { BaseEntity } from '../base-entity';

export interface CompanySize extends BaseEntity {
  tag: string;
  min: number;
  max: number;
  order: number;
}
