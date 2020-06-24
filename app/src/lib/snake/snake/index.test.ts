import snake from "./index";
import {
  missingStateValidation,
  minimumColumnsAndRowsValues
} from "../common.test";
import { NORTH, SOUTH, EAST, WEST } from "../types";

const dummySnake = [
  { x: 2, y: 2 },
  { x: 3, y: 2 }
];
const dummyMoves = [NORTH, EAST, EAST, SOUTH, SOUTH, WEST, WEST];
const dummyApple = { x: 5, y: 2 };

describe("snake", () => {
  describe("missing state", () => {
    missingStateValidation(snake, {
      columns: 10,
      rows: 10,
      snake: dummySnake,
      moves: dummyMoves,
      apple: dummyApple
    });

    test("returns an error if the state doesn't contain 'snake'", () => {
      expect(() => {
        snake({
          columns: 10,
          rows: 10,
          snake: undefined,
          moves: dummyMoves,
          apple: dummyApple
        });
      }).toThrow();
    });

    test("returns an error if the state doesn't contain 'moves'", () => {
      expect(() => {
        snake({
          columns: 10,
          rows: 10,
          snake: dummySnake,
          moves: undefined,
          apple: dummyApple
        });
      }).toThrow();
    });

    test("returns an error if the state doesn't contain 'apple'", () => {
      expect(() => {
        snake({
          columns: 10,
          rows: 10,
          snake: dummySnake,
          moves: dummyMoves,
          apple: undefined
        });
      }).toThrow();
    });
  });

  describe("minimum columns/rows values", () => {
    minimumColumnsAndRowsValues(snake, {
      columns: 10,
      rows: 10,
      snake: dummySnake,
      moves: dummyMoves,
      apple: dummyApple
    });
  });

  describe("correct behaviour", () => {
    describe("if snake crashes", () => {
      test("returns default snake position ({ x: 2, y: 2}) (ie: starts game over)", () => {
        const result = snake({
          columns: 10,
          rows: 12,
          snake: [
            { x: 5, y: 6 }, // head: facing west
            { x: 6, y: 6 }, // turns north
            { x: 6, y: 5 },
            { x: 5, y: 5 },
            { x: 4, y: 5 },
            { x: 3, y: 5 },
            { x: 2, y: 5 },
            { x: 1, y: 5 },
            { x: 0, y: 5 } // tail: facing east
          ],
          moves: [SOUTH],
          apple: { x: 0, y: 0 }
        });
        expect(result).toStrictEqual([{ x: 2, y: 2 }]);
      });
    });

    describe("if snake eats apple", () => {
      test("returns elongated snake (new head, but keeping the tail)", () => {
        const result = snake({
          columns: 10,
          rows: 12,
          snake: [
            { x: 5, y: 6 }, // head: facing west
            { x: 6, y: 6 } // tail
          ],
          moves: [WEST],
          apple: { x: 4, y: 6 }
        });
        expect(result).toStrictEqual([
          { x: 4, y: 6 }, // new head
          { x: 5, y: 6 }, // former head
          { x: 6, y: 6 } // tail
        ]);
      });
    });

    describe("if snake does not eat apple", () => {
      test("returns same-length snake (new head, but remove the tail)", () => {
        const result = snake({
          columns: 10,
          rows: 12,
          snake: [
            { x: 5, y: 6 }, // head: facing west
            { x: 6, y: 6 }, // middle
            { x: 7, y: 6 } // tail
          ],
          moves: [WEST],
          apple: { x: 0, y: 0 }
        });
        expect(result).toStrictEqual([
          { x: 4, y: 6 }, // new head
          { x: 5, y: 6 }, // middle: former head
          { x: 6, y: 6 } // tail: former middle
        ]);
      });
    });
  });
});
