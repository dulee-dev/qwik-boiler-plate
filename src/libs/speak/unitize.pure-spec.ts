import { test, expect } from 'vitest';
import { unitize } from './unitize.pure';

test('unitize', () => {
  const value = 33;
  const unit = 'cm';
  const expected = '33cm';

  const result = unitize(value, unit);

  expect(result).toEqual(expected);
});
