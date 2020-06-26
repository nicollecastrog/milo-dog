import apple from "./index";
import { dummyState } from "../shared";

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
  test("returns an object of shape: { x: number, y: number }", () => {
    const result = apple(dummyState);
    expect(result).toEqual(
      expect.objectContaining({
        x: expect.toBeWithin(0, dummyState.columns),
        y: expect.toBeWithin(0, dummyState.rows)
      })
    );
  });

  test("returns an x,y point which is not blocked", () => {
    // create a snake that occupies 8x8 of the 10x10 board:
    const longSnake = createLongSnake(8);
    const result = apple({
      ...dummyState,
      snake: longSnake
    });

    expect(longSnake).not.toContainEqual(result);
  });

  test("returns an error if the whole board is blocked", () => {
    // create a snake that occupies the whole 10x10 board:
    const longSnake = createLongSnake(10);

    expect(() => {
      apple({
        ...dummyState,
        snake: longSnake
      });
    }).toThrow();
  });
});
