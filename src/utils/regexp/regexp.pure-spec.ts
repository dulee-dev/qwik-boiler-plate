import { describe, test, expect } from 'vitest';
import {
  pwRegExp,
  nicknameRegExp,
  emailRegExp,
  dateISORegExp,
  uuidRegExp,
  emailInsensitiveRegExp,
} from './regexp.pure';

describe('pwRegExp (비밀번호)', () => {
  test.each([
    { text: '123asdf', expected: false },
    { text: '123123aa!', expected: true },
    { text: '!@#asdf', expected: false },
    { text: 'asdf1234', expected: false },
    { text: '1234!@#$abcd', expected: true },
    { text: 'short1!', expected: false },
    { text: 'veryveryverylongpassword123!', expected: false },
  ])('$text → $expected', ({ text, expected }) => {
    expect(pwRegExp.test(text)).toBe(expected);
  });
});

describe('nicknameRegExp (닉네임)', () => {
  test.each([
    { text: '유저1', expected: true },
    { text: 'user_name', expected: true },
    { text: 'user.name', expected: true },
    { text: '유저!', expected: false },
    { text: 'a', expected: false },
    { text: '너무너무긴앗닉네임이다', expected: false },
  ])('$text → $expected', ({ text, expected }) => {
    expect(nicknameRegExp.test(text)).toBe(expected);
  });
});

describe('emailInsensitiveRegExp (이메일)', () => {
  test.each([
    { text: 'tAAAAest@example.com', expected: true },
    { text: 'user.name+tag@domain.co.kr', expected: true },
    { text: 'invalid-email', expected: false },
    { text: '@missinguser.com', expected: false },
    { text: 'user@.nodomain', expected: false },
  ])('$text → $expected', ({ text, expected }) => {
    expect(emailInsensitiveRegExp.test(text)).toBe(expected);
  });
});

describe('emailRegExp (이메일)', () => {
  test.each([
    { text: 'test@example.com', expected: true },
    { text: 'user.name+tag@domain.co.kr', expected: true },
    { text: 'invalid-email', expected: false },
    { text: '@missinguser.com', expected: false },
    { text: 'user@.nodomain', expected: false },
  ])('$text → $expected', ({ text, expected }) => {
    expect(emailRegExp.test(text)).toBe(expected);
  });
});

describe('dateISORegExp (ISO 날짜)', () => {
  test.each([
    { text: '2024-03-27T15:30:45.000Z', expected: true },
    { text: '2024-02-29T09:15:00.123Z', expected: true },
    { text: '2024-02-30T00:00:00.000Z', expected: false },
    { text: 'invalid-date', expected: false },
    { text: '2024-13-01T00:00:00.000Z', expected: false },
  ])('$text → $expected', ({ text, expected }) => {
    expect(dateISORegExp.test(text)).toBe(expected);
  });
});

describe('uuidRegExp (UUID v4)', () => {
  test.each([
    { text: '123e4567-e89b-12d3-a456-426614174000', expected: true },
    { text: '123e4567-e89b-12d3-a456-42661417400z', expected: false },
    { text: 'not-a-uuid', expected: false },
    { text: '123e4567e89b12d3a456426614174000', expected: false },
  ])('$text → $expected', ({ text, expected }) => {
    expect(uuidRegExp.test(text)).toBe(expected);
  });
});
