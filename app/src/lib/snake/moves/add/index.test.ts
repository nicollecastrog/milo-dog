import { NORTH, EAST, WEST, dummyState } from "../../shared";
import addMove from "./index";

describe("moves/add", () => {
  test("returns updated 'moves' in state if move is valid", () => {
    const result = addMove(
      {
        ...dummyState,
        moves: [WEST]
      },
      NORTH
    );
    expect(result.moves).toStrictEqual([WEST, NORTH]);
  });

  test("returns same 'moves' in state if move is invalid", () => {
    const result = addMove(
      {
        ...dummyState,
        moves: [WEST]
      },
      EAST
    );
    expect(result.moves).toStrictEqual([WEST]);
  });
});
