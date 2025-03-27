import { test, describe, expect } from 'vitest';
import {
  calcSrcWidth,
  calcIdFromUploadUrl,
  calcSrc,
  calcSrcset,
  calcSrcUrlFromUploadUrl,
  checkIsCFImage,
} from './cf-image-rule.pure';
import { SrcWidth, srcWidthMax } from '~/libs/image';

describe('calcIdFromUploadUrl', () => {
  test('if ok, match exact string', () => {
    const uploadUrl =
      'https://upload.imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/285f039f-ee79-46fc-7c9c-0ae6fd430100';
    const src = calcIdFromUploadUrl(uploadUrl);

    expect(src).toEqual(`285f039f-ee79-46fc-7c9c-0ae6fd430100`);
  });
});

describe('calcSrcUrlFromUploadUrl', () => {
  test('if ok, match exact string', () => {
    const uploadUrl =
      'https://upload.imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/285f039f-ee79-46fc-7c9c-0ae6fd430100';
    const src = calcSrcUrlFromUploadUrl(uploadUrl);

    expect(src).toEqual(
      `https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/285f039f-ee79-46fc-7c9c-0ae6fd430100`
    );
  });
});

describe('calcSrc', () => {
  const src =
    'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00';

  test.each([
    {
      idx: 1,
      description: 'mawWidth is undefined -> srcWidthMax',
      maxWidth: undefined,
      expected:
        'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00' +
        '/w' +
        srcWidthMax,
    },
    {
      idx: 2,
      description: 'mawWidth is given -> calcBreakPoint and get src',
      maxWidth: 600,
      expected:
        'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00' +
        '/w' +
        1920,
    },
  ])('[$idx] $description', async ({ maxWidth, expected }) => {
    const result = calcSrc(src, maxWidth);

    expect(result).toEqual(expected);
  });
});

describe('calcSrcWidth', () => {
  test.each([
    {
      w: undefined,
      dpi: undefined,
      expected: srcWidthMax,
    },
    {
      w: 300,
      dpi: undefined,
      expected: 992,
    },
    {
      w: 300,
      dpi: 1,
      expected: 360,
    },
    {
      w: 1200,
      dpi: undefined,
      expected: srcWidthMax,
    },
  ])('$w -> $expected', async ({ w, dpi, expected }) => {
    const result = calcSrcWidth(w, dpi);

    expect(result).toEqual(expected);
  });
});

describe('checkIsCFImage', () => {
  test('yes', async () => {
    const src =
      'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00';
    const result = checkIsCFImage(src);

    expect(result).toEqual(true);
  });

  test('no', async () => {
    const src = 'https:///39a25115-97fe-4168-1eed-dfba13160d00';
    const result = checkIsCFImage(src);

    expect(result).toEqual(false);
  });
});

test('calcSrcset', () => {
  const src =
    'https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00';
  const srcWidth: SrcWidth[] = [600];

  const result = calcSrcset(src, srcWidth);
  expect(result).toMatchInlineSnapshot(
    `"https://imagedelivery.net/sO38Ra7xK9C5jR-qJrdsOw/39a25115-97fe-4168-1eed-dfba13160d00/w600 600w"`
  );
});
