import apple from "./index";
import {
  missingStateValidation,
  minimumColumnsAndRowsValues
} from "../common.test";

const dummySnake = [{ x: 2, y: 2 }];

const createLongSnake = (n: number) => {
  let longSnake = [];

  for (let x = 0; x < n; x++) {
    // Runs n times, with values of x 0 through n
    for (let y = 0; y < n; y++) {
      // Runs n times, with values of y 0 through n
      longSnake.push({ x: x, y: y });
    }
  }

  return longSnake;
};

describe("apple", () => {
  describe("missing state", () => {
    missingStateValidation(apple, {
      columns: 10,
      rows: 10,
      blocked: dummySnake
    });

    test("returns an error if the state doesn't contain 'blocked'", () => {
      expect(() => {
        apple({
          columns: 10,
          rows: 10,
          blocked: undefined
        });
      }).toThrow();
    });
  });

  describe("minimum columns/rows values", () => {
    minimumColumnsAndRowsValues(apple, {
      columns: 10,
      rows: 10,
      blocked: dummySnake
    });
  });

  describe("correct behaviour", () => {
    test("returns an object of shape: { x: number, y: number }", () => {
      const result = apple({
        columns: 10,
        rows: 12,
        blocked: dummySnake
      });
      expect(typeof result.x).toBe("number");
      expect(typeof result.y).toBe("number");
    });

    test("returns an x,y point which is not blocked", () => {
      // create a snake that occupies 8x8 of the board:
      const longSnake = createLongSnake(8);
      const result = apple({
        columns: 10,
        rows: 10,
        blocked: longSnake
      });
      expect(longSnake).not.toContainEqual(result);
    });

    test("returns an error if the whole board is blocked", () => {
      // create a snake that occupies the whole 10x10 board:
      const longSnake = createLongSnake(10);

      expect(() => {
        apple({
          columns: 10,
          rows: 10,
          blocked: longSnake
        });
      }).toThrow();
    });
  });
});
