import { describe, expect, test } from 'vitest';
import { builGaQuery } from './ga';

describe('builGaQuery', () => {
  test.each([
    { describe: 'source, medium, campain', source: 'google', medium: 'cpc', campaign: 'spring_sale', expected: 'utm_source=google&utm_medium=cpc&utm_campaign=spring_sale' },
    { describe: 'source, medium,', source: 'google', medium: 'cpc', expected: 'utm_source=google&utm_medium=cpc' },
    { describe: 'source', source: 'google', expected: 'utm_source=google' },
    { describe: 'none', expected: '' }
  ])('$describe', ({ source, medium, campaign, expected }) => {
    const result = builGaQuery({ source, medium, campaign});
    expect(result).toBe(expected);
  });
});