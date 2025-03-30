import { ResetPwCode } from '@shared/domains/reset-pw-code/reset-pw-code.entity';
import { userFixtures } from './user.fixture';

/**
 * 0: long expired not used (will not use)
 * 1: long expired but used
 * 2: expired
 */
export const resetPwCodeFixtures: ResetPwCode[] = [
  {
    id: 'a0c41a2f-6605-4130-932b-65f54936c864',
    createdAt: new Date(2024, 0, 1, 9),
    expiredAt: new Date(2099, 0, 1, 9),
    usedAt: null,
    userId: userFixtures[0].id,
  },
  {
    id: 'aea700cd-6636-42f7-85e2-4d58072e1476',
    createdAt: new Date(2024, 5, 1, 0),
    expiredAt: new Date(2099, 0, 1, 1),
    usedAt: new Date(2024, 5, 1, 10),
    userId: userFixtures[0].id,
  },
  {
    id: '885bd79a-850f-4264-a436-f78a64b59436',
    createdAt: new Date(2024, 5, 1, 0, 0),
    expiredAt: new Date(2024, 5, 1, 0, 30),
    usedAt: null,
    userId: userFixtures[0].id,
  },
];
