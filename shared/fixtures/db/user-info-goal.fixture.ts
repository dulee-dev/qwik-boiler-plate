import { UserInfoGoal } from '@shared/domains/user-info/user-info-goal.entity';

export const userInfoGoalDefaultFixtures: UserInfoGoal[] = [
  {
    id: '3a2fbc47-6a12-4c23-a9e4-41eab0f0e319',
    createdAt: new Date('2025-04-03T00:00:00.000Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'conversion',
    description: '제품/콘텐츠의 전환율을 높이기 위해',
    order: 1,
  },
  {
    id: 'dc236cc1-6a20-4b6a-909a-e0275fa0dc73',
    createdAt: new Date('2025-04-03T00:00:00.000Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'support_automation',
    description: '고객 응대 및 질문 대응을 자동화하기 위해',
    order: 2,
  },
  {
    id: '6a3b1264-229b-4f47-b0f7-3f86227aebd4',
    createdAt: new Date('2025-04-03T00:00:00.000Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'faq',
    description: '자주 묻는 질문(FAQ)을 챗봇으로 제공하기 위해',
    order: 3,
  },
  {
    id: 'b6c658aa-9bce-4c62-a69e-75dc54aa137e',
    createdAt: new Date('2025-04-03T00:00:00.000Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'content_navigation',
    description: '사용자들이 콘텐츠를 더 쉽게 탐색하도록 돕기 위해',
    order: 4,
  },
  {
    id: '02b05f7e-86ad-4cbb-bb8a-2426a89cfabd',
    createdAt: new Date('2025-04-03T00:00:00.000Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'onboarding',
    description: '제품이나 서비스를 처음 접하는 사용자를 교육/온보딩하기 위해',
    order: 5,
  },
  {
    id: 'e0e78fc9-e7d4-481f-83fd-fd6173813c6e',
    createdAt: new Date('2025-04-03T00:00:00.000Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'lead_generation',
    description: '관심 있는 방문자 정보를 수집하고 리드로 전환하기 위해',
    order: 6,
  },
];

export const userInfoGoalOtherFixtures: UserInfoGoal[] = [
  {
    id: '7c4b7602-d82c-4a3b-8974-2158b802e67a',
    createdAt: new Date('2025-04-03T00:00:00.000Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'other',
    description: 'some from user',
    order: null,
  },
];

export const userInfoGoalFixtures = [
  ...userInfoGoalDefaultFixtures,
  ...userInfoGoalOtherFixtures,
];
