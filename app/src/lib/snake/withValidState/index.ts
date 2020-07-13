import { minimumDimension, defaultState } from "../shared";
import { throwBelowMinimumError } from "../helpers";
import { State } from "../types";

type StateParams = keyof State;

const withValidState = <A extends [State, ...any[]], R>(
  moduleFunction: (...a: A) => R
) => (...args: A): R => {
  const state = args[0];

  (Object.keys(defaultState) as StateParams[]).map((property) => {
    if (state[property] === undefined) {
      throw new Error(`missing state param: ${property}`);
    }
  });

  // columns and rows cannot be less than ${minimumDimension}, to allow for better gameplay
  if (state.columns < minimumDimension) {
    throwBelowMinimumError("columns", minimumDimension);
  }
  if (state.rows < minimumDimension) {
    throwBelowMinimumError("rows", minimumDimension);
  }

  return moduleFunction(...args);
};

export default withValidState;
