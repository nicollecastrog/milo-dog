import { NORTH, EAST, WEST, dummyState } from "../shared";
import addMove from "./add";

describe("addMove", () => {
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
