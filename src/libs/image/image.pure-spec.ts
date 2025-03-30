import { test, describe, expect } from 'vitest';
import { calcMinWidthMediaQuery, calcSizes } from './image.pure';
import { SizesOption } from '~/infra/cloudflare/image.type';

test('calcMinWidthMediaQuery', () => {
  const maxWidth = 600;
  const value = '300px';

  const result = calcMinWidthMediaQuery(maxWidth, value);

  expect(result).toMatchInlineSnapshot(`"(min-width:600px)300px"`);
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
      base: {
        value: 100,
        unit: 'vw',
      },
      tablet: {
        value: 50,
        unit: 'vw',
      },
      desktopSmall: {
        value: 33,
        unit: 'vw',
      },
      desktop: {
        value: 25,
        unit: 'vw',
      },
    };

    const result = calcSizes(options);
    expect(result).toMatchInlineSnapshot(
      `"(min-width:768px)50vw,(min-width:992px)33vw,(min-width:1280px)25vw,100vw"`
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

    expect(result).toMatchInlineSnapshot(`"(min-width:768px)100vw,768px"`);
  });
});
