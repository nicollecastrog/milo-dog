import snake from "./index";
import { SOUTH, WEST, dummyState } from "../shared";

describe("snake/snake", () => {
  describe("if snake crashes", () => {
    test("returns the existing snake", () => {
      const snakeAboutToCrash = [
        { x: 5, y: 6 }, // head: facing west
        { x: 6, y: 6 }, // turns north
        { x: 6, y: 5 },
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
        { x: 2, y: 5 },
        { x: 1, y: 5 },
        { x: 0, y: 5 } // tail: facing east
      ];
      const result = snake({
        ...dummyState,
        snake: snakeAboutToCrash,
        moves: [SOUTH]
      });
      expect(result).toStrictEqual(snakeAboutToCrash);
    });
  });

  describe("if snake eats apple", () => {
    test("returns elongated snake (new head, but keeping the tail)", () => {
      const result = snake({
        ...dummyState,
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
    test("returns same-length snake (new head, but removing the tail)", () => {
      const result = snake({
        ...dummyState,
        snake: [
          { x: 5, y: 6 }, // head: facing west
          { x: 6, y: 6 }, // middle
          { x: 7, y: 6 } // tail
        ],
        moves: [WEST]
      });
      expect(result).toStrictEqual([
        { x: 4, y: 6 }, // new head
        { x: 5, y: 6 }, // middle: former head
        { x: 6, y: 6 } // tail: former middle
      ]);
    });
  });
});
