export class AssertionError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AssertionError';
  }
}

export class TeardownError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'TeardownError';
  }
}
