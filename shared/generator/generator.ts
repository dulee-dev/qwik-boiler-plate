import { faker } from '@faker-js/faker';
import {
  CAPITAL_ALPHABET_SET,
  KOR_PART_SET,
  KOR_SET,
  NUMBER_SET,
  SMALL_ALPHABET_SET,
  SPECIAL_SET,
} from './constant';
import { draw } from 'radashi';
import { cfImageUrlFixtures } from '@shared/fixtures/cf-image-src.fixture';
import { v4 } from 'uuid';
import { User } from '@shared/domains/user/user.entity';

const charset = ['ko', 'en', 'EN', '123', '!@#', 'ㄱㄴㄷ'] as const;
type Charset = (typeof charset)[number];

const calcRandomNumber = (max = 10, min = 0) => {
  return Math.random() * (max - min) + min;
};

const calcRandomInteger = (max = 10, min = 0) => {
  return Math.floor(calcRandomNumber(max, min));
};

const calcRandomString = (set: string, len: number) => {
  let result = '';
  const charactersLength = set.length;
  for (let i = 0; i < len; i++) {
    result += set.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const randomReplacer = (
  str: string,
  { len, maxPer, char }: { len: number; maxPer: number; char: string }
) => {
  const points = [];
  for (let idx = 0; idx < len; ) {
    const per = calcRandomInteger(maxPer, 0);
    idx = idx + per;
    if (idx < len) points.push(idx);
  }

  const srtArr = str.split('');
  points.forEach((c) => {
    srtArr[c] = char;
  });
  return srtArr.join('');
};

const calcSet = (charset: Charset[]) => {
  let set = '';
  if (charset.includes('ko')) set += KOR_SET;
  if (charset.includes('en')) set += SMALL_ALPHABET_SET;
  if (charset.includes('EN')) set += CAPITAL_ALPHABET_SET;
  if (charset.includes('123')) set += NUMBER_SET;
  if (charset.includes('!@#')) set += SPECIAL_SET;
  if (charset.includes('ㄱㄴㄷ')) set += KOR_PART_SET;
  return set;
};

export const gen = {
  /**
   * charset: all, len: 1~10, linebreak: false, spacing: false
   */
  string(
    props: {
      charset?: Charset[];
      len?: number | { max: number; min?: number };
      add?: string;
      lineBreak?: boolean;
      spacing?: boolean;
    } | void
  ) {
    const set = (() => {
      let sum = '';

      sum =
        props && props.charset
          ? sum.concat(calcSet(props.charset))
          : calcSet([...charset]);

      sum = props && props.add ? sum.concat(props.add) : sum;

      return sum;
    })();

    const len = (() => {
      if (!props?.len) return calcRandomInteger(10, 1);
      if (typeof props.len === 'number') return props.len;
      return calcRandomInteger(props.len.max, props.len.min);
    })();

    let string = calcRandomString(set, len);

    if (props?.spacing)
      string = randomReplacer(string, { len, maxPer: 8, char: ' ' });

    if (props?.lineBreak)
      string = randomReplacer(string, { len, maxPer: 40, char: '\n' });
    return string;
  },

  email: faker.internet.email,

  number: calcRandomNumber,

  int: calcRandomInteger,

  user: {
    nickname: () =>
      gen.string({
        charset: ['ko', 'en', 'EN', '123'],
        len: { max: 16, min: 2 },
      }),

    bio: () =>
      gen.string({
        len: { max: 20, min: 0 },
      }),

    introduction: () =>
      gen.string({
        len: { max: 2000, min: 0 },
      }),

    imgUrl: () => draw(cfImageUrlFixtures),

    pw: () => gen.string({ len: 8, charset: ['en', 'EN', '123'] }) + 'a1!',

    instance(given?: Partial<User>): User {
      const random: User = {
        email: gen.email(),
        nickname: this.nickname(),
        imgUrl: this.imgUrl(),
        bio: this.bio(),
        introduction: this.introduction(),
        id: v4(),
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      };

      return {
        ...random,
        ...given,
      };
    },
  },
};
