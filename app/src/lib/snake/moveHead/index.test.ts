import moveHead from "./index";
import { NORTH, SOUTH, EAST, WEST, dummyState } from "../shared";

describe("moveHead", () => {
  test("can handle moving head one slot EAST (x: x + 1)", () => {
    const result = moveHead({
      ...dummyState,
      moves: [EAST]
    });
    expect(result).toStrictEqual({ x: 3, y: 2 });
  });

  test("can handle moving head one slot WEST (x: x - 1)", () => {
    const result = moveHead({
      ...dummyState,
      moves: [WEST]
    });
    expect(result).toStrictEqual({ x: 1, y: 2 });
  });

  test("can handle moving head one slot NORTH (y: y + 1)", () => {
    const result = moveHead({
      ...dummyState,
      moves: [NORTH]
    });
    expect(result).toStrictEqual({ x: 2, y: 3 });
  });

  test("can handle moving head one slot SOUTH (y: y - 1)", () => {
    const result = moveHead({
      ...dummyState,
      moves: [SOUTH]
    });
    expect(result).toStrictEqual({ x: 2, y: 1 });
  });

  describe("going past the board boundaries", () => {
    test("can wrap around past the EAST boundary", () => {
      const result = moveHead({
        ...dummyState,
        snake: [{ x: 9, y: 2 }],
        moves: [EAST]
      });
      expect(result).toStrictEqual({ x: 0, y: 2 });
    });

    test("can wrap around past the WEST boundary", () => {
      const result = moveHead({
        ...dummyState,
        snake: [{ x: 0, y: 2 }],
        moves: [WEST]
      });
      expect(result).toStrictEqual({ x: 9, y: 2 });
    });

    test("can wrap around past the NORTH boundary", () => {
      const result = moveHead({
        ...dummyState,
        snake: [{ x: 2, y: 9 }],
        moves: [NORTH]
      });
      expect(result).toStrictEqual({ x: 2, y: 0 });
    });

    test("can wrap around past the SOUTH boundary", () => {
      const result = moveHead({
        ...dummyState,
        snake: [{ x: 2, y: 0 }],
        moves: [SOUTH]
      });
      expect(result).toStrictEqual({ x: 2, y: 9 });
    });
  });
});
