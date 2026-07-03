import { expect } from "@jest/globals";
import type { MatcherFunction } from "expect";

// 1. Define the matcher function
const toBeWithinRange: MatcherFunction<[min: number, max: number]> = function (
  actual,
  min,
  max,
) {
  if (
    typeof actual !== "number" ||
    typeof min !== "number" ||
    typeof max !== "number"
  ) {
    throw new TypeError("Arguments must be numbers");
  }

  const pass = actual >= min && actual <= max;
  return {
    pass,
    message: () =>
      pass
        ? `expected ${this.utils.printReceived(actual)} not to be within range ${this.utils.printExpected(`${min} – ${max}`)}`
        : `expected ${this.utils.printReceived(actual)} to be within range ${this.utils.printExpected(`${min} – ${max}`)}`,
  };
};

// 2. Register the matcher
expect.extend({ toBeWithinRange });

// 3. Extend Jest’s TypeScript declarations (for global availability)
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(min: number, max: number): R;
    }
  }
}
