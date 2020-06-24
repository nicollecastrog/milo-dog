import withValidState from "./index";
import { State } from "../types";
import {
  boundaryEnd,
  defaultApple,
  dummyCellCreator,
  dummyState,
  EAST
} from "../shared";

const dummyModule = (state: State) => {
  return {
    bar: state.columns,
    baz: state.rows
  };
};

describe("withValidState", () => {
  describe("missing state", () => {
    test("returns an error if there's a missing param of the module state", () => {
      const missingParamState = {
        columns: boundaryEnd,
        rows: boundaryEnd,
        apple: defaultApple,
        cellCreator: dummyCellCreator,
        moves: [EAST]
        // 'snake' is missing
      };

      expect(() => {
        withValidState(dummyModule)(missingParamState);
      }).toThrow();
    });

    test("returns an error if there's an undefined param of the module state", () => {
      const undefinedParamState = {
        columns: boundaryEnd,
        rows: boundaryEnd,
        apple: defaultApple,
        cellCreator: dummyCellCreator,
        moves: [EAST],
        snake: undefined
      };

      expect(() => {
        withValidState(dummyModule)(undefinedParamState);
      }).toThrow();
    });
  });

  describe("minimum columns/rows values", () => {
    test("returns an error if 'columns' is less than 10", () => {
      expect(() => {
        withValidState(dummyModule)({
          ...dummyState,
          columns: 9,
          rows: 10
        });
      }).toThrow();
    });

    test("returns an error if 'rows' is less than 10", () => {
      expect(() => {
        withValidState(dummyModule)({
          ...dummyState,
          columns: 10,
          rows: 9
        });
      }).toThrow();
    });

    test("does not return an error if 'columns' and 'rows' are 10", () => {
      expect(() => {
        withValidState(dummyModule)({
          ...dummyState,
          columns: 10,
          rows: 10
        });
      }).not.toThrow();
    });

    test("does not return an error if 'columns' and 'rows' are more than 10", () => {
      expect(() => {
        withValidState(dummyModule)({
          ...dummyState,
          columns: 12,
          rows: 12
        });
      }).not.toThrow();
    });
  });
});
