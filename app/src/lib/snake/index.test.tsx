import { createLongSnake, dummyState, EAST, NORTH, WEST } from "./shared";
import snakeGame from "./index";

describe("snake", () => {
  describe("if the snake eats the apple", () => {
    test(`returns a state containing:
          the default 'running' status,
          a new apple,
          one less move,
          and a longer snake`, () => {
      const result = snakeGame({
        ...dummyState,
        apple: { x: 3, y: 0 },
        moves: [EAST, NORTH, NORTH],
        snake: [
          { x: 2, y: 0 },
          { x: 1, y: 0 }
        ]
      });

      expect(result).toStrictEqual({
        ...dummyState,
        apple: expect.objectContaining({
          x: expect.toBeWithin(0, dummyState.columns),
          y: expect.toBeWithin(0, dummyState.rows)
        }),
        moves: [NORTH, NORTH],
        snake: [
          { x: 3, y: 0 },
          { x: 2, y: 0 },
          { x: 1, y: 0 }
        ]
      });
    });
  });

  describe("if the snake crashes", () => {
    test(`returns a state containing
          the existing snake & apple,
          one less move,
          and a 'crashed' status`, () => {
      const snakeAboutToCrash = [
        { x: 6, y: 7 }, // head: facing south
        { x: 6, y: 6 }, // turns east
        { x: 5, y: 6 },
        { x: 5, y: 7 },
        { x: 5, y: 8 },
        { x: 5, y: 9 } // tail: facing north
      ];
      const result = snakeGame({
        ...dummyState,
        moves: [WEST, NORTH, NORTH],
        snake: snakeAboutToCrash
      });

      expect(result).toStrictEqual({
        ...dummyState,
        moves: [NORTH, NORTH],
        snake: snakeAboutToCrash,
        status: "crashed"
      });
    });
  });

  describe("if the game is won (the board is fully blocked by the snake)", () => {
    test(`returns a state containing
          the existing snake & apple,
          one less move,
          and a 'won' status`, () => {
      const longSnake = createLongSnake(10); // occupies full 10x10 board
      const result = snakeGame({
        ...dummyState,
        moves: [EAST, EAST, NORTH],
        snake: longSnake
      });

      expect(result).toStrictEqual({
        ...dummyState,
        moves: [EAST, NORTH],
        snake: longSnake,
        status: "won"
      });
    });
  });
});
