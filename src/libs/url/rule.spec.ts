import { test, describe, expect } from 'vitest'
import { addSubdomain, extractSubdomain, trimTailSlash } from './rule'

describe('addSubdomain', () => {
  test.each([
    {
      url: 'http://localhost:1234',
      subdomain: 'test',
      expected: 'http://test.localhost:1234'
    },
    {
      url: 'https://dulee.dev',
      subdomain: 'test',
      expected: 'https://test.dulee.dev'
    },
  ])('subdomain: $subdomain', ({ url, subdomain, expected }) => {
    const result = addSubdomain(url, subdomain);

    expect(result).toEqual(expected)
  })
})

describe('extractSubdomain', () => {
  test.each([
    {
      url: 'http://localhost:1234',
      expected: undefined
    },
    {
      url: 'http://ko.localhost:1234',
      expected: 'ko'
    },
    {
      url: 'https://ko.dulee.dev',
      expected: 'ko'
    },
  ])('$url: $expected', ({ url, expected }) => {
    const result = extractSubdomain(url);

    expect(result).toEqual(expected)
  })
})

describe('trimTailSlash', () => {
  test.each([
    { url: 'https://example.com/', expected: 'https://example.com' },
    { url: 'https://example.com//', expected: 'https://example.com/' },
    { url: 'https://example.com/path/', expected: 'https://example.com/path' },
    { url: 'https://example.com/path', expected: 'https://example.com/path' },
    { url: '/', expected: '' },
    { url: '', expected: '' },
  ])('$url → $expected', ({ url, expected }) => {
    const result = trimTailSlash(url);
    expect(result).toEqual(expected);
  });
});