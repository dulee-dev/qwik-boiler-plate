interface CustomMatchers<R = unknown> {
  toBeNumber(): R;
  toBeBoolean(): R;
  toBeArray(): R;
  toHaveCode(property: number): R;
  toBeValidationErrorIn(property: string): R;
  toBeValidationErrorInParam(): R;
  toBeString(): R;
  toBeSimilarDate(property: Date): R;
  toBeUuid(): R;
  toThrowUniqueConstraintError(key: string): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

export {};
