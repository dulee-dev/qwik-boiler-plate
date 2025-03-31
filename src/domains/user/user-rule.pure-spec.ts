import { test, describe, expect } from 'vitest';
import { checkIsEmail, checkIsPw, checkIsPwNoLength } from './user-rule.pure';
import { gen } from '@shared/generator/generator';

describe('checkIsEmail', () => {
  test.each([
    {
      input: gen.string(),
      expected: false,
    },
    {
      input: gen.email(),
      expected: true,
    },
  ])('$input -> $expected', ({ input, expected }) => {
    const result = checkIsEmail(input);

    expect(result).toEqual(expected);
  });
});

describe('checkIsPw', () => {
  test.each([
    {
      input: '123123aa',
      expected: false,
    },
    {
      input: '123123aa!',
      expected: true,
    },
  ])('$input -> $expected', ({ input, expected }) => {
    const result = checkIsPw(input);

    expect(result).toEqual(expected);
  });
});

describe('checkIsPwNoLength', () => {
  test.each([
    {
      input: '123123aa',
      expected: false,
    },
    {
      input: '1a!',
      expected: true,
    },
  ])('$input -> $expected', ({ input, expected }) => {
    const result = checkIsPwNoLength(input);

    expect(result).toEqual(expected);
  });
});
