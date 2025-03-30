import { RefreshTokenPayload } from '@shared/domains/refresh-token/refresh-token-payload.entity';
import { userBotFixtures } from './user.fixture';

/**
 * 0 -> long liftime
 * 1 -> expired
 * 2 -> removed
 * 3 -> notExistUser
 * 4 -> "dulee.dev@gmail.com"
 */
export const refreshTokenPayloadFixtures: RefreshTokenPayload[] = [
  {
    id: '35c512ae-20bf-4a61-b871-765028984b7e',
    createdAt: new Date(2024, 0, 1, 9, 0),
    email: userBotFixtures[0].email,
    expiredAt: new Date(2099, 0, 1, 9, 0),
    deletedAt: null,
  },
  {
    id: '22b788b4-b841-4b03-902b-cd801c334eaf',
    createdAt: new Date(2024, 0, 1, 9, 0),
    email: userBotFixtures[0].email,
    expiredAt: new Date(2024, 0, 15, 9, 0),
    deletedAt: null,
  },
  {
    id: 'c8aee68c-1874-4879-b1f3-c99306626148',
    createdAt: new Date(2024, 0, 1, 9, 0),
    email: userBotFixtures[0].email,
    expiredAt: new Date(2099, 0, 1, 9, 0),
    deletedAt: new Date(2024, 0, 13, 9, 0),
  },
  {
    id: 'b663bdce-f25c-4272-b622-a15fd9052cb1',
    createdAt: new Date(2024, 0, 1, 9, 0),
    email: 'zxcvzxcv@test.com',
    expiredAt: new Date(2099, 0, 1, 9, 0),
    deletedAt: null,
  },
  {
    id: 'f171445f-7cf2-410d-ae01-d61f2f7c1edf',
    createdAt: new Date(2024, 0, 1, 9, 0),
    email: 'dulee.dev@gmail.com',
    expiredAt: new Date(2099, 0, 1, 9, 0),
    deletedAt: null,
  },
];
