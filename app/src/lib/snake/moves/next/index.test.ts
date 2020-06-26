import { NORTH, SOUTH, EAST, WEST, dummyState } from "../../shared";
import nextMove from "./index";

describe("moves/next", () => {
  test("returns 'moves' array with next move to be processed at the front (0th index)", () => {
    const result = nextMove({
      ...dummyState,
      moves: [WEST, SOUTH, EAST]
    });
    expect(result).toStrictEqual([SOUTH, EAST]);
  });

  test("returns 'moves' array with same move if only one move is present", () => {
    const result = nextMove({
      ...dummyState,
      moves: [NORTH]
    });
    expect(result).toStrictEqual([NORTH]);
  });
});
