import { dummyState, createLongSnake } from "../../shared";
import willCrash from "./index";

describe("snake/board/blocked", () => {
  test("returns true if snake IS occupying the whole board", () => {
    const longSnake = createLongSnake(10); // occupies full 10x10 board
    const result = willCrash({
      ...dummyState,
      snake: longSnake
    });
    expect(result).toBeTrue();
  });

  test("returns false if snake is NOT occupying the whole board", () => {
    const longSnake = createLongSnake(5); // occupies half the board
    const result = willCrash({
      ...dummyState,
      snake: longSnake
    });
    expect(result).toBeFalse();
  });
});
