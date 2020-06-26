import { dummyState, EAST, NORTH } from "./shared";
import snakeGame from "./index";

describe("snake", () => {
  test("returns a state of the same shape as the one given", () => {
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
