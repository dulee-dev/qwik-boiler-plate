import { test, describe, expect } from 'vitest';
import {
  calcSrcsetBetween,
  projectImageSizes,
  projectImageSrc,
  projectImageSrcset,
  projectNullableImageSrc,
} from './cf-image-compose.pure';
import { SizesOption } from './image.type';
import { calcSizes } from '~/libs/image/image.pure';
import { cfImageUrlFixtures } from '@shared/fixtures/cf-image-src.fixture';

describe('calcSrcsetBetween', () => {
  const src =
    'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00';

  test.each([
    {
      idx: 1,
      description: 'range undefined',
      range: undefined,
      expected:
        'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w32 32w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w64 64w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w128 128w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w256 256w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w360 360w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w420 420w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w600 600w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w768 768w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w992 992w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w1280 1280w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w1536 1536w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w1920 1920w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w2240 2240w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w2560 2560w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w3200 3200w',
    },
    {
      idx: 2,
      description: 'max only',
      range: { max: 600 },
      expected:
        'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w32 32w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w64 64w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w128 128w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w256 256w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w360 360w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w420 420w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w600 600w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w768 768w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w992 992w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w1280 1280w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w1536 1536w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w1920 1920w',
    },
    {
      idx: 3,
      description: 'min only',
      range: { min: 500 },
      expected:
        'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w600 600w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w768 768w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w992 992w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w1280 1280w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w1536 1536w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w1920 1920w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w2240 2240w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w2560 2560w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w3200 3200w',
    },
    {
      idx: 4,
      description: 'max and min given',
      range: { max: 600, min: 500 },
      expected:
        'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w600 600w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w768 768w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w992 992w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w1280 1280w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w1536 1536w,https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w1920 1920w',
    },
  ])('[$idx] $description', ({ range, expected }) => {
    const result = calcSrcsetBetween(src, range);
    expect(result).toEqual(expected);
  });
});

describe('projectImageSrc', () => {
  test.each([
    {
      describe: 'is cf image & no maxWidth',
      src: cfImageUrlFixtures[0],
      maxWidth: undefined,
      expected: cfImageUrlFixtures[0] + '/w3200',
    },
    {
      describe: 'is cf image & maxWidth',
      src: cfImageUrlFixtures[0],
      maxWidth: 40,
      expected: cfImageUrlFixtures[0] + '/w128',
    },
    {
      describe: 'is not cf image',
      src: 'asdfasdfasdfdsf',
      maxWidth: undefined,
      expected: 'asdfasdfasdfdsf',
    },
  ])('$describe', ({ src, maxWidth, expected }) => {
    const result = projectImageSrc(src, maxWidth);
    expect(result).toEqual(expected);
  });
});

describe('projectNullableImageSrc', () => {
  test.each([
    {
      describe: 'is null & no maxWidth',
      src: null,
      placeholder: cfImageUrlFixtures[1],
      maxWidth: undefined,
      expected: cfImageUrlFixtures[1] + '/w3200',
    },
    {
      describe: 'is undefined & no maxWidth',
      src: undefined,
      placeholder: cfImageUrlFixtures[1],
      maxWidth: undefined,
      expected: cfImageUrlFixtures[1] + '/w3200',
    },
    {
      describe: 'is cf image & maxWidth',
      src: cfImageUrlFixtures[0],
      placeholder: cfImageUrlFixtures[1],
      maxWidth: 40,
      expected: cfImageUrlFixtures[0] + '/w128',
    },
    {
      describe: 'is not cf image',
      src: 'asdfasdfasdfdsf',
      placeholder: cfImageUrlFixtures[1],
      maxWidth: undefined,
      expected: 'asdfasdfasdfdsf',
    },
  ])('$describe', ({ src, placeholder, maxWidth, expected }) => {
    const result = projectNullableImageSrc(src, placeholder, maxWidth);
    expect(result).toEqual(expected);
  });
});

describe('projectImageSrcset', () => {
  test.each([
    {
      describe: 'is null & no range -> undefined',
      src: null,
      range: undefined,
      expected: undefined,
    },
    {
      describe: 'is not cf Image & no range -> undefined',
      src: 'asdfadsfadsfsdf',
      range: undefined,
      expected: undefined,
    },
    {
      describe: 'is cf Image & no range -> full srcset',
      src: cfImageUrlFixtures[0],
      range: undefined,
      expected: calcSrcsetBetween(cfImageUrlFixtures[0]),
    },
    {
      describe: 'is cf Image & has range -> srcset between range',
      src: cfImageUrlFixtures[0],
      range: { min: 128, max: 256 },
      expected: calcSrcsetBetween(cfImageUrlFixtures[0], {
        min: 128,
        max: 256,
      }),
    },
  ])('$describe', ({ src, range, expected }) => {
    const result = projectImageSrcset(src, range);
    expect(result).toEqual(expected);
  });
});

describe('projectImageSizes', () => {
  test.each<{
    describe: string;
    src: string | null | undefined;
    options: SizesOption;
    expected: string | undefined;
  }>([
    {
      describe: 'is null -> undefined',
      src: null,
      options: {
        base: {
          unit: 'vw',
          value: 100,
        },
      },
      expected: undefined,
    },
    {
      describe: 'is not cfImage -> undefined',
      src: 'asdfasdfadsadsf',
      options: {
        base: {
          unit: 'vw',
          value: 100,
        },
      },
      expected: undefined,
    },
    {
      describe: 'is cfImage -> undefined',
      src: cfImageUrlFixtures[0],
      options: {
        base: {
          unit: 'vw',
          value: 100,
        },
      },
      expected: calcSizes({
        base: {
          unit: 'vw',
          value: 100,
        },
      }),
    },
  ])('$describe', ({ src, options, expected }) => {
    const result = projectImageSizes(src, options);
    expect(result).toEqual(expected);
  });
});
