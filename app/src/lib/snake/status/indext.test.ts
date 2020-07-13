import { createLongSnake, dummyState, WEST } from "../shared";
import updateStatus from "./index";

describe("snake/status", () => {
  test("returns 'running' by default", () => {
    const result = updateStatus(dummyState);

    expect(result).toEqual("running");
  });

  test("returns 'crashed' if snake will crash upon the next move", () => {
    const result = updateStatus({
      ...dummyState,
      snake: [
        { x: 6, y: 7 }, // head: facing south
        { x: 6, y: 6 }, // turns east
        { x: 5, y: 6 },
        { x: 5, y: 7 },
        { x: 5, y: 8 },
        { x: 5, y: 9 } // tail: facing north
      ],
      moves: [WEST]
    });

    expect(result).toEqual("crashed");
  });

  test("returns 'won' if the whole board is blocked/occupied by the snake", () => {
    const longSnake = createLongSnake(10); // occupies full 10x10 board
    const result = updateStatus({
      ...dummyState,
      snake: longSnake
    });

    expect(result).toEqual("won");
  });
});
