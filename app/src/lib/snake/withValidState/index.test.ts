import withValidState from "./index";
import { State } from "../types";
import {
  minimumDimension,
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
    test("returns an error if there's a missing param at runtime", () => {
      const missingParamState = {
        columns: minimumDimension,
        rows: minimumDimension,
        apple: defaultApple,
        cellCreator: dummyCellCreator,
        moves: [EAST]
        // 'snake' is missing
      };

      expect(() => {
        // `any` used to opt out of typing the state as we're purposefully
        // providing an invalid state to test that this is handled at runtime
        withValidState(dummyModule)(missingParamState as any);
      }).toThrow();
    });

    test("returns an error if there's an undefined param at runtime", () => {
      const undefinedParamState = {
        columns: minimumDimension,
        rows: minimumDimension,
        apple: defaultApple,
        cellCreator: dummyCellCreator,
        moves: [EAST],
        snake: undefined
      };

      expect(() => {
        // see comment above for note about usage of `any` below
        withValidState(dummyModule)(undefinedParamState as any);
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
