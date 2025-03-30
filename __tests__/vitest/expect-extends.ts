import { expect } from 'vitest';
import { MIN } from '~/utils/date/constants';

expect.extend({
  toBeNumber(received) {
    const pass = typeof received === 'number';
    return {
      message: () => `expected ${received} to be typeof number`,
      pass,
    };
  },

  toBeBoolean(received) {
    const pass = typeof received === 'boolean';
    return {
      message: () => `expected ${received} to be typeof boolean`,
      pass,
    };
  },

  toBeArray(received) {
    const pass = Array.isArray(received);
    return {
      message: () => `expected ${received} to be typeof array`,
      pass,
    };
  },

  toBeUuid(received) {
    let pass = false;
    if (typeof received === 'string') {
      pass = !!received.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    }
    return {
      message: () => `expected ${received} to be uuid(regexp)`,
      pass,
    };
  },

  toHaveCode(received: any, code: number) {
    const expectedStatusCode = Math.floor(code / 1000);
    const statusCodeOk = expectedStatusCode === received.statusCode;
    if (!statusCodeOk)
      return {
        message: () =>
          `expected statusCode ${expectedStatusCode} but received ${received.statusCode}`,
        pass: false,
      };

    const codeOk = code === received.body.code;
    if (!codeOk)
      return {
        message: () =>
          `expected code ${code} but received ${received.body.code}`,
        pass: false,
      };

    return {
      message: () => `ok`,
      pass: true,
    };
  },

  toBeString(received) {
    const pass = typeof received === 'string';
    return {
      message: () => `expected ${received} to be typeof string`,
      pass,
    };
  },

  /**
   * check response of supertest is typia error in query or body on given property
   * @param received response from supertest
   * @param property regexp or string match for typia error variable name
   */
  toBeValidationErrorIn(received, property: string) {
    const statusCodeOk = received.statusCode === 400;
    if (!statusCodeOk)
      return {
        message: () =>
          `expected statusCode 400 but received ${received.statusCode}`,
        pass: false,
      };

    const codeOk = received.body.code === 400000;
    if (!codeOk)
      return {
        message: () => `expected code 400000 but received ${received.code}`,
        pass: false,
      };

    const typiaOk = (() => {
      try {
        const errors = received.body.data.errors.filter(
          (c: any) => c.path === `$input.${property}`
        );
        if (errors.length === 0) return false;
        return true;
      } catch (err) {
        return true;
      }
    })();

    const errors = received.body.data.errors.map((c: any) => c.path).join(', ');
    if (!typiaOk)
      return {
        message: () => `expected typia error on ${errors} but not matched`,
        pass: false,
      };

    return {
      message: () => 'ok',
      pass: true,
    };
  },

  /**
   * check response of supertest is typia error in parameter
   * @param received response from supertest
   */
  toBeValidationErrorInParam(received) {
    const statusCodeOk = received.statusCode === 400;
    if (!statusCodeOk)
      return {
        message: () =>
          `expected statusCode 400 but received ${received.statusCode}`,
        pass: false,
      };

    const codeOk = received.body.code === 400000;
    if (!codeOk)
      return {
        message: () =>
          `expected code 400000 but received ${received.body.code}`,
        pass: false,
      };

    const typiaOk = received.body.message.match(
      /\[BadRequestException\]\sInvalid\sURL\sparameter\svalue\son/
    );
    if (!typiaOk)
      return {
        message: () => `body.message does not matched`,
        pass: false,
      };

    return {
      message: () => 'ok',
      pass: true,
    };
  },

  toBeSimilarDate(received, property: Date) {
    if (!(received instanceof Date)) {
      return {
        message: () => `${received} is not Date object`,
        pass: false,
      };
    }

    const diffMs = received.getTime() - property.getTime();
    if (diffMs >= -1 * MIN && diffMs <= MIN) {
      return {
        message: () => `ok`,
        pass: true,
      };
    }

    return {
      message: () => `${received} and ${property} diffMs is over 1Min`,
      pass: false,
    };
  },

  toThrowUniqueConstraintError(received, key: string) {
    const message = `duplicate key value violates unique constraint "${key}"`;

    if (received.message === message)
      return {
        message: () => `ok`,
        pass: true,
      };

    return {
      message: () => `${received} is not ${message}`,
      pass: false,
    };
  },
});
