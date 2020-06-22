import moveHead from "./index";
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

describe("moveHead", () => {
  describe("missing state", () => {
    missingStateValidation(moveHead, {
      columns: 10,
      rows: 10,
      snake: dummySnake,
      moves: dummyMoves
    });

    test("returns an error if the state doesn't contain 'snake'", () => {
      expect(() => {
        moveHead({
          columns: 10,
          rows: 10,
          snake: undefined,
          moves: dummyMoves
        });
      }).toThrow();
    });

    test("returns an error if the state doesn't contain 'moves'", () => {
      expect(() => {
        moveHead({
          columns: 10,
          rows: 10,
          snake: dummySnake,
          moves: undefined
        });
      }).toThrow();
    });
  });

  describe("minimum columns/rows values", () => {
    minimumColumnsAndRowsValues(moveHead, {
      columns: 10,
      rows: 10,
      snake: dummySnake,
      moves: dummyMoves
    });
  });

  describe("correct behaviour", () => {
    test("can handle moving head one slot EAST (x: x + 1)", () => {
      const result = moveHead({
        columns: 10,
        rows: 12,
        snake: [{ x: 2, y: 2 }],
        moves: [EAST]
      });
      expect(result).toStrictEqual({ x: 3, y: 2 });
    });

    test("can handle moving head one slot WEST (x: x - 1)", () => {
      const result = moveHead({
        columns: 10,
        rows: 12,
        snake: [{ x: 2, y: 2 }],
        moves: [WEST]
      });
      expect(result).toStrictEqual({ x: 1, y: 2 });
    });

    test("can handle moving head one slot NORTH (y: y + 1)", () => {
      const result = moveHead({
        columns: 10,
        rows: 12,
        snake: [{ x: 2, y: 2 }],
        moves: [NORTH]
      });
      expect(result).toStrictEqual({ x: 2, y: 3 });
    });

    test("can handle moving head one slot SOUTH (y: y - 1)", () => {
      const result = moveHead({
        columns: 10,
        rows: 12,
        snake: [{ x: 2, y: 2 }],
        moves: [SOUTH]
      });
      expect(result).toStrictEqual({ x: 2, y: 1 });
    });

    describe("going past the board boundaries", () => {
      test("can wrap around past the EAST boundary", () => {
        const result = moveHead({
          columns: 10,
          rows: 10,
          snake: [{ x: 9, y: 2 }],
          moves: [EAST]
        });
        expect(result).toStrictEqual({ x: 0, y: 2 });
      });

      test("can wrap around past the WEST boundary", () => {
        const result = moveHead({
          columns: 10,
          rows: 10,
          snake: [{ x: 0, y: 2 }],
          moves: [WEST]
        });
        expect(result).toStrictEqual({ x: 9, y: 2 });
      });

      test("can wrap around past the NORTH boundary", () => {
        const result = moveHead({
          columns: 10,
          rows: 10,
          snake: [{ x: 2, y: 9 }],
          moves: [NORTH]
        });
        expect(result).toStrictEqual({ x: 2, y: 0 });
      });

      test("can wrap around past the SOUTH boundary", () => {
        const result = moveHead({
          columns: 10,
          rows: 10,
          snake: [{ x: 2, y: 0 }],
          moves: [SOUTH]
        });
        expect(result).toStrictEqual({ x: 2, y: 9 });
      });
    });
  });
});
