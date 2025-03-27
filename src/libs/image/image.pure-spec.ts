import { test, describe, expect } from 'vitest';
import { calcMaxWidthMediaQuery, calcSizes } from './image.pure';
import { SizesOption } from './image.type';
import { CF_IMG_URL } from '@dulee.dev/fixture/dist/others/cf-img-url.constant';

test('calcMaxWidthMediaQuery', () => {
  const maxWidth = 600;
  const value = '300px';

  const result = calcMaxWidthMediaQuery(maxWidth, value);

  expect(result).toMatchInlineSnapshot(`"(max-width:600px)300px"`);
});

describe('calcSizes', () => {
  test('if only base, base', () => {
    const options: SizesOption = {
      base: {
        value: 33,
        unit: 'vw',
      },
    };
    const expected = '33vw';

    const result = calcSizes(options);

    expect(result).toEqual(expected);
  });

  test('responsive grid', () => {
    const options: SizesOption = {
      mobileLarge: {
        value: 100,
        unit: 'vw',
      },
      tablet: {
        value: 50,
        unit: 'vw',
      },
      desktop: {
        value: 33,
        unit: 'vw',
      },
      base: {
        value: 25,
        unit: 'vw',
      },
    };

    const result = calcSizes(options);

    expect(result).toMatchInlineSnapshot(
      `"(max-width:600px)100vw,(max-width:768px)50vw,(max-width:1280px)33vw,25vw"`,
    );
  });

  test('full with max-width', () => {
    const options: SizesOption = {
      tablet: {
        value: 100,
        unit: 'vw',
      },
      base: {
        value: 768,
        unit: 'px',
      },
    };

    const result = calcSizes(options);

    expect(result).toMatchInlineSnapshot(`"(max-width:768px)100vw,768px"`);
  });
});
