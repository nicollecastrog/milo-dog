import { EAST, dummyState } from "../../shared";
import willEat from "./index";

describe("snake/snake/eat", () => {
  test("returns true if snake's head WILL move into the apple's x,y point", () => {
    const result = willEat({
      ...dummyState,
      snake: [{ x: 0, y: 0 }],
      moves: [EAST],
      apple: { x: 1, y: 0 }
    });
    expect(result).toBeTrue();
  });

  test("returns false if snake's head will NOT move into the apple's x,y point", () => {
    const result = willEat({
      ...dummyState,
      snake: [{ x: 0, y: 0 }],
      moves: [EAST],
      apple: { x: 2, y: 0 }
    });
    expect(result).toBeFalse();
  });
});
