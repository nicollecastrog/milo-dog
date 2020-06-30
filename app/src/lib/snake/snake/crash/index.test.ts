import { dummyState, SOUTH, WEST } from "../../shared";
import willCrash from "./index";

describe("snake/snake/crash", () => {
  test("returns true if snake WILL crash upon next move", () => {
    const result = willCrash({
      ...dummyState,
      snake: [
        { x: 5, y: 6 }, // head: facing west
        { x: 6, y: 6 }, // turns north
        { x: 6, y: 5 },
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
        { x: 2, y: 5 },
        { x: 1, y: 5 },
        { x: 0, y: 5 } // tail: facing east
      ],
      moves: [SOUTH]
    });
    expect(result).toBeTrue();
  });

  test("returns false if snake will NOT crash upon next move", () => {
    const result = willCrash({
      ...dummyState,
      snake: [
        { x: 5, y: 6 }, // head: facing west
        { x: 6, y: 6 }, // turns north
        { x: 6, y: 5 },
        { x: 5, y: 5 } // tail: facing east
      ],
      moves: [WEST]
    });
    expect(result).toBeFalse();
  });
});
