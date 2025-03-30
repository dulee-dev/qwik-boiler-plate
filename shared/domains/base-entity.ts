import { Uuid } from '@shared/types/extended-types';

export interface BaseEntity<T = Uuid> {
  id: T;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
