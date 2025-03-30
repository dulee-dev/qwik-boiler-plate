import { SignUpCode } from '@shared/domains/sign-up-code/sign-up-code.entity';
import { userFixtures } from './user.fixture';

/**
 * 0: long expired
 * 1: long expired but used
 * 2: expired not used
 * 3: long expired, email duplicated
 */
export const signUpCodeFixtures: SignUpCode[] = [
  {
    email: 'sign-up-code-000@test.com',
    expiredAt: new Date(2099, 0, 1, 11),
    id: '04c9e367-086f-44a2-986e-179d640365dd',
    createdAt: new Date(2024, 0, 1, 9),
    usedAt: null,
  },
  {
    email: 'sign-up-code-001@test.com',
    expiredAt: new Date(2099, 0, 1, 11),
    id: '581806af-7839-4c9e-bf51-7e4e400ab12c',
    createdAt: new Date(2024, 0, 1, 9),
    usedAt: new Date(2024, 0, 1, 10),
  },
  {
    email: 'sign-up-code-002@test.com',
    expiredAt: new Date(2024, 0, 1, 11),
    id: 'fa82df3d-4137-44b4-bd8a-8915ea432ef5',
    createdAt: new Date(2024, 0, 1, 9),
    usedAt: null,
  },
  {
    email: userFixtures[0].email,
    expiredAt: new Date(2099, 0, 1, 11),
    id: 'da0f6003-27e9-4b0e-9b53-a37135b36449',
    createdAt: new Date(2024, 0, 1, 9),
    usedAt: null,
  },
];
