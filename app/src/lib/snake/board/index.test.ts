import board from "./index";
import { dummyCellCreator, dummyState } from "../shared";

describe("board", () => {
  test("returns an array whose length is the number of rows", () => {
    const result = board({
      ...dummyState,
      rows: 12
    });
    expect(result).toHaveLength(12);
  });

  test("returns an array whose items are arrays of length equal to the number of columns", () => {
    const result = board({
      ...dummyState,
      columns: 15
    });

    expect(result[0]).toHaveLength(15);
  });

  describe("'cellCreator'", () => {
    test("returns an array whose items are arrays containing the result of the 'cellCreator'", () => {
      const result = board(dummyState);

      expect(result[0]).toEqual(expect.arrayContaining([dummyCellCreator()]));
    });
  });
});
