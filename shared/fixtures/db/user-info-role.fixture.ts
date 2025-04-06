import { UserInfoRole } from '@shared/domains/user-info/user-info-role.entity';

export const userInfoRoleDefaultFixtures: UserInfoRole[] = [
  {
    id: '387bc4d1-5101-4c2e-a9a8-d2c606f6409e',
    createdAt: new Date('2025-04-01T07:28:36.261Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'solo_creator',
    description: '1인 창작자, 디지털 콘텐츠 단독 운영자',
    order: 1,
  },
  {
    id: '89de5867-f85a-4317-9019-8c07c9f0f13b',
    createdAt: new Date('2025-04-01T07:28:36.261Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'founder',
    description: '창업자 또는 사업 책임자',
    order: 2,
  },
  {
    id: '1cd98ae3-cc99-4984-aecf-7df020fdc5ab',
    createdAt: new Date('2025-04-01T07:28:36.261Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'marketer',
    description: '마케팅 담당자, 퍼널/전환 분석 주로 담당',
    order: 3,
  },
  {
    id: '5f7b0416-6cf5-4a43-b172-35565e2c3de3',
    createdAt: new Date('2025-04-01T07:28:36.261Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'developer',
    description: '개발자 또는 기술 구현 담당자',
    order: 4,
  },
  {
    id: 'a75be274-9c2f-4e2c-9f55-fc9e75db0d36',
    createdAt: new Date('2025-04-01T07:28:36.261Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'product_manager',
    description: '제품 전체 흐름 및 기능 구조 설계 담당',
    order: 5,
  },
  {
    id: '2f04d44d-b71b-4f12-b68d-912c8f694790',
    createdAt: new Date('2025-04-01T07:28:36.261Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'support',
    description: '고객 응대, 헬프데스크, QnA 운영 담당',
    order: 6,
  },
];

export const userInfoRoleOtherFixtures: UserInfoRole[] = [
  {
    id: '813bfbd0-4dad-4e05-b83b-3ae6ec7dc7cc',
    createdAt: new Date('2025-04-01T07:28:36.261Z'),
    updatedAt: null,
    deletedAt: null,
    tag: 'others',
    description: 'some from user',
    order: null,
  },
];

export const userInfoRoleFixtures = [
  ...userInfoRoleDefaultFixtures,
  ...userInfoRoleOtherFixtures,
];
