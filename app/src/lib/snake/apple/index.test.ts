import apple from "./index";
import { EAST, WEST, dummyState, createLongSnake } from "../shared";

describe("snake/apple", () => {
  describe("if the whole board is blocked", () => {
    test("returns the previous apple", () => {
      const longSnake = createLongSnake(10); // occupies full 10x10 board
      const result = apple({
        ...dummyState,
        snake: longSnake
      });

      expect(result).toStrictEqual(dummyState.apple);
    });
  });

  describe("if snake will NOT eat current apple on next move", () => {
    test("returns the previous apple", () => {
      const result = apple(dummyState);

      expect(result).toStrictEqual(dummyState.apple);
    });
  });

  describe("if snake WILL eat the current apple on next move", () => {
    test("returns an apple of shape: { x: number, y: number }", () => {
      const willEatAppleState = {
        ...dummyState,
        snake: [{ x: 0, y: 0 }],
        moves: [EAST],
        apple: { x: 1, y: 0 }
      };
      const result = apple(willEatAppleState);

      expect(result).toEqual(
        expect.objectContaining({
          x: expect.toBeWithin(0, dummyState.columns),
          y: expect.toBeWithin(0, dummyState.rows)
        })
      );
    });

    test("returns a new apple, not the current apple", () => {
      const willEatAppleState = {
        ...dummyState,
        snake: [{ x: 0, y: 0 }],
        moves: [EAST],
        apple: { x: 1, y: 0 }
      };
      const result = apple(willEatAppleState);

      expect(result).not.toStrictEqual({
        x: 1,
        y: 0
      });
    });

    test("returns an x,y point which is not blocked", () => {
      // create a snake that occupies 8x8 of the 10x10 board:
      const longSnake = createLongSnake(8); // head of snake at 0,0
      const willEatAppleState = {
        ...dummyState,
        snake: longSnake,
        moves: [WEST],
        apple: { x: 9, y: 0 }
      };
      const result = apple(willEatAppleState);

      expect(longSnake).not.toContainEqual(result);
    });
  });
});
