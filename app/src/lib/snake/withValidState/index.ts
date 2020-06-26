import { minimumDimension, defaultState } from "../shared";
import { State } from "../types";

type StateParams = keyof State;

const throwBelowMinimumError = (data: string) => {
  throw new Error(
    `incorrect state param: ${data} cannot be below ${minimumDimension}`
  );
};

const withValidState = <A extends [State, ...any[]], R>(
  moduleFunction: (...a: A) => R
) => (...args: A): R => {
  const state = args[0];

  (Object.keys(defaultState) as Array<StateParams>).map((property) => {
    if (state[property] === undefined) {
      throw new Error(`missing state param: ${property}`);
    }
  });

  // columns and rows cannot be less than ${minimumDimension}, to allow for better gameplay
  if (state.columns < minimumDimension) {
    throwBelowMinimumError("columns");
  }
  if (state.rows < minimumDimension) {
    throwBelowMinimumError("rows");
  }

  return moduleFunction(...args);
};

export default withValidState;
